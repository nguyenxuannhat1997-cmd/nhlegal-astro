import React from 'react';
import { Container, SectionHeader, Icon } from './primitives';
import { SERVICES } from './data/services';

// Render TĨNH (zero-JS). 7 lĩnh vực lấy từ data dịch vụ (single source of truth) —
// slug & nhãn luôn khớp trang chi tiết. Hover qua CSS class (global.css).
const PracticeAreas = () => (
  <section id="practice" className="nh-section-large" style={{ background: "var(--nh-teal-50)" }}>
    <Container>
      <SectionHeader
        eyebrow="Lĩnh vực chuyên môn"
        title="Bảy mảng thực hành.<br/><em style='font-style:normal;color:var(--nh-gold-500);font-weight:500'>Một</em> tiêu chuẩn quốc tế."
        lede="Dịch vụ pháp lý sát thực tế, bảo vệ tối đa quyền lợi cho cá nhân, hộ gia đình và doanh nghiệp - phạm vi toàn quốc."
        ledeMaxWidth="100%"
      />
      <div className="nh-practice-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
        {SERVICES.map((s) => (
          <PracticeCard
            key={s.slug}
            num={String(s.order).padStart(2, '0')}
            icon={s.icon}
            name={s.labelEn}
            vn={s.label}
            href={`/dich-vu/${s.slug}`}
            body={s.heroDesc}
          />
        ))}
      </div>
      <div style={{ marginTop: 48, textAlign: "center" }}>
        <a href="#contact" className="nh-micro-cta" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 500, color: "var(--nh-teal-700)", textDecoration: "none" }}>
          Chưa rõ cần dịch vụ nào? Tư vấn miễn phí ngay
          <Icon name="arrow-right" size={13} stroke={2} />
        </a>
      </div>
    </Container>
  </section>
);

const PracticeCard = ({ num, icon, name, vn, body, href }) => (
  <a href={href} className="nh-practice-card" style={{ display: "flex", flexDirection: "column", padding: "40px 36px 36px 36px", background: "#FFFFFF", border: "1px solid var(--nh-line)", borderRadius: 20, textDecoration: "none", color: "inherit", minHeight: 320, boxShadow: "var(--shadow-1)", position: "relative", overflow: "hidden" }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 36 }}>
      <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 400, fontSize: 16, color: "var(--nh-gold-600)" }}>{num}.</span>
      <span className="nh-practice-ic" style={{ width: 52, height: 52, borderRadius: 999, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>
        <Icon name={icon} size={22} stroke={1.5} />
      </span>
    </div>
    <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 30, lineHeight: 1.15, letterSpacing: "-0.01em", color: "var(--nh-navy-900)", margin: 0 }}>{vn}</h3>
    <div style={{ marginTop: 4, fontFamily: "var(--font-sans)", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-mute)" }}>{name}</div>
    <p className="nh-hide-on-mobile" style={{ marginTop: 18, fontSize: 14.5, lineHeight: 1.7, color: "var(--fg-2)", flex: 1 }}>{body}</p>
    <div className="nh-hide-on-mobile" style={{ marginTop: 20, alignSelf: "flex-start", position: "relative", display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 500, color: "var(--nh-teal-700)", paddingBottom: 6 }}>
      Xem chi tiết
      <span className="nh-practice-more-ar"><Icon name="arrow-right" size={13} stroke={2} /></span>
      <span aria-hidden className="nh-practice-more-line" style={{ position: "absolute", left: 0, bottom: 0, height: 1.5, background: "var(--nh-teal-700)" }} />
      <span aria-hidden style={{ position: "absolute", left: 0, bottom: 0, height: 1, width: "100%", background: "var(--nh-line)", zIndex: -1 }} />
    </div>
  </a>
);

export default PracticeAreas;
