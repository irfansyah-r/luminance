# Project Title

Luminance App.

## Description

CrossSite Manga Tracker (for learning purposes).

## Getting Started

### Dependencies

* PHP 8
* NPM 16.x.x
* MySQL

### Installing

* Buka Command Prompt pada folder Project dan jalankan perintah :
```
composer install
```
lalu
```
npm i
```
* Copy file .env.example dan rename menjadi .env
* Sesuaikan config database dengan database yang digunakan
* Buka Command Prompt pada folder Project dan generate key baru dengan menjalankan perintah :
```
php artisan key:generate
```
* Migrasi dan seed database dengan menjalankan perintah :
```
php artisan migrate --seed
```

### Executing program

* Run project dengan menjalankan perintah :
```
php artisan serve
```
* Buka link yang berupa ip dan port seperti http://localhost:8000/ pada browser
* Buat Akun baru dengan masuk ke halaman Register

## Help

Any advise for common problems or issues.
```
command to run if program contains helper info
```

## Authors

Contributors names and contact info

ex. Irfansyah Rizal  
ex. [@Email](mailto:irfansyah.rizal.20@gmail.com)

## Version History

* 0.2
    * Various bug fixes and optimizations
    * See [commit change]() or See [release history]()
* 0.1
    * Initial Release

## License

This project is licensed under the [NAME HERE] License - see the LICENSE.md file for details
