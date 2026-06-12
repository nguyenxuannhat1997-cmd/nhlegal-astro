import React from 'react';
import { Container, Icon } from './primitives';
import { urlFor, getCategoryLabel, formatDate, getReadTime } from './lib/sanity';

// Render TĨNH (zero-JS). Nhận `posts` qua props (fetch build-time).
const ArticleCard = ({ post }) => {
  const imgUrl = post.coverImage
    ? urlFor(post.coverImage).width(800).height(450).fit('crop').auto('format').quality(75).url()
    : (post.coverImageUrl || null);
  return (
    <a href={`/bai-viet/${post.slug}`} className="nh-blog-card" style={{ display: 'block', textDecoration: 'none', color: 'inherit', borderRadius: 16, overflow: 'hidden', background: '#FFFFFF', border: '1.5px solid var(--nh-line)', boxShadow: 'var(--shadow-1)' }}>
      <div style={{ aspectRatio: '16/9', overflow: 'hidden', background: 'var(--nh-navy-800)' }}>
        {imgUrl ? (
          <img src={imgUrl} alt={post.title} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #063E45, #0A5258)' }}>
            <Icon name="file-text" size={40} stroke={1} color="rgba(255,255,255,0.2)" />
          </div>
        )}
      </div>
      <div style={{ padding: '20px 24px 28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          <span style={{ color: 'var(--nh-teal-700)', fontWeight: 600 }}>{getCategoryLabel(post.category)}</span>
          {getReadTime(post) && <><span style={{ color: 'var(--fg-mute)' }}>·</span><span style={{ color: 'var(--fg-mute)' }}>{getReadTime(post)} phút đọc</span></>}
        </div>
        <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 24, lineHeight: 1.2, letterSpacing: '-0.01em', color: 'var(--nh-navy-900)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.title}</h2>
        {(post.excerpt || post.websiteArticle) && (
          <p style={{ margin: '10px 0 0', fontSize: 14, lineHeight: 1.65, color: 'var(--fg-2)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {post.excerpt || (post.websiteArticle || '').replace(/\[.*?\]:\s*/g, '').trim().slice(0, 160)}
          </p>
        )}
        <div style={{ marginTop: 16, fontSize: 12, color: 'var(--fg-mute)' }}>{formatDate(post.publishedAt)}</div>
      </div>
    </a>
  );
};

const EmptyState = () => (
  <div style={{ textAlign: 'center', padding: '64px 0' }}>
    <span style={{ display: 'inline-flex', width: 72, height: 72, borderRadius: 999, background: 'var(--nh-teal-50)', alignItems: 'center', justifyContent: 'center', color: 'var(--nh-teal-700)' }}>
      <Icon name="file-text" size={30} stroke={1.5} />
    </span>
    <h2 style={{ marginTop: 24, fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 28, color: 'var(--nh-navy-900)' }}>Bài viết sẽ sớm ra mắt</h2>
    <p style={{ marginTop: 12, fontSize: 15, color: 'var(--fg-2)', maxWidth: 400, margin: '12px auto 0' }}>
      Đội ngũ N.H Legal đang chuẩn bị các phân tích pháp lý chuyên sâu.
    </p>
  </div>
);

const BlogList = ({ posts = [] }) => (
  <main>
    <div style={{ background: 'linear-gradient(135deg, #063E45 0%, #0A5258 55%, #0D6470 100%)', padding: 'clamp(64px, 10vw, 100px) 0 clamp(48px, 7vw, 72px)' }}>
      <Container>
        <div style={{ fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-sans)', marginBottom: 16 }}>Insights · Legal Intelligence</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(32px, 5vw, 56px)', letterSpacing: '-0.02em', color: '#FFFFFF', margin: 0, lineHeight: 1.1 }}>Tin tức &amp; Phân tích</h1>
        <p style={{ maxWidth: 560, margin: '18px 0 0', fontSize: 16, lineHeight: 1.7, color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-sans)' }}>
          Cập nhật pháp luật mới nhất và phân tích thực tiễn từ đội ngũ luật sư N.H Legal.
        </p>
      </Container>
    </div>
    <div style={{ background: '#FAFAFA', padding: 'clamp(40px, 6vw, 72px) 0 clamp(64px, 10vw, 100px)' }}>
      <Container>
        {posts.length === 0 ? <EmptyState /> : (
          <div className="nh-blog-grid">
            {posts.map((post) => <ArticleCard key={post._id} post={post} />)}
          </div>
        )}
      </Container>
    </div>
  </main>
);

export default BlogList;
