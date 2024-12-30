export function cityDetail(data) {
  console.log(data);

  const dropdownToggle = document.querySelector('.city-dropdown-toggle');
  const dropdown = document.querySelector('.city-dropdown-menu');
  const statsGrid = document.querySelector('.city-stats-grid');
  const cityTotalGrid = document.querySelector('.city-total-grid');
  let selectedCity = "Oslo"; // Standardby

  // Oppdater bydata ved første innlasting
  if (!data[selectedCity]) {
    selectedCity = Object.keys(data)[0]; // Henter første bynavn
  }
  updateCityStats(data, selectedCity);

  // Legg byer dynamisk til dropdown
  const cities = Object.keys(data).filter(city => city !== 'Norge'); // Ekskluder 'Norge'
  dropdown.innerHTML = cities.map(city => `<li>${city}</li>`).join(''); // Oppretter liste over byer

  // Dropdown-toggle
  dropdownToggle.addEventListener('click', () => {
    dropdown.classList.toggle('show');

    // Endrer pilretning
    dropdownToggle.textContent = dropdown.classList.contains('show')
      ? `${selectedCity} ▲`
      : `${selectedCity} ▼`;
  });

  // Klikkhendelse for dropdown-elementer
  dropdown.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
      selectedCity = event.target.textContent.trim(); // Henter valgt by
      dropdownToggle.textContent = `${selectedCity} ▼`; // Oppdaterer tittel
      dropdown.classList.remove('show'); // Lukker dropdown

      console.log("Valgt by:", selectedCity); // Logger valgt by til konsollen
      updateCityStats(data, selectedCity); // Oppdaterer statistikk for valgt by
    }
  });

  // Funksjon for å oppdatere bystatistikk dynamisk
  function updateCityStats(data, city) {
    const cityData = data[city]; // Henter data for valgt by
    if (!cityData) {
      console.error(`Data for byen ${city} ikke funnet`);
      return;
    }

    statsGrid.innerHTML = ''; // Tømmer tidligere innhold
    cityTotalGrid.innerHTML = ''; // Tømmer for å oppdatere indeks 6 og 7

    // Oppretter og legger til bystatistikk dynamisk
    Object.entries(cityData).forEach(([key, value], index) => {
      // Hopp over indeks 6 og 7
      if (index === 6 || index === 7) {
        const totalStatElement = document.createElement('div');
        totalStatElement.classList.add('city-statCity');

        const statText = document.createElement('div');
        statText.classList.add('stat-text');
        const title = document.createElement('p');
        title.classList.add('title');
        title.textContent = key;
        const statValue = document.createElement('p');
        statValue.classList.add('value');
        statValue.textContent = value; // Legger til uten formatering

        statText.appendChild(title);
        statText.appendChild(statValue);
        totalStatElement.appendChild(statText);
        cityTotalGrid.appendChild(totalStatElement);
      } else {
        // Formaterer øvrige statistikker
        const formattedValue = parseFloat(value) < 100 
          ? `${parseFloat(value).toFixed(1)} %`  // "x.x %" format for verdier under 100
          : `${parseFloat(value).toFixed(0)} %`; // "x %" format for verdier 100 eller større

        const statElement = document.createElement('div');
        statElement.classList.add('city-stat');

        const icon = document.createElement('span');
        icon.classList.add('icon');
        const iconImg = document.createElement('img');
        iconImg.src = parseFloat(value) >= 0 ? '../images/up.png' : '../images/down.png'; // Oppdaterer ikon basert på verdi
        iconImg.alt = 'Pil';
        icon.appendChild(iconImg); // Legger til ikon

        const statText = document.createElement('div');
        statText.classList.add('stat-text');
        const title = document.createElement('p');
        title.classList.add('title');
        title.textContent = key;
        const statValue = document.createElement('p');
        statValue.classList.add('value');
        statValue.textContent = formattedValue;

        // Setter farge for negativ og positiv verdi
        statValue.style.color = parseFloat(value) < 0 ? 'var(--red)' : 'var(--green)';

        statText.appendChild(title);
        statText.appendChild(statValue);
        statElement.appendChild(icon); // Legger til ikon
        statElement.appendChild(statText);

        statsGrid.appendChild(statElement); // Legger til nytt element i grid
      }
    });
  }
}
