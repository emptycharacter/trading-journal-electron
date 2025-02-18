"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TradeForm;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
function TradeForm() {
    const [formData, setFormData] = (0, react_1.useState)({
        symbol: "",
        entryPrice: "",
        exitPrice: "",
        strategy: "",
        notes: "",
    });
    function handleSubmit(e) {
        e.preventDefault();
        window.electron.send("add-trade", formData);
        setFormData({
            symbol: "",
            entryPrice: "",
            exitPrice: "",
            strategy: "",
            notes: "",
        });
    }
    return ((0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, className: "bg-white p-4 shadow-md rounded-lg", children: [(0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "Symbol (e.g., AAPL)", value: formData.symbol, onChange: (e) => setFormData({ ...formData, symbol: e.target.value }), className: "w-full p-2 border rounded-lg mb-2" }), (0, jsx_runtime_1.jsx)("input", { type: "number", placeholder: "Entry Price", value: formData.entryPrice, onChange: (e) => setFormData({ ...formData, entryPrice: e.target.value }), className: "w-full p-2 border rounded-lg mb-2" }), (0, jsx_runtime_1.jsx)("input", { type: "number", placeholder: "Exit Price (Optional)", value: formData.exitPrice, onChange: (e) => setFormData({ ...formData, exitPrice: e.target.value }), className: "w-full p-2 border rounded-lg mb-2" }), (0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "Strategy", value: formData.strategy, onChange: (e) => setFormData({ ...formData, strategy: e.target.value }), className: "w-full p-2 border rounded-lg mb-2" }), (0, jsx_runtime_1.jsx)("textarea", { placeholder: "Notes", value: formData.notes, onChange: (e) => setFormData({ ...formData, notes: e.target.value }), className: "w-full p-2 border rounded-lg mb-2" }), (0, jsx_runtime_1.jsx)("button", { className: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700", children: "Save Trade" })] }));
}
