export function cityDetail(data) {
  console.log(data);

  const dropdownToggle = document.querySelector('.city-dropdown-toggle');
  const dropdown = document.querySelector('.city-dropdown-menu');
  const statsGrid = document.querySelector('.city-stats-grid');
  let selectedCity = "Oslo"; // Varsayılan şehir

  // İlk yüklemede şehir verilerini güncelle
  if (!data[selectedCity]) {
    selectedCity = Object.keys(data)[0]; // İlk şehir adı
  }
  updateCityStats(data, selectedCity);

  // Dinamik olarak şehir listelerini dropdown'a ekle
  const cities = Object.keys(data).filter(city => city !== 'Norge'); // 'Norge' hariç şehirleri al
  dropdown.innerHTML = cities.map(city => `<li>${city}</li>`).join(''); // Şehirleri liste olarak ekle

  // Dropdown toggle
  dropdownToggle.addEventListener('click', () => {
    dropdown.classList.toggle('show');

    // Ok yönünü değiştir
    dropdownToggle.textContent = dropdown.classList.contains('show')
      ? `${selectedCity} ▲`
      : `${selectedCity} ▼`;
  });

  // Dropdown öğelerine tıklama olayı
  dropdown.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
      selectedCity = event.target.textContent.trim(); // Tıklanan şehri al
      dropdownToggle.textContent = `${selectedCity} ▼`; // Başlığı güncelle
      dropdown.classList.remove('show'); // Dropdown'ı kapat

      console.log("Selected city:", selectedCity); // Konsola seçilen şehri yazdır
      updateCityStats(data, selectedCity); // Seçilen şehre göre istatistikleri güncelle
    }
  });

  // Dinamik olarak şehir istatistiklerini güncelleyen fonksiyon
  function updateCityStats(data, city) {
    const cityData = data[city]; // Seçilen şehrin verilerini al
    if (!cityData) {
      console.error(`Data for city ${city} not found`);
      return;
    }

    statsGrid.innerHTML = ''; // Önce eski içerikleri temizle

    // Şehir istatistiklerini dinamik olarak oluştur ve ekle
    for (const [key, value] of Object.entries(cityData)) {
      const statElement = document.createElement('div');
      statElement.classList.add('city-stat');

      // İkon ekleme (artış/azalış simgeleri)
      const icon = document.createElement('span');
      icon.classList.add('icon');
      const iconImg = document.createElement('img');
      // Artış/azalış simgesi
      iconImg.src = parseFloat(value) >= 0 ? '../images/up.png' : '../images/down.png'; // Resim yolunu güncelledik
      iconImg.alt = 'Arrow';
      icon.appendChild(iconImg); // İkonu ekle

      // Başlık ve değer alanları
      const statText = document.createElement('div');
      statText.classList.add('stat-text');
      const title = document.createElement('p');
      title.classList.add('title');
      title.textContent = key;
      const statValue = document.createElement('p');
      statValue.classList.add('value');
      statValue.textContent = value;

      statText.appendChild(title);
      statText.appendChild(statValue);
      statElement.appendChild(icon); // İkonu ekle
      statElement.appendChild(statText);

      statsGrid.appendChild(statElement); // Grid'e yeni elemanı ekle
    }
  }
}
