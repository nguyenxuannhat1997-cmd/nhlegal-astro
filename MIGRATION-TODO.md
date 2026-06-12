# MIGRATION-TODO — Astro SSG (Giai đoạn 1)

> Trạng thái: 🚀 **ĐÃ DEPLOY PRODUCTION 10/06/2026** — https://nhlegal.com.vn chạy site Astro mới (38 trang, thay thế site Vite cũ).
> Nghiệm thu sau deploy: homepage 200 + title đúng · slug cũ 301 → slug mới · 404 thật · /bai-viet 200 · sitemap 200 · /bang-gia 200 · FAQPage schema có · chat trỏ `chat-api.nhlegal.com.vn` (CORS production OK) · www 200.
> Rollback: Cloudflare dashboard → Deployments → rollback (các bản Vite cũ vẫn còn trong lịch sử).

---

## A. VIỆC CON NGƯỜI PHẢI LÀM (đã có quyết định / còn chờ)

| Mã | Mục | Trạng thái | Ghi chú |
|---|---|---|---|
| HR-1 | Giờ làm việc | ✅ Đã áp dụng | Văn phòng **T2–T6 08:00–17:30** trong `openingHoursSpecification`; "tư vấn 24/7" ghi ở `description` của schema. |
| SA-1 | `sameAs` (MXH) | ✅ Đã áp dụng | 5 link: Facebook, Instagram, LinkedIn, TikTok, YouTube (trong `BaseLayout.astro`). |
| LS-1 | Thông tin luật sư | ⏳ **CHỜ** | Chưa có họ tên / số thẻ LS / Đoàn LS / ảnh → trang `gioi-thieu` đang để **khối placeholder** "Đội ngũ luật sư · đang cập nhật". **CHƯA** nhúng schema `Attorney/Person` (không bịa). Khi có dữ liệu thật → điền + thêm `founder` vào `#organization`. |
| SV-1 | Review nội dung 7 trang dịch vụ | ⏳ Bạn/LS review | Claude đã soạn nháp (Khi nào cần · Vấn đề · Hỗ trợ · Quy trình). Kiểm tra ngôn từ tránh **cam kết kết quả**. |
| FAQ-1 | FAQ 7 dịch vụ | ✅ Đã điền | Công ty cung cấp FAQ Hub (12/12/12/5/8/12/12) → `faqs` trong `data/services.js`; **đã nhúng `FAQPage` schema**. Bộ Đất đai&Thừa kế đã **tách** vào 2 trang. |
| WHY-1 | "Vì sao chọn N.H Legal" | ✅ Đã điền | 4 luận điểm (title + mô tả) cho cả 7 nhóm trong `whyUs` (`data/services.js`); render dạng thẻ. |
| PRICE-1 | Chi phí tham khảo (4 mục) | ✅ Đã điền | Thành lập 1.5tr · Thay đổi ĐKDN 1.2tr · Nhãn hiệu 2.5tr · Hợp đồng 2.0tr + included/excluded + disclaimer. Trang **`/bang-gia`** đã tạo. |
| CAT-1 | Category enum trong Sanity Studio | ⏳ Việc Studio | Frontend `CATEGORY_LABELS` đã cập nhật 7 nhóm. **Cần sửa enum `category` trong schema `legalPost` ở Sanity Studio** cho khớp + re-categorize bài cũ. |
| GBP-1 | Google Business Profile | ⏳ Việc người | Tạo/claim hồ sơ để củng cố Local SEO. |
| PH-1 | Cảm nhận khách hàng (Testimonials) | ✅ Đã điền | 8 cảm nhận thật (KH-01…08), **ẩn danh** + ghi chú bảo mật. Hiển thị lại trên trang chủ. File: `react/Testimonials.jsx`. |
| PH-2 | Vụ việc tiêu biểu (Case Studies) | ✅ Đã điền | 12 vụ việc thật (VV-01…12), mô tả phạm vi hỗ trợ — KHÔNG kết quả/số liệu/citation; ẩn danh + ghi chú bảo mật. File: `react/CaseStudies.jsx`. |
| PH-3 | Hội thoại mẫu AI (AISection mock) | ✅ Trung tính | Mock chỉ là minh hoạ giao diện (greeting trung tính, không claim/citation). Chat thật chạy bằng Gemini (xem CHAT-1). |
| STAT-1 | Số liệu Trust | ✅ Đã cập nhật | Theo số công ty cung cấp: 10+ Năm kinh nghiệm · 1.000+ Hồ sơ pháp lý · 07 Lĩnh vực · Toàn quốc. File: `react/Trust.jsx`. |
| CHAT-1 | Kết nối chat Gemini (production) | ✅ Đã cấu hình | `.env`: `PUBLIC_CHAT_API=https://chat-api.nhlegal.com.vn` (lấy từ `.env.production` site cũ — đã test sống, Gemini trả lời thật). **Lưu ý CORS**: backend chỉ cho phép origin `https://nhlegal.com.vn` → chat KHÔNG chạy trên `*.pages.dev` (rơi về fallback an toàn); chỉ chạy khi lên domain thật. |
| CHAT-2 | Cập nhật kịch bản (system prompt) backend | ⏳ Việc trên VPS | Backend `nh-legal-chat` chạy trên VPS (nginx/Ubuntu), KHÔNG có trên máy này. Gemini hiện vẫn giới thiệu **6 lĩnh vực CŨ** ("Ly hôn & Gia đình, Hợp đồng, BĐS & Thừa kế, Doanh nghiệp, Lao động, SHTT") → cần sửa system prompt trên server theo **7 nhóm dịch vụ mới** + URL trang dịch vụ mới. Claude đã soạn nháp kịch bản (xem bên dưới / chat). |

