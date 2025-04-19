# 🌟 Ayla AI

## 📌 Opis projektu

Ayla AI to zaawansowana aplikacja webowa oparta na **Next.js**, <br>
z bazą danych od **Prisma**, oraz z Biblioteką **Discord.js** <br>
umożliwiająca interakcję z użytkownikami zarówno poprzez interfejs webowy, jak i bota Discord.

## 🛠 Technologie

- 🚀 **Next.js** (v15.2.4) – Framework do budowy aplikacji webowych
- ⚛ **React** (v19.0.0) – Biblioteka UI
- 🗄 **Prisma** (v5.12.1) – ORM do zarządzania bazą danych (SQL Server)
- 🤖 **Discord.js** (v14.18.0) – Biblioteka do interakcji z Discord API
- 🌍 **Express** (v5.1.0) – Serwer backendowy
- 🎨 **CSS** (v4) – Stylizacja UI
- 🏗 **TypeScript** (v5) – Budowa kodu

## 📥 Instalacja

Aby uruchomić projekt lokalnie:

1. **Sklonuj repozytorium:**
   ```bash
   git clone https://github.com/matiqueue/Ayla-AI
   cd ayla-ai
   ```
2. **Zainstaluj zależności:**
   ```bash
   npm install
   ```
3. **Skonfiguruj plik `.env` zgodnie z plikiem `.env.example`:**
   ```env
   DATABASE_URL="URL_BAZY_DANYCH"
   DISCORD_TOKEN=TWÓJ_TOKEN
   DISCORD_GUILD_ID=ID_TWOJEGO_SERWERA
   ```
4. **Uruchom Prisma:**
   ```bash
   npx prisma migrate dev --name init
   ```
5. **Uruchom aplikację w przeglądarce\*\***
   ```bash
   npm run dev
   ```

## ⚙️ Konfiguracja środowiska

Plik `.env.example` zawiera wymagane zmienne środowiskowe:

```env
 → Databse URL Connection String
DATABASE_URL="URL_BAZY_DANYCH"

 → Discord API keys
DISCORD_TOKEN=TWÓJ_TOKEN
DISCORD_GUILD_ID=ID_TWOJEGO_SERWERA
```

## 🗃 Struktura bazy danych (Prisma)

```prisma
datasource db {
  provider = "sqlserver"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model License {
  id        Int      @id @default(autoincrement())
  code      String   @unique
  isUsed    Boolean  @default(false)
  userId    Int?     @unique
  createdAt DateTime @default(now())
  user      User?    @relation(fields: [userId], references: [id])
}

model User {
  id             Int       @id @default(autoincrement())
  email          String    @unique
  username       String    @unique
  licenceCode    String    @unique
  firstName      String?
  lastName       String?
  profilePicture String?
  createdAt      DateTime  @default(now())
  chats          Chat[]
  license        License?
}

model Chat {
  id        Int       @id @default(autoincrement())
  userId    Int
  title     String?
  user      User      @relation(fields: [userId], references: [id])
  messages  Message[]
  createdAt DateTime  @default(now())
}

model Message {
  id        Int      @id @default(autoincrement())
  chatId    Int
  content   String   @db.VarChar(8000)
  createdAt DateTime @default(now())
  chat      Chat     @relation(fields: [chatId], references: [id])
}
```

## 📜 Skrypty

Zdefiniowane w `package.json`:

```json
"scripts": {
  "dev:next": "next dev --turbopack",
  "build:next": "next build",
  "start:next": "next start",
  "lint:next": "next lint",
  "prisma": "npx tsx database/main.ts",
  "seed": "npx tsx database/seed/seed.ts",
  "bot": "npx tsx bot/main.ts",
  "dev": "concurrently --names \"Next,Prisma,Bot\" --prefix-colors \"blue,green,yellow\" \"npm run dev:next\" \"npm run prisma\" \"npm run bot\""
}
```

```
Opis i działanie każdego, in process...
```

### ▶️ Uruchamianie aplikacji

- **`npm run dev`** – Uruchamia aplikację, Prisma i bota jednocześnie
- **`npm run build:next`** – Buduje aplikację
- **`npm run start:next`** – Uruchamia aplikację
- **`npm run prisma`** – Uruchamia Prisma Client
- **`npm run bot`** – Uruchamia bota Discord

## 📖 Dokumentacja API

`***Reszta dokumentacji***`

### 📌 Przykładowe endpointy

- `GET /api/users` – Pobiera listę użytkowników
- `POST /api/users` – Tworzy nowego użytkownika
- `GET /api/chats/:id` – Pobiera czat o danym ID
- `POST /api/messages` – Wysyła wiadomość do czatu

## 👥 Autorzy

- **Szymon Góral** – Kierownik projektu
- **Michał Gomułka** – support Szymona Górala (management supporting) + version controlling
- **Sebastian Podgórski** – obsluga bazy danych sqlserver (mssql) + prisma orm
- **Piotr Chąrążak** – frontend, tworzenie ui (react and components libraries)
- **Patryk Kajda** – support Piotrka Chorazaka w tworzeniu i zarzadzaniu UI / UX (fullstack)

- **Szymon Białek** – Tworzenie grafik, autor readme.md
- **Oliwia Wolak** – Gówno
- **Piotr Kiełtyka** – Sraka

## 📜 Licencja

Projekt jest objęty licencją **_MIT_**<br>
Szczegóły znajdują się w pliku [LICENSE](./LICENSE).
