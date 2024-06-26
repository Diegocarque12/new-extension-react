chrome.action.onClicked.addListener(() => {
  chrome.windows.getCurrent((currentWindow) => {
    const top = currentWindow.top;
    const left = currentWindow.left + currentWindow.width - 400; // Ajusta el ancho de la ventana según sea necesario

    chrome.windows.create({
      url: chrome.runtime.getURL("index.html"),
      type: "popup",
      width: 500,
      height: 400,
      top: top,
      left: left
    });
  });
});

chrome.runtime.onInstalled.addListener(() => {
  console.log('La extensión está instalada.');
});

chrome.downloads.onCreated.addListener((downloadItem) => {
  console.log('Download started:', downloadItem);
  const filename = downloadItem.filename || downloadItem.referrer;

  // Guardar el nombre del archivo en sessionStorage
  chrome.storage.session.get(['downloadedFiles'], (result) => {
    const downloadedFiles = result.downloadedFiles || [];
    downloadedFiles.push(filename);
    chrome.storage.session.set({ downloadedFiles });
  });
});
