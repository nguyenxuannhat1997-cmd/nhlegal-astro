import React from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { Container, Icon } from '../primitives';
import SEOMeta from '../SEOMeta';
import { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY } from '../emailConfig';

/*
 * TODO (chờ nội dung thật): Thay danh sách dưới bằng biểu mẫu thật của N.H Legal.
 * - Đặt file vào public/tai-lieu/<tên-file> rồi gán fileUrl: '/tai-lieu/<tên-file>'.
 * - Khi fileUrl != null: sau khi khách để lại thông tin sẽ được tải trực tiếp.
 * - Khi fileUrl == null: hệ thống thu thập thông tin và hẹn gửi qua email/Zalo (lead funnel).
 */
const TEMPLATES = [
  { icon: 'heart-crack', cat: 'Ly hôn & Gia đình', title: 'Đơn thuận tình ly hôn', desc: 'Mẫu đơn yêu cầu công nhận thuận tình ly hôn kèm hướng dẫn điền.', fileUrl: null },
  { icon: 'scroll',      cat: 'Hợp đồng',            title: 'Hợp đồng đặt cọc mua bán nhà đất', desc: 'Mẫu hợp đồng đặt cọc an toàn, có điều khoản bảo vệ bên mua.', fileUrl: null },
  { icon: 'briefcase',   cat: 'Doanh nghiệp',        title: 'Biên bản họp Hội đồng thành viên', desc: 'Mẫu biên bản họp HĐTV công ty TNHH đúng quy định LDN 2020.', fileUrl: null },
  { icon: 'users',       cat: 'Lao động',            title: 'Hợp đồng lao động', desc: 'Mẫu hợp đồng lao động chuẩn theo BLLĐ 2019.', fileUrl: null },
  { icon: 'building-2',  cat: 'Bất động sản',        title: 'Giấy ủy quyền', desc: 'Mẫu giấy ủy quyền cá nhân dùng trong giao dịch nhà đất.', fileUrl: null },
  { icon: 'scale',       cat: 'Tố tụng',             title: 'Đơn khởi kiện dân sự', desc: 'Mẫu đơn khởi kiện gửi Tòa án nhân dân có thẩm quyền.', fileUrl: null },
];

