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

# Gắn thẻ tag cho image để push lên docker hub

docker tag cyber-media fuderrpham/cyber-media:latest

docker tag your-docker-image your-dockerhub-username/your-docker-image:latest

#Push Image to DockerHub

docker push your-dockerhub-username/nestjs-app:latest

docker push fuderrpham/cyber_media:0.0.1

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


#Xem ds thư mục
ls -ls  

#tạo folder 
mkdir ten_folder         

#di chuyển lùi 
cd ../

#tạo file
touch ten_file  

#ghi file bằng tool nano
nano ten_file

#Lưu file với nano Ctr + O và Enter

Ctr + X = thoát

#kẹp sudo với quyền Root không cần thêm lệnh su trước đó nữa 
sudo su

#thoát quyền : exit

#xem log của container
docker logs container_id 


#truy cập vào terminal của container thêm .env

docker exec -it container_id_or_name /bin/sh - ghi file với alpine dùng vi ten_file

tạo file vi .env 
 touch .env
 thoát ra : exit
 I , Esc, :wq, :q

 #restart lại container:
 docker container restart id_container 

xóa file: sudo rm ten_file
xóa folder: sudo rmdir ten_folder


xóa action runner:
 sudo rm -rf ~/actions-runner

 sau khi thành công chọn Default