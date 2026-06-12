import React from 'react';
import { Container } from './primitives';

// Render TĨNH (zero-JS). Hiển thị thẳng giá trị (số liệu thật do công ty cung cấp).
// Hỗ trợ cả giá trị chữ ("Toàn quốc") và số có 0 đứng đầu ("07").
const StatItem = ({ value, label, i }) => {
  const isText = /[A-Za-zÀ-ỹ]/.test(value);
  return (
    <div className="nh-stat-item" style={{ paddingLeft: i === 0 ? 0 : 32, paddingRight: 32, borderLeft: i === 0 ? 'none' : '1px solid var(--nh-line)' }}>
      <div className="nh-stat-value" style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: isText ? 'clamp(28px, 3.2vw, 42px)' : 'clamp(40px, 4.4vw, 56px)', lineHeight: 1, letterSpacing: '-0.02em', color: 'var(--nh-navy-900)' }}>{value}</div>
      <div style={{ marginTop: 16, fontFamily: 'var(--font-sans)', fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-mute)' }}>{label}</div>
    </div>
  );
};

const Trust = () => {
  const items = [
    { value: '10+',       label: 'Năm kinh nghiệm' },
    { value: '1.000+',    label: 'Hồ sơ pháp lý' },
    { value: '07',        label: 'Lĩnh vực dịch vụ trọng tâm' },
    { value: 'Toàn quốc', label: 'Hỗ trợ khách hàng' },
  ];

  return (
    <section className="nh-section-standard" style={{ background: '#FFFFFF', position: 'relative' }}>
      <Container>
        <div style={{ borderTop: '1px solid var(--nh-line)', borderBottom: '1px solid var(--nh-line)', padding: '48px 0' }}>
          <div className="nh-stat-grid">
            {items.map((it, i) => (
              <StatItem key={it.label} value={it.value} label={it.label} i={i} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Trust;
