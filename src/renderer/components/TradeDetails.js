"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TradeDetails;
const jsx_runtime_1 = require("react/jsx-runtime");
function TradeDetails({ trades, onClose }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-md", children: [(0, jsx_runtime_1.jsxs)("h3", { className: "text-lg font-semibold mb-2 text-center", children: ["Trades on ", trades[0].date] }), (0, jsx_runtime_1.jsx)("ul", { className: "text-xs sm:text-base", children: trades.map((trade, index) => ((0, jsx_runtime_1.jsxs)("li", { className: "border-b py-2", children: [(0, jsx_runtime_1.jsxs)("p", { children: [(0, jsx_runtime_1.jsx)("strong", { children: trade.symbol }), " - Entry: $", trade.entryPrice, ", Exit: ", trade.exitPrice ? `$${trade.exitPrice}` : "Open", ", P/L: ", trade.profitLoss !== null ? `$${trade.profitLoss}` : "Pending"] }), (0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-gray-500", children: [trade.strategy, " - ", trade.notes] })] }, index))) }), (0, jsx_runtime_1.jsx)("button", { onClick: onClose, className: "mt-4 px-4 py-2 bg-red-600 text-white rounded w-full sm:w-auto", children: "Close" })] }) }));
}
