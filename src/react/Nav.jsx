import React from 'react';
import { Container, Icon, LogoLockup } from './primitives';

const NavCTA = ({ href = "/#contact", onClick, children = "Tư vấn ngay" }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="nav-cta-dome"
      style={{ position: "relative", overflow: "hidden", display: "inline-flex", alignItems: "center", gap: 9, padding: "13px 26px", background: "linear-gradient(180deg, #DCC089 0%, #BE9F61 50%, #A4853F 100%)", color: "#FFFFFF", textShadow: "0 1px 1.5px rgba(96,74,30,0.55)", textDecoration: "none", fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 14, letterSpacing: "0.02em", borderRadius: 999, border: "none", whiteSpace: "nowrap", flexShrink: 0, boxShadow: hover ? "0 16px 30px rgba(120,95,40,0.42), inset 0 1.5px 0 rgba(255,255,255,0.6), inset 0 -3px 6px rgba(110,85,35,0.45)" : "0 12px 24px rgba(120,95,40,0.38), inset 0 1.5px 0 rgba(255,255,255,0.6), inset 0 -3px 6px rgba(110,85,35,0.45)", transform: hover ? "translateY(-2px)" : "translateY(0)", transition: "box-shadow 200ms ease, transform 200ms ease", cursor: "pointer" }}>
      <span>{children}</span>
      <span style={{ display: "inline-flex", transform: hover ? "translateX(3px)" : "translateX(0)", transition: "transform 200ms ease" }}>
        <Icon name="arrow-right" size={16} stroke={2} />
      </span>
    </a>
  );
};

