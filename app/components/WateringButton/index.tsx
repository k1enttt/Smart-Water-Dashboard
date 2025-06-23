"use client";

import { sendControlCommand } from "@/lib/control";
import { ControlResponse, TreeSchema } from "@/schemas/TreeSchema";
import React, { useState } from "react";
import { useParams } from "next/navigation";

const WateringButton = () => {
  const params = useParams();
  const treeId = params?.treeId as string;
  const [requested, setRequested] = useState(false);

  const [trees, setTrees] = useState<any[]>([]);

  React.useEffect(() => {
    const fetchTrees = async () => {
      try {
        const res = await fetch("/api/trees");
        const json = await res.json();
        const data = json.response as TreeSchema[];
        setTrees(data.map((tree) => tree._id));
      } catch (error) {
        setTrees([]);
      }
    };
    fetchTrees();
  }, []);

  const handleClick = async () => {
    setRequested(true);

    const device_name = treeId === trees[0] ? "soil_sensor_1" : "soil_sensor_2";

    const response: ControlResponse = await sendControlCommand({
      command: "water_on",
      device_name,
    }).then((res) => {
      setRequested(false);
      return res;
    });

    console.log(
      response.command == "water_on"
        ? "Đã yêu cầu bật vòi"
        : "Đã yêu cầu tắt vòi"
    );
    console.log(
      response.device_name == "soil_sensor_1" ? `🌱Vòi tưới 1` : "🌱Vòi tưới 2"
    );
    console.log(response.status == "success" ? "✅Thành công" : "❌Thất bại");
  };

  return (
    <button
      type="button"
      className={`px-4 py-2 rounded focus:outline-none transition-colors ${
        requested
          ? "bg-blue-500 text-white"
          : "bg-green-600 text-white hover:bg-green-700"
      }`}
      onClick={() => handleClick()}
      disabled={requested}
    >
      {requested ? "Đã yêu cầu tưới" : "Tưới ngay"}
    </button>
  );
};

export default WateringButton;
