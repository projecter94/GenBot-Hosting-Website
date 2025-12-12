@echo off
echo.
echo ╔════════════════════════════════════════╗
echo ║   Text to Raw File Server Starting     ║
echo ╚════════════════════════════════════════╝
echo.

if not exist node_modules (
    echo Installing dependencies...
    call npm install
    echo.
)

echo Starting server on http://localhost:3000
echo Press Ctrl+C to stop the server
echo.

node server.js

pause
