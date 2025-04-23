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
   pnpm install
   ```
3. **Skonfiguruj plik `.env` zgodnie z plikiem `.env.example`:**
   ```env
   # Discord Bot Values
   BOT_TOKEN = "" # Discord Bot Token
   CLIENT_ID = "" # Discord Client ID
   CLIENT_SECRET = "" # Discord Client Secret
   PUBLIC_KEY = "" # Discord Public Key
   
   # Clerk Values
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = "" # Clerk Publishable Key
   CLERK_SECRET_KEY = "" # Clerk Secret Key
   
   # Database Values
   DATABASE_URL = "" # Database URL
   
   # Next.js Values
   NEXT_PUBLIC_API_URL = "" # Next.js API URL
   
   # Scrapper
   USER_TOKEN = "" # User Token for Data Scrapping
   
   # Routes
   NEXT_PUBLIC_CLERK_SIGN_IN_URL = "" # Sign In URL
   NEXT_PUBLIC_CLERK_SIGN_UP_URL = "" # Sign Up URL
   
   # Redirect URLs
   NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL = "" # Sign In Fallback Redirect URL
   NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL = "" # Sign Up Fallback Redirect URL
   
   # Ollama API URL
   OLLAMA_URL = "" # Ollama API URL
   
   # Admin Values
   ADMIN_USERNAME = "" # Admin Username
   ADMIN_PASSWORD = "" # Admin Username and Password

   # Server
   SERVER_PORT = "" # Server Port
   ```
4. **Uruchom Prisma:**
   ```bash
   npx prisma migrate dev --name init
   ```
5. **Uruchom aplikację w przeglądarce\*\***
   ```bash
   pnpm run dev
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

</br>

# 📖 Dokumentacja API

## 📌Endpointy

### 🦙 endpointy backend (Ollama)

#### `/api/tags`

- `GET` – Zwraca listę aktualnie uruchomionych modeli

```bash
curl http://localhost:11434/api/tags
```

**Response:**

```json
{
  "models": [
    {
      "name": "llama2",
      "modified_at": "2023-07-20T15:31:02.565Z",
      "size": 3883000000
    }
  ]
}
```

#### `/api/generate`

- `POST` – Generuje odpowiedź tekstową z modelu

```bash
curl http://localhost:11434/api/generate \
  -d '{"model": "llama2", "prompt": "Hello"}'
```

**Response:**

```json
{
  "response": "Hello! How can I help you today?"
}
```

#### `/api/show`

- `POST` – Zwraca szczegóły dotyczące modelu

```bash
curl http://localhost:11434/api/show \
  -d '{"name": "llama2"}'
```

**Response:**

```json
{
  "modelfile": "FROM llama2"
}
```

#### `/api/create`

- `POST` – Tworzy nowy model na podstawie modelfile

```bash
curl http://localhost:11434/api/create \
  -d '{"name": "custom-model", "modelfile": "FROM llama2"}'
```

**Response:**

```json
{
  "status": "success"
}
```

#### `/api/blobs`

- `POST` – Wysyła dane binarne (blob)

```bash
curl http://localhost:11434/api/blobs --data-binary @plik.bin
```

**Response:**

```json
{
  "digest": "sha256:xyz"
}
```

#### `/api/blobs/:digest`

- `GET` – Pobiera blob na podstawie digest

```bash
curl http://localhost:11434/api/blobs/sha256:xyz
```

**Response:**
_plik binarny_

#### `/api/copy`

- `POST` – Kopiuje istniejący model

```bash
curl http://localhost:11434/api/copy \
  -d '{"source": "llama2", "destination": "llama2-backup"}'
```

**Response:**

```json
{
  "status": "success"
}
```

#### `/api/delete`

- `DELETE` – Usuwa wskazany model

```bash
curl -X DELETE http://localhost:11434/api/delete \
  -d '{"name": "llama2"}'
```

**Response:**

```json
{
  "status": "deleted"
}
```

#### `/api/push`

- `POST` – Publikuje model do rejestru

```bash
curl http://localhost:11434/api/push \
  -d '{"name": "llama2"}'
```

**Response:**

```json
{
  "status": "pushed"
}
```

#### `/api/pull`

- `POST` – Pobiera model z rejestru

```bash
curl http://localhost:11434/api/pull \
  -d '{"name": "llama2"}'
```

**Response:**

```json
{
  "status": "pulled"
}
```

#### `/api/embed`

- `POST` – Tworzy embedding z tekstu

```bash
curl http://localhost:11434/api/embed \
  -d '{"model": "llama2", "prompt": "hello"}'
```

**Response:**

```json
{
  "embedding": [0.1, 0.2, 0.3]
}
```

#### `/api/ps`

- `GET` – Lista aktywnych modeli

```bash
curl http://localhost:11434/api/ps
```

**Response:**

```json
{
  "models": ["llama2"]
}
```

#### `/api/version`

- `GET` – Zwraca wersję API

```bash
curl http://localhost:11434/api/version
```

**Response:**

```json
{
  "version": "0.1.26"
}
```

#### `/api/chats`

- `GET` – Zwraca czaty użytkowników

```bash
curl http://localhost:3000/api/chats
```

**Response:**

```json
[
  {
    "id": 1,
    "userId": 1,
    "title": "Chat 1"
  }
]
```

#### `/api/messages`

- `GET` – Zwraca wiadomości z czatów

```bash
curl http://localhost:3000/api/messages
```

**Response:**

```json
[
  {
    "id": 1,
    "chatId": 1,
    "content": "Hello"
  }
]
```

### 📁 Endpointy aplikacji webowej

#### `/api/get-license`

- `POST` – Pobiera status licencji użytkownika

```bash
curl http://localhost:3000/api/get-license \
  -d '{"email": "user@example.com"}'
```

**Response:**

```json
{
  "license": {
    "expiresAt": "2025-12-31T23:59:59Z"
  }
}
```

#### `/api/delete-license`

- `POST` – Usuwa licencję użytkownika

```bash
curl http://localhost:3000/api/delete-license \
  -d '{"email": "user@example.com"}'
```

**Response:**

```json
{
  "status": "deleted"
}
```

#### `/api/users`

- `GET` – Zwraca listę zarejestrowanych użytkowników

```bash
curl http://localhost:3000/api/users
```

**Response:**

```json
[
  {
    "id": 1,
    "email": "example@mail.com"
  }
]
```

## 👥 Autorzy

- **Szymon Góral** – Kierownik projektu
- **Michał Gomułka** – support Szymona Górala (management supporting) + version controlling
- **Sebastian Podgórski** – obsluga bazy danych sqlserver (mssql) + prisma orm
- **Piotr Chąrążak** – frontend, tworzenie ui (react and components libraries)
- **Patryk Kajda** – support Piotrka Chorazaka w tworzeniu i zarzadzaniu UI / UX (fullstack)
- **Szymon Białek** – Tworzenie grafik, autor readme.md
- **Oliwia Wolak** – Wsparcie mentalne, pomoc ogólna przy tworzeniu projektu.
- **Piotr Kiełtyka** – Chęć pomocy

## 📜 Licencja

Projekt jest objęty licencją **_MIT_**<br>
Szczegóły znajdują się w pliku [LICENSE](./LICENSE).
