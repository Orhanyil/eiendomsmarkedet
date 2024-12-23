const proxyUrl = 'https://api.allorigins.win/raw?url=';
const targetUrl = 'https://ommu1982.pythonanywhere.com/static/boligprisstatistikk.json';
async function fetchData() {
  try {
    const response = await fetch(proxyUrl + encodeURIComponent(targetUrl));
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}
fetchData().then(data => {
  const myData = data;
});