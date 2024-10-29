# Sử dụng Python làm base image
FROM python:3.9

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Copy file requirements.txt vào container
COPY requirements.txt .

# Cài đặt dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy toàn bộ mã nguồn dự án vào container
COPY . .

# Expose port 8000 (FastAPI thường chạy trên port này)
EXPOSE 8000

# Chạy ứng dụng FastAPI với Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
