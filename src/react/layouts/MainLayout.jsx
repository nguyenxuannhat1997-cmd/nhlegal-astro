import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Icon } from '../primitives';
import Nav from '../Nav';
import Footer from '../Footer';
import AIAssistant from '../AIAssistant';

const ScrollToTop = () => {
  const [show, setShow] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button
      className="nh-scroll-to-top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Lên đầu trang"
      style={{
        position: 'fixed', bottom: 96, right: 24, zIndex: 50,
        width: 48, height: 48, borderRadius: '50%',
        background: hovered ? '#0a5d63' : 'var(--nh-teal-700)',
        color: '#fff', border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: hovered
          ? '0 12px 28px rgba(11,107,114,0.45)'
          : '0 8px 24px rgba(11,107,114,0.3)',
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.85)',
        transition: 'opacity 280ms ease, transform 280ms ease, background 200ms ease, box-shadow 200ms ease',
        pointerEvents: show ? 'auto' : 'none',
      }}
    >
      <Icon name="arrow-up" size={20} stroke={2} />
    </button>
  );
};

const MobileContactBar = () => (
  <div className="nh-mobile-bar" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 40, background: '#FFFFFF', borderTop: '1px solid var(--nh-line)', gap: 12, boxShadow: '0 -4px 20px rgba(8,23,45,0.10)' }}>
    <a href="tel:0777516000" style={{ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: 'var(--nh-teal-700)', color: '#FFFFFF', borderRadius: 10, textDecoration: 'none', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 14 }}>
      <Icon name="phone" size={17} stroke={2} />
      Gọi ngay
    </a>
    <a href="https://zalo.me/0777516000" target="_blank" rel="noopener noreferrer" style={{ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#0068FF', color: '#FFFFFF', borderRadius: 10, textDecoration: 'none', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 14 }}>
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <defs><mask id="zkm"><rect x="2.5" y="5.4" width="19" height="12.6" rx="3.6" fill="#fff" /><text x="12" y="14.4" textAnchor="middle" fontFamily="Inter,sans-serif" fontWeight="800" fontSize="7.5" letterSpacing="-0.4" fill="#000">Zalo</text></mask></defs>
        <path d="M6.2 14.8v5.4c0 .35.36.5.6.26L10 17.9z" fill="currentColor" />
        <rect x="2.5" y="5.4" width="19" height="12.6" rx="3.6" fill="currentColor" mask="url(#zkm)" />
      </svg>
      Nhắn Zalo
    </a>
  </div>
);

const ScrollReset = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    if (!window.location.hash) window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const MainLayout = () => (
  <>
    <a href="#noi-dung" className="nh-skip-link">Chuyển tới nội dung</a>
    <ScrollReset />
    <Nav />
    <div id="noi-dung" tabIndex={-1} style={{ outline: 'none' }}>
      <Outlet />
    </div>
    <Footer />
    <AIAssistant />
    <ScrollToTop />
    <MobileContactBar />
  </>
);

export default MainLayout;