const LeadModal = ({ tpl, onClose }) => {
  const [data, setData] = React.useState({ name: '', phone: '', email: '', agree: false });
  const [errors, setErrors] = React.useState({});
  const [status, setStatus] = React.useState('idle'); // idle | loading | done | error
  const u = (k, v) => { setData((d) => ({ ...d, [k]: v })); setErrors((e) => ({ ...e, [k]: '' })); };

  const submit = async (e) => {
    e.preventDefault();
    const er = {};
    if (!data.name.trim()) er.name = 'Vui lòng nhập họ tên';
    if (!/^[0-9+\s]{8,15}$/.test(data.phone.trim())) er.phone = 'Số điện thoại không hợp lệ';
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) er.email = 'Email không hợp lệ';
    if (!data.agree) er.agree = 'Vui lòng đồng ý Chính sách bảo mật';
    if (Object.keys(er).length) { setErrors(er); return; }
    setStatus('loading');
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID,
        { from_name: data.name, phone: data.phone, reply_to: data.email || 'Không cung cấp', area: 'Tải tài liệu', message: `Yêu cầu tải biểu mẫu: ${tpl.title}` },
        EMAILJS_PUBLIC_KEY);
      setStatus('done');
      if (tpl.fileUrl) window.open(tpl.fileUrl, '_blank', 'noopener');
    } catch { setStatus('error'); }
  };

  return (
    <div role="dialog" aria-modal="true" onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(8,23,45,0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div onClick={(e) => e.stopPropagation()}
        style={{ width: '100%', maxWidth: 440, background: '#FFFFFF', borderRadius: 20, padding: 'clamp(24px,4vw,36px)', boxShadow: 'var(--shadow-3)', position: 'relative' }}>
        <button onClick={onClose} aria-label="Đóng" style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--fg-mute)' }}>
          <Icon name="x" size={20} stroke={2} />
        </button>
        {status === 'done' ? (
          <div style={{ textAlign: 'center', padding: '12px 0' }}>
            <span style={{ width: 56, height: 56, borderRadius: 999, background: 'var(--nh-teal-50)', color: 'var(--nh-teal-700)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="check-circle-2" size={26} stroke={1.5} />
            </span>
            <h3 style={{ margin: '18px 0 0', fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 24, color: 'var(--nh-navy-900)' }}>Cảm ơn bạn!</h3>
            <p style={{ marginTop: 10, fontSize: 14.5, lineHeight: 1.6, color: 'var(--fg-2)' }}>
              {tpl.fileUrl ? 'Tài liệu đang được tải xuống. Nếu không thấy, vui lòng kiểm tra lại trình duyệt.' : 'N.H Legal sẽ gửi biểu mẫu tới bạn qua email/Zalo trong thời gian sớm nhất.'}
            </p>
          </div>
        ) : (
          <>
            <div style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--nh-teal-700)', fontWeight: 600 }}>Nhận biểu mẫu</div>
            <h3 style={{ margin: '8px 0 4px', fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 22, lineHeight: 1.25, color: 'var(--nh-navy-900)' }}>{tpl.title}</h3>
            <p style={{ margin: '0 0 20px', fontSize: 13.5, lineHeight: 1.6, color: 'var(--fg-mute)' }}>Để lại thông tin để nhận tài liệu — bảo mật tuyệt đối.</p>
            <form onSubmit={submit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <ModalField label="Họ và tên *" value={data.name} onChange={(v) => u('name', v)} error={errors.name} placeholder="Nguyễn Văn A" />
              <ModalField label="Số điện thoại *" value={data.phone} onChange={(v) => u('phone', v)} error={errors.phone} placeholder="0909 000 000" />
              <ModalField label="Email" value={data.email} onChange={(v) => u('email', v)} error={errors.email} placeholder="ban@email.com" />
              <label style={{ display: 'flex', gap: 9, alignItems: 'flex-start', cursor: 'pointer' }}>
                <input type="checkbox" checked={data.agree} onChange={(e) => u('agree', e.target.checked)} style={{ marginTop: 2, width: 15, height: 15, accentColor: 'var(--nh-teal-700)', flexShrink: 0 }} />
                <span style={{ fontSize: 12, lineHeight: 1.5, color: 'var(--fg-mute)' }}>
                  Tôi đồng ý theo <a href="/chinh-sach-bao-mat" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--nh-teal-700)', textDecoration: 'underline' }}>Chính sách bảo mật</a>.
                </span>
              </label>
              {errors.agree && <span style={{ fontSize: 11, color: '#C0392B', marginTop: -6 }}>{errors.agree}</span>}
              {status === 'error' && <span style={{ fontSize: 12, color: '#C0392B' }}>Có lỗi xảy ra. Vui lòng gọi 0777 516 000.</span>}
              <button type="submit" disabled={status === 'loading'}
                style={{ marginTop: 4, padding: '13px 24px', background: status === 'loading' ? 'var(--fg-mute)' : 'var(--nh-teal-700)', color: '#FFFFFF', border: 'none', borderRadius: 999, fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 14, cursor: status === 'loading' ? 'not-allowed' : 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                {status === 'loading' ? 'Đang gửi…' : 'Nhận tài liệu'}
                {status !== 'loading' && <Icon name="arrow-right" size={15} stroke={2} />}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

const ModalField = ({ label, value, onChange, placeholder, error }) => (
  <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: error ? '#C0392B' : 'var(--fg-mute)' }}>{label}</span>
    <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
      style={{ width: '100%', boxSizing: 'border-box', padding: '11px 14px', borderRadius: 10, border: `1.5px solid ${error ? '#C0392B' : 'var(--nh-line-strong)'}`, fontFamily: 'var(--font-sans)', fontSize: 15, color: 'var(--nh-navy-900)', outline: 'none' }} />
    {error && <span style={{ fontSize: 11, color: '#C0392B' }}>{error}</span>}
  </label>
);

const TemplateCard = ({ tpl, onGet }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: 'flex', flexDirection: 'column', padding: 28, background: '#FFFFFF', border: `1.5px solid ${hover ? 'rgba(11,107,114,0.22)' : 'var(--nh-line)'}`, borderRadius: 18, boxShadow: hover ? 'var(--shadow-2)' : 'var(--shadow-1)', transition: 'all 320ms var(--ease-out)' }}>
      <span style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--nh-teal-50)', color: 'var(--nh-teal-700)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
        <Icon name={tpl.icon} size={22} stroke={1.5} />
      </span>
      <div style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--nh-teal-700)', fontWeight: 600 }}>{tpl.cat}</div>
      <h3 style={{ margin: '8px 0 0', fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 20, lineHeight: 1.3, color: 'var(--nh-navy-900)' }}>{tpl.title}</h3>
      <p style={{ margin: '10px 0 20px', fontSize: 14, lineHeight: 1.6, color: 'var(--fg-2)', flex: 1 }}>{tpl.desc}</p>
      <button onClick={() => onGet(tpl)}
        style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 18px', background: 'transparent', color: 'var(--nh-teal-700)', border: '1.5px solid var(--nh-teal-700)', borderRadius: 999, fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 13.5, cursor: 'pointer', transition: 'all 220ms var(--ease-out)' }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--nh-teal-700)'; e.currentTarget.style.color = '#FFFFFF'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--nh-teal-700)'; }}>
        Tải xuống
        <Icon name="arrow-right" size={14} stroke={2} />
      </button>
    </div>
  );
};