> **Nguyên tắc nội dung:** KHÔNG tự sinh tên khách hàng, kết quả vụ việc, hay trích dẫn điều luật. Mọi nội dung loại này phải do luật sư biên soạn/duyệt.

### Lỗi chặn đã sửa (Giai đoạn 1)
- **[FIX-1] Slug bắt buộc kebab-case + build-fail**: `dich-vu/[slug].astro` ném lỗi nếu slug sai định dạng hoặc trùng → build dừng ngay.
- **[FIX-2] Trang 404 thật**: `src/pages/404.astro` → `/404.html`, Cloudflare Pages trả **HTTP 404** cho URL không khớp.
- **[FIX-3] Stats render giá trị cuối**: `useCountUp` khởi tạo `count = target` → HTML tĩnh hiện ngay 10+/500+/1.000+/98% (không còn 0).

---

## B. Quyết định & sai khác có chủ đích (Giai đoạn 1)

1. **Kiến trúc = Cách 1**: tái dùng component React, **render tĩnh** trong Astro (không hydrate phần tĩnh). Giữ nguyên 100% markup/style.
2. **Zero-JS đã kiểm chứng**: bundle `dist/_astro` **không** chứa `react-router`/`react-helmet`; chỉ có JS của **đúng 4 island** (Nav · Testimonials · AIAssistant · Contact) + runtime hydrate.
3. **Hover → CSS** (zero-JS): buttons, text-link, footer link/social, insights card, "dịch vụ khác", CTA phone — chuyển từ `useState(hover)` sang class trong `global.css`.
4. **FAQ trang dịch vụ**: dùng `<details>` native (CSS xoay chevron) thay accordion JS.
5. **Footer newsletter**: bỏ EmailJS → CTA tĩnh trỏ `/#contact`. Khôi phục đăng ký bản tin (n8n/island) ở Giai đoạn 3.
6. **Reveal (fade-in khi cuộn)**: bỏ — nó đặt `opacity:0` chờ JS, không hợp render tĩnh. Nội dung hiển thị ngay.
7. **Slug dịch vụ giữ NGUYÊN** (`ly-hon`, `hop-dong`, `bat-dong-san-thua-ke`, `doanh-nghiep`, `lao-dong`, `so-huu-tri-tue`) → bảo toàn URL cũ.
8. **lucide-react pin `0.460.0`** (bản còn brand icons Facebook/Instagram/…; bản mới đã gỡ).
9. **Insights** fetch Sanity ở **build-time** (trong `index.astro`); không có bài → tự ẩn.
10. **Fonts self-host** qua `@fontsource` (Cormorant 500/600 + italic, Inter 400/500/600); bỏ Google Fonts CDN.

---

## C. CÒN LẠI cho Giai đoạn 2 (chưa làm — sẽ 404 nếu deploy ngay)

Nav/Footer đang link tới các route **chưa tạo** trong Astro:

- `/bai-viet` và `/bai-viet/[slug]` — Blog (Sanity). **Trọng tâm Giai đoạn 2.**
- `/tai-lieu` — Resource Hub.
- `/chinh-sach-bao-mat`, `/dieu-khoan-su-dung` — Policy / Terms.
- `/404` — trang không tìm thấy.

⚠️ **Không deploy Giai đoạn 1 ra production** cho tới khi có ít nhất Policy/Terms + 404 + Blog (hoặc tạm ẩn link Tin tức/Tài liệu), để tránh link gãy.

Các file React cũ tương ứng vẫn còn trong `src/react/pages/` (BlogListPage, BlogPostPage, ResourceHubPage, PolicyPage, TermsPage, NotFoundPage) — dùng làm tham chiếu khi port sang `.astro`.

### Chiến lược FAQ dài hạn (áp dụng khi làm Blog/SEO ở Phase 2)
- Trang Hub dịch vụ: **12–15 FAQ cố định** (đã làm; bao phủ search intent, không đổi thường xuyên).
- Trang Bảng giá: **5–7 FAQ** (đã làm: 4, có thể bổ sung).
- Mỗi **bài SEO** (Sanity `legalPost`): **3–5 FAQ riêng**, KHÔNG copy FAQ Hub, đúng chủ đề bài → tự sinh `FAQPage` schema. Schema bài: `{ title, slug, excerpt, content, faqs[] }`.
- Internal link từ FAQ bài viết → Hub dịch vụ liên quan khi phù hợp.
- Mục tiêu: mở rộng 1.000–5.000 bài SEO trong 3–5 năm.

---

## D. Lệnh

```bash
npm run dev      # xem thử local
npm run build    # build tĩnh → dist/
npm run preview  # xem bản build
```
