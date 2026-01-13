@echo off
TITLE Sawbhavi POS - Database Initializer
COLOR 0A
SETLOCAL ENABLEDELAYEDEXPANSION

echo ===================================================
echo   SAWBHAVI POS - REMOTE DATABASE SETUP TOOL
echo ===================================================
echo.
echo This tool will initialize your new Supabase project
echo with all the required tables and users.
echo.
echo [INSTRUCTIONS]
echo 1. Go to Supabase Dashboard (https://supabase.com/dashboard)
echo 2. Open Project Settings -^> Database
echo 3. Look for "Connection String" -^> "URI"
echo 4. Copy it. It looks like: postgres://postgres.xxxx:[YOUR-PASSWORD]@aws-0-....
echo.
echo [IMPORTANT]
echo You MUST replace [YOUR-PASSWORD] in the string with your real DB password!
echo.
set /p DB_URI="Paste the Connection URI here: "

echo.
echo Initializing Database...
echo.

:: Get the directory where this BAT file is located
set "SCRIPT_DIR=%~dp0"
cd /d "%SCRIPT_DIR%"

:: Check if node_modules exists, if not install dependencies
if not exist "node_modules" (
    echo Installing required dependencies...
    call npm install pg @types/pg --no-audit --no-fund --loglevel=error
)

:: Run the script using relative path from current directory
node "scripts\db_setup.js" "!DB_URI!"

echo.
if %ERRORLEVEL% EQU 0 (
    echo SUCCESS! Your database is ready.
) else (
    echo FAILED. Please check the error above.
    echo Ensure your Password is correct in the URI.
)
pause
