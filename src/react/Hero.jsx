import React from 'react';
import { Container, Eyebrow, PrimaryButton, GhostButton, Icon } from './primitives';

const HeroSig = ({ icon, label }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
    <span style={{ color: "var(--nh-gold-500)", display: "inline-flex" }}>
      <Icon name={icon} size={14} stroke={1.5} />
    </span>
    {label}
  </div>
);

const HeroBackdrop = () => (
  <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 1, overflow: "hidden", pointerEvents: "none" }}>
    {/* Ảnh nền trang trí: dùng CSS background (không phải <img>) để KHÔNG bị tính là phần tử LCP.
        Giao diện y hệt bản <img objectFit:cover>. */}
    <div style={{ position: "absolute", inset: 0, backgroundImage: "url(/assets/hero-bg.jpg)", backgroundSize: "cover", backgroundPosition: "right center", opacity: 0.30, filter: "grayscale(1) contrast(1.05) brightness(0.9)" }} />
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, #063E45 0%, rgba(6,62,69,0.92) 42%, rgba(6,62,69,0.55) 100%)" }} />
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(6,62,69,0.5) 0%, rgba(6,62,69,0) 24%, rgba(17,24,27,0) 72%, rgba(17,24,27,0.85) 100%)" }} />
    <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "120px 100%", opacity: 0.7 }} />
    <div style={{ position: "absolute", right: "-10%", top: "-14%", width: 720, height: 720, borderRadius: "50%", background: "radial-gradient(circle, rgba(21,147,156,0.18), transparent 62%)", filter: "blur(30px)" }} />
  </div>
);

const Hero = () => (
  <section className="nh-hero-section" style={{ position: "relative", background: "var(--gradient-dark)", color: "var(--fg-on-dark)", paddingTop: 160, paddingBottom: 96, overflow: "hidden", minHeight: 720 }}>
    <HeroBackdrop />
    <Container>
      <div style={{ position: "relative", zIndex: 2, maxWidth: 1080 }}>
        <div className="nh-hide-on-mobile">
          <Eyebrow light>N.H Legal</Eyebrow>
        </div>
        <h1 style={{ margin: "28px 0 0 0", fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "clamp(48px, 6.5vw, 88px)", lineHeight: 1.04, letterSpacing: "-0.015em", color: "var(--fg-on-dark)", maxWidth: 1000 }}>
          Uy tín kiến tạo<br />
          <em className="nh-hero-accent">giá trị</em>{" "}vững bền.
        </h1>
        <p className="nh-hide-on-mobile" style={{ margin: "28px 0 0 0", maxWidth: 580, fontFamily: "var(--font-sans)", fontSize: 18, lineHeight: 1.7, color: "var(--fg-on-dark-mute)", textAlign: "justify" }}>
          Uy tín dẫn lối, trí tuệ pháp lý kiến tạo giá trị, bảo vệ tối đa quyền và lợi ích hợp pháp của khách hàng.
        </p>
        <div style={{ display: "flex", gap: 16, marginTop: 36, alignItems: "center", flexWrap: "wrap" }}>
          <PrimaryButton href="#contact">Đặt lịch tư vấn ngay</PrimaryButton>
          <GhostButton href="#about" light>Về N.H Legal</GhostButton>
        </div>
        <div className="nh-hide-on-mobile" style={{ marginTop: 64, display: "flex", gap: 40, flexWrap: "wrap", color: "var(--fg-on-dark-mute)", fontSize: 13, letterSpacing: "0.04em" }}>
          <HeroSig icon="map-pin" label="TP. Hồ Chí Minh" />
          <HeroSig icon="phone" label="0777 516 000" />
          <HeroSig icon="mail" label="contact@nhlegal.com.vn" />
        </div>
      </div>
    </Container>
    <div className="nh-hide-on-mobile" style={{ position: "absolute", left: "50%", bottom: 28, transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: "var(--fg-on-dark-mute)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", zIndex: 2 }}>
      <span>Khám phá</span>
      <span style={{ display: "inline-block", width: 1, height: 32, background: "linear-gradient(180deg, rgba(247,245,242,0.5), transparent)", animation: "nh-scroll-bounce 1.8s ease-in-out infinite" }} />
    </div>
    <style>{`
      @keyframes nh-scroll-bounce {
        0%, 100% { transform: translateY(0); opacity: 0.5; }
        50%       { transform: translateY(8px); opacity: 1; }
      }
    `}</style>
  </section>
);

export default Hero;
