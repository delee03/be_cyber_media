# 
Docker Build 
# docker build -t cyber-media . 

Docker Run
# docker run -d -p 3000:3000 --name ten_container ten_image
-d : chạy ở chế độ daemon : dectach
-p : port
--name : tên container tên image


Lấy địa chỉ MySQL Container trong Docker

# docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' id_name_container
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' 3c8212a1ba86b556925f7501951606fe62bd0df5b37c77fa7dc87abce8f8a58c
#172.17.0.2

#Lấy danh sách image hiện tại
docker images

#Tạo docker compose
* tạo file docker-compose.yml
* docker compose up -d

* - dừng docker compose
* docker compose down


* - xoá image
* docker image remove id_name_image
* 
* 
* - dừng container
* docker container stop id_name_container
* 
* - xoá container
* docker container remove id_name_container