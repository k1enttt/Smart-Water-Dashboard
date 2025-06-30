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

async function fetchWeeklyAirSamples() {
  const res = await fetch("http://127.0.0.1:8000/air/samples/weekly/");
  if (!res.ok) {
    throw new Error("Failed to fetch weekly air samples");
  }
  const data = await res.json();
  // data là một mảng các record dạng:
  // { temperature, humidity, pressure, id, timestamp }
  return data;
}

async function fetchWeeklySoilMoisture(description: string) {
  const res = await fetch(
    `http://127.0.0.1:8000/soil/samples/weekly/${description}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch weekly soil moisture data");
  }
  const data = await res.json();
  // data là một mảng các record dạng:
  // { description, soil_moisture, id, timestamp }
  return data;
}

export default async function TreeDashboard(props: Args) {
  const { treeId } = await props.params;

  // Lấy danh sách cây từ API
  const treesRes = await fetch(`${BASE_URL}/api/trees`);
  const treesData = await treesRes.json();
  const treesList = treesData.response as { _id: string; [key: string]: any }[];

  // Kiểm tra cây hiện tại có phải là cây đầu tiên không
  const isFirstTree = treesList.length > 0 && treesList[0]._id === treeId;
  const description = isFirstTree ? "cayot1" : "bapcai1";

  // Dữ liệu cảm biến mới nhất
  const res1 = await fetch(
    `${BASE_URL}/api/trees/${treeId}/latest-historical-data`
  );
  const data1 = await res1.json();
  const latestHistoricalData = data1.response as HistoricalDaum;

  // Dữ liệu cảm biến không khí
  const historicalData = (await fetchWeeklyAirSamples()) as HistoricalDaum[];
  // Dữ liệu độ ẩm đất
  const moistureHistory = await fetchWeeklySoilMoisture(description);

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
          <MyLineChart
            chartData={filterSensorData(moistureHistory, "soil_moisture")}
            title="Độ ẩm đất (%)"
          />
          <MyLineChart
            chartData={filterSensorData(historicalData, "temperature")}
            title="Nhiệt độ (&deg;C)"
          />
          <MyLineChart
            chartData={filterSensorData(historicalData, "humidity")}
            title="Độ ẩm không khí (%)"
          />
          <MyLineChart
            chartData={filterSensorData(historicalData, "pressure")}
            title="Áp suất khi quyển (mb)"
          />
        </Suspense>
      </div>
    </div>
  );
}
