import React, { useState, useEffect } from 'react';

function App() {
  const [filenames, setFilenames] = useState([]);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    // Leer los nombres de los archivos desde sessionStorage
    chrome.storage.session.get(['downloadedFiles'], (result) => {
      const downloadedFiles = result.downloadedFiles || [];
      setFilenames(downloadedFiles);
      setIsDownloading(downloadedFiles.length > 0);
    });

    // Escuchar cambios en sessionStorage
    const handleStorageChange = (changes, areaName) => {
      if (areaName === 'session' && changes.downloadedFiles) {
        setFilenames(changes.downloadedFiles.newValue);
        setIsDownloading(changes.downloadedFiles.newValue.length > 0);
      }
    };

    chrome.storage.onChanged.addListener(handleStorageChange);

    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []);

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      padding: '20px',
    },
    header: {
      fontSize: '24px',
      color: '#333'
    },
    downloadInfo: {
      backgroundColor: '#fff',
      padding: '10px',
      borderRadius: '5px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      margin: '20px 0'
    },
    button: {
      padding: '10px 20px',
      fontSize: '16px',
      color: '#fff',
      backgroundColor: '#007bff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      marginTop: '10px'
    },
    buttonCancel: {
      backgroundColor: '#dc3545'
    },
    noDownloads: {
      color: '#666'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Download Interceptor</h1>
      {isDownloading ? (
        <div style={styles.downloadInfo}>
          <p>Descargando:</p>
          <ul>
            {filenames.map((filename, index) => (
              <li key={index}>{filename}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p style={styles.noDownloads}>No hay descargas en progreso</p>
      )}
    </div>
  );
}

export default App;
