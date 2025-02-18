import React from "react";

export default function App() {
  return (
    <main className="flex flex-col items-center justify-center h-screen 
bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to TradeX</h1>
      <p className="text-lg text-gray-600 mb-6">
        Your personal trading journal & analytics dashboard.
      </p>

      <div className="flex gap-4">
        <a href="/login" className="px-6 py-2 bg-blue-600 text-white 
rounded-lg hover:bg-blue-700">
          Login
        </a>
        <a href="/dashboard" className="px-6 py-2 border border-blue-600 
text-blue-600 rounded-lg hover:bg-blue-100">
          Dashboard
        </a>
      </div>
    </main>
  );
}
