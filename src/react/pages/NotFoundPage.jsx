import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Icon } from '../primitives';
import SEOMeta from '../SEOMeta';

const NotFoundPage = () => (
  <main style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
    <SEOMeta title="404 — Trang không tìm thấy" description="Trang bạn tìm kiếm không tồn tại." path="/404" noindex={true} />
    <Container>
      <div style={{ textAlign: 'center', padding: '80px 0' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(100px, 20vw, 180px)', fontWeight: 500, lineHeight: 1, color: 'var(--nh-teal-50)', letterSpacing: '-0.04em', userSelect: 'none' }}>
          404
        </div>
        <h1 style={{ marginTop: -16, fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(28px, 3.6vw, 48px)', letterSpacing: '-0.015em', color: 'var(--nh-navy-900)' }}>
          Trang không tìm thấy
        </h1>
        <p style={{ marginTop: 16, fontSize: 16, lineHeight: 1.65, color: 'var(--fg-2)', maxWidth: 400, margin: '16px auto 0' }}>
          Trang bạn tìm kiếm không tồn tại hoặc đã được di chuyển.
        </p>
        <Link
          to="/"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 9, marginTop: 40, padding: '13px 28px', background: 'var(--nh-teal-700)', color: '#FFFFFF', borderRadius: 999, textDecoration: 'none', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 15, letterSpacing: '0.02em', boxShadow: '0 8px 24px rgba(11,107,114,0.28)' }}
        >
          <Icon name="arrow-left" size={16} stroke={2} />
          Về trang chủ
        </Link>
      </div>
    </Container>
  </main>
);

export default NotFoundPage;
