import { useEffect, useState } from "react";
import TradeFilters from "./TradeFilters";

type Trade = {
  id: string;
  userId: string;
  symbol: string;
  entryPrice: number;
  exitPrice: number | null;
  profitLoss: number | null;
  date: string;
  strategy: string;
  notes: string;
};

type FilterOptions = {
  symbol?: string;
  sort?: "date-desc" | "date-asc" | "profit-desc" | "profit-asc";
};

export default function TradeList() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [filteredTrades, setFilteredTrades] = useState<Trade[]>([]);

  useEffect(() => {
    window.electron.ipcRenderer.send("get-trades");

    const handleTrades = (_event: any, data: Trade[]) => {
      setTrades(data);
      setFilteredTrades(data); // Default: show all trades
    };

    window.electron.ipcRenderer.on("get-trades", handleTrades);

    return () => {
      // ✅ Fix: Use `removeListener` correctly by passing the same function reference
      window.electron.ipcRenderer.removeListener("get-trades", handleTrades);
    };
  }, []);

  function applyFilters(filters: FilterOptions) {
    let filtered = [...trades];

    if (filters.symbol) {
      filtered = filtered.filter((t) =>
        t.symbol.toLowerCase().includes(filters.symbol!.toLowerCase())
      );
    }

    switch (filters.sort) {
      case "date-desc":
        filtered.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        break;
      case "date-asc":
        filtered.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        break;
      case "profit-desc":
        filtered.sort((a, b) => (b.profitLoss || 0) - (a.profitLoss || 0));
        break;
      case "profit-asc":
        filtered.sort((a, b) => (a.profitLoss || 0) - (b.profitLoss || 0));
        break;
      default:
        break;
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
            {filteredTrades.map((trade) => (
              <li key={trade.id} className="border-b py-2">
                <p>
                  <strong>{trade.symbol}</strong> - Entry: ${trade.entryPrice},
                  Exit: {trade.exitPrice ? `$${trade.exitPrice}` : "Open"}, P/L:{" "}
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
    </div>
  );
}
