// content.js

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "clicked_browser_action") {
            createDialog();
        }
    }
);

function createDialog() {
    // Verificar si el diálogo ya existe
    if (document.getElementById('download-interceptor-dialog')) {
        return;
    }

    // Crear el overlay
    const overlay = document.createElement('div');
    overlay.id = 'download-interceptor-overlay';
    overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  `;

    // Crear el diálogo
    const dialog = document.createElement('div');
    dialog.id = 'download-interceptor-dialog';
    dialog.style.cssText = `
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    width: 100%;
  `;

    // Crear el título
    const title = document.createElement('h2');
    title.textContent = 'Download Interceptor';
    title.style.cssText = `
    margin-top: 0;
    color: #333;
  `;

    // Crear el contenido
    const content = document.createElement('p');
    content.textContent = 'Este es un mensaje de la extensión Download Interceptor. Aquí puedes mostrar información sobre las descargas o cualquier otro contenido relevante.';

    // Crear el botón de cerrar
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Cerrar';
    closeButton.style.cssText = `
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 15px;
  `;
    closeButton.onclick = () => {
        document.body.removeChild(overlay);
    };

    // Agregar elementos al diálogo
    dialog.appendChild(title);
    dialog.appendChild(content);
    dialog.appendChild(closeButton);

    // Agregar el diálogo al overlay
    overlay.appendChild(dialog);

    // Agregar el overlay al body
    document.body.appendChild(overlay);

    console.log("Diálogo creado y mostrado");
}
