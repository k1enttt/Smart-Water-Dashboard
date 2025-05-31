import { Inter } from "next/font/google";
import client from "@/lib/mongodb";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { TreeSchema } from "@/schemas/TreeSchema";
import Navbar from "@/app/components/Navbar";
import Sidebar from "@/app/components/Sidebar";

type ConnectionStatus = {
  isConnected: boolean;
};

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps: GetServerSideProps<
  ConnectionStatus
> = async () => {
  try {
    await client.connect(); // `await client.connect()` will use the default database passed in the MONGODB_URI
    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
};

export default function Home({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [trees, setTrees] = useState<TreeSchema[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrees = async () => {
      try {
        const res = await fetch("/api/trees");
        const data = await res.json();
        setTrees(data.response || []);
      } catch (error) {
        setTrees([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTrees();
    console.log(trees);
  }, []);

  return (
    <main className={`${inter.className}`}>
      <div className="antialiased bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <Sidebar />
        <div className="p-4 md:ml-64 h-auto pt-20">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg dark:border-gray-600 p-4">
              <div className="">Hôm nay có mưa không?</div>
              <div className="flex gap-4 mt-2">
                <div className="rounded-lg bg-blue-500 align-middle p-2">
                  <div className="text-5xl font-bold text-white h-full flex items-center">
                    1xxx mm
                  </div>
                </div>

                <div className="text-gray-500">
                  <div>Nhiệt độ: 3x oC</div>
                  <div>Độ ẩm: 6x %</div>
                  <div>Áp suất: 102x mbar</div>
                </div>
              </div>
            </div>
            <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600"></div>
          </div>
          <div className="rounded-lg h-96 mb-4">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              {loading ? (
                <div className="p-4 text-center">Loading...</div>
              ) : (
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Tên cây
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Loài
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Vị trí
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Ngày trồng
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Giai đoạn phát triển
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <span className="sr-only">Xem</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {trees.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 text-center">
                          Không có dữ liệu
                        </td>
                      </tr>
                    ) : (
                      trees.map((tree) => (
                        <tr
                          key={tree._id.toString()}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {tree.name}
                          </th>
                          <td className="px-6 py-4">{tree.species}</td>
                          <td className="px-6 py-4">{tree.location}</td>
                          <td className="px-6 py-4">{tree.planting_date}</td>
                          <td className="px-6 py-4">{tree.growth_stage}</td>
                          <td className="px-6 py-4 text-right">
                            <a
                              href={`/trees/${tree._id}`}
                              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >
                              Xem
                            </a>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
