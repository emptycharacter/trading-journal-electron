"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Journal;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const TradeCalendar_1 = __importDefault(require("../components/TradeCalendar"));
function Journal() {
    const [trades, setTrades] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        window.electron.send("get-trades");
        window.electron.receive("get-trades", (data) => {
            setTrades(data);
        });
    }, []);
    return ((0, jsx_runtime_1.jsxs)("main", { className: "p-6 bg-gray-100 min-h-screen", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-3xl font-bold mb-4", children: "Trading Journal" }), (0, jsx_runtime_1.jsx)(TradeCalendar_1.default, { trades: trades }), (0, jsx_runtime_1.jsx)("div", { className: "bg-white p-4 shadow-md rounded-lg mt-6", children: trades.length === 0 ? ((0, jsx_runtime_1.jsx)("p", { children: "No trades logged yet." })) : ((0, jsx_runtime_1.jsx)("ul", { children: trades.map((trade, index) => ((0, jsx_runtime_1.jsxs)("li", { className: "border-b py-2", children: [(0, jsx_runtime_1.jsxs)("p", { children: [(0, jsx_runtime_1.jsx)("strong", { children: trade.symbol }), " - Entry: $", trade.entryPrice, ", Exit: ", trade.exitPrice ? `$${trade.exitPrice}` : "Open", ", P/L: ", trade.profitLoss !== null ? `$${trade.profitLoss}` : "Pending"] }), (0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-gray-500", children: [trade.strategy, " - ", trade.notes] })] }, index))) })) })] }));
}
