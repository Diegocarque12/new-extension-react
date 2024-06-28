import React, { useState, useEffect } from 'react';

const styles = {
  app: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    borderRadius: '8px',
  },
  header: {
    color: '#333',
    borderBottom: '2px solid #007bff',
    paddingBottom: '10px',
    marginBottom: '20px',
  },
  subHeader: {
    color: '#555',
    fontSize: '1.2em',
    marginBottom: '15px',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  listItem: {
    backgroundColor: '#fff',
    padding: '10px 15px',
    marginBottom: '10px',
    borderRadius: '4px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
  },
  icon: {
    marginRight: '10px',
    color: '#007bff',
    flexShrink: 0,
  },
  fileName: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    flex: 1,
  },
  emptyMessage: {
    color: '#888',
    fontStyle: 'italic',
  },
};

function App() {
  const [downloadedFiles, setDownloadedFiles] = useState([]);

  useEffect(() => {
    if (chrome.storage && chrome.storage.local) {
      chrome.storage.local.get(['downloadedFiles'], (result) => {
        setDownloadedFiles(result.downloadedFiles || []);
      });

      chrome.storage.onChanged.addListener((changes, namespace) => {
        if (namespace === 'local' && changes.downloadedFiles) {
          setDownloadedFiles(changes.downloadedFiles.newValue);
        }
      });
    }
  }, []);

  return (
    <div style={styles.app}>
      <h1 style={styles.header}>Download Interceptor</h1>
      <h2 style={styles.subHeader}>Archivos descargados:</h2>
      {downloadedFiles.length > 0 ? (
        <ul style={styles.list}>
          {downloadedFiles.map((file, index) => (
            <li key={index} style={styles.listItem}>
              <span style={styles.icon}>📁</span>
              <span style={styles.fileName} title={file}>{file}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p style={styles.emptyMessage}>No hay archivos descargados aún.</p>
      )}
    </div>
  );
}

export default App;
