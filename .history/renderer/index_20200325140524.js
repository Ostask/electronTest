const {ipcRenderer} = require('electron')
const {$} = require("./helper")
console.log($)

$("add-music-button").addEventListener('click',()=>{
    ipcRenderer.send('add-music-window')
})