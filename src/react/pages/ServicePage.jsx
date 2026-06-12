import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Container, Icon } from '../primitives';
import SEOMeta from '../SEOMeta';
import { getService, SERVICES } from '../data/services';
import NotFoundPage from './NotFoundPage';

const CheckItem = ({ text }) => (
  <li style={{ display: 'flex', gap: 13, alignItems: 'flex-start' }}>
    <span style={{ flexShrink: 0, marginTop: 2, width: 22, height: 22, borderRadius: 999, background: 'var(--nh-teal-700)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <Icon name="check" size={13} stroke={2.5} color="#FFFFFF" />
    </span>
    <span style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--fg-2)' }}>{text}</span>
  </li>
);

const UserItem = ({ text }) => (
  <li style={{ display: 'flex', gap: 13, alignItems: 'flex-start' }}>
    <span style={{ flexShrink: 0, marginTop: 3, color: 'var(--nh-gold-500)' }}>
      <Icon name="chevron-right" size={16} stroke={2.5} />
    </span>
    <span style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--fg-2)' }}>{text}</span>
  </li>
);

const FaqItem = ({ q, a }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{ borderBottom: '1px solid var(--nh-line)' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
      >
        <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 15, color: 'var(--nh-navy-900)', lineHeight: 1.5 }}>{q}</span>
        <span style={{ flexShrink: 0, width: 28, height: 28, borderRadius: 999, background: open ? 'var(--nh-teal-700)' : 'rgba(11,107,114,0.08)', color: open ? '#fff' : 'var(--nh-teal-700)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', transition: 'all 220ms var(--ease-out)', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          <Icon name="chevron-down" size={14} stroke={2.5} />
        </span>
      </button>
      {/* CSS grid trick: animates from 0fr → 1fr for smooth height transition */}
      <div style={{ display: 'grid', gridTemplateRows: open ? '1fr' : '0fr', transition: 'grid-template-rows 300ms cubic-bezier(0.22, 1, 0.36, 1)' }}>
        <div style={{ overflow: 'hidden' }}>
          <p style={{ margin: '0 0 20px', fontSize: 14.5, lineHeight: 1.7, color: 'var(--fg-2)', fontFamily: 'var(--font-sans)', paddingRight: 44 }}>{a}</p>
        </div>
      </div>
    </div>
  );
};

