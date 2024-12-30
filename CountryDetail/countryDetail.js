export function countryDetail(data) {
  // Velger hovedbeholderen
  const countryRegion = document.querySelector('.country-table-grid');
  
  if (!countryRegion) {
    console.error('Landelementet ble ikke funnet!');
    return;
  }

  // Oppretter et grid-system
  const countryTableGrid = document.createElement('div');
  countryTableGrid.classList.add('country-table-grid');
  countryRegion.appendChild(countryTableGrid);

  // Oppretter og legger til hvert dataelement
  Object.entries(data.Norge).slice(0, 4).forEach(([key, value]) => {
    const countryStat = document.createElement('div');
    countryStat.classList.add('country-stat');

    const icon = document.createElement('span');
    icon.classList.add('icon', data.Norge[key] < 0 ? 'red' : 'green'); // Negativt eller positivt ikon
    const iconImg = document.createElement('img');
    iconImg.src = data.Norge[key] < 0 ? '../images/down.png' : '../images/up.png';
    iconImg.alt = data.Norge[key] < 0 ? 'Pil ned' : 'Pil opp';
    icon.appendChild(iconImg);

    const statText = document.createElement('div');
    statText.classList.add('country-stat-text');
    const title = document.createElement('p');
    title.classList.add('title');
    title.textContent = key;

    const valueElement = document.createElement('p');
    valueElement.classList.add('value');

    // Legger til prosenttegn etter verdien
    if (typeof value === 'string' && value.includes('%')) {
      valueElement.textContent = value; // Hvis det allerede inneholder %, legg det som det er
    } else if (!isNaN(parseFloat(value))) {
      valueElement.textContent = `${value} %`; // Legger til % for numeriske verdier
    } else {
      valueElement.textContent = value; // Legger til som det er i andre tilfeller
    }

    // Angir farge (rød for negativ, grønn for positiv)
    valueElement.style.color = parseFloat(value) < 0 ? 'var(--red)' : 'var(--green)';

    // Kombinerer strukturen
    statText.appendChild(title);
    statText.appendChild(valueElement);
    countryStat.appendChild(icon);
    countryStat.appendChild(statText);
    countryRegion.appendChild(countryStat);
  });
}
