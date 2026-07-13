# Deploy CORE Fitness lên Render với Supabase PostgreSQL

Kiến trúc production:

```text
Browser -> Render Web Service (React + Node API) -> Supabase PostgreSQL
```

Frontend gọi API bằng đường dẫn tương đối `/api`, vì vậy chỉ cần một Render Web
Service. Không cần tạo Static Site riêng và không cần cấu hình CORS cho production.

## 1. Chuẩn bị repository

Đảm bảo các thay đổi cần deploy đã được commit và push lên GitHub hoặc GitLab.

Kiểm tra trước khi push:

```bash
npm install
npm test
npm run build
```

Không commit file `.env`, database password hoặc `DATABASE_URL`.

## 2. Tạo Supabase project

1. Đăng nhập tại https://supabase.com/dashboard.
2. Chọn **New project**.
3. Chọn organization, đặt tên project và tạo một database password mạnh.
4. Chọn region gần người dùng và Render nhất; với ứng dụng tại Việt Nam thường
   nên ưu tiên Singapore nếu region này có sẵn.
5. Chờ project khởi tạo hoàn tất.

### Cách khuyến nghị: chạy migration bằng Supabase CLI

Migration đã có tại:

```text
supabase/migrations/20260713000000_initial_schema.sql
```

Chạy:

```bash
npx supabase login
npx supabase link --project-ref YOUR_PROJECT_REF
npx supabase db push
```

`YOUR_PROJECT_REF` nằm trong URL dashboard hoặc phần Project Settings.

### Cách đơn giản: dùng SQL Editor

Nếu chưa muốn dùng CLI:

1. Mở **SQL Editor** trong Supabase Dashboard.
2. Tạo query mới.
3. Sao chép toàn bộ nội dung file migration ở trên.
4. Nhấn **Run**.
5. Mở **Table Editor** và xác nhận đã có các bảng `users`, `sessions`,
   `profiles`, `checkins`, `menu_items`, `orders`, `posts`, `post_likes`.

Migration bật RLS nhưng không tạo public policy. Trình duyệt không thể đọc các
bảng trực tiếp bằng Supabase anon key; chỉ Node backend kết nối database được.

## 3. Lấy connection string đúng

1. Trong Supabase Dashboard, nhấn **Connect** ở phía trên project.
2. Chọn **Session pooler**.
3. Sao chép URI dùng port `5432`, có dạng:

```text
postgresql://postgres.PROJECT_REF:PASSWORD@aws-REGION.pooler.supabase.com:5432/postgres
```

Session pooler phù hợp với Render Web Service chạy liên tục và hoạt động qua
IPv4. Không dùng Transaction pooler port `6543` cho cấu hình hiện tại.

Nếu tự thay password vào URI và password chứa ký tự như `@`, `:`, `/`, `#` hoặc
`%`, phải URL-encode password. Có thể chạy trong browser console:

```js
encodeURIComponent("YOUR_DATABASE_PASSWORD")
```

Không dùng `SUPABASE_ANON_KEY` hoặc service-role key làm `DATABASE_URL`.

## 4. Deploy bằng Render Blueprint

Repository đã có `render.yaml`.

1. Đăng nhập https://dashboard.render.com.
2. Chọn **New +** -> **Blueprint**.
3. Kết nối GitHub/GitLab và chọn repository này.
4. Render đọc `render.yaml` và tạo service `core-fitness-bts`.
5. Khi Render hỏi giá trị `DATABASE_URL`, dán Session pooler URI ở bước 3.
6. Chọn **Apply** và chờ build/deploy hoàn tất.

Blueprint tự cấu hình:

- Region Render: Singapore
- Build command: `npm ci --include=dev && npm run build`
- Start command: `npm start`
- Health check: `/api/health`
- `NODE_ENV=production`
- `APP_TIME_ZONE=Asia/Ho_Chi_Minh`
- SSL database bật
- Pool tối đa 5 connection

## 5. Nếu tạo Render Web Service thủ công

Thay vì Blueprint, chọn **New +** -> **Web Service** và nhập:

| Thiết lập | Giá trị |
| --- | --- |
| Runtime | Node |
| Build Command | `npm ci --include=dev && npm run build` |
| Start Command | `npm start` |
| Health Check Path | `/api/health` |

Thêm environment variables:

| Key | Value |
| --- | --- |
| `DATABASE_URL` | Session pooler URI của Supabase |
| `DATABASE_SSL` | `true` |
| `DATABASE_POOL_SIZE` | `5` |
| `APP_TIME_ZONE` | `Asia/Ho_Chi_Minh` |
| `NODE_ENV` | `production` |

Không cần tự đặt `PORT`; Render tự cung cấp biến này và server đã sử dụng nó.

## 6. Xác minh sau deploy

Mở:

```text
https://YOUR-SERVICE.onrender.com/api/health
```

Kết quả đúng:

```json
{
  "ok": true,
  "database": "postgres",
  "time": "..."
}
```

Sau đó:

1. Mở URL gốc của service.
2. Tạo một tài khoản mới.
3. Hoàn thành onboarding.
4. Refresh trang và đăng nhập lại.
5. Trong Supabase Table Editor, kiểm tra dữ liệu xuất hiện ở `users`,
   `sessions` và `profiles`.

## 7. Test local với Supabase (tùy chọn)

Sao chép `.env.example` thành `.env` và điền Session pooler URI thật:

```env
DATABASE_URL=postgresql://postgres.PROJECT_REF:ENCODED_PASSWORD@aws-REGION.pooler.supabase.com:5432/postgres
DATABASE_SSL=true
DATABASE_POOL_SIZE=5
APP_TIME_ZONE=Asia/Ho_Chi_Minh
```

Sau đó chạy:

```bash
npm run dev
```

Khi `.env` không có `DATABASE_URL`, backend tự động quay về SQLite local. File
`.env` đã được gitignore.

## 8. Xử lý lỗi thường gặp

### `password authentication failed`

- Kiểm tra database password, không phải mật khẩu tài khoản Supabase.
- URL-encode password nếu có ký tự đặc biệt.
- Sao chép lại URI từ nút **Connect**.

### `ENETUNREACH`, timeout hoặc không kết nối được host `db....supabase.co`

Bạn có thể đang dùng Direct connection IPv6. Đổi sang **Session pooler** host
`pooler.supabase.com`, port `5432`.

### Health check trả `500`

Mở Render **Logs** và kiểm tra `DATABASE_URL`. Health endpoint thực hiện query
thật tới database, nên lỗi này thường là sai connection string hoặc Supabase
project đang không sẵn sàng.

### Render build thành công nhưng trang không mở

- Kiểm tra Start Command là `npm start`.
- Không hardcode port; server phải dùng biến `PORT` do Render cung cấp.
- Kiểm tra log có dòng server đang listen hay không.

### Schema chưa có bảng

Chạy lại:

```bash
npx supabase db push
```

SQL migration dùng `if not exists`, nên có thể chạy lại an toàn cho lần setup
ban đầu.

## 9. Quy tắc bảo mật

- Không đưa `DATABASE_URL` vào source code, commit, screenshot hoặc frontend.
- Nếu secret từng bị commit, reset database password ngay trong Supabase.
- Chỉ đặt secret trong Render Environment hoặc prompt `sync: false` của Blueprint.
- Giữ `DATABASE_POOL_SIZE` nhỏ trên gói Supabase miễn phí.
- Dùng migration mới cho thay đổi schema tiếp theo, không sửa migration đã chạy.
