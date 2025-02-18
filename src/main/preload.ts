import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  ipcRenderer: {
    invoke: (channel: string, ...args: any[]) => ipcRenderer.invoke(channel, ...args),
    send: (channel: string, ...args: any[]) => ipcRenderer.send(channel, ...args), // ✅ Ensure send is here
    on: (channel: string, listener: (event: any, ...args: any[]) => void) =>
      ipcRenderer.on(channel, (event, ...args) => listener(event, ...args)),
    receive: (channel: string, listener: (event: any, ...args: any[]) => void) =>
      ipcRenderer.on(channel, (event, ...args) => listener(event, ...args)),
    removeListener: (channel: string, listener: (...args: any[]) => void) =>
      ipcRenderer.removeListener(channel, listener),
  },
});
