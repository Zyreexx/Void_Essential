# 🚀 VOID ESSENTIALS — Run & Launch Guide

> **Quick Execution Reference**  
> Use this document whenever you need to start, restart, or verify the entire **VOID ESSENTIALS** platform.

---

## ⚡ Quick Start (Copy & Paste)

You need **two terminal windows** (one for the Backend API, one for the Next.js Frontend).

### 🖥️ Terminal 1 — Backend (Flask API)
```powershell
# Navigate to project root (if not already there)
cd "c:\Users\pushp\OneDrive\Desktop\AntiGravity\Void"

# 1. Install dependencies (only needed on first run or after updates)
python -m pip install -r backend/requirements.txt

# 2. Run Flask API server (starts on http://localhost:5001)
python backend/run.py
```

---

### 🌐 Terminal 2 — Frontend (Next.js)
```powershell
# Navigate to frontend directory
cd "c:\Users\pushp\OneDrive\Desktop\AntiGravity\Void\frontend"

# 1. Install dependencies (only needed on first run or after updates)
npm install

# 2. Start Next.js development server (starts on http://localhost:3000)
npm run dev
```

---

## 🖱️ One-Click Launchers (Windows)

For maximum convenience, you can launch both services together using the included helper scripts:

### Option A: Double-Click Batch File
Double-click `run-dev.bat` in the project root directory. It opens two command windows side-by-side running the Backend and Frontend simultaneously.

### Option B: PowerShell One-Liner
From the root directory, run:
```powershell
.\run-dev.ps1
```

---

## 🔗 Key URLs & Access Points

| Service | URL | Notes |
| :--- | :--- | :--- |
| **Storefront (Frontend)** | [http://localhost:3000](http://localhost:3000) | Editorial Lookbook, Catalog, Cart, Checkout |
| **API Engine (Backend)** | [http://localhost:5001](http://localhost:5001) | Flask REST API root |
| **API Health Check** | [http://localhost:5001/api/v1/health](http://localhost:5001/api/v1/health) | Verifies DB and service status |
| **Catalog API** | [http://localhost:5001/api/v1/products](http://localhost:5001/api/v1/products) | JSON response of all live products |

---

## 🔐 Default Admin Credentials

On first run, the SQLite database (`backend/instance/void_store.db`) is automatically created and seeded:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Super Admin** | `admin@voidessentials.store` | `VoidSecure2026!` |

---

## 🔄 Optional: Redis & Celery Background Workers

The platform features **graceful fallback**: if Redis or Celery is not active, transactional tasks execute synchronously in-process without any errors.

If you wish to test asynchronous worker pipelines:

```powershell
# Terminal 3: Redis Server (Docker or Local)
docker run -d -p 6379:6379 redis:alpine

# Terminal 4: Celery Worker
celery -A backend.app.tasks.celery_tasks.celery_app worker --loglevel=info -P solo
```

---

## 🛠️ Troubleshooting & Quick Fixes

### 1. Port 5001 or 3000 already in use
Kill existing hanging processes on Windows:
```powershell
# Find and stop process on port 5001 (Backend)
Get-Process -Id (Get-NetTCPConnection -LocalPort 5001).OwningProcess -ErrorAction SilentlyContinue | Stop-Process -Force

# Find and stop process on port 3000 (Frontend)
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess -ErrorAction SilentlyContinue | Stop-Process -Force
```

### 2. Reset / Re-seed Database
To completely reset the database to a clean seed state:
```powershell
Remove-Item "backend/instance/void_store.db" -Force -ErrorAction SilentlyContinue
python backend/run.py
```

### 3. Frontend Cache Reset
If Next.js gives hydration or bundler errors:
```powershell
cd frontend
Remove-Item -Recurse -Force .next
npm run dev
```
