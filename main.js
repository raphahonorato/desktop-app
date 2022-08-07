const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const ipc = ipcMain;

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1280,
        height: 600,
        minWidth: 940,
        minHeight: 560,
        frame: false,  //desabilita os botões de janela padrão
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('src/index.html')
    win.setBackgroundColor('#343B48')

    //fecha janela com botão personalizado
    ipc.on('closeApp', () => {
        console.log('Clicou pra fechar!')
        win.close()
    })

    //maximiza a janela com botão personalizado
    ipc.on('maximizeRestoreApp', () => {
        if (win.isMaximized()) {
            console.log('Clicou pra maximizar!')
            win.restore()
        } else {
            win.maximize()
        }
    })


    win.on('maximize', () => {
        win.webContents.send('isMaximized')
    })

    win.on('unmaximize', () => {
        win.webContents.send('isRestored')
    })

    //minimiza a janela com botão personalizado
    ipc.on('minimizeApp', () => {
        console.log('Clicou pra minimizar!')
        win.minimize()
    })
}


app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) { createWindow() }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') { app.quit() }
})