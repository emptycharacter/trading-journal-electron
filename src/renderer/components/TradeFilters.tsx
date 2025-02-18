import { useState } from "react";

export default function TradeFilters({
  onFilter,
}: {
  onFilter: (filters: any) => void;
}) {
  const [symbol, setSymbol] = useState("");
  const [sort, setSort] = useState("date-desc");

  function applyFilters() {
    onFilter({ symbol, sort });
  }

  return (
    <div className="flex gap-4 p-4 bg-white shadow-md rounded-lg">
      <input
        type="text"
        placeholder="Filter by symbol (e.g., AAPL)"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        className="p-2 border rounded-lg"
      />
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="p-2 border rounded-lg"
      >
        <option value="date-desc">Newest First</option>
        <option value="date-asc">Oldest First</option>
        <option value="profit-desc">Highest P&L</option>
        <option value="profit-asc">Lowest P&L</option>
      </select>
      <button
        onClick={applyFilters}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Apply
      </button>
    </div>
  );
}
