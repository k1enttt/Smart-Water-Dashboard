'use server'
const API_URL = process.env.CONTROL_API_URL || '';
const API_KEY = process.env.CONTROL_API_KEY || '';

interface ControlPayload {
  device_name: "soil_sensor_1" | "soil_sensor_2";
  command: "water_on" | "water_off";
}

export async function sendControlCommand(payload: ControlPayload): Promise<any> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'X-API-Key': API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const message = await response.json()
  return message;
}