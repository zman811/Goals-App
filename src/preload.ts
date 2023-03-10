// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

//const { contextBridge, ipcRenderer } = require('electron')
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("store", {
  name: (name: string) => ipcRenderer.send("name", name),
  getName: () => ipcRenderer.send("getName"),
  reciveName: (fn: (name: string) => void) =>
    ipcRenderer.on("sendName", (_, name) => fn(name)),
});
