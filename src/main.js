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
    mainWindow.loadFile(path.join(__dirname, "main-window.html"));
    mainWindow.on("closed", () => {
        mainWindow = null;
    });
}
app.on("ready", () => {
    CreateMainWindow();
});

ipcMain.on("screenshot:capture", (e, value) => {
    desktopCapturer
    .getSources({
        types: ["screen"],
        thumbnailSize: { width: 1920, height: 1080},
    })
    .then((sources) => {
        let image = sources[0].thumbnail.toDataURL();
        mainWindow.webContents.send("screenshot:captured", image);
    });
});