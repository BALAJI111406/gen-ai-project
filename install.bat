@echo off
echo ========================================
echo AI Exam Seating System - Installation
echo ========================================
echo.

echo [1/3] Installing Backend Dependencies...
cd /d %~dp0backend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Backend installation failed!
    pause
    exit /b 1
)
echo Backend dependencies installed successfully!
echo.

echo [2/3] Installing Frontend Dependencies...
cd /d %~dp0frontend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Frontend installation failed!
    pause
    exit /b 1
)
echo Frontend dependencies installed successfully!
echo.

echo [3/3] Installing AI Engine Dependencies...
cd /d %~dp0ai-engine
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo ERROR: AI Engine installation failed!
    pause
    exit /b 1
)
echo AI Engine dependencies installed successfully!
echo.

echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo Next Steps:
echo 1. Make sure MongoDB is installed and running
echo 2. Run start.bat to start all services
echo 3. Open http://localhost:3000 in your browser
echo.
echo For detailed instructions, see QUICKSTART.md
echo.
pause
