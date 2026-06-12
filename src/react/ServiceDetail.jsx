import React from 'react';
import { Container, Icon } from './primitives';
import { DEFAULT_PROCESS, PRICING_DISCLAIMER, PRICING_INCLUDED, PRICING_EXCLUDED } from './data/services';

// Render TĨNH (zero-JS). Template 10 mục chuẩn cho mỗi trang category.
// FAQ & "Vì sao chọn" hiển thị placeholder khi service.faqs / service.whyUs = null.
// Chi phí: số thật chờ công ty (đang là [CHỜ SỐ]) + disclaimer bắt buộc.

const SectionTitle = ({ icon, children, sub }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
    <span style={{ width: 44, height: 44, borderRadius: 999, background: 'rgba(11,107,114,0.08)', color: 'var(--nh-teal-700)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <Icon name={icon} size={21} stroke={1.8} />
    </span>
    <div>
      {sub && <div style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--nh-gold-600)', fontFamily: 'var(--font-sans)', marginBottom: 4 }}>{sub}</div>}
      <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(24px, 3vw, 32px)', color: 'var(--nh-navy-900)', margin: 0, lineHeight: 1.15 }}>{children}</h2>
    </div>
  </div>
);

const BulletList = ({ items, marker = 'check' }) => (
  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
    {items.map((t, i) => (
      <li key={i} style={{ display: 'flex', gap: 13, alignItems: 'flex-start' }}>
        <span style={{ flexShrink: 0, marginTop: 2, width: 22, height: 22, borderRadius: 999, background: marker === 'check' ? 'var(--nh-teal-700)' : 'rgba(184,155,94,0.15)', color: marker === 'check' ? '#FFFFFF' : 'var(--nh-gold-600)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name={marker === 'check' ? 'check' : 'chevron-right'} size={13} stroke={2.5} />
        </span>
        <span style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--fg-2)', textAlign: 'left' }}>{t}</span>
      </li>
    ))}
  </ul>
);

const slugifyVi = (s) =>
  s.toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const FaqItem = ({ q, a }) => (
  <details className="nh-faq">
    <summary>
      <span className="nh-faq-q">{q}</span>
      <span className="nh-faq-ic"><Icon name="chevron-down" size={14} stroke={2.5} /></span>
    </summary>
    <p className="nh-faq-a">{a}</p>
  </details>
);

const Placeholder = ({ text }) => (
  <div style={{ border: '1.5px dashed var(--nh-line-strong)', borderRadius: 16, padding: 'clamp(24px, 4vw, 36px)', textAlign: 'center', color: 'var(--fg-mute)', fontFamily: 'var(--font-sans)', fontSize: 14.5, lineHeight: 1.6 }}>
    {text}
  </div>
);

const OtherServiceCard = ({ service }) => (
  <a href={`/dich-vu/${service.slug}`} className="nh-other-svc-card">
    <span className="nh-other-svc-ic"><Icon name={service.icon} size={18} stroke={1.5} /></span>
    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 17, color: 'var(--nh-navy-900)', lineHeight: 1.2 }}>{service.label}</span>
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--nh-teal-700)', fontFamily: 'var(--font-sans)', fontWeight: 500 }}>
      Xem chi tiết <Icon name="arrow-right" size={12} stroke={2} />
    </span>
  </a>
);

