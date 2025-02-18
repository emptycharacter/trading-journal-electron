export interface ElectronAPI {
    ipcRenderer: any;
    send: (channel: string, data?: any) => void;
    receive: (channel: string, func: (data: any) => void) => void;
  }
  
  declare global {
    interface Window {
      electron: ElectronAPI;
    }
  }
  
  export {};
  