const ResourceHubPage = () => {
  const [active, setActive] = React.useState(null);
  return (
    <main>
      <SEOMeta
        title="Tài liệu & Biểu mẫu pháp lý"
        description="Tải miễn phí các biểu mẫu pháp lý thường dùng: hợp đồng, đơn từ, biên bản — biên soạn bởi đội ngũ luật sư N.H Legal theo pháp luật Việt Nam hiện hành."
        path="/tai-lieu"
      />
      <div style={{ background: 'linear-gradient(135deg, #063E45 0%, #0A5258 55%, #0D6470 100%)', padding: 'clamp(64px, 10vw, 100px) 0 clamp(48px, 7vw, 72px)' }}>
        <Container>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.55)', fontSize: 13, fontFamily: 'var(--font-sans)', textDecoration: 'none', marginBottom: 28 }}>
            <Icon name="arrow-left" size={14} stroke={2} /> Trang chủ
          </Link>
          <div style={{ fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-sans)', marginBottom: 16 }}>Tài nguyên pháp lý</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(32px, 5vw, 56px)', letterSpacing: '-0.02em', color: '#FFFFFF', margin: 0, lineHeight: 1.1 }}>
            Tài liệu &amp; Biểu mẫu
          </h1>
          <p style={{ maxWidth: 600, margin: '18px 0 0', fontSize: 16, lineHeight: 1.7, color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-sans)' }}>
            Bộ biểu mẫu pháp lý thường dùng, biên soạn theo pháp luật Việt Nam hiện hành. Để lại thông tin để nhận tài liệu miễn phí.
          </p>
        </Container>
      </div>
      <div style={{ background: '#FAFAFA', padding: 'clamp(40px, 6vw, 72px) 0 clamp(64px, 10vw, 100px)' }}>
        <Container>
          <div className="nh-blog-grid">
            {TEMPLATES.map((t) => <TemplateCard key={t.title} tpl={t} onGet={setActive} />)}
          </div>
          <p style={{ marginTop: 36, fontSize: 13, color: 'var(--fg-mute)', textAlign: 'center', maxWidth: 620, margin: '36px auto 0', lineHeight: 1.6 }}>
            Biểu mẫu chỉ mang tính tham khảo, không thay thế tư vấn pháp lý cho từng trường hợp cụ thể.
            Cần hỗ trợ soạn thảo riêng? <Link to="/#contact" style={{ color: 'var(--nh-teal-700)', textDecoration: 'underline' }}>Liên hệ luật sư</Link>.
          </p>
        </Container>
      </div>
      {active && <LeadModal tpl={active} onClose={() => setActive(null)} />}
    </main>
  );
};

export default ResourceHubPage;
