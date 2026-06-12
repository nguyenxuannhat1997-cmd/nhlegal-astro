import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Astro: env qua import.meta.env (PUBLIC_*). Fallback projectId thật để build SSG
// chạy được kể cả khi chưa cấu hình .env. Client dùng ở BUILD-TIME (Insights).
export const client = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'te8s7pep',
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

export const POSTS_QUERY = `*[(_type == "legalPost" && status == "published") || _type == "post"] | order(publishedAt desc) {
  _id,
  _type,
  title,
  "slug": slug.current,
  publishedAt,
  category,
  excerpt,
  websiteArticle,
  readTime,
  coverImage,
  coverImageUrl
}`;

export const POST_QUERY = `*[((_type == "legalPost" && status == "published") || _type == "post") && slug.current == $slug][0] {
  _id,
  _type,
  title,
  "slug": slug.current,
  publishedAt,
  category,
  excerpt,
  websiteArticle,
  readTime,
  coverImage,
  coverImageUrl,
  body,
  bodyHtml,
  sourceUrl
}`;

export const LATEST_POSTS_QUERY = `*[(_type == "legalPost" && status == "published") || _type == "post"] | order(publishedAt desc) [0...3] {
  _id,
  _type,
  title,
  "slug": slug.current,
  publishedAt,
  category,
  excerpt,
  websiteArticle,
  readTime,
  coverImage,
  coverImageUrl
}`;

// Category enum — khớp 7 nhóm dịch vụ chính thức (slug = category value).
// Giữ key CŨ để bài viết đã đăng không mất nhãn cho tới khi re-categorize trong Studio.
export const CATEGORY_LABELS = {
  'tin-tuc':                  'Tin tức pháp lý',
  // 7 nhóm chính thức
  'doanh-nghiep-dau-tu':      'Doanh nghiệp & Đầu tư',
  'so-huu-tri-tue-nhan-hieu': 'Sở hữu trí tuệ & Nhãn hiệu',
  'hop-dong-giao-dich':       'Hợp đồng & Giao dịch',
  'dat-dai-nha-o':            'Đất đai & Nhà ở',
  'thua-ke-di-chuc':          'Thừa kế & Di chúc',
  'hon-nhan-gia-dinh':        'Hôn nhân & Gia đình',
  'lao-dong-nhan-su':         'Lao động & Nhân sự',
  // alias CŨ (tương thích ngược)
  'ly-hon':         'Hôn nhân & Gia đình',
  'hop-dong':       'Hợp đồng & Giao dịch',
  'bat-dong-san':   'Đất đai & Nhà ở',
  'doanh-nghiep':   'Doanh nghiệp & Đầu tư',
  'lao-dong':       'Lao động & Nhân sự',
  'so-huu-tri-tue': 'Sở hữu trí tuệ & Nhãn hiệu',
};

export const getCategoryLabel = (value) => CATEGORY_LABELS[value] || value || 'Pháp lý';

export const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

export const getReadTime = (post) => {
  if (post.readTime) return post.readTime;
  if (!post.websiteArticle) return null;
  const words = post.websiteArticle.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
};
