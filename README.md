# Project Title

Luminance App.
<img width="1600" height="787" alt="image" src="https://github.com/user-attachments/assets/3d35f9e0-8012-499b-9d82-824f50e0d735" />


## Description

CrossSite Manga Tracker. Track any manga for both official or unofficial translations sites in Bahasa Indonesia.
Current plan, in dedicated server get manga info and updates from translations sites using API or scrape it manually and store it in database or send it to another service in another server. And in another server create a bookmarking application that can easily track and update current reading status or chapters of user bookmarked manga.

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
