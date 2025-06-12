import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function GET() {
  try {
    // Load env variables
    const API_KEY = process.env.CRON_JOB_API_KEY;
    const DEVICES_API_URL = process.env.CRON_JOB_API_URL || "http://localhost:3000/api/devices";
    const WEATHER_API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}api/weather-data`
    const MONGO_URI = process.env.MONGODB_URI;

    if (!API_KEY || !MONGO_URI) {
      return NextResponse.json({ error: "Missing environment variables" }, { status: 500 });
    }

    // Fetch weather data from worldweatheronline
    const resDevice = await fetch(DEVICES_API_URL, {
      headers: { "X-API-Key": API_KEY },
    });
    if (!resDevice.ok) {
      const errorBody = await resDevice.text();
      return NextResponse.json({ error: `Device API error: ${resDevice.status}`, message: errorBody }, { status: 500 });
    }
    const dataDevice = await resDevice.json();

    // Fetch device data from device API
    const resWeather = await fetch(WEATHER_API_URL, {
      headers: { "X-API-Key": API_KEY },
    });
    if (!resWeather.ok) {
      const errorBody = await resWeather.text();
      return NextResponse.json({ error: `Weather API error: ${resWeather.status}`, message: errorBody }, { status: 500 });
    }
    const dataWeather = await resWeather.json();

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

    // TODO: Save data to database

    return NextResponse.json({
      message: "Fetched and listed trees successfully",
      apiData: {devices: dataDevice, weather: dataWeather},
      trees: trees.map(tree => tree.name),
    });
  } catch (error) {
    return NextResponse.json({
      error: "Failed to fetch or store data",
      body: String(error),
    }, { status: 500 });
  }
}
