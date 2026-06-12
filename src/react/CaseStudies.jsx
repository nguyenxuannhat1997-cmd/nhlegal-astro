import React from 'react';
import { Container, SectionHeader, Icon } from './primitives';

// Nội dung THẬT do công ty cung cấp — mô tả phạm vi hỗ trợ, KHÔNG nêu kết quả
// thắng/thua, số liệu hay trích dẫn điều luật. Thông tin đã ẩn danh theo nghĩa vụ
// bảo mật. Render TĨNH (zero-JS).
const ICON_BY_AREA = {
  'Doanh nghiệp & Đầu tư': 'briefcase',
  'Sở hữu trí tuệ & Nhãn hiệu': 'lightbulb',
  'Hợp đồng & Giao dịch': 'scroll',
  'Đất đai & Nhà ở': 'building-2',
  'Thừa kế & Di chúc': 'file-text',
  'Hôn nhân & Gia đình': 'heart-crack',
  'Lao động & Nhân sự': 'users',
};

const CASES = [
  { code: 'VV-01', title: 'Hỗ trợ thành lập doanh nghiệp trong lĩnh vực thương mại', body: 'Tư vấn lựa chọn mô hình hoạt động phù hợp, chuẩn bị hồ sơ đăng ký doanh nghiệp và hỗ trợ thực hiện các thủ tục pháp lý sau thành lập.', area: 'Doanh nghiệp & Đầu tư' },
  { code: 'VV-02', title: 'Hỗ trợ thay đổi cơ cấu doanh nghiệp', body: 'Tư vấn và thực hiện thủ tục thay đổi người đại diện theo pháp luật, vốn điều lệ và ngành nghề kinh doanh theo nhu cầu thực tế của doanh nghiệp.', area: 'Doanh nghiệp & Đầu tư' },
  { code: 'VV-03', title: 'Hỗ trợ đăng ký bảo hộ nhãn hiệu cho thương hiệu thực phẩm', body: 'Tư vấn phân nhóm sản phẩm, chuẩn bị hồ sơ và theo dõi quá trình xử lý đơn đăng ký nhãn hiệu.', area: 'Sở hữu trí tuệ & Nhãn hiệu' },
  { code: 'VV-04', title: 'Hỗ trợ bảo vệ quyền sở hữu trí tuệ', body: 'Tư vấn phương án xử lý khi phát hiện dấu hiệu sử dụng trái phép nhãn hiệu trên thị trường.', area: 'Sở hữu trí tuệ & Nhãn hiệu' },
  { code: 'VV-05', title: 'Soạn thảo hợp đồng hợp tác kinh doanh', body: 'Xây dựng bộ hợp đồng và cơ chế phân chia quyền, nghĩa vụ giữa các bên nhằm giảm thiểu nguy cơ tranh chấp.', area: 'Hợp đồng & Giao dịch' },
  { code: 'VV-06', title: 'Rà soát hợp đồng thương mại giá trị lớn', body: 'Phân tích các điều khoản thanh toán, phạt vi phạm, bồi thường thiệt hại và cơ chế giải quyết tranh chấp trước khi ký kết.', area: 'Hợp đồng & Giao dịch' },
  { code: 'VV-07', title: 'Hỗ trợ xử lý hồ sơ cấp Giấy chứng nhận quyền sử dụng đất', body: 'Rà soát điều kiện pháp lý và hướng dẫn hoàn thiện hồ sơ theo quy định hiện hành.', area: 'Đất đai & Nhà ở' },
  { code: 'VV-08', title: 'Hỗ trợ giải quyết tranh chấp quyền sử dụng đất trong gia đình', body: 'Đánh giá chứng cứ, phân tích quyền lợi của các bên và đề xuất phương án giải quyết phù hợp.', area: 'Đất đai & Nhà ở' },
  { code: 'VV-09', title: 'Hỗ trợ khai nhận và phân chia di sản thừa kế', body: 'Tư vấn trình tự, thủ tục và chuẩn bị hồ sơ liên quan đến quyền sử dụng đất là di sản thừa kế.', area: 'Thừa kế & Di chúc' },
  { code: 'VV-10', title: 'Tư vấn lập di chúc và kế hoạch phân chia tài sản', body: 'Xây dựng phương án định đoạt tài sản phù hợp với nguyện vọng của khách hàng và quy định pháp luật.', area: 'Thừa kế & Di chúc' },
  { code: 'VV-11', title: 'Hỗ trợ giải quyết ly hôn có tranh chấp quyền nuôi con', body: 'Đánh giá hồ sơ, chuẩn bị tài liệu chứng minh điều kiện chăm sóc và giáo dục con sau ly hôn.', area: 'Hôn nhân & Gia đình' },
  { code: 'VV-12', title: 'Tư vấn xử lý tranh chấp lao động', body: 'Hỗ trợ rà soát hồ sơ, đánh giá rủi ro và xây dựng phương án giải quyết phù hợp cho doanh nghiệp.', area: 'Lao động & Nhân sự' },
];

const CaseCard = ({ code, title, body, area }) => (
  <div className="nh-case-card" style={{ display: "flex", flexDirection: "column", padding: 32, background: "var(--nh-ivory)", borderRadius: 20, border: "1px solid transparent", minHeight: 220 }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 9, fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--nh-teal-700)", fontWeight: 600 }}>
        <span style={{ width: 34, height: 34, borderRadius: 999, background: "rgba(11,107,114,0.08)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name={ICON_BY_AREA[area] || 'scale'} size={16} stroke={1.6} />
        </span>
        {area}
      </span>
      <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 14, color: "var(--nh-gold-600)" }}>{code}</span>
    </div>
    <h3 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 22, lineHeight: 1.3, letterSpacing: "-0.005em", color: "var(--nh-navy-900)" }}>{title}</h3>
    <p style={{ marginTop: 12, fontSize: 14.5, lineHeight: 1.7, color: "var(--fg-2)", flex: 1, textAlign: "justify" }}>{body}</p>
  </div>
);

const CaseStudies = () => (
  <section className="nh-section-standard" style={{ background: "var(--nh-teal-50)" }}>
    <Container>
      <SectionHeader
        eyebrow="Vụ việc tiêu biểu"
        title="Phạm vi đồng hành.<br/><em style='font-style:normal;color:var(--nh-gold-500);font-weight:500'>Thực tế.</em>"
        lede="Một số vụ việc tiêu biểu thể hiện phạm vi hỗ trợ của N.H Legal trên các lĩnh vực hành nghề."
        ledeMaxWidth="100%"
      />
      <div className="nh-grid-case">
        {CASES.map((c) => <CaseCard key={c.code} {...c} />)}
      </div>
      <p style={{ margin: "28px auto 0", maxWidth: 720, fontSize: 12.5, lineHeight: 1.6, color: "var(--fg-mute)", textAlign: "center", fontFamily: "var(--font-sans)" }}>
        Vì nghĩa vụ bảo mật thông tin khách hàng theo quy định pháp luật và quy tắc đạo đức nghề nghiệp luật sư, một số thông tin chi tiết về vụ việc đã được lược bỏ hoặc thay đổi để bảo đảm quyền riêng tư của khách hàng.
      </p>
      <div style={{ marginTop: 28, textAlign: "center" }}>
        <a href="#contact" className="nh-micro-cta" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 500, color: "var(--nh-teal-700)", textDecoration: "none" }}>
          Vụ việc của bạn — N.H Legal sẵn sàng đồng hành
          <Icon name="arrow-right" size={13} stroke={2} />
        </a>
      </div>
    </Container>
  </section>
);

export default CaseStudies;
