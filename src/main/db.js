"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTrade = addTrade;
exports.getTrades = getTrades;
exports.updateTrade = updateTrade;
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const path_1 = __importDefault(require("path"));
const db = new better_sqlite3_1.default(path_1.default.join(__dirname, "trading_journal.db"));
// Create `trades` table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS trades (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    symbol TEXT NOT NULL,
    entryPrice REAL NOT NULL,
    exitPrice REAL,
    profitLoss REAL,
    date TEXT NOT NULL,
    strategy TEXT,
    notes TEXT
  )
`);
function addTrade(trade) {
    const stmt = db.prepare(`
    INSERT INTO trades (symbol, entryPrice, exitPrice, profitLoss, date, strategy, notes)
    VALUES (?, ?, ?, ?, datetime('now'), ?, ?)
  `);
    return stmt.run(trade.symbol, trade.entryPrice, trade.exitPrice, null, trade.strategy, trade.notes);
}
function getTrades() {
    return db.prepare("SELECT * FROM trades").all();
}
function updateTrade(id, trade) {
    const stmt = db.prepare(`
    UPDATE trades
    SET symbol = ?, entryPrice = ?, exitPrice = ?, profitLoss = ?, strategy = ?, notes = ?
    WHERE id = ?
  `);
    return stmt.run(trade.symbol, trade.entryPrice, trade.exitPrice, null, trade.strategy, trade.notes, id);
}
