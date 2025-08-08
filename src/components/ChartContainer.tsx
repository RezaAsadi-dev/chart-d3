import React from "react";
import Chart from "./Chart";
import type ChartDef from "../types/chart";
import SkeletonChart from "./SkeletonChart";

export default function ChartContainer() {
  const [charts, setCharts] = React.useState<ChartDef[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("/data.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) throw new Error("Invalid data format");
        setCharts(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <>
        <SkeletonChart />
        <SkeletonChart />
      </>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-4 bg-red-100 text-red-700 rounded">
        Error loading data: {error}
      </div>
    );
  }

  if (!charts || charts.length === 0) {
    return (
      <div className="max-w-3xl mx-auto p-4 bg-yellow-100 text-yellow-700 rounded">
        There is no data to display.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-10">
      {charts.map((chart, i) => (
        <div key={i} className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            {chart.title}
          </h2>
          <Chart chartDef={chart} />
        </div>
      ))}
    </div>
  );
}