const OtherServiceCard = ({ service }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <Link
      to={`/dich-vu/${service.slug}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '22px 24px', background: hover ? 'var(--nh-teal-50)' : '#FAFAFA', border: `1.5px solid ${hover ? 'rgba(11,107,114,0.2)' : 'var(--nh-line)'}`, borderRadius: 14, textDecoration: 'none', transition: 'all 240ms var(--ease-out)' }}>
      <span style={{ width: 40, height: 40, borderRadius: 999, background: hover ? 'var(--nh-teal-700)' : 'rgba(11,107,114,0.08)', color: hover ? '#FFFFFF' : 'var(--nh-teal-700)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', transition: 'all 240ms var(--ease-out)' }}>
        <Icon name={service.icon} size={18} stroke={1.5} />
      </span>
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 17, color: 'var(--nh-navy-900)', lineHeight: 1.2 }}>{service.label}</span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--nh-teal-700)', fontFamily: 'var(--font-sans)', fontWeight: 500 }}>
        Xem chi tiết <Icon name="arrow-right" size={12} stroke={2} />
      </span>
    </Link>
  );
};

const ServicePage = () => {
  const { slug } = useParams();
  const service = getService(slug);

  if (!service) return <NotFoundPage />;

  const others = SERVICES.filter((s) => s.slug !== slug);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <main>
      <SEOMeta
        title={service.label}
        description={service.seoDesc}
        path={`/dich-vu/${slug}`}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #063E45 0%, #0A5258 55%, #0D6470 100%)', padding: 'clamp(64px, 10vw, 100px) 0 clamp(48px, 7vw, 72px)' }}>
        <Container>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
            <Link to="/" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, fontFamily: 'var(--font-sans)', textDecoration: 'none', transition: 'color 200ms' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.9)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}>
              Trang chủ
            </Link>
            <Icon name="chevron-right" size={13} stroke={1.5} color="rgba(255,255,255,0.3)" />
            <a href="/#practice" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, fontFamily: 'var(--font-sans)', textDecoration: 'none', transition: 'color 200ms' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.9)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}>
              Dịch vụ
            </a>
            <Icon name="chevron-right" size={13} stroke={1.5} color="rgba(255,255,255,0.3)" />
            <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, fontFamily: 'var(--font-sans)' }}>{service.label}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 20 }}>
            <span style={{ width: 60, height: 60, borderRadius: 999, background: 'rgba(255,255,255,0.1)', border: '1.5px solid rgba(255,255,255,0.15)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon name={service.icon} size={26} stroke={1.5} color="rgba(255,255,255,0.9)" />
            </span>
            <div>
              <div style={{ fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-sans)', marginBottom: 6 }}>{service.labelEn}</div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(32px, 5vw, 56px)', letterSpacing: '-0.02em', color: '#FFFFFF', margin: 0, lineHeight: 1.1 }}>
                {service.label}
              </h1>
            </div>
          </div>

          <p style={{ maxWidth: 640, margin: '20px 0 0', fontSize: 16, lineHeight: 1.7, color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-sans)' }}>
            {service.shortDesc}
          </p>
        </Container>
      </div>

      {/* Main content */}
      <div style={{ background: '#FFFFFF', padding: 'clamp(48px, 7vw, 80px) 0' }}>
        <Container>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>

            {/* Two-column grid */}
            <div className="nh-service-detail-grid">
              {/* Includes */}
              <div style={{ background: 'var(--nh-teal-50)', borderRadius: 20, padding: 'clamp(28px, 4vw, 44px)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
                  <span style={{ width: 42, height: 42, borderRadius: 999, background: 'var(--nh-teal-700)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="list-checks" size={20} stroke={1.8} color="#FFFFFF" />
                  </span>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 22, color: 'var(--nh-navy-900)', margin: 0 }}>Dịch vụ bao gồm</h2>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {service.includes.map((item, i) => <CheckItem key={i} text={item} />)}
                </ul>
              </div>

              {/* Who needs */}
              <div style={{ background: '#FAFAFA', border: '1.5px solid var(--nh-line)', borderRadius: 20, padding: 'clamp(28px, 4vw, 44px)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
                  <span style={{ width: 42, height: 42, borderRadius: 999, background: 'rgba(184,155,94,0.12)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="user-check" size={20} stroke={1.8} color="var(--nh-gold-500)" />
                  </span>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 22, color: 'var(--nh-navy-900)', margin: 0 }}>Ai cần dịch vụ này?</h2>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {service.whoNeeds.map((item, i) => <UserItem key={i} text={item} />)}
                </ul>
              </div>
            </div>

            {/* FAQ */}
            <div style={{ marginTop: 48 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <span style={{ width: 42, height: 42, borderRadius: 999, background: 'rgba(184,155,94,0.12)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name="message-circle-question" size={20} stroke={1.8} color="var(--nh-gold-500)" />
                </span>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 22, color: 'var(--nh-navy-900)', margin: 0 }}>Câu hỏi thường gặp</h2>
              </div>
              <div>
                {service.faqs.map((faq, i) => <FaqItem key={i} q={faq.q} a={faq.a} />)}
              </div>
            </div>

            {/* CTA strip */}
            <div style={{ marginTop: 48, background: 'linear-gradient(135deg, #063E45 0%, #0A5258 100%)', borderRadius: 20, padding: 'clamp(32px, 5vw, 48px)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(20px, 2.8vw, 28px)', color: '#FFFFFF', lineHeight: 1.2 }}>
                  Bắt đầu với buổi tư vấn miễn phí
                </div>
                <p style={{ margin: '10px 0 0', fontSize: 14, color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-sans)' }}>
                  Luật sư N.H Legal sẽ lắng nghe và đánh giá tình huống của bạn — không phí, không ràng buộc.
                </p>
              </div>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <a href="tel:0777516000" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '13px 24px', background: 'rgba(255,255,255,0.1)', border: '1.5px solid rgba(255,255,255,0.2)', color: '#FFFFFF', borderRadius: 999, textDecoration: 'none', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 14, whiteSpace: 'nowrap', transition: 'background 220ms' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.18)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}>
                  <Icon name="phone" size={15} stroke={2} />
                  0777 516 000
                </a>
                <a href="/#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '13px 24px', background: 'linear-gradient(180deg,#DCC089 0%,#BE9F61 50%,#A4853F 100%)', color: '#FFFFFF', textShadow: '0 1px 1.5px rgba(96,74,30,0.55)', borderRadius: 999, textDecoration: 'none', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 14, whiteSpace: 'nowrap', boxShadow: '0 8px 20px rgba(120,95,40,0.35)' }}>
                  Đặt lịch tư vấn
                  <Icon name="arrow-right" size={15} stroke={2} />
                </a>
              </div>
            </div>

          </div>
        </Container>
      </div>

      {/* Other services */}
      <div style={{ background: 'var(--nh-teal-50)', padding: 'clamp(48px, 6vw, 72px) 0' }}>
        <Container>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(18px, 2vw, 22px)', color: 'var(--nh-navy-900)', margin: '0 0 28px' }}>
              Các dịch vụ khác
            </h3>
            <div className="nh-other-services-grid">
              {others.map((s) => <OtherServiceCard key={s.slug} service={s} />)}
            </div>
          </div>
        </Container>
      </div>
    </main>
  );
};

export default ServicePage;
