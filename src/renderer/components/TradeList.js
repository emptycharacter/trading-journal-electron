"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TradeList;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const TradeFilters_1 = __importDefault(require("./TradeFilters"));
function TradeList() {
    const [trades, setTrades] = (0, react_1.useState)([]);
    const [filteredTrades, setFilteredTrades] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        window.electron.send("get-trades");
        window.electron.receive("get-trades", (data) => {
            setTrades(data);
            setFilteredTrades(data); // Default view = all trades
        });
    }, []);
    function applyFilters(filters) {
        let filtered = trades;
        if (filters.symbol) {
            filtered = filtered.filter((t) => t.symbol.toLowerCase().includes(filters.symbol.toLowerCase()));
        }
        if (filters.sort === "date-desc") {
            filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        }
        else if (filters.sort === "date-asc") {
            filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        }
        else if (filters.sort === "profit-desc") {
            filtered.sort((a, b) => (b.profitLoss || 0) - (a.profitLoss || 0));
        }
        else if (filters.sort === "profit-asc") {
            filtered.sort((a, b) => (a.profitLoss || 0) - (b.profitLoss || 0));
        }
        setFilteredTrades(filtered);
    }
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(TradeFilters_1.default, { onFilter: applyFilters }), (0, jsx_runtime_1.jsx)("div", { className: "bg-white p-4 shadow-md rounded-lg mt-4", children: filteredTrades.length === 0 ? ((0, jsx_runtime_1.jsx)("p", { children: "No trades found." })) : ((0, jsx_runtime_1.jsx)("ul", { children: filteredTrades.map((trade, index) => ((0, jsx_runtime_1.jsxs)("li", { className: "border-b py-2", children: [(0, jsx_runtime_1.jsxs)("p", { children: [(0, jsx_runtime_1.jsx)("strong", { children: trade.symbol }), " - Entry: $", trade.entryPrice, ", Exit: ", trade.exitPrice ? `$${trade.exitPrice}` : "Open", ", P/L:", " ", trade.profitLoss !== null
                                        ? `$${trade.profitLoss}`
                                        : "Pending"] }), (0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-gray-500", children: [trade.strategy, " - ", trade.notes] })] }, index))) })) })] }));
}
