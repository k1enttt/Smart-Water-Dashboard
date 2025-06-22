"use server";

import { MyLineChart } from "@/app/components/LineChart";
import { filterSensorData } from "@/lib/utils";
import { HistoricalDaum } from "@/schemas/TreeSchema";
import { Suspense } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "http:localhost:3000/";

type Args = {
  params: Promise<{
    treeId: string;
  }>;
};

export default async function TreeDashboard(props: Args) {
  const { treeId } = await props.params;

  // Dữ liệu cảm biển mới nhất
  const res1 = await fetch(
    `${BASE_URL}/api/trees/${treeId}/latest-historical-data`
  );
  const data1 = await res1.json();
  const latestHistoricalData = data1.response as HistoricalDaum;

  // Danh sách dữ liệu cảm biến
  const res2 = await fetch(`${BASE_URL}/api/trees/${treeId}/historical-data`);
  const data2 = await res2.json();
  const historicalData = data2.response as HistoricalDaum[];

  return (
    <div>
      <div className="w-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
        <div className="relative bg-blue-500 flex flex-col justify-center rounded-lg text-white p-4">
          <div>Độ ẩm đất</div>
          <div className="text-3xl font-bold">
            {latestHistoricalData.moisture} %
          </div>
        </div>
        <div className="relative bg-blue-500 flex flex-col justify-center rounded-lg text-white p-4">
          <div>Nhiệt độ không khí</div>
          <div className="text-3xl font-bold">
            {latestHistoricalData.temperature} &deg;C
          </div>
        </div>
        <div className="relative bg-blue-500 flex flex-col justify-center rounded-lg text-white p-4">
          <div>Độ ẩm không khí</div>
          <div className="text-3xl font-bold">
            {latestHistoricalData.humidity} %
          </div>
        </div>
        <div className="relative bg-blue-500 flex flex-col justify-center rounded-lg text-white p-4">
          <div>Áp suất không khí</div>
          <div className="text-3xl font-bold">
            {latestHistoricalData.pressure} mbar
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <Suspense fallback={<div>Loading...</div>}>
          <MyLineChart chartData={filterSensorData(historicalData, 'temperature')} title="Nhiệt độ (&deg;C)" />
          <MyLineChart chartData={filterSensorData(historicalData, 'humidity')} title="Độ ẩm không khí (%)"/>
          <MyLineChart chartData={filterSensorData(historicalData, 'moisture')} title="Độ ẩm đất (%)" />
          <MyLineChart chartData={filterSensorData(historicalData, 'pressure')} title="Áp suất khi quyển (mb)" />
        </Suspense>
      </div>
    </div>
  );
}
