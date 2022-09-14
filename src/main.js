let path = require('path')

const { app, BrowserWindow , desktopCapturer, ipcMain} = require("electron");
let mainWindow = null;

function CreateMainWindow(){
    mainWindow = new BrowserWindow({
        title: "Main Window",
        width: 1200,
        height: 600,
        webPreferences:{
            nodeIntegration: true,
            preload: path.join(__dirname, "script.js"),
        },
    });
    mainWindow.loadFile(path.join(__dirname, "index.html"));
    
    mainWindow.webContents.openDevTools()
}
app.on("ready", CreateMainWindow)

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      CreateMainWindow();
    }
})

app.on('window-all-closed', () => {
  
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });


ipcMain.on("screenshot:capture", (e, value) => {
    desktopCapturer
    .getSources({
        types: ["window", "screen"],
        thumbnailSize: { width: 1920, height: 1080},
    })
    .then((sources) => {
        let image = sources[0].thumbnail.toDataURL();
        mainWindow.webContents.send("screenshot:captured", image);
    });
});