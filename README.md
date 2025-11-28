# PSX Analytics Companion

A web application providing ready-to-use Python code snippets for Pakistan Stock Exchange (PSX) data analytics tasks in Google Colab.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

The application will be available at **http://localhost:5000**

### 3. Run Client Only (Frontend Development)

```bash
npm run dev:client
```

## 📋 Available Scripts

- `npm run dev` - Start full-stack development server
- `npm run dev:client` - Start frontend-only dev server
- `npm run build` - Build for production
- `npm start` - Run production build
- `npm run check` - Type-check TypeScript code
- `npm run db:push` - Push database schema (requires DATABASE_URL)

## 🔧 Environment Variables (Optional)

The app works without a database. Create a `.env` file only if you need database features:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/psx_analytics
PORT=5000
NODE_ENV=development
```

## 📚 Features

- 60+ Python code snippets for PSX data analysis
- Organized by categories (Data Collection, Analytics, ML, etc.)
- Search and filter functionality
- Copy-ready code for Google Colab
- Modern, responsive UI

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS
- **Backend**: Express.js, TypeScript
- **Database**: PostgreSQL (optional, uses in-memory storage by default)

## 📖 Documentation

See [PROJECT_EVALUATION.md](./PROJECT_EVALUATION.md) for detailed project evaluation and setup instructions.

## 🐛 Troubleshooting

**Windows users**: The scripts now use `cross-env` for compatibility. If you still encounter issues, manually set environment variables:

```powershell
$env:NODE_ENV="development"
npm run dev
```

**Port already in use**: Change the PORT in `.env` or kill the process using port 5000.

