const electron = require('electron')
const http = require('http')
const express = require('express')
const expressApp = express()
const cors = require('cors')
const router = express.Router()

const { app, BrowserWindow } = require('electron')

function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('index.html')
}

app.whenReady().then(createWindow)


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
app.on('activate', () => {
// On macOS it's common to re-create a window in the app when the
// dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})
  
  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and require them here.

expressApp.use(cors())

router.get('/file/:name', function (req, res) {
    let filename = req.params.name
    console.log(__dirname + "/file/" + filename)
  res.sendFile(__dirname + "/file/" + filename)
})

expressApp.use('/', router)

http.createServer(expressApp).listen(8000)