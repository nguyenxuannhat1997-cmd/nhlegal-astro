import React from 'react';
import { Container, Icon, LogoLockup } from './primitives';

// Footer render TĨNH (zero-JS). Hover chuyển sang CSS class (global.css).
// Hash-link dùng dạng "/#x" để điều hướng full-page (MPA) từ mọi trang.
const FOOT = {
  white:  "#FFFFFF",
  sec:    "#D4D9DD",
  mute:   "#AAB0B6",
  gold:   "#B89B5E",
  goldHi: "#D8BC84",
  line:   "rgba(255,255,255,0.08)",
};

const toHref = (href) => (href && href.startsWith('#') ? '/' + href : href);

const SilkDrape = () => (
  <svg aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 1440 680"
       style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
    <defs>
      <filter id="foldSoft" x="-25%" y="-25%" width="150%" height="150%"><feGaussianBlur stdDeviation="11" /></filter>
      <filter id="seamBlur" x="-35%" y="-35%" width="170%" height="170%"><feGaussianBlur stdDeviation="30" /></filter>
      <filter id="sheenBlur" x="-25%" y="-25%" width="150%" height="150%"><feGaussianBlur stdDeviation="4" /></filter>
      <radialGradient id="petalHi" cx="40%" cy="34%" r="72%">
        <stop offset="0" stopColor="#3CB2B8" />
        <stop offset="0.5" stopColor="#13727A" />
        <stop offset="0.85" stopColor="#093C43" />
        <stop offset="1" stopColor="#072F36" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="petalMid" cx="44%" cy="40%" r="70%">
        <stop offset="0" stopColor="#2C9AA1" />
        <stop offset="0.55" stopColor="#0D5A62" />
        <stop offset="0.9" stopColor="#072F36" />
        <stop offset="1" stopColor="#06262D" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="petalLow" cx="46%" cy="44%" r="70%">
        <stop offset="0" stopColor="#228891" />
        <stop offset="0.55" stopColor="#0A464D" />
        <stop offset="1" stopColor="#06222A" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="foldBand" x1="0" y1="0" x2="0.1" y2="1">
        <stop offset="0" stopColor="#2EA0A7" />
        <stop offset="0.5" stopColor="#0C545C" />
        <stop offset="1" stopColor="#062A30" />
      </linearGradient>
    </defs>
    <g filter="url(#foldSoft)" opacity="0.82">
      <path d="M-180 380 C 280 240 560 510 880 450 C 1180 394 1340 250 1680 350 L 1680 600 C 1340 700 1180 520 880 580 C 560 638 280 660 -180 540 Z" fill="url(#foldBand)" />
      <path d="M-200 780 C 240 790 540 650 580 380 C 606 196 450 70 190 96 C-10 116 -200 250 -200 470 Z" fill="url(#petalLow)" />
      <path d="M1680 -160 C 1200 -160 940 30 900 300 C 868 520 1030 660 1320 660 C 1520 660 1680 520 1680 300 Z" fill="url(#petalHi)" />
      <path d="M-200 -160 C 120 -160 360 -10 420 220 C 470 410 360 540 150 540 C -40 540 -200 400 -200 200 Z" fill="url(#petalMid)" opacity="0.85" />
    </g>
    <g filter="url(#seamBlur)" fill="none" strokeLinecap="round" opacity="0.6">
      <path d="M820 470 C 1010 430 1140 300 1180 120" stroke="rgba(3,16,20,0.7)" strokeWidth="46" />
      <path d="M-180 540 C 260 660 540 640 760 560" stroke="rgba(2,12,16,0.6)" strokeWidth="48" />
      <path d="M520 360 C 360 300 200 240 60 260" stroke="rgba(2,12,16,0.55)" strokeWidth="42" />
    </g>
    <g filter="url(#sheenBlur)" fill="none" strokeLinecap="round">
      <path d="M940 300 C 980 90 1180 -40 1460 0" stroke="rgba(196,242,242,0.20)" strokeWidth="11" />
      <path d="M580 380 C 600 200 470 80 230 100" stroke="rgba(176,232,232,0.15)" strokeWidth="9" />
      <path d="M-180 380 C 280 244 560 510 880 452" stroke="rgba(150,224,224,0.10)" strokeWidth="8" />
    </g>
  </svg>
);

