# UCOURSE WEBSITE
Website quản lý các khóa học trực tuyến cho một trung tâm đào tạo

## Chuẩn bị: Cài đặt Python3, Pip, Virtualenv

### Cài đặt Python3
Mở file [runtime.txt](runtime.txt) để kiểm tra python version được sử dụng

Phiên bản đang được sử dụng hiện tại trong project là 3.8.0

```
python-3.8.0
```

Truy cập [Python.org](https://www.python.org/downloads/) để tải và cài đặt Python

Kiểm tra việc cài đặt thành công Python bằng cách mở terminal và gõ lệnh sau

```
python --version
```
### Cài đặt pip
Với phiên bản python hiện tại, bạn có thể bỏ qua bước này vì
```
Từ phiên bản python 3.4 trở đi, PIP đã được cài sẵn trong python
```
Kiểm tra pip đã được cài đặt thành công bằng cách gõ lệnh
```
pip --version
```
### Cài đặt Virtualenv
```
pip install virtualenv
```
Kiểm tra Virtualenv đã cài đặt thành công bằng cách gõ lệnh
```
virtualenv --version
```

## Cài đặt Project

### Bước 1: Clone repository theo lệnh sau

```sh
$ git clone git@github.com:Natsu1270/Ucourse.git
```
Sau đó truy cập vào thư mục của project
```sh
$ cd Ucourse
```
### Bước 2: Khởi tạo một virtual environment để cài đặt dependencies

```sh
$ virtualenv venv
```
Kích hoạt virtualenv bằng cách thực hiện lệnh sau
```
$ cd venv/Scripts
```
$ /activate
```

### Bước 3: Cài đặt dependencies bằng cách gõ lệnh sau

```sh
(venv)$ pip install -r requirements.txt
```
Lưu ý: `(venv)` trước dấu nhắc để chỉ ra rằng terminal session này hoạt động trong một môi trường ảo được thiết lập bởi `virtualenv`

### Bước 4: Cài đặt npm
```
(venv)$ pip install npm
```
(venv)$ Ucourse cd /.Ucourse

### Bước 5: Migrate database bằng lệnh
```sh
(venv)$ python manage.py pip install -r requirement.txt
(venv)$ python manage.py makemigrations
(venv)$ python manage.py migrate
```

### Bước 7: Chạy dự án bằng cách thực hiện lệnh
```sh
(venv)$ python manage.py runserver
```
Trang web được hiển thị tại `http://127.0.0.1:8000/`.
```
Tài khoản Admin:
- email: admin@admin.com
- password: 1212
