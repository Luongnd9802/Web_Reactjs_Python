import os
from dotenv import load_dotenv

load_dotenv()

# Đọc các biến môi trường, nếu không có thì sử dụng giá trị mặc định
DB_USERNAME = os.getenv("DB_USERNAME")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")