const FooterColTitle = ({ children }) => (
  <div style={{ marginBottom: 26 }}>
    <h4 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 21, letterSpacing: "0.01em", color: FOOT.white, lineHeight: 1.1 }}>{children}</h4>
    <span style={{ display: "block", width: 26, height: 1.5, background: FOOT.gold, marginTop: 14, borderRadius: 2 }} />
  </div>
);

const FooterLinkList = ({ items }) => (
  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
    {items.map((l) => (
      <li key={l.label}><a href={toHref(l.href)} className="nh-foot-link">{l.label}</a></li>
    ))}
  </ul>
);

const BRAND_SVG = {
  zalo: (
    <svg viewBox="0 0 24 24" width="23" height="23" aria-hidden="true">
      <defs>
        <mask id="zaloKnock">
          <rect x="2.5" y="5.4" width="19" height="12.6" rx="3.6" fill="#fff" />
          <text x="12" y="14.4" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="7.5" letterSpacing="-0.4" fill="#000">Zalo</text>
        </mask>
      </defs>
      <path d="M6.2 14.8v5.4c0 .35.36.5.6.26L10 17.9z" fill="currentColor" />
      <rect x="2.5" y="5.4" width="19" height="12.6" rx="3.6" fill="currentColor" mask="url(#zaloKnock)" />
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M13 4v11.6a3.3 3.3 0 1 1-3.3-3.3c.4 0 .8.06 1.1.17" />
      <path d="M13 4a4.7 4.7 0 0 0 4.6 4.3" />
    </svg>
  ),
};

const SocialIcon = ({ name, label, href }) => {
  const inner = BRAND_SVG[name] || <Icon name={name} size={19} stroke={1.6} />;
  if (!href) return <span aria-label={label || name} className="nh-foot-social" style={{ opacity: 0.5 }}>{inner}</span>;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label || name} className="nh-foot-social">{inner}</a>
  );
};

const ContactRow = ({ icon, label, value, href }) => (
  <li style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
    <span style={{ color: FOOT.gold, marginTop: 2, flexShrink: 0, lineHeight: 0 }}>
      <Icon name={icon} size={18} stroke={1.6} />
    </span>
    <div>
      {label ? <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: FOOT.mute, marginBottom: 4 }}>{label}</div> : null}
      {href ? (
        <a href={href} className="nh-foot-contact-link">{value}</a>
      ) : (
        <div style={{ color: FOOT.sec, fontSize: 15, lineHeight: 1.55 }}>{value}</div>
      )}
    </div>
  </li>
);

// Newsletter: Phase 1 render TĨNH → CTA trỏ về form liên hệ (#contact).
// (EmailJS cần JS; sẽ khôi phục đăng ký bản tin qua n8n/island ở Phase 3.)
const Newsletter = () => (
  <div className="nh-footer-newsletter">
    <FooterColTitle>Đăng ký nhận tin</FooterColTitle>
    <p style={{ margin: "0 0 20px", color: FOOT.mute, fontSize: 14, lineHeight: 1.6, maxWidth: 280 }}>
      Nhận bản tin pháp lý &amp; phân tích chiến lược hằng tháng từ đội ngũ N.H Legal.
    </p>
    <a href="/#contact" className="nh-btn nh-btn-primary" style={{ background: FOOT.gold, color: "#1E252B" }}>
      <span>Đăng ký tư vấn</span>
      <span className="nh-btn-ar"><Icon name="arrow-right" size={16} stroke={2} /></span>
    </a>
  </div>
);

