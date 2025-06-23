'use server'
const API_URL = 'https://device.kienttt.id.vn/api/control';
const API_KEY = 'x7k9p3m2q8w4e6r5t';

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