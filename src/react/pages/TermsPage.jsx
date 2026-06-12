import React from 'react';
import { Container, Icon } from '../primitives';

const LAST_UPDATED = '31/05/2026';

const Section = ({ title, children }) => (
  <section style={{ marginBottom: 48 }}>
    <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(20px, 2.4vw, 26px)', letterSpacing: '-0.01em', color: 'var(--nh-navy-900)', marginBottom: 16, paddingBottom: 12, borderBottom: '1.5px solid var(--nh-line)' }}>
      {title}
    </h2>
    <div style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--fg-2)' }}>
      {children}
    </div>
  </section>
);

const P = ({ children }) => <p style={{ margin: '0 0 14px' }}>{children}</p>;

const UL = ({ items }) => (
  <ul style={{ margin: '0 0 14px', paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
    {items.map((item, i) => <li key={i}>{item}</li>)}
  </ul>
);

const TermsPage = () => (
  <main>
    {/* Hero banner */}
    <div style={{ background: 'linear-gradient(135deg, #063E45 0%, #0A5258 55%, #0D6470 100%)', padding: 'clamp(64px, 10vw, 100px) 0 clamp(48px, 7vw, 72px)' }}>
      <Container>
        <a href="/" className="nh-foot-contact-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.55)', fontSize: 13, fontFamily: 'var(--font-sans)', textDecoration: 'none', marginBottom: 28 }}>
          <Icon name="arrow-left" size={14} stroke={2} />
          Trang chủ
        </a>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(32px, 5vw, 56px)', letterSpacing: '-0.02em', color: '#FFFFFF', margin: 0, lineHeight: 1.1 }}>
          Điều khoản Sử dụng
        </h1>
        <p style={{ marginTop: 18, fontSize: 15, color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-sans)' }}>
          Cập nhật lần cuối: {LAST_UPDATED}
        </p>
      </Container>
    </div>

    {/* Content */}
    <div style={{ background: '#FFFFFF', padding: 'clamp(48px, 7vw, 80px) 0 clamp(64px, 10vw, 100px)' }}>
      <Container>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>

          <Section title="1. Chấp nhận Điều khoản">
            <P>Bằng việc truy cập và sử dụng trang web của Công ty Luật TNHH Một Thành Viên N.H Legal ("N.H Legal", "chúng tôi"), bạn xác nhận đã đọc, hiểu và đồng ý bị ràng buộc bởi các Điều khoản Sử dụng này.</P>
            <P>Nếu bạn không đồng ý với bất kỳ điều khoản nào, vui lòng ngừng sử dụng trang web.</P>
          </Section>

          <Section title="2. Giới hạn của thông tin trên trang web">
            <P>Thông tin trên trang web của N.H Legal được cung cấp chỉ mang tính chất tham khảo và phổ biến kiến thức pháp lý chung. Thông tin này <strong>không cấu thành tư vấn pháp lý</strong> cho bất kỳ trường hợp cụ thể nào.</P>
            <P>Để được tư vấn pháp lý chính thức và áp dụng vào tình huống cụ thể của bạn, vui lòng liên hệ trực tiếp với luật sư của N.H Legal. Quan hệ luật sư — thân chủ chỉ được hình thành khi có hợp đồng dịch vụ pháp lý được ký kết.</P>
          </Section>

          <Section title="3. Quyền sở hữu trí tuệ">
            <P>Toàn bộ nội dung trên trang web này, bao gồm nhưng không giới hạn: văn bản, hình ảnh, logo, thiết kế giao diện, bài viết pháp lý, phân tích và tài liệu tham khảo, là tài sản của N.H Legal và được bảo hộ theo Luật Sở hữu trí tuệ Việt Nam.</P>
            <P>Bạn không được sao chép, phân phối, chỉnh sửa hoặc sử dụng vào mục đích thương mại mà không có sự cho phép bằng văn bản của N.H Legal.</P>
          </Section>

          <Section title="4. Hành vi bị cấm">
            <P>Khi sử dụng trang web, bạn cam kết không:</P>
            <UL items={[
              'Sử dụng trang web cho bất kỳ mục đích trái pháp luật hoặc bị cấm.',
              'Cố gắng truy cập trái phép vào hệ thống, dữ liệu hoặc tài khoản.',
              'Đăng tải, truyền tải nội dung có hại, sai lệch, phỉ báng hoặc vi phạm quyền của bên thứ ba.',
              'Sử dụng phần mềm tự động (bot, spider, scraper) để thu thập dữ liệu.',
              'Can thiệp hoặc làm gián đoạn hoạt động của trang web và hệ thống máy chủ.',
            ]} />
          </Section>

          <Section title="5. Giới hạn trách nhiệm">
            <P>N.H Legal nỗ lực đảm bảo thông tin trên trang web là chính xác và cập nhật, nhưng không bảo đảm tính đầy đủ, chính xác hoặc phù hợp cho một mục đích cụ thể nào.</P>
            <P>Trong phạm vi pháp luật cho phép, N.H Legal không chịu trách nhiệm đối với bất kỳ thiệt hại trực tiếp, gián tiếp, ngẫu nhiên hoặc hệ quả nào phát sinh từ việc sử dụng hoặc không thể sử dụng trang web hoặc nội dung trên trang web.</P>
          </Section>

          <Section title="6. Liên kết đến trang web bên thứ ba">
            <P>Trang web có thể chứa liên kết đến các trang web của bên thứ ba. Các liên kết này chỉ mang tính chất tham khảo. N.H Legal không kiểm soát và không chịu trách nhiệm về nội dung, chính sách bảo mật hoặc thực tiễn của các trang web bên thứ ba.</P>
          </Section>

          <Section title="7. Bí mật thông tin liên lạc">
            <P>Thông tin bạn gửi đến N.H Legal qua form liên hệ, email hoặc điện thoại sẽ được xử lý theo Chính sách Bảo mật của chúng tôi. Tuy nhiên, chỉ quan hệ luật sư — thân chủ được hình thành theo hợp đồng mới được bảo mật tuyệt đối theo đặc quyền nghề nghiệp của luật sư.</P>
          </Section>

          <Section title="8. Luật áp dụng và Giải quyết tranh chấp">
            <P>Các Điều khoản Sử dụng này được điều chỉnh bởi pháp luật nước Cộng hòa Xã hội Chủ nghĩa Việt Nam.</P>
            <P>Mọi tranh chấp phát sinh từ hoặc liên quan đến Điều khoản này sẽ được giải quyết trước tiên thông qua thương lượng trực tiếp. Nếu không đạt được thỏa thuận trong vòng 30 ngày, tranh chấp sẽ được đưa ra Tòa án nhân dân có thẩm quyền tại TP. Hồ Chí Minh.</P>
          </Section>

          <Section title="9. Thay đổi Điều khoản">
            <P>N.H Legal có quyền cập nhật, sửa đổi Điều khoản Sử dụng này bất cứ lúc nào. Phiên bản mới nhất sẽ được đăng trên trang web với ngày cập nhật rõ ràng. Việc tiếp tục sử dụng trang web sau khi thay đổi đồng nghĩa với việc bạn chấp nhận Điều khoản mới.</P>
          </Section>

          <Section title="10. Liên hệ">
            <P>Mọi thắc mắc về Điều khoản Sử dụng, vui lòng liên hệ:</P>
            <UL items={[
              'Công ty Luật TNHH Một Thành Viên N.H Legal',
              'Địa chỉ: TP. Hồ Chí Minh',
              'Hotline: 0777 516 000',
              'Email: contact@nhlegal.com.vn',
            ]} />
          </Section>

          <div style={{ marginTop: 56, paddingTop: 32, borderTop: '1px solid var(--nh-line)', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: 'var(--nh-teal-700)', color: '#FFFFFF', borderRadius: 999, textDecoration: 'none', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 14, letterSpacing: '0.02em' }}>
              <Icon name="arrow-left" size={15} stroke={2} />
              Về trang chủ
            </a>
            <a href="/chinh-sach-bao-mat" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: 'transparent', color: 'var(--nh-teal-700)', borderRadius: 999, textDecoration: 'none', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 14, letterSpacing: '0.02em', border: '1.5px solid var(--nh-teal-700)' }}>
              <Icon name="arrow-left" size={15} stroke={2} />
              Chính sách Bảo mật
            </a>
          </div>

        </div>
      </Container>
    </div>
  </main>
);

export default TermsPage;
