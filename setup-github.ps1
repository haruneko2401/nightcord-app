# Script tự động setup Git và push lên GitHub
# Chạy script này sau khi đã cài Git và tạo repo trên GitHub

Write-Host "=== Nightcord App - GitHub Setup ===" -ForegroundColor Cyan
Write-Host ""

# Kiểm tra Git
Write-Host "Đang kiểm tra Git..." -ForegroundColor Yellow
try {
    $gitVersion = git --version
    Write-Host "✓ Git đã được cài đặt: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Git chưa được cài đặt!" -ForegroundColor Red
    Write-Host "Vui lòng cài Git từ: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Kiểm tra xem đã có .git chưa
if (Test-Path .git) {
    Write-Host "Repository đã được khởi tạo." -ForegroundColor Green
} else {
    Write-Host "Đang khởi tạo Git repository..." -ForegroundColor Yellow
    git init
    Write-Host "✓ Repository đã được khởi tạo" -ForegroundColor Green
}

Write-Host ""

# Kiểm tra branch
$currentBranch = git branch --show-current 2>$null
if (-not $currentBranch) {
    Write-Host "Đang tạo branch 'main'..." -ForegroundColor Yellow
    git branch -M main
    Write-Host "✓ Branch 'main' đã được tạo" -ForegroundColor Green
} else {
    if ($currentBranch -ne "main") {
        Write-Host "Đang đổi branch sang 'main'..." -ForegroundColor Yellow
        git branch -M main
        Write-Host "✓ Đã đổi sang branch 'main'" -ForegroundColor Green
    }
}

Write-Host ""

# Add files
Write-Host "Đang thêm files vào staging area..." -ForegroundColor Yellow
git add .
Write-Host "✓ Files đã được thêm" -ForegroundColor Green

Write-Host ""

# Kiểm tra xem có thay đổi để commit không
$status = git status --porcelain
if ($status) {
    Write-Host "Đang commit changes..." -ForegroundColor Yellow
    git commit -m "Initial commit: Nightcord App"
    Write-Host "✓ Commit thành công" -ForegroundColor Green
} else {
    Write-Host "Không có thay đổi để commit." -ForegroundColor Yellow
}

Write-Host ""

# Kiểm tra remote
$remoteUrl = git remote get-url origin 2>$null
if ($remoteUrl) {
    Write-Host "Remote 'origin' đã được cấu hình: $remoteUrl" -ForegroundColor Green
    Write-Host ""
    Write-Host "Đang push code lên GitHub..." -ForegroundColor Yellow
    git push -u origin main
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Push thành công!" -ForegroundColor Green
    } else {
        Write-Host "✗ Push thất bại. Kiểm tra lại URL hoặc credentials." -ForegroundColor Red
    }
} else {
    Write-Host "⚠ Remote 'origin' chưa được cấu hình." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Nhập URL GitHub repository của bạn:" -ForegroundColor Cyan
    Write-Host "(Ví dụ: https://github.com/username/nightcord-app.git)" -ForegroundColor Gray
    $repoUrl = Read-Host "GitHub URL"
    
    if ($repoUrl) {
        Write-Host ""
        Write-Host "Đang thêm remote..." -ForegroundColor Yellow
        git remote add origin $repoUrl
        Write-Host "✓ Remote đã được thêm" -ForegroundColor Green
        Write-Host ""
        Write-Host "Đang push code lên GitHub..." -ForegroundColor Yellow
        git push -u origin main
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✓ Push thành công!" -ForegroundColor Green
            Write-Host ""
            Write-Host "Repository của bạn: $repoUrl" -ForegroundColor Cyan
        } else {
            Write-Host "✗ Push thất bại." -ForegroundColor Red
            Write-Host "Kiểm tra lại:" -ForegroundColor Yellow
            Write-Host "1. URL repository đúng chưa?" -ForegroundColor White
            Write-Host "2. Đã tạo repository trên GitHub chưa?" -ForegroundColor White
            Write-Host "3. Đã đăng nhập GitHub trong Git chưa?" -ForegroundColor White
        }
    } else {
        Write-Host ""
        Write-Host "⚠ Không có URL. Bỏ qua bước push." -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Để push sau, chạy:" -ForegroundColor Cyan
        Write-Host "   git remote add origin <your-repo-url>" -ForegroundColor Gray
        Write-Host "   git push -u origin main" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "=== Hoàn tất ===" -ForegroundColor Cyan

