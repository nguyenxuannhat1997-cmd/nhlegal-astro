import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Icon } from '../primitives';
import SEOMeta from '../SEOMeta';
import { client, urlFor, POSTS_QUERY, getCategoryLabel, formatDate, getReadTime } from '../lib/sanity';

const FILTER_TABS = [
  { value: 'all',           label: 'Tất cả' },
  { value: 'tin-tuc',       label: 'Tin tức pháp lý' },
  { value: 'ly-hon',        label: 'Ly hôn & Gia đình' },
  { value: 'hop-dong',      label: 'Hợp đồng' },
  { value: 'bat-dong-san',  label: 'Bất động sản & Thừa kế' },
  { value: 'doanh-nghiep',  label: 'Doanh nghiệp' },
  { value: 'lao-dong',      label: 'Lao động & Nhân sự' },
  { value: 'so-huu-tri-tue',label: 'Sở hữu trí tuệ' },
];

const SkeletonCard = () => (
  <div style={{ borderRadius: 16, overflow: 'hidden', background: '#F5F5F5' }}>
    <div style={{ aspectRatio: '16/9', background: '#E8E8E8' }} />
    <div style={{ padding: '20px 24px 28px' }}>
      <div style={{ height: 10, width: '30%', background: '#E0E0E0', borderRadius: 6, marginBottom: 14 }} />
      <div style={{ height: 18, width: '90%', background: '#E0E0E0', borderRadius: 6, marginBottom: 8 }} />
      <div style={{ height: 18, width: '70%', background: '#E0E0E0', borderRadius: 6, marginBottom: 16 }} />
      <div style={{ height: 13, width: '50%', background: '#E8E8E8', borderRadius: 6 }} />
    </div>
  </div>
);

