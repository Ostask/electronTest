const {app, BrowserWindow,ipcMain,dialog} = require('electron')
const DataStore = require('./musicDataStore.js')
const myStore = new DataStore({
  'name':'Music Data'
})

class AppWindow extends BrowserWindow {
  constructor(config,fileLocation){
    const basicConfig = {
      width: 800,
      height: 600,
      show:false,
      webPreferences:{
        nodeIntegration:true
      }
    }
   // const finalConfig = Object.assign(basicConfig,config)
    const finalConfig = {...basicConfig,...config}
    super(finalConfig)
    this.loadFile(fileLocation)
    this.once('ready-to-show',()=>{
      this.show()
    })
  }
}

app.on('ready',() => {
  const mainWindow = new AppWindow({},"./renderer/index.html")

  mainWindow.webContents.on('did-finish-load',() => {
    console.log('page did finish load')
    mainWindow.send('getTracks',myStore.getTracks())
  })

  ipcMain.on('add-music-window',() => {
    const addWindow = new AppWindow(
      {
        width:500,
        height:500,
        parent:mainWindow
      },"./renderer/add.html")
    })
  ipcMain.on('open-music-file',(event)=>{
    dialog.showOpenDialog({
      properties:['openFile','multiSelections'],
      filters: [
        {name: 'Music', extensions: ['mp3','m4a']},
      ]
    }).then((files) => {
      if(files){
        event.sender.send('selected-file',files)
      }
    })
  }) 
  ipcMain.on('add-tracks',(event,data) => {
    const updatedTracks = myStore.addTracks(data).getTracks()
    mainWindow.send('getTracks',updatedTracks)
  }) 
  ipcMain.on('delete-track',(event,id) => {
    const updatedTracks = myStore.deleteTrack(id).getTracks()
    mainWindow.send('getTracks',updatedTracks)
  })
})