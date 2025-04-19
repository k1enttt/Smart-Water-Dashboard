import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { Collection, ObjectId } from "mongodb";
import { HistoricalDaum, TreeSchema } from "@/schemas/TreeSchema";

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

    // Get the latest record of sensor data
    let sortedData: HistoricalDaum[] = []
    if (response?.historical_data) {
      sortedData = response.historical_data.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    }
    
    return NextResponse.json({ response: sortedData.length > 0 ? sortedData[0] : {} });
  } catch (error) {
    return NextResponse.json({
      error: `Failed to fetch latest historical data of the tree with id: ${id}`,
      body: String(error),
    });
  }
}