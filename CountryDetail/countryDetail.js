export function countryDetail(data) {
  // Ana kapsayıcıyı seç
  const countryRegion = document.querySelector('.country-table-grid');
  
  if (!countryRegion) {
    console.error('Country element not found!');
    return;
  }

  // // Başlık kısmını ayarla
  // const title = document.createElement('h3');
  // title.textContent = "Norge";
  // countryRegion.appendChild(title);

  // Grid sistemini oluştur
  const countryTableGrid = document.createElement('div');
  countryTableGrid.classList.add('country-table-grid');
  countryRegion.appendChild(countryTableGrid);

  // Her bir veri girişini oluştur ve ekle
  Object.entries(data.Norge).slice(0,4).forEach(([key, value]) => {
    const countryStat = document.createElement('div');
    countryStat.classList.add('country-stat');

    const icon = document.createElement('span');
    icon.classList.add('icon', data.Norge[key] < 0 ? 'red' : 'green'); // Negatif veya pozitif ikon
    const iconImg = document.createElement('img');
    iconImg.src = data.Norge[key] < 0 ? '/images/down.png' : '/images/up.png';
    iconImg.alt = data.Norge[key] < 0 ? 'Arrow down' : 'Arrow up';
    icon.appendChild(iconImg);

    const statText = document.createElement('div');
    statText.classList.add('country-stat-text');
    const title = document.createElement('p');
    title.classList.add('title');
    title.textContent = key;

    const valueElement = document.createElement('p');
    valueElement.classList.add('value');
    valueElement.textContent = value;

    // Renk ayarı (negatifse kırmızı, pozitifse yeşil)
    if (typeof value === 'string' && value.includes('%')) {
      valueElement.style.color = value.includes('-') ? 'var(--red)' : 'var(--green)';
    } else if (!isNaN(parseFloat(value))) {
      valueElement.style.color = parseFloat(value) < 0 ? 'var(--red)' : 'var(--green)';
    }

    // Yapıyı birleştir
    statText.appendChild(title);
    statText.appendChild(valueElement);
    countryStat.appendChild(icon);
    countryStat.appendChild(statText);
    countryRegion.appendChild(countryStat);
  });
}
