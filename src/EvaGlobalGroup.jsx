import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Building2, ShieldCheck, Landmark, Cpu, Users, Briefcase, Globe2,
  FileSearch, GraduationCap, Handshake, Newspaper, Mail, Phone, MapPin,
  ChevronDown, Menu, X, ArrowUpRight, CheckCircle2, TrendingUp, Award,
  HardHat, Wrench, ClipboardList, Network, BarChart3, ShoppingCart,
  Lock, Search, Home as HomeIcon, Layers, Target, Eye, Compass, Quote,
  MessageCircle
} from "lucide-react";

/* ------------------------------------------------------------------
   DATA — edit the content below to plug in real projects, people,
   partners, and press as they become available.
------------------------------------------------------------------- */

const COMPANY = {
  email: "info@evaglobalgroup.com",
  phone: "+234 8133044666",
  whatsapp: "+234 906 958 0514",
  address: "Second Floor, Block D61–62, EFAB Mall, Area 11, Garki 2, Abuja, Nigeria",
};

const LOGO_SRC = "data:image/png;base64,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F6dxWZnUiV2zuX/OHgiEVU1BpJisVWd277/lc+4nU7PrN56oGLLwAsNkAjFIuYD2gl51iPFqLhkP+IW16OTUohU0xsg18WVwu3/JWwFdutUJEAn30n1xhnwQxbzdfET3S8HOGDzlZZ1orIpunokALmZQk9gogV5fEZA8cMYFRct3JVVq1yViG5iiGqOmX1nSoCsU2p3HLHVYGpjO9QThaOIbX/X7Cgr8xALfugqN+li31EUznxi2solZlw4gTUyxvNtZNDI3/6kiCkD+yaTRfAjN639PZrzP7vPL3buv3vrK2lSikCyKCaYjyg5TboRJmG7hs15e6jwmtQ+vP7HYzvpfUiVLo2+3MChmKmMtXKwUGSQ7ETEd99dgTYKkoKoJl123PbbHH705z4BhvLn/AOmoadmoI69/W3fXLvTfuezfvnd44MIAWpgvw5ajlQL9ohl68uE5UDqDlKqisjc68i9Q8u8OF6EF5/alp5YC/fwWgzPunSUyPYgFXOpcP7LNHF8KBKed/CLQtX3/7MR7zujs+4ucEPruhpNKaUqfqRqr4QxKUIMnPV8ZVLIaxuoRBqAKPvqTtT8Lpc9bWOznXuTUDlkCfqO0sIbezVQRFx+qZP4iwsyMopAiw82JeUK+eRfcePOGDSXnmKxmVoRqXcVpQWFKc3xLXWx9Ox7jN+C4cEZWy2qGQl4yQYqsbMZfhbCTHdIlEqUsi+lVEmAWwo0TpPsjV/1mhMPzEI6QO7dpMGmNBL+MSeuX2v/vVu+9YLWsvdZbb1hAADttbFrVwpNWJUsowhR+ofz8Yr4EfT+SrYsELbGEBHp2mKWfc4KIPLc4EQEVKlnxcxHGR27iDMBVBTeU+nncUdfzXY+4+nzc9P/+DeCq4OuiWZhuUZ6Me+6c5v7Lnqossnj5+/1LcuDXFhipOZ+2wcqhCFHOSpykYAQVGNH0AmoFRRqEbAmC2FSpqEbAWURVYCn0/qLhikESoUqQoUFAI+K37y4Ipdw5bCFtRPeoCkVEtLYCFvSDaWLxpvvXOfKPr4gGgUM8oQyPNlXvbrgW1BQqCiTIQqbahnzs3f4NgSMFo24TC9UPPGl4XPvGOWuBEXUCiiCQBAVBBFgQBBFgQRAEEWBBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBOAb4/wGyQx6qpRZXdAAAAABJRU5ErkJggg==";

function Logo({ size = 40 }) {
  return (
    <img
      src={LOGO_SRC}
      alt="Eva Global Group"
      width={size}
      height={size}
      className="shrink-0 object-contain"
      style={{ height: size, width: "auto" }}
    />
  );
}

/* ------------------------------------------------------------------
   NAVIGATION — each top-level entry is a "page". Only the active
   page renders. Entries with `children` show a dropdown; each child
   navigates to the parent page and scrolls to an anchor inside it.
------------------------------------------------------------------- */

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About Us" },
  { id: "leadership", label: "Leadership" },
  {
    id: "group",
    label: "Our Group",
    children: [
      { anchor: "group-affiliates", label: "Group Affiliates" },
      { anchor: "group-realestate", label: "EVA Real Estate Ecosystem" },
      { anchor: "group-industries", label: "Industries We Serve" },
    ],
  },
  {
    id: "projects",
    label: "Projects",
    children: [
      { anchor: "projects-cases", label: "Case Studies" },
      { anchor: "projects-investors", label: "Investor & Partnership Center" },
    ],
  },
  {
    id: "insights",
    label: "News & Insights",
    children: [
      { anchor: "insights-research", label: "Research & Insights" },
      { anchor: "insights-media", label: "Media Center" },
    ],
  },
  { id: "careers", label: "Careers" },
  { id: "contact", label: "Contact" },
];

const AFFILIATES = [
  { name: "AWFP Global", url: "https://awfpnglobal.com", description: "Professional and institutional development platform within the wider Eva ecosystem." },
  { name: "CICFA Global", url: "https://cicfaglobal.com", description: "Professional and capacity-building organisation serving its specialist community." },
  { name: "CIPFI Global", url: "https://cipfiglobal.com", description: "Professional institute and knowledge platform supporting standards and development." },
  { name: "JVEF Global", url: "https://jvefglobal.org", description: "Global-facing initiative focused on professional and institutional advancement." },
  { name: "CIFIP Nigeria", url: "https://cifipn.org", description: "Professional and institutional platform connected to the group's wider ecosystem." },
  { name: "EIBS Global", url: "https://eibsglobal.com.ng", description: "Business and professional development platform within the Eva network." },
  { name: "ICCGLS", url: "https://iccgls.com", description: "Professional and standards-focused organisation serving its specialist network." },
  { name: "TPAGA", url: "https://tpaga.org.ng", description: "Professional and governance-focused organisation within the broader group ecosystem." },
  { name: "AWPFM Global", url: "https://awpfmglobal.org.ng", description: "Professional development and management-focused organisation." },
];

