import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { exec } = await import("child_process");
    const { promisify } = await import("util");
    const execAsync = promisify(exec);

    const { stdout, stderr } = await execAsync(
      "python crons/collectSensorData.py",
      { cwd: process.cwd(), env: { ...process.env, PYTHONIOENCODING: "utf-8" } }
    );
    if (stderr) {
      throw new Error(stderr);
    }
    return NextResponse.json({ stdout });
  } catch (error) {
    return NextResponse.json({
      error: "Failed to fetch alerts",
      body: String(error),
    });
  }
}
