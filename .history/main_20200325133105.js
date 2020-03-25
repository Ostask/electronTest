const {app, BrowserWindow,ipcMain} = require('electron')

class AppWindow extends BrowserWindow {
  constructor(config,fileLocation){
    const basicConfig = {
      width: 800,
      height: 600,
      webPreferences:{
        nodeIntegration:true
      }
    }
   // const finalConfig = Object.assign(basicConfig,config)
    const finalConfig = {...basicConfig,...config}
    supper(finalConfig)
    this.loadFile(fileLocation)
  }
}

app.on('ready',() => {
  const mainWindow = new AppWindow({},"./renderer/index.html")

  ipcMain.on('add-music-window',() => {
    const addWindow = new AppWindow({width:500,height:500,parent:mainWindow},"./renderer/add.html")
})