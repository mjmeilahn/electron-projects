
let mediaRecorder
let inputSources
const recordedChunks = []
const videoElement = document.querySelector('video')
const select = document.getElementById('videoSelectOptions')

async function fetchSources() {
    inputSources = await window.api.reqs('capture', ['window', 'screen'])
    console.log(inputSources)

    document.querySelectorAll('#videoSelectOptions option').forEach(option => {
        if (!option.disabled) option.remove()
    })

    inputSources.map(source => {
        const option = document.createElement('option')
        option.value = source.name
        option.innerHTML = source.name
        select.appendChild(option)
    })
}

const startBtn = document.getElementById('startBtn')
startBtn.onclick = e => {
    mediaRecorder.start()
    startBtn.classList.add('is-danger')
    startBtn.innerText = 'Recording'
}

const stopBtn = document.getElementById('stopBtn')
stopBtn.onclick = e => {
    mediaRecorder.stop()
    startBtn.classList.remove('is-danger')
    startBtn.innerText = 'Start'
}

document.getElementById('refreshBtn').onclick = e => {
    fetchSources()
}

select.onchange = function (event) {
    const value = event.target.value
    const [ source ] = inputSources.filter(i => i.name === value)
    selectSource(source)
}

async function selectSource (source) {
    const constraints = {
        audio: false,
        video: {
            mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: source.id
            }
        }
    }

    const stream = await navigator.mediaDevices.getUserMedia(constraints)
    console.log(stream)

    /*
    !!!! NOT WORKING !!!!

    1. Look at my setup to see if it's a permission issue.
    2. Look at stream created from navigator.mediaDevices.getUserMedia()
    3. Find other examples on Stack Overflow and pray.
    */
    videoElement.srcObject = stream
    videoElement.play()

    // CREATE THE RECORDER
    const options = {mimeType: 'video/webm; codecs=vp9'}
    mediaRecorder = new MediaRecorder(stream, options)
    mediaRecorder.ondataavailable = handleDataAvailable
    mediaRecorder.onstop = handleStop
}

// CAPTURES ALL RECORDED CHUNKS
function handleDataAvailable (e) {
    recordedChunks.push(e.data)
}

// SAVE THE VIDEO FILE ON STOP
function handleStop (e) {
    window.api.reqs('save', Object.assign({}, recordedChunks))
}

fetchSources()