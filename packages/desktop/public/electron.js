const path = require('path');
const url = require('url');
const electron = require('electron');

let win;

function createWindow() {
  win = new electron.BrowserWindow({ width: 800, height: 1000 });

  win.loadURL(
    url.format({
      pathname: path.resolve(__dirname, '../build/index.html'),
      protocol: 'file:',
      slashes: true,
    })
  );
}

electron.app.on('ready', createWindow);

electron.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    electron.quit();
  }
});

electron.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
