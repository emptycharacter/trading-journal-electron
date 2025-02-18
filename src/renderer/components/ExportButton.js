"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ExportButton;
const jsx_runtime_1 = require("react/jsx-runtime");
const exportCSV_1 = require("../utils/exportCSV");
function ExportButton({ trades }) {
    return ((0, jsx_runtime_1.jsx)("button", { onClick: () => (0, exportCSV_1.exportTradesToCSV)(trades), className: "px-4 py-2 bg-green-600 text-white rounded-lg", children: "Export to CSV" }));
}
