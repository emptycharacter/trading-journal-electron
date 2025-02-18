import { useEffect, useState } from "react";
import TradeFilters from "./TradeFilters";

export default function TradeList() {
  const [trades, setTrades] = useState<any[]>([]);
  const [filteredTrades, setFilteredTrades] = useState<any[]>([]);

  useEffect(() => {
    window.electron.send("get-trades");
    window.electron.receive("get-trades", (data) => {
      setTrades(data);
      setFilteredTrades(data); // Default view = all trades
    });
  }, []);

  function applyFilters(filters: any) {
    let filtered = trades;
    if (filters.symbol) {
      filtered = filtered.filter((t) =>
        t.symbol.toLowerCase().includes(filters.symbol.toLowerCase())
      );
    }
    if (filters.sort === "date-desc") {
      filtered.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } else if (filters.sort === "date-asc") {
      filtered.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    } else if (filters.sort === "profit-desc") {
      filtered.sort((a, b) => (b.profitLoss || 0) - (a.profitLoss || 0));
    } else if (filters.sort === "profit-asc") {
      filtered.sort((a, b) => (a.profitLoss || 0) - (b.profitLoss || 0));
    }
    setFilteredTrades(filtered);
  }

  return (
    <div>
      <TradeFilters onFilter={applyFilters} />
      <div className="bg-white p-4 shadow-md rounded-lg mt-4">
        {filteredTrades.length === 0 ? (
          <p>No trades found.</p>
        ) : (
          <ul>
            {filteredTrades.map((trade, index) => (
              <li key={index} className="border-b py-2">
                <p>
                  <strong>{trade.symbol}</strong> - Entry: ${trade.entryPrice},
                  Exit: {trade.exitPrice ? `$${trade.exitPrice}` : "Open"}, P/L:{" "}
                  {trade.profitLoss !== null
                    ? `$${trade.profitLoss}`
                    : "Pending"}
                </p>
                <p className="text-sm text-gray-500">
                  {trade.strategy} - {trade.notes}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
