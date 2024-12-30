# eiendomsmarkedet

https://orhanyil.github.io/eiendomsmarkedet/

Det vil brukes som en del av en tilfeldig nyhetsartikkel.

# Figma-lenken:

https://www.figma.com/design/e468SVdlRsfEQlJsFcekqO/ADMIN-DASHBOARD-DESIGN-PAGE-1-(Community)?node-id=0-1&p=f&t=kyDFk3Wy6HRTRmLZ-0

# Eiendomsmarkedet

Eiendomsmarkedet er et webprosjekt som visualiserer boligprisstatistikk for forskjellige regioner i Norge. Prosjektet bruker dynamiske data for å generere grafer, statistikk og interaktive elementer.

## Funksjonaliteter

- **Interaktive dropdowns**: Brukere kan velge spesifikke tidsperioder og regioner.
- **Dynamiske grafer**: Bruker `Chart.js` for å visualisere boligprisendringer.
- **Responsivt design**: Tilpasser seg ulike skjermstørrelser.
- **Dynamisk datahåndtering**: Henter data fra eksterne API-er og oppdaterer visningen i sanntid.

---

## Teknologier

- **Frontend**: HTML, CSS, JavaScript
- **Biblioteker**: kun [Chart.js](https://www.chartjs.org/)
- **API-integrasjon**: Henter data fra en JSON-endepunkt.

---

## Filstruktur

Prosjektet er organisert som følger:

EIENDOMSMARKEDET/
├── .vscode/                 # Redigeringsspesifikke innstillinger
├── CityDetail/              # CSS og JS for byspesifikke detaljer
│   ├── cityDetail.css
│   ├── cityDetail.js
├── CountryDetail/           # CSS og JS for landsstatistikk
│   ├── countryDetail.css
│   ├── countryDetail.js
├── Graphic/                 # Grafrelaterte filer
│   ├── graphic.css
│   ├── graphic.js
├── images/                  # Ikoner og andre bildefiler
│   ├── down.png
│   ├── up.png
├── fetchData.js             # Modul for å hente data fra API
├── index.html               # Hoved-HTML-fil
├── README.md                # Dokumentasjon for prosjektet
├── style.css                # Felles CSS-stiler
