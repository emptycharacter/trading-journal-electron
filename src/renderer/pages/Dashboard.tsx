import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-lg text-gray-600">Track your trading performance here.</p>

      {/* Navigation */}
      <div className="mt-6">
        <Link
          to="/journal"
          className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
        >
          View Journal
        </Link>
      </div>
    </main>
  );
}
