
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
  reqs: async (channel, data) => {
    if (channel === 'capture') {
      return ipcRenderer.sendSync('capture', data)
    }
    else if (channel === 'save') {
      return ipcRenderer.sendSync('save', data)
    }
  }
})
