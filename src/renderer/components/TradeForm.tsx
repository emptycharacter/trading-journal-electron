import { useState } from "react";

export default function TradeForm() {
  const [formData, setFormData] = useState({
    symbol: "",
    entryPrice: "",
    exitPrice: "",
    strategy: "",
    notes: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    window.electron.ipcRenderer.send("add-trade", formData);
    setFormData({
      symbol: "",
      entryPrice: "",
      exitPrice: "",
      strategy: "",
      notes: "",
    });
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded-lg">
      <input
        type="text"
        placeholder="Symbol (e.g., AAPL)"
        value={formData.symbol}
        onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
        className="w-full p-2 border rounded-lg mb-2"
      />
      <input
        type="number"
        placeholder="Entry Price"
        value={formData.entryPrice}
        onChange={(e) =>
          setFormData({ ...formData, entryPrice: e.target.value })
        }
        className="w-full p-2 border rounded-lg mb-2"
      />
      <input
        type="number"
        placeholder="Exit Price (Optional)"
        value={formData.exitPrice}
        onChange={(e) =>
          setFormData({ ...formData, exitPrice: e.target.value })
        }
        className="w-full p-2 border rounded-lg mb-2"
      />
      <input
        type="text"
        placeholder="Strategy"
        value={formData.strategy}
        onChange={(e) => setFormData({ ...formData, strategy: e.target.value })}
        className="w-full p-2 border rounded-lg mb-2"
      />
      <textarea
        placeholder="Notes"
        value={formData.notes}
        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        className="w-full p-2 border rounded-lg mb-2"
      />
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Save Trade
      </button>
    </form>
  );
}
