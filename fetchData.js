const proxyUrl = 'https://api.allorigins.win/raw?url=';
const targetUrl = 'https://ommu1982.pythonanywhere.com/static/boligprisstatistikk.json';

// Veriyi çeken fonksiyonu tanımla ve dışa aktar
export async function fetchData() {
  try {
    const response = await fetch(proxyUrl + encodeURIComponent(targetUrl));
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    return data; // Veriyi döndür
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Hata durumunu bildir
  }
}