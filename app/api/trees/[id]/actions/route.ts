import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { Collection, ObjectId } from "mongodb";
import { TreeSchema } from "@/schemas/TreeSchema";

// filepath: c:\Users\tathu\Documents\projs\sw-dashboard\app\api\actions\route.ts

const actionMessageMap: Record<string, string> = {
  water_on: "Bật máy bơm nước thủ công được yêu cầu",
  water_off: "Tắt máy bơm nước thủ công được yêu cầu",
};

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
    const { action } = body as { action: string };

    // Check if action is usable
    if (action == null || action == undefined) {
      return NextResponse.json(
        { error: "Action is required" },
        { status: 400 }
      );
    }
    if (action !== "water_on" && action !== "water_off") {
      return NextResponse.json(
        { error: "Action must be either 'water_on' or 'water_off'" },
        { status: 400 }
      );
    }

    const client = await clientPromise.connect();
    const db = client.db("swdb");

    // Update push action to actions array
    const result = await db
      .collection("trees")
      .updateOne(
      { _id: new ObjectId(id) },
      {
        $push: { actions: { message: actionMessageMap.action, timestamp: new Date() } } as any,
      }
      );

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
