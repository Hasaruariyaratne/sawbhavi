@echo off
title Sawbhavi Cloud POS (Online Mode)
color 0A
cls

echo ========================================================
echo.
echo    SAWBHAVI POS - ONLINE MODE
echo.
echo ========================================================
echo.

REM Kill old processes
taskkill /F /IM node.exe >nul 2>&1

echo Starting New POS Server...
echo The browser will open automatically in a few seconds...
echo.
echo DO NOT CLOSE THIS WINDOW.
echo.

REM Start Browser
start "" "http://localhost:5173"

REM Start Vite Server
call npm run dev
pause
