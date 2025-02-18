import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to TradeX</h1>
      <p className="text-lg text-gray-600 mb-6">Your personal trading journal & analytics dashboard.</p>

      {/* ✅ FIXED: Buttons for navigation */}
      <div className="flex gap-4">
        <Link to="/login" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Login</Link>
        <Link to="/dashboard" className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Dashboard</Link>
      </div>
    </main>
  );
}
