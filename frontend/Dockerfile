# Sử dụng Node.js làm base image để xây dựng ứng dụng
FROM node:18 AS build

# Thiết lập thư mục làm việc bên trong container
WORKDIR /app

# Sao chép file package.json và package-lock.json để cài đặt dependencies
COPY package.json package-lock.json ./

# Cài đặt các dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào thư mục làm việc
COPY . .

# Build ứng dụng React
RUN npm run build

# Sử dụng Nginx để phục vụ các file build (static files)
FROM nginx:alpine

# Sao chép các file build từ giai đoạn build trước vào thư mục Nginx phục vụ các file tĩnh
COPY --from=build /app/build /usr/share/nginx/html

# Copy cấu hình nginx nếu cần (không bắt buộc)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose cổng 80 để Nginx có thể lắng nghe các yêu cầu HTTP
EXPOSE 80

# Khởi động Nginx
CMD ["nginx", "-g", "daemon off;"]
