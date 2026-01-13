@echo off
title Sawbhavi Complete System
color 0A
cls

echo ========================================================
echo.
echo    SAWBHAVI SUPER CENTER
echo    Complete System Launcher
echo.
echo ========================================================
echo.
echo    Starting all services:
echo    - POS Application (Port 5173)
echo    - Customer Store (Port 3000)
echo    - Admin Dashboard (Port 3018)
echo.
echo    Please wait...
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Node.js is not installed!
    echo.
    echo Please install Node.js from: https://nodejs.org
    echo.
    pause
    exit
)

REM Install dependencies if needed
if not exist "node_modules" (
    echo Installing main app dependencies...
    call npm install
)

if not exist "online-store\node_modules" (
    echo Installing online store dependencies...
    cd online-store
    call npm install
    cd ..
)

if not exist "sawbhavi-unified\admin-dashboard\node_modules" (
    echo Installing admin dashboard dependencies...
    cd sawbhavi-unified\admin-dashboard
    call npm install
    cd ..\..
)

echo.
echo ========================================================
echo    All services starting...
echo    Press Ctrl+C to stop all services
echo ========================================================
echo.

REM Start all servers
npm run dev:all

pause
