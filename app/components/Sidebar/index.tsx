'use client'
import React, { useEffect, useState } from "react";

type Tree = {
  _id: string;
  name: string;
};

const Sidebar = () => {
  const [trees, setTrees] = useState<Tree[]>([]);

  useEffect(() => {
    async function fetchTrees() {
      try {
        const res = await fetch("/api/trees");
        const data = await res.json();
        setTrees(data.response || []);
      } catch (err) {
        setTrees([]);
      }
    }
    fetchTrees();
  }, []);

  return (
    <aside
      className="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidenav"
      id="drawer-navigation"
    >
      <div className="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
        <div className="space-y-2">
          {/* Danh sách cây */}
          {trees.map((tree) => (
            <a
              key={tree._id}
              href={`/trees/${tree._id}/dashboard`}
              className="flex items-center p-2 ml-6 text-base font-medium text-gray-700 rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {tree.name}
            </a>
          ))}
        </div>
      </div>
      <div className="hidden absolute bottom-0 left-0 justify-center p-4 space-x-4 w-full lg:flex bg-white dark:bg-gray-800 dark:text-white text-sm z-20">
        <div>Powered by Kien Ta</div>
      </div>
    </aside>
  );
};

export default Sidebar;
