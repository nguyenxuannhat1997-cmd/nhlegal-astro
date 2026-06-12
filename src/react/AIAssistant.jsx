import React from 'react';
import { Icon } from './primitives';

const WELCOME = "Xin chào! Tôi là AI Legal Assistant của N.H Legal. Tôi có thể hỗ trợ giải đáp sơ bộ các vấn đề pháp lý. Quý khách quan tâm đến lĩnh vực nào?";

const QUICK_TOPICS = ["Doanh nghiệp & Đầu tư", "Sở hữu trí tuệ & Nhãn hiệu", "Hợp đồng & Giao dịch", "Đất đai & Nhà ở", "Thừa kế & Di chúc", "Hôn nhân & Gia đình", "Lao động & Nhân sự"];

// Backend chat (Gemini) — cấu hình qua PUBLIC_CHAT_API trong .env (Astro chỉ expose biến PUBLIC_*).
// Nếu chưa cấu hình → để trống → bỏ qua gọi API, dùng fallback an toàn (không tự đưa tư vấn pháp lý).
const CHAT_API = (import.meta.env.PUBLIC_CHAT_API || "").replace(/\/$/, "");
const SESSION_KEY = "nh_chat_session_id";

// Fallback AN TOÀN: KHÔNG tự đưa tư vấn pháp lý / trích dẫn điều luật chưa được duyệt.
// Chỉ hướng khách để lại liên hệ để luật sư hỗ trợ trực tiếp.
const SAFE_FALLBACK = "Hiện tôi chưa thể kết nối để trả lời chi tiết. Để được luật sư N.H Legal tư vấn chính xác cho trường hợp của Quý khách, vui lòng để lại số điện thoại bên dưới hoặc gọi 0777 516 000.";

// Chuẩn hoá SĐT: bỏ khoảng trắng/dấu, đổi +84/84 thành 0.
const normalizePhone = (raw) => (raw || "").replace(/[\s.\-()]/g, "").replace(/^\+?84/, "0");
// Hợp lệ: di động 0(3|5|7|8|9)+8 số = 10 số; hoặc cố định 0 + 2x + 8–9 số.
const isValidVNPhone = (raw) => {
  const p = normalizePhone(raw);
  return /^0(3|5|7|8|9)\d{8}$/.test(p) || /^02\d{8,9}$/.test(p);
};

// Fallback offline: khi backend lỗi/chưa bật, dùng câu mẫu theo từ khoá để không bao giờ "chết".
const getFallbackResponse = (text) => {
  const lower = text.toLowerCase();
  for (const r of RESPONSES) {
    if (r.keywords.some(k => lower.includes(k))) return r.answer;
  }
  return "Cảm ơn câu hỏi của Quý khách. Vấn đề này cần được luật sư N.H Legal phân tích trực tiếp để tư vấn chính xác. Vui lòng đặt lịch tư vấn miễn phí để được hỗ trợ chi tiết.";
};

