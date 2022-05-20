'use strict';

const { app, BrowserWindow } = require("electron");
const path = require("path");


const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      autoHideMenuBar: true
    })
  
    win.loadFile(path.join(__dirname, "public/index.html"));
}

// Exiting(respects platform standards)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

app.whenReady().then(() => {
    createWindow()

    // Mac: Open window if none open
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Hot reloading
try {
    require('electron-reloader')(module)
} catch (_) {}