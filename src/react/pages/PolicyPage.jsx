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

const PolicyPage = () => (
  <main>
    {/* Hero banner */}
    <div style={{ background: 'linear-gradient(135deg, #063E45 0%, #0A5258 55%, #0D6470 100%)', padding: 'clamp(64px, 10vw, 100px) 0 clamp(48px, 7vw, 72px)' }}>
      <Container>
        <a href="/" className="nh-foot-contact-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.55)', fontSize: 13, fontFamily: 'var(--font-sans)', textDecoration: 'none', marginBottom: 28 }}>
          <Icon name="arrow-left" size={14} stroke={2} />
          Trang chủ
        </a>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(32px, 5vw, 56px)', letterSpacing: '-0.02em', color: '#FFFFFF', margin: 0, lineHeight: 1.1 }}>
          Chính sách Bảo mật
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

          <Section title="1. Giới thiệu">
            <P>Công ty Luật TNHH Một Thành Viên N.H Legal ("N.H Legal", "chúng tôi") cam kết bảo vệ thông tin cá nhân của bạn. Chính sách Bảo mật này mô tả cách chúng tôi thu thập, sử dụng, lưu trữ và bảo vệ thông tin khi bạn sử dụng dịch vụ và trang web của chúng tôi.</P>
            <P>Bằng việc sử dụng trang web hoặc dịch vụ của N.H Legal, bạn đồng ý với các điều khoản trong Chính sách Bảo mật này.</P>
          </Section>

          <Section title="2. Thông tin chúng tôi thu thập">
            <P>Chúng tôi có thể thu thập các loại thông tin sau:</P>
            <UL items={[
              'Thông tin nhận diện: họ tên, số điện thoại, địa chỉ email.',
              'Thông tin liên lạc: địa chỉ, thành phố, tỉnh/thành.',
              'Thông tin vụ việc: mô tả tình huống pháp lý bạn cung cấp khi liên hệ tư vấn.',
              'Thông tin kỹ thuật: địa chỉ IP, loại trình duyệt, trang bạn truy cập (thông qua cookie và analytics).',
              'Thông tin đăng ký bản tin: địa chỉ email khi bạn đăng ký nhận tin tức pháp lý.',
            ]} />
          </Section>

          <Section title="3. Mục đích sử dụng thông tin">
            <P>Thông tin thu thập được sử dụng để:</P>
            <UL items={[
              'Cung cấp dịch vụ tư vấn pháp lý và phản hồi yêu cầu của bạn.',
              'Gửi bản tin pháp lý, cập nhật pháp luật theo yêu cầu (bạn có thể hủy đăng ký bất cứ lúc nào).',
              'Cải thiện chất lượng dịch vụ và trải nghiệm người dùng trên trang web.',
              'Tuân thủ các nghĩa vụ pháp lý theo quy định của pháp luật Việt Nam.',
              'Bảo vệ quyền lợi hợp pháp của N.H Legal và khách hàng.',
            ]} />
          </Section>

          <Section title="4. Bảo mật thông tin">
            <P>N.H Legal áp dụng các biện pháp bảo mật phù hợp để bảo vệ thông tin của bạn khỏi truy cập trái phép, tiết lộ, thay đổi hoặc tiêu hủy, bao gồm:</P>
            <UL items={[
              'Mã hóa dữ liệu trong quá trình truyền tải (SSL/TLS).',
              'Hạn chế quyền truy cập nội bộ theo nguyên tắc cần biết (need-to-know).',
              'Đánh giá định kỳ về các thực tiễn thu thập, lưu trữ và xử lý dữ liệu.',
            ]} />
            <P>Tuy nhiên, không có phương thức truyền tải qua Internet hoặc lưu trữ điện tử nào là an toàn tuyệt đối. Chúng tôi không thể đảm bảo bảo mật tuyệt đối.</P>
          </Section>

          <Section title="5. Chia sẻ thông tin với bên thứ ba">
            <P>Chúng tôi không bán, trao đổi hoặc chuyển nhượng thông tin cá nhân của bạn cho bên thứ ba, ngoại trừ:</P>
            <UL items={[
              'Đối tác cung cấp dịch vụ hỗ trợ hoạt động của chúng tôi (ví dụ: nhà cung cấp email, hosting) và đã cam kết bảo mật thông tin.',
              'Khi được yêu cầu bởi cơ quan nhà nước có thẩm quyền theo quy định pháp luật.',
              'Khi cần thiết để bảo vệ quyền lợi, tài sản hoặc sự an toàn của N.H Legal, khách hàng hoặc người khác.',
              'Khi có sự đồng ý rõ ràng của bạn.',
            ]} />
          </Section>

          <Section title="6. Quyền của bạn">
            <P>Theo quy định pháp luật Việt Nam (Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân), bạn có quyền:</P>
            <UL items={[
              'Biết về việc xử lý dữ liệu cá nhân của mình.',
              'Đồng ý hoặc không đồng ý với việc xử lý dữ liệu cá nhân.',
              'Truy cập vào dữ liệu cá nhân của mình.',
              'Rút lại sự đồng ý bất cứ lúc nào.',
              'Xóa dữ liệu cá nhân (trong phạm vi cho phép theo pháp luật).',
              'Khiếu nại, tố cáo, khởi kiện theo quy định pháp luật.',
            ]} />
            <P>Để thực hiện các quyền trên, vui lòng liên hệ với chúng tôi qua email hoặc điện thoại được cung cấp bên dưới.</P>
          </Section>

          <Section title="7. Cookie và Công nghệ theo dõi">
            <P>Trang web của chúng tôi có thể sử dụng cookie và công nghệ tương tự để cải thiện trải nghiệm người dùng, phân tích lưu lượng truy cập và cá nhân hóa nội dung. Bạn có thể tắt cookie trong cài đặt trình duyệt, tuy nhiên một số tính năng của trang web có thể không hoạt động đúng cách.</P>
          </Section>

          <Section title="8. Lưu giữ dữ liệu">
            <P>Chúng tôi lưu giữ thông tin cá nhân của bạn trong thời gian cần thiết để thực hiện các mục đích được mô tả trong Chính sách này, trừ khi pháp luật yêu cầu hoặc cho phép thời gian lưu giữ dài hơn.</P>
            <P>Đối với hồ sơ vụ việc pháp lý, thời gian lưu giữ tuân theo quy định của pháp luật về hành nghề luật sư và lưu trữ hồ sơ.</P>
          </Section>

          <Section title="9. Thay đổi Chính sách">
            <P>Chúng tôi có thể cập nhật Chính sách Bảo mật này theo thời gian. Khi có thay đổi đáng kể, chúng tôi sẽ thông báo trên trang web và cập nhật ngày "Cập nhật lần cuối" ở đầu trang. Việc tiếp tục sử dụng dịch vụ sau khi có thay đổi đồng nghĩa với việc bạn chấp nhận Chính sách mới.</P>
          </Section>

          <Section title="10. Liên hệ">
            <P>Nếu có bất kỳ câu hỏi hoặc yêu cầu nào liên quan đến Chính sách Bảo mật này, vui lòng liên hệ:</P>
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
            <a href="/dieu-khoan-su-dung" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: 'transparent', color: 'var(--nh-teal-700)', borderRadius: 999, textDecoration: 'none', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 14, letterSpacing: '0.02em', border: '1.5px solid var(--nh-teal-700)' }}>
              Điều khoản Sử dụng
              <Icon name="arrow-right" size={15} stroke={2} />
            </a>
          </div>

        </div>
      </Container>
    </div>
  </main>
);

export default PolicyPage;
