"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
let mainWindow;
electron_1.app.whenReady().then(() => {
    mainWindow = new electron_1.BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path_1.default.join(__dirname, "../dist/preload.js"), // ✅ Load compiled preload script
            nodeIntegration: false,
            contextIsolation: true
        },
    });
    mainWindow.loadURL(`file://${path_1.default.join(__dirname, "../renderer/index.html")}`);
    mainWindow.on("closed", () => {
        mainWindow = null;
    });
});
