"use client";
import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const darkTheme = createTheme({
  colorSchemes: {
    dark: true,
    light: true,
  }
});

export default function SensorChart() {
  return (
    <ThemeProvider theme={darkTheme}>
      <LineChart
        xAxis={[
          {
            data: [1, 2, 3, 5, 8, 10, 12, 15, 16],
          },
        ]}
        series={[
          {
            data: [2, 5.5, 2, 8.5, 1.5, 5],
            valueFormatter: (value) =>
              value == null ? "NaN" : value.toString(),
          },
          {
            data: [null, null, null, null, 5.5, 2, 8.5, 1.5, 5],
          },
          {
            data: [7, 8, 5, 4, null, null, 2, 5.5, 1],
            valueFormatter: (value) => (value == null ? "?" : value.toString()),
          },
        ]}
        height={200}
        margin={{ bottom: 10 }}
      />
    </ThemeProvider>
  );
}