const ServiceDetail = ({ service, others = [], relatedPosts = [] }) => {
  const process = service.process || DEFAULT_PROCESS;
  return (
    <main>
      {/* 1. HERO */}
      <div style={{ background: 'linear-gradient(135deg, #063E45 0%, #0A5258 55%, #0D6470 100%)', padding: 'clamp(64px, 10vw, 100px) 0 clamp(48px, 7vw, 72px)' }}>
        <Container>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
            <a href="/" className="nh-foot-contact-link" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, fontFamily: 'var(--font-sans)' }}>Trang chủ</a>
            <Icon name="chevron-right" size={13} stroke={1.5} color="rgba(255,255,255,0.3)" />
            <a href="/dich-vu" className="nh-foot-contact-link" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, fontFamily: 'var(--font-sans)' }}>Dịch vụ</a>
            <Icon name="chevron-right" size={13} stroke={1.5} color="rgba(255,255,255,0.3)" />
            <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, fontFamily: 'var(--font-sans)' }}>{service.label}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 20 }}>
            <span style={{ width: 60, height: 60, borderRadius: 999, background: 'rgba(255,255,255,0.1)', border: '1.5px solid rgba(255,255,255,0.15)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon name={service.icon} size={26} stroke={1.5} color="rgba(255,255,255,0.9)" />
            </span>
            <div>
              <div style={{ fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-sans)', marginBottom: 6 }}>{service.labelEn}</div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(32px, 5vw, 56px)', letterSpacing: '-0.02em', color: '#FFFFFF', margin: 0, lineHeight: 1.1 }}>{service.label}</h1>
            </div>
          </div>
          {service.positioning && (
            <span style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(184,155,94,0.18)', border: '1px solid rgba(216,190,132,0.4)', borderRadius: 999, color: '#E9D9B0', fontSize: 12.5, fontFamily: 'var(--font-sans)', fontWeight: 600, letterSpacing: '0.04em', marginBottom: 16 }}>{service.positioning}</span>
          )}
          <p style={{ maxWidth: 660, margin: '8px 0 0', fontSize: 16, lineHeight: 1.7, color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-sans)' }}>{service.heroDesc}</p>
          <div style={{ marginTop: 30, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <a href="/#contact" className="nh-btn nh-btn-primary" style={{ background: 'linear-gradient(180deg,#DCC089 0%,#BE9F61 50%,#A4853F 100%)', color: '#FFFFFF', textShadow: '0 1px 1.5px rgba(96,74,30,0.55)' }}>
              <span>Đặt lịch tư vấn</span><span className="nh-btn-ar"><Icon name="arrow-right" size={16} stroke={2} /></span>
            </a>
            <a href="tel:0777516000" className="nh-cta-phone"><Icon name="phone" size={15} stroke={2} /> 0777 516 000</a>
          </div>
        </Container>
      </div>

      {/* 2. KHI NÀO CẦN LUẬT SƯ + 3. VẤN ĐỀ THƯỜNG GẶP */}
      <div style={{ background: '#FFFFFF', padding: 'clamp(48px, 7vw, 80px) 0' }}>
        <Container narrow>
          <SectionTitle icon="help-circle" sub="Khi nào cần luật sư">Bạn nên tìm đến luật sư khi…</SectionTitle>
          <BulletList items={service.whenNeed} marker="chevron" />

          <div style={{ marginTop: 56 }}>
            <SectionTitle icon="shield-check" sub="Vấn đề thường gặp">Những rủi ro khách hàng thường gặp</SectionTitle>
            <BulletList items={service.commonProblems} marker="chevron" />
          </div>
        </Container>
      </div>

      {/* 4. N.H LEGAL HỖ TRỢ + DỊCH VỤ CON */}
      <div style={{ background: 'var(--nh-teal-50)', padding: 'clamp(48px, 7vw, 80px) 0' }}>
        <Container narrow>
          <SectionTitle icon="list-checks" sub="Phạm vi dịch vụ">N.H Legal hỗ trợ những gì?</SectionTitle>
          <BulletList items={service.weSupport} marker="check" />

          <div style={{ marginTop: 40 }}>
            <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 15, letterSpacing: '0.02em', color: 'var(--nh-navy-900)', margin: '0 0 16px' }}>Các dịch vụ con</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {service.subServices.map((name) => (
                <span key={name} id={slugifyVi(name)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 16px', background: '#FFFFFF', border: '1px solid var(--nh-line)', borderRadius: 999, fontSize: 13.5, color: 'var(--fg)', fontFamily: 'var(--font-sans)' }}>
                  <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--nh-gold-500)', flexShrink: 0 }} />
                  {name}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* 5. QUY TRÌNH LÀM VIỆC */}
      <div style={{ background: '#FFFFFF', padding: 'clamp(48px, 7vw, 80px) 0' }}>
        <Container narrow>
          <SectionTitle icon="list-checks" sub="Quy trình làm việc">Cách N.H Legal đồng hành cùng bạn</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20 }}>
            {process.map((p, i) => (
              <div key={i} style={{ background: '#FAFAFA', border: '1.5px solid var(--nh-line)', borderRadius: 16, padding: '24px 22px' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 28, color: 'var(--nh-gold-500)', lineHeight: 1, marginBottom: 12 }}>0{i + 1}</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 15, color: 'var(--nh-navy-900)', marginBottom: 8 }}>{p.step}</div>
                <div style={{ fontSize: 13.5, lineHeight: 1.6, color: 'var(--fg-2)', textAlign: 'left' }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* 6. VÌ SAO CHỌN N.H LEGAL (placeholder chờ LS duyệt) */}
      <div style={{ background: 'var(--nh-teal-50)', padding: 'clamp(48px, 7vw, 80px) 0' }}>
        <Container narrow>
          <SectionTitle icon="shield-check" sub="Vì sao chọn N.H Legal">Cam kết của chúng tôi</SectionTitle>
          {service.whyUs ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
              {service.whyUs.map((w, i) => (
                <div key={i} style={{ background: '#FFFFFF', border: '1.5px solid var(--nh-line)', borderRadius: 16, padding: '24px 26px' }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 10 }}>
                    <span style={{ flexShrink: 0, marginTop: 2, color: 'var(--nh-teal-700)' }}><Icon name="check-circle-2" size={20} stroke={1.8} /></span>
                    <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 16, color: 'var(--nh-navy-900)', margin: 0, lineHeight: 1.35 }}>{w.title}</h3>
                  </div>
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: 'var(--fg-2)', textAlign: 'left' }}>{w.desc}</p>
                </div>
              ))}
            </div>
          ) : (
            <Placeholder text="Nội dung mục này đang được luật sư rà soát và sẽ sớm cập nhật." />
          )}
        </Container>
      </div>

      {/* 7. CHI PHÍ THAM KHẢO */}
      <div style={{ background: '#FFFFFF', padding: 'clamp(48px, 7vw, 80px) 0' }}>
        <Container narrow>
          <SectionTitle icon="file-text" sub="Chi phí">Chi phí tham khảo</SectionTitle>
          {service.pricing && service.pricing.mode === 'disclosed' ? (
            <>
              <div style={{ border: '1.5px solid var(--nh-line)', borderRadius: 16, overflow: 'hidden' }}>
                {service.pricing.items.map((it, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, padding: '18px 24px', borderBottom: i < service.pricing.items.length - 1 ? '1px solid var(--nh-line)' : 'none', background: i % 2 ? '#FAFAFA' : '#FFFFFF' }}>
                    <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 15, color: 'var(--nh-navy-900)' }}>{it.name}</span>
                    <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 15, color: 'var(--nh-teal-700)', whiteSpace: 'nowrap' }}>{it.price}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginTop: 24 }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 13.5, color: 'var(--nh-teal-700)', marginBottom: 10 }}>✔️ Đã bao gồm</div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {PRICING_INCLUDED.map((t, i) => <li key={i} style={{ fontSize: 13.5, lineHeight: 1.55, color: 'var(--fg-2)', textAlign: 'left' }}>{t}</li>)}
                  </ul>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 13.5, color: 'var(--nh-gold-600)', marginBottom: 10 }}>❌ Chưa bao gồm</div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {PRICING_EXCLUDED.map((t, i) => <li key={i} style={{ fontSize: 13.5, lineHeight: 1.55, color: 'var(--fg-2)', textAlign: 'left' }}>{t}</li>)}
                  </ul>
                </div>
              </div>
              <p style={{ marginTop: 16, fontSize: 12.5, lineHeight: 1.6, color: 'var(--fg-mute)', fontFamily: 'var(--font-sans)', textAlign: 'left' }}>{PRICING_DISCLAIMER}</p>
              <a href="/bang-gia" className="nh-textlink" style={{ marginTop: 4 }}>Xem bảng giá dịch vụ chi tiết<span className="nh-ar"><Icon name="arrow-right" size={14} stroke={2} /></span></a>
            </>
          ) : (
            <div style={{ background: '#FAFAFA', border: '1.5px solid var(--nh-line)', borderRadius: 16, padding: 'clamp(24px, 4vw, 36px)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 20, color: 'var(--nh-navy-900)' }}>Báo giá sau khi xem hồ sơ</div>
                <p style={{ margin: '8px 0 0', fontSize: 14, lineHeight: 1.6, color: 'var(--fg-2)', fontFamily: 'var(--font-sans)', maxWidth: 480, textAlign: 'left' }}>
                  Tính chất vụ việc trong lĩnh vực này rất khác nhau. Vui lòng liên hệ để được đánh giá hồ sơ và báo giá chính xác, minh bạch.
                </p>
              </div>
              <a href="/#contact" className="nh-btn nh-btn-primary"><span>Nhận báo giá</span><span className="nh-btn-ar"><Icon name="arrow-right" size={16} stroke={2} /></span></a>
            </div>
          )}
        </Container>
      </div>

      {/* 8. FAQ (placeholder chờ LS duyệt) */}
      <div style={{ background: 'var(--nh-teal-50)', padding: 'clamp(48px, 7vw, 80px) 0' }}>
        <Container narrow>
          <SectionTitle icon="message-circle-question" sub="FAQ">Câu hỏi thường gặp</SectionTitle>
          {service.faqs && service.faqs.length ? (
            <div>{service.faqs.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}</div>
          ) : (
            <Placeholder text="Phần hỏi đáp đang được luật sư rà soát nội dung để đảm bảo chính xác và sẽ sớm cập nhật." />
          )}
        </Container>
      </div>

      {/* 9. BÀI VIẾT LIÊN QUAN (ẩn nếu chưa có) */}
      {relatedPosts && relatedPosts.length > 0 && (
        <div style={{ background: '#FFFFFF', padding: 'clamp(48px, 7vw, 80px) 0' }}>
          <Container narrow>
            <SectionTitle icon="file-text" sub="Insights">Bài viết liên quan</SectionTitle>
            <div className="nh-blog-grid">
              {relatedPosts.map((p) => (
                <a key={p._id} href={`/bai-viet/${p.slug}`} className="nh-other-svc-card" style={{ gap: 12 }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 18, color: 'var(--nh-navy-900)', lineHeight: 1.25 }}>{p.title}</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--nh-teal-700)', fontFamily: 'var(--font-sans)', fontWeight: 500 }}>Đọc tiếp <Icon name="arrow-right" size={12} stroke={2} /></span>
                </a>
              ))}
            </div>
          </Container>
        </div>
      )}

      {/* 10. CTA LIÊN HỆ */}
      <div style={{ background: 'var(--nh-teal-50)', padding: '0 0 clamp(56px, 8vw, 88px)' }}>
        <Container narrow>
          <div style={{ background: 'linear-gradient(135deg, #063E45 0%, #0A5258 100%)', borderRadius: 20, padding: 'clamp(32px, 5vw, 48px)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(20px, 2.8vw, 28px)', color: '#FFFFFF', lineHeight: 1.2 }}>Bắt đầu với buổi tư vấn đầu tiên</div>
              <p style={{ margin: '10px 0 0', fontSize: 14, color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-sans)' }}>Luật sư N.H Legal sẽ lắng nghe và đánh giá tình huống của bạn.</p>
            </div>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <a href="tel:0777516000" className="nh-cta-phone"><Icon name="phone" size={15} stroke={2} /> 0777 516 000</a>
              <a href="/#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '13px 24px', background: 'linear-gradient(180deg,#DCC089 0%,#BE9F61 50%,#A4853F 100%)', color: '#FFFFFF', textShadow: '0 1px 1.5px rgba(96,74,30,0.55)', borderRadius: 999, textDecoration: 'none', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 14, whiteSpace: 'nowrap', boxShadow: '0 8px 20px rgba(120,95,40,0.35)' }}>Đặt lịch tư vấn<Icon name="arrow-right" size={15} stroke={2} /></a>
            </div>
          </div>

          {/* Dịch vụ khác */}
          <div style={{ marginTop: 56 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(18px, 2vw, 22px)', color: 'var(--nh-navy-900)', margin: '0 0 24px' }}>Các dịch vụ khác</h2>
            <div className="nh-other-services-grid">
              {others.map((s) => <OtherServiceCard key={s.slug} service={s} />)}
            </div>
          </div>
        </Container>
      </div>
    </main>
  );
};

export default ServiceDetail;
