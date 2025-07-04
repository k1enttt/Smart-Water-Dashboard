"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { parseTimestamp } from "@/lib/utils";

const chartDataForTesting = [
  {
    moisture: 42.8,
    temperature: 28.2,
    humidity: 72.1,
    pressure: 1005.5,
    timestamp: "10:00",
  },
  {
    moisture: 75.2,
    temperature: 26.8,
    humidity: 78.5,
    pressure: 1002.1,
    timestamp: "13:00",
  },
  {
    moisture: 33.5,
    temperature: 29.5,
    humidity: 65.3,
    pressure: 1008.9,
    timestamp: "16:00",
  },
  {
    moisture: 68.7,
    temperature: 25.1,
    humidity: 82.0,
    pressure: 999.8,
    timestamp: "19:00",
  },
  {
    moisture: 59.1,
    temperature: 27.6,
    humidity: 69.8,
    pressure: 1006.2,
    timestamp: "22:00",
  },
];

const chartConfig = {
  moisture: {
    label: "Độ ẩm đất",
    color: "hsl(var(--chart-1))",
  },
  temperature: {
    label: "Nhiệt độ",
    color: "hsl(var(--chart-2))",
  },
  humidity: {
    label: "Độ ẩm không khí",
    color: "hsl(var(--chart-3))",
  },
  pressure: {
    label: "Áp suất khí quyển",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

type ChartProps = {
  chartData?: any[];
  title: string;
};

export function MyLineChart({ chartData, title }: ChartProps) {
  const formatedChartData = chartData?.map((e) => {
    return {
      ...e,
      moisture: e.soil_moisture ?? e.moisture,
      timestamp: parseTimestamp(e.timestamp).time,
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={formatedChartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="timestamp"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={20}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="moisture"
              type="linear"
              stroke="var(--color-moisture)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="temperature"
              type="linear"
              stroke="var(--color-temperature)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="humidity"
              type="linear"
              stroke="var(--color-humidity)"
              strokeWidth={2}
              dot={false}
            />
             <Line
              dataKey="pressure"
              type="linear"
              stroke="var(--color-pressure)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
