
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
    reqs: (channel, data) => {
        if (channel === 'capture') {
            return ipcRenderer.sendSync('capture', data)
        }
        else if (channel === 'dialog') {
            return ipcRenderer.sendSync('dialog')
        }
        else if (channel === 'write') {
            return ipcRenderer.sendSync('write')
        }
    }
})
