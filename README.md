# PSX Analytics Companion

A modern web application providing ready-to-use Python code snippets for Pakistan Stock Exchange (PSX) data analytics tasks in Google Colab.

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

### 3. Build for Production

```bash
npm run build
```

The production build will be in the `dist/` folder.

### 4. Preview Production Build

```bash
npm run preview
```

## 📋 Available Scripts

- `npm run dev` - Start development server (port 5000)
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run check` - Type-check TypeScript code

## 🚀 Deploy to Vercel

This project is configured for easy deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically:
   - Install dependencies (`npm install`)
   - Build the project (`npm run build`)
   - Deploy from the `dist/` folder

No additional configuration needed! The `vercel.json` is already set up.

## 📚 Features

- **60+ Python code snippets** for PSX data analysis
- Organized by categories:
  - Data Collection & Cleaning
  - Descriptive Analytics
  - Visualization Tasks
  - Statistical Analytics
  - Technical Indicators
  - Machine Learning & Predictive Analytics
  - Portfolio Analytics & Finance
  - Reporting
- Search and filter functionality
- Copy-ready code for Google Colab
- Modern, responsive UI with dark mode support
- Code syntax highlighting

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI
- **Routing**: Wouter
- **State Management**: TanStack Query
- **Icons**: Lucide React

## 📁 Project Structure

```
├── client/
│   ├── public/          # Static assets
│   │   └── attached_assets/  # Images and resources
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   └── lib/         # Utilities and data
│   └── index.html       # HTML template
├── dist/                # Production build output
├── package.json
├── vite.config.ts       # Vite configuration
└── vercel.json          # Vercel deployment config
```

## 🎨 Features in Detail

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Fast Performance**: Optimized build with code splitting
- **SEO Ready**: Meta tags and Open Graph support
- **Accessible**: Built with accessibility in mind using Radix UI

## 📝 License

MIT
