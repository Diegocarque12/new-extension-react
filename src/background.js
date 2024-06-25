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
