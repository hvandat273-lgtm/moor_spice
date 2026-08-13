# MOOR SPICE Product Catalog

Website giới thiệu sản phẩm **パスタマジックパウダー (Pasta Magic Powder)** bằng tiếng Nhật. Nội dung hiện dùng thông tin từ tài liệu sản phẩm: nguyên liệu, hướng dẫn làm pasta 5 bước và cách bảo quản.

Đây là catalog thông tin: **không có giỏ hàng, thanh toán, checkout, đơn hàng, tra cứu đơn hoặc dữ liệu khách hàng**. Admin chỉ quản lý sản phẩm, danh mục, ảnh, nội dung trang chủ và thông tin liên hệ/Facebook/Instagram.

## Chạy trên máy local

Yêu cầu Node.js 20.11 trở lên.

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

Catalog local được lưu ở `.data/catalog.json`; bản dữ liệu đi kèm để khởi tạo/khôi phục nằm ở `data/showcase-catalog.json`. Cả hai đã có sản phẩm Pasta Magic Powder.

Mở:

- Storefront: `http://localhost:3000`
- Admin: `http://localhost:3000/admin`

Để dùng Admin, đặt các biến sau trong `.env.local`:

```dotenv
ADMIN_EMAIL=owner@example.com
ADMIN_PASSWORD_HASH=$2b$12$...
ADMIN_DISPLAY_NAME=Catalog Administrator
ADMIN_SESSION_VERSION=1
SESSION_SECRET=a-random-secret-at-least-32-bytes-long
RATE_LIMIT_SECRET=another-random-secret-at-least-32-bytes
```

Tạo bcrypt hash an toàn (mật khẩu không xuất hiện trên command line):

```powershell
npm run --silent admin:hash-password
```

## Render

Blueprint [render.yaml](./render.yaml) sử dụng **Render Starter + Persistent Disk** tại `/var/data` để lưu catalog JSON và ảnh tải lên. Khi Render khởi tạo disk trống, website tự copy `data/showcase-catalog.json` thành `/var/data/catalog.json` một lần, sau đó mọi cập nhật qua Admin sẽ được giữ lại.

Trên Render Free không có Persistent Disk: website vẫn có thể chạy bằng dữ liệu đóng gói, nhưng mọi thay đổi sản phẩm/ảnh từ Admin sẽ mất khi service khởi động lại hoặc deploy. Vì vậy dùng Starter nếu cần tự quản lý catalog sau khi deploy.

Thiết lập các biến Secret trên Render:

- `ADMIN_EMAIL`
- `ADMIN_PASSWORD_HASH`
- `SESSION_SECRET` (ít nhất 32 bytes)
- `RATE_LIMIT_SECRET` (ít nhất 32 bytes)
- `HEALTHCHECK_SECRET` (tùy chọn, dùng cho `/api/readiness`)
- `NEXT_PUBLIC_SITE_URL` (URL HTTPS chính thức)

Không cần PostgreSQL, SQLite, Docker, `DATABASE_URL`, hay biến thanh toán/đơn hàng.

## Deploy lên Vercel

Dự án dùng preset Next.js và Node.js 24.x. Khi import repository vào Vercel, giữ nguyên các thiết lập tự nhận diện:

- Framework Preset: `Next.js`
- Build Command: `npm run build`
- Install Command: `npm install`
- Output Directory: để trống để Vercel dùng output chuẩn của Next.js

Lần deploy đầu tiên không cần secret: nếu `CATALOG_BACKEND` chưa được đặt, website dùng `data/showcase-catalog.json` ở chế độ chỉ đọc. URL metadata tự lấy từ `VERCEL_PROJECT_PRODUCTION_URL`, nên không cần đặt `NEXT_PUBLIC_SITE_URL` trừ khi muốn ép một custom domain khác.

Để bật đăng nhập Admin, chỉnh catalog và tải ảnh trên Vercel, tạo hai Blob store riêng rồi thêm các biến sau cho cả Production và Preview:

```dotenv
CATALOG_BACKEND=vercel-blob
CATALOG_BLOB_READ_WRITE_TOKEN=<token của PRIVATE Blob store>
STORAGE_ADAPTER=vercel-blob
BLOB_READ_WRITE_TOKEN=<token của PUBLIC Blob store ảnh>
ADMIN_EMAIL=owner@example.com
ADMIN_PASSWORD_HASH=$2b$12$...
ADMIN_DISPLAY_NAME=Catalog Administrator
ADMIN_SESSION_VERSION=1
SESSION_SECRET=<chuỗi ngẫu nhiên tối thiểu 32 byte>
RATE_LIMIT_SECRET=<chuỗi ngẫu nhiên tối thiểu 32 byte>
DEPLOYMENT_MODE=catalog
SITE_INDEXING_ENABLED=false
```

Không đặt `CATALOG_BACKEND=local-json` hoặc `STORAGE_ADAPTER=local` trên Vercel vì filesystem của Function không phải nơi lưu dữ liệu bền vững. Chỉ đổi `SITE_INDEXING_ENABLED=true` sau khi domain HTTPS chính thức đã sẵn sàng.

Sau khi kết nối Blob, có thể nạp catalog mẫu một lần từ máy local bằng `npm run catalog:import -- data/showcase-catalog.json --confirm` với các token Vercel đã được kéo về `.env.local`.

## Dữ liệu và ảnh

- `CATALOG_BACKEND=local-json` dùng JSON file, phù hợp local và Render có disk.
- `STORAGE_ADAPTER=local` lưu ảnh ở `public/uploads` khi local hoặc Render có disk.
- Muốn dùng Vercel Blob thay cho file JSON: cấu hình `CATALOG_BACKEND=vercel-blob`, token private `CATALOG_BLOB_READ_WRITE_TOKEN`, và token public ảnh `BLOB_READ_WRITE_TOKEN` ở hai Blob store riêng.

Sao lưu/khôi phục catalog trước khi chỉnh sửa lớn:

```powershell
npm run catalog:export -- ../moon-spice-backups/catalog-backup.json
npm run catalog:import -- ../moon-spice-backups/catalog-backup.json --confirm
```

## Kiểm tra

```powershell
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```
