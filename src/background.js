// background.js

chrome.action.onClicked.addListener((tab) => {
  console.log('Icono de la extensión clickeado');

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: injectReactApp
  }).then(() => {
    console.log('Aplicación React inyectada correctamente');
  }).catch((error) => {
    console.error('Error al inyectar la aplicación React:', error);
  });
});

chrome.runtime.onInstalled.addListener(() => {
  console.log('La extensión está instalada.');
});

chrome.downloads.onCreated.addListener((downloadItem) => {
  console.log('Download started:', downloadItem);
  const filename = downloadItem.filename || downloadItem.finalUrl;

  // Guardar el nombre del archivo en storage local
  chrome.storage.local.get(['downloadedFiles'], (result) => {
    const downloadedFiles = result.downloadedFiles || [];
    downloadedFiles.push(filename);
    chrome.storage.local.set({ downloadedFiles });
  });
});

function injectReactApp() {
  if (document.getElementById('download-interceptor-app')) {
    return;
  }

  const container = document.createElement('div');
  container.id = 'download-interceptor-app';
  container.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  `;

  const iframe = document.createElement('iframe');
  iframe.src = chrome.runtime.getURL('index.html');
  // En background.js, dentro de la función injectReactApp
  iframe.style.cssText = `
    width: 90%;
    max-width: 800px;
    height: 400px;
    border: none;
    border-radius: 8px;
    background-color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    position: absolute;
    top: 30px;
    right: 30px;
  `;


  container.appendChild(iframe);
  document.body.appendChild(container);

  container.addEventListener('click', (e) => {
    if (e.target === container) {
      document.body.removeChild(container);
    }
  });
}
