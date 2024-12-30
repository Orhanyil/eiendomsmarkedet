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
    cityDetail(data)// Top ve Minst Vekst detaylarını güncelle
    countryDetail(data);

    const dropdownToggle = document.querySelector('.graphic-dropdown-toggle');
    const dropdown = document.querySelector('.graphic-dropdown-menu');
    const dropdownItems = dropdown.querySelectorAll('li'); // Tüm <li> elemanlarını seç

    // Dropdown toggle
    dropdownToggle.addEventListener('click', () => {
      dropdown.classList.toggle('show');

      // Ok yönünü değiştir
      if (dropdown.classList.contains('show')) {
        dropdownToggle.textContent = `${selectedDropdownData} ▲`; // Yukarı oku
      } else {
        dropdownToggle.textContent = `${selectedDropdownData} ▼`; // Aşağı oku
      }
    });

    // Dropdown öğelerine tıklama olayı
    dropdownItems.forEach((item) => {
      item.addEventListener('click', () => {
        selectedDropdownData = item.textContent ? item.textContent : "Endring siste måned"; // Tıklanan öğenin metnini al
        dropdownToggle.textContent = `${selectedDropdownData} ▼`; // Başlığı güncelle
        dropdown.classList.remove('show'); // Dropdown'ı kapat

        // Grafiği güncelle
        if (chartInstance) {
          chartInstance.destroy(); // Mevcut grafiği yok et
        }
        initializeChart(data); // Yeni grafiği oluştur
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

function parseValue(value) {
  if (typeof value === "string") {
    // Yüzde işaretini kaldır ve sayıya dönüştür
    if (value.includes("%")) {
      return parseFloat(value.replace("%", "").trim());
    }
    // Boşluk veya nokta içeren sayıları dönüştür
    return parseFloat(value.replace(/\s|,/g, ""));
  }
  return value; // Eğer zaten sayıysa, olduğu gibi döndür
}

// Grafiği başlatan fonksiyon
function initializeChart(data) {
  // 'Norge' verisini al
  const norgeData = parseValue(data['Norge'][selectedDropdownData]); // Norge'nin referans değeri

  // Şehir isimlerini ve verilerini al
  const labels = Object.keys(data).filter((key) => key !== 'Norge'); // 'Norge' hariç şehirler
  const kommuneData = labels.map((city) => parseValue(data[city][selectedDropdownData])); // Şehirlerin seçilen değerleri

  // Norge referansını tekrar eden bir dizi oluştur
  const norgeDataset = Array(labels.length).fill(norgeData);

  const ctx = document.getElementById('barChart').getContext('2d');
  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels, // Şehir isimleri
      datasets: [
        {
          label: 'Kommune',
          data: kommuneData, // Şehir verileri
          backgroundColor: 'rgba(92, 74, 199, 0.7)'
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
          beginAtZero: true
        }
      }
    }
  });
}

// Detayları güncelleyen fonksiyon
function updateDetails(data) {
  // 'Norge' hariç şehir isimlerini ve değişim oranlarını al
  const kommuneData = Object.keys(data)
    .filter((key) => key !== 'Norge')
    .map((city) => ({
      name: city,
      value: parseValue(data[city][selectedDropdownData]) // Değeri dönüştür
    }));

  // En yüksek ve en düşük değişimi bul
  const topVekst = kommuneData.reduce((prev, curr) => (curr.value > prev.value ? curr : prev));
  const minstVekst = kommuneData.reduce((prev, curr) => (curr.value < prev.value ? curr : prev));

  // HTML'yi güncelle
  document.querySelector('.details .highlight.green').innerText = `${topVekst.name} ${topVekst.value}%`;
  document.querySelector('.details .highlight.text-red').innerText = `${minstVekst.name} ${minstVekst.value}%`;
}
