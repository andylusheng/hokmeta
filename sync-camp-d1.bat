@echo off
setlocal

cd /d "%~dp0"

echo [1/3] Syncing Camp data, skipping counters...
call npm.cmd run sync-camp -- --skip-counters
if errorlevel 1 goto fail

echo.
echo [2/3] Writing hero metrics snapshot to D1...
node scripts\snapshot-to-d1.js
if errorlevel 1 goto fail

echo.
echo [3/3] Generating public trend data from D1...
call npm.cmd run sync-trends
if errorlevel 1 goto fail

echo.
echo Done. Camp data synced, D1 snapshot written, and public trends generated.
pause
exit /b 0

:fail
echo.
echo Failed. Exit code: %ERRORLEVEL%
pause
exit /b %ERRORLEVEL%
