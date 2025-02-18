"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
const jsx_runtime_1 = require("react/jsx-runtime");
function App() {
    return ((0, jsx_runtime_1.jsxs)("main", { className: "flex flex-col items-center justify-center h-screen \r\nbg-gray-100", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-4xl font-bold mb-4", children: "Welcome to TradeX" }), (0, jsx_runtime_1.jsx)("p", { className: "text-lg text-gray-600 mb-6", children: "Your personal trading journal & analytics dashboard." }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-4", children: [(0, jsx_runtime_1.jsx)("a", { href: "/login", className: "px-6 py-2 bg-blue-600 text-white \r\nrounded-lg hover:bg-blue-700", children: "Login" }), (0, jsx_runtime_1.jsx)("a", { href: "/dashboard", className: "px-6 py-2 border border-blue-600 \r\ntext-blue-600 rounded-lg hover:bg-blue-100", children: "Dashboard" })] })] }));
}
