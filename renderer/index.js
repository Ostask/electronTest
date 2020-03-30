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
            <div class="col-3"><span class="mr-2 btn play" data-id="${track.id}">播放</span><span class="btn delete" data-id="${track.id}">删除</span></div>
        </li>`
        return html
    },'')
    const emptyTrackHTML = '<div class="alert alert-primary">还没添加音乐</div>'
    tracksList.innerHTML = tracks.length ? `<ul class="list-group">${tracksListHTML}</ul>` : emptyTrackHTML
}

const renderPlayerHTML = (name,duration) => {
    const player = $('player-status')
    const html = `
        <div class="col font-wight-bold">正在播放:${name}</div>
        <div class="col">
           <span id="current-seeker">00:00</span> / ${duration}
        </div>
    `
    player.innerHTML = html
}

musicAudio.addEventListener("loadedmetadata",() => {
    //开始渲染播放器状态
    renderPlayerHTML(currentTrack.fileName,musicAudio.duration)
})

musicAudio.addEventListener("timeupdate",() => {
    //更新播放器状态
})

$('tracksList').addEventListener('click',(event)=>{
    event.preventDefault()
    const {dataset,classList} = event.target
    const id = dataset && dataset.id

    if(id && classList.contains('play')){
        //这里开始播放音乐
        if(currentTrack && currentTrack.id == id){
            //继续播放音乐
            musicAudio.play()
            classList.replace('play','pause')
            event.target.innerHTML = '暂停'
        }else{
            //播放新的歌曲，注意还原之前的图标
            currentTrack = allTracks.find((track) => {
                return track.id === id
            })
            musicAudio.src = currentTrack.path
            musicAudio.play()
            const resetIconEle = document.querySelector('.pause')
            if(resetIconEle){
                resetIconEle.classList.replace('pause','play')
                resetIconEle.innerHTML = '播放'
            }
            classList.replace('play','pause')
            event.target.innerHTML = '暂停'
        }
    }else if(id && classList.contains('pause')){
        //这里处理暂停逻辑
        musicAudio.pause()
        classList.replace('pause','play')
        event.target.innerHTML = '继续'
    }else if(id && classList.contains('delete')){
        //这里发送事件删除这条音乐
        ipcRenderer.send('delete-track',id)
    }
})