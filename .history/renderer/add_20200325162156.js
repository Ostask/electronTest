const {ipcRenderer} = require('electron')
const {$} = require('./helper')
const path = require('path')

$('select-music').addEventListener('click',() => {
    ipcRenderer.send('open-music-file')
})

const renderListHTML = (paths) => {
    const musicList = $('musicList')
    const musicItemsHTML = paths.reduce((html,music) => {
       return html += `<li class="list-group-item">${path.basename(music)}</li>`
    },'')
    musicList.innerHTML = `<ul class="list-group">${musicItemsHTML}</ul>`
}
let musicFilesPath = []
ipcRenderer.on('selected-file',(event,path) => {
    if(Array.isArray(path.filePaths)){
        musicFilesPath = path.filePaths
        console.log(musicFilesPath)
        renderListHTML(musicFilesPath)
    }
})