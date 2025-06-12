import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function GET() {
  try {
    // Load env variables
    const API_KEY = process.env.CRON_JOB_API_KEY;
    const API_URL = process.env.CRON_JOB_API_URL || "http://localhost:3000/api/weather-data";
    const MONGO_URI = process.env.MONGODB_URI;

    if (!API_KEY || !MONGO_URI) {
      return NextResponse.json({ error: "Missing environment variables" }, { status: 500 });
    }

    // Fetch data from weather-data API
    const res = await fetch(API_URL, {
      headers: { "X-API-Key": API_KEY },
    });
    if (!res.ok) {
      return NextResponse.json({ error: `API error: ${res.status}` }, { status: 500 });
    }
    const data = await res.json();

    // Connect to MongoDB
    const client = new MongoClient(MONGO_URI);
    await client.connect();
    const db = client.db("swdb");
    const collection = db.collection("trees");

    // (Optional) Add timestamp and save to DB
    // data.timestamp = new Date();
    // await collection.insertOne(data);

    // Get list of trees
    const trees = await collection.find().toArray();

    await client.close();

    return NextResponse.json({
      message: "Fetched and listed trees successfully",
      apiData: data,
      trees: trees.map(tree => tree.name),
    });
  } catch (error) {
    return NextResponse.json({
      error: "Failed to fetch or store data",
      body: String(error),
    }, { status: 500 });
  }
}
