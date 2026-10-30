@echo off
TITLE VOID ESSENTIALS - Development Launcher
echo =======================================================
echo   VOID ESSENTIALS — Starting Development Environment
echo =======================================================
echo.

cd /d "%~dp0"

echo [1/2] Launching Backend Flask API on port 5001...
start "VOID Backend (Flask)" cmd /k "cd /d "%~dp0" && python backend/run.py"

echo [2/2] Launching Frontend Next.js on port 3000...
start "VOID Frontend (Next.js)" cmd /k "cd /d "%~dp0frontend" && npm run dev"

echo.
echo All services launched!
echo - Storefront: http://localhost:3000
echo - Backend API: http://localhost:5001
echo.
pause

