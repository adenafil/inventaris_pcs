# BAB III TINJAUAN PUSTAKA

## 3.1 Tinjauan Umum

Tinjauan pustaka ini menguraikan landasan teori yang relevan dan menjadi dasar dalam pengembangan Sistem Inventaris di PT Petrokopindo Cipta Selaras (PCS). Pembahasan mencakup konsep dasar sistem informasi manajemen, manajemen inventaris, metodologi pengembangan perangkat lunak, serta teknologi yang digunakan dalam implementasi sistem. Pemahaman terhadap teori-teori ini penting untuk memastikan bahwa sistem yang dikembangkan memiliki landasan konseptual yang kuat dan sesuai dengan standar industri maupun akademis.

## 3.2 Sistem Informasi Manajemen

### 3.2.1 Konsep Dasar Sistem Informasi

Sistem informasi didefinisikan sebagai sekumpulan komponen yang saling berhubungan, yang bekerja sama untuk mengumpulkan, memproses, menyimpan, dan mendistribusikan informasi guna mendukung pengambilan keputusan, koordinasi, dan pengendalian dalam suatu organisasi. Menurut Laudon dan Laudon (2018), sistem informasi secara teknis dapat didefinisikan sebagai serangkaian komponen yang saling terkait yang mengumpulkan (atau mengambil kembali), memproses, menyimpan, dan mendistribusikan informasi untuk mendukung pengambilan keputusan dan kontrol dalam suatu organisasi.

Dalam konteks perusahaan logistik seperti PT Petrokopindo Cipta Selaras, sistem informasi berperan krusial dalam mengintegrasikan alur data operasional menjadi informasi yang bermakna bagi manajemen. Sistem informasi tidak hanya berfungsi sebagai alat otomasi proses administrasi, tetapi juga sebagai instrumen strategis untuk meningkatkan efisiensi dan efektivitas bisnis (O’Brien & Marakas, 2011).

### 3.2.2 Manajemen Inventaris dan Aset

Manajemen inventaris merupakan proses pengelolaan persediaan barang atau aset yang dimiliki oleh perusahaan untuk memastikan kelancaran operasional bisnis. Menurut Heizer, Render, dan Munson (2017), manajemen inventaris bertujuan untuk menyeimbangkan antara investasi persediaan dan pelayanan pelanggan. Pengelolaan yang efektif memerlukan sistem pencatatan yang akurat, pemantauan status aset secara *real-time*, dan pengendalian pergerakan aset.

Dalam lingkungan perkantoran perusahaan, pengelolaan aset inventaris seperti perangkat teknologi informasi (IT) dan peralatan kantor merupakan aspek penting yang mendukung produktivitas harian. Aset-aset ini mencakup perangkat keras (*hardware*) seperti komputer, monitor, printer, *router*, *switch*, kabel LAN, hingga furnitur dan peralatan kantor lainnya. Sistem inventaris berbasis digital memungkinkan perusahaan untuk:
1.  Melacak detail spesifikasi, lokasi, dan pengguna (*assigned to*) dari setiap unit aset, misalnya siapa yang menggunakan laptop tertentu.
2.  Memantau kondisi fisik dan riwayat pemeliharaan perangkat elektronik untuk mencegah kerusakan mendadak yang mengganggu pekerjaan.
3.  Mengelola stok barang habis pakai (*consumables*) dan cadangan perangkat pendukung seperti kabel atau periferal.
4.  Menyediakan laporan yang akurat mengenai total valuasi aset IT dan peralatan kantor untuk keperluan audit dan anggaran pengadaan.

## 3.3 Metodologi Pengembangan Sistem

Dalam pengembangan sistem inventaris ini, penulis menerapkan metodologi pengembangan **Iteratif** (*Iterative Development*). Pendekatan ini dipilih karena karakteristiknya yang fleksibel dan adaptif terhadap perubahan kebutuhan yang mungkin terjadi selama proses pengembangan berlangsung.

### 3.3.1 Pendekatan Iteratif (*Iterative Development*)

Metode iteratif adalah pendekatan pengembangan perangkat lunak di mana sistem dibangun melalui serangkaian siklus berulang (iterasi). Setiap iterasi mencakup tahapan analisis, perancangan, implementasi, dan pengujian, yang menghasilkan rilis sistem yang semakin lengkap fiturnya secara bertahap (*incremental*).

Menurut Sommerville (2016), pendekatan iteratif memiliki keunggulan utama dalam hal fleksibilitas untuk mengakomodasi perubahan persyaratan pengguna di tengah proses pengembangan. Hal ini berbeda dengan model *Waterfall* klasik yang kaku, di mana seluruh kebutuhan harus didefinisikan secara lengkap di awal. Dalam konteks magang ini, pendekatan iteratif memungkinkan penulis untuk mendapatkan umpan balik (*feedback*) yang cepat dari mentor maupun *stakeholder* di PT PCS pada setiap akhir siklus, sehingga perbaikan dapat segera dilakukan.

