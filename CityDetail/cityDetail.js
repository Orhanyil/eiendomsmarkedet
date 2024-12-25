export function cityDetail() {
document.addEventListener('DOMContentLoaded', () => {
    const dropdownToggle = document.querySelector('.city-dropdown-toggle');
    const dropdown = document.querySelector('.city-dropdown-menu');
  
    //Dropdown toggle
    dropdownToggle.addEventListener('click', () => {
      console.log("clicked");
      dropdown.classList.toggle('show');

      // Ok yönünü değiştir
      if (dropdown.classList.contains('show')) {
        dropdownToggle.textContent = "Velg by ▲"; // Yukarı oku
      } else {
        dropdownToggle.textContent = "Velg by ▼"; // Aşağı oku
      }
    });
  
    //  Dropdown dışına tıklanınca kapat
    document.addEventListener('click', (event) => {
      if (!dropdownToggle.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.classList.remove('show');
        dropdownToggle.textContent = "Velg by ▼"; // Oku aşağı döndür
      }
    });
  });
}