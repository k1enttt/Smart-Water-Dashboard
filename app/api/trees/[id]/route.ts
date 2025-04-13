import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

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
    const response = await db
      .collection("trees")
      .findOne({ _id: new ObjectId(id) });
    return NextResponse.json({ response });
  } catch (error) {
    return NextResponse.json({
      error: `Failed to fetch tree with id: ${id}`,
      body: String(error),
    });
  }
}

export async function DELETE(
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
    const result = await db
      .collection("trees")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({
        error: `No tree found with id: ${id}`,
      });
    }

    return NextResponse.json({
      message: `Tree with id: ${id} has been deleted successfully.`,
      id
    });
  } catch (error) {
    return NextResponse.json({
      error: `Failed to delete tree with id: ${id}`,
      body: String(error),
    });
  }
}

export async function PUT(
  res: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const { id } = await params;

  const body = await res.json();
  const { tree } = body as { tree: Object };

  try {
    const client = await clientPromise.connect();
    const db = client.db("swdb");
    const result = await db
      .collection("trees")
      .updateOne({ _id: new ObjectId(id) }, { $set: tree });

    if (result.matchedCount === 0) {
      return NextResponse.json({
        error: `No tree found with id: ${id}`,
      });
    }

    return NextResponse.json({
      message: `Tree with id: ${id} has been updated successfully.`,
      id,
      updatedTree: tree,
    });
  } catch (error) {
    return NextResponse.json({
      error: `Failed to update tree with id: ${id}`,
      body: String(error),
    });
  }
}