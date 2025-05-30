'use server'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'http:localhost:3000/'

type Args = {
  params: Promise<{
    treeId: string;
  }>;
};

export default async function TreeSettings(props: Args) {
  const { treeId } = await props.params;
  const res = await fetch(
    `${BASE_URL}/api/trees/${treeId}`,
    {
      cache: "no-store",
    }
  );

  return <div>Setting</div>;
}
