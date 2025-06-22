import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// filepath: c:\Users\tathu\Documents\projs\sw-dashboard\app\api\actions\route.ts

export async function GET() {
  try {
    const client = await clientPromise.connect();
    const db = client.db("swdb");
    const response = await db
      .collection("trees")
      .find({})
      .sort({ planting_date: -1 })
      .limit(10)
      .project({ actions: 1 })
      .toArray();
    return NextResponse.json({ response });
  } catch (error) {
    return NextResponse.json({
      error: "Failed to fetch actions",
      body: String(error),
    });
  }
}