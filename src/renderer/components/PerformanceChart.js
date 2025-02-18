"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PerformanceChart;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_chartjs_2_1 = require("react-chartjs-2");
function PerformanceChart({ data }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "p-4 bg-white shadow-md rounded-lg", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-xl font-semibold mb-4", children: "Performance Chart" }), (0, jsx_runtime_1.jsx)(react_chartjs_2_1.Line, { data: data })] }));
}
