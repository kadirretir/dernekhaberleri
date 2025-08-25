# Dernek Haberleri & Duyuruları (Spring Boot + React + PostgreSQL)

Bir derneğin web sitesinde **Haberler** ve **Duyurular** içeriklerinin dinamik olarak yönetildiği (ekleme, güncelleme, silme) ve yayınlandığı full‑stack uygulama. Admin tarafından girilen **yeni duyurular** WebSocket ile kullanıcı ekranına **anında** yansır.

---

## İçindekiler
- [Özellikler](#özellikler)
- [Teknolojiler](#teknolojiler)
- [Proje Gereksinimleri (Ödev Tanımı)](#proje-gereksinimleri-ödev-tanımı)
- [Kurulum ve Çalıştırma](#kurulum-ve-çalıştırma)
  - [1. Backend (Spring Boot)](#1-backend-spring-boot)
  - [2. Frontend (React--typescript)](#2-frontend-react--typescript)
- [Design Pattern Açıklaması](#design-pattern-açıklaması)
- [Gerçek Zamanlı Duyuru (WebSocket)](#gerçek-zamanlı-duyuru-websocket)
- [Proje Yapısı](#proje-yapısı)
- [İletişim](#iletişim)

---

## Özellikler
- **Admin Panelleri**
  - Haber ekleme / güncelleme / silme
  - Duyuru ekleme / güncelleme / silme (resim yükleme: dosya sisteminde saklama)
- **Kullanıcı Arayüzleri**
  - Haberler listeleme, tek habere tıklayınca **popup** pencerede detay
  - Duyurular listeleme
- **Gerçek Zamanlı Güncelleme**
  - Yeni duyuru girildiğinde kullanıcı ekranında **otomatik** gösterim (WebSocket)

---

## Teknolojiler
- **Programlama:** Java
- **BackEnd Framework:** Spring Boot
- **ORM:** Hibernate (JPA)
- **Database:** PostgreSQL
- **Frontend:** React (TypeScript) 

---

## Proje Gereksinimleri (Ödev Tanımı)
- `Haber` ve `Duyuru` entity’leri, tek bir `Etkinlik` (Base Entity) sınıfından **extend** eder ve **tek bir DB tablosunda** tutulur.
  - **Etkinlik (Base Entity):** `id`, `konu`, `icerik`, `gecerlilikTarihi`
  - **Haber:** `haberLinki`
  - **Duyuru:** `resim` (dosya sisteminde saklanır)
-  **bir adet Design Pattern** kullanılmıştır (Repository Pattern).
- Admin ekranından **yeni duyuru** girildiğinde, **WebSocket** ile kullanıcı ekranında **otomatik** olarak görünmelidir.

---

## Kurulum ve Çalıştırma

### 1. Backend (Spring Boot)

> Gereksinimler: JDK 17+, Maven, PostgreSQL 14+

1. **PostgreSQL** veritabanını çalıştırın (ör: `dernekdb` adında).
2. `application.properties` dosyasını veritabanı bilgilerine göre güncelleyin:

   ```properties
   # === PostgreSQL ===
   spring.datasource.url=jdbc:postgresql://localhost:5432/dernek
   spring.datasource.username=postgres
   spring.datasource.password=123456789


   # === Hibernate / JPA ===
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true
   spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

   # === Dosya Yükleme (Duyuru resimleri) ===
   app.upload-dir=uploads

3. Projeyi build ve çalıştırın (Maven ile):
   ```bash
   cd dernek
   mvn clean install
   mvn spring-boot:run
   ```

> Varsayılan olarak backend `http://localhost:8080` adresinde çalışır.

---

### 2. Frontend (React + TypeScript)

> Gereksinimler: Node.js 18+, npm

1. `frontend` klasörüne girin:
   ```bash
   cd frontend
   ```

2. Gerekli paketleri yükleyin:
   ```bash
   npm install
   ```

3. Uygulamayı başlatın:
   ```bash
   npm run dev
   ```

> Varsayılan olarak frontend `http://localhost:5173` adresinde çalışır.

---

## Design Pattern Açıklaması

Projede kullanılan örnek bir design pattern (**Repository Pattern**) şu şekilde kurgulanır:

- **EtkinlikRepository**: `Haber` ve `Duyuru` için **ortak** veritabanı erişim metotlarını sağlar.
- **Concrete sınıflar** (`HaberRepository`, `DuyuruRepository`) gerekirse bu işlevleri genişleterek uygular.

---

## Gerçek Zamanlı Duyuru (WebSocket)

> Örnek akış: **Admin** duyuru ekler → **Backend** duyuruyu kaydeder ve websocket üzerinden yayınlar → **Kullanıcı UI** anında güncellenir.

---

## Proje Yapısı

```
/
├── dernek/
│   ├── src/main/java/...          # Spring Boot kodu
│   ├── src/main/resources/
│   │   └── application.properties
├── frontend/
│   ├── public/
│   ├── src/
│   │   └── components/
├── uploads/                      #Resimler Klasörü
├── README.md                      # (Bu dosya)
└── .gitignore
```

---

## Geliştirme Süreci

- Git **versiyon kontrolü** aktif olarak kullanılmıştır.

---


## İletişim

**Kadir Ramazan Üretir**  
E-posta: kadirramazan344@gmail.com
