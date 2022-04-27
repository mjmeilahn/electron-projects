
const { contextBridge, ipcRenderer } = require('electron')

// contextBridge.exposeInMainWorld('anyStringGoesHere', {
//     anythingHereToo: (channel, data) => {
//       if (channel === 'LoremIpsum') {
//         return ipcRenderer.sendSync('eventGoesHere', data)
//       }
//     }
// })
