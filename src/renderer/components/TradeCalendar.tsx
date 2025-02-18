import { useState, useEffect } from "react";
import TradeDetails from "./TradeDetails";

type TradeData = {
  date: string;
  profitLoss: number;
  symbol: string;
  entryPrice: number;
  exitPrice?: number;
  strategy: string;
  notes: string;
};

export default function TradeCalendar({ trades }: { trades: TradeData[] }) {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [calendar, setCalendar] = useState<{ date: string; trades?: TradeData[] }[]>([]);
  const [selectedTrades, setSelectedTrades] = useState<TradeData[] | null>(null);

  useEffect(() => {
    generateCalendar();
  }, [trades, currentMonth, currentYear]);

  function generateCalendar() {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const newCalendar = Array.from({ length: daysInMonth }, (_, i) => {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(i + 1).padStart(2, "0")}`;
      const dayTrades = trades.filter((t) => t.date === dateStr);
      return { date: dateStr, trades: dayTrades.length ? dayTrades : undefined };
    });

    setCalendar(newCalendar);
  }

  function handlePrevMonth() {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  }

  function handleNextMonth() {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  }

  function handleMonthChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const [year, month] = event.target.value.split("-").map(Number);
    setCurrentYear(year);
    setCurrentMonth(month);
  }

  return (
      <div className="p-4 bg-white rounded-lg shadow-md">
    {/* 🔥 EXTEND HERE: Responsive Month & Year Select */}
    <div className="mb-4 flex flex-wrap gap-2 justify-between">
      <button onClick={handlePrevMonth} className="px-3 py-1 bg-gray-300 rounded text-sm sm:text-base">
        ← Prev
      </button>

      <div className="flex gap-2">
        <select
          value={`${currentYear}`}
          onChange={(e) => setCurrentYear(Number(e.target.value))}
          className="p-2 border rounded text-sm sm:text-base"
        >
          {Array.from({ length: 5 }, (_, i) => (
            <option key={i} value={currentYear - i}>{currentYear - i}</option>
          ))}
        </select>

        <select
          value={`${currentYear}-${currentMonth}`}
          onChange={handleMonthChange}
          className="p-2 border rounded text-sm sm:text-base"
        >
          {Array.from({ length: 12 }, (_, i) => {
            const month = new Date(currentYear, i).toLocaleString("default", { month: "long" });
            return <option key={i} value={`${currentYear}-${i}`}>{month}</option>;
          })}
        </select>
      </div>

      <button onClick={handleNextMonth} className="px-3 py-1 bg-gray-300 rounded text-sm sm:text-base">
        Next →
      </button>
    </div>

    <div className="grid grid-cols-7 gap-2 text-xs sm:text-base">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
        <div key={day} className="text-center font-semibold">{day}</div>
      ))}
      {calendar.map(({ date, trades }) => (
        <div
          key={date}
          className={`p-1 sm:p-2 text-center border rounded-lg cursor-pointer ${
            trades ? (trades.some(t => t.profitLoss > 0) ? "bg-green-400 text-white" : "bg-red-400 text-white") : "bg-gray-200"
          }`}
          title={trades ? `Trades: ${trades.length}` : "No trades"}
          onClick={() => setSelectedTrades(trades || null)}
        >
          {new Date(date).getDate()}
        </div>
      ))}
    </div>

    {selectedTrades && <TradeDetails trades={selectedTrades} onClose={() => setSelectedTrades(null)} />}
  </div>

  );
}
