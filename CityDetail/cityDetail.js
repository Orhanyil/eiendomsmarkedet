document.addEventListener('DOMContentLoaded', () => {
    const dropdownToggle = document.querySelector('.city-dropdown-toggle');
    const dropdown = document.querySelector('.city-dropdown');
  
    // Toggle dropdown on click
    dropdownToggle.addEventListener('click', () => {
      dropdown.classList.toggle('show');
    });
  
    // Close dropdown if clicked outside
    document.addEventListener('click', (event) => {
      if (!dropdown.contains(event.target)) {
        dropdown.classList.remove('show');
      }
    });
  });