import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { PortableText } from '@portabletext/react';
import { Container, Icon } from '../primitives';
import SEOMeta from '../SEOMeta';
import { client, urlFor, POST_QUERY, getCategoryLabel, formatDate, getReadTime } from '../lib/sanity';
import NotFoundPage from './NotFoundPage';

const ptComponents = {
  types: {
    image: ({ value }) => (
      <figure style={{ margin: '36px 0' }}>
        <img
          src={urlFor(value).width(900).url()}
          alt={value.alt || ''}
          style={{ width: '100%', borderRadius: 12, display: 'block' }}
        />
        {value.caption && (
          <figcaption style={{ textAlign: 'center', fontSize: 13, color: 'var(--fg-mute)', marginTop: 10, fontStyle: 'italic' }}>
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
  block: {
    h2: ({ children }) => (
      <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(24px, 3vw, 32px)', letterSpacing: '-0.01em', color: 'var(--nh-navy-900)', margin: '48px 0 20px', lineHeight: 1.2 }}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(20px, 2.4vw, 26px)', letterSpacing: '-0.005em', color: 'var(--nh-navy-900)', margin: '36px 0 16px', lineHeight: 1.25 }}>
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 16, color: 'var(--nh-navy-900)', margin: '28px 0 12px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p style={{ margin: '0 0 20px', fontSize: 16, lineHeight: 1.8, color: 'var(--fg-2)', textAlign: 'justify' }}>
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote style={{ margin: '32px 0', padding: '20px 28px', borderLeft: '4px solid var(--nh-teal-700)', background: 'var(--nh-teal-50)', borderRadius: '0 14px 14px 0', fontFamily: 'var(--font-display)', fontSize: 20, lineHeight: 1.6, color: 'var(--nh-navy-900)', fontStyle: 'italic' }}>
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul style={{ margin: '0 0 20px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol style={{ margin: '0 0 20px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--fg-2)' }}>{children}</li>
    ),
    number: ({ children }) => (
      <li style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--fg-2)' }}>{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => <strong style={{ color: 'var(--nh-navy-900)', fontWeight: 600 }}>{children}</strong>,
    em: ({ children }) => <em style={{ fontStyle: 'italic' }}>{children}</em>,
    link: ({ value, children }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer"
        style={{ color: 'var(--nh-teal-700)', textDecoration: 'underline', textDecorationColor: 'rgba(11,107,114,0.3)', textUnderlineOffset: 3 }}>
        {children}
      </a>
    ),
    code: ({ children }) => (
      <code style={{ fontFamily: 'monospace', fontSize: 14, background: 'rgba(11,107,114,0.08)', color: 'var(--nh-teal-700)', padding: '2px 6px', borderRadius: 4 }}>
        {children}
      </code>
    ),
  },
};

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    client.fetch(POST_QUERY, { slug })
      .then(setPost)
      .catch(() => setPost(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <main style={{ minHeight: '80vh' }}>
        <div style={{ background: 'linear-gradient(135deg, #063E45 0%, #0A5258 100%)', padding: 'clamp(64px, 10vw, 100px) 0 clamp(48px, 7vw, 72px)' }}>
          <Container>
            <div style={{ height: 16, width: 120, background: 'rgba(255,255,255,0.1)', borderRadius: 6, marginBottom: 28 }} />
            <div style={{ height: 52, width: '70%', background: 'rgba(255,255,255,0.1)', borderRadius: 8, marginBottom: 16 }} />
            <div style={{ height: 52, width: '50%', background: 'rgba(255,255,255,0.07)', borderRadius: 8 }} />
          </Container>
        </div>
        <div style={{ background: '#FFFFFF', padding: 'clamp(48px, 7vw, 80px) 0' }}>
          <Container>
            <div style={{ maxWidth: 760, margin: '0 auto' }}>
              {[80, 60, 90, 70, 85, 55, 75].map((w, i) => (
                <div key={i} style={{ height: 16, width: `${w}%`, background: '#F0F0F0', borderRadius: 6, marginBottom: 14 }} />
              ))}
            </div>
          </Container>
        </div>
      </main>
    );
  }

  if (!post) return <NotFoundPage />;

  const imgUrl = post.coverImage
    ? urlFor(post.coverImage).width(1200).height(630).fit('crop').url()
    : (post.coverImageUrl || null);

  return (
    <main>
      <SEOMeta
        title={post.title}
        description={post.excerpt || `Đọc bài viết: ${post.title} — N.H Legal`}
        path={`/bai-viet/${slug}`}
        image={imgUrl || undefined}
      />

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #063E45 0%, #0A5258 55%, #0D6470 100%)', padding: 'clamp(64px, 10vw, 100px) 0 clamp(48px, 7vw, 72px)' }}>
        <Container>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
            <Link to="/" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, fontFamily: 'var(--font-sans)', textDecoration: 'none', transition: 'color 200ms' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.9)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}>
              Trang chủ
            </Link>
            <Icon name="chevron-right" size={13} stroke={1.5} color="rgba(255,255,255,0.3)" />
            <Link to="/bai-viet" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, fontFamily: 'var(--font-sans)', textDecoration: 'none', transition: 'color 200ms' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.9)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}>
              Tin tức
            </Link>
            <Icon name="chevron-right" size={13} stroke={1.5} color="rgba(255,255,255,0.3)" />
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, fontFamily: 'var(--font-sans)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '40vw' }}>{post.title}</span>
          </div>

          {/* Category + meta */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
            <span style={{ padding: '5px 14px', background: 'rgba(200,169,107,0.18)', border: '1px solid rgba(200,169,107,0.35)', color: 'var(--nh-gold-300, #D8BC84)', borderRadius: 999, fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'var(--font-sans)' }}>
              {getCategoryLabel(post.category)}
            </span>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, fontFamily: 'var(--font-sans)' }}>
              {formatDate(post.publishedAt)}
            </span>
            {getReadTime(post) && (
              <>
                <span style={{ color: 'rgba(255,255,255,0.3)' }}>·</span>
                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, fontFamily: 'var(--font-sans)' }}>
                  {getReadTime(post)} phút đọc
                </span>
              </>
            )}
          </div>

          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(28px, 4.5vw, 52px)', letterSpacing: '-0.02em', color: '#FFFFFF', margin: 0, lineHeight: 1.12, maxWidth: 820 }}>
            {post.title}
          </h1>

          {post.excerpt && (
            <p style={{ maxWidth: 680, margin: '20px 0 0', fontSize: 16, lineHeight: 1.7, color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-sans)' }}>
              {post.excerpt}
            </p>
          )}
        </Container>
      </div>

      {/* Cover image */}
      {imgUrl && (
        <div style={{ background: '#0A5258' }}>
          <Container>
            <div style={{ borderRadius: '0 0 20px 20px', overflow: 'hidden', maxHeight: 500 }}>
              <img src={imgUrl} alt={post.title} style={{ width: '100%', objectFit: 'cover', display: 'block', maxHeight: 500 }} />
            </div>
          </Container>
        </div>
      )}

      {/* Article body */}
      <div style={{ background: '#FFFFFF', padding: 'clamp(48px, 7vw, 80px) 0 clamp(64px, 10vw, 100px)' }}>
        <Container>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            {post.body ? (
              <PortableText value={post.body} components={ptComponents} />
            ) : post.websiteArticle ? (
              post.websiteArticle
                .replace(/\[.*?\]:\s*/g, '')
                .split('\n\n')
                .filter(Boolean)
                .map((para, i) => (
                  <p key={i} style={{ margin: '0 0 20px', fontSize: 16, lineHeight: 1.8, color: 'var(--fg-2)', textAlign: 'justify' }}>
                    {para.trim()}
                  </p>
                ))
            ) : (
              <p style={{ fontSize: 16, color: 'var(--fg-2)', textAlign: 'center', padding: '40px 0' }}>Nội dung đang được cập nhật.</p>
            )}

            {/* Footer actions */}
            <div style={{ marginTop: 56, paddingTop: 32, borderTop: '1px solid var(--nh-line)', display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link to="/bai-viet" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: 'var(--nh-teal-700)', color: '#FFFFFF', borderRadius: 999, textDecoration: 'none', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 14, letterSpacing: '0.02em' }}>
                <Icon name="arrow-left" size={15} stroke={2} />
                Tất cả bài viết
              </Link>
              <a href="/#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: 'transparent', color: 'var(--nh-teal-700)', borderRadius: 999, textDecoration: 'none', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 14, border: '1.5px solid var(--nh-teal-700)' }}>
                Tư vấn với luật sư
                <Icon name="arrow-right" size={15} stroke={2} />
              </a>
            </div>
          </div>
        </Container>
      </div>
    </main>
  );
};

export default BlogPostPage;
