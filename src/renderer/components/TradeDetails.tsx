import React from "react";

type TradeData = {
  date: string;
  profitLoss: number;
  symbol: string;
  entryPrice: number;
  exitPrice?: number;
  strategy: string;
  notes: string;
};

export default function TradeDetails({ trades, onClose }: { trades: TradeData[]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
  <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-md">
    <h3 className="text-lg font-semibold mb-2 text-center">Trades on {trades[0].date}</h3>
    <ul className="text-xs sm:text-base">
      {trades.map((trade, index) => (
        <li key={index} className="border-b py-2">
          <p><strong>{trade.symbol}</strong> - Entry: ${trade.entryPrice}, Exit: {trade.exitPrice ? `$${trade.exitPrice}` : "Open"}, P/L: {trade.profitLoss !== null ? `$${trade.profitLoss}` : "Pending"}</p>
          <p className="text-sm text-gray-500">{trade.strategy} - {trade.notes}</p>
        </li>
      ))}
    </ul>
    <button onClick={onClose} className="mt-4 px-4 py-2 bg-red-600 text-white rounded w-full sm:w-auto">
      Close
    </button>
  </div>
</div>
  );
}
