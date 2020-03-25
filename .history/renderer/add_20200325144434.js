const {ipcRenderer} = require('electron')
const {$} = require('./helper')

$('select-music').addEventListener('click',() => {
    ipcRenderer.send('open-music-file')
})

ipcRenderer.on('selected-file',(event,path) => {
    console.log(path)
})