const Footer = () => (
  <footer style={{ position: "relative", overflow: "hidden", background: "linear-gradient(135deg, #063E45 0%, #0A5258 40%, #11181B 100%)", color: FOOT.white }}>
    <div style={{ position: "relative" }}>
      <Container>
        <div className="nh-grid-footer">
          <div>
            <div style={{ display: "inline-flex", alignItems: "center" }}>
              <LogoLockup light={true} size="lg" />
            </div>
            <p style={{ marginTop: 24, fontSize: 14, lineHeight: 1.7, color: FOOT.mute, maxWidth: 300, textAlign: "justify" }}>
              Tư vấn pháp lý chiến lược cho cá nhân, SME và startup - hoạt động toàn quốc từ TP. Hồ Chí Minh.
            </p>
            <div style={{ marginTop: 30, display: "flex", gap: 12 }}>
              {[
                { name: "facebook", label: "Facebook", href: "https://www.facebook.com/profile.php?id=61590107501121" },
                { name: "instagram", label: "Instagram", href: "https://www.instagram.com/n.h_legal/" },
                { name: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/legal-l-h-01b792413/" },
                { name: "tiktok", label: "TikTok", href: "https://www.tiktok.com/@n.h_legal" },
                { name: "youtube", label: "YouTube", href: "https://www.youtube.com/channel/UCYND94KQV4WPEQQtLYWid9w" },
                { name: "zalo", label: "Zalo", href: "https://zalo.me/0777516000" },
              ].map((s) => <SocialIcon key={s.name} name={s.name} label={s.label} href={s.href} />)}
            </div>
          </div>
          <div>
            <FooterColTitle>Dịch vụ</FooterColTitle>
            <FooterLinkList items={[
              { label: "Doanh nghiệp & Đầu tư",      href: "/dich-vu/doanh-nghiep-dau-tu" },
              { label: "Sở hữu trí tuệ & Nhãn hiệu", href: "/dich-vu/so-huu-tri-tue-nhan-hieu" },
              { label: "Hợp đồng & Giao dịch",       href: "/dich-vu/hop-dong-giao-dich" },
              { label: "Đất đai & Nhà ở",            href: "/dich-vu/dat-dai-nha-o" },
              { label: "Thừa kế & Di chúc",          href: "/dich-vu/thua-ke-di-chuc" },
              { label: "Hôn nhân & Gia đình",        href: "/dich-vu/hon-nhan-gia-dinh" },
              { label: "Lao động & Nhân sự",         href: "/dich-vu/lao-dong-nhan-su" },
            ]} />
          </div>
          <div>
            <FooterColTitle>Liên kết</FooterColTitle>
            <FooterLinkList items={[
              { label: "Giới thiệu", href: "/gioi-thieu" },
              { label: "Bảng giá dịch vụ", href: "/bang-gia" },
              { label: "Tin tức", href: "/bai-viet" },
              { label: "Tài liệu & Biểu mẫu", href: "/tai-lieu" },
              { label: "Liên hệ", href: "#contact" },
            ]} />
          </div>
          <div>
            <FooterColTitle>Liên hệ</FooterColTitle>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 18 }}>
              <ContactRow icon="map-pin" value="TP. Hồ Chí Minh" />
              <ContactRow icon="phone" label="Hotline" value="0777 516 000" href="tel:0777516000" />
              <ContactRow icon="mail" label="Email" value="contact@nhlegal.com.vn" href="mailto:contact@nhlegal.com.vn" />
              <ContactRow icon="clock" label="Tư vấn" value="24/7 — mọi ngày trong tuần" />
            </ul>
          </div>
          <Newsletter />
        </div>
      </Container>
      <div style={{ borderTop: `1px solid ${FOOT.line}` }}>
        <Container>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap", padding: "26px 0" }}>
            <div style={{ fontSize: 13, color: FOOT.mute }}>© 2026 Công ty Luật TNHH Một Thành Viên N.H Legal. All rights reserved.</div>
            <div style={{ display: "flex", gap: 32 }}>
              {[
                { label: "Chính sách bảo mật", href: "/chinh-sach-bao-mat" },
                { label: "Điều khoản sử dụng", href: "/dieu-khoan-su-dung" },
              ].map((l) => (
                <a key={l.label} href={l.href} className="nh-foot-policy">{l.label}</a>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </div>
  </footer>
);

export default Footer;
