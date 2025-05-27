import Tabs from "@/app/components/Tabs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tree Detail | Smart Water Dashboard",
  description:
    "A dashboard webapp for monitoring the tree status through sensors data",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-4">
        <Tabs />
      </div>
      {children}
    </div>
  );
}
