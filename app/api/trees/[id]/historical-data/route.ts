import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { Collection, ObjectId } from "mongodb";
import { TreeSchema } from "@/schemas/TreeSchema";

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
    const response = await (db.collection("trees") as Collection<TreeSchema>).findOne({
      _id: new ObjectId(id),
    });
    
    return NextResponse.json({ response: response?.historical_data });
  } catch (error) {
    return NextResponse.json({
      error: `Failed to fetch historical data of the tree with id: ${id}`,
      body: String(error),
    });
  }
}