@echo off
echo ========================================
echo AI新闻助手 - 部署脚本
echo ========================================

echo.
echo 正在构建生产版本...
call npm run build

if %ERRORLEVEL% NEQ 0 (
    echo 构建失败！请检查错误信息。
    pause
    exit /b 1
)

echo.
echo 构建成功！正在提交更改...
git add .
git commit -m "Update: 自动部署更新"

echo.
echo 正在推送到GitHub...
git push

echo.
echo ========================================
echo 部署完成！
echo ========================================
echo.
echo 如果使用Vercel或Netlify，应用将自动重新部署。
echo 如果使用GitHub Pages，请等待几分钟后访问您的网站。
echo.
pause