const LEADERSHIP = {
  name: "CEO / Managing Director",
  role: "Group Chief Executive Officer / Managing Director",
  image: "/ceo.png",
  message:
    "Our ambition is to build enduring businesses that create measurable value, strengthen institutions and contribute meaningfully to Africa's economic development. At Eva Global Group, we believe sustainable growth is built on integrity, innovation, professional excellence and the ability to turn opportunities into lasting value.",
};

const VALUES = [
  { icon: ShieldCheck, title: "Integrity", copy: "We build and secure what we say we will, on terms our partners can verify." },
  { icon: Target, title: "Precision", copy: "Engineering discipline applied to every division, from a foundation pour to a forensic report." },
  { icon: Network, title: "Integration", copy: "Every business unit is designed to connect to the next, not operate in isolation." },
  { icon: Compass, title: "Foresight", copy: "We build for the infrastructure and threat landscape of the next decade, not just today's contract." },
];

const DIVISIONS = [
  { icon: HardHat, name: "Engineering & Construction", summary: "Civil and electrical engineering, building construction, and infrastructure delivery from design through handover.", services: ["Civil Engineering", "Electrical Engineering", "Building Construction", "Infrastructure Projects", "Project Management"], industries: ["Government", "Commercial", "Industrial"] },
  { icon: ClipboardList, name: "Procurement & General Contracting", summary: "End-to-end procurement and contracting infrastructure for organizations that cannot afford supply chain failure.", services: ["Procurement", "Supply Chain Management", "Vendor Management", "General Contracting"], industries: ["Government", "Construction", "Corporate"] },
  { icon: ShieldCheck, name: "Cybersecurity", summary: "Offensive and defensive security services for institutions where a breach is a national, not just corporate, problem.", services: ["Vulnerability Assessment", "Penetration Testing", "Compliance Audits", "Security Operations", "Risk Management"], industries: ["Banking", "Telecoms", "Government", "Oil & Gas"] },
  { icon: FileSearch, name: "Digital Forensics", summary: "Evidence-grade investigation across devices, networks, and cloud environments for legal and enterprise use.", services: ["Computer Forensics", "Mobile Forensics", "Network Forensics", "Cloud Forensics", "Incident Response"], industries: ["Law Enforcement", "Judiciary", "Enterprise", "Financial Services"] },
  { icon: Briefcase, name: "Consulting", summary: "Advisory for leadership teams navigating technology, security, and infrastructure decisions at group scale.", services: ["Technology Consulting", "Digital Transformation", "Security Consulting", "Project Advisory"], industries: ["Government", "Enterprise", "SMEs"] },
  { icon: GraduationCap, name: "Training & Certification Academy", summary: "Building the next generation of engineers, analysts, and investigators through structured, certified programs.", services: ["Cybersecurity Training", "Digital Forensics Training", "Executive Training", "Certification Programs"], industries: ["Public Sector", "Enterprise", "Individuals"] },
];

const INDUSTRIES = [
  { icon: Landmark, name: "Government" },
  { icon: Building2, name: "Banking" },
  { icon: Network, name: "Telecommunications" },
  { icon: Layers, name: "Oil & Gas" },
  { icon: Users, name: "Healthcare" },
  { icon: GraduationCap, name: "Education" },
  { icon: HardHat, name: "Construction" },
  { icon: HomeIcon, name: "Real Estate" },
  { icon: Wrench, name: "Mining & Manufacturing" },
  { icon: Briefcase, name: "SMEs" },
];

const ECOSYSTEM = [
  { key: "engineering", label: "Engineering", x: 300, y: 80, desc: "Designs the physical and technical foundation every other division builds on." },
  { key: "construction", label: "Construction", x: 442, y: 132, desc: "Turns engineering designs into delivered, inspected, occupiable infrastructure." },
  { key: "procurement", label: "Procurement", x: 517, y: 262, desc: "Supplies and contracts the materials, vendors, and services projects depend on." },
  { key: "realestate", label: "Real Estate", x: 491, y: 410, desc: "Hosts the EVA Ecosystem platform where built assets are listed, verified, and financed." },
  { key: "technology", label: "Technology", x: 375, y: 507, desc: "Provides the digital infrastructure connecting every division into one operating system." },
  { key: "cybersecurity", label: "Cybersecurity", x: 225, y: 507, desc: "Protects group and client digital assets across every division and platform." },
  { key: "forensics", label: "Digital Forensics", x: 109, y: 410, desc: "Investigates and resolves incidents when prevention alone isn't enough." },
  { key: "training", label: "Training", x: 83, y: 262, desc: "Builds the talent pipeline that keeps every division staffed and certified." },
  { key: "consulting", label: "Consulting", x: 159, y: 132, desc: "Advises leadership on how the pieces of the ecosystem fit their strategy." },
];

const PROJECTS = [
  { stat: "12+", label: "Active engagements across divisions" },
  { stat: "5", label: "Sectors served: govt, banking, telecoms, oil & gas, real estate" },
  { stat: "100%", label: "Projects delivered under formal risk & compliance review" },
];

const CASE_STUDIES = [
  { division: "Engineering & Construction", title: "Infrastructure Delivery Programme", copy: "Design-through-handover delivery for a multi-phase facilities programme, coordinated across civil, electrical, and project management teams." },
  { division: "Cybersecurity", title: "Financial Sector Security Assessment", copy: "Vulnerability assessment and penetration testing engagement supporting a regulated institution's compliance and risk posture." },
  { division: "Digital Forensics", title: "Incident Response & Evidence Recovery", copy: "Network and device forensics supporting an enterprise incident response engagement, from containment through evidentiary reporting." },
];

