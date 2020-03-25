const {ipcRenderer} = require('electron')
import {$} from './helper'

document.getElementById("add-music-button").addEventListener('click',()=>{
    ipcRenderer.send('add-music-window')
})