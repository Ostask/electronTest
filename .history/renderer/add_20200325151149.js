const {ipcRenderer} = require('electron')
const {$} = require('./helper')

$('select-music').addEventListener('click',() => {
    ipcRenderer.send('open-music-file')
})

const renderListHTML = (paths) => {
    const musicList = $('music-list')
    const musicItemsHTML = paths.reduce((html,music) => {
        
    })
}
let musicFilesPath = []
ipcRenderer.on('selected-file',(event,path) => {
    if(Array.isArray(path.filePaths)){
        musicFilesPath = path.filePaths
        console.log(musicFilesPath)
    }
})