const Nav = ({ pathname = '/' }) => {
  const [scrolled, setScrolled] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState(null);
  const [hoverIdx, setHoverIdx] = React.useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [mobileExpanded, setMobileExpanded] = React.useState({});
  const [activeSection, setActiveSection] = React.useState(null);
  const closeTimer = React.useRef(null);
  const toggleSub = (label) => setMobileExpanded(prev => ({ ...prev, [label]: !prev[label] }));

  const openSub = (idx) => { clearTimeout(closeTimer.current); setHoverIdx(idx); setOpenMenu(idx); };
  const closeSub = () => { closeTimer.current = setTimeout(() => { setHoverIdx(null); setOpenMenu(null); }, 180); };
  const keepSub = () => clearTimeout(closeTimer.current);

  /* <button> is used for all nav items — buttons never receive :visited styling from the browser */
  // href thật cho thẻ <a> (hoạt động cả khi TẮT JS). Hash → "/#x" để full-page nav.
  const hrefFor = (href) => (href && href.startsWith('#') ? '/' + href : href);

  // onClick chỉ TĂNG CƯỜNG: cuộn mượt khi anchor cùng trang chủ; còn lại để <a> điều hướng mặc định.
  const handleItemClick = (href, e) => {
    setMobileMenuOpen(false);
    setOpenMenu(null);
    setHoverIdx(null);
    if (href.startsWith('#') && pathname === '/') {
      if (e) e.preventDefault();
      const el = document.getElementById(href.slice(1));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (href === '/' && pathname === '/') {
      if (e) e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // else: để href của <a> điều hướng tự nhiên (MPA) — không cần JS.
  };

  React.useEffect(() => {
    // MUST be in true DOM/scroll order — the loop picks the LAST section whose
    // top has passed the threshold. DOM order: practice → about → insights → ai → contact.
    const sectionIds = ['practice', 'about', 'insights', 'ai', 'contact'];
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
      // Use getBoundingClientRect().top (viewport-relative) — NOT offsetTop.
      // The Reveal wrapper applies a CSS transform, which makes that wrapper the
      // offsetParent, so el.offsetTop === 0 for those sections. That falsely marked
      // the LAST section (contact) active at the top of the page → "Liên hệ" teal.
      const threshold = window.innerHeight * 0.35;
      let active = null;
      sectionIds.forEach(id => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= threshold) active = id;
      });
      setActiveSection(active);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const items = [
    { label: "Trang chủ", href: "/" },
    { label: "Giới thiệu", href: "#about" },
    { label: "Dịch vụ", href: "/dich-vu", submenu: [
      { label: "Doanh nghiệp & Đầu tư",        href: "/dich-vu/doanh-nghiep-dau-tu" },
      { label: "Sở hữu trí tuệ & Nhãn hiệu",   href: "/dich-vu/so-huu-tri-tue-nhan-hieu" },
      { label: "Hợp đồng & Giao dịch",         href: "/dich-vu/hop-dong-giao-dich" },
      { label: "Đất đai & Nhà ở",              href: "/dich-vu/dat-dai-nha-o" },
      { label: "Thừa kế & Di chúc",            href: "/dich-vu/thua-ke-di-chuc" },
      { label: "Hôn nhân & Gia đình",          href: "/dich-vu/hon-nhan-gia-dinh" },
      { label: "Lao động & Nhân sự",           href: "/dich-vu/lao-dong-nhan-su" },
    ]},
    { label: "Tin tức", href: "/bai-viet" },
    { label: "Tài liệu", href: "/tai-lieu" },
    { label: "Liên hệ", href: "#contact" },
  ];

  return (
    <>
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 60, background: "rgba(251, 250, 247, 0.92)", backdropFilter: "blur(16px) saturate(1.2)", WebkitBackdropFilter: "blur(16px) saturate(1.2)", borderBottom: "1px solid rgba(8, 23, 45, 0.07)", boxShadow: scrolled ? "0 1px 24px rgba(8, 23, 45, 0.06)" : "none", transition: "box-shadow var(--dur-base) var(--ease-out)" }}>
        <Container>
          <div className="nh-nav-header-inner" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: scrolled ? 80 : 100, transition: "height var(--dur-base) var(--ease-out)" }}>
            <a href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", marginLeft: 14, flexShrink: 0 }}>
              <LogoLockup size="lg" />
            </a>

            <nav className="nh-nav-menu" style={{ display: "flex", alignItems: "center", gap: 4 }}>
              {items.map((it, idx) => {
                const hovered = hoverIdx === idx;
                const path = pathname;
                let active;
                if (path === '/') {
                  active = it.href === '/' ? activeSection === null : activeSection === it.href.replace('#', '');
                } else if (it.href === '/bai-viet' && path.startsWith('/bai-viet')) {
                  active = true;
                } else if (it.href === '/tai-lieu' && path.startsWith('/tai-lieu')) {
                  active = true;
                } else if (it.href === '/dich-vu' && path.startsWith('/dich-vu')) {
                  active = true;
                } else {
                  active = false;
                }
                const color = (hovered || active) ? "var(--nh-teal-700)" : "#11181B";
                return (
                  <div key={it.label} style={{ position: "relative", flexShrink: 0 }}
                       onMouseEnter={() => it.submenu ? openSub(idx) : (keepSub(), setHoverIdx(idx))}
                       onMouseLeave={() => it.submenu ? closeSub() : setHoverIdx(null)}>
                    {/* <a href> thật → điều hướng được cả khi TẮT JS; onClick chỉ tăng cường cuộn mượt.
                        Reset :visited bằng CSS global (a:visited{color:inherit}) nên không lo màu tím. */}
                    <a
                      href={hrefFor(it.href)}
                      onClick={(e) => handleItemClick(it.href, e)}
                      style={{ background: "none", border: "none", cursor: "pointer", position: "relative", display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 15px", color, fontFamily: "var(--font-sans)", fontWeight: active ? 600 : 500, fontSize: 14, letterSpacing: "0.01em", whiteSpace: "nowrap", textDecoration: "none", transition: "color 280ms cubic-bezier(0.22, 1, 0.36, 1)" }}
                    >
                      {it.label}
                      {it.submenu && (
                        <span style={{ display: "inline-flex", transform: hovered ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 320ms cubic-bezier(0.22, 1, 0.36, 1)" }}>
                          <Icon name="chevron-down" size={12} stroke={2} />
                        </span>
                      )}
                      <span aria-hidden style={{ position: "absolute", left: 15, right: 15, bottom: 4, height: 1.5, background: "var(--nh-teal-700)", transform: (hovered || active) ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left center", transition: "transform 360ms cubic-bezier(0.22, 1, 0.36, 1)" }} />
                    </a>
                    {it.submenu && openMenu === idx && (
                      <div onMouseEnter={keepSub} onMouseLeave={closeSub} style={{ position: "absolute", top: "100%", left: 0, minWidth: 240, background: "#FFFFFF", border: "1px solid var(--nh-line)", borderRadius: 12, boxShadow: "var(--shadow-3)", paddingTop: 10, paddingBottom: 6, marginTop: 0 }}>
                        {it.submenu.map((s) => (
                          <a
                            key={s.label}
                            href={hrefFor(s.href)}
                            onClick={(e) => handleItemClick(s.href, e)}
                            style={{ width: "100%", boxSizing: "border-box", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 18px", color: "#11181B", fontFamily: "var(--font-sans)", fontSize: 13, whiteSpace: "nowrap", textAlign: "left", textDecoration: "none", transition: "background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out), padding-left var(--dur-fast) var(--ease-out)" }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--nh-ivory)"; e.currentTarget.style.color = "var(--nh-teal-700)"; e.currentTarget.style.paddingLeft = "22px"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#11181B"; e.currentTarget.style.paddingLeft = "18px"; }}
                          >
                            <span>{s.label}</span>
                            <Icon name="chevron-right" size={11} stroke={2} color="var(--fg-mute)" />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div className="nh-nav-cta-mobile">
                <NavCTA href={hrefFor('#contact')} onClick={(e) => handleItemClick('#contact', e)}>Tư vấn ngay</NavCTA>
              </div>
              <div className="nh-nav-cta-desktop" style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <a href="tel:0777516000" className="nh-nav-phone" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--fg-2)", fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 500, textDecoration: "none", whiteSpace: "nowrap", transition: "color 280ms cubic-bezier(0.22, 1, 0.36, 1)" }}
                   onMouseEnter={(e) => (e.currentTarget.style.color = "var(--nh-teal-700)")}
                   onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg-2)")}>
                  <Icon name="phone" size={13} color="var(--nh-gold-500)" />
                  0777 516 000
                </a>
                <NavCTA href={hrefFor('#contact')} onClick={(e) => handleItemClick('#contact', e)}>Tư vấn ngay</NavCTA>
              </div>
              <button className="nh-nav-hamburger" type="button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu" style={{ background: "transparent", border: "none", color: "var(--nh-navy-900)", cursor: "pointer", display: "none", alignItems: "center", justifyContent: "center", width: 44, height: 44, padding: 0, margin: "-4px -8px -4px 0" }}>
                <Icon name={mobileMenuOpen ? "x" : "menu"} size={26} stroke={1.5} />
              </button>
            </div>
          </div>
        </Container>
      </header>

      {mobileMenuOpen && (
        <div className="nh-mobile-overlay" style={{ position: "fixed", top: scrolled ? 80 : 100, left: 0, right: 0, bottom: 0, background: "#FBFAF7", overflowY: "auto", display: "flex", flexDirection: "column", borderTop: "1px solid rgba(8, 23, 45, 0.07)", zIndex: 61 }}>
          <div style={{ padding: "24px 20px", display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
            {items.map((it) => (
              <div key={it.label} style={{ borderBottom: "1px solid var(--nh-line)" }}>
                {it.submenu ? (
                  <button type="button" onClick={() => toggleSub(it.label)} style={{ width: "100%", background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", fontSize: 17, fontFamily: "var(--font-sans)", color: "#11181B", fontWeight: 600, letterSpacing: "0.01em" }}>
                    <span>{it.label}</span>
                    <span style={{ display: "inline-flex", transform: mobileExpanded[it.label] ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 280ms var(--ease-out)", color: "var(--nh-teal-700)" }}>
                      <Icon name="chevron-down" size={16} stroke={2} />
                    </span>
                  </button>
                ) : (
                  <a href={hrefFor(it.href)} onClick={(e) => handleItemClick(it.href, e)} style={{ width: "100%", boxSizing: "border-box", background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: "14px 0", fontSize: 17, fontFamily: "var(--font-sans)", color: "#11181B", fontWeight: 600, letterSpacing: "0.01em", textAlign: "left", textDecoration: "none" }}>
                    {it.label}
                  </a>
                )}
                {it.submenu && mobileExpanded[it.label] && (
                  <div style={{ paddingLeft: 16, paddingBottom: 12, display: "flex", flexDirection: "column", gap: 0, borderLeft: "2px solid var(--nh-teal-700)", marginLeft: 2 }}>
                    {it.submenu.map(s => (
                      <a key={s.label} href={hrefFor(s.href)} onClick={(e) => handleItemClick(s.href, e)} style={{ background: "transparent", border: "none", cursor: "pointer", display: "block", padding: "9px 0", fontSize: 14, fontFamily: "var(--font-sans)", color: "#4A4F55", textAlign: "left", textDecoration: "none" }}>
                        {s.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div style={{ marginTop: "auto", paddingTop: 28, display: "flex", flexDirection: "column", gap: 16 }}>
              <a href="tel:0777516000" style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 15, color: "#11181B", textDecoration: "none", fontFamily: "var(--font-sans)", fontWeight: 500 }}>
                <span style={{ color: "var(--nh-gold-500)", display: "inline-flex" }}><Icon name="phone" size={16} stroke={1.5} /></span>
                0777 516 000
              </a>
              <NavCTA href={hrefFor('#contact')} onClick={(e) => handleItemClick('#contact', e)}>Tư vấn ngay</NavCTA>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;
