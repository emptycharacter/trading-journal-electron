import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-5xl font-extrabold mb-4 text-gray-800">Welcome to TradeX</h1>
      <p className="text-lg text-gray-600 mb-6 max-w-lg">
        Your all-in-one trading journal and analytics dashboard to track performance, visualize P/L, 
        and improve your trading strategies.
      </p>

      {/* Navigation Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          to="/login"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all"
        >
          Login
        </Link>
        <Link
          to="/dashboard"
          className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all"
        >
          Dashboard
        </Link>
        <Link
          to="/journal"
          className="px-6 py-2 bg-yellow-600 text-white rounded-lg shadow-md hover:bg-yellow-700 transition-all"
        >
          Journal
        </Link>
      </div>

      {/* Feature Highlights */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
        <div className="p-4 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-bold text-gray-800">📈 Track P/L Over Time</h2>
          <p className="text-sm text-gray-600 mt-2">
            Visualize your account balance and performance with real-time analytics.
          </p>
        </div>
        <div className="p-4 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-bold text-gray-800">📅 Trading Calendar</h2>
          <p className="text-sm text-gray-600 mt-2">
            Log trades daily and analyze patterns to refine your strategy.
          </p>
        </div>
        <div className="p-4 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-bold text-gray-800">📊 Performance Insights</h2>
          <p className="text-sm text-gray-600 mt-2">
            Get key performance metrics like win rate, avg P/L, and trade frequency.
          </p>
        </div>
      </div>
    </main>
  );
}
