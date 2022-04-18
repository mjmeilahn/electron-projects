
const { contextBridge, ipcRenderer } = require('electron')
const { Blob, Buffer } = require('buffer')

contextBridge.exposeInMainWorld('api', {
    reqs: async (channel, data) => {
        if (channel === 'capture') {
            return ipcRenderer.sendSync('capture', data)
        }
        else if (channel === 'save') {
            const blob = new Blob(Object.values(data), {
                type: 'video/webm; codecs=vp9'
            })
            const buffer = Buffer.from(await blob.arrayBuffer())
            return ipcRenderer.sendSync('save', buffer)
        }
    }
})
