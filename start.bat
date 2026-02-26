@echo off
echo ========================================
echo AI Exam Seating System - Startup Script
echo ========================================
echo.

echo [1/4] Starting MongoDB...
start "MongoDB" cmd /k "mongod --dbpath C:\data\db"
timeout /t 3 /nobreak >nul

echo [2/4] Starting Backend Server...
start "Backend" cmd /k "cd /d %~dp0backend && npm run dev"
timeout /t 3 /nobreak >nul

echo [3/4] Starting AI Engine...
start "AI Engine" cmd /k "cd /d %~dp0ai-engine && python api.py"
timeout /t 3 /nobreak >nul

echo [4/4] Starting Frontend...
start "Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo ========================================
echo All services are starting...
echo ========================================
echo.
echo MongoDB:  http://localhost:27017
echo Backend:  http://localhost:5000
echo AI Engine: http://localhost:8000
echo Frontend: http://localhost:3000
echo.
echo Wait 10 seconds then open: http://localhost:3000
echo.
echo Press any key to exit this window...
pause >nul
