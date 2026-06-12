// ============================================================
// N.H Legal — Cấu trúc dịch vụ CHÍNH THỨC (7 nhóm category)
// - Mỗi nhóm = 1 trang; dịch vụ con render dạng section + hasOfferCatalog.
// - KHÔNG tạo trang cấp 3 (sub-service) ở giai đoạn này.
// - faqs: nội dung Hub do công ty cung cấp (đã duyệt) → nhúng FAQPage schema.
// - whyUs = null → placeholder chờ nội dung "Vì sao chọn" riêng từng nhóm.
// - pricing: giá tham khảo THẬT (đã có) + disclaimer; KHÔNG cam kết thời hạn/kết quả.
// ============================================================

// Quy trình làm việc chuẩn (dùng chung, có thể override bằng service.process)
export const DEFAULT_PROCESS = [
  { step: 'Tiếp nhận & lắng nghe', desc: 'Trao đổi ban đầu để hiểu rõ tình huống, mục tiêu và mong muốn của khách hàng.' },
  { step: 'Đánh giá hồ sơ & rủi ro', desc: 'Rà soát tài liệu, xác định cơ sở pháp lý và những rủi ro cần lưu ý.' },
  { step: 'Đề xuất phương án', desc: 'Trình bày các phương án xử lý kèm phân tích ưu/nhược điểm và chi phí dự kiến.' },
  { step: 'Triển khai & đại diện', desc: 'Soạn thảo hồ sơ, làm việc với cơ quan chức năng hoặc đại diện theo ủy quyền.' },
  { step: 'Bàn giao & đồng hành', desc: 'Bàn giao kết quả, hướng dẫn các bước tiếp theo và hỗ trợ phát sinh nếu có.' },
];

// Phí dịch vụ chuẩn hóa — đã/chưa bao gồm (dùng chung)
export const PRICING_INCLUDED = [
  'Tiếp nhận và đánh giá thông tin ban đầu.',
  'Tư vấn phương án pháp lý phù hợp.',
  'Soạn thảo hồ sơ và tài liệu cần thiết.',
  'Hỗ trợ trong quá trình thực hiện thủ tục.',
  'Theo dõi tiến độ và phản hồi các vấn đề phát sinh trong phạm vi đã thỏa thuận.',
];
export const PRICING_EXCLUDED = [
  'Lệ phí nhà nước theo quy định.',
  'Phí công chứng, chứng thực hoặc dịch thuật (nếu có).',
  'Các khoản thuế, phí hoặc chi phí phát sinh ngoài phạm vi dịch vụ đã thỏa thuận.',
];

export const PRICING_DISCLAIMER =
  'Mức phí trên chỉ mang tính tham khảo. Báo giá chính thức sẽ được N.H Legal gửi bằng văn bản sau khi tiếp nhận và đánh giá thông tin vụ việc.';

export const SERVICES = [
  // 1 ───────────────────────────────────────────────────────
  {
    slug: 'doanh-nghiep-dau-tu',
    order: 1,
    label: 'Doanh nghiệp & Đầu tư',
    labelEn: 'Corporate & Investment',
    icon: 'briefcase',
    positioning: 'Khởi nghiệp vững chắc',
    metaTitle: 'Luật sư Doanh nghiệp & Đầu tư — Thành lập, Thay đổi ĐKKD, Pháp lý thường xuyên',
    seoDesc: 'N.H Legal tư vấn thành lập công ty, thay đổi đăng ký doanh nghiệp, giấy phép con, cơ cấu vốn và pháp lý thường xuyên cho SME & startup tại TP. Hồ Chí Minh và toàn quốc.',
    heroDesc: 'Đồng hành pháp lý cùng doanh nghiệp từ ngày đầu thành lập đến giai đoạn vận hành và mở rộng — nền tảng cho một khởi đầu vững chắc.',
    subServices: [
      'Thành lập công ty',
      'Thay đổi đăng ký doanh nghiệp',
      'Giải thể doanh nghiệp',
      'Giấy phép con',
      'Tư vấn pháp lý thường xuyên',
      'Cơ cấu vốn và thành viên',
      'Hợp đồng nội bộ doanh nghiệp',
    ],
    whenNeed: [
      'Bạn chuẩn bị khởi nghiệp và cần chọn loại hình, cơ cấu vốn phù hợp.',
      'Doanh nghiệp cần thay đổi ngành nghề, vốn, người đại diện hoặc địa chỉ.',
      'Hoạt động kinh doanh thuộc ngành nghề có điều kiện, cần giấy phép con.',
      'Doanh nghiệp muốn có bộ phận pháp chế thuê ngoài để xử lý vấn đề thường xuyên.',
    ],
    commonProblems: [
      'Chọn sai loại hình hoặc cơ cấu vốn gây khó khăn khi gọi vốn về sau.',
      'Hồ sơ thay đổi đăng ký bị trả lại nhiều lần do thiếu/sai giấy tờ.',
      'Thiếu thỏa thuận nội bộ rõ ràng giữa các thành viên/cổ đông.',
      'Hoạt động khi chưa đủ điều kiện giấy phép, tiềm ẩn rủi ro xử phạt.',
    ],
    weSupport: [
      'Tư vấn lựa chọn loại hình, ngành nghề và cơ cấu vốn tối ưu.',
      'Thực hiện trọn gói thủ tục thành lập, thay đổi, giải thể doanh nghiệp.',
      'Soạn thảo điều lệ, quy chế nội bộ, thỏa thuận thành viên/cổ đông.',
      'Tư vấn và xin các loại giấy phép con theo ngành nghề.',
      'Dịch vụ pháp lý thường xuyên theo gói hằng tháng.',
    ],
    pricing: {
      mode: 'disclosed',
      items: [
        { name: 'Thành lập công ty / doanh nghiệp', price: 'Từ 1.500.000đ' },
        { name: 'Thay đổi đăng ký doanh nghiệp', price: 'Từ 1.200.000đ' },
      ],
    },
    whyUs: [
      { title: 'Đồng hành cùng doanh nghiệp trên từng giai đoạn phát triển', desc: 'Từ thành lập doanh nghiệp, hoàn thiện cơ cấu quản trị đến mở rộng hoạt động kinh doanh, N.H Legal cung cấp giải pháp pháp lý xuyên suốt thay vì chỉ xử lý từng thủ tục riêng lẻ.' },
      { title: 'Giải pháp pháp lý gắn với mục tiêu kinh doanh', desc: 'Mỗi tư vấn đều được xem xét dưới góc độ pháp lý và hiệu quả vận hành thực tế nhằm giúp doanh nghiệp giảm thiểu rủi ro và tối ưu nguồn lực.' },
      { title: 'Ưu tiên phòng ngừa hơn xử lý tranh chấp', desc: 'Chúng tôi tập trung xây dựng nền tảng pháp lý vững chắc để hạn chế các rủi ro có thể phát sinh trong quá trình hoạt động của doanh nghiệp.' },
      { title: 'Minh bạch và trách nhiệm trong từng hồ sơ', desc: 'Khách hàng được thông tin rõ về phạm vi công việc, tiến độ thực hiện và các rủi ro pháp lý liên quan trước khi triển khai.' },
    ],
    faqs: [
      { q: 'Thành lập công ty mất bao lâu?', a: 'Thông thường từ 03–05 ngày làm việc kể từ khi hồ sơ hợp lệ được nộp.' },
      { q: 'Nên chọn công ty TNHH hay công ty cổ phần?', a: 'Tùy quy mô, số lượng thành viên góp vốn và định hướng phát triển của doanh nghiệp.' },
      { q: 'Một người có thể thành lập nhiều công ty không?', a: 'Có. Pháp luật hiện hành không hạn chế số lượng doanh nghiệp mà một cá nhân được thành lập hoặc góp vốn.' },
      { q: 'Vốn điều lệ nên đăng ký bao nhiêu?', a: 'Tùy ngành nghề kinh doanh, nhu cầu hoạt động và chiến lược phát triển của doanh nghiệp.' },
      { q: 'Có cần chứng minh vốn điều lệ không?', a: 'Phần lớn ngành nghề không yêu cầu chứng minh vốn điều lệ, trừ trường hợp pháp luật có quy định riêng.' },
      { q: 'Sau khi thành lập công ty cần làm gì?', a: 'Doanh nghiệp cần thực hiện các nghĩa vụ về thuế, hóa đơn điện tử, tài khoản ngân hàng và các thủ tục liên quan khác.' },
      { q: 'Có bắt buộc thuê kế toán không?', a: 'Doanh nghiệp vẫn phải thực hiện đầy đủ chế độ kế toán và nghĩa vụ thuế theo quy định.' },
      { q: 'Khi nào cần thay đổi đăng ký doanh nghiệp?', a: 'Khi thay đổi tên công ty, địa chỉ, ngành nghề, vốn điều lệ hoặc người đại diện theo pháp luật.' },
      { q: 'Công ty có thể đặt trụ sở tại căn hộ chung cư không?', a: 'Tùy mục đích sử dụng và quy định của từng loại nhà chung cư.' },
      { q: 'Doanh nghiệp có bắt buộc phải có con dấu không?', a: 'Doanh nghiệp được tự quyết định về hình thức, số lượng và việc sử dụng con dấu.' },
      { q: 'N.H Legal có hỗ trợ pháp lý thường xuyên không?', a: 'Có. N.H Legal cung cấp dịch vụ pháp lý thường xuyên cho doanh nghiệp theo gói hằng tháng.' },
      { q: 'N.H Legal có hỗ trợ doanh nghiệp trên toàn quốc không?', a: 'Có. N.H Legal hỗ trợ khách hàng trên toàn quốc thông qua hình thức làm việc trực tuyến hoặc trực tiếp.' },
    ],
  },

  // 2 ───────────────────────────────────────────────────────
  {
    slug: 'so-huu-tri-tue-nhan-hieu',
    order: 2,
    label: 'Sở hữu trí tuệ & Nhãn hiệu',
    labelEn: 'Intellectual Property & Trademark',
    icon: 'lightbulb',
    metaTitle: 'Luật sư Sở hữu trí tuệ — Đăng ký nhãn hiệu, Bản quyền, Bảo vệ thương hiệu',
    seoDesc: 'N.H Legal tư vấn đăng ký nhãn hiệu, tra cứu khả năng bảo hộ, gia hạn văn bằng, chuyển nhượng nhãn hiệu, đăng ký bản quyền tác giả và xử lý xâm phạm quyền SHTT.',
    heroDesc: 'Thương hiệu và sáng tạo là tài sản vô hình giá trị nhất. N.H Legal hỗ trợ đăng ký bảo hộ và xử lý hiệu quả mọi hành vi xâm phạm.',
    subServices: [
      'Đăng ký nhãn hiệu',
      'Tra cứu khả năng bảo hộ',
      'Gia hạn văn bằng bảo hộ',
      'Chuyển nhượng nhãn hiệu',
      'Đăng ký bản quyền tác giả',
      'Bảo vệ quyền sở hữu trí tuệ',
    ],
    whenNeed: [
      'Bạn xây dựng thương hiệu mới và muốn bảo hộ tên, logo, nhãn hiệu.',
      'Bạn cần kiểm tra khả năng đăng ký trước khi đầu tư cho thương hiệu.',
      'Văn bằng bảo hộ sắp hết hạn cần gia hạn.',
      'Bạn phát hiện bên khác sử dụng trái phép nhãn hiệu, tác phẩm của mình.',
    ],
    commonProblems: [
      'Sử dụng thương hiệu nhiều năm nhưng chưa đăng ký, dễ bị bên khác đăng ký trước.',
      'Nhãn hiệu bị từ chối do trùng/tương tự với nhãn hiệu đã có.',
      'Quên gia hạn khiến văn bằng hết hiệu lực.',
      'Khó xử lý khi phát hiện hàng giả, hàng nhái, vi phạm bản quyền.',
    ],
    weSupport: [
      'Tra cứu, đánh giá khả năng bảo hộ trước khi nộp đơn.',
      'Soạn và nộp đơn đăng ký nhãn hiệu, bản quyền; theo dõi đến khi cấp văn bằng.',
      'Gia hạn, chuyển nhượng, cấp phép quyền sở hữu trí tuệ.',
      'Tư vấn và hỗ trợ xử lý hành vi xâm phạm quyền SHTT.',
    ],
    pricing: {
      mode: 'disclosed',
      items: [
        { name: 'Đăng ký bảo hộ nhãn hiệu', price: 'Từ 2.500.000đ' },
      ],
    },
    whyUs: [
      { title: 'Đánh giá khả năng bảo hộ trước khi nộp đơn', desc: 'Việc tra cứu và phân tích kỹ lưỡng ngay từ đầu giúp khách hàng có cơ sở lựa chọn phương án đăng ký phù hợp và hạn chế các rủi ro không cần thiết.' },
      { title: 'Đồng hành xuyên suốt quá trình bảo hộ', desc: 'N.H Legal hỗ trợ từ khâu tư vấn, chuẩn bị hồ sơ, nộp đơn đến theo dõi và xử lý các yêu cầu phát sinh từ cơ quan có thẩm quyền.' },
      { title: 'Bảo vệ giá trị thương hiệu dài hạn', desc: 'Không chỉ hỗ trợ đăng ký, chúng tôi còn tư vấn các giải pháp quản lý, khai thác và bảo vệ tài sản sở hữu trí tuệ trong hoạt động kinh doanh.' },
      { title: 'Minh bạch về lộ trình và chi phí', desc: 'Khách hàng được cập nhật tình trạng hồ sơ, các mốc xử lý quan trọng và các khoản phí liên quan trong suốt quá trình thực hiện.' },
    ],
    faqs: [
      { q: 'Có nên đăng ký nhãn hiệu ngay khi bắt đầu kinh doanh không?', a: 'Có. Đăng ký sớm giúp xác lập quyền và hạn chế rủi ro bị bên khác đăng ký trước.' },
      { q: 'Đăng ký nhãn hiệu mất bao lâu?', a: 'Thông thường từ 12–18 tháng, tùy quá trình thẩm định tại cơ quan nhà nước.' },
      { q: 'Logo và nhãn hiệu có giống nhau không?', a: 'Không hoàn toàn. Logo có thể là một phần của nhãn hiệu và có cơ chế bảo hộ riêng.' },
      { q: 'Có thể đăng ký nhãn hiệu trên toàn quốc không?', a: 'Có. Văn bằng bảo hộ nhãn hiệu có hiệu lực trên phạm vi toàn quốc.' },
      { q: 'Trước khi nộp đơn có cần tra cứu không?', a: 'Nên thực hiện tra cứu trước khi nộp đơn để đánh giá khả năng được bảo hộ.' },
      { q: 'Văn bằng bảo hộ có thời hạn bao lâu?', a: '10 năm và có thể gia hạn nhiều lần.' },
      { q: 'Có thể đăng ký tên thương hiệu bằng tiếng Anh không?', a: 'Có.' },
      { q: 'Một nhãn hiệu có thể đăng ký cho nhiều nhóm sản phẩm không?', a: 'Có.' },
      { q: 'Nhãn hiệu bị từ chối có được nộp lại không?', a: 'Có thể, tùy từng trường hợp và lý do từ chối.' },
      { q: 'Nhãn hiệu bị xâm phạm phải làm gì?', a: 'Có thể yêu cầu chấm dứt hành vi vi phạm hoặc áp dụng các biện pháp pháp lý phù hợp.' },
      { q: 'Có cần đăng ký bản quyền logo không?', a: 'Tùy mục đích bảo vệ quyền sở hữu trí tuệ của bạn.' },
      { q: 'N.H Legal có theo dõi đơn đăng ký không?', a: 'Có. N.H Legal theo dõi tiến trình đơn và phản hồi các yêu cầu của cơ quan đăng ký.' },
    ],
  },

  // 3 ───────────────────────────────────────────────────────
  {
    slug: 'hop-dong-giao-dich',
    order: 3,
    label: 'Hợp đồng & Giao dịch',
    labelEn: 'Contracts & Transactions',
    icon: 'scroll',
    metaTitle: 'Luật sư Hợp đồng — Soạn thảo, Rà soát, Đàm phán hợp đồng thương mại',
    seoDesc: 'N.H Legal soạn thảo, rà soát và đàm phán hợp đồng dân sự, thương mại, hợp tác kinh doanh, chuyển nhượng — đánh giá rủi ro và bảo vệ quyền lợi cho doanh nghiệp, cá nhân.',
    heroDesc: 'Hợp đồng chặt chẽ là nền tảng của mọi giao dịch bền vững. Chúng tôi giúp hợp đồng của bạn không chỉ hợp pháp mà còn thực thi được trên thực tế.',
    subServices: [
      'Soạn thảo hợp đồng',
      'Rà soát hợp đồng',
      'Đàm phán hợp đồng',
      'Hợp đồng thương mại',
      'Hợp đồng hợp tác kinh doanh',
      'Hợp đồng chuyển nhượng',
    ],
    whenNeed: [
      'Bạn chuẩn bị ký kết một giao dịch có giá trị lớn hoặc nhiều rủi ro.',
      'Bạn nhận được bản hợp đồng từ đối tác và cần đánh giá trước khi ký.',
      'Bạn cần một mẫu hợp đồng chuẩn để dùng nhiều lần trong kinh doanh.',
      'Đang phát sinh tranh chấp về thực hiện hợp đồng.',
    ],
    commonProblems: [
      'Điều khoản mập mờ dẫn đến tranh chấp khi thực hiện.',
      'Thiếu điều khoản phạt vi phạm, bồi thường, giải quyết tranh chấp.',
      'Ký hợp đồng do đối tác soạn mà không nhận ra điều khoản bất lợi.',
      'Hợp đồng không đúng hình thức luật định (vd giao dịch bắt buộc công chứng).',
    ],
    weSupport: [
      'Soạn thảo hợp đồng dân sự, thương mại theo nhu cầu cụ thể.',
      'Rà soát, đánh giá rủi ro và đề xuất chỉnh sửa điều khoản.',
      'Hỗ trợ đàm phán, thương lượng điều khoản với đối tác.',
      'Tư vấn thực hiện, sửa đổi, chấm dứt và xử lý vi phạm hợp đồng.',
    ],
    pricing: {
      mode: 'disclosed',
      items: [
        { name: 'Soạn thảo hoặc rà soát hợp đồng', price: 'Từ 2.000.000đ' },
      ],
    },
    whyUs: [
      { title: 'Hợp đồng được xây dựng phù hợp với từng giao dịch', desc: 'Mỗi giao dịch đều có những đặc điểm và rủi ro riêng. Chúng tôi ưu tiên xây dựng các điều khoản phù hợp với nhu cầu thực tế của khách hàng thay vì sử dụng các mẫu hợp đồng chung.' },
      { title: 'Kiểm soát rủi ro ngay từ giai đoạn đàm phán', desc: 'N.H Legal hỗ trợ nhận diện các điều khoản bất lợi, các nghĩa vụ tiềm ẩn và các nguy cơ tranh chấp có thể phát sinh trong tương lai.' },
      { title: 'Ngôn ngữ pháp lý rõ ràng, dễ áp dụng', desc: 'Hợp đồng được trình bày mạch lạc, dễ hiểu và bảo đảm tính khả thi trong quá trình thực hiện.' },
      { title: 'Đồng hành trong các giao dịch quan trọng', desc: 'Luật sư có thể tham gia tư vấn, thương lượng hoặc hỗ trợ trực tiếp trong các cuộc họp nhằm bảo vệ tốt nhất quyền và lợi ích hợp pháp của khách hàng.' },
    ],
    faqs: [
      { q: 'Có nên sử dụng mẫu hợp đồng trên mạng không?', a: 'Không nên áp dụng nguyên mẫu cho mọi trường hợp vì dễ bỏ sót rủi ro đặc thù của giao dịch.' },
      { q: 'Khi nào cần luật sư rà soát hợp đồng?', a: 'Trước khi ký kết các giao dịch quan trọng hoặc có giá trị lớn.' },
      { q: 'Hợp đồng viết tay có giá trị pháp lý không?', a: 'Có thể có giá trị nếu đáp ứng điều kiện luật định.' },
      { q: 'Hợp đồng không công chứng có hiệu lực không?', a: 'Tùy từng loại hợp đồng; một số giao dịch bắt buộc công chứng theo quy định.' },
      { q: 'Làm sao để hạn chế rủi ro khi ký hợp đồng?', a: 'Cần rà soát kỹ nội dung và làm rõ quyền, nghĩa vụ của các bên trước khi ký.' },
      { q: 'Có thể sửa đổi hợp đồng sau khi ký không?', a: 'Có, thông qua thỏa thuận sửa đổi, bổ sung giữa các bên.' },
      { q: 'Khi đối tác vi phạm hợp đồng phải làm gì?', a: 'Có thể yêu cầu thực hiện nghĩa vụ hoặc bồi thường thiệt hại theo hợp đồng và quy định pháp luật.' },
      { q: 'Hợp đồng điện tử có giá trị pháp lý không?', a: 'Có.' },
      { q: 'Điều khoản phạt vi phạm có bắt buộc không?', a: 'Không. Đây là điều khoản do các bên thỏa thuận.' },
      { q: 'Điều khoản giải quyết tranh chấp nên quy định thế nào?', a: 'Tùy từng giao dịch cụ thể; cần cân nhắc cơ quan giải quyết và phương thức phù hợp.' },
      { q: 'N.H Legal có hỗ trợ đàm phán hợp đồng không?', a: 'Có.' },
      { q: 'N.H Legal có hỗ trợ rà soát hợp đồng quốc tế không?', a: 'Có.' },
    ],
  },

  // 4 ───────────────────────────────────────────────────────
  {
    slug: 'dat-dai-nha-o',
    order: 4,
    label: 'Đất đai & Nhà ở',
    labelEn: 'Land & Housing',
    icon: 'building-2',
    metaTitle: 'Luật sư Đất đai & Nhà ở — Tranh chấp đất, Sổ đỏ, Chuyển nhượng nhà đất',
    seoDesc: 'N.H Legal tư vấn tranh chấp đất đai, thủ tục sổ đỏ, chuyển nhượng quyền sử dụng đất, tặng cho và hợp thức hóa nhà đất, tranh chấp ranh giới tại TP. Hồ Chí Minh và toàn quốc.',
    heroDesc: 'Giao dịch và tranh chấp nhà đất tiềm ẩn rủi ro pháp lý cao. N.H Legal kiểm tra hồ sơ, hỗ trợ thủ tục và bảo vệ tài sản của bạn.',
    subServices: [
      'Tranh chấp đất đai',
      'Sổ đỏ',
      'Chuyển nhượng quyền sử dụng đất',
      'Tặng cho nhà đất',
      'Hợp thức hóa nhà đất',
      'Giải quyết tranh chấp ranh giới',
      'Thủ tục nhà ở',
    ],
    whenNeed: [
      'Bạn mua bán, chuyển nhượng hoặc tặng cho nhà đất và cần kiểm tra pháp lý.',
      'Bạn cần làm sổ đỏ, sang tên hoặc hợp thức hóa nhà đất.',
      'Phát sinh tranh chấp ranh giới, lối đi, quyền sử dụng đất với hàng xóm.',
      'Hồ sơ nhà đất có vướng mắc cần đánh giá trước khi giao dịch.',
    ],
    commonProblems: [
      'Mua nhà đất bằng giấy tay, chưa đủ điều kiện cấp sổ.',
      'Tranh chấp ranh giới, diện tích thực tế lệch so với sổ.',
      'Hồ sơ chuyển nhượng bị vướng do quy hoạch, thế chấp, đồng sở hữu.',
      'Thủ tục cấp/sang tên kéo dài do thiếu giấy tờ nguồn gốc.',
    ],
    weSupport: [
      'Kiểm tra pháp lý nhà đất trước khi giao dịch.',
      'Tư vấn và thực hiện thủ tục cấp, sang tên, hợp thức hóa.',
      'Đại diện thương lượng và giải quyết tranh chấp đất đai, ranh giới.',
      'Tư vấn áp dụng Luật Đất đai 2024 và quy định chuyển tiếp.',
    ],
    pricing: { mode: 'quote' },
    whyUs: [
      { title: 'Đánh giá toàn diện hồ sơ trước khi đề xuất giải pháp', desc: 'Mỗi vụ việc được rà soát kỹ về nguồn gốc đất, hiện trạng pháp lý, tài liệu chứng minh và các yếu tố liên quan để xác định hướng xử lý phù hợp.' },
      { title: 'Ưu tiên giải pháp ổn định và bền vững', desc: 'Chúng tôi không chỉ tập trung giải quyết vướng mắc trước mắt mà còn hướng tới việc hạn chế các rủi ro pháp lý có thể phát sinh trong tương lai.' },
      { title: 'Minh bạch về cơ hội và rủi ro pháp lý', desc: 'Khách hàng được cung cấp đánh giá khách quan về khả năng xử lý vụ việc, các khó khăn có thể gặp phải và những phương án phù hợp với từng tình huống.' },
      { title: 'Đồng hành trong mọi giai đoạn giải quyết vụ việc', desc: 'Từ thủ tục hành chính, hòa giải, làm việc với cơ quan nhà nước đến bảo vệ quyền lợi tại Tòa án khi cần thiết.' },
    ],
    faqs: [
      { q: 'Đất giấy tay có làm Sổ đỏ được không?', a: 'Tùy từng trường hợp, phụ thuộc thời điểm giao dịch và điều kiện thực tế của thửa đất.' },
      { q: 'Tranh chấp đất đai có bắt buộc hòa giải không?', a: 'Một số trường hợp bắt buộc hòa giải tại UBND cấp xã trước khi khởi kiện.' },
      { q: 'Đất đang tranh chấp có được chuyển nhượng không?', a: 'Thông thường sẽ bị hạn chế chuyển nhượng khi đang có tranh chấp.' },
      { q: 'Đất quy hoạch có được cấp Sổ đỏ không?', a: 'Tùy từng trường hợp và loại quy hoạch áp dụng cho thửa đất.' },
      { q: 'N.H Legal có hỗ trợ tranh chấp đất đai không?', a: 'Có. N.H Legal tư vấn, thương lượng và đại diện giải quyết tranh chấp đất đai.' },
    ],
  },

  // 5 ───────────────────────────────────────────────────────
  {
    slug: 'thua-ke-di-chuc',
    order: 5,
    label: 'Thừa kế & Di chúc',
    labelEn: 'Inheritance & Wills',
    icon: 'file-text',
    metaTitle: 'Luật sư Thừa kế & Di chúc — Lập di chúc, Khai nhận & Phân chia di sản',
    seoDesc: 'N.H Legal tư vấn lập di chúc, khai nhận và phân chia di sản, thừa kế theo pháp luật và theo di chúc, giải quyết tranh chấp thừa kế và thừa kế quyền sử dụng đất.',
    heroDesc: 'Hoạch định thừa kế rõ ràng giúp gìn giữ tài sản và hòa khí gia đình. N.H Legal đồng hành ở mọi tình huống — từ lập di chúc đến giải quyết tranh chấp.',
    subServices: [
      'Lập di chúc',
      'Khai nhận di sản',
      'Phân chia di sản',
      'Thừa kế theo pháp luật',
      'Thừa kế theo di chúc',
      'Tranh chấp thừa kế',
      'Thừa kế quyền sử dụng đất',
    ],
    whenNeed: [
      'Bạn muốn lập di chúc để định đoạt tài sản rõ ràng, hợp pháp.',
      'Người thân qua đời và cần làm thủ tục khai nhận, phân chia di sản.',
      'Các đồng thừa kế không thống nhất được cách phân chia.',
      'Di sản là nhà đất cần làm thủ tục thừa kế và sang tên.',
    ],
    commonProblems: [
      'Di chúc không hợp lệ về hình thức nên không có hiệu lực.',
      'Tranh chấp giữa các đồng thừa kế kéo dài, ảnh hưởng hòa khí.',
      'Khó xác định hàng thừa kế và phần di sản của mỗi người.',
      'Di sản là nhà đất chưa hoàn thiện pháp lý, khó sang tên.',
    ],
    weSupport: [
      'Tư vấn và soạn thảo di chúc đúng quy định, hạn chế tranh chấp.',
      'Thực hiện thủ tục khai nhận, thỏa thuận phân chia di sản.',
      'Tư vấn xác định hàng thừa kế theo pháp luật.',
      'Đại diện giải quyết tranh chấp thừa kế tại Tòa án.',
    ],
    pricing: { mode: 'quote' },
    whyUs: [
      { title: 'Tôn trọng ý chí của người để lại di sản', desc: 'Chúng tôi hỗ trợ xây dựng các phương án phân chia tài sản phù hợp với quy định pháp luật và mong muốn chính đáng của gia đình.' },
      { title: 'Hướng tới sự ổn định và hài hòa trong quan hệ gia đình', desc: 'Ưu tiên các giải pháp giúp giảm thiểu mâu thuẫn, hạn chế tranh chấp kéo dài và bảo vệ các giá trị gia đình.' },
      { title: 'Xử lý hiệu quả các hồ sơ có tính chất phức tạp', desc: 'N.H Legal có thể hỗ trợ các trường hợp nhiều đồng thừa kế, tài sản ở nhiều địa phương hoặc có yếu tố nước ngoài.' },
      { title: 'Bảo vệ quyền lợi hợp pháp của khách hàng', desc: 'Đồng hành trong quá trình thương lượng, khai nhận di sản, giải quyết tranh chấp hoặc tham gia tố tụng khi cần thiết.' },
    ],
    faqs: [
      { q: 'Đất chưa có Sổ đỏ có được thừa kế không?', a: 'Có thể được thừa kế nếu đủ điều kiện theo quy định pháp luật.' },
      { q: 'Không có di chúc thì chia thừa kế thế nào?', a: 'Theo quy định về thừa kế theo pháp luật cho các hàng thừa kế.' },
      { q: 'Di chúc viết tay có hợp pháp không?', a: 'Có thể hợp pháp nếu đáp ứng điều kiện luật định về hình thức và nội dung.' },
      { q: 'Con nuôi có được hưởng thừa kế không?', a: 'Có, nếu quan hệ nuôi con nuôi được xác lập hợp pháp.' },
      { q: 'Con riêng có được hưởng thừa kế không?', a: 'Tùy từng quan hệ pháp lý cụ thể giữa con riêng và người để lại di sản.' },
      { q: 'Thời hiệu khởi kiện thừa kế là bao lâu?', a: 'Tùy từng loại yêu cầu; cần xác định mốc thời gian cụ thể cho từng trường hợp.' },
      { q: 'Có thể từ chối nhận di sản thừa kế không?', a: 'Có, theo trình tự và điều kiện luật định.' },
      { q: 'N.H Legal có hỗ trợ khai nhận di sản không?', a: 'Có. N.H Legal hỗ trợ thủ tục khai nhận, thỏa thuận phân chia và giải quyết tranh chấp thừa kế.' },
    ],
  },

  // 6 ───────────────────────────────────────────────────────
  {
    slug: 'hon-nhan-gia-dinh',
    order: 6,
    label: 'Hôn nhân & Gia đình',
    labelEn: 'Marriage & Family',
    icon: 'heart-crack',
    metaTitle: 'Luật sư Hôn nhân & Gia đình — Ly hôn, Quyền nuôi con, Chia tài sản',
    seoDesc: 'N.H Legal tư vấn ly hôn thuận tình và đơn phương, tranh chấp quyền nuôi con, chia tài sản khi ly hôn, cấp dưỡng và thỏa thuận tài sản vợ chồng — bảo vệ quyền lợi của bạn.',
    heroDesc: 'Đồng hành pháp lý tận tâm trong các vụ việc hôn nhân gia đình — bảo vệ quyền lợi của bạn và lợi ích tốt nhất cho con.',
    subServices: [
      'Ly hôn thuận tình',
      'Ly hôn đơn phương',
      'Tranh chấp quyền nuôi con',
      'Chia tài sản khi ly hôn',
      'Cấp dưỡng',
      'Xác định cha mẹ con',
      'Thỏa thuận tài sản vợ chồng',
    ],
    whenNeed: [
      'Vợ chồng muốn chấm dứt hôn nhân (thuận tình hoặc đơn phương).',
      'Đang tranh chấp quyền nuôi con hoặc mức cấp dưỡng.',
      'Có tài sản chung, nợ chung cần phân chia.',
      'Cần lập thỏa thuận tài sản vợ chồng hoặc xác định cha mẹ con.',
    ],
    commonProblems: [
      'Tranh chấp quyền nuôi con căng thẳng, ảnh hưởng tâm lý các bên.',
      'Khó xác định tài sản chung/riêng và cách phân chia.',
      'Bên kia không hợp tác, cố tình kéo dài thủ tục.',
      'Bản án có hiệu lực nhưng việc thi hành (cấp dưỡng, giao con) gặp khó.',
    ],
    weSupport: [
      'Tư vấn thủ tục ly hôn thuận tình và đơn phương.',
      'Bảo vệ quyền lợi trong tranh chấp nuôi con, cấp dưỡng.',
      'Tư vấn phân chia tài sản chung, nợ chung.',
      'Đại diện tham gia tố tụng tại Tòa án.',
    ],
    pricing: { mode: 'quote' },
    whyUs: [
      { title: 'Đặt quyền lợi hợp pháp của khách hàng và con chung làm trọng tâm', desc: 'Mọi giải pháp đều được xây dựng trên cơ sở bảo đảm quyền, lợi ích hợp pháp và sự ổn định lâu dài cho các thành viên trong gia đình.' },
      { title: 'Tiếp cận vụ việc bằng sự thấu hiểu và khách quan', desc: 'Bên cạnh yếu tố pháp lý, chúng tôi chú trọng đến các yếu tố tâm lý, tình cảm và hoàn cảnh thực tế của từng gia đình.' },
      { title: 'Hỗ trợ toàn diện từ tư vấn đến giải quyết tranh chấp', desc: 'Từ ly hôn thuận tình, ly hôn đơn phương, phân chia tài sản đến các tranh chấp về quyền nuôi con và cấp dưỡng.' },
      { title: 'Bảo mật thông tin nghiêm ngặt', desc: 'Thông tin cá nhân, tài chính và các vấn đề riêng tư của khách hàng luôn được bảo mật theo quy định pháp luật và quy tắc đạo đức nghề nghiệp luật sư.' },
    ],
    faqs: [
      { q: 'Ly hôn thuận tình mất bao lâu?', a: 'Thông thường nhanh hơn ly hôn đơn phương do hai bên đã thống nhất các nội dung.' },
      { q: 'Ly hôn đơn phương cần điều kiện gì?', a: 'Người yêu cầu phải có căn cứ theo quy định pháp luật về hôn nhân và gia đình.' },
      { q: 'Ai được quyền nuôi con sau ly hôn?', a: 'Tòa án xem xét trên cơ sở quyền lợi tốt nhất của con.' },
      { q: 'Không giữ giấy đăng ký kết hôn có ly hôn được không?', a: 'Có thể, thông qua việc trích lục hoặc xác minh tại cơ quan có thẩm quyền.' },
      { q: 'Không biết địa chỉ của vợ hoặc chồng có ly hôn được không?', a: 'Tùy từng trường hợp; cần thực hiện các thủ tục xác minh theo quy định.' },
      { q: 'Tài sản hình thành trong hôn nhân có phải tài sản chung không?', a: 'Thông thường là tài sản chung, trừ trường hợp có thỏa thuận hoặc chứng minh là tài sản riêng.' },
      { q: 'Nợ phát sinh trong hôn nhân được xử lý thế nào?', a: 'Tùy nguồn gốc và mục đích khoản nợ.' },
      { q: 'Có thể ly hôn khi đang ở nước ngoài không?', a: 'Có thể, tùy tình huống và thủ tục phù hợp.' },
      { q: 'Ly hôn có cần luật sư không?', a: 'Không bắt buộc, nhưng luật sư có thể giúp bảo vệ quyền lợi tốt hơn.' },
      { q: 'Cha mẹ có được quyền nuôi con khi con dưới 36 tháng tuổi không?', a: 'Tòa án xem xét theo quy định pháp luật, ưu tiên lợi ích của trẻ.' },
      { q: 'Có thể thay đổi người trực tiếp nuôi con sau ly hôn không?', a: 'Có, khi có căn cứ và vì lợi ích của con.' },
      { q: 'N.H Legal có hỗ trợ ly hôn có yếu tố nước ngoài không?', a: 'Có.' },
    ],
  },

  // 7 ───────────────────────────────────────────────────────
  {
    slug: 'lao-dong-nhan-su',
    order: 7,
    label: 'Lao động & Nhân sự',
    labelEn: 'Labor & HR',
    icon: 'users',
    metaTitle: 'Luật sư Lao động & Nhân sự — Hợp đồng LĐ, Kỷ luật, Tranh chấp, BHXH',
    seoDesc: 'N.H Legal tư vấn hợp đồng lao động, nội quy, kỷ luật và sa thải, giải quyết tranh chấp lao động, bảo hiểm xã hội và pháp lý nhân sự cho doanh nghiệp và người lao động.',
    heroDesc: 'Quan hệ lao động lành mạnh là nền tảng phát triển bền vững. Chúng tôi tư vấn và bảo vệ quyền lợi hợp pháp cho cả doanh nghiệp lẫn người lao động.',
    subServices: [
      'Hợp đồng lao động',
      'Nội quy lao động',
      'Kỷ luật lao động',
      'Sa thải lao động',
      'Tranh chấp lao động',
      'Bảo hiểm xã hội',
      'Tư vấn cho doanh nghiệp sử dụng lao động',
    ],
    whenNeed: [
      'Doanh nghiệp cần xây dựng hợp đồng lao động, nội quy, quy chế nhân sự.',
      'Cần xử lý kỷ luật hoặc chấm dứt hợp đồng đúng quy định.',
      'Người lao động cần bảo vệ quyền lợi khi bị xử lý không đúng.',
      'Phát sinh tranh chấp lao động cần giải quyết.',
    ],
    commonProblems: [
      'Xử lý kỷ luật, sa thải sai trình tự dẫn đến bồi thường.',
      'Nội quy, hợp đồng lao động chưa cập nhật quy định mới.',
      'Tranh chấp về lương, trợ cấp, bảo hiểm xã hội.',
      'Người lao động bị chấm dứt hợp đồng không đúng luật.',
    ],
    weSupport: [
      'Soạn thảo, rà soát hợp đồng lao động và nội quy, quy chế nhân sự.',
      'Tư vấn trình tự xử lý kỷ luật, sa thải đúng quy định.',
      'Đại diện giải quyết tranh chấp lao động.',
      'Tư vấn chế độ bảo hiểm xã hội và quyền lợi người lao động.',
    ],
    pricing: { mode: 'quote' },
    whyUs: [
      { title: 'Hiểu rõ nhu cầu của cả doanh nghiệp và người lao động', desc: 'Kinh nghiệm tư vấn cho nhiều nhóm khách hàng khác nhau giúp chúng tôi đưa ra giải pháp cân bằng giữa quyền lợi và nghĩa vụ của các bên.' },
      { title: 'Hỗ trợ xây dựng hệ thống quản trị nhân sự đúng pháp luật', desc: 'Từ nội quy lao động, hợp đồng lao động đến quy trình xử lý kỷ luật và chấm dứt hợp đồng lao động.' },
      { title: 'Phòng ngừa tranh chấp ngay từ đầu', desc: 'N.H Legal tập trung rà soát và hoàn thiện các cơ chế quản trị nhân sự nhằm hạn chế các rủi ro pháp lý trong quá trình sử dụng lao động.' },
      { title: 'Đồng hành khi phát sinh tranh chấp', desc: 'Hỗ trợ thương lượng, hòa giải, làm việc với cơ quan quản lý nhà nước hoặc tham gia bảo vệ quyền và lợi ích hợp pháp của khách hàng tại Tòa án.' },
    ],
    faqs: [
      { q: 'Người lao động nghỉ việc không báo trước có phải bồi thường không?', a: 'Có thể, tùy theo loại hợp đồng và quy định về thời hạn báo trước.' },
      { q: 'Công ty có được giữ lương của người lao động không?', a: 'Không. Việc giữ lương không đúng quy định là trái pháp luật.' },
      { q: 'Khi bị sa thải trái luật phải làm gì?', a: 'Có thể yêu cầu bảo vệ quyền lợi thông qua thương lượng, hòa giải hoặc khởi kiện.' },
      { q: 'Hợp đồng lao động có bắt buộc bằng văn bản không?', a: 'Tùy từng trường hợp; phần lớn quan hệ lao động phải giao kết bằng văn bản.' },
      { q: 'Công ty có được đơn phương chấm dứt hợp đồng lao động không?', a: 'Chỉ khi có căn cứ và tuân thủ trình tự theo luật định.' },
      { q: 'Trợ cấp thôi việc được tính như thế nào?', a: 'Theo quy định của pháp luật lao động về thời gian làm việc và tiền lương.' },
      { q: 'Tranh chấp lao động có phải hòa giải trước không?', a: 'Tùy từng loại tranh chấp; một số trường hợp bắt buộc hòa giải.' },
      { q: 'Thử việc tối đa bao lâu?', a: 'Tùy vị trí công việc theo quy định của Bộ luật Lao động.' },
      { q: 'Người lao động có được đơn phương nghỉ việc không?', a: 'Có, nếu đáp ứng điều kiện và thời hạn báo trước theo luật định.' },
      { q: 'Doanh nghiệp có được phạt tiền người lao động không?', a: 'Không. Phạt tiền thay cho xử lý kỷ luật là hành vi bị cấm.' },
      { q: 'N.H Legal có hỗ trợ xử lý kỷ luật lao động không?', a: 'Có.' },
      { q: 'N.H Legal có hỗ trợ tranh chấp lao động tại tòa án không?', a: 'Có.' },
    ],
  },
];

export const getService = (slug) => SERVICES.find((s) => s.slug === slug) || null;

// Mapping 301: slug cũ (6) → slug mới (7)
export const LEGACY_SLUG_MAP = {
  'ly-hon': 'hon-nhan-gia-dinh',
  'hop-dong': 'hop-dong-giao-dich',
  'bat-dong-san-thua-ke': 'dat-dai-nha-o', // tách đôi; mặc định về Đất đai & Nhà ở
  'doanh-nghiep': 'doanh-nghiep-dau-tu',
  'lao-dong': 'lao-dong-nhan-su',
  'so-huu-tri-tue': 'so-huu-tri-tue-nhan-hieu',
};
