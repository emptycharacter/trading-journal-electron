"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TradeFilters;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
function TradeFilters({ onFilter, }) {
    const [symbol, setSymbol] = (0, react_1.useState)("");
    const [sort, setSort] = (0, react_1.useState)("date-desc");
    function applyFilters() {
        onFilter({ symbol, sort });
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-4 p-4 bg-white shadow-md rounded-lg", children: [(0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "Filter by symbol (e.g., AAPL)", value: symbol, onChange: (e) => setSymbol(e.target.value), className: "p-2 border rounded-lg" }), (0, jsx_runtime_1.jsxs)("select", { value: sort, onChange: (e) => setSort(e.target.value), className: "p-2 border rounded-lg", children: [(0, jsx_runtime_1.jsx)("option", { value: "date-desc", children: "Newest First" }), (0, jsx_runtime_1.jsx)("option", { value: "date-asc", children: "Oldest First" }), (0, jsx_runtime_1.jsx)("option", { value: "profit-desc", children: "Highest P&L" }), (0, jsx_runtime_1.jsx)("option", { value: "profit-asc", children: "Lowest P&L" })] }), (0, jsx_runtime_1.jsx)("button", { onClick: applyFilters, className: "px-4 py-2 bg-blue-600 text-white rounded-lg", children: "Apply" })] }));
}
