import React from 'react';
import { Container, SectionHeader, Icon } from './primitives';

// Nội dung THẬT do công ty cung cấp — đã ẩn danh khách hàng (mã KH-xx) theo
// nghĩa vụ bảo mật & quy tắc đạo đức nghề luật sư. KHÔNG tự thêm tên/đánh giá sao.
// Render TĨNH (zero-JS); mobile = carousel CSS (.nh-grid-testimonials).
const ITEMS = [
  { code: 'KH-01', area: 'Thành lập doanh nghiệp', quote: 'Tôi cần thành lập công ty trong thời gian ngắn để kịp ký hợp đồng với đối tác. N.H Legal tư vấn rõ các bước cần thực hiện, báo phí minh bạch và hỗ trợ xử lý hồ sơ khá nhanh. Điều tôi đánh giá cao là mọi vấn đề đều được giải thích dễ hiểu, kể cả với người chưa từng kinh doanh.' },
  { code: 'KH-02', area: 'Đăng ký nhãn hiệu', quote: 'Trước khi làm việc với N.H Legal, tôi chưa hiểu nhiều về thủ tục bảo hộ nhãn hiệu. Luật sư đã hỗ trợ tra cứu, đánh giá khả năng đăng ký và giải thích các rủi ro có thể phát sinh. Hồ sơ được chuẩn bị đầy đủ và tôi luôn nhận được cập nhật về tiến độ xử lý.' },
  { code: 'KH-03', area: 'Rà soát hợp đồng', quote: 'Hợp đồng hợp tác của doanh nghiệp tôi có nhiều điều khoản phức tạp. Sau khi được rà soát, tôi nhận ra một số rủi ro mà trước đó chưa từng để ý. Việc được luật sư phân tích trước khi ký kết giúp tôi yên tâm hơn rất nhiều.' },
  { code: 'KH-04', area: 'Tranh chấp đất đai', quote: 'Gia đình tôi có tranh chấp liên quan đến ranh giới đất sử dụng nhiều năm. Luật sư đã dành thời gian nghiên cứu hồ sơ, giải thích rõ tình trạng pháp lý và đưa ra hướng xử lý phù hợp thay vì hứa hẹn kết quả không thực tế.' },
  { code: 'KH-05', area: 'Thừa kế', quote: 'Hồ sơ thừa kế của gia đình tôi liên quan đến nhiều người thân ở các địa phương khác nhau. N.H Legal hỗ trợ rà soát giấy tờ và hướng dẫn từng bước rất chi tiết. Nhờ đó các thành viên hiểu rõ quyền lợi của mình và hạn chế được nhiều mâu thuẫn.' },
  { code: 'KH-06', area: 'Ly hôn', quote: 'Tôi tìm đến N.H Legal trong giai đoạn khá căng thẳng của cuộc sống. Điều khiến tôi yên tâm là luật sư luôn phân tích rõ quyền lợi, nghĩa vụ và các khả năng có thể xảy ra thay vì chỉ tập trung vào việc kiện tụng.' },
  { code: 'KH-07', area: 'Lao động', quote: 'Doanh nghiệp của tôi gặp vướng mắc liên quan đến xử lý kỷ luật lao động. Luật sư đã hỗ trợ rà soát hồ sơ và hướng dẫn quy trình phù hợp với quy định pháp luật để hạn chế rủi ro phát sinh về sau.' },
  { code: 'KH-08', area: 'Tư vấn pháp lý thường xuyên', quote: 'Chúng tôi sử dụng dịch vụ tư vấn pháp lý định kỳ cho doanh nghiệp. Việc có luật sư đồng hành giúp nhiều vấn đề được xử lý ngay từ đầu, tránh được những rủi ro không đáng có trong quá trình vận hành.' },
];

const Testimonials = () => (
  <section className="nh-section-standard" style={{ background: "#FFFFFF" }}>
    <Container>
      <SectionHeader
        eyebrow="Khách hàng nói về N.H Legal"
        title="Niềm tin được <em style='font-style:normal;color:var(--nh-gold-500);font-weight:500'>chứng minh.</em>"
        lede="Một số cảm nhận từ khách hàng đã đồng hành cùng N.H Legal. Thông tin nhận dạng được ẩn danh theo nghĩa vụ bảo mật của luật sư."
        align="left"
      />
      <div className="nh-grid-testimonials">
        {ITEMS.map((t) => (
          <figure key={t.code} className="nh-testimonial-card" style={{ margin: 0, padding: "36px 32px", background: "#FFFFFF", borderRadius: 20, border: "1px solid var(--nh-line)", boxShadow: "var(--shadow-1)", display: "flex", flexDirection: "column" }}>
            <span style={{ color: "var(--nh-gold-500)", fontSize: 28, fontFamily: "var(--font-display)", lineHeight: 1, marginBottom: 14 }}>"</span>
            <blockquote style={{ margin: 0, flex: 1, fontFamily: "var(--font-display)", fontWeight: 400, fontStyle: "italic", fontSize: 17, lineHeight: 1.6, color: "var(--nh-navy-900)", textAlign: "justify" }}>{t.quote}</blockquote>
            <figcaption style={{ marginTop: 24, paddingTop: 18, borderTop: "1px solid var(--nh-line)" }}>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 600, color: "var(--nh-navy-900)" }}>Khách hàng {t.code}</div>
              <div style={{ marginTop: 3, fontSize: 12, color: "var(--fg-mute)", letterSpacing: "0.03em" }}>{t.area}</div>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="nh-swipe-hint" style={{ display: "none", margin: "12px 0 0", fontSize: 12, color: "var(--fg-mute)", textAlign: "center", letterSpacing: "0.06em" }}>Vuốt để xem thêm →</p>
      <p style={{ margin: "28px auto 0", maxWidth: 720, fontSize: 12.5, lineHeight: 1.6, color: "var(--fg-mute)", textAlign: "center", fontFamily: "var(--font-sans)" }}>
        Vì nghĩa vụ bảo mật thông tin khách hàng theo quy định pháp luật và quy tắc đạo đức nghề nghiệp luật sư, thông tin nhận dạng đã được ẩn danh và một số chi tiết được lược bỏ hoặc thay đổi để bảo đảm quyền riêng tư.
      </p>
      <div style={{ marginTop: 28, textAlign: "center" }}>
        <a href="#contact" className="nh-micro-cta" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 500, color: "var(--nh-teal-700)", textDecoration: "none" }}>
          Bắt đầu với buổi tư vấn đầu tiên — miễn phí
          <Icon name="arrow-right" size={13} stroke={2} />
        </a>
      </div>
    </Container>
  </section>
);

export default Testimonials;
