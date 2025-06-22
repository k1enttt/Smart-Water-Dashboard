'use client'

import { useParams, usePathname } from "next/navigation";

const Tabs = () => {
  const pathname = usePathname()
  const params = useParams<{ treeId: string}>()
  const treeId = params?.treeId

  const currentRoute = pathname?.split(`/trees/${treeId}/`)[1] ? pathname?.split(`/trees/${treeId}/`)[1] : ""

  const activeStyle = "inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
  const deactiveStyle = "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"

  return (
    <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
      <li className="me-2">
        <a
          href={`${treeId ? `/trees/${treeId}/` : '#'}`}
          aria-current="page"
          className={currentRoute == '' ? activeStyle : deactiveStyle}
        >
          Profile
        </a>
      </li>
      <li className="me-2">
        <a
          href={`${treeId ? `/trees/${treeId}/dashboard` : '#'}`}
          className={currentRoute == 'dashboard' ? activeStyle : deactiveStyle}
        >
          Dashboard
        </a>
      </li>
    </ul>
  );
};

export default Tabs;
