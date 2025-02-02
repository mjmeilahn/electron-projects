
const { app, BrowserWindow, ipcMain, dialog, desktopCapturer } = require('electron')
const path = require('path')
const { writeFile } = require('fs')
const { Blob, Buffer } = require('buffer')

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit()
}

let mainWindow

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    contextIsolation: true,
    nodeIntegration: false,
    enableRemoteModule: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
  })

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'))

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished initialization and is ready to create browser windows. Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed, except on macOS. There, it's common for applications and their menu bar to stay active until the user quits explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process code. You can also put them in separate files and import them here.

ipcMain.on('capture', async (event, args) => {
  const inputSources = await desktopCapturer.getSources({
    types: args
  })
  event.returnValue = inputSources
})

ipcMain.on('save', async (event, args) => {
  const blob = new Blob(Object.values(args), {
    type: 'video/webm; codecs=vp9'
  })
  const buffer = Buffer.from(await blob.arrayBuffer())
  const { filePath } = await dialog.showSaveDialog({
      buttonLabel: 'Save Video',
      defaultPath: `video-${Date.now()}.webm`
  })
  writeFile(filePath, buffer, () => { console.log('UPDATE: Video Saved to ' + filePath) })
})
