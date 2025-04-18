import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { Collection, ObjectId } from "mongodb";
import { Sensor, TreeSchema } from "@/schemas/TreeSchema";

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
    return NextResponse.json({ response: response?.sensors });
  } catch (error) {
    return NextResponse.json({
      error: `Failed to fetch sensors of the tree with id: ${id}`,
      body: String(error),
    });
  }
}

export async function POST(
  res: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const { id } = await params;
    const body = await res.json();
    const { sensor } = body as {
      sensor: Sensor;
    };

    if (!sensor) {
      return NextResponse.json(
        { error: "Sensor data is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise.connect();
    const db = client.db("swdb");
    const result = await (
      db.collection("trees") as Collection<TreeSchema>
    ).updateOne({ _id: new ObjectId(id) }, { $push: { sensors: sensor } });

    return NextResponse.json({
      message: "Sensor created successfully",
      id: result.upsertedId,
    });
  } catch (error) {
    return NextResponse.json({
      error: "Failed to create sensor",
      body: String(error),
    });
  }
}