// Gọi backend thật. Trả về { reply, sessionId }. Ném lỗi nếu không gọi được để caller fallback.
const fetchReply = async (message, sessionId) => {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 30000); // 30s timeout
  try {
    const res = await fetch(`${CHAT_API}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: sessionId || null, message }),
      signal: ctrl.signal,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return { reply: data.reply, sessionId: data.session_id };
  } finally {
    clearTimeout(timer);
  }
};

// Gửi thông tin khách (lead) về backend → đẩy Telegram cho N.H Legal.
const fetchLead = async ({ name, phone, need, sessionId }) => {
  const res = await fetch(`${CHAT_API}/lead`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session_id: sessionId || "", name, phone, email: "", need }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
};

const AIAssistant = () => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener('nh:open-ai-chat', handler);
    return () => window.removeEventListener('nh:open-ai-chat', handler);
  }, []);
  const [input, setInput] = React.useState('');
  const [messages, setMessages] = React.useState([{ role: 'ai', text: WELCOME }]);
  const [loading, setLoading] = React.useState(false);
  // Lead form (để lại SĐT)
  const [showLeadForm, setShowLeadForm] = React.useState(false);
  const [leadName, setLeadName] = React.useState('');
  const [leadPhone, setLeadPhone] = React.useState('');
  const [leadStatus, setLeadStatus] = React.useState('idle'); // idle | sending | sent | error
  const sessionId = React.useRef(
    typeof localStorage !== 'undefined' ? localStorage.getItem(SESSION_KEY) : null
  );
  const nudgedRef = React.useRef(false); // đã nhắc để lại SĐT chưa (chỉ nhắc 1 lần)
  const bottomRef = React.useRef(null);

  const submitLead = async () => {
    if (!isValidVNPhone(leadPhone) || leadStatus === 'sending') {
      setLeadStatus('invalid');
      return;
    }
    const phone = normalizePhone(leadPhone);
    setLeadStatus('sending');
    const lastUser = [...messages].reverse().find(m => m.role === 'user');
    const need = lastUser ? lastUser.text : 'Liên hệ từ AI Chat';
    try {
      await fetchLead({ name: leadName.trim(), phone, need, sessionId: sessionId.current });
      setLeadStatus('sent');
      setShowLeadForm(false);
      setMessages(prev => [...prev, { role: 'ai', text: `Cảm ơn ${leadName.trim() || 'Quý khách'}! N.H Legal đã nhận thông tin và sẽ liên hệ lại với bạn trong thời gian sớm nhất. Hotline: 0777 516 000.` }]);
    } catch {
      setLeadStatus('error');
    }
  };

  React.useEffect(() => {
    if (open && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open, loading]);

  const send = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    const turnCount = messages.filter(m => m.role === 'user').length + 1;
    setMessages(prev => [...prev, { role: 'user', text: trimmed }]);
    setInput('');
    setLoading(true);
    try {
      if (!CHAT_API) throw new Error('CHAT_API chưa cấu hình');
      const { reply, sessionId: sid } = await fetchReply(trimmed, sessionId.current);
      if (sid) {
        sessionId.current = sid;
        try { localStorage.setItem(SESSION_KEY, sid); } catch { /* ignore */ }
      }
      setMessages(prev => [...prev, { role: 'ai', text: reply }]);
    } catch {
      // Backend chưa cấu hình/không khả dụng → fallback AN TOÀN (không tự tư vấn pháp lý).
      setMessages(prev => [...prev, { role: 'ai', text: SAFE_FALLBACK }]);
    } finally {
      setLoading(false);
    }
    // Nhắc chủ động để lại SĐT sau câu hỏi thứ 2 (chỉ một lần, nếu khách chưa gửi thông tin)
    if (turnCount >= 2 && !nudgedRef.current && leadStatus !== 'sent') {
      nudgedRef.current = true;
      setMessages(prev => [...prev, { role: 'ai', text: 'Nếu cần luật sư N.H Legal tư vấn kỹ hơn cho trường hợp của mình, anh/chị để lại số điện thoại ngay bên dưới nhé — luật sư sẽ gọi lại ạ.' }]);
      setShowLeadForm(true);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); }
  };

  return (
    <>
      {open && (
        <div className="nh-ai-chat" style={{ position: "fixed", right: 24, bottom: 96, width: 360, background: "#FFFFFF", borderRadius: 20, boxShadow: "var(--shadow-3)", border: "1px solid var(--nh-line)", zIndex: 70, overflow: "hidden", display: "flex", flexDirection: "column", maxHeight: "calc(100vh - 140px)" }}>
          {/* Header */}
          <div style={{ padding: "16px 18px", borderBottom: "1px solid var(--nh-line)", display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--nh-ivory)", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 36, height: 36, borderRadius: 999, background: "var(--nh-teal-700)", color: "#FFFFFF", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="sparkles" size={18} stroke={1.5} />
              </span>
              <div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, color: "var(--nh-navy-900)" }}>AI Legal Assistant</div>
                <div style={{ fontSize: 11, color: "var(--fg-mute)" }}>Đang trực tuyến</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Đóng" style={{ background: "transparent", border: "none", color: "var(--fg-mute)", cursor: "pointer", padding: 4 }}>
              <Icon name="x" size={16} stroke={2} />
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 8px", display: "flex", flexDirection: "column", gap: 10 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.role === 'user' ? "flex-end" : "flex-start" }}>
                <div style={{ maxWidth: "85%", padding: "10px 14px", borderRadius: 14, fontSize: 13, lineHeight: 1.55, background: m.role === 'user' ? "var(--nh-teal-700)" : "var(--nh-ivory)", color: m.role === 'user' ? "#FFFFFF" : "var(--nh-navy-900)" }}>
                  {m.text}
                </div>
              </div>
            ))}
            {/* Typing indicator — hiện khi đang chờ backend trả lời */}
            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div style={{ padding: "12px 16px", borderRadius: 14, background: "var(--nh-ivory)", display: "inline-flex", alignItems: "center", gap: 5 }}>
                  {[0, 1, 2].map((i) => (
                    <span key={i} style={{ width: 6, height: 6, borderRadius: 999, background: "var(--nh-teal-700)", display: "inline-block", animation: "nh-typing 1.2s ease-in-out infinite", animationDelay: `${i * 0.18}s` }} />
                  ))}
                </div>
              </div>
            )}
            {/* Quick topics — only show after welcome message, ẩn khi đang chờ */}
            {messages.length === 1 && !loading && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
                {QUICK_TOPICS.map((t) => (
                  <button key={t} onClick={() => send(t)} style={{ padding: "6px 12px", background: "transparent", border: "1px solid var(--nh-line)", borderRadius: 999, fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--nh-teal-700)", cursor: "pointer" }}>{t}</button>
                ))}
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Nút mở form để lại thông tin */}
          {!showLeadForm && leadStatus !== 'sent' && (
            <button
              type="button"
              onClick={() => { setShowLeadForm(true); setLeadStatus('idle'); }}
              style={{ margin: "0 12px 8px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, padding: "10px 12px", borderRadius: 10, background: "var(--nh-ivory)", border: "1px solid var(--nh-line)", transition: "border-color 240ms", flexShrink: 0, cursor: "pointer", width: "calc(100% - 24px)", textAlign: "left" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--nh-teal-700)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--nh-line)")}>
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 26, height: 26, borderRadius: 999, background: "var(--nh-teal-50)", color: "var(--nh-teal-700)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon name="phone" size={13} stroke={1.6} />
                </span>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 600, color: "var(--nh-navy-900)" }}>Để lại số điện thoại — luật sư gọi lại</span>
              </span>
              <Icon name="arrow-right" size={13} stroke={2} color="var(--nh-teal-700)" />
            </button>
          )}

          {/* Form bắt lead */}
          {showLeadForm && (
            <div style={{ margin: "0 12px 8px", padding: 12, borderRadius: 12, background: "var(--nh-ivory)", border: "1px solid var(--nh-line)", display: "flex", flexDirection: "column", gap: 8, flexShrink: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: 12.5, fontWeight: 600, color: "var(--nh-navy-900)" }}>Luật sư N.H Legal gọi lại cho bạn</span>
                <button onClick={() => setShowLeadForm(false)} aria-label="Đóng" style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--fg-mute)", padding: 2 }}>
                  <Icon name="x" size={14} stroke={2} />
                </button>
              </div>
              <input
                value={leadName}
                onChange={(e) => setLeadName(e.target.value)}
                placeholder="Họ tên (không bắt buộc)"
                style={{ padding: "9px 12px", border: "1px solid var(--nh-line)", borderRadius: 8, fontFamily: "var(--font-sans)", fontSize: 13, outline: "none", color: "var(--nh-navy-900)" }}
              />
              <input
                value={leadPhone}
                onChange={(e) => { setLeadPhone(e.target.value); if (leadStatus === 'invalid' || leadStatus === 'error') setLeadStatus('idle'); }}
                onKeyDown={(e) => { if (e.key === 'Enter') submitLead(); }}
                placeholder="Số điện thoại *"
                inputMode="tel"
                style={{ padding: "9px 12px", border: `1px solid ${leadStatus === 'invalid' ? '#C0392B' : 'var(--nh-line)'}`, borderRadius: 8, fontFamily: "var(--font-sans)", fontSize: 13, outline: "none", color: "var(--nh-navy-900)" }}
              />
              {leadStatus === 'invalid' && (
                <span style={{ fontSize: 11, color: "#C0392B" }}>Số điện thoại chưa đúng. Vui lòng nhập số di động/cố định Việt Nam (ví dụ: 0901234567).</span>
              )}
              {leadStatus === 'error' && (
                <span style={{ fontSize: 11, color: "#C0392B" }}>Gửi chưa được, vui lòng thử lại hoặc gọi 0777 516 000.</span>
              )}
              <button
                onClick={submitLead}
                disabled={leadStatus === 'sending' || !isValidVNPhone(leadPhone)}
                style={{ padding: "10px 12px", borderRadius: 8, border: "none", fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, color: "#FFFFFF", background: (leadStatus === 'sending' || !isValidVNPhone(leadPhone)) ? "var(--nh-line)" : "var(--nh-teal-700)", cursor: (leadStatus === 'sending' || !isValidVNPhone(leadPhone)) ? "default" : "pointer", transition: "background 200ms" }}>
                {leadStatus === 'sending' ? 'Đang gửi…' : 'Gửi thông tin'}
              </button>
            </div>
          )}

          {/* Xác nhận đã gửi */}
          {leadStatus === 'sent' && !showLeadForm && (
            <div style={{ margin: "0 12px 8px", padding: "9px 12px", borderRadius: 10, background: "var(--nh-teal-50)", border: "1px solid var(--nh-teal-100)", display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
              <Icon name="check-circle-2" size={15} stroke={2} color="var(--nh-teal-700)" />
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 600, color: "var(--nh-teal-700)" }}>Đã gửi thông tin cho N.H Legal</span>
            </div>
          )}

          {/* Input */}
          <div style={{ padding: "10px 12px", borderTop: "1px solid var(--nh-line)", display: "flex", gap: 8, flexShrink: 0 }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              disabled={loading}
              placeholder={loading ? "Đang soạn câu trả lời…" : "Nhập câu hỏi của Quý khách…"}
              style={{ flex: 1, padding: "9px 13px", border: "1px solid var(--nh-line)", borderRadius: 999, fontFamily: "var(--font-sans)", fontSize: 13, outline: "none", color: "var(--nh-navy-900)", background: loading ? "var(--nh-ivory)" : "#FFFFFF" }}
            />
            <button onClick={() => send(input)} disabled={loading || !input.trim()} aria-label="Gửi" style={{ width: 36, height: 36, borderRadius: 999, background: (input.trim() && !loading) ? "var(--nh-teal-700)" : "var(--nh-line)", color: (input.trim() && !loading) ? "#FFFFFF" : "var(--fg-mute)", border: "none", display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: (input.trim() && !loading) ? "pointer" : "default", transition: "background 200ms, color 200ms", flexShrink: 0 }}>
              <Icon name="arrow-up" size={14} stroke={2} />
            </button>
          </div>

          {/* Keyframe cho hiệu ứng "đang soạn" */}
          <style>{`@keyframes nh-typing { 0%, 60%, 100% { opacity: 0.25; transform: translateY(0); } 30% { opacity: 1; transform: translateY(-3px); } }`}</style>
        </div>
      )}

      {/* FAB */}
      <button className="nh-ai-fab" onClick={() => setOpen((o) => !o)} style={{ position: "fixed", right: 24, bottom: 24, height: 56, padding: "0 22px 0 18px", background: "var(--nh-teal-900)", color: "#FFFFFF", border: "1px solid rgba(248,248,246,0.15)", borderRadius: 999, fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: 14, letterSpacing: "0.04em", display: "inline-flex", alignItems: "center", gap: 10, cursor: "pointer", boxShadow: "var(--shadow-3)", zIndex: 65, transition: "all var(--dur-base) var(--ease-out)" }}
         onMouseEnter={(e) => (e.currentTarget.style.background = "var(--nh-teal-800)")}
         onMouseLeave={(e) => (e.currentTarget.style.background = "var(--nh-teal-900)")}>
        <span className="nh-ai-fab-icon" style={{ width: 30, height: 30, borderRadius: 999, background: "var(--nh-gold-500)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--nh-navy-900)", flexShrink: 0 }}>
          <Icon name="sparkles" size={18} stroke={1.5} />
        </span>
        <span className="nh-ai-fab-label">AI Legal Assistant</span>
      </button>
    </>
  );
};

export default AIAssistant;
