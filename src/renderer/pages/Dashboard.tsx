import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

import TradeCalendar from "../components/TradeCalendar";

type TradeData = {
  id: string;
  date: string;
  symbol: string;
  strategy: string;
  notes: string;
  entryPrice: number;
  exitPrice: number | null;
  profitLoss: number | null;
};

export default function Dashboard() {
  const [trades, setTrades] = useState<TradeData[]>([]);
  const [balanceHistory, setBalanceHistory] = useState<{ date: string; balance: number }[]>([]);
  const [totalProfit, setTotalProfit] = useState<number>(0);
  const [winRate, setWinRate] = useState<number>(0);
  const [tradeCount, setTradeCount] = useState<number>(0);

  useEffect(() => {
    // Fetch trade data from Electron backend
    window.electron.ipcRenderer.send("get-trades");

    const handleTrades = (_event: any, data: any[]) => {
      const formattedTrades: TradeData[] = data.map((trade) => ({
        id: trade.id,
        date: trade.date || "",  // ✅ Ensure date exists
        symbol: trade.symbol || "",
        strategy: trade.strategy || "",
        notes: trade.notes || "",
        entryPrice: trade.entryPrice ?? 0,
        exitPrice: trade.exitPrice ?? null,
        profitLoss: trade.profitLoss ?? null,
      }));

      setTrades(formattedTrades);
      calculateStats(formattedTrades);
    };

    window.electron.ipcRenderer.on("get-trades", handleTrades);

    return () => {
      window.electron.ipcRenderer.removeListener("get-trades", handleTrades);
    };
  }, []);

  // Calculate balance over time & performance stats
  function calculateStats(trades: TradeData[]) {
    let balance = 10000; // Starting balance
    let wins = 0;
    let losses = 0;
    let profit = 0;

    // Sort trades by date safely without modifying state
    const sortedTrades = [...trades].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const balanceData = sortedTrades.map((trade) => {
      if (trade.profitLoss !== null) {
        balance += trade.profitLoss;
        profit += trade.profitLoss;
        trade.profitLoss > 0 ? wins++ : losses++;
      }
      return { date: trade.date, balance };
    });

    setBalanceHistory(balanceData);
    setTotalProfit(profit);
    setWinRate(trades.length > 0 ? (wins / trades.length) * 100 : 0);
    setTradeCount(trades.length);
  }

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="text-lg text-gray-600">Track your trading performance here.</p>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-bold">Total Profit</h2>
          <p className={`text-2xl ${totalProfit >= 0 ? "text-green-600" : "text-red-600"}`}>
            ${totalProfit.toFixed(2)}
          </p>
        </div>
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-bold">Win Rate</h2>
          <p className="text-2xl">{winRate.toFixed(2)}%</p>
        </div>
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-bold">Total Trades</h2>
          <p className="text-2xl">{tradeCount}</p>
        </div>
      </div>

      {/* Profit/Loss Over Time Graph */}
      <div className="bg-white shadow-md rounded-lg p-4 mt-6">
        <h2 className="text-xl font-bold mb-2">P/L Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={balanceHistory}>
            <XAxis dataKey="date" />
            <YAxis domain={["auto", "auto"]} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Line type="monotone" dataKey="balance" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Trade Calendar */}
      <div className="bg-white shadow-md rounded-lg p-4 mt-6">
        <h2 className="text-xl font-bold mb-2">Trading Calendar</h2>
        <TradeCalendar trades={trades.length > 0 ? trades : []} />
      </div>

      {/* Navigation */}
      <div className="mt-6 flex gap-4">
        <Link
          to="/journal"
          className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
        >
          View Journal
        </Link>
        <Link
          to="/trade-entry"
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Add Trade
        </Link>
      </div>
    </main>
  );
}
