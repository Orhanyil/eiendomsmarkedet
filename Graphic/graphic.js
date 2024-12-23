document.addEventListener("DOMContentLoaded", () => {
    const ctx = document.getElementById('barChart').getContext('2d');
    
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Stavanger', 'Kristiansand', 'Bergen', 'Tromsø', 'Oslo'],
        datasets: [
          {
            label: 'Kommune',
            data: [0.5, 0.2, -0.1, -0.4, 0.3],
            backgroundColor: 'rgba(92, 74, 199, 0.7)'
          },
          {
            label: 'Norge',
            data: [0.4, 0.1, 0, -0.3, 0.2],
            backgroundColor: 'rgba(240, 58, 95, 0.7)'
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
  });

  document.addEventListener('DOMContentLoaded', () => {
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdown = document.querySelector('.dropdown');
  
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