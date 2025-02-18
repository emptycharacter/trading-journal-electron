#!/bin/bash

echo "🚀 Setting up Trading Journal Electron project..."

# Create directory structure
mkdir -p src/{main,renderer,styles,utils,types}
mkdir -p src/renderer/{components,pages}
mkdir -p dist migrations

# Create necessary files
touch .gitignore .env.local electron-builder.yml tsconfig.json 
tailwind.config.js webpack.config.js
touch src/main/{main.ts,preload.js,db.ts,ipcHandlers.ts}
touch src/renderer/{App.tsx,index.tsx,routes.tsx}
touch src/renderer/pages/{Home.tsx,Dashboard.tsx,Login.tsx,Journal.tsx}
touch src/renderer/components/{Navbar.tsx,TradeForm.tsx,TradeList.tsx}
touch src/utils/helpers.ts src/types/trade.ts
touch src/styles/index.css

# Populate .gitignore
cat <<EOL > .gitignore
# Node modules
node_modules/

# Logs
logs
*.log

# Environment variables
.env
.env.local

# Electron & Webpack output
dist/
out/
web-build/
.webpack/
.vite/

# SQLite DB files
*.sqlite
*.sqlite3
*.db
*.db-shm
*.db-wal

# OS-specific
.DS_Store
Thumbs.db
EOL

# Populate main.ts
cat <<EOL > src/main/main.ts
import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";

let mainWindow: BrowserWindow | null;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL("http://localhost:3000");
  } else {
    mainWindow.loadFile(path.join(__dirname, "../../dist/index.html"));
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Example IPC
ipcMain.handle("get-user-data", async () => {
  return { username: "Trader123", settings: {} };
});
EOL

# Populate preload.js
cat <<EOL > src/main/preload.js
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  send: (channel, data) => ipcRenderer.send(channel, data),
  receive: (channel, callback) => ipcRenderer.on(channel, (_, data) => 
callback(data)),
});
EOL

# Populate index.tsx
cat <<EOL > src/renderer/index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./../styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
EOL

# Populate App.tsx
cat <<EOL > src/renderer/App.tsx
import React from "react";

export default function App() {
  return (
    <main className="flex flex-col items-center justify-center h-screen 
bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to TradeX</h1>
      <p className="text-lg text-gray-600 mb-6">
        Your personal trading journal & analytics dashboard.
      </p>

      <div className="flex gap-4">
        <a href="/login" className="px-6 py-2 bg-blue-600 text-white 
rounded-lg hover:bg-blue-700">
          Login
        </a>
        <a href="/dashboard" className="px-6 py-2 border border-blue-600 
text-blue-600 rounded-lg hover:bg-blue-100">
          Dashboard
        </a>
      </div>
    </main>
  );
}
EOL

# Populate routes.tsx
cat <<EOL > src/renderer/routes.tsx
import { BrowserRouter as Router, Routes, Route } from 
"react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Journal from "./pages/Journal";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/journal" element={<Journal />} />
      </Routes>
    </Router>
  );
}
EOL

# Set permissions and make script executable
chmod +x setup-project.sh

echo "✅ Project structure created successfully!"
k
