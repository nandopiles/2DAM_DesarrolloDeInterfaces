const { app, BrowserWindow, dialog } = require('electron')
require('@electron/remote/main').initialize()

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 700,
        height: 450,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    require("@electron/remote/main").enable(mainWindow.webContents) //necesario para arbrir Explorador Archivos
    // quita menu por defecto de chromium
    //mainWindow.setMenu(null);

    mainWindow.loadFile('index.html')
}

app.whenReady().then(createWindow);