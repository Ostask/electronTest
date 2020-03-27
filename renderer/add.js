const {ipcRenderer} = require('electron')
const {$} = require('./helper')
const path = require('path')
let musicFilesPath = []

$('select-music').addEventListener('click',() => {
    ipcRenderer.send('open-music-file')
})

$('add-music').addEventListener('click',()=>{
    ipcRenderer.send('add-tracks',musicFilesPath)
})

const renderListHTML = (paths) => {
    const musicList = $('musicList')
    const musicItemsHTML = paths.reduce((html,music) => {
       return html += `<li class="list-group-item">${path.basename(music)}</li>`
    },'')
    musicList.innerHTML = `<ul class="list-group">${musicItemsHTML}</ul>`
}

ipcRenderer.on('selected-file',(event,path) => {
    if(Array.isArray(path.filePaths)){
        musicFilesPath = path.filePaths
        renderListHTML(musicFilesPath)
    }
})