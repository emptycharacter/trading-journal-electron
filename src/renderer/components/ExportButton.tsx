import { exportTradesToCSV } from "../utils/exportCSV";

export default function ExportButton({ trades }: { trades: any[] }) {
  return (
    <button
      onClick={() => exportTradesToCSV(trades)}
      className="px-4 py-2 bg-green-600 text-white rounded-lg"
    >
      Export to CSV
    </button>
  );
}
