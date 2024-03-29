// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("store", {
  name: (name: string) => ipcRenderer.send("name", name),

  getName: () => ipcRenderer.send("getName"),

  reciveName: (fn: (name: string) => void) =>
    ipcRenderer.on("sendName", (_, name) => fn(name)),

  newTask: (task: {a:string, b:string}) => ipcRenderer.send("newTask", task),

  getTask: () => ipcRenderer.send("getTask"),

  reciveTask: (fn: (a: string) => void) => ipcRenderer.on("sendTask", (_, task) => fn(task)),

  delTask: (task: string) => ipcRenderer.send("delTask", task),
});
