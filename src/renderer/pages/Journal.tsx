import { useEffect, useState } from "react";
import TradeCalendar from "../components/TradeCalendar";

export default function Journal() {
  const [trades, setTrades] = useState<any[]>([]);

  useEffect(() => {
    window.electron.send("get-trades");
    window.electron.receive("get-trades", (data) => {
      setTrades(data);
    });
  }, []);

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Trading Journal</h1>

      {/* Trading Calendar */}
      <TradeCalendar trades={trades} />

      {/* Trade List */}
      <div className="bg-white p-4 shadow-md rounded-lg mt-6">
        {trades.length === 0 ? (
          <p>No trades logged yet.</p>
        ) : (
          <ul>
            {trades.map((trade, index) => (
              <li key={index} className="border-b py-2">
                <p>
                  <strong>{trade.symbol}</strong> - Entry: ${trade.entryPrice}, Exit: {trade.exitPrice ? `$${trade.exitPrice}` : "Open"}, P/L: {trade.profitLoss !== null ? `$${trade.profitLoss}` : "Pending"}
                </p>
                <p className="text-sm text-gray-500">{trade.strategy} - {trade.notes}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
