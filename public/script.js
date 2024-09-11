const uservideo = document.getElementById('uservideo');
const startbtn = document.getElementById('startbtn');
const state = {media:null}
const socket = io();
startbtn.addEventListener('click', () => {
    const mediarecorder = new MediaRecorder(state.media, {
        audioBitsPerSecond: 128000,
        videoBitsPerSecond: 2500000,
        frameRate: 25
        
    });
    mediarecorder.ondataavailable = ev => {
        console.log("Binary data available", ev.data);
        socket.emit('binarystream', ev.data);
    }
    mediarecorder.start(25);
})
window.addEventListener('load', async e => {
    const media = await navigator
    .mediaDevices
    .getUserMedia({audio: true, video: true});
    state.media = media;
    uservideo.srcObject = media;
})