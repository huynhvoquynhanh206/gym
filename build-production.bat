@echo off
setlocal
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js 22.5 or newer is required.
  pause
  exit /b 1
)
if not exist node_modules call npm install
call npm run build
if errorlevel 1 exit /b 1
echo Starting the production website at http://localhost:8787
call npm start
pause
