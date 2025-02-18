"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const db_1 = require("./db");
// Handle "add-trade" request
electron_1.ipcMain.handle("add-trade", async (_, trade) => {
    return (0, db_1.addTrade)(trade);
});
// Handle "get-trades" request
electron_1.ipcMain.handle("get-trades", async () => {
    return (0, db_1.getTrades)();
});
// Handle "update-trade" request
