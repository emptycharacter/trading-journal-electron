import { Line } from "react-chartjs-2";

export default function PerformanceChart({ trades }: { trades: any[] }) {
  const data = {
    labels: trades.map((trade) => trade.date),
    datasets: [
      {
        label: "Profit/Loss Over Time",
        data: trades.map((trade) => trade.profitLoss || 0),
        borderColor: "blue",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  return <Line data={data} />;
}
