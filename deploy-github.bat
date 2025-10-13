@echo off
chcp 65001 >nul
echo ========================================
echo    🚀 AI新闻助手 - GitHub Pages 部署
echo ========================================
echo.

:: 检查 node_modules
if not exist "node_modules\" (
    echo ⚠️  未检测到 node_modules，正在安装依赖...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo ❌ 依赖安装失败！
        pause
        exit /b 1
    )
    echo ✅ 依赖安装成功！
    echo.
)

:: 检查 gh-pages 是否安装
npm list gh-pages >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ⚠️  gh-pages 未安装，正在安装...
    call npm install --save-dev gh-pages
    if %ERRORLEVEL% NEQ 0 (
        echo ❌ gh-pages 安装失败！
        pause
        exit /b 1
    )
    echo ✅ gh-pages 安装成功！
    echo.
)

echo 📦 步骤 1/3: 构建生产版本...
echo.
call npm run build

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ 构建失败！请检查错误信息。
    echo.
    pause
    exit /b 1
)

echo.
echo ✅ 构建成功！
echo.

echo 🚀 步骤 2/3: 部署到 gh-pages 分支...
echo.
call npm run deploy

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ 部署失败！请检查以下内容：
    echo    1. 是否已配置 Git 远程仓库
    echo    2. 是否有推送权限
    echo    3. 网络连接是否正常
    echo.
    pause
    exit /b 1
)

echo.
echo ✅ 部署成功！
echo.

echo 📋 步骤 3/3: 配置 GitHub Pages
echo.
echo ⚠️  重要提醒：请手动完成以下步骤
echo.
echo 1. 访问 GitHub 仓库: https://github.com/suy123xb/ai-news-assistant
echo 2. 点击 "Settings" ^(设置^)
echo 3. 左侧菜单找到 "Pages"
echo 4. 在 "Source" 部分：
echo    - Branch: 选择 "gh-pages"
echo    - Folder: 选择 "/ (root)"
echo 5. 点击 "Save" ^(保存^)
echo 6. 等待 1-3 分钟后访问: https://suy123xb.github.io/ai-news-assistant/
echo.

echo ========================================
echo    🎉 部署命令执行完成！
echo ========================================
echo.
echo 💡 提示：
echo    - 首次部署需要在 GitHub 配置 Pages 设置
echo    - 后续更新只需运行此脚本即可
echo    - 部署后等待 1-3 分钟才能看到更新
echo.
echo 🌐 您的网站地址：
echo    https://suy123xb.github.io/ai-news-assistant/
echo.
pause

