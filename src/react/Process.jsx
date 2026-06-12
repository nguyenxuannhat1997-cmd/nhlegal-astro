import React from 'react';
import { Container, SectionHeader, Icon } from './primitives';

const STEPS = [
  { n: '01', icon: 'message-circle',  t: 'Liên hệ',                b: 'Gọi hotline, điền form hoặc nhắn Zalo.' },
  { n: '02', icon: 'scale',           t: 'Tư vấn sơ bộ',          b: 'Luật sư đánh giá tình huống, miễn phí.' },
  { n: '03', icon: 'scroll',          t: 'Ký hợp đồng',           b: 'Thống nhất phương án và ký kết dịch vụ.' },
  { n: '04', icon: 'briefcase',       t: 'Luật sư thực hiện',     b: 'Triển khai và cập nhật tiến độ thường xuyên.' },
  { n: '05', icon: 'check-circle-2',  t: 'Bàn giao kết quả',      b: 'Hoàn tất vụ việc và bàn giao hồ sơ.' },
];

const StepItem = ({ n, icon, t, b, isLast }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
         style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', zIndex: 1 }}>
      {!isLast && <span className="nh-step-dash" aria-hidden />}
      <span className="nh-step-icon" style={{ width: 64, height: 64, borderRadius: 999, flexShrink: 0,
        background: hover ? 'var(--nh-teal-700)' : '#FFFFFF',
        color: hover ? '#FFFFFF' : 'var(--nh-teal-700)',
        border: `1.5px solid ${hover ? 'var(--nh-teal-700)' : 'rgba(11,107,114,0.20)'}`,
        boxShadow: hover ? 'var(--shadow-teal-glow), var(--shadow-2)' : 'var(--shadow-1)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', zIndex: 1, transition: 'all 360ms var(--ease-out)' }}>
        <Icon name={icon} size={26} stroke={1.5} />
      </span>
      <div className="nh-step-num" style={{ marginTop: 20, fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--nh-gold-600)' }}>Bước {n}</div>
      <h3 className="nh-step-title" style={{ margin: '8px 0 0', fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 21, lineHeight: 1.25, color: 'var(--nh-navy-900)' }}>{t}</h3>
      <p className="nh-step-desc" style={{ margin: '8px auto 0', fontSize: 13.5, lineHeight: 1.6, color: 'var(--fg-2)', maxWidth: 180, textAlign: 'center' }}>{b}</p>
    </div>
  );
};

const Process = () => (
  <section className="nh-section-standard" style={{ background: 'var(--nh-ivory)' }}>
    <style>{`
      .nh-process-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 28px; position: relative; }
      /* short dash centered in the gap between two steps */
      .nh-step-dash { position: absolute; top: 31px; left: calc(100% + 14px); transform: translateX(-50%);
        width: 30px; height: 2px; border-radius: 2px; background: var(--nh-gold-400); z-index: 0; }
      /* Tablet: 2 cột (giữ như cũ) */
      @media (max-width: 900px) and (min-width: 561px) { .nh-process-grid { grid-template-columns: repeat(2, 1fr); gap: 44px 20px; } .nh-step-dash { display: none; } }
      /* Điện thoại: gói gọn 5 bước thành 1 hàng ngang, chỉ icon + chữ ngắn, vừa 1 màn hình */
      @media (max-width: 560px) {
        .nh-process-grid { grid-template-columns: repeat(5, 1fr); gap: 6px; }
        .nh-step-dash { display: none; }
        .nh-step-icon { width: 42px !important; height: 42px !important; }
        .nh-step-icon svg { width: 18px !important; height: 18px !important; }
        .nh-step-num { display: none !important; }
        .nh-step-title { font-size: 10.5px !important; line-height: 1.2 !important; margin-top: 8px !important; }
        .nh-step-desc { display: none !important; }
      }
    `}</style>
    <Container>
      <SectionHeader
        eyebrow="Quy trình làm việc"
        title="Đồng hành cùng bạn,<br/><em style='font-style:normal;color:var(--nh-gold-500);font-weight:500'>từng bước rõ ràng.</em>"
        lede="Minh bạch từ lần liên hệ đầu tiên đến khi vụ việc hoàn tất."
        align="center"
        maxWidth={680}
        ledeMaxWidth={560}
      />
      <div className="nh-process-grid">
        {STEPS.map((s, i) => <StepItem key={s.n} {...s} isLast={i === STEPS.length - 1} />)}
      </div>
    </Container>
  </section>
);

export default Process;
