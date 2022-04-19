
let recorder
let sources
const video = document.querySelector('video')
const select = document.getElementById('videoSelectOptions')

async function fetchSources() {
    sources = await window.api.reqs('capture', ['window', 'screen'])
    console.log(sources)

    document.querySelectorAll('#videoSelectOptions option').forEach(option => {
        if (!option.disabled) option.remove()
    })

    sources.map(source => {
        const option = document.createElement('option')
        option.value = source.name
        option.innerHTML = source.name
        select.appendChild(option)
    })
}

const startBtn = document.getElementById('startBtn')
startBtn.onclick = function () {
    recorder.start()
    startBtn.classList.add('is-danger')
    startBtn.innerText = 'Recording'
}

const stopBtn = document.getElementById('stopBtn')
stopBtn.onclick = function () {
    recorder.stop()
    startBtn.classList.remove('is-danger')
    startBtn.innerText = 'Start'
}

document.getElementById('refreshBtn').onclick = function () {
    fetchSources()
}

select.onchange = function (event) {
    const value = event.target.value
    const source = sources.find(i => i.name === value)
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

    // SHOW A PREVIEW THROUGH <video/>
    const stream = await navigator.mediaDevices.getUserMedia(constraints)
    video.srcObject = stream
    console.log(video.srcObject)
    video.play()
    // video.onloadedmetadata = e => video.play()

    // CREATE THE RECORDER & SEND STREAM
    const chunks = []
    const options = { mimeType: 'video/webm; codecs=vp9' }
    recorder = new MediaRecorder(stream, options)
    recorder.ondataavailable = function (e) { chunks.push(e.data) }
    recorder.onstop = () => window.api.reqs('save', Object.assign({}, chunks))
}

fetchSources()
