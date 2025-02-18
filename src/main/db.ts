import Database from "better-sqlite3";
import path from "path";

const db = new Database(path.join(__dirname, "trading_journal.db"));

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

export function addTrade(trade: {
  symbol: string;
  entryPrice: number;
  exitPrice?: number;
  strategy: string;
  notes: string;
}) {
  const stmt = db.prepare(`
    INSERT INTO trades (symbol, entryPrice, exitPrice, profitLoss, date, strategy, notes)
    VALUES (?, ?, ?, ?, datetime('now'), ?, ?)
  `);
  return stmt.run(trade.symbol, trade.entryPrice, trade.exitPrice, null, trade.strategy, trade.notes);
}

export function getTrades() {
  return db.prepare("SELECT * FROM trades").all();
}
export function updateTrade(id: number, trade: {
  symbol: string;
  entryPrice: number;
  exitPrice?: number;
  strategy: string;
  notes: string;
}) {
  const stmt = db.prepare(`
    UPDATE trades
    SET symbol = ?, entryPrice = ?, exitPrice = ?, profitLoss = ?, strategy = ?, notes = ?
    WHERE id = ?
  `);
  return stmt.run(trade.symbol, trade.entryPrice, trade.exitPrice, null, trade.strategy, trade.notes, id);
}