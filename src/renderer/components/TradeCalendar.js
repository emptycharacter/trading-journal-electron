"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TradeCalendar;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const TradeDetails_1 = __importDefault(require("./TradeDetails"));
function TradeCalendar({ trades }) {
    const [currentMonth, setCurrentMonth] = (0, react_1.useState)(new Date().getMonth());
    const [currentYear, setCurrentYear] = (0, react_1.useState)(new Date().getFullYear());
    const [calendar, setCalendar] = (0, react_1.useState)([]);
    const [selectedTrades, setSelectedTrades] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
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
        }
        else {
            setCurrentMonth(currentMonth - 1);
        }
    }
    function handleNextMonth() {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        }
        else {
            setCurrentMonth(currentMonth + 1);
        }
    }
    function handleMonthChange(event) {
        const [year, month] = event.target.value.split("-").map(Number);
        setCurrentYear(year);
        setCurrentMonth(month);
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "p-4 bg-white rounded-lg shadow-md", children: [(0, jsx_runtime_1.jsxs)("div", { className: "mb-4 flex flex-wrap gap-2 justify-between", children: [(0, jsx_runtime_1.jsx)("button", { onClick: handlePrevMonth, className: "px-3 py-1 bg-gray-300 rounded text-sm sm:text-base", children: "\u2190 Prev" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2", children: [(0, jsx_runtime_1.jsx)("select", { value: `${currentYear}`, onChange: (e) => setCurrentYear(Number(e.target.value)), className: "p-2 border rounded text-sm sm:text-base", children: Array.from({ length: 5 }, (_, i) => ((0, jsx_runtime_1.jsx)("option", { value: currentYear - i, children: currentYear - i }, i))) }), (0, jsx_runtime_1.jsx)("select", { value: `${currentYear}-${currentMonth}`, onChange: handleMonthChange, className: "p-2 border rounded text-sm sm:text-base", children: Array.from({ length: 12 }, (_, i) => {
                                    const month = new Date(currentYear, i).toLocaleString("default", { month: "long" });
                                    return (0, jsx_runtime_1.jsx)("option", { value: `${currentYear}-${i}`, children: month }, i);
                                }) })] }), (0, jsx_runtime_1.jsx)("button", { onClick: handleNextMonth, className: "px-3 py-1 bg-gray-300 rounded text-sm sm:text-base", children: "Next \u2192" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-7 gap-2 text-xs sm:text-base", children: [["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => ((0, jsx_runtime_1.jsx)("div", { className: "text-center font-semibold", children: day }, day))), calendar.map(({ date, trades }) => ((0, jsx_runtime_1.jsx)("div", { className: `p-1 sm:p-2 text-center border rounded-lg cursor-pointer ${trades ? (trades.some(t => t.profitLoss > 0) ? "bg-green-400 text-white" : "bg-red-400 text-white") : "bg-gray-200"}`, title: trades ? `Trades: ${trades.length}` : "No trades", onClick: () => setSelectedTrades(trades || null), children: new Date(date).getDate() }, date)))] }), selectedTrades && (0, jsx_runtime_1.jsx)(TradeDetails_1.default, { trades: selectedTrades, onClose: () => setSelectedTrades(null) })] }));
}
