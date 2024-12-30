import { fetchData } from '../fetchData.js'; // Importerer fetchData-funksjonen
import { cityDetail } from '../CityDetail/cityDetail.js';
import { countryDetail } from '../CountryDetail/countryDetail.js';

let selectedDropdownData = "Endring siste måned"; // Global valgt dropdown-data
let chartInstance = null; // Global grafreferanse

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const data = await fetchData(); // Henter data
    console.log('Hentede data i Graphic.js:', data); // Logger data i konsollen
    initializeChart(data); // Starter grafen
    updateDetails(data);
    cityDetail(data); // Oppdaterer detaljer for Top og Minst Vekst
    countryDetail(data);

    const dropdownToggle = document.querySelector('.graphic-dropdown-toggle');
    const dropdown = document.querySelector('.graphic-dropdown-menu');

    // Oppretter dropdown-elementer dynamisk
    const dropdownItems = Object.keys(data['Norge']).slice(0,6); // Henter nøklene fra Norge-data
    dropdown.innerHTML = dropdownItems
      .map((item) => `<li>${item}</li>`)
      .join(''); // Oppretter listeelementer

    const dropdownListItems = dropdown.querySelectorAll('li'); // Velger alle <li>-elementer

    // Dropdown-toggle
    dropdownToggle.addEventListener('click', () => {
      dropdown.classList.toggle('show');

      // Endrer pilretning
      dropdownToggle.textContent = dropdown.classList.contains('show')
        ? `${selectedDropdownData} ▲`
        : `${selectedDropdownData} ▼`;
    });

    // Klikkhendelse for dropdown-elementer
    dropdownListItems.forEach((item) => {
      item.addEventListener('click', () => {
        selectedDropdownData = item.textContent ? item.textContent : "Endring siste måned"; // Henter teksten fra det klikkede elementet
        dropdownToggle.textContent = `${selectedDropdownData} ▼`; // Oppdaterer tittelen
        dropdown.classList.remove('show'); // Lukker dropdown

        // Oppdaterer grafen
        if (chartInstance) {
          chartInstance.destroy(); // Ødelegger eksisterende graf
        }
        initializeChart(data); // Oppretter ny graf
        updateDetails(data); // Oppdaterer også detaljer
      });
    });

    // Lukk dropdown ved å klikke utenfor
    document.addEventListener('click', (event) => {
      if (!dropdownToggle.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.classList.remove('show');
        dropdownToggle.textContent = `${selectedDropdownData} ▼`; // Endrer pilen nedover
      }
    });

  } catch (error) {
    console.error('Feil ved henting av data:', error);
  }
});

// Starter grafen
function initializeChart(data) {
  
  const labels = Object.keys(data).filter((key) => key !== 'Norge'); // Fjerner Norge fra byene
  const kommuneData = labels.map((city) => parseValue(data[city][selectedDropdownData])); // Henter verdiene for de valgte byene

  // Setter dynamiske farger: Negativ er rød, positiv er grønn
  const backgroundColors = kommuneData.map(value => (value < 0 ? 'rgb(226, 97, 138)' : 'rgb(105, 176, 72)'));
  const maxValue = Math.max(...kommuneData) + 0.2; // Henter høyeste verdi og legger til 0.2
  
  const ctx = document.getElementById('barChart').getContext('2d');
  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          data: kommuneData,
          backgroundColor: backgroundColors,
          borderRadius: 8, // Legger avrunding på stolpene
          borderSkipped: false // Bruker avrunding på alle kanter
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: false
        }
      },
      scales: {
        y: {
          beginAtZero: true, // Starter fra null
          suggestedMax: maxValue // Øker maksverdien på skalaen
        }
      }
    }
  });
}

// Oppdaterer detaljer
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

// Parser verdier
function parseValue(value) {
  if (typeof value === "string") {
    if (value.includes("%")) {
      return parseFloat(value.replace("%", "").trim());
    }
    return parseFloat(value.replace(/\s|,/g, ""));
  }
  return value;
}
