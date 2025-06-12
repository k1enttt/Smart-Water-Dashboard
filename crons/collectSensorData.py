'''
Chạy lệnh "python crons/collectSensorData.py" để thực thi
'''

import requests
import time
from datetime import datetime
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv(dotenv_path=".env.local")
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
        print(f"[{datetime.now()}] Đang gọi API...")
        headers = {"X-API-Key": API_KEY}
        response = requests.get("http://localhost:3000/api/weather-data", headers=headers)
        if response.status_code == 200:
            data = response.json()
            print("✔️ Đã nhận dữ liệu thành công.")
            if 'date' in data:
                print("Ngày (date) trong payload:", data['date'])
            else:
                print("Không tìm thấy trường 'date' trong payload.")
        else:
            print(f"❌ Lỗi khi gọi API: {response.status_code} - {response.text}")
            return

        '''
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

if __name__ == "__main__":
    print("🕒 Chương trình đang chạy...")
    fetch_and_store()
