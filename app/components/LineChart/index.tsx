"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

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
import { HistoricalDaum } from "@/schemas/TreeSchema";
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
    label: "Moisture",
    color: "hsl(var(--chart-1))",
  },
  temperature: {
    label: "Temperature",
    color: "hsl(var(--chart-2))",
  },
  humidity: {
    label: "Humidity",
    color: "hsl(var(--chart-3))",
  },
  pressure: {
    label: "Pressure",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

type ChartProps = {
  chartData?: HistoricalDaum[];
};

export function MyLineChart({ chartData }: ChartProps) {
const formatedChartData = chartData?.map((e) => {
  return {
    ...e,
    timestamp: parseTimestamp(e.timestamp).time,
  };
})

  return (
    <Card>
      <CardHeader>
        <CardTitle>Line Chart - Linear</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={formatedChartData ? formatedChartData : chartDataForTesting}
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
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
