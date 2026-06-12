import React from 'react';
import { Container, Eyebrow, PrimaryButton, Icon } from './primitives';

const AISection = () => (
  <section id="ai" className="nh-section-large" style={{ background: "var(--gradient-dark)", color: "var(--fg-on-dark)", position: "relative", overflow: "hidden" }}>
    <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", width: 800, height: 800, borderRadius: "50%", background: "radial-gradient(circle, rgba(11,107,114,0.22), transparent 60%)", filter: "blur(60px)", pointerEvents: "none" }} />
    <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(90deg, rgba(248,248,246,0.04) 1px, transparent 1px)", backgroundSize: "120px 100%", pointerEvents: "none" }} />
    <Container>
      <div className="nh-grid-ai">
        <div>
          <Eyebrow light>N.H Legal · Intelligence</Eyebrow>
          <h2 style={{ margin: "28px 0 0 0", fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "clamp(38px, 4.4vw, 60px)", lineHeight: 1.08, letterSpacing: "-0.015em", color: "var(--fg-on-dark)", maxWidth: 580 }}>
            Trí tuệ pháp lý.<br />
            <em style={{ fontStyle: "normal", color: "var(--nh-gold-500)", fontWeight: 500 }}>Có lúc, có nơi.</em>
          </h2>
          <p style={{ marginTop: 28, maxWidth: 520, fontSize: 18, lineHeight: 1.65, color: "var(--fg-on-dark-mute)", textAlign: "justify" }}>
            AI Legal Assistant - trợ lý pháp lý của N.H Legal, hỗ trợ Quý khách tra cứu nhanh các vấn đề pháp lý sơ bộ trước khi làm việc trực tiếp với luật sư.
          </p>
          <ul style={{ marginTop: 36, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 16, maxWidth: 520 }}>
            {[
              { i: "shield-check", t: "Bảo mật doanh nghiệp",       b: "Mọi cuộc trò chuyện được mã hóa và không lưu trữ thông tin nhận dạng." },
              { i: "library",      t: "Cơ sở pháp luật Việt Nam",   b: "Trả lời dựa trên hệ thống văn bản pháp luật Việt Nam được cập nhật liên tục." },
              { i: "handshake",    t: "Bàn giao mượt mà",            b: "Chỉ một bước để chuyển cuộc trò chuyện sang một luật sư N.H Legal." },
            ].map((it) => (
              <li key={it.t} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <span style={{ width: 40, height: 40, borderRadius: 999, background: "rgba(11, 107, 114, 0.22)", color: "var(--nh-gold-500)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
                  <Icon name={it.i} size={20} stroke={1.5} />
                </span>
                <div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 600, color: "var(--fg-on-dark)" }}>{it.t}</div>
                  <div style={{ marginTop: 4, fontSize: 13, lineHeight: 1.65, color: "var(--fg-on-dark-mute)", maxWidth: 460 }}>{it.b}</div>
                </div>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: 44, display: "flex", gap: 16, alignItems: "center" }}>
            <PrimaryButton light href="#" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('nh:open-ai-chat')); }}>Trải nghiệm AI Assistant</PrimaryButton>
          </div>
        </div>
        <AssistantMock />
      </div>
    </Container>
  </section>
);

const AssistantMock = () => (
  <div className="nh-ai-mock" style={{ background: "rgba(248, 248, 246, 0.04)", backdropFilter: "blur(18px) saturate(1.2)", WebkitBackdropFilter: "blur(18px) saturate(1.2)", border: "1px solid rgba(248, 248, 246, 0.14)", borderRadius: 24, padding: 28, position: "relative", overflow: "hidden", boxShadow: "var(--shadow-3)" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
      <span style={{ width: 44, height: 44, borderRadius: 999, background: "var(--nh-teal-700)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#FFFFFF", fontSize: 22 }}>
        <Icon name="sparkles" size={20} stroke={1.5} />
      </span>
      <div>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 22, color: "var(--fg-on-dark)", letterSpacing: "-0.005em" }}>AI Legal Assistant</div>
        <div style={{ fontSize: 12, color: "var(--fg-on-dark-mute)", marginTop: 2 }}>Trực tuyến · phản hồi tức thì</div>
      </div>
    </div>
    {/* Hội thoại minh hoạ giao diện — KHÔNG đưa tư vấn pháp lý cụ thể, thời hạn
        hay trích dẫn điều luật (chờ luật sư biên soạn kịch bản — MIGRATION-TODO [PH-3]). */}
    <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 22 }}>
      <Bubble side="ai">Xin chào Quý khách! Tôi là trợ lý pháp lý của N.H Legal.</Bubble>
      <Bubble side="ai">Quý khách có thể chọn một chủ đề bên dưới hoặc nhập câu hỏi để được hướng dẫn sơ bộ trước khi làm việc với luật sư.</Bubble>
    </div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 22 }}>
      {["Thành lập startup", "Luật doanh nghiệp 2020", "Tranh chấp hợp đồng", "Bảo hộ nhãn hiệu"].map((p) => (
        <span key={p} style={{ padding: "8px 14px", background: "rgba(248,248,246,0.06)", border: "1px solid rgba(248,248,246,0.15)", borderRadius: 999, fontSize: 12, color: "var(--fg-on-dark)", letterSpacing: "0.02em" }}>{p}</span>
      ))}
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", background: "rgba(8, 23, 45, 0.5)", border: "1px solid rgba(248,248,246,0.18)", borderRadius: 999 }}>
      <input placeholder="Nhập câu hỏi pháp lý của Quý khách…" style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "var(--fg-on-dark)", fontFamily: "var(--font-sans)", fontSize: 14 }} />
      <button style={{ width: 34, height: 34, borderRadius: 999, background: "var(--nh-gold-500)", color: "var(--nh-navy-900)", border: "none", display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
        <Icon name="arrow-up" size={14} stroke={2.4} />
      </button>
    </div>
    <div style={{ marginTop: 20, paddingTop: 18, borderTop: "1px solid rgba(248,248,246,0.12)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ width: 36, height: 36, borderRadius: 999, background: "rgba(184,155,94,0.18)", color: "var(--nh-gold-500)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon name="scale" size={18} stroke={1.5} />
        </span>
        <div>
          <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, color: "var(--fg-on-dark)", lineHeight: 1.3 }}>Đội ngũ Chuyên gia Chiến lược N.H Legal</div>
          <div style={{ fontSize: 11.5, color: "var(--fg-on-dark-mute)", marginTop: 2 }}>Sẵn sàng tiếp nhận khi cần tư vấn chuyên sâu</div>
        </div>
      </div>
      <a href="#contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, flexShrink: 0, fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 500, letterSpacing: "0.01em", color: "var(--nh-gold-500)", textDecoration: "none", paddingBottom: 2, borderBottom: "1px solid transparent", transition: "border-color 320ms var(--ease-out)" }}
         onMouseEnter={(e) => (e.currentTarget.style.borderBottomColor = "var(--nh-gold-500)")}
         onMouseLeave={(e) => (e.currentTarget.style.borderBottomColor = "transparent")}>
        Đặt lịch tư vấn với Luật sư
        <Icon name="arrow-right" size={13} stroke={2} />
      </a>
    </div>
  </div>
);

const Bubble = ({ side, children, cite }) => {
  const isUser = side === "user";
  return (
    <div style={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start" }}>
      <div style={{ maxWidth: "84%", padding: cite ? "8px 14px" : "12px 16px", background: isUser ? "var(--nh-teal-700)" : (cite ? "rgba(200, 169, 107, 0.14)" : "rgba(248,248,246,0.08)"), color: isUser ? "#FFFFFF" : (cite ? "var(--nh-gold-500)" : "var(--fg-on-dark)"), border: cite ? "1px solid rgba(200, 169, 107, 0.3)" : "1px solid transparent", borderRadius: 14, fontSize: cite ? 12 : 14, lineHeight: 1.55, fontStyle: cite ? "italic" : "normal" }}>
        {children}
      </div>
    </div>
  );
};

export default AISection;
