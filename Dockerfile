# Chỉ định phiên bản node rút gọn (alpine)
FROM node:alpine

# thiết lập thư mục làm việc
WORKDIR /home/app

# sao chép các tệp package.json và package-lock.json vào thư mục làm việc
COPY package.json  package-lock.json ./

# cài đặt các gói phụ thuộc 5p
RUN npm install --timeout=300000

# sao chép tất cả các tệp trong thư mục hiện tại vào thư mục làm việc
COPY . .

# Chạy Prisma Generate
RUN npx prisma generate


#Mở cổng 3000 
EXPOSE 3069

# chạy ứng dụng
CMD ["npm", "run", "start"]




