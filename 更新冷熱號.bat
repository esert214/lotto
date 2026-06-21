@echo off
cd /d "%~dp0"
echo ================================
echo   更新冷熱號資料 + 推送到 GitHub
echo ================================
echo.

node fetch-latest.js
if %errorlevel% neq 0 (
    echo.
    echo 更新失敗，請確認已安裝 Node.js (https://nodejs.org/)
    pause
    exit /b 1
)

echo.
echo 正在推送至 GitHub...
git add data.json
git commit -m "update hot/cold data"
git push

if %errorlevel% equ 0 (
    echo.
    echo 完成！GitHub Pages 約 1 分鐘後更新。
) else (
    echo.
    echo 推送失敗，請手動執行：
    echo   git add data.json
    echo   git commit -m "update hot/cold data"
    echo   git push
)

echo.
pause
