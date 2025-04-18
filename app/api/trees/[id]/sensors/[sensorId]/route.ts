import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { Collection, ObjectId } from "mongodb";
import { Sensor, TreeSchema } from "@/schemas/TreeSchema";

export async function PUT(
  res: Request,
  {
    params,
  }: {
    params: Promise<{ id: string; sensorId: string }>;
  }
) {
  const { id, sensorId } = await params;

  const body = await res.json();
  const { sensor } = body as { sensor: Partial<Sensor> };

  try {
    const client = await clientPromise.connect();
    const db = client.db("swdb");

    // Tạo đối tượng $set động từ request body
    const updateFields = Object.entries(sensor).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [`sensors.$.${key}`]: value,
      }),
      {}
    );

    const result = await db
      .collection("trees")
      .updateOne(
        { _id: new ObjectId(id), "sensors.id": sensorId },
        { $set: updateFields }
      );

    if (result.matchedCount === 0) {
      return NextResponse.json({
        error: `No sensor found with id: ${sensorId}`,
      });
    }

    return NextResponse.json({
      message: `Sensor with id: ${sensorId} has been updated successfully.`,
      sensorId,
      treeId: id,
      updatedTree: sensor,
    });
  } catch (error) {
    return NextResponse.json({
      error: `Failed to update sensor with id: ${sensorId}`,
      body: String(error),
    });
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string; sensorId: string }> }
) {
  const { id, sensorId } = await params;
  try {
    const client = await clientPromise.connect();
    const db = client.db("swdb");
    const result = await (
      db.collection("trees") as Collection<TreeSchema>
    ).updateOne(
      { _id: new ObjectId(id) },
      { $pull: { sensors: { id: sensorId } } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({
        error: `No sensor found with id: ${sensorId}`,
      });
    }

    return NextResponse.json({
      message: `Sensor with id: ${sensorId} has been deleted successfully.`,
      treeId: id,
      sensorId,
    });
  } catch (error) {
    return NextResponse.json({
      error: `Failed to delete sensor with id: ${sensorId}`,
      body: String(error),
    });
  }
}
