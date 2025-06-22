import ActionTable from "@/app/components/ActionTable";
import { Action } from "@/schemas/TreeSchema";

type Props = {
  params: {
    treeId: string;
  };
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

const ActionsPage = async ({ params }: Props) => {
  const { treeId } = params;
  const data = await getData(treeId);
  return (
    <div>
      <ActionTable data={data} />
    </div>
  );
};

export default ActionsPage;
