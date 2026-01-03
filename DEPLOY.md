# Hướng dẫn Deploy Nightcord App

## Cách 1: Deploy lên Vercel (Khuyến nghị - Miễn phí)

### Bước 1: Push code lên GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Bước 2: Deploy lên Vercel
1. Truy cập [vercel.com](https://vercel.com)
2. Đăng nhập bằng GitHub
3. Click "New Project"
4. Import repository của bạn
5. Vercel sẽ tự động detect cấu hình:
   - **Framework Preset**: Other
   - **Build Command**: `npm run build:web`
   - **Output Directory**: `web-build`
6. Click "Deploy"
7. Sau khi deploy xong, bạn sẽ có URL công khai để chia sẻ!

### Bước 3: Chia sẻ link
Sau khi deploy, Vercel sẽ cung cấp URL dạng: `https://nightcord-app.vercel.app`
Bạn có thể chia sẻ link này cho mọi người để test.

---

## Cách 2: Deploy lên Netlify

1. Push code lên GitHub (giống bước 1 ở trên)
2. Truy cập [netlify.com](https://netlify.com)
3. Đăng nhập và chọn "New site from Git"
4. Chọn repository
5. Cấu hình:
   - **Build command**: `npm run build:web`
   - **Publish directory**: `web-build`
6. Click "Deploy site"

---

## Cách 3: Sử dụng ngrok (Test nhanh - Không cần deploy)

Nếu bạn muốn test nhanh mà không cần deploy:

1. Cài đặt ngrok:
   ```bash
   npm install -g ngrok
   ```

2. Chạy app ở local:
   ```bash
   npm run web
   ```

3. Trong terminal khác, chạy ngrok:
   ```bash
   ngrok http 19006
   ```
   (Port có thể khác, kiểm tra trong terminal khi chạy `npm run web`)

4. Ngrok sẽ cung cấp URL công khai dạng: `https://xxxx.ngrok.io`
5. Chia sẻ link này cho người khác (link sẽ thay đổi mỗi lần chạy lại)

---

## Cách 4: Sử dụng Expo Tunnel (Cho mobile app)

Nếu muốn test trên điện thoại từ xa:

1. Chạy Expo với tunnel:
   ```bash
   npx expo start --tunnel
   ```

2. Quét QR code bằng Expo Go app
3. Link tunnel sẽ có thể truy cập từ bất kỳ đâu (cần Expo account)

---

## Lưu ý

- **Vercel/Netlify**: Tốt nhất cho web version, miễn phí, tự động deploy khi push code
- **ngrok**: Tốt cho test nhanh, nhưng link thay đổi mỗi lần
- **Expo Tunnel**: Tốt cho test mobile app từ xa

Khuyến nghị: Dùng **Vercel** vì dễ setup, miễn phí, và có URL cố định.

