const { app, BrowserWindow } = require('electron');

require('@electron/remote/main').initialize();

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        title: 'Rebar calculator',
        width: 640,
        height: 480,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }
    });

    mainWindow.loadURL('http://localhost:3000');
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});