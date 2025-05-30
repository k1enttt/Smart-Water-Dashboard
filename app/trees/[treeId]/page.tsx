'use server'
import { TreeSchema } from "@/schemas/TreeSchema";
import Image from "next/image";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'http:localhost:3000/'

type Args = {
  params: Promise<{
    treeId: string;
  }>;
};

export default async function TreeDetail(props: Args) {
  const { treeId } = await props.params;
  const res = await fetch(
    `${BASE_URL}/api/trees/${treeId}`,
    {
      cache: "no-store",
    }
  );
  const data = await res.json();
  const tree = data.response as TreeSchema;

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Avatar, tên và họ cây */}
        <div className="space-y-4 p-4 rounded-lg bg-gray-200">
          <div className="flex gap-4">
            <div className="flex-0">
              <Image
                alt="tree avatar"
                src={tree.image}
                width={150}
                height={150}
                className="rounded-lg"
              />
            </div>
            <div className="flex-1">
              <div className="px-2 py-1 rounded-full bg-green-200 text-green-500 text-xs w-fit mb-2">
                ACTIVE
              </div>
              <div className="font-bold text-xl">{tree.name}</div>
              <div className="text-lg text-gray-500">{tree.species}</div>
            </div>
          </div>
          <hr className="border-gray-300" />
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg w-fit flex items-center font-medium">
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="square"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h1m4-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm7.441 1.559a1.907 1.907 0 0 1 0 2.698l-6.069 6.069L10 19l.674-3.372 6.07-6.07a1.907 1.907 0 0 1 2.697 0Z"
              />
            </svg>
            <div>Edit</div>
          </button>
        </div>
        {/* Vị trí, tuổi tác, ngày trồng và lịch tưới của cây */}
        <div className="p-4 rounded-lg bg-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
            <div className="">
              <div className="font-semibold">Location</div>
              <div>{tree.location}</div>
            </div>
            <div className="">
              <div className="font-semibold">Planting date</div>
              <div>{tree.planting_date}</div>
            </div>
            <div className="">
              <div className="font-semibold">Growth stage</div>
              <div>{tree.growth_stage}</div>
            </div>
            <div className="">
              <div className="font-semibold">Watering schedule</div>
              <div>{tree.watering_schedule.frequency}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tổng quát */}
      <div className="rounded-lg mb-4 bg-gray-200 p-4">
        <div className="text-xl font-bold mb-3">Overview</div>
        <div className="space-y-2">
          <div>
            <div className="font-semibold">Full name</div>
            <div>{tree.name}</div>
          </div>
          <div>
            <div className="font-semibold">Description</div>
            <div>{tree.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
