@echo off
cd /d "%~dp0"
echo 正在更新樂透冷熱號資料...
echo.
node fetch-latest.js
echo.
if %errorlevel% equ 0 (
    echo 更新完成！
) else (
    echo 更新失敗，請確認已安裝 Node.js (https://nodejs.org/)
)
echo.
pause
