import { useState, useEffect } from "react";

type TradeData = {
  date: string; // YYYY-MM-DD format
  profitLoss: number; // Positive = Green, Negative = Red
};

export default function TradeCalendar({ trades }: { trades: TradeData[] }) {
  const [calendar, setCalendar] = useState<
    { date: string; profitLoss?: number }[]
  >([]);

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const newCalendar = Array.from({ length: daysInMonth }, (_, i) => {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
        i + 1
      ).padStart(2, "0")}`;
      const trade = trades.find((t) => t.date === dateStr);
      return {
        date: dateStr,
        profitLoss: trade ? trade.profitLoss : undefined,
      };
    });

    setCalendar(newCalendar);
  }, [trades]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Trading Calendar</h2>
      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center font-semibold">
            {day}
          </div>
        ))}
        {calendar.map(({ date, profitLoss }) => (
          <div
            key={date}
            className={`p-2 text-center border rounded-lg ${
              profitLoss !== undefined
                ? profitLoss > 0
                  ? "bg-green-400 text-white" // Green for profit
                  : "bg-red-400 text-white" // Red for loss
                : "bg-gray-200" // Neutral for no trades
            }`}
            title={
              profitLoss !== undefined ? `P/L: $${profitLoss}` : "No trades"
            }
          >
            {new Date(date).getDate()}
          </div>
        ))}
      </div>
    </div>
  );
}
