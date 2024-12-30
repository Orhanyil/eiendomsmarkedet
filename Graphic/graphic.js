import { fetchData } from '../fetchData.js'; // fetchData fonksiyonunu içe aktar
import { cityDetail } from '../CityDetail/cityDetail.js';
import { countryDetail } from '../CountryDetail/countryDetail.js';

let selectedDropdownData = "Endring siste måned"; // Global seçilen dropdown verisi
let chartInstance = null; // Global grafik referansı

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const data = await fetchData(); // Veriyi çek
    console.log('Fetched Data in Graphic.js:', data); // Veriyi konsola yazdır
    initializeChart(data); // Grafiği başlat
    updateDetails(data);
    cityDetail(data); // Top ve Minst Vekst detaylarını güncelle
    countryDetail(data);

    const dropdownToggle = document.querySelector('.graphic-dropdown-toggle');
    const dropdown = document.querySelector('.graphic-dropdown-menu');

    // Dropdown öğelerini dinamik olarak oluştur
    const dropdownItems = Object.keys(data['Norge']).slice(0,6); // Norge verisindeki anahtarları al
    dropdown.innerHTML = dropdownItems
      .map((item) => `<li>${item}</li>`)
      .join(''); // Listeyi oluştur

    const dropdownListItems = dropdown.querySelectorAll('li'); // Oluşan <li> elemanlarını seç

    // Dropdown toggle
    dropdownToggle.addEventListener('click', () => {
      dropdown.classList.toggle('show');

      // Ok yönünü değiştir
      dropdownToggle.textContent = dropdown.classList.contains('show')
        ? `${selectedDropdownData} ▲`
        : `${selectedDropdownData} ▼`;
    });

    // Dropdown öğelerine tıklama olayı
    dropdownListItems.forEach((item) => {
      item.addEventListener('click', () => {
        selectedDropdownData = item.textContent ? item.textContent : "Endring siste måned"; // Tıklanan öğenin metnini al
        dropdownToggle.textContent = `${selectedDropdownData} ▼`; // Başlığı güncelle
        dropdown.classList.remove('show'); // Dropdown'ı kapat

        // Grafiği güncelle
        if (chartInstance) {
          chartInstance.destroy(); // Mevcut grafiği yok et
        }
        initializeChart(data); // Yeni grafiği oluştur
        updateDetails(data); // Detayları da güncelle
      });
    });

    // Dropdown dışına tıklanınca kapat
    document.addEventListener('click', (event) => {
      if (!dropdownToggle.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.classList.remove('show');
        dropdownToggle.textContent = `${selectedDropdownData} ▼`; // Oku aşağı döndür
      }
    });

  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
});

// Grafiği başlatan fonksiyon
function initializeChart(data) {
  
  const labels = Object.keys(data).filter((key) => key !== 'Norge'); // 'Norge' hariç şehirler
  const kommuneData = labels.map((city) => parseValue(data[city][selectedDropdownData])); // Şehirlerin seçilen değerleri

  // Dinamik renkleri ayarla: Negatifler kırmızı, pozitifler mor
  const backgroundColors = kommuneData.map(value => (value < 0 ? 'rgb(226, 97, 138)' : 'rgb(105, 176, 72)'));
  const maxValue = Math.max(...kommuneData) + 0.2; // En yüksek değeri al ve bir artır
  
  const ctx = document.getElementById('barChart').getContext('2d');
  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Kommune',
          data: kommuneData,
          backgroundColor: backgroundColors,
          borderRadius: 8, // Çubukların kenarları için yuvarlama
          borderSkipped: false // Çubuğun tüm kenarlarına yuvarlama uygular
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top'
        }
      },
      scales: {
        y: {
          beginAtZero: true, // Sıfırdan başla
          suggestedMax: maxValue // Skalanın maksimum değerini bir artır
        }
      }
    }
  });
}

// Detayları güncelleyen fonksiyon
function updateDetails(data) {
  const kommuneData = Object.keys(data)
    .filter((key) => key !== 'Norge')
    .map((city) => ({
      name: city,
      value: parseValue(data[city][selectedDropdownData])
    }));

  const topVekst = kommuneData.reduce((prev, curr) => (curr.value > prev.value ? curr : prev));
  const minstVekst = kommuneData.reduce((prev, curr) => (curr.value < prev.value ? curr : prev));

  document.querySelector('.details .highlight.green').innerText = `${topVekst.name} ${topVekst.value}%`;
  document.querySelector('.details .highlight.text-red').innerText = `${minstVekst.name} ${minstVekst.value}%`;
}

function parseValue(value) {
  if (typeof value === "string") {
    if (value.includes("%")) {
      return parseFloat(value.replace("%", "").trim());
    }
    return parseFloat(value.replace(/\s|,/g, ""));
  }
  return value;
}
