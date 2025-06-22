import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { Collection, ObjectId } from "mongodb";
import { TreeSchema } from "@/schemas/TreeSchema";

// filepath: c:\Users\tathu\Documents\projs\sw-dashboard\app\api\actions\route.ts

export async function GET(
  _: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const { id } = await params;
  try {
    const client = await clientPromise.connect();
    const db = client.db("swdb");
    const tree = await (db.collection("trees") as Collection<TreeSchema>).findOne({
      _id: new ObjectId(id),
    });
    return NextResponse.json({ response: tree?.actions ?? [] });
  } catch (error) {
    return NextResponse.json({
      error: `Failed to fetch actions of the tree with id: ${id}`,
      body: String(error),
    });
  }
}