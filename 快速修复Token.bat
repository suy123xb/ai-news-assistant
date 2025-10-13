@echo off
chcp 65001 >nul
echo ========================================
echo    🔑 API Token 快速修复工具
echo ========================================
echo.

echo 📋 当前问题：401 Unauthorized（未授权）
echo.
echo 原因：Coze API Token 失效或无权限
echo.

echo ========================================
echo    请选择修复方案：
echo ========================================
echo.
echo [1] 临时修复（直接修改代码中的 Token）
echo [2] 永久修复（使用环境变量，推荐）
echo [3] 切换到 Vercel 部署（最安全，推荐）
echo [4] 查看详细指南
echo [5] 退出
echo.

set /p choice="请输入选项 (1-5): "

if "%choice%"=="1" goto method1
if "%choice%"=="2" goto method2
if "%choice%"=="3" goto method3
if "%choice%"=="4" goto method4
if "%choice%"=="5" goto exit

echo.
echo ❌ 无效选项！
pause
exit /b 1

:method1
echo.
echo ========================================
echo    方案 1：临时快速修复
echo ========================================
echo.
echo 📝 步骤：
echo.
echo 1. 访问 Coze 平台获取新 Token：
echo    https://www.coze.cn/open/oauth/pats
echo.
echo 2. 创建 Personal Access Token
echo.
echo 3. 复制生成的 Token（格式：pat_xxxxxx...）
echo.
echo 4. 打开文件：src\services\api.js
echo.
echo 5. 找到第 4-7 行，替换 Token：
echo    const API_TOKEN = process.env.REACT_APP_COZE_API_TOKEN ^|^| 
echo                      'YOUR_NEW_TOKEN_HERE';
echo.
echo 6. 保存文件
echo.
echo 7. 重新部署：
echo    npm run deploy
echo.
echo ⚠️ 警告：此方法会将 Token 暴露在代码中，仅用于测试！
echo.
pause
goto end

:method2
echo.
echo ========================================
echo    方案 2：使用环境变量（推荐）
echo ========================================
echo.

echo 📝 正在创建 .env.local 模板...
if exist ".env.local" (
    echo.
    echo ⚠️ .env.local 已存在，是否覆盖？
    set /p overwrite="输入 Y 覆盖，其他键跳过: "
    if /i not "%overwrite%"=="Y" goto skip_env_creation
)

echo REACT_APP_COZE_API_TOKEN=your_coze_token_here > .env.local
echo.
echo ✅ 已创建 .env.local 文件

:skip_env_creation
echo.
echo 📝 接下来的步骤：
echo.
echo 1. 访问 Coze 平台获取新 Token：
echo    https://www.coze.cn/open/oauth/pats
echo.
echo 2. 用文本编辑器打开项目根目录的 .env.local 文件
echo.
echo 3. 替换 your_coze_token_here 为您的真实 Token：
echo    REACT_APP_COZE_API_TOKEN=pat_xxxxxxxxxxxxxx
echo.
echo 4. 保存文件
echo.
echo 5. 重启开发服务器或重新部署：
echo    npm start  （本地测试）
echo    npm run deploy  （部署）
echo.
echo 💡 优点：
echo    - Token 不会被提交到 Git
echo    - 更安全
echo    - 易于管理
echo.
echo ⚠️ 注意：
echo    GitHub Pages 不支持运行时环境变量！
echo    部署时需要使用：
echo    set REACT_APP_COZE_API_TOKEN=your_token ^&^& npm run deploy
echo.
pause
goto end

:method3
echo.
echo ========================================
echo    方案 3：切换到 Vercel（推荐）
echo ========================================
echo.
echo 🎯 为什么选择 Vercel？
echo    ✅ 免费
echo    ✅ 支持环境变量
echo    ✅ 自动部署
echo    ✅ HTTPS
echo    ✅ CDN 加速
echo.
echo 📝 部署步骤：
echo.
echo 1. 访问 https://vercel.com 注册/登录
echo.
echo 2. 点击 "New Project"
echo.
echo 3. 导入您的 GitHub 仓库：
echo    https://github.com/suy123xb/ai-news-assistant
echo.
echo 4. 配置项目：
echo    Framework Preset: Create React App
echo    Build Command: npm run build
echo    Output Directory: build
echo.
echo 5. 添加环境变量：
echo    Key: REACT_APP_COZE_API_TOKEN
echo    Value: 您的 Coze Token
echo.
echo 6. 点击 "Deploy"
echo.
echo 7. 等待部署完成（1-2 分钟）
echo.
echo 8. 获得新的网址：https://your-project.vercel.app
echo.
echo 💡 后续更新：
echo    - 只需推送代码到 GitHub
echo    - Vercel 自动部署
echo    - 无需手动构建
echo.
pause
goto end

:method4
echo.
echo ========================================
echo    详细指南
echo ========================================
echo.
echo 正在打开 API_TOKEN_更新指南.md...
echo.
if exist "API_TOKEN_更新指南.md" (
    start notepad "API_TOKEN_更新指南.md"
) else (
    echo ❌ 找不到指南文件！
    echo 请查看项目根目录的 API_TOKEN_更新指南.md
)
echo.
pause
goto end

:end
echo.
echo ========================================
echo    🔗 有用的链接
echo ========================================
echo.
echo Coze API Token 管理：
echo https://www.coze.cn/open/oauth/pats
echo.
echo Vercel 部署：
echo https://vercel.com
echo.
echo Netlify 部署：
echo https://netlify.com
echo.
echo ========================================
echo.

:exit
echo 感谢使用！如有问题请查看 API_TOKEN_更新指南.md
echo.
pause