Tahapan dalam setiap iterasi yang dilakukan meliputi:
1.  **Perencanaan Iterasi (*Iteration Planning*):** Menentukan fitur prioritas yang akan dikerjakan.
2.  **Analisis dan Desain (*Analysis & Design*):** Menganalisis kebutuhan detil fitur dan merancang solusi teknisnya.
3.  **Implementasi (*Implementation*):** Melakukan pengkodean (*coding*) fitur menggunakan teknologi yang telah ditentukan.
4.  **Pengujian (*Testing*):** Memverifikasi fungsionalitas fitur dan integrasinya dengan komponen lain.
5.  **Evaluasi (*Evaluation*):** Mendapatkan *feedback* dan melakukan tinjauan teknis.

## 3.4 Teknologi Pengembangan Sistem

Sistem Inventaris PT PCS dikembangkan menggunakan teknologi web modern yang terdiri dari *framework* PHP Laravel pada sisi *backend*, React dengan Inertia.js pada sisi *frontend*, serta basis data MySQL. Pemilihan teknologi ini didasarkan pada kebutuhan akan sistem yang skalabel, aman, dan mudah dipelihara (*maintainable*).

### 3.4.1 Laravel

Laravel adalah kerangka kerja (*framework*) aplikasi web berbasis PHP yang menggunakan arsitektur *Model-View-Controller* (MVC). Laravel dikenal dengan sintaksisnya yang ekspresif dan elegan, serta menyediakan berbagai fitur bawaan yang mempercepat proses pengembangan, seperti sistem autentikasi, manajemen basis data (Eloquent ORM), dan keamanan (proteksi CSRF, enkripsi). Menurut Stauffer (2019), Laravel menyediakan ekosistem yang kuat untuk membangun aplikasi web modern yang kompleks dengan standar keamanan dan performa yang tinggi. Dalam proyek ini, Laravel versi 12 digunakan sebagai fondasi utama aplikasi untuk menangani logika bisnis dan interaksi dengan basis data.

### 3.4.2 React dan Inertia.js

Untuk membangun antarmuka pengguna (*User Interface*) yang interaktif dan responsif, sistem ini menggunakan pustaka JavaScript **React**. React memungkinkan pengembangan komponen UI yang modular dan dapat digunakan kembali (*reusable components*). Penggunaan React dipadukan dengan **Inertia.js**, sebuah alat yang memungkinkan pengembang untuk membangun aplikasi sngle-page (*Single Page Application*) menggunakan paradigma *backend* klasik (seperti Laravel) tanpa perlu membangun API terpisah secara kompleks. Inertia.js bertindak sebagai penghubung antara *backend* Laravel dan *frontend* React, memberikan pengalaman pengembangan yang efisien dan performa aplikasi yang cepat.

### 3.4.3 Tailwind CSS

**Tailwind CSS** digunakan sebagai kerangka kerja CSS (*Utility-First CSS framework*) untuk perancangan tampilan antarmuka. Berbeda dengan kerangka kerja UI tradisional, Tailwind menyediakan kelas-kelas utilitas tingkat rendah yang memungkinkan pengembang untuk membangun desain kustom tanpa harus menulis CSS murni dari awal. Pendekatan ini mempercepat proses *styling* dan memastikan konsistensi desain di seluruh aplikasi.

### 3.4.4 Shadcn UI

**Shadcn UI** adalah koleksi komponen antarmuka pengguna yang dirancang dengan indah, dapat diakses, dan dapat disesuaikan. Berbeda dengan pustaka komponen tradisional yang diinstal sebagai dependensi npm, Shadcn UI memungkinkan pengembang untuk menyalin dan menempelkan kode komponen langsung ke dalam proyek. Komponen-komponen ini dibangun di atas **Radix UI** (untuk aksesibilitas dan fungsionalitas dasar) dan **Tailwind CSS** (untuk penataan gaya). Penggunaan Shadcn UI dalam proyek ini mempercepat pengembangan elemen antarmuka standar seperti tombol, formulir, dialog, dan tabel data dengan tetap memberikan fleksibilitas penuh untuk kustomisasi desain sesuai identitas perusahaan.

### 3.4.5 MySQL

Sebagai sistem manajemen basis data (*Database Management System*), **MySQL** dipilih untuk menyimpan seluruh data inventaris dan pengguna. MySQL merupakan RDBMS (*Relational Database Management System*) yang populer karena keandalannya, kinerjanya yang cepat, dan kemudahan penggunaannya. Dalam sistem ini, MySQL menangani penyimpanan data terstruktur yang meliputi data aset, data karyawan, riwayat transaksi, dan konfigurasi sistem dengan relasi antar tabel yang terjaga integritasnya.



---

**Daftar Pustaka (Referensi untuk Bab III)**



Heizer, J., Render, B., & Munson, C. (2017). *Operations Management: Sustainability and Supply Chain Management* (12th ed.). Pearson.

Laudon, K. C., & Laudon, J. P. (2018). *Management Information Systems: Managing the Digital Firm* (15th ed.). Pearson Education.

O’Brien, J. A., & Marakas, G. M. (2011). *Management Information Systems* (10th ed.). McGraw-Hill/Irwin.

Pressman, R. S., & Maxim, B. R. (2020). *Software Engineering: A Practitioner's Approach* (9th ed.). McGraw-Hill Education.

Sommerville, I. (2016). *Software Engineering* (10th ed.). Pearson Education.

Stauffer, M. (2019). *Laravel: Up & Running: A Framework for Building Modern PHP Apps* (2nd ed.). O'Reilly Media.