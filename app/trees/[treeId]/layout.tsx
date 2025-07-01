import MetricCard from "@/app/components/MetricCard";
import Tabs from "@/app/components/Tabs";
import WateringButton from "@/app/components/WateringButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tree Detail | Smart Water Dashboard",
  description:
    "A dashboard webapp for monitoring the tree status through sensors data",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <Tabs />
        <WateringButton />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <MetricCard
          title="Rainfall Prediction (24h)"
          value={`1xxx mm`}
          icon={<></>}
          description="Predicted rainfall for next 24 hours"
        />
        <MetricCard
          title="Soil Moisture"
          value={`4x%`}
          icon={<></>}
          description="Current soil moisture level"
        />
      </div>
      {children}
    </div>
  );
}