const ArticleCard = ({ post }) => {
  const [hover, setHover] = React.useState(false);
  const imgUrl = post.coverImage
    ? urlFor(post.coverImage).width(800).height(450).fit('crop').url()
    : (post.coverImageUrl || null);
  return (
    <Link to={`/bai-viet/${post.slug}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ display: 'block', textDecoration: 'none', color: 'inherit', borderRadius: 16, overflow: 'hidden', background: '#FFFFFF', border: `1.5px solid ${hover ? 'rgba(11,107,114,0.2)' : 'var(--nh-line)'}`, boxShadow: hover ? 'var(--shadow-2)' : 'var(--shadow-1)', transform: hover ? 'translateY(-3px)' : 'translateY(0)', transition: 'all 320ms var(--ease-out)' }}>
      <div style={{ aspectRatio: '16/9', overflow: 'hidden', background: 'var(--nh-navy-800)' }}>
        {imgUrl ? (
          <img src={imgUrl} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: hover ? 'scale(1.04)' : 'scale(1)', transition: 'transform 600ms var(--ease-out)' }} />
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
        <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 26, lineHeight: 1.2, letterSpacing: '-0.01em', color: hover ? 'var(--nh-teal-700)' : 'var(--nh-navy-900)', transition: 'color 280ms var(--ease-out)', textAlign: 'center', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {post.title}
        </h3>
        {(post.excerpt || post.websiteArticle) && (
          <p style={{ margin: '10px 0 0', fontSize: 14, lineHeight: 1.65, color: 'var(--fg-2)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {post.excerpt || (post.websiteArticle || '').replace(/\[.*?\]:\s*/g, '').trim().slice(0, 200)}
          </p>
        )}
        <div style={{ marginTop: 16, fontSize: 12, color: 'var(--fg-mute)' }}>
          {formatDate(post.publishedAt)}
        </div>
      </div>
    </Link>
  );
};

const EmptyState = ({ filtered }) => (
  <div style={{ textAlign: 'center', padding: '80px 0' }}>
    <span style={{ display: 'inline-flex', width: 72, height: 72, borderRadius: 999, background: 'var(--nh-teal-50)', alignItems: 'center', justifyContent: 'center', color: 'var(--nh-teal-700)' }}>
      <Icon name="file-text" size={30} stroke={1.5} />
    </span>
    <h3 style={{ marginTop: 24, fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 28, color: 'var(--nh-navy-900)' }}>
      {filtered ? 'Chưa có bài viết trong danh mục này' : 'Bài viết sẽ sớm ra mắt'}
    </h3>
    <p style={{ marginTop: 12, fontSize: 15, color: 'var(--fg-2)', maxWidth: 400, margin: '12px auto 0' }}>
      {filtered ? 'Thử chọn danh mục khác hoặc xem tất cả bài viết.' : 'Đội ngũ N.H Legal đang chuẩn bị các phân tích pháp lý chuyên sâu. Đăng ký bản tin để nhận thông báo.'}
    </p>
    {!filtered && (
      <a href="/#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 28, padding: '12px 24px', background: 'var(--nh-teal-700)', color: '#FFFFFF', borderRadius: 999, textDecoration: 'none', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 14 }}>
        Đăng ký nhận tin
        <Icon name="arrow-right" size={15} stroke={2} />
      </a>
    )}
  </div>
);

const BlogListPage = () => {
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState('all');

  React.useEffect(() => {
    client.fetch(POSTS_QUERY)
      .then(setPosts)
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeTab === 'all' ? posts : posts.filter((p) => p.category === activeTab);

  return (
    <main>
      <SEOMeta
        title="Tin tức & Phân tích pháp lý"
        description="Cập nhật pháp luật mới nhất, phân tích chuyên sâu và góc nhìn thực tiễn từ đội ngũ luật sư N.H Legal — doanh nghiệp, hợp đồng, bất động sản, lao động."
        path="/bai-viet"
      />

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #063E45 0%, #0A5258 55%, #0D6470 100%)', padding: 'clamp(64px, 10vw, 100px) 0 clamp(48px, 7vw, 72px)' }}>
        <Container>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.55)', fontSize: 13, fontFamily: 'var(--font-sans)', textDecoration: 'none', marginBottom: 28, transition: 'color 200ms' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.9)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}>
            <Icon name="arrow-left" size={14} stroke={2} />
            Trang chủ
          </Link>
          <div style={{ fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-sans)', marginBottom: 16 }}>
            Insights · Legal Intelligence
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(32px, 5vw, 56px)', letterSpacing: '-0.02em', color: '#FFFFFF', margin: 0, lineHeight: 1.1 }}>
            Tin tức &amp; Phân tích
          </h1>
          <p style={{ maxWidth: 560, margin: '18px 0 0', fontSize: 16, lineHeight: 1.7, color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-sans)' }}>
            Cập nhật pháp luật mới nhất và phân tích thực tiễn từ đội ngũ luật sư N.H Legal.
          </p>
        </Container>
      </div>

      {/* Filter tabs */}
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid var(--nh-line)', position: 'sticky', top: 80, zIndex: 10 }}>
        <Container>
          <div style={{ display: 'flex', gap: 4, overflowX: 'auto', scrollbarWidth: 'none', padding: '0 0 1px', marginBottom: -1 }}>
            {FILTER_TABS.map((tab) => (
              <button key={tab.value} onClick={() => setActiveTab(tab.value)}
                style={{ flexShrink: 0, padding: '16px 18px', background: 'transparent', border: 'none', borderBottom: `2px solid ${activeTab === tab.value ? 'var(--nh-teal-700)' : 'transparent'}`, color: activeTab === tab.value ? 'var(--nh-teal-700)' : 'var(--fg-2)', fontFamily: 'var(--font-sans)', fontWeight: activeTab === tab.value ? 600 : 400, fontSize: 13.5, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 200ms var(--ease-out)', letterSpacing: '0.01em' }}>
                {tab.label}
              </button>
            ))}
          </div>
        </Container>
      </div>

      {/* Content */}
      <div style={{ background: '#FAFAFA', padding: 'clamp(40px, 6vw, 72px) 0 clamp(64px, 10vw, 100px)' }}>
        <Container>
          {loading ? (
            <div className="nh-blog-grid">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState filtered={activeTab !== 'all'} />
          ) : (
            <div className="nh-blog-grid">
              {filtered.map((post) => <ArticleCard key={post._id} post={post} />)}
            </div>
          )}
        </Container>
      </div>
    </main>
  );
};

export default BlogListPage;
