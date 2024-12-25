export function countryDetail() {
document.addEventListener("DOMContentLoaded", () => {
    const values = document.querySelectorAll(".value"); // Tüm "value" sınıflarını seç
  
    values.forEach((value) => {
      const number = parseFloat(value.textContent); // Metin içeriğini sayıya çevir
      if (number < 0) {
        value.style.color = "var(--red)"; // Negatifse kırmızı yap
      } else if (number > 0) {
        value.style.color = "var(--green)"; // Pozitifse yeşil yap
      }
    });
  });
}