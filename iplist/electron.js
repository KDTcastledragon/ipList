const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

// ✔ 이 방식으로 바꾸세요!
const reload = require('electron-reload').default;
reload(__dirname, {});

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1024,
        height: 768,
    });

    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file:',
        slashes: true,
    });

    win.loadURL(startUrl);
};

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});