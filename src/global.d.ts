export {};

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        invoke: (channel: string, ...args: any[]) => Promise<any>;
        send: (channel: string, ...args: any[]) => void;
        on: (channel: string, listener: (event: any, ...args: any[]) => void) => void;
        receive: (channel: string, listener: (event: any, ...args: any[]) => void) => void;
        removeListener: (channel: string, listener: (...args: any[]) => void) => void; // ✅ Ensure this is here
      };
    };
  }
}
