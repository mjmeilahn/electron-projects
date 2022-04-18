
const { contextBridge, ipcRenderer, dialog } = require('electron')
const { Blob, Buffer } = require('buffer')
const { writeFile } = require('fs')

contextBridge.exposeInMainWorld('api', {
    reqs: async (channel, data) => {
        if (channel === 'capture') {
            return ipcRenderer.sendSync('capture', data)
        }
        else if (channel === 'save') {
            const blob = new Blob([data], {
                type: 'video/webm; codecs=vp9'
            })
            const buffer = Buffer.from(await blob.arrayBuffer())
            return ipcRenderer.sendSync('save', buffer)
        }
    }
})
