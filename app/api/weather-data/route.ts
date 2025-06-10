import puppeteer from "puppeteer";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Khởi tạo trình duyệt headless
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    // Truy cập trang web
    const url =
      "https://www.worldweatheronline.com/ho-chi-minh-city-weather-history/vn.aspx";
    await page.goto(url, { waitUntil: "networkidle2" });

    // Giả lập chọn ngày hôm qua (giả định trang có form chọn ngày)
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const dateString = yesterday.toISOString().split("T")[0]; // Format: YYYY-MM-DD

    // Trích xuất dữ liệu từ bảng
    const weatherData = await page.evaluate(() => {
      const table = document.querySelector(".days-details-table");
      const rows = table ? Array.from(table.querySelectorAll("tr")) : [];
      const data: {
        time: string | null;
        temperature: string | null;
        rainfall: string | null;
        pressure: string | null;
      }[] = [];
      if (!rows || rows.length == 0) return [];
      rows.forEach((row) => {
        const tds = Array.from(row.querySelectorAll("td"));
        const time =
          row.querySelector(".days-comment1")?.textContent?.trim() ?? null;
        const temp =
          row.querySelector(".days-table-forecast-p1")?.textContent?.trim() ??
          null;
        const rain =
          row.querySelector(".days-rain-number")?.textContent?.trim() ?? null;
        const pressure =
          tds.length > 5
            ? tds[5]
                .querySelector(".days-table-forecast-p1")
                ?.textContent?.trim() ?? null
            : null;

        // Hàm tách giá trị số từ chuỗi
        function extractNumberDot(str: string | null): string | null {
          if (!str) return null;
          const match = str.match(/[\d.]+/g);
          return match ? match.join("") : "";
        }

        data.push({
          time: time,
          temperature: extractNumberDot(temp),
          rainfall: extractNumberDot(rain),
          pressure: extractNumberDot(pressure),
        });
      });

      // Loại bỏ dữ liệu thừa
      if (data.length > 1) {
        data.splice(0, 2);
      }

      return data;
    });
    // Đóng trình duyệt
    await browser.close();

    // Kiểm tra nếu không có dữ liệu
    if (weatherData.length === 0) {
      return NextResponse.json(
        {
          error: "No weather data found for the specified date",
        },
        { status: 404 }
      );
    }

    // Trả về dữ liệu JSON
    return NextResponse.json({
      date: dateString,
      location: "Ho Chi Minh City",
      timezone: "GMT+7",
      data: weatherData,
    });
  } catch (error: any) {
    console.error("Error scraping weather data:", error);
    return NextResponse.json(
      {
        error: "Failed to scrape weather data",
        body: error.message,
      },
      { status: 500 }
    );
  }
}
