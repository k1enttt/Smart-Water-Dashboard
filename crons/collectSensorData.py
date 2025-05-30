import requests
import schedule
import time
from datetime import datetime
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv(dotenv_path="../.env.local")
API_KEY = os.getenv("CRON_JOB_API_KEY")
API_URL = os.getenv("CRON_JOB_API_URL")
MONGO_URI = os.getenv("MONGODB_URI")

# Kết nối tới MongoDB
client = MongoClient(MONGO_URI)
db = client["swdb"]
collection = db["trees"]

# Hàm gọi API và lưu dữ liệu
def fetch_and_store():
    try:
        '''
        print(f"[{datetime.now()}] Đang gọi API...")
        headers = {"X-API-Key": API_KEY}
        response = requests.get(API_URL, headers=headers)
        response.raise_for_status()
        data = response.json()

        # Thêm timestamp vào dữ liệu
        data['timestamp'] = datetime.now()

        # Lưu vào MongoDB
        collection.insert_one(data)
        print("✔️ Đã lưu dữ liệu thành công.")
        '''
        print("Đây là cron jobs, nó được kích hoạt mỗi 30s 1 lần")
        print("API Key: ", API_KEY),
        print("API URL: ", API_URL),
        print("Danh sách cây:")
        for tree in collection.find():
            print('- ' + tree['name'])
        print()
    except Exception as e:
        print("❌ Lỗi khi gọi API hoặc lưu dữ liệu:", e)

# Lên lịch mỗi giờ chạy một lần
schedule.every(30).seconds.do(fetch_and_store)

# Vòng lặp chính
print("🕒 Chương trình đang chạy... Nhấn Ctrl+C để dừng.")
while True:
    schedule.run_pending()
    time.sleep(1)
