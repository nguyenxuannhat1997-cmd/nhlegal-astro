import React from 'react';
import {
  ArrowRight as LucideArrowRight, ArrowUp, ArrowLeft, ChevronDown, ChevronRight,
  Phone, X, Menu,
  CheckCircle2, Check, Sparkles, Scale, HeartCrack, Scroll, Building2, Briefcase,
  Users, UserCheck, Lightbulb, ShieldCheck, MessageCircle, MessageCircleQuestion,
  ListChecks, Clock, Handshake, CalendarCheck,
  MapPin, Mail, Facebook, Instagram, Linkedin, Youtube, Library, FileText, HelpCircle,
} from 'lucide-react';

const ICONS = {
  'arrow-right': LucideArrowRight, 'arrow-up': ArrowUp, 'arrow-left': ArrowLeft,
  'chevron-down': ChevronDown, 'chevron-right': ChevronRight,
  'phone': Phone, 'x': X, 'menu': Menu,
  'check-circle-2': CheckCircle2, 'check': Check,
  'sparkles': Sparkles, 'scale': Scale,
  'heart-crack': HeartCrack, 'scroll': Scroll, 'building-2': Building2,
  'briefcase': Briefcase, 'users': Users, 'user-check': UserCheck,
  'lightbulb': Lightbulb,
  'shield-check': ShieldCheck, 'message-circle': MessageCircle,
  'message-circle-question': MessageCircleQuestion,
  'list-checks': ListChecks,
  'clock': Clock, 'handshake': Handshake, 'calendar-check': CalendarCheck, 'map-pin': MapPin,
  'mail': Mail, 'facebook': Facebook, 'instagram': Instagram, 'linkedin': Linkedin,
  'youtube': Youtube, 'library': Library,
  'file-text': FileText, 'help-circle': HelpCircle,
};

const Container = ({ children, narrow, className = "", style = {} }) => (
  <div
    className={"nh-container " + className}
    style={{ maxWidth: narrow ? 1080 : 1200, margin: "0 auto", ...style }}
  >
    {children}
  </div>
);

const Eyebrow = ({ children, color = "var(--nh-teal-700)", withRule = true, light = false }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: 14, fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: light ? "var(--nh-gold-500)" : color }}>
    {withRule && <span style={{ display: "inline-block", width: 32, height: 1, background: "var(--nh-gold-500)" }} />}
    <span>{children}</span>
    {withRule && <span style={{ display: "inline-block", width: 32, height: 1, background: "var(--nh-gold-500)" }} />}
  </div>
);

const SectionHeader = ({ eyebrow, title, lede, align = "left", invert = false, maxWidth = 760, ledeMaxWidth = 900 }) => (
  <div className="nh-section-header" style={{ textAlign: align, maxWidth: align === "center" ? maxWidth : undefined, margin: align === "center" ? "0 auto" : undefined, marginBottom: 48 }}>
    {eyebrow && <div style={{ marginBottom: 24 }}><Eyebrow light={invert}>{eyebrow}</Eyebrow></div>}
    <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "clamp(36px, 4vw, 52px)", lineHeight: 1.12, letterSpacing: "-0.015em", color: invert ? "var(--fg-on-dark)" : "var(--nh-navy-900)", maxWidth: 880 }} dangerouslySetInnerHTML={{ __html: title }} />
    {lede && <p style={{ marginTop: 24, maxWidth: ledeMaxWidth, fontFamily: "var(--font-sans)", fontSize: 17, lineHeight: 1.65, color: invert ? "var(--fg-on-dark-mute)" : "var(--fg-2)", textAlign: "justify" }}>{lede}</p>}
  </div>
);

/* Buttons & links — zero-JS: base + hover đều qua CSS class (xem global.css).
   Điều hướng hash/anchor bằng <a href> gốc + CSS scroll-behavior:smooth. */
const PrimaryButton = ({ children, href = "#", onClick, light = false }) => (
  <a href={href} onClick={onClick} className="nh-btn nh-btn-primary">
    <span>{children}</span>
    <span className="nh-btn-ar"><Icon name="arrow-right" size={16} stroke={2} /></span>
  </a>
);

const GhostButton = ({ children, href = "#", onClick, light = false }) => (
  <a href={href} onClick={onClick} className={"nh-btn " + (light ? "nh-btn-ghost-light" : "nh-btn-ghost")}>
    {children}
  </a>
);

const TextLink = ({ children, href = "#", arrow = true, light = false }) => (
  <a href={href} className={"nh-textlink" + (light ? " nh-textlink-light" : "")}>
    {children}
    {arrow && <span className="nh-ar"><Icon name="arrow-right" size={14} stroke={2} /></span>}
  </a>
);

const Rule = ({ width = 40, color = "var(--nh-gold-500)" }) => (
  <span style={{ display: "inline-block", width, height: 1, background: color }} />
);

const Icon = ({ name, size = 20, stroke = 1.5, color = "currentColor" }) => {
  const LucideIcon = ICONS[name];
  if (!LucideIcon) return <span style={{ width: size, height: size, display: "inline-flex", flexShrink: 0 }} />;
  return <LucideIcon size={size} strokeWidth={stroke} color={color} />;
};

const ArrowRight = ({ size = 14 }) => <Icon name="arrow-right" size={size} />;

const LogoLockup = ({ light = false, size = "md" }) => {
  const h = size === "lg" ? 64 : size === "sm" ? 36 : 54;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
      <img src="/assets/logo-lockup-opt.png" alt="N.H Legal — Công ty Luật TNHH MTV" style={{ height: h, width: "auto", display: "block", flexShrink: 0, filter: light ? "brightness(0) invert(1)" : "none" }} />
      {size === "lg" && (
        <div className="nh-logo-tagline" style={{ display: "flex", flexDirection: "column", justifyContent: "center", borderLeft: `1px solid ${light ? "rgba(255,255,255,0.2)" : "var(--nh-line-strong)"}`, paddingLeft: 11, height: h * 0.58 }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 13, fontStyle: "italic", fontWeight: 500, letterSpacing: "0.01em", color: light ? "var(--nh-gold-300)" : "var(--nh-gold-600)", whiteSpace: "nowrap" }}>
            Uy tín kiến tạo giá trị vững bền.
          </span>
        </div>
      )}
    </div>
  );
};

export { Container, Eyebrow, SectionHeader, PrimaryButton, GhostButton, TextLink, Rule, Icon, ArrowRight, LogoLockup };
