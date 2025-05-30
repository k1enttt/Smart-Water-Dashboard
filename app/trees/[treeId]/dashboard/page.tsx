"use server";

import { MyLineChart } from "@/app/components/LineChart";
import { HistoricalDaum, TreeSchema } from "@/schemas/TreeSchema";

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
        <div className="bg-blue-500 h-32 flex items-center justify-center text-3xl font-bold text-white rounded-lg">
          {latestHistoricalData.moisture}%
        </div>
        <div className="bg-blue-500 h-32 flex items-center justify-center text-3xl font-bold text-white rounded-lg">
          {latestHistoricalData.temperature}&deg;C
        </div>
        <div className="bg-blue-500 h-32 flex items-center justify-center text-3xl font-bold text-white rounded-lg">
          {latestHistoricalData.humidity}%
        </div>
        <div className="bg-blue-500 h-32 flex items-center justify-center text-3xl font-bold text-white rounded-lg">
          {latestHistoricalData.pressure}
        </div>
      </div>
      <div className="">
        <MyLineChart chartData={historicalData} />
      </div>
    </div>
  );
}
