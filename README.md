<<<<<<< HEAD
# Khơ Mon Gym — Full-stack website

Dự án React/Vite ban đầu đã được nâng cấp thành website full-stack có tài khoản, backend API và cơ sở dữ liệu SQLite.

## Chức năng hiện có

- Đăng ký, đăng nhập và đăng xuất bằng email/mật khẩu.
- Mật khẩu được băm bằng `scrypt`; phiên đăng nhập dùng token ngẫu nhiên có hạn 30 ngày.
- Hồ sơ onboarding được lưu trong SQLite và tự tải lại sau khi đăng nhập.
- Check-in theo ngày, lịch check-in trong tuần và tính streak từ dữ liệu thật.
- Thực đơn lấy từ cơ sở dữ liệu.
- Đặt món theo món có sẵn hoặc lượng calories tùy chọn.
- Lịch sử đơn hàng riêng cho từng tài khoản.
- Bài đăng cộng đồng, tạo bài và like được lưu trong cơ sở dữ liệu.
- Giao diện responsive cho máy tính và điện thoại.
- Server production phục vụ cả API lẫn thư mục React đã build.
- Có Dockerfile và Docker Compose với volume lưu dữ liệu.

## Yêu cầu

- Node.js **22.5 trở lên** vì backend dùng mô-đun SQLite tích hợp của Node.js.
- npm 10 trở lên được khuyến nghị.

## Chạy trong chế độ phát triển

```bash
npm ci
npm run dev
```

Sau đó mở:

- Website: `http://localhost:5173`
- API: `http://localhost:8787/api/health`

Lệnh `npm run dev` chạy đồng thời Vite và backend. Vite tự chuyển tiếp mọi request `/api` sang backend.

Trên Windows có thể chạy trực tiếp `start-local.bat`.

## Chạy production

```bash
npm ci
npm run build
npm start
```

Mở `http://localhost:8787`. Trong production, Node.js phục vụ cả website trong `dist/` và các endpoint `/api`.

## Kiểm thử

```bash
npm test
```

Bộ test kiểm tra luồng hoàn chỉnh:

1. Tạo tài khoản.
2. Lưu hồ sơ.
3. Check-in.
4. Lấy thực đơn và tạo đơn hàng.
5. Đăng bài cộng đồng và like.
6. Đọc lại tài khoản và hồ sơ.

## Cơ sở dữ liệu

Mặc định database nằm tại:

```text
server/data/kho-mon-gym.sqlite
```

Các bảng chính:

- `users`: tài khoản.
- `sessions`: phiên đăng nhập.
- `profiles`: thông tin onboarding.
- `checkins`: lịch check-in.
- `menu_items`: thực đơn.
- `orders`: đơn đặt bếp.
- `posts`: bài cộng đồng.
- `post_likes`: lượt thích.

Thực đơn và hai bài đăng mẫu được tự động seed khi database được tạo lần đầu.

## Biến môi trường

Sao chép `.env.example` hoặc thiết lập trực tiếp trên máy chủ:

```env
PORT=8787
DB_FILE=./server/data/kho-mon-gym.sqlite
APP_TIME_ZONE=Asia/Ho_Chi_Minh
DEV_ORIGIN=http://localhost:5173
```

`DB_FILE` nên trỏ tới ổ đĩa bền vững khi triển khai lên cloud.

## API chính

### Tài khoản

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/logout`

### Hồ sơ

- `GET /api/profile`
- `PUT /api/profile`
- `DELETE /api/profile`

### Check-in

- `GET /api/checkins`
- `POST /api/checkins`

### Thực đơn và đơn hàng

- `GET /api/menu`
- `GET /api/orders`
- `POST /api/orders`

### Cộng đồng

- `GET /api/posts`
- `POST /api/posts`
- `POST /api/posts/:id/like`
- `DELETE /api/posts/:id/like`

Các endpoint riêng tư yêu cầu header:

```text
Authorization: Bearer <token>
```

## Chạy bằng Docker

```bash
docker compose up --build
```

Website chạy tại `http://localhost:8787`. Database được lưu trong Docker volume `kho_mon_data`, nên không mất khi container được tạo lại.

Khi đưa lên máy chủ Docker, cần gắn volume vào `/data`. Không nên triển khai bản full-stack này như một website tĩnh trên Netlify vì backend và SQLite sẽ không hoạt động.

## Cấu trúc dự án

```text
src/app/App.tsx          Giao diện và logic React
src/lib/api.ts           Client gọi backend API
server/index.mjs         HTTP server, authentication và SQLite
server/tests/            Integration test API
server/data/             Database local
scripts/dev.mjs          Chạy frontend + backend khi phát triển
Dockerfile               Image production
docker-compose.yml        Volume database và cổng chạy
```

## Phạm vi hiện tại

Đây là phiên bản MVP có thể sử dụng cho tài khoản, hồ sơ, check-in, cộng đồng và gửi đơn đến bếp. Hệ thống chưa có thanh toán trực tuyến, xác minh email, quên mật khẩu, upload ảnh nội bộ, thông báo thời gian thực hoặc bảng quản trị để nhân viên bếp đổi trạng thái đơn.
=======
# CORE Fitness & Yoga × BTS — DTB7_Group 3

Ứng dụng fitness React/Vite được cập nhật theo bộ nhận diện collab.

## Thay đổi chính

- Theme toàn bộ giao diện: đen, trắng và xanh dương.
- Màn hình mở đầu hiển thị `CORE Fitness & Yoga × BTS` cùng `DTB7_Group 3` theo phong cách brand collaboration.
- Logo CORE được dùng trong các khu vực nhận diện thương hiệu.
- Trong tab **Workout**, bấm vào từng bài tập sẽ mở giao diện video dọc toàn màn hình kiểu Reels.
- Giao diện video không có lượt tim, lượt xem hoặc bình luận; chỉ giữ video minh họa và thông tin kỹ thuật cần thiết.
- Video minh họa được lưu cục bộ trong `public/videos`, không phụ thuộc nguồn video bên ngoài.

## Chạy dự án

```bash
npm install
npm run dev
```

## Build production

```bash
npm run build
```

Thư mục kết quả: `dist/`.
>>>>>>> 99fc191 (Initial commit)
