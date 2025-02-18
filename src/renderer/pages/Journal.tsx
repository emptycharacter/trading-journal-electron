import { useEffect, useState } from "react";
import TradeCalendar from "../components/TradeCalendar";

type Trade = {
  id: string;
  userId: string;
  symbol: string;
  entryPrice: number;
  exitPrice: number | null; // Backend stores `null`
  profitLoss: number | null;
  date: string;
  strategy: string;
  notes: string;
};

// Ensure `exitPrice` and `profitLoss` never hold `null`
type TradeData = Omit<Trade, "exitPrice" | "profitLoss"> & {
  exitPrice?: number; // Use `undefined` instead of `null`
  profitLoss: number;
};

export default function Journal() {
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    window.electron.ipcRenderer.send("get-trades");

    const handleTrades = (data: Trade[]) => {
      setTrades(data);
    };

    window.electron.ipcRenderer.on("get-trades", handleTrades);

    return () => {
      window.electron.ipcRenderer.removeListener("get-trades", handleTrades);
    };
  }, []);

  // ✅ Normalize data to match `TradeData` type
  const formattedTrades: TradeData[] = trades.map((trade) => ({
    ...trade,
    exitPrice: trade.exitPrice ?? undefined, // Convert `null` to `undefined`
    profitLoss: trade.profitLoss ?? 0, // Convert `null` to `0`
  }));

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Trading Journal</h1>

      {/* Pass corrected trade data */}
      <TradeCalendar trades={formattedTrades} />

      {/* Trade List */}
      <div className="bg-white p-4 shadow-md rounded-lg mt-6">
        {trades.length === 0 ? (
          <p>No trades logged yet.</p>
        ) : (
          <ul>
            {trades.map((trade) => (
              <li key={trade.id} className="border-b py-2">
                <p>
                  <strong>{trade.symbol}</strong> - Entry: ${trade.entryPrice}, Exit:{" "}
                  {trade.exitPrice ? `$${trade.exitPrice}` : "Open"}, P/L:{" "}
                  {trade.profitLoss !== null ? `$${trade.profitLoss}` : "Pending"}
                </p>
                <p className="text-sm text-gray-500">
                  {trade.strategy} - {trade.notes}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
