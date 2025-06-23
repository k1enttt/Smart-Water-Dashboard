import { NextRequest, NextResponse } from 'next/server';

const API_URL = 'https://device.kienttt.id.vn/api/control';
const API_KEY = 'x7k9p3m2q8w4e6r5t';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'X-API-Key': API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}