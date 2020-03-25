const {ipcRenderer} = require('electron')
import {$} from './helper'

console.log($)

$("add-music-button").addEventListener('click',()=>{
    ipcRenderer.send('add-music-window')
})