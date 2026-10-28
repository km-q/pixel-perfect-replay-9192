import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { QuantumField } from "@/components/QuantumField";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kong Ming Quantum — Post-Quantum Strategic Advisory" },
      { name: "description", content: "Strategic foresight for those who must endure. Post-quantum readiness for East Asian SMEs and their global communities." },
      { property: "og:title", content: "Kong Ming Quantum — Post-Quantum Strategic Advisory" },
      { property: "og:description", content: "Training, auditing, system design and bespoke solutions for post-quantum readiness." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const copy = {
  EN: {
    nav: ["Services", "Approach", "About", "Contact"],
    eyebrow: "Post-Quantum Strategic Advisory",
    h1a: "Strategic foresight", h1b: "for those who must endure.",
    lead: "We help East Asian SMEs and their global communities become post-quantum ready — through clear training, rigorous auditing, resilient system design, and bespoke solutions. Quiet competence in service of real organizations.",
    cta1: "Begin a conversation", cta2: "View services",
    sLabel: "What we offer", sTitle: "Four paths to readiness", sDesc: "From first principles to production systems. We meet organizations where they are and build lasting cryptographic resilience.",
    services: [
      ["Foundational Training", "First-principles education designed for any technical level. Clear, rigorous, and free of unnecessary jargon."],
      ["Readiness Auditing", "Structured assessment of your cryptographic posture, risk exposure, and migration readiness."],
      ["System Design", "Architecture and migration planning for quantum-resistant systems that endure."],
      ["Bespoke Solutions", "Custom applications and tooling tailored to your specific operational and compliance needs."],
    ],
    aLabel: "How we work", aTitle: "A disciplined process", aDesc: "Inspired by the clarity of classical strategy. We move deliberately from understanding to lasting defense.",
    steps: [
      ["Observe", "Understand your systems, constraints, and real risk surface without assumption."],
      ["Diagnose", "Identify gaps, prioritize exposure, and map a realistic path forward."],
      ["Design", "Architect quantum-resistant solutions that fit your actual operations."],
      ["Fortify", "Implement, validate, and leave your organization stronger than we found it."],
    ],
    q1: "The greatest victory is that which requires no battle.", q2: "Preparation is the quiet form of care.", qBy: "— In the spirit of Kong Ming",
    abLabel: "About", abA: "Brilliant strategy.", abB: "In service of the many.",
    ab1: "Kong Ming Quantum exists for organizations that cannot rely on scale or state resources. We bring rigorous post-quantum expertise to East Asian SMEs and their overseas communities with the same care and clarity once reserved for larger institutions.",
    ab2: "Our name honors Zhuge Liang — the strategist who combined unmatched intellect with genuine concern for the people under his protection. We aspire to the same dual standard: technical excellence and practical service.",
    cLabel: "Contact", cTitle: "Request a strategic briefing",
    f: { name: "Name", email: "Email", org: "Organization", interest: "Interest", general: "General inquiry", msg: "Message", send: "Send message" },
    thanks: "Thank you.", thanksD: "Your message has been received. We will respond with care.",
    tagline: "Strategic foresight for the quantum era",
    hud: { attractor: "Lorenz attractor · chaos", fortress: "城 · Walled fortress", army: "八陣圖 · Eight Formations", engine: "霹靂車 · Trebuchet", knot: "Torus knot · tensor field" },
  },
  中文: {
    nav: ["服務", "方法", "關於", "聯絡"],
    eyebrow: "後量子策略顧問",
    h1a: "運籌帷幄，", h1b: "為長治久安者謀。",
    lead: "我們協助東亞中小企業及其海外社群，為後量子時代做好準備——透過清晰的培訓、嚴謹的審核、穩健的系統設計及度身訂造的方案。以沉實的專業，服務真實的機構。",
    cta1: "開始對話", cta2: "瀏覽服務",
    sLabel: "我們的服務", sTitle: "邁向就緒的四條路徑", sDesc: "由基本原理到實際系統。我們因應各機構的現況，建立持久的密碼學韌性。",
    services: [
      ["基礎培訓", "由基本原理出發，適合任何技術程度。清晰、嚴謹，不賣弄術語。"],
      ["就緒評估", "有系統地評估貴機構的密碼學狀況、風險承擔及遷移準備程度。"],
      ["系統設計", "為抗量子系統制定架構及遷移規劃，經得起時間考驗。"],
      ["度身方案", "按貴機構的營運及合規需要，開發專屬應用程式及工具。"],
    ],
    aLabel: "工作方法", aTitle: "嚴謹有序的流程", aDesc: "取法古典兵略的清明。由洞悉到長久守備，步步為營。",
    steps: [
      ["觀", "不作預設，了解貴機構的系統、限制及真實風險面。"],
      ["察", "找出缺口，排列風險優次，規劃切實可行的路向。"],
      ["謀", "設計切合實際營運的抗量子方案。"],
      ["守", "實施及驗證，令貴機構比我們到來之前更為堅實。"],
    ],
    q1: "不戰而屈人之兵，善之善者也。", q2: "未雨綢繆，是無聲的關懷。", qBy: "——承孔明之志",
    abLabel: "關於我們", abA: "卓越謀略，", abB: "服務大眾。",
    ab1: "孔明量子為無法倚賴規模或國家資源的機構而設。我們以昔日只屬大型機構的用心與清晰，為東亞中小企業及其海外社群帶來嚴謹的後量子專業知識。",
    ab2: "我們以諸葛亮為名——這位謀略家集超凡智慧與對百姓的真切關懷於一身。我們亦以此雙重標準自勉：技術卓越，務實服務。",
    cLabel: "聯絡我們", cTitle: "預約策略簡報",
    f: { name: "姓名", email: "電郵", org: "機構", interest: "查詢範疇", general: "一般查詢", msg: "訊息", send: "發送訊息" },
    thanks: "謝謝。", thanksD: "我們已收到您的訊息，定當用心回覆。",
    tagline: "量子時代的策略遠見",
    hud: { attractor: "洛倫茲吸引子 · 混沌", fortress: "城 · 城池", army: "八陣圖", engine: "霹靂車 · 投石機", knot: "環面紐結 · 張量場" },
  },
} as const;

const nums = ["壹", "貳", "參", "肆"];
const chars = ["觀", "察", "謀", "守"];
const ids = ["services", "approach", "about", "contact"];

function SectionHead({ label, title, desc }: { label: string; title: string; desc?: string }) {
  return (
    <div className="mb-14 max-w-2xl">
      <p className="eyebrow">{label}</p>
      <h2 className="mt-5 font-display text-4xl font-light leading-tight md:text-5xl">{title}</h2>
      {desc && <p className="mt-5 leading-relaxed text-muted-foreground">{desc}</p>}
    </div>
  );
}

function Index() {
  const [sent, setSent] = useState(false);
  const [lang, setLang] = useState<"EN" | "中文">("EN");
  const [scene, setScene] = useState<keyof (typeof copy)["EN"]["hud"]>("attractor");
  const c = copy[lang];
  const onSubmit = (e: FormEvent) => { e.preventDefault(); setSent(true); };
  const field = "w-full border-b border-input bg-transparent py-3 text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none transition-colors";

  useEffect(() => { document.documentElement.lang = lang === "EN" ? "en" : "zh-Hant"; }, [lang]);
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setScene((e.target as HTMLElement).dataset.scene as never)), { rootMargin: "-45% 0px -45% 0px" });
    document.querySelectorAll("[data-scene]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <QuantumField />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/70 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a href="#top" className="flex items-baseline gap-3">
            <span className="font-cjk text-lg text-primary">孔明量子</span>
            <span className="hidden font-display text-lg tracking-wide sm:inline">Kong Ming Quantum</span>
          </a>
          <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
            {c.nav.map((l, i) => <a key={l} href={`#${ids[i]}`} className="transition-colors hover:text-foreground">{l}</a>)}
          </nav>
          <div className="flex text-xs tracking-widest text-muted-foreground">
            {(["EN", "中文"] as const).map((l, i) => (
              <button key={l} onClick={() => setLang(l)} className={`px-1.5 ${lang === l ? "text-primary" : "hover:text-foreground"} ${i ? "border-l border-border" : ""}`}>{l}</button>
            ))}
          </div>
        </div>
      </header>

      <div className="pointer-events-none fixed bottom-6 right-6 z-40 hidden font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground md:block">
        <span className="text-primary">◆</span> {c.hud[scene]}
      </div>

      <main id="top" className={lang === "中文" ? "font-cjk" : ""}>
        <section data-scene="attractor" className="mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-6 pb-32 pt-28">
          <p className="eyebrow reveal">{c.eyebrow}</p>
          <h1 className="reveal mt-8 font-display text-5xl font-light leading-[1.05] sm:text-6xl md:text-8xl" style={{ animationDelay: "0.15s" }}>
            {c.h1a}<br /><em className="text-primary">{c.h1b}</em>
          </h1>
          <p className="reveal mt-8 max-w-xl leading-relaxed text-muted-foreground" style={{ animationDelay: "0.3s" }}>{c.lead}</p>
          <div className="reveal mt-12 flex flex-col gap-4 sm:flex-row" style={{ animationDelay: "0.45s" }}>
            <a href="#contact" className="bg-primary px-7 py-4 text-center text-sm tracking-wide text-primary-foreground transition-opacity hover:opacity-90">{c.cta1}</a>
            <a href="#services" className="border border-border px-7 py-4 text-center text-sm tracking-wide transition-colors hover:border-primary hover:text-primary">{c.cta2}</a>
          </div>
        </section>

        <section id="services" data-scene="fortress" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-28">
          <SectionHead label={c.sLabel} title={c.sTitle} desc={c.sDesc} />
          <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
            {c.services.map(([t, d], i) => (
              <article key={i} className="group relative bg-card/85 p-8 backdrop-blur-sm transition-colors hover:bg-card md:p-10">
                <span className="inlay absolute inset-x-0 top-0 scale-x-0 transition-transform duration-700 group-hover:scale-x-100" />
                <span className="font-cjk text-sm text-accent-muted">{nums[i]}</span>
                <h3 className="mt-6 font-display text-2xl">{t}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{d}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="approach" data-scene="army" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-28">
          <SectionHead label={c.aLabel} title={c.aTitle} desc={c.aDesc} />
          <ol className="relative grid gap-10 md:grid-cols-4 md:gap-0">
            <span className="absolute left-5 top-0 h-full w-px bg-border md:left-0 md:top-5 md:h-px md:w-full" />
            {c.steps.map(([t, d], i) => (
              <li key={i} className="relative pl-16 md:pl-0 md:pr-8 md:pt-16">
                <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center border border-primary/40 bg-background font-cjk text-primary">{chars[i]}</span>
                <p className="text-xs tracking-[0.3em] text-accent-muted">0{i + 1}</p>
                <h3 className="mt-2 font-display text-2xl">{t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d}</p>
              </li>
            ))}
          </ol>
        </section>

        <section data-scene="engine" className="px-6 py-36 text-center">
          <div className="inlay mx-auto mb-16 w-24" />
          <blockquote className="mx-auto max-w-3xl font-display text-3xl font-light italic leading-snug md:text-5xl">
            “{c.q1}<br /><span className="text-primary">{c.q2}</span>”
          </blockquote>
          <p className="eyebrow mt-10 text-muted-foreground">{c.qBy}</p>
          <div className="inlay mx-auto mt-16 w-24" />
        </section>

        <section id="about" data-scene="knot" className="mx-auto grid max-w-6xl scroll-mt-20 gap-12 px-6 py-28 md:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="eyebrow">{c.abLabel}</p>
            <h2 className="mt-5 font-display text-4xl font-light leading-tight md:text-5xl">{c.abA}<br /><em className="text-primary">{c.abB}</em></h2>
            <p className="mt-8 font-cjk text-6xl text-primary/15">諸葛</p>
          </div>
          <div className="space-y-6 leading-relaxed text-muted-foreground"><p>{c.ab1}</p><p>{c.ab2}</p></div>
        </section>

        <section id="contact" data-scene="fortress" className="mx-auto max-w-3xl scroll-mt-20 px-6 py-28">
          <SectionHead label={c.cLabel} title={c.cTitle} />
          {sent ? (
            <div className="border border-border bg-card/90 p-10 text-center">
              <p className="font-display text-2xl">{c.thanks}</p>
              <p className="mt-3 text-sm text-muted-foreground">{c.thanksD}</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-8 border border-border bg-card/80 p-8 backdrop-blur-sm md:grid-cols-2 md:p-10">
              <input required placeholder={c.f.name} className={field} />
              <input required type="email" placeholder={c.f.email} className={field} />
              <input placeholder={c.f.org} className={field} />
              <select defaultValue="" className={`${field} bg-card`}>
                <option value="" disabled>{c.f.interest}</option>
                {c.services.map(([t]) => <option key={t}>{t}</option>)}
                <option>{c.f.general}</option>
              </select>
              <textarea required rows={4} placeholder={c.f.msg} className={`${field} resize-none md:col-span-2`} />
              <button className="bg-primary px-7 py-4 text-sm tracking-wide text-primary-foreground transition-opacity hover:opacity-90 md:col-span-2 md:justify-self-start">{c.f.send}</button>
            </form>
          )}
        </section>
      </main>

      <footer className="border-t border-border bg-background/80 px-6 py-12">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-3 text-sm md:flex-row">
          <span className="font-display text-lg">Kong Ming Quantum <span className="font-cjk text-primary">孔明量子</span></span>
          <span className="text-muted-foreground">{c.tagline}</span>
        </div>
      </footer>
    </div>
  );
}
