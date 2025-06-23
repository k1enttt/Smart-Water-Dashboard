import { ObjectId } from "mongodb"

export interface TreeSchema {
  _id: ObjectId
  name: string
  species: string
  image: string
  description: string
  location: string
  planting_date: string
  watering_schedule: WateringSchedule
  growth_stage: string
  sensors: Sensor[]
  historical_data: HistoricalDaum[]
  alerts: Alert[]
  actions: Action[]
}

export interface Action {
  id: string
  timestamp: string
  message: string
}

export interface WateringSchedule {
  frequency: string
  time: string[]
}

export interface Sensor {
  id: string
  type: string
  status: string
}

export interface HistoricalDaum {
  timestamp: string
  moisture: number
  temperature: number
  humidity: number
  pressure: number
}

export interface Alert {
  timestamp: string
  sensor_id: string
  type: string
  message: string
  value: number
  threshold: number
  unit: string
}

export interface ControlResponse {
  command: string
  device_name: string
  status: string
}