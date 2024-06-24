import React, { useState, useEffect } from 'react';

function App() {
  const [filename, setFilename] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    console.log('Popup is ready');
    const port = chrome.runtime.connect({ name: "popup" });
    console.log("port on React", port);
    port.postMessage({ type: "READY" });

    port.onMessage.addListener((message) => {
      if (message.type === 'DOWNLOAD_STARTED') {
        console.log('Message received:', message);
        setFilename(message.filename);
        setIsDownloading(true);
      }
    });

    return () => {
      port.disconnect();
    };
  }, []);

  const handleCancelDownload = () => {
    setIsDownloading(false);
    setFilename('');
  };

  return (
    <div>
      <h1>Download Interceptor</h1>
      {isDownloading ? (
        <div>
          <p>Descargando: {filename}</p>
          <button onClick={handleCancelDownload}>Cancelar descarga</button>
        </div>
      ) : (
        <p>No hay descargas en progreso</p>
      )}
      <p>Este es tu mensaje personalizado.</p>
    </div>
  );
}

export default App;
