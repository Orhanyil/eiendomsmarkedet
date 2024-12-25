import { fetchData } from '../fetchData.js'; // fetchData fonksiyonunu içe aktar
// import { cityDetail } from '../CityDetail/cityDetail.js';
// import { countryDetail } from '../CountryDetail/countryDetail.js';

// cityDetail.js();
// countryDetail.js();


document.addEventListener("DOMContentLoaded", async () => {
  try {
    const data = await fetchData(); // Veriyi çek
    console.log('Fetched Data in Graphic.js:', data); // Veriyi konsola yazdır
    initializeChart(data); // Grafiği başlat
    updateDetails(data); // Top ve Minst Vekst detaylarını güncelle
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }

  const dropdownToggle = document.querySelector('.graphic-dropdown-toggle');
  const dropdown = document.querySelector('.graphic-dropdown-menu');

  // Dropdown toggle
  dropdownToggle.addEventListener('click', () => {
    console.log("clicked");
    dropdown.classList.toggle('show');

     if (dropdown.classList.contains('show')) {
       dropdownToggle.textContent = "Endring siste måned ▲"; // Yukarı oku
     } else {
      dropdownToggle.textContent = "Endring siste måned ▼"; // Aşağı oku
     }
  });

  // Dropdown dışına tıklanınca kapat
  document.addEventListener('click', (event) => {
    if (!dropdownToggle.contains(event.target) && !dropdown.contains(event.target)) {
      dropdown.classList.remove('show');
       dropdownToggle.textContent = "Endring siste måned ▼"; // Oku aşağı döndür
    }
  });
});

// Grafiği başlatan fonksiyon
function initializeChart(data) {
  // 'Norge' verisini al
  const norgeData = data['Norge']['Endring siste måned']; // Norge'nin referans değeri

  // Şehir isimlerini ve verilerini al
  const labels = Object.keys(data).filter((key) => key !== 'Norge'); // 'Norge' hariç şehirler
  const kommuneData = labels.map((city) => data[city]['Endring siste måned']); // Şehirlerin "Endring siste måned" değerleri

  // Norge referansını tekrar eden bir dizi oluştur
  const norgeDataset = Array(labels.length).fill(norgeData);

  const ctx = document.getElementById('barChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels, // Şehir isimleri
      datasets: [
        {
          label: 'Kommune',
          data: kommuneData, // Şehir verileri
          backgroundColor: 'rgba(92, 74, 199, 0.7)'
        },
        // {
        //   label: 'Norge (Referans)',
        //   data: norgeDataset, // Norge verileri
        //   backgroundColor: 'rgba(240, 58, 95, 0.7)' // Kırmızı renk
        // }
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
      value: data[city]['Endring siste måned']
    }));

  // En yüksek ve en düşük değişimi bul
  const topVekst = kommuneData.reduce((prev, curr) => (curr.value > prev.value ? curr : prev));
  const minstVekst = kommuneData.reduce((prev, curr) => (curr.value < prev.value ? curr : prev));

  // HTML'yi güncelle
  document.querySelector('.details .highlight.green').innerText = `${topVekst.name} ${topVekst.value}%`;
  document.querySelector('.details .highlight.text-red').innerText = `${minstVekst.name} ${minstVekst.value}%`;
}
