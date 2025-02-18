import { ipcMain } from "electron";
import { addTrade, getTrades } from "./db";

// Handle "add-trade" request
ipcMain.handle("add-trade", async (_, trade) => {
  return addTrade(trade);
});

// Handle "get-trades" request
ipcMain.handle("get-trades", async () => {
  return getTrades();
});
// Handle "update-trade" request
