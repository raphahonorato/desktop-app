const { ipcRenderer } = require("electron");
const ipc = ipcRenderer;
const maxResBtn = document.getElementById('maxResBtn');
const mySidebar = document.getElementById('mySidebar');
var leftMenu = true;

//////manipulando os tamanhos da janela 
//fecha a janela
closeBtn.addEventListener('click', () => {
    ipc.send('closeApp')
})


//maximiza a janela
function changeMaxResBtn(isMaximizedApp) {
    if (isMaximizedApp) {
        maxResBtn.title = 'Restore'
        maxResBtn.classList.remove('maximizeBtn')
        maxResBtn.classList.add('restoreBtn')
    } else {
        maxResBtn.title = 'Maximizar'
        maxResBtn.classList.remove('restoreBtn')
        maxResBtn.classList.add('maximizeBtn')
    }
}

//verifica o tamanho da janela pra aumentar ou dimininuir
maxResBtn.addEventListener('click', () => {
    ipc.send('maximizeRestoreApp')
})

ipc.on('isMaximized', () => { changeMaxResBtn(true) })
ipc.on('isRestored', () => { changeMaxResBtn(false) })

//minimiza a janela
minimizeBtn.addEventListener('click', () => {
    ipc.send('minimizeApp')
})

//interage com o background do menu lateral
showHideMenus.addEventListener('click', () => {
    if (leftMenu) {
        mySidebar.style.width = '0px'
        leftMenu = false
    } else {
        mySidebar.style.width = '280px'
        leftMenu = true
    }
})


//interage com o conteúdo do menu lateral HIDE/SHOW
function buttonclick() {
    var menuList = document.getElementById("menuLat");
    if (menuList.className == "menuOff") {
        menuList.className = "menuOn";
    } else {
        menuList.className = "menuOff";
    }
}