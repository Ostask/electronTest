const {app, BrowserWindow,ipcMain} = require('electron')

class AppWindow extends BrowserWindow {
  constructor(config){
    const basicConfig = {
      width: 800,
      height: 600,
      webPreferences:{
        nodeIntegration:true
      }
    }
   // const finalConfig = Object.assign(basicConfig,config)
    const finalConfig = {...basicConfig,...config}
  }
}

app.on('ready',() => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences:{
      nodeIntegration:true
    }
  })
  mainWindow.loadFile("./renderer/index.html")

  ipcMain.on('add-music-window',() => {
    const addWindow = new BrowserWindow({
      width: 500,
      height: 400,
      webPreferences:{
        nodeIntegration:true
      },
      parent:mainWindow
    })
    addWindow.loadFile("./renderer/add.html")
  })
})