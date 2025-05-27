import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smart Water Dashboard",
  description:
    "A dashboard webapp for monitoring the tree status through sensors data",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <Navbar />
        <Sidebar />
        <main>
          <div className="antialiased bg-gray-50 dark:bg-gray-900">
            <div className="p-4 md:ml-64 h-auto pt-20">{children}</div>
          </div>
        </main>

        <script
          src="https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.js"
          async
        />
      </body>
    </html>
  );
}
