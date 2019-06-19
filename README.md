# INF NIM Finder
Nama    : Stefanus Ardi Mulia

NIM     : 13517119

## Petunjuk akses
Aplikasi ini dapat diakses di http://miner46er.github.io/INF-NIM-Finder

### Halaman Utama
Halaman utama berisi pesan pembuka serta form login bagi pengguna yang
belum login atau *session*-nya telah kadaluarsa.

Desktop:

![Home](screenshots/home.png)

Mobile:

![Home-mobile](screenshots/home-mobile.png)

Jika pengguna telah login, maka tampilan halaman utama menjadi halaman pencarian.

### Halaman Login
Halaman login berisi form login bagi pengguna.

![Login](screenshots/login.png)

Jika login berhasil, pengguna akan dialihkan ke halaman pencarian.

Pengguna dapat logout melalui menu logout pada navbar.

### Halaman Register
Halaman Register berisi form register bagi pengguna.

![Register](screenshots/register.png)

Jika registrasi berhasil, pengguna akan dialihkan ke halaman login.

### Halaman Pencarian
Halaman ini merupakan fitur utama dari aplikasi ini.

Halaman pencarian kosong berisi form query pencarian dan tombol cari.

![Search-empty](screenshots/search-empty.png)

Pencarian dapat dilakukan berdasarkan nama atau NIM.
Hasil pencarian akan ditampilkan di bawah form query.

Pencarian berdasarkan NIM:
![Search-NIM](screenshots/search-result1.png)

Pencarian berdasarkan nama:
![Search-name](screenshots/search-result2.png)

Pengguna dapat melihat lembar lain dari hasil pencarian
dengan tombol navigasi di bawah hasil pencarian.

Jika pencarian tidak menghasilkan apa-apa atau lembar yang
diminta pengguna merupakan lembar terakhir (kosong), maka akan
ditampilkan pesan berikut.

Lembar terakhir (kosong):
![Search-last-page](screenshots/search-result3.png)

Pencarian tanpa hasil:
![Search-no-result](screenshots/search-result4.png)

## Library/kakas yang digunakan
* [React](https://reactjs.org/)
* [react-bootstrap](https://react-bootstrap.github.io/)
* [axios](https://github.com/axios/axios)
* [qs](https://github.com/ljharb/qs)
* [react-cookies](https://www.npmjs.com/package/react-cookies)
* [react-router-dom](https://reacttraining.com/react-router/)

## Langkah Build Aplikasi
Install dependency aplikasi ini dengan:
```
npm install
```
lalu build aplikasi dengan:
```
npm run build
```

Kamu juga dapat langsung membuat github pages dengan:
```
npm run deploy
```

## Desain aplikasi


## Review desain API
