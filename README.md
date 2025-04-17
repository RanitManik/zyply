# Zyply — Fast URL Manager 🔗⚡

Zyply is a lightning-fast URL manager that lets you shorten links, track views, and visualize analytics — all in one clean interface.

Built using a modern monorepo setup powered by **Nx**.

## 🚀 Features

- 🔗 URL Shortening
- 📊 Real-Time View Analytics (with Graphs)
- 🌐 Modern UI with Next.js
- 💼 High-performance backend in Go
- 🛢️ PostgreSQL for reliable data storage
- 📦 Monorepo structure using Nx

## 🧱 Tech Stack

| Layer     | Tech                           |
| --------- | ------------------------------ |
| Frontend  | Next.js (React + Tailwind CSS) |
| Backend   | Go (Golang)                    |
| Database  | PostgreSQL                     |
| Dev Tools | Nx, Prettier, Tailwind Sorter  |

## 📁 Project Structure

```text
ZYPLY
├── frontend/       # Next.js application
├── backend/        # Go application
├── frontend-e2e/   # Full end-to-end tests
└── shared-types/   # Shared types and utilities
```

## 🛠️ Development

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Frontend (Next.js)

```bash
npx nx serve frontend
```

### 3. Run Backend (Go)

```bash
npx nx serve backend
```

> Make sure PostgreSQL is running and configured.

## 💅 Code Formatting

Uses Prettier and Tailwind class sorter.

```bash
# Format the entire repo
npm run format

# Or use Nx
npx nx format:write
```

> [!NOTE]
> This website is currently under active development. Some features may be incomplete or subject to change.
