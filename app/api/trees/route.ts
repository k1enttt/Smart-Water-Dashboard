import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const client = await clientPromise.connect();
    const db = client.db("swdb");
    const response = await db
      .collection("trees")
      .find({})
      .sort({ metacritic: -1 })
      .limit(10)
      .toArray();
    return NextResponse.json({ response });
  } catch (error) {
    return NextResponse.json({
      error: "Failed to fetch trees",
      body: String(error),
    });
  }
}

export async function POST(res: Request) {
  try {
    const body = await res.json();
    const { tree } = body as { tree: Object };

    if (!tree) {
      return NextResponse.json(
        { error: "Tree data is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise.connect();
    const db = client.db("swdb");
    const result = await db
      .collection("trees")
      .insertOne({ _id: new ObjectId(), ...tree });

    return NextResponse.json({
      message: "Tree created successfully",
      id: result.insertedId,
    });
  } catch (error) {
    return NextResponse.json({
      error: "Failed to create tree",
      body: String(error),
    });
  }
}
