const {ipcRenderer} = require('electron')
const {$} = require('./helper')

$('select-music').addEventListener('click',() => {
    ipcRenderer.send('open-music-file')
})

let musicFilesPath = []
ipcRenderer.on('selected-file',(event,path) => {
    if(Array.isArray(path.filePaths)){
        musicFilePath = path
        console.log(musicFilesPath)
    }
})