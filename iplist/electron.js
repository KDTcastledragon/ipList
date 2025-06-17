const { app, BrowserWindow } = require('electron');
const { dialog } = require('electron');
// const isDev = require('electron-is-dev');

function createWindow() {
  console.log(`제대로 작동중인가요???`);
    console.log(`제대로 작동중인가요???`);
    console.log(`제대로 작동중인가요???`);

  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    },
  });

const isDev = !app.isPackaged;

  if (isDev) {
     console.error(`페이지 로드 실패: ${errorDescription} (${errorCode}) at ${validatedURL}`);
    win.loadURL('http://localhost:3000');
  } else {
    win.loadFile('./build/index.html');
  }

  // win.webContents.openDevTools();
  win.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL) => {
    dialog.showErrorBox('페이지 로드 실패', `오류 코드: ${errorCode}\n설명: ${errorDescription}`);
});
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

