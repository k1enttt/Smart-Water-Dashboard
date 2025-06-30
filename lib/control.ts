'use server'
const API_URL = process.env.CONTROL_API_URL || '';
const API_KEY = process.env.CONTROL_API_KEY || '';

interface ControlPayload {
  device_name: "soil_sensor_1" | "soil_sensor_2";
  command: "water_on" | "water_off";
}

export async function sendControlCommand(payload: ControlPayload & { treeId: string }): Promise<any> {
  // Gửi yêu cầu đến máy bơm nước
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

  const message = await response.json();

  // Gửi tiếp yêu cầu lưu action vào database
  const saveActionRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/trees/${payload.treeId}/actions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: { action: payload.command } as any,
  });

  if (!saveActionRes.ok) {
    throw new Error(`Failed to save action to database! status: ${saveActionRes.status}`);
  }

  const saveActionMessage = await saveActionRes.json();

  return { control: message, saveAction: saveActionMessage };
}