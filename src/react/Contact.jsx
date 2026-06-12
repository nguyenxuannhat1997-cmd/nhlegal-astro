import React from 'react';
import emailjs from '@emailjs/browser';
import { Container, Eyebrow, Icon } from './primitives';
import { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY } from './emailConfig';

const Contact = () => (
  <section id="contact" className="nh-section-large" style={{ background: "#FFFFFF", color: "var(--nh-navy-900)", position: "relative", overflow: "hidden" }}>
    <style>{`
      .nh-form-box { padding: 40px 44px; }
      @media (max-width: 768px) { .nh-form-box { padding: 24px 20px !important; gap: 16px !important; } .nh-contact-grid { grid-template-columns: 1fr !important; } }
      @media (max-width: 480px) { .nh-contact-name-phone { grid-template-columns: 1fr !important; } }
    `}</style>
    <div aria-hidden style={{ position: "absolute", right: "-10%", top: "-20%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(11,107,114,0.06), transparent 65%)", filter: "blur(40px)", pointerEvents: "none" }} />
    <Container>
      <div className="nh-grid-contact">
        <div>
          <Eyebrow>Đặt lịch tư vấn</Eyebrow>
          <h2 style={{ margin: "20px 0 0 0", fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "clamp(32px, 3.6vw, 52px)", lineHeight: 1.1, letterSpacing: "-0.02em", color: "var(--nh-navy-900)", maxWidth: 520 }}>
            Bắt đầu với{" "}
            <em style={{ fontStyle: "normal", color: "var(--nh-gold-500)", fontWeight: 500, whiteSpace: "nowrap" }}>một cuộc trò chuyện.</em>
          </h2>
          <p style={{ marginTop: 20, fontSize: 16, lineHeight: 1.65, color: "var(--fg-2)", maxWidth: 360, textAlign: "justify" }}>
            Để lại thông tin và luật sư sẽ liên hệ trong thời gian sớm nhất. Tư vấn 24/7 — bảo mật và miễn phí cho buổi đầu.
          </p>
        </div>
        <ContactForm />
      </div>
    </Container>
  </section>
);

const ContactForm = () => {
  const [done, setDone] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [sendError, setSendError] = React.useState('');
  const [errors, setErrors] = React.useState({});
  const [data, setData] = React.useState({ name: "", phone: "", email: "", area: "Ly hôn & Gia đình", message: "", agree: false });
  const u = (k, v) => { setData((d) => ({ ...d, [k]: v })); setErrors((e) => ({ ...e, [k]: "" })); };

  const validate = () => {
    const e = {};
    if (!data.name.trim()) e.name = "Vui lòng nhập họ và tên";
    if (!data.phone.trim()) e.phone = "Vui lòng nhập số điện thoại";
    else if (!/^[0-9+\s]{8,15}$/.test(data.phone.trim())) e.phone = "Số điện thoại không hợp lệ";
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = "Email không hợp lệ";
    if (!data.agree) e.agree = "Vui lòng đồng ý với Chính sách bảo mật để tiếp tục";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    setSendError('');
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { from_name: data.name, phone: data.phone, reply_to: data.email || 'Không cung cấp', area: data.area, message: data.message || 'Không có nội dung' },
        EMAILJS_PUBLIC_KEY,
      );
      setDone(true);
    } catch {
      setSendError('Không thể gửi yêu cầu. Vui lòng gọi trực tiếp: 0777 516 000.');
    } finally {
      setLoading(false);
    }
  };

  if (done) return (
    <div style={{ background: "var(--nh-ivory)", color: "var(--nh-navy-900)", padding: 56, borderRadius: 20, minHeight: 460, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
      <span style={{ width: 64, height: 64, borderRadius: 999, background: "var(--nh-teal-50)", color: "var(--nh-teal-700)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
        <Icon name="check-circle-2" size={28} stroke={1.5} />
      </span>
      <h3 style={{ marginTop: 24, fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 32, color: "var(--nh-navy-900)" }}>Cảm ơn Quý khách.</h3>
      <p style={{ marginTop: 12, maxWidth: 360, fontSize: 15, color: "var(--fg-2)", lineHeight: 1.65 }}>Yêu cầu tư vấn đã được gửi. Luật sư sẽ liên hệ trong thời gian sớm nhất — tư vấn 24/7.</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="nh-form-box" style={{ background: "#FFFFFF", color: "var(--nh-navy-900)", borderRadius: 20, display: "flex", flexDirection: "column", gap: 22, border: "1px solid var(--nh-line)", boxShadow: "0 4px 32px rgba(8,23,45,0.07)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }} className="nh-contact-name-phone">
        <Field label="Họ và tên *" value={data.name} onChange={(v) => u("name", v)} placeholder="Nguyễn Văn A" error={errors.name} />
        <Field label="Số điện thoại *" value={data.phone} onChange={(v) => u("phone", v)} placeholder="0909 000 000" error={errors.phone} />
      </div>
      <Field label="Email" value={data.email} onChange={(v) => u("email", v)} placeholder="ban@email.com" error={errors.email} />
      <SelectField label="Lĩnh vực quan tâm" value={data.area} onChange={(v) => u("area", v)} options={["Ly hôn & Gia đình", "Hợp đồng", "Bất động sản & Thừa kế", "Doanh nghiệp", "Lao động & Nhân sự", "Sở hữu trí tuệ"]} />
      <Field label="Nội dung cần tư vấn" value={data.message} onChange={(v) => u("message", v)} placeholder="Mô tả ngắn gọn vấn đề pháp lý…" multiline />
      <div>
        <label style={{ display: "flex", gap: 10, alignItems: "flex-start", cursor: "pointer" }}>
          <input type="checkbox" checked={data.agree} onChange={(e) => u("agree", e.target.checked)} style={{ marginTop: 2, width: 16, height: 16, accentColor: "var(--nh-teal-700)", flexShrink: 0, cursor: "pointer" }} />
          <span style={{ fontSize: 12.5, lineHeight: 1.55, color: "var(--fg-mute)" }}>
            Tôi đồng ý để N.H Legal liên hệ tư vấn và xử lý thông tin cá nhân theo{" "}
            <a href="/chinh-sach-bao-mat" target="_blank" rel="noopener noreferrer" style={{ color: "var(--nh-teal-700)", textDecoration: "underline", textUnderlineOffset: 2 }}>Chính sách bảo mật</a>.
          </span>
        </label>
        {errors.agree && <span style={{ display: "block", fontSize: 11, color: "#C0392B", marginTop: 6 }}>{errors.agree}</span>}
      </div>
      {sendError && <p style={{ margin: 0, fontSize: 13, color: "#C0392B" }}>{sendError}</p>}
      <button type="submit" disabled={loading} style={{ marginTop: 4, padding: "15px 28px", background: loading ? "var(--fg-mute)" : "var(--nh-teal-700)", color: "#FFFFFF", border: "none", borderRadius: 999, fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 15, letterSpacing: "0.04em", cursor: loading ? "not-allowed" : "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10, transition: "background var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)", boxShadow: "0 8px 24px rgba(11,107,114,0.28)" }}
        onMouseEnter={(e) => { if (!loading) { e.currentTarget.style.background = "var(--nh-teal-600)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(11,107,114,0.38)"; } }}
        onMouseLeave={(e) => { if (!loading) { e.currentTarget.style.background = "var(--nh-teal-700)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(11,107,114,0.28)"; } }}>
        {loading ? "Đang gửi…" : "Gửi yêu cầu tư vấn"}
        {!loading && <Icon name="arrow-right" size={15} stroke={2} />}
      </button>
    </form>
  );
};

const Field = ({ label, value, onChange, placeholder, multiline, error }) => {
  const [focus, setFocus] = React.useState(false);
  const borderColor = error ? "#C0392B" : focus ? "var(--nh-teal-700)" : "var(--nh-line-strong)";
  const props = { value, onChange: (e) => onChange(e.target.value), onFocus: () => setFocus(true), onBlur: () => setFocus(false), placeholder, style: { width: "100%", padding: "11px 0", border: "none", borderBottom: `1.5px solid ${borderColor}`, background: "transparent", fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--nh-navy-900)", outline: "none", resize: "vertical", transition: "border-color var(--dur-base) var(--ease-out)" } };
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: error ? "#C0392B" : "var(--fg-mute)" }}>{label}</span>
      {multiline ? <textarea rows={3} {...props} /> : <input {...props} />}
      {error && <span style={{ fontSize: 11, color: "#C0392B", marginTop: 2 }}>{error}</span>}
    </label>
  );
};

const SelectField = ({ label, value, onChange, options }) => (
  <label style={{ display: "flex", flexDirection: "column", gap: 7 }}>
    <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-mute)" }}>{label}</span>
    <select value={value} onChange={(e) => onChange(e.target.value)} style={{ width: "100%", padding: "11px 0", border: "none", borderBottom: "1.5px solid var(--nh-line-strong)", background: "transparent", fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--nh-navy-900)", outline: "none", appearance: "none" }}>
      {options.map((o) => <option key={o}>{o}</option>)}
    </select>
  </label>
);

export default Contact;
