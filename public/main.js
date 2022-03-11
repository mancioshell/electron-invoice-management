const {
  app,
  globalShortcut,
  BrowserWindow,
  autoUpdater,
  dialog,
  ipcMain
} = require('electron')

const isDev = require('electron-is-dev')
const path = require('path')

const i18n = require('./i18n')
const backup = require('./lib/backup')

const server = 'https://automatic-update-electron-invoice-management.vercel.app'
const url = `${server}/update/${process.platform}/${app.getVersion()}`

// Conditionally include the dev tools installer to load React Dev Tools
let installExtension, REACT_DEVELOPER_TOOLS

if (isDev) {
  const devTools = require('electron-devtools-installer')
  installExtension = devTools.default
  REACT_DEVELOPER_TOOLS = devTools.REACT_DEVELOPER_TOOLS
}

// Handle creating/removing shortcuts on Windows when installing/uninstalling
if (require('electron-squirrel-startup')) {
  app.quit()
}

function createAutoUpdater(i18next) {
  autoUpdater.setFeedURL({ url })

  autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
    const dialogOpts = {
      type: 'info',
      buttons: [i18next.t('button.close'), i18next.t('button.remind-later')],
      title: i18next.t('title'),
      message: process.platform === 'win32' ? releaseNotes : releaseName,
      detail: i18next.t('button.detail')
    }

    dialog.showMessageBox(dialogOpts).then((returnValue) => {
      if (returnValue.response === 0) autoUpdater.quitAndInstall()
    })
  })

  autoUpdater.on('error', (message) => {
    console.error('There was a problem updating the application')
    console.error(message)
  })

  setInterval(() => {
    autoUpdater.checkForUpdates()
  }, 6000)
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    icon: __dirname + '/favicon.ico'
  })

  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )

  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: 'bottom' })
  }

  let ret = globalShortcut.register('CommandOrControl+Shift+I', () => {
    win.webContents.toggleDevTools()
  })

  if (!ret) {
    console.log('registration failed')
  }

  ret = globalShortcut.register('CommandOrControl+R', function () {
    console.log('CommandOrControl+R is pressed')
    win.reload()
  })

  if (!ret) {
    console.log('registration failed')
  }

  if (!isDev) {
    win.removeMenu()
  }
}

app.whenReady().then(async () => {
  createWindow()
  const i18next = i18n.initI18Next(app.getLocale())

  await backup.backupDatabases(app.getPath('userData'))

  if (!isDev) createAutoUpdater(i18next)

  if (isDev) {
    installExtension(REACT_DEVELOPER_TOOLS)
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((error) => console.log(`An error occurred: , ${error}`))
  }

  ipcMain.handle('getAppVersion', async (event, args) => app.getVersion())
  ipcMain.handle('getAppLocale', async (event, args) => app.getLocale())
  ipcMain.handle('getUserData', async (event, args) => app.getPath('userData'))

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
