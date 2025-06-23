import ActionTable from "@/app/components/ActionTable";
import { Action } from "@/schemas/TreeSchema";

type Props = {
  params: Promise<{
    treeId: string;
  }>;
};
async function getData(treeId: string): Promise<Action[]> {
  // Fetch data from your API here.
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/trees/${treeId}/actions`,
    {
      cache: "no-store",
    }
  );
  const json = await res.json();
  const data = json.response as Action[];
  return data;
}

export default async function ActionsPage({ params }: Props) {
  const { treeId } = await params;
  const data = await getData(treeId);
  return (
    <div>
      <ActionTable data={data} />
    </div>
  );
};
