import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";

let mainWindow: BrowserWindow | null = null;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      sandbox: true,
    } as Electron.WebPreferences,
  });

  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL("http://localhost:8080");
  } else {
    mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
  }

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

// ✅ Hot Reloading for Electron (Only in Dev Mode)
if (process.env.NODE_ENV === "development") {
  try {
    require("electron-reload")(path.join(__dirname, ".."), {
      electron: path.join(__dirname, "../node_modules/.bin/electron"),
      ignored: /node_modules|dist|[\/\\]\./,
    });
  } catch (error) {
    console.error("Electron Reload Error:", error);
  }
}