const RESEARCH = [
  { tag: "Cybersecurity", title: "Building a Security Operations Baseline for Regulated Institutions" },
  { tag: "Construction", title: "Procurement Risk in Multi-Phase Infrastructure Projects" },
  { tag: "Real Estate Technology", title: "What a Verified Property Passport Solves That a Listing Doesn't" },
];

const CAREERS = [
  { icon: Briefcase, title: "Open Roles", copy: "Current openings across engineering, cybersecurity, forensics, and operations." },
  { icon: GraduationCap, title: "Graduate Programme", copy: "Structured rotations for early-career engineers and analysts." },
  { icon: Users, title: "Internships", copy: "Supervised placements aligned to each business division." },
  { icon: Award, title: "Professional Development", copy: "Certification pathways delivered through the Training Academy." },
];

const INVESTOR_TRACKS = [
  { icon: TrendingUp, title: "Investment Opportunities", copy: "Capital participation across infrastructure, technology, and real estate ventures." },
  { icon: Handshake, title: "Joint Ventures", copy: "Structured partnerships on major engineering and construction programmes." },
  { icon: Cpu, title: "Technology Collaborations", copy: "Co-development on the EVA Ecosystem platform and future ventures." },
  { icon: Landmark, title: "Government Partnerships", copy: "Public-sector infrastructure, security, and advisory engagements." },
];

const ENQUIRY_TYPES = ["Business Enquiry", "Project Request", "Consulting Request", "Support Request", "Training Enquiry"];

/* ------------------------------------------------------------------ */

function Eyebrow({ children }) {
  return <p className="font-mono text-xs tracking-[0.25em] uppercase text-amber-500 mb-3">{children}</p>;
}

