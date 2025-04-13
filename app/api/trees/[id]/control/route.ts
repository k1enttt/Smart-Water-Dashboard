import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

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
    const { action } = body as { action: boolean };

    if (action == null || action == undefined) {
      return NextResponse.json(
        { error: "Action is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise.connect();
    const db = client.db("swdb");
    const result = await db
      .collection("trees")
      .updateOne({ _id: new ObjectId(id) }, { $set: { is_pump_on: action } });

    if (result.matchedCount === 0) {
      return NextResponse.json({
        error: `No tree found with id: ${id}`,
      });
    }

    return NextResponse.json({
      message: `The pump of tree with id: ${id} has been turned on.`,
      id,
      updatedAction: action,
    });
  } catch (error) {
    return NextResponse.json({
      error: "Failed to update the action",
      body: String(error),
    });
  }
}
