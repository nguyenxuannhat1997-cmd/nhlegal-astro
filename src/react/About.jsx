import React from 'react';
import { Container, Eyebrow, Icon } from './primitives';

const About = () => (
  <section id="about" className="nh-section-standard" style={{ background: "#FFFFFF" }}>
    <Container>
      <div className="nh-grid-about">
        {/* LEFT */}
        <div className="nh-about-img" style={{ position: "sticky", top: 120 }}>
          <div className="nh-about-img-box" style={{ width: "100%", aspectRatio: "4 / 5", borderRadius: 20, overflow: "hidden", boxShadow: "var(--shadow-3)", background: "var(--nh-navy-900)", position: "relative" }}>
            <img src="/assets/about-office.jpg" alt="Văn phòng luật N.H Legal" width="900" height="600" loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(0.6) contrast(1.05) brightness(0.85)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(8,23,45,0.25) 0%, rgba(8,23,45,0.85) 100%)" }} />
            <div style={{ position: "absolute", left: 28, right: 28, bottom: 28, color: "var(--fg-on-dark)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 400, fontSize: 22, lineHeight: 1.35, marginBottom: 14 }}>"Một tiêu chuẩn nghề. Cho mọi vụ việc."</div>
              <div style={{ fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--nh-gold-500)" }}>Triết lý hành nghề</div>
            </div>
          </div>
          <div className="nh-hide-on-mobile" style={{ marginTop: 32, padding: 28, background: "var(--nh-ivory)", borderRadius: 16 }}>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-mute)", marginBottom: 20 }}>Cam kết của chúng tôi</div>
            {[
              { icon: "shield-check", text: "Bảo mật thông tin tuyệt đối" },
              { icon: "message-circle", text: "Tư vấn trung thực, rõ ràng về phí" },
              { icon: "clock", text: "Tư vấn 24/7 — mọi ngày trong tuần" },
              { icon: "handshake", text: "Đồng hành đến khi vụ việc hoàn tất" },
            ].map((c, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < 3 ? "1px solid var(--nh-line)" : "none" }}>
                <span style={{ color: "var(--nh-teal-700)", display: "inline-flex", flexShrink: 0 }}>
                  <Icon name={c.icon} size={16} stroke={1.5} />
                </span>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--nh-navy-900)" }}>{c.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div>
          <Eyebrow>Về N.H Legal</Eyebrow>
          <h2 style={{ margin: "28px 0 0 0", fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "clamp(38px, 4.2vw, 60px)", lineHeight: 1.08, letterSpacing: "-0.015em", color: "var(--nh-navy-900)", maxWidth: 720 }}>
            Tư duy chiến lược.<br />
            <em style={{ fontStyle: "normal", color: "var(--nh-gold-500)", fontWeight: 500 }}>Tiêu chuẩn quốc tế.</em>
          </h2>
          <p style={{ marginTop: 36, fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 22, lineHeight: 1.55, color: "var(--nh-navy-800)", textAlign: "justify", maxWidth: 620 }}>
            N.H Legal là công ty luật được thành lập với sứ mệnh mang dịch vụ pháp lý chuyên nghiệp đến gần hơn với cá nhân và doanh nghiệp nhỏ - nơi pháp lý không còn xa vời mà trở thành công cụ bảo vệ quyền lợi thiết thực.
          </p>
          <p style={{ marginTop: 22, fontFamily: "var(--font-sans)", fontSize: 16, lineHeight: 1.75, color: "var(--fg-2)", textAlign: "justify", maxWidth: 600 }}>
            Chúng tôi tin rằng mỗi khách hàng - dù là cá nhân hay doanh nghiệp - đều xứng đáng được bảo vệ đúng mức. Mỗi tư vấn được xây dựng từ sự lắng nghe thực sự, am tường pháp luật và cam kết đồng hành đến cùng.
          </p>
          <div className="nh-about-pillars" style={{ marginTop: 56, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, maxWidth: 620 }}>
            {[
              { t: "Chuyên môn sâu rộng", b: "Ly hôn · Hợp đồng · Bất động sản · Doanh nghiệp · Lao động · Sở hữu trí tuệ." },
              { t: "Tư duy chiến lược",  b: "Giải pháp pháp lý gắn liền với mục tiêu kinh doanh dài hạn." },
              { t: "Giải pháp tối ưu",   b: "Cân bằng giữa rủi ro pháp lý và hiệu quả thương mại." },
              { t: "Bảo mật tuyệt đối",  b: "Quy trình bảo mật chuẩn quốc tế cho từng vụ việc." },
            ].map((p) => (
              <div key={p.t} style={{ paddingTop: 20, borderTop: "1px solid var(--nh-line)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, color: "var(--nh-teal-700)" }}>
                  <span style={{ display: "inline-flex", fontSize: 18 }}><Icon name="check-circle-2" size={20} stroke={1.5} /></span>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 600, color: "var(--nh-navy-900)" }}>{p.t}</div>
                </div>
                <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: 13, lineHeight: 1.7, color: "var(--fg-mute)" }}>{p.b}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 56, display: "flex", gap: 28, alignItems: "center", flexWrap: "wrap" }}>
            <a href="#contact" className="nh-micro-cta" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 500, color: "var(--nh-teal-700)", textDecoration: "none" }}>
              Đặt lịch tư vấn miễn phí
              <Icon name="arrow-right" size={13} stroke={2} />
            </a>
          </div>
        </div>
      </div>
    </Container>
  </section>
);

export default About;
