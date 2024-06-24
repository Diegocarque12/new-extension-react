let activePort = null;

chrome.runtime.onConnect.addListener((port) => {
  console.assert(port.name === "popup");
  activePort = port;

  port.onMessage.addListener((msg) => {
    if (msg.type === "READY") {
      chrome.downloads.onCreated.addListener((downloadItem) => {
        console.log('Download started:', downloadItem);
        chrome.downloads.onChanged.addListener(function onChanged(delta) {
          if (delta.id === downloadItem.id && delta.filename) {
            console.log('Filename available:', delta.filename.current);
            if (activePort) {
              activePort.postMessage({ type: 'DOWNLOAD_STARTED', filename: delta.filename.current });
            }
            chrome.downloads.onChanged.removeListener(onChanged);
          }
        });
      });
    }
  });

  port.onDisconnect.addListener(() => {
    activePort = null;
  });
});
