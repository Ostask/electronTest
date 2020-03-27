const {ipcRenderer} = require('electron')
const {$} = require("./helper")
let musicAudio = new Audio()
let allTracks
let currentTrack

$("add-music-button").addEventListener('click',()=>{
    ipcRenderer.send('add-music-window')
})

ipcRenderer.on('getTracks',(event,data) => {
    renderListHTML(data)
    allTracks = data
})

const renderListHTML = (tracks) => {
    const tracksList = $('tracksList')
    const tracksListHTML = tracks.reduce((html,track)=>{
        html += `<li class="music-track list-group-item d-flex justify-content-between align-items-center row">
            <div class="col-9">${track.fileName}</div>
            <div class="col-3"><span class="mr-2 btn play" data-id="${track.id}">播放</span><span class="btn" data-id="${track.id}">删除</span></div>
        </li>`
        return html
    },'')
    const emptyTrackHTML = '<div class="alert alert-primary">还没添加音乐</div>'
    tracksList.innerHTML = tracks.length ? `<ul class="list-group">${tracksListHTML}</ul>` : emptyTrackHTML
}

$('tracksList').addEventListener('click',(event)=>{
    event.preventDefault()
    const {dataset,classList} = event.target
    const id = dataset && dataset.id

    if(id && classList.contains('play')){
        //这里开始播放音乐
        currentTrack = allTracks.find((track) => {
            return track.id === id
        })
        musicAudio.src = currentTrack.path
        musicAudio.play()
        classList.replace('play','pause')
        event.target.innerHTML = '暂停'
    }
})