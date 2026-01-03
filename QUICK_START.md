# 🚀 Hướng dẫn nhanh: Push code lên GitHub

## Bước 1: Cài Git (Nếu chưa có)

1. Tải Git: **https://git-scm.com/download/win**
2. Chạy file cài đặt → Next → Next → ... → Install
3. **Mở lại PowerShell/Terminal** sau khi cài xong

## Bước 2: Tạo Repository trên GitHub

1. Truy cập: **https://github.com/new**
2. Đặt tên: `nightcord-app` (hoặc tên bạn muốn)
3. Chọn **Public**
4. **KHÔNG** tích "Add a README"
5. Click **"Create repository"**

## Bước 3: Copy Repository URL

Sau khi tạo xong, bạn sẽ thấy URL dạng:
```
https://github.com/your-username/nightcord-app.git
```
**Copy URL này lại!**

## Bước 4: Chạy script tự động

Mở PowerShell trong folder `nightcord-app` và chạy:

```powershell
.\setup-github.ps1
```

Script sẽ tự động:
- ✓ Khởi tạo Git repository
- ✓ Add tất cả files
- ✓ Commit code
- ✓ Hỏi bạn nhập GitHub URL và push lên

## Hoặc: Chạy thủ công

Nếu script không chạy được, chạy từng lệnh:

```powershell
git init
git add .
git commit -m "Initial commit: Nightcord App"
git branch -M main
git remote add origin https://github.com/your-username/nightcord-app.git
git push -u origin main
```

**Thay `your-username/nightcord-app` bằng URL repo của bạn!**

---

## Sau khi push xong

1. Vào repo trên GitHub để xem code
2. Deploy lên Vercel:
   - Truy cập: https://vercel.com
   - Import repository
   - Click Deploy
   - Chia sẻ link cho mọi người!

