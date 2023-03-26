const { app, BrowserWindow } = require('electron')
const path = require('path')

// Create a window and load HTML content
function createWindow() {
    const win = new BrowserWindow({
        width: 1440,
        height: 1024,
        resizable: false,
        maximizable: false,
        minimizable: false,
        fullscreenable: false,
        //icon: path.join(__dirname, `assets/imgs/icon.ico`),
        webPreferences: {
            devTools: true,
            nodeIntegration: false,
            contextIsolation: false,
            preload: path.join(__dirname, "Preload.js")
        }
    })

    win.loadFile(path.join(__dirname, "webview/index.html"))
}

// When electron is ready, create window and listen
app.whenReady().then(() => {
    createWindow()

    // Listener "activate"
    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    // Listener "window-all-closed"
    app.on("window-all-closed", () => {
        if (process.platform !== "darwin") app.quit()
    })
})
