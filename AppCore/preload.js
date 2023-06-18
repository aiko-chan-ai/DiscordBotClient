const { contextBridge, ipcRenderer } = require('electron');


contextBridge.exposeInMainWorld('title', {
  mini: () => {
    ipcRenderer.send('minimize')

  },
  max: () => {
    ipcRenderer.send('max');

  },
  close: () => {
    ipcRenderer.send('close');
  }
})