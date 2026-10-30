# VOID ESSENTIALS - PowerShell Launcher
Write-Host "=======================================================" -ForegroundColor Cyan
Write-Host "  VOID ESSENTIALS — Starting Development Environment" -ForegroundColor White
Write-Host "=======================================================" -ForegroundColor Cyan

$rootDir = Split-Path -Parent $MyInvocation.MyCommand.Path

# Start Backend
Write-Host "[1/2] Launching Backend Flask API on port 5001..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$rootDir'; python backend/run.py"

# Start Frontend
Write-Host "[2/2] Launching Frontend Next.js on port 3000..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$rootDir\frontend'; npm run dev"

Write-Host "`nAll services triggered!" -ForegroundColor Yellow
Write-Host "  • Storefront : http://localhost:3000" -ForegroundColor Cyan
Write-Host "  • Backend API: http://localhost:5001" -ForegroundColor Cyan

