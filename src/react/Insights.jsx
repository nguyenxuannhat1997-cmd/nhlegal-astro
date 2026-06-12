import React from 'react';
import { Container, Eyebrow, TextLink, Icon } from './primitives';
import { urlFor, getCategoryLabel, formatDate, getReadTime } from './lib/sanity';

// Posts được fetch ở build-time (trong index.astro) và truyền vào qua prop.
// Render TĨNH (zero-JS). Ẩn toàn bộ mục khi chưa có bài (tránh nội dung giả).
const Insights = ({ posts = [] }) => {
  if (!posts || posts.length === 0) return null;

  const featured = posts[0];
  const more = posts.slice(1, 4);

  return (
    <section id="insights" className="nh-section-standard" style={{ background: "#FFFFFF" }}>
      <Container>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56, gap: 32, flexWrap: "wrap" }}>
          <div style={{ maxWidth: 720 }}>
            <Eyebrow>Insights · Legal Intelligence</Eyebrow>
            <h2 style={{ margin: "20px 0 0 0", fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "clamp(36px, 3.8vw, 52px)", lineHeight: 1.1, letterSpacing: "-0.015em", color: "var(--nh-navy-900)" }}>
              Góc nhìn pháp lý{" "}
              <em style={{ fontStyle: "normal", color: "var(--nh-gold-500)", fontWeight: 500 }}>từ N.H Legal.</em>
            </h2>
          </div>
          <TextLink href="/bai-viet">Tất cả bài viết</TextLink>
        </div>
        <div className="nh-grid-insights">
          <FeaturedArticle post={featured} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            {more.map((a, i) => <ArticleRow key={a._id} post={a} top={i === 0} />)}
          </div>
        </div>
      </Container>
    </section>
  );
};

const FeaturedArticle = ({ post }) => {
  const img = post.coverImage
    ? urlFor(post.coverImage).width(1100).height(690).fit('crop').auto('format').quality(75).url()
    : (post.coverImageUrl || null);
  return (
    <a href={`/bai-viet/${post.slug}`} className="nh-insights-featured" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
      <div style={{ width: "100%", aspectRatio: "16 / 10", borderRadius: 20, overflow: "hidden", background: "var(--nh-navy-800)", position: "relative", boxShadow: "var(--shadow-1)", transition: "box-shadow 360ms var(--ease-out)" }}>
        {img ? (
          <img src={img} alt={post.title} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "contrast(1.05)", transition: "transform 600ms var(--ease-out)" }} />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #063E45, #0A5258)" }}>
            <Icon name="file-text" size={44} stroke={1} color="rgba(255,255,255,0.2)" />
          </div>
        )}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 50%, rgba(8,23,45,0.65) 100%)" }} />
        <div style={{ position: "absolute", top: 24, left: 24, padding: "6px 14px", background: "rgba(200, 169, 107, 0.92)", color: "var(--nh-navy-900)", borderRadius: 999, fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" }}>Bài nổi bật</div>
      </div>
      <div style={{ marginTop: 28 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 12, color: "var(--fg-mute)", letterSpacing: "0.04em" }}>
          <span style={{ color: "var(--nh-teal-700)", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>{getCategoryLabel(post.category)}</span>
          <span>·</span><span>{formatDate(post.publishedAt)}</span>
          {getReadTime(post) && <><span>·</span><span>{getReadTime(post)} phút đọc</span></>}
        </div>
        <h3 style={{ margin: "16px 0 0 0", fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 32, lineHeight: 1.18, letterSpacing: "-0.005em", color: "var(--nh-navy-900)", display: "inline" }}>{post.title}</h3>
        {post.excerpt && <p style={{ marginTop: 16, fontSize: 15, lineHeight: 1.7, color: "var(--fg-2)", maxWidth: 560, textAlign: "justify" }}>{post.excerpt}</p>}
      </div>
    </a>
  );
};

const ArticleRow = ({ post, top }) => (
  <a href={`/bai-viet/${post.slug}`} className="nh-insights-row" style={{ textDecoration: "none", color: "inherit", padding: "28px 0", borderTop: top ? "1px solid var(--nh-line)" : "none", borderBottom: "1px solid var(--nh-line)", display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 24, alignItems: "flex-start", transition: "padding 320ms var(--ease-out)" }}>
    <div style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 14, color: "var(--nh-gold-600)", paddingTop: 4, whiteSpace: "nowrap" }}>{formatDate(post.publishedAt).slice(0, 5)}</div>
    <div>
      <div style={{ fontSize: 11, color: "var(--fg-mute)", letterSpacing: "0.04em" }}>
        <span style={{ color: "var(--nh-teal-700)", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" }}>{getCategoryLabel(post.category)}</span>
        {getReadTime(post) && <span> · {getReadTime(post)} phút đọc</span>}
      </div>
      <h4 style={{ marginTop: 8, fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 22, lineHeight: 1.25, color: "var(--nh-navy-900)", transition: "color 320ms var(--ease-out)" }}>{post.title}</h4>
    </div>
    <span style={{ color: "var(--nh-teal-700)", paddingTop: 10, display: "inline-flex" }}>
      <Icon name="arrow-right" size={16} stroke={1.5} />
    </span>
  </a>
);

export default Insights;
