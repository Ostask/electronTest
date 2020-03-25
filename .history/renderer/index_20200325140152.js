const {ipcRenderer} = require('electron')
import {$} from './helper'

$("add-music-button").addEventListener('click',()=>{
    ipcRenderer.send('add-music-window')
})