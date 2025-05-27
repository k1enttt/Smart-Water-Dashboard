type Args = {
  params: Promise<{
    id: string;
  }>;
};

export default async function TreeDashboard(props: Args) {
  const { id } = await props.params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/trees/${id}`,
    {
      cache: "no-store",
    }
  );

  return <div>Dashboard</div>;
}