function SectionHeading({ eyebrow, title, dark, description, id }) {
  return (
    <div id={id} className="max-w-3xl scroll-mt-28">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className={`font-serif text-3xl sm:text-4xl leading-tight ${dark ? "text-white" : "text-slate-900"}`}>{title}</h2>
      {description && (
        <p className={`mt-4 text-base leading-relaxed ${dark ? "text-slate-400" : "text-slate-600"}`}>{description}</p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------
   DESKTOP NAV ITEM — plain link, or a hover/click dropdown when it
   has children. The parent label always navigates to the page top;
   each child scrolls to its anchor within that page.
------------------------------------------------------------------- */

function DesktopNavItem({ item, activePage, openDropdown, setOpenDropdown, navigateTo }) {
  const isOpen = openDropdown === item.id;
  const isActive = activePage === item.id;

  if (!item.children) {
    return (
      <button
        onClick={() => navigateTo(item.id)}
        className={`text-sm transition-colors ${isActive ? "text-amber-400" : "text-slate-300 hover:text-amber-400"}`}
      >
        {item.label}
      </button>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpenDropdown(item.id)}
      onMouseLeave={() => setOpenDropdown((cur) => (cur === item.id ? null : cur))}
    >
      <button
        onClick={() => {
          navigateTo(item.id);
          setOpenDropdown(isOpen ? null : item.id);
        }}
        className={`flex items-center gap-1 text-sm transition-colors ${isActive ? "text-amber-400" : "text-slate-300 hover:text-amber-400"}`}
        aria-expanded={isOpen}
      >
        {item.label}
        <ChevronDown size={14} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-64 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-lg shadow-xl overflow-hidden">
            {item.children.map((child) => (
              <button
                key={child.anchor}
                onClick={() => {
                  navigateTo(item.id, child.anchor);
                  setOpenDropdown(null);
                }}
                className="w-full text-left px-4 py-3 text-sm text-slate-300 hover:bg-slate-800 hover:text-amber-400 transition-colors border-b border-slate-800/60 last:border-none"
              >
                {child.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------
   MOBILE NAV ITEM — accordion. Tapping a parent with children
   expands/collapses its sub-items instead of navigating immediately.
------------------------------------------------------------------- */

function MobileNavItem({ item, activePage, expanded, setExpanded, navigateTo }) {
  const isOpen = expanded === item.id;
  const isActive = activePage === item.id;

  if (!item.children) {
    return (
      <button
        onClick={() => navigateTo(item.id)}
        className={`block w-full text-left py-2.5 text-sm border-b border-slate-800/60 last:border-none ${
          isActive ? "text-amber-400" : "text-slate-300 hover:text-amber-400"
        }`}
      >
        {item.label}
      </button>
    );
  }

  return (
    <div className="border-b border-slate-800/60 last:border-none">
      <button
        onClick={() => setExpanded(isOpen ? null : item.id)}
        className={`flex w-full items-center justify-between py-2.5 text-sm ${
          isActive ? "text-amber-400" : "text-slate-300"
        }`}
        aria-expanded={isOpen}
      >
        {item.label}
        <ChevronDown size={16} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className="pb-2 pl-3">
          <button
            onClick={() => navigateTo(item.id)}
            className="block w-full text-left py-2 text-xs uppercase tracking-wide text-slate-500 hover:text-amber-400"
          >
            Go to {item.label}
          </button>
          {item.children.map((child) => (
            <button
              key={child.anchor}
              onClick={() => navigateTo(item.id, child.anchor)}
              className="block w-full text-left py-2 text-sm text-slate-400 hover:text-amber-400"
            >
              {child.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ================================================================== */

export default function EvaGlobalGroup() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [activePage, setActivePage] = useState("home");
  const [activeDivision, setActiveDivision] = useState(0);
  const [activeNode, setActiveNode] = useState(ECOSYSTEM[0].key);
  const [form, setForm] = useState({ name: "", email: "", type: ENQUIRY_TYPES[0], message: "" });
  const [submitted, setSubmitted] = useState(false);

  const pendingAnchor = useRef(null);
  const mainRef = useRef(null);

  const activeEcosystemNode = useMemo(
    () => ECOSYSTEM.find((n) => n.key === activeNode) || ECOSYSTEM[0],
    [activeNode]
  );

  // Navigate to a page (and, optionally, a sub-section anchor within it).
  // If we're already on that page, just scroll — changing state to the
  // same value wouldn't re-trigger the effect below.
  const navigateTo = (pageId, anchorId) => {
    setMenuOpen(false);
    setOpenDropdown(null);
    setMobileExpanded(null);

    if (pageId === activePage) {
      requestAnimationFrame(() => {
        if (anchorId) {
          const el = document.getElementById(anchorId);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
            return;
          }
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
      return;
    }

    pendingAnchor.current = anchorId || null;
    setActivePage(pageId);
  };

  // After the active page renders, either scroll to the requested anchor
  // or reset scroll to the top of the page.
  useEffect(() => {
    const anchor = pendingAnchor.current;
    pendingAnchor.current = null;
    const id = requestAnimationFrame(() => {
      if (anchor) {
        const el = document.getElementById(anchor);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
      }
      window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    });
    return () => cancelAnimationFrame(id);
  }, [activePage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');
        .font-serif { font-family: 'Fraunces', serif; }
        .font-mono { font-family: 'IBM Plex Mono', monospace; }
        html { scroll-behavior: smooth; }
        .scroll-mt-28 { scroll-margin-top: 7rem; }
      `}</style>

      {/* ---------------- NAV (persistent) ---------------- */}
      <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
          <button onClick={() => navigateTo("home")} className="flex items-center gap-3 group">
            <Logo size={40} />
            <div className="text-left">
              <p className="text-white font-semibold tracking-wide leading-none text-sm">EVA GLOBAL GROUP</p>
              <p className="font-mono text-[10px] tracking-[0.2em] text-slate-500 mt-1">BUILDING VALUE · CREATING IMPACT</p>
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-7">
            {NAV.map((item) => (
              <DesktopNavItem
                key={item.id}
                item={item}
                activePage={activePage}
                openDropdown={openDropdown}
                setOpenDropdown={setOpenDropdown}
                navigateTo={navigateTo}
              />
            ))}
          </nav>

          <button className="lg:hidden text-white" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-slate-950 border-t border-slate-800 px-6 py-4 max-h-[75vh] overflow-y-auto">
            {NAV.map((item) => (
              <MobileNavItem
                key={item.id}
                item={item}
                activePage={activePage}
                expanded={mobileExpanded}
                setExpanded={setMobileExpanded}
                navigateTo={navigateTo}
              />
            ))}
          </div>
        )}
      </header>

      <main ref={mainRef}>
        {/* ============================================================
            HOME
        ============================================================ */}
        {activePage === "home" && (
          <>
            <section className="relative bg-slate-950 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(245,158,11,0.14),transparent_34%),radial-gradient(circle_at_10%_80%,rgba(30,64,175,0.12),transparent_32%)]" />
              <div className="absolute right-[-180px] top-[-180px] w-[520px] h-[520px] rounded-full border border-amber-500/10" />
              <div className="absolute right-[-110px] top-[-110px] w-[380px] h-[380px] rounded-full border border-slate-700/40" />

              <div className="relative max-w-7xl mx-auto px-6 min-h-[calc(100vh-80px)] flex items-center justify-center">
                <div className="max-w-4xl w-full text-center mx-auto flex flex-col items-center">
                  <Eyebrow>A Diversified Enterprise Group</Eyebrow>

                  <h1 className="font-serif text-white text-5xl sm:text-7xl lg:text-8xl leading-[0.98] tracking-tight">
                    Building value.
                    <br />
                    <span className="text-amber-500">Connecting opportunity.</span>
                    <br />
                    Creating impact.
                  </h1>

                  <p className="mt-8 max-w-2xl text-slate-300 text-lg sm:text-xl leading-relaxed">
                    Eva Global Group is a diversified Nigerian enterprise bringing together
                    business, professional services, technology, real estate, construction,
                    procurement and strategic initiatives under one integrated group.
                  </p>

                  <div className="mt-10 flex flex-wrap justify-center gap-4">
                    <button
                      onClick={() => navigateTo("home", "home-businesses")}
                      className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold px-6 py-3.5 rounded-lg shadow-lg shadow-amber-500/20 hover:-translate-y-0.5 transition-all"
                    >
                      Explore Our Businesses
                      <ArrowUpRight size={18} />
                    </button>

                    <button
                      onClick={() => navigateTo("about")}
                      className="inline-flex items-center gap-2 border border-slate-700 hover:border-amber-500 text-white font-semibold px-6 py-3.5 rounded-lg hover:-translate-y-0.5 transition-all"
                    >
                      About Eva Global Group
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* ---------------- OUR BUSINESSES (lives on Home) ---------------- */}
            <section id="home-businesses" className="bg-slate-50 py-24 sm:py-28 border-y border-slate-200 scroll-mt-28">
              <div className="max-w-7xl mx-auto px-6">
                <SectionHeading
                  eyebrow="Our Business Divisions"
                  title="Distinct businesses. One accountable group."
                  description="Our operating businesses bring together specialist capabilities while benefiting from shared governance, standards, technology and strategic direction at group level."
                />

                <div className="mt-14 grid lg:grid-cols-[280px_1fr] gap-10">
                  <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
                    {DIVISIONS.map((d, i) => (
                      <button
                        key={d.name}
                        onClick={() => setActiveDivision(i)}
                        className={`text-left shrink-0 lg:shrink flex items-center gap-3 px-4 py-3.5 border rounded-lg transition-all whitespace-nowrap lg:whitespace-normal ${
                          activeDivision === i
                            ? "bg-slate-950 border-slate-950 text-white"
                            : "bg-white border-slate-200 text-slate-700 hover:border-amber-400"
                        }`}
                      >
                        <d.icon size={18} className={activeDivision === i ? "text-amber-500" : "text-slate-400"} />
                        <span className="text-sm font-medium">{d.name}</span>
                      </button>
                    ))}
                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-8 sm:p-10">
                    {(() => {
                      const d = DIVISIONS[activeDivision];
                      return (
                        <>
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 bg-slate-950 flex items-center justify-center">
                              <d.icon size={20} className="text-amber-500" />
                            </div>
                            <h3 className="font-serif text-2xl text-slate-900">{d.name}</h3>
                          </div>
                          <p className="text-slate-600 mt-5 leading-relaxed">{d.summary}</p>

                          <div className="mt-8 grid sm:grid-cols-2 gap-8">
                            <div>
                              <p className="font-mono text-xs tracking-widest uppercase text-slate-400 mb-3">Services</p>
                              <ul className="space-y-2">
                                {d.services.map((s) => (
                                  <li key={s} className="flex items-start gap-2 text-sm text-slate-700">
                                    <CheckCircle2 size={15} className="text-amber-500 mt-0.5 shrink-0" /> {s}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p className="font-mono text-xs tracking-widest uppercase text-slate-400 mb-3">Industries Served</p>
                              <div className="flex flex-wrap gap-2">
                                {d.industries.map((ind) => (
                                  <span key={ind} className="text-xs font-medium text-slate-700 border border-slate-200 rounded-full px-3 py-1.5">
                                    {ind}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* ============================================================
            ABOUT US
        ============================================================ */}
        {activePage === "about" && (
          <section className="bg-white py-24 sm:py-28">
            <div className="max-w-7xl mx-auto px-6">
              <SectionHeading
                eyebrow="Group Overview"
                title="A diversified group built around long-term value creation."
                description="Eva Global Group brings together complementary businesses, professional institutions and strategic initiatives under a common vision of responsible growth, professional excellence and sustainable value creation. Our model is designed to connect expertise, capital, technology and opportunity across sectors."
              />

              <div className="mt-16 grid lg:grid-cols-3 gap-10">
                <div className="lg:col-span-1 space-y-8">
                  <div className="flex gap-4">
                    <Eye className="text-amber-500 shrink-0" size={22} />
                    <div>
                      <h3 className="font-semibold text-slate-900">Vision</h3>
                      <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                        To build a respected African group of enduring businesses and institutions that create value, unlock opportunity and contribute to sustainable economic development.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Target className="text-amber-500 shrink-0" size={22} />
                    <div>
                      <h3 className="font-semibold text-slate-900">Mission</h3>
                      <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                        To deliver engineering, technology, and security solutions that hold up under
                        government, institutional, and investor scrutiny — every time.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
                  {VALUES.map((v) => (
                    <div key={v.title} className="border border-slate-200 p-6 rounded-xl shadow-sm hover:shadow-md hover:border-amber-400 hover:-translate-y-0.5 transition-all">
                      <v.icon className="text-amber-500" size={22} />
                      <h4 className="font-semibold text-slate-900 mt-4">{v.title}</h4>
                      <p className="text-sm text-slate-600 mt-2 leading-relaxed">{v.copy}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ============================================================
            LEADERSHIP
        ============================================================ */}
        {activePage === "leadership" && (
          <section className="bg-slate-100 py-24 sm:py-28 border-y border-slate-200">
            <div className="max-w-7xl mx-auto px-6">
              <SectionHeading
                eyebrow="Leadership"
                title="Leadership with purpose. Execution with discipline."
                description="The Group is led by a management team focused on building durable businesses, strengthening institutions and creating long-term value for stakeholders."
              />

              <div className="mt-14 grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-stretch">
                <div className="relative min-h-[420px] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800">
                  {LEADERSHIP.image ? (
                    <img
                      src={LEADERSHIP.image}
                      alt={LEADERSHIP.name}
                      className="absolute inset-0 w-full h-full object-cover object-[50%_25%]"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_50%_35%,rgba(245,158,11,0.18),transparent_35%),linear-gradient(145deg,#0f172a,#020617)]">
                      <div className="text-center px-8">
                        <div className="mx-auto w-28 h-28 rounded-full border border-amber-500/50 bg-slate-900 flex items-center justify-center">
                          <Users size={46} className="text-amber-500" />
                        </div>
                        <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-slate-500 mt-6">
                          Executive Portrait
                        </p>
                        <p className="text-white font-serif text-2xl mt-2">{LEADERSHIP.name}</p>
                        <p className="text-slate-400 text-sm mt-1">{LEADERSHIP.role}</p>
                      </div>
                    </div>
                  )}
                  <div className="absolute left-6 bottom-6">
                    <span className="inline-flex items-center gap-2 bg-amber-500 text-slate-950 text-xs font-semibold px-3 py-2 rounded-md">
                      Group Leadership
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 flex flex-col justify-center">
                  <Eyebrow>Message from the Group</Eyebrow>
                  <h3 className="font-serif text-3xl sm:text-4xl text-slate-900 leading-tight">{LEADERSHIP.name}</h3>
                  <p className="text-amber-600 text-sm font-semibold mt-2">{LEADERSHIP.role}</p>

                  <div className="mt-8 flex gap-4">
                    <Quote className="text-amber-500 shrink-0 mt-1" size={24} />
                    <p className="text-slate-600 text-base sm:text-lg leading-relaxed">{LEADERSHIP.message}</p>
                  </div>

                  <div className="mt-8 pt-7 border-t border-slate-200">
                    <p className="text-sm text-slate-500 leading-relaxed">{LEADERSHIP.bio}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ============================================================
            OUR GROUP — Affiliates · Real Estate Ecosystem · Industries
        ============================================================ */}
        {activePage === "group" && (
          <>
            <section className="bg-white py-24 sm:py-28">
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                  <SectionHeading
                    id="group-affiliates"
                    eyebrow="Our Group"
                    title="An ecosystem of affiliated organisations and strategic platforms."
                    description="Eva Global Group serves as the central corporate platform connecting a growing network of affiliated organisations. Explore each platform directly from the group."
                  />
                  <span className="font-mono text-xs uppercase tracking-widest text-slate-400">10+ Affiliate Platforms</span>
                </div>

                <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {AFFILIATES.map((affiliate, index) => (
                    <a
                      key={affiliate.url}
                      href={affiliate.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group border border-slate-200 rounded-2xl p-6 hover:border-amber-400 hover:shadow-xl hover:-translate-y-1 transition-all bg-white"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="w-11 h-11 rounded-xl bg-slate-950 text-amber-500 flex items-center justify-center font-mono text-xs">
                          {String(index + 1).padStart(2, "0")}
                        </div>
                        <ArrowUpRight size={18} className="text-slate-400 group-hover:text-amber-500 transition-colors" />
                      </div>
                      <h3 className="font-serif text-2xl text-slate-900 mt-6 group-hover:text-amber-600 transition-colors">
                        {affiliate.name}
                      </h3>
                      <p className="text-sm text-slate-600 mt-3 leading-relaxed min-h-[60px]">{affiliate.description}</p>
                      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 truncate">
                          {affiliate.url.replace("https://", "")}
                        </span>
                        <span className="text-xs font-semibold text-slate-800 group-hover:text-amber-600">Visit</span>
                      </div>
                    </a>
                  ))}
                </div>

                <div className="mt-12 bg-slate-950 rounded-2xl p-8 sm:p-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                  <div>
                    <Eyebrow>One Group. Multiple Platforms.</Eyebrow>
                    <h3 className="font-serif text-2xl sm:text-3xl text-white">
                      Connecting businesses, institutions and professional communities.
                    </h3>
                    <p className="text-slate-400 text-sm mt-3 max-w-2xl leading-relaxed">
                      The Eva ecosystem is designed to create strategic connections between
                      commercial activity, professional development, technology, institutional
                      capacity and long-term value creation.
                    </p>
                  </div>
                  <button
                    onClick={() => navigateTo("contact")}
                    className="shrink-0 inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold px-6 py-3.5 rounded-lg"
                  >
                    Partner With Eva <ArrowUpRight size={18} />
                  </button>
                </div>
              </div>
            </section>

            <section id="group-realestate" className="bg-slate-950 py-24 sm:py-28 scroll-mt-28">
              <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <Eyebrow>EVA Real Estate Ecosystem</Eyebrow>
                  <h2 className="font-serif text-3xl sm:text-4xl text-white leading-tight">
                    Africa's next-generation real estate operating system.
                  </h2>
                  <p className="mt-5 text-slate-400 leading-relaxed">
                    A single trusted digital ecosystem connecting property discovery, verification,
                    financing, construction, management, investment, and ownership — built on the same
                    engineering and security standards as the rest of the group.
                  </p>
                  <div className="mt-8 grid grid-cols-2 gap-3">
                    {["Marketplace", "Escrow", "Procurement", "Property Passport", "Land Registry", "Investor Portal"].map((m) => (
                      <div key={m} className="flex items-center gap-2 border border-slate-800 rounded-lg px-4 py-3">
                        <div className="w-1.5 h-1.5 bg-amber-500" />
                        <span className="text-sm text-slate-300">{m}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => navigateTo("contact")}
                    className="mt-8 inline-flex items-center gap-2 text-amber-400 font-semibold text-sm hover:text-amber-300"
                  >
                    Discuss the EVA Ecosystem <ArrowUpRight size={16} />
                  </button>
                </div>

                <div className="border border-slate-800 bg-slate-900/50 rounded-xl p-8">
                  <p className="font-mono text-xs tracking-widest uppercase text-slate-500 mb-6">Module Status</p>
                  <div className="space-y-4">
                    {[
                      { m: "Marketplace", s: "In development" },
                      { m: "Property Passport", s: "In development" },
                      { m: "Escrow", s: "Planned" },
                      { m: "Investor Portal", s: "Planned" },
                    ].map((row) => (
                      <div key={row.m} className="flex items-center justify-between border-b border-slate-800 pb-4">
                        <span className="text-slate-300 text-sm">{row.m}</span>
                        <span className="font-mono text-xs text-amber-500">{row.s}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 mt-6 leading-relaxed">
                    Roadmap status is reviewed and updated quarterly by the EVA Ecosystem product team.
                  </p>
                </div>
              </div>
            </section>

            {/* Signature ecosystem diagram lives with the Real Estate section since it visualizes the same group-wide system */}
            <section className="bg-slate-950 pb-28 border-b border-slate-800">
              <div className="max-w-7xl mx-auto px-6">
                <SectionHeading
                  eyebrow="The EVA Ecosystem"
                  dark
                  title="Not separate businesses. One integrated system."
                  description="Each division feeds the next. Hover or tap a node to see how it connects to the group."
                />

                <div className="mt-14 grid lg:grid-cols-[1fr_320px] gap-10 items-center">
                  <div className="flex justify-center">
                    <svg viewBox="0 0 600 600" className="w-full max-w-[560px]">
                      {ECOSYSTEM.map((node, i) => {
                        const next = ECOSYSTEM[(i + 1) % ECOSYSTEM.length];
                        return (
                          <line
                            key={`line-${node.key}`}
                            x1={node.x} y1={node.y} x2={next.x} y2={next.y}
                            stroke={activeNode === node.key || activeNode === next.key ? "#f59e0b" : "#334155"}
                            strokeWidth={activeNode === node.key || activeNode === next.key ? 2 : 1}
                            opacity={activeNode === node.key || activeNode === next.key ? 0.9 : 0.5}
                          />
                        );
                      })}
                      <circle cx="300" cy="300" r="210" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="2 6" />

                      {ECOSYSTEM.map((node) => {
                        const isActive = activeNode === node.key;
                        return (
                          <g
                            key={node.key}
                            onMouseEnter={() => setActiveNode(node.key)}
                            onClick={() => setActiveNode(node.key)}
                            style={{ cursor: "pointer" }}
                          >
                            <circle
                              cx={node.x} cy={node.y} r={isActive ? 34 : 28}
                              fill={isActive ? "#f59e0b" : "#0f172a"}
                              stroke={isActive ? "#f59e0b" : "#475569"}
                              strokeWidth="1.5"
                              style={{ transition: "all 0.2s ease" }}
                            />
                            <text
                              x={node.x} y={node.y}
                              textAnchor="middle" dominantBaseline="central"
                              className="font-mono"
                              fontSize="9"
                              fill={isActive ? "#0f172a" : "#94a3b8"}
                              style={{ pointerEvents: "none" }}
                            >
                              {String(ECOSYSTEM.indexOf(node) + 1).padStart(2, "0")}
                            </text>
                            <text
                              x={node.x}
                              y={node.y > 300 ? node.y + 46 : node.y - 40}
                              textAnchor="middle"
                              fontSize="13"
                              fill={isActive ? "#f59e0b" : "#cbd5e1"}
                              fontWeight={isActive ? 600 : 400}
                              style={{ pointerEvents: "none" }}
                            >
                              {node.label}
                            </text>
                          </g>
                        );
                      })}
                      <text x="300" y="296" textAnchor="middle" fontSize="11" fill="#64748b" className="font-mono">EVA</text>
                      <text x="300" y="312" textAnchor="middle" fontSize="11" fill="#64748b" className="font-mono">GROUP</text>
                    </svg>
                  </div>

                  <div className="border border-slate-800 bg-slate-900/50 rounded-xl p-7 lg:sticky lg:top-28">
                    <p className="font-mono text-xs tracking-widest uppercase text-amber-500 mb-3">
                      {String(ECOSYSTEM.indexOf(activeEcosystemNode) + 1).padStart(2, "0")} / {ECOSYSTEM.length}
                    </p>
                    <h3 className="font-serif text-2xl text-white">{activeEcosystemNode.label}</h3>
                    <p className="text-slate-400 text-sm mt-3 leading-relaxed">{activeEcosystemNode.desc}</p>
                  </div>
                </div>
              </div>
            </section>

            <section id="group-industries" className="bg-white py-24 sm:py-28 scroll-mt-28">
              <div className="max-w-7xl mx-auto px-6">
                <SectionHeading eyebrow="Industries We Serve" title="Built for institutions that cannot afford to get it wrong." />
                <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-slate-200 border border-slate-200 rounded-xl overflow-hidden">
                  {INDUSTRIES.map((ind) => (
                    <div key={ind.name} className="bg-white p-7 flex flex-col items-start gap-4 hover:bg-slate-50 transition-colors">
                      <ind.icon size={22} className="text-amber-500" />
                      <span className="text-sm font-medium text-slate-800">{ind.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {/* ============================================================
            PROJECTS — Case Studies · Investor & Partnership Center
        ============================================================ */}
        {activePage === "projects" && (
          <>
            <section className="bg-slate-950 py-24 sm:py-28">
              <div className="max-w-7xl mx-auto px-6">
                <SectionHeading id="projects-cases" dark eyebrow="Projects & Case Studies" title="Credibility, demonstrated." />

                <div className="mt-12 grid sm:grid-cols-3 gap-6 border-y border-slate-800 py-10">
                  {PROJECTS.map((p) => (
                    <div key={p.label}>
                      <p className="font-serif text-4xl text-amber-500">{p.stat}</p>
                      <p className="text-sm text-slate-400 mt-2">{p.label}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-14 grid lg:grid-cols-3 gap-6">
                  {CASE_STUDIES.map((c) => (
                    <div key={c.title} className="border border-slate-800 p-7 rounded-xl hover:border-amber-500/60 hover:-translate-y-0.5 transition-all">
                      <p className="font-mono text-xs tracking-widest uppercase text-amber-500">{c.division}</p>
                      <h3 className="font-serif text-xl text-white mt-3">{c.title}</h3>
                      <p className="text-sm text-slate-400 mt-3 leading-relaxed">{c.copy}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="projects-investors" className="bg-slate-950 py-24 sm:py-28 border-t border-slate-800 scroll-mt-28">
              <div className="max-w-7xl mx-auto px-6">
                <SectionHeading dark eyebrow="Investor & Partnership Center" title="Building this ecosystem takes partners, not just projects." />
                <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {INVESTOR_TRACKS.map((t) => (
                    <div key={t.title} className="border border-slate-800 p-6 rounded-xl hover:border-amber-500/60 hover:-translate-y-0.5 transition-all">
                      <t.icon size={20} className="text-amber-500" />
                      <h3 className="font-semibold text-white mt-4 text-sm">{t.title}</h3>
                      <p className="text-sm text-slate-400 mt-2 leading-relaxed">{t.copy}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => navigateTo("contact")}
                  className="mt-10 inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold px-6 py-3.5 rounded-lg shadow-lg shadow-amber-500/10 hover:-translate-y-0.5 transition-all"
                >
                  Start a Partnership Conversation <ArrowUpRight size={18} />
                </button>
              </div>
            </section>
          </>
        )}

        {/* ============================================================
            NEWS & INSIGHTS — Research · Media Center
        ============================================================ */}
        {activePage === "insights" && (
          <>
            <section className="bg-white py-24 sm:py-28">
              <div className="max-w-7xl mx-auto px-6">
                <SectionHeading id="insights-research" eyebrow="Research & Insights" title="Thought leadership from across the group." />
                <div className="mt-14 grid lg:grid-cols-3 gap-8">
                  {RESEARCH.map((r) => (
                    <a key={r.title} href="#" className="group block border-t border-slate-200 pt-6">
                      <p className="font-mono text-xs tracking-widest uppercase text-amber-600">{r.tag}</p>
                      <h3 className="font-serif text-lg text-slate-900 mt-3 leading-snug group-hover:text-amber-600 transition-colors">
                        {r.title}
                      </h3>
                      <span className="inline-flex items-center gap-1 text-sm text-slate-500 mt-4">
                        Read insight <ArrowUpRight size={14} />
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </section>

            <section id="insights-media" className="bg-slate-50 py-20 border-y border-slate-200 scroll-mt-28">
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <SectionHeading eyebrow="Media Center" title="News, announcements & events." />
                </div>
                <div className="mt-10 flex flex-wrap gap-3">
                  {["News", "Press Releases", "Announcements", "Events", "Awards"].map((m) => (
                    <span key={m} className="text-sm font-medium text-slate-700 border border-slate-200 rounded-full px-4 py-2 flex items-center gap-2">
                      <Newspaper size={14} className="text-amber-500" /> {m}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {/* ============================================================
            CAREERS
        ============================================================ */}
        {activePage === "careers" && (
          <section className="bg-slate-50 py-24 sm:py-28 border-y border-slate-200">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-wrap items-end justify-between gap-6">
                <SectionHeading eyebrow="Careers" title="Build the group's next chapter." />
                <button className="inline-flex items-center gap-2 border border-slate-300 hover:border-amber-500 px-5 py-3 rounded-lg text-sm font-semibold text-slate-800 hover:-translate-y-0.5 transition-all">
                  View Open Roles <ArrowUpRight size={16} />
                </button>
              </div>
              <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {CAREERS.map((c) => (
                  <div key={c.title} className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all p-6">
                    <c.icon size={20} className="text-amber-500" />
                    <h3 className="font-semibold text-slate-900 mt-4 text-sm">{c.title}</h3>
                    <p className="text-sm text-slate-600 mt-2 leading-relaxed">{c.copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ============================================================
            CONTACT
        ============================================================ */}
        {activePage === "contact" && (
          <section className="bg-slate-50 py-24 sm:py-28">
            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
              <div>
                <SectionHeading eyebrow="Contact Center" title="Tell us what you're building, defending, or investigating." />
                <div className="mt-10 space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin size={20} className="text-amber-500 mt-1 shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">Head Office</p>
                      <p className="text-slate-600 text-sm mt-1">{COMPANY.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone size={20} className="text-amber-500 mt-1 shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">Phone</p>
                      <p className="text-slate-600 text-sm mt-1">
                        <a href={`tel:${COMPANY.phone.replace(/\s+/g, "")}`} className="hover:text-amber-600">{COMPANY.phone}</a>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MessageCircle size={20} className="text-amber-500 mt-1 shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">WhatsApp</p>
                      <p className="text-slate-600 text-sm mt-1">
                        <a
                          href={`https://wa.me/${COMPANY.whatsapp.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-amber-600"
                        >
                          {COMPANY.whatsapp}
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail size={20} className="text-amber-500 mt-1 shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">Email</p>
                      <p className="text-slate-600 text-sm mt-1">
                        <a href={`mailto:${COMPANY.email}`} className="hover:text-amber-600">{COMPANY.email}</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-8">
                {submitted ? (
                  <div className="py-10 text-center">
                    <CheckCircle2 size={32} className="text-amber-500 mx-auto" />
                    <h3 className="font-serif text-xl text-slate-900 mt-4">Enquiry received.</h3>
                    <p className="text-slate-600 text-sm mt-2">Thank you for reaching out. A member of our team will respond within 1–2 business days.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="text-xs font-mono uppercase tracking-widest text-slate-500">Full Name</label>
                      <input
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="mt-2 w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono uppercase tracking-widest text-slate-500">Email</label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="mt-2 w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
                        placeholder="you@company.com"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono uppercase tracking-widest text-slate-500">Enquiry Type</label>
                      <select
                        value={form.type}
                        onChange={(e) => setForm({ ...form, type: e.target.value })}
                        className="mt-2 w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 bg-white transition-all"
                      >
                        {ENQUIRY_TYPES.map((t) => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-mono uppercase tracking-widest text-slate-500">Message</label>
                      <textarea
                        required
                        rows={4}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="mt-2 w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
                        placeholder="Tell us about your project or requirement"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-slate-950 hover:bg-slate-800 text-white font-semibold text-sm py-3.5 rounded-lg hover:-translate-y-0.5 transition-all"
                    >
                      Submit Enquiry
                    </button>
                  </form>
                )}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* ---------------- FOOTER (persistent) ---------------- */}
      <footer className="bg-slate-950 border-t border-slate-800 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3">
                <Logo size={40} />
                <div>
                  <p className="text-white font-semibold text-sm">EVA GLOBAL GROUP</p>
                  <p className="font-mono text-[9px] tracking-[0.18em] text-slate-500 mt-1">BUILDING VALUE · CREATING IMPACT</p>
                </div>
              </div>
              <p className="text-slate-500 text-sm mt-5 max-w-sm leading-relaxed">
                A diversified Nigerian enterprise connecting businesses, professional
                services, technology, real estate and strategic initiatives under one group.
              </p>
            </div>

            <div className="lg:col-span-2">
              <p className="font-mono text-xs uppercase tracking-widest text-slate-500 mb-4">Explore</p>
              <ul className="space-y-2.5">
                {NAV.filter((n) => n.id !== "home").map((n) => (
                  <li key={n.id}>
                    <button onClick={() => navigateTo(n.id)} className="text-sm text-slate-400 hover:text-amber-400 transition-colors">
                      {n.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3">
              <p className="font-mono text-xs uppercase tracking-widest text-slate-500 mb-4">Affiliates</p>
              <div className="grid grid-cols-2 gap-y-2.5 gap-x-4">
                {AFFILIATES.map((affiliate) => (
                  <a
                    key={affiliate.url}
                    href={affiliate.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-400 hover:text-amber-400 transition-colors"
                  >
                    {affiliate.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3">
              <p className="font-mono text-xs uppercase tracking-widest text-slate-500 mb-4">Head Office</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2.5">
                  <MapPin size={15} className="text-amber-500 mt-0.5 shrink-0" />
                  <span className="text-sm text-slate-400 leading-relaxed">{COMPANY.address}</span>
                </li>
                <li>
                  <a href={`mailto:${COMPANY.email}`} className="text-sm text-slate-400 hover:text-amber-400">{COMPANY.email}</a>
                </li>
                <li>
                  <a href={`tel:${COMPANY.phone.replace(/\s+/g, "")}`} className="text-sm text-slate-400 hover:text-amber-400">{COMPANY.phone}</a>
                </li>
                <li>
                  <a
                    href={`https://wa.me/${COMPANY.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-400 hover:text-amber-400"
                  >
                    WhatsApp: {COMPANY.whatsapp}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-14 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-xs text-slate-500">© {new Date().getFullYear()} Eva Global Group Limited. All rights reserved.</p>
            <div className="flex items-center gap-4 text-xs text-slate-600 font-mono">
              <span>INTEGRITY</span>
              <span>EXCELLENCE</span>
              <span>INNOVATION</span>
              <span>IMPACT</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}