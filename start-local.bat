@echo off
setlocal
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js 22.5 or newer is required.
  pause
  exit /b 1
)
if not exist node_modules (
  echo Installing dependencies...
  call npm install
  if errorlevel 1 exit /b 1
)
echo Starting frontend and API server...
call npm run dev
pause
