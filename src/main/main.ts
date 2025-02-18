import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";

let mainWindow: BrowserWindow | null = null; // ✅ Use BrowserWindow | null instead of typeof BrowserWindow

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // ✅ Correct path handling
      nodeIntegration: false, // ✅ Security best practice
      sandbox: true, // ✅ Recommended security setting
    } as Electron.WebPreferences, // ✅ Explicitly cast to WebPreferences to avoid TS errors
  });

  mainWindow.loadURL("http://localhost:8080");

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  ipcMain.handle(
    "login",
    async (_event: Electron.IpcMainInvokeEvent, email: string, password: string) => {
      return { success: email === "user@example.com" && password === "password123" };
    }
  );
});

// ✅ Handle app closing on non-macOS platforms
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// ✅ Recreate window when clicking app icon (macOS behavior)
app.on("activate", () => {
  if (mainWindow === null) {
    mainWindow = new BrowserWindow({
      width: 1200,
      height: 800,
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
        nodeIntegration: false,
        sandbox: true,
      } as Electron.WebPreferences,
    });
    mainWindow.loadURL("http://localhost:8080");
  }
});
