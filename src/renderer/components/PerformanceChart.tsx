import { Line } from "react-chartjs-2";

type ChartProps = {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }[];
  };
};

export default function PerformanceChart({ data }: ChartProps) {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Performance Chart</h2>
      <Line data={data} />
    </div>
  );
}
