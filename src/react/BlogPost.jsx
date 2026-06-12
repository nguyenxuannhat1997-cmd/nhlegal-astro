import React from 'react';
import { PortableText } from '@portabletext/react';
import { Container, Icon } from './primitives';
import { urlFor, getCategoryLabel, formatDate, getReadTime } from './lib/sanity';

// Trích xuất nội dung body từ file HTML đầy đủ, bỏ phần <head> và các
// thành phần đã có sẵn trên trang (h1 hero, ảnh bìa).
function extractBodyContent(html) {
  if (!html) return null;
  // Lấy phần trong <body>...</body>
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  let c = bodyMatch ? bodyMatch[1] : html;
  // Bỏ script và style (site dùng CSS riêng)
  c = c.replace(/<script\b[\s\S]*?<\/script>/gi, '');
  c = c.replace(/<style\b[\s\S]*?<\/style>/gi, '');
  // Bỏ h1 (đã hiển thị trong hero)
  c = c.replace(/<h1\b[^>]*>[\s\S]*?<\/h1>/i, '');
  // Bỏ figure đầu tiên chứa ảnh featured (đã hiển thị trong hero)
  c = c.replace(/<figure\b[^>]*>[\s\S]*?featured[\s\S]*?<\/figure>/i, '');
  // Sửa đường dẫn ảnh tương đối → tuyệt đối /images/blog/
  c = c.replace(/(<img\b[^>]+\bsrc=["'])(?!https?:\/\/)([^/][^"']*\.(?:webp|png|jpe?g))["']/gi,
    (_, prefix, filename) => `${prefix}https://nhlegal.com.vn/images/blog/${filename.replace(/^.*[\\/]/, '')}`
  );
  return c.trim();
}

const innerPt = {
  block: {
    normal: ({ children }) => <p style={{ margin: '0 0 8px', fontSize: 15, lineHeight: 1.75, color: 'var(--nh-navy-900)' }}>{children}</p>,
  },
  marks: {
    strong: ({ children }) => <strong style={{ fontWeight: 700 }}>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => <a href={value?.href} rel="noopener noreferrer" style={{ color: 'var(--nh-teal-700)', textDecoration: 'underline' }}>{children}</a>,
  },
};

// Render TĨNH (zero-JS). Nhận `post` qua props (fetch build-time ở [slug].astro).
const ptComponents = {
  types: {
    image: ({ value }) => (
      <figure style={{ margin: '36px 0' }}>
        <img src={urlFor(value).width(900).auto('format').quality(75).url()} alt={value.alt || ''} loading="lazy" decoding="async" style={{ width: '100%', borderRadius: 12, display: 'block' }} />
        {value.caption && (
          <figcaption style={{ textAlign: 'center', fontSize: 13, color: 'var(--fg-mute)', marginTop: 10, fontStyle: 'italic' }}>{value.caption}</figcaption>
        )}
      </figure>
    ),
    imageExt: ({ value }) => (
      <figure style={{ margin: '36px 0' }}>
        <img src={value.url} alt={value.alt || ''} loading="lazy" decoding="async" style={{ width: '100%', borderRadius: 12, display: 'block' }} />
        {value.caption && (
          <figcaption style={{ textAlign: 'center', fontSize: 13, color: 'var(--fg-mute)', marginTop: 10, fontStyle: 'italic' }}>{value.caption}</figcaption>
        )}
      </figure>
    ),
    answerBox: ({ value }) => (
      <div style={{ background: '#f0faf8', borderLeft: '4px solid var(--nh-teal-700)', borderRadius: '0 12px 12px 0', padding: '18px 24px', margin: '24px 0 32px', lineHeight: 1.75, color: 'var(--nh-navy-900)' }}>
        {value.body && <PortableText value={value.body} components={innerPt} />}
      </div>
    ),
    ctaBox: ({ value }) => (
      <div style={{ background: 'linear-gradient(135deg, #f0faf8 0%, #e8f4f8 100%)', border: '2px solid var(--nh-teal-700)', borderRadius: 12, padding: '28px 32px', margin: '40px 0', boxShadow: '0 2px 12px rgba(13,123,123,0.08)' }}>
        {value.heading && (
          <h3 style={{ color: 'var(--nh-teal-700)', marginTop: 0, marginBottom: 12, fontSize: '1.15em', fontFamily: 'var(--font-display)', fontWeight: 600 }}>{value.heading}</h3>
        )}
        {value.items && value.items.length > 0 && (
          <ul style={{ listStyle: 'none', padding: 0, margin: '12px 0' }}>
            {value.items.map((item, i) => (
              <li key={i} style={{ padding: '4px 0', fontSize: 15, lineHeight: 1.75, color: 'var(--fg-2)', display: 'flex', gap: 8 }}>
                <span style={{ color: 'var(--nh-teal-700)', fontWeight: 700, flexShrink: 0 }}>✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
        {value.contact && value.contact.length > 0 && (
          <div style={{ marginTop: 16, fontWeight: 600, fontSize: '1.05em', lineHeight: 1.9, color: 'var(--nh-navy-900)', fontFamily: 'var(--font-sans)' }}>
            {value.contact.map((line, i) => <div key={i}>{line}</div>)}
          </div>
        )}
      </div>
    ),
    toc: ({ value }) => (
      <nav className="toc" aria-label="Mục lục bài viết" style={{
        background: '#f7fafa',
        border: '1px solid #c8e6e6',
        borderRadius: 10,
        padding: '18px 22px',
        margin: '28px 0 36px',
        fontFamily: 'var(--font-sans)'
      }}>
        {value.title && (
          <h4 style={{
            margin: '0 0 12px',
            fontSize: '1.02em',
            fontWeight: 600,
            color: 'var(--nh-teal-700)',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontFamily: 'var(--font-sans)',
            border: 'none',
            padding: 0
          }}>
            {value.title}
          </h4>
        )}
        {value.items && value.items.length > 0 && (
          <ol style={{
            margin: 0,
            paddingLeft: 20,
            lineHeight: 1.95,
            display: 'flex',
            flexDirection: 'column',
            gap: 4
          }}>
            {value.items.map((item, i) => (
              <li key={item._key || i} style={{ fontSize: 15, color: 'var(--nh-navy-900)' }}>
                <a href={item.anchor} style={{
                  color: 'var(--nh-navy-900)',
                  textDecoration: 'none',
                  fontSize: '0.96em',
                  transition: 'color 0.2s',
                  fontWeight: 500
                }}
                onMouseOver={(e) => e.target.style.color = 'var(--nh-teal-700)'}
                onMouseOut={(e) => e.target.style.color = 'var(--nh-navy-900)'}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ol>
        )}
      </nav>
    ),
    simpleTable: ({ value }) => (
      <div className="table-responsive" style={{
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
        margin: '24px 0',
      }}>
        <table style={{
          minWidth: 520,
          width: '100%',
          borderCollapse: 'collapse',
          fontFamily: 'var(--font-sans)',
          fontSize: 15,
        }}>
          {value.headers && value.headers.length > 0 && (
            <thead>
              <tr style={{ background: 'var(--nh-teal-700)', color: '#fff' }}>
                {value.headers.map((h, idx) => (
                  <th key={idx} style={{
                    padding: '11px 15px',
                    border: '1px solid #dde',
                    textAlign: 'left',
                    verticalAlign: 'top',
                    fontWeight: 600,
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
          )}
          {value.rows && value.rows.length > 0 && (
            <tbody>
              {value.rows.map((row, rowIdx) => (
                <tr key={rowIdx} style={{
                  background: rowIdx % 2 === 1 ? '#f7fafa' : '#fff'
                }}>
                  {row.cells && row.cells.map((cell, cellIdx) => (
                    <td key={cellIdx} style={{
                      padding: '11px 15px',
                      border: '1px solid #dde',
                      textAlign: 'left',
                      verticalAlign: 'top',
                      color: 'var(--fg-2)',
                    }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    ),
  },
  block: {
    h2: ({ children, value }) => <h2 id={value?.id} style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(24px, 3vw, 32px)', letterSpacing: '-0.01em', color: 'var(--nh-navy-900)', margin: '48px 0 20px', lineHeight: 1.2 }}>{children}</h2>,
    h3: ({ children, value }) => <h3 id={value?.id} style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(20px, 2.4vw, 26px)', letterSpacing: '-0.005em', color: 'var(--nh-navy-900)', margin: '36px 0 16px', lineHeight: 1.25 }}>{children}</h3>,
    h4: ({ children, value }) => <h4 id={value?.id} style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 16, color: 'var(--nh-navy-900)', margin: '28px 0 12px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{children}</h4>,
    normal: ({ children, value }) => {
      // Đoạn toàn chữ nghiêng (em) = ghi chú tác giả cuối bài → chữ nhỏ, mờ, giữ xuống dòng
      const spans = (value?.children || []).filter((c) => c._type === 'span' && c.text?.trim());
      const isAuthorNote = spans.length > 0 && spans.every((c) => (c.marks || []).includes('em'));
      if (isAuthorNote) {
        return <p style={{ margin: '40px 0 0', paddingTop: 16, borderTop: '1px solid rgba(11,42,58,0.12)', fontSize: 13.5, lineHeight: 1.8, color: '#6b6b6b', whiteSpace: 'pre-line' }}>{children}</p>;
      }
      return <p style={{ margin: '0 0 20px', fontSize: 16, lineHeight: 1.8, color: 'var(--fg-2)', textAlign: 'justify' }}>{children}</p>;
    },
    blockquote: ({ children }) => <blockquote style={{ margin: '32px 0', padding: '20px 28px', borderLeft: '4px solid var(--nh-teal-700)', background: 'var(--nh-teal-50)', borderRadius: '0 14px 14px 0', fontFamily: 'var(--font-display)', fontSize: 20, lineHeight: 1.6, color: 'var(--nh-navy-900)', fontStyle: 'italic' }}>{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul style={{ margin: '0 0 20px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>{children}</ul>,
    number: ({ children }) => <ol style={{ margin: '0 0 20px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--fg-2)' }}>{children}</li>,
    number: ({ children }) => <li style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--fg-2)' }}>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong style={{ color: 'var(--nh-navy-900)', fontWeight: 600 }}>{children}</strong>,
    em: ({ children }) => <em style={{ fontStyle: 'italic' }}>{children}</em>,
    link: ({ value, children }) => <a href={value?.href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--nh-teal-700)', textDecoration: 'underline', textDecorationColor: 'rgba(11,107,114,0.3)', textUnderlineOffset: 3 }}>{children}</a>,
    code: ({ children }) => <code style={{ fontFamily: 'monospace', fontSize: 14, background: 'rgba(11,107,114,0.08)', color: 'var(--nh-teal-700)', padding: '2px 6px', borderRadius: 4 }}>{children}</code>,
  },
};

const BlogPost = ({ post }) => {
  const imgUrl = post.coverImage
    ? urlFor(post.coverImage).width(1200).height(630).fit('crop').auto('format').quality(75).url()
    : (post.coverImageUrl || null);
  return (
    <main>
      <div style={{ background: 'linear-gradient(135deg, #063E45 0%, #0A5258 55%, #0D6470 100%)', padding: 'clamp(64px, 10vw, 100px) 0 clamp(48px, 7vw, 72px)' }}>
        <Container>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28, flexWrap: 'wrap' }}>
            <a href="/" className="nh-foot-contact-link" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, fontFamily: 'var(--font-sans)' }}>Trang chủ</a>
            <Icon name="chevron-right" size={13} stroke={1.5} color="rgba(255,255,255,0.3)" />
            <a href="/bai-viet" className="nh-foot-contact-link" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, fontFamily: 'var(--font-sans)' }}>Tin tức</a>
            <Icon name="chevron-right" size={13} stroke={1.5} color="rgba(255,255,255,0.3)" />
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, fontFamily: 'var(--font-sans)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '40vw' }}>{post.title}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
            <span style={{ padding: '5px 14px', background: 'rgba(200,169,107,0.18)', border: '1px solid rgba(200,169,107,0.35)', color: '#D8BC84', borderRadius: 999, fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'var(--font-sans)' }}>{getCategoryLabel(post.category)}</span>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, fontFamily: 'var(--font-sans)' }}>{formatDate(post.publishedAt)}</span>
            {getReadTime(post) && (<><span style={{ color: 'rgba(255,255,255,0.3)' }}>·</span><span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, fontFamily: 'var(--font-sans)' }}>{getReadTime(post)} phút đọc</span></>)}
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(28px, 4.5vw, 52px)', letterSpacing: '-0.02em', color: '#FFFFFF', margin: 0, lineHeight: 1.12, maxWidth: 820 }}>{post.title}</h1>
          {post.excerpt && <p style={{ maxWidth: 680, margin: '20px 0 0', fontSize: 16, lineHeight: 1.7, color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-sans)' }}>{post.excerpt}</p>}
        </Container>
      </div>

      {imgUrl && (
        <div style={{ background: '#0A5258' }}>
          <Container>
            <div style={{ borderRadius: '0 0 20px 20px', overflow: 'hidden' }}>
              <img src={imgUrl} alt={post.title} loading="lazy" decoding="async" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
          </Container>
        </div>
      )}

      <div style={{ background: '#FFFFFF', padding: 'clamp(48px, 7vw, 80px) 0 clamp(64px, 10vw, 100px)' }}>
        <Container>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            {post.bodyHtml ? (
              <div className="blog-html-body" dangerouslySetInnerHTML={{ __html: extractBodyContent(post.bodyHtml) }} />
            ) : post.body ? (
              <PortableText value={post.body} components={ptComponents} />
            ) : post.websiteArticle ? (
              post.websiteArticle.replace(/\[.*?\]:\s*/g, '').split('\n\n').filter(Boolean).map((para, i) => (
                <p key={i} style={{ margin: '0 0 20px', fontSize: 16, lineHeight: 1.8, color: 'var(--fg-2)', textAlign: 'justify' }}>{para.trim()}</p>
              ))
            ) : (
              <p style={{ fontSize: 16, color: 'var(--fg-2)', textAlign: 'center', padding: '40px 0' }}>Nội dung đang được cập nhật.</p>
            )}
            <div style={{ marginTop: 56, paddingTop: 32, borderTop: '1px solid var(--nh-line)', display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
              <a href="/bai-viet" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: 'var(--nh-teal-700)', color: '#FFFFFF', borderRadius: 999, textDecoration: 'none', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 14, letterSpacing: '0.02em' }}>
                <Icon name="arrow-left" size={15} stroke={2} /> Tất cả bài viết
              </a>
              <a href="/#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: 'transparent', color: 'var(--nh-teal-700)', borderRadius: 999, textDecoration: 'none', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 14, border: '1.5px solid var(--nh-teal-700)' }}>
                Tư vấn với luật sư <Icon name="arrow-right" size={15} stroke={2} />
              </a>
            </div>
          </div>
        </Container>
      </div>
    </main>
  );
};

export default BlogPost;
