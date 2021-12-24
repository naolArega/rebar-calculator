const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const url = require('url');

require('@electron/remote/main').initialize();

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        title: 'Rebar calculator',
        width: 360,
        height: 480,
        maximizable: false,
        icon: 'file://',
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }
    });

    mainWindow.menuBarVisible = false;

    mainWindow.loadURL(
        isDev ?
            'http://localhost:3000' :
            url.format({
                pathname: path.join(__dirname, '..', 'build', 'index.html'),
                protocol: 'file:',
                slashes: true
            })
    );
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