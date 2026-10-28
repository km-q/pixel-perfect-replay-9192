import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { LatticeField } from "@/components/LatticeField";

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

const services = [
  { n: "壹", t: "Foundational Training", d: "First-principles education designed for any technical level. Clear, rigorous, and free of unnecessary jargon." },
  { n: "貳", t: "Readiness Auditing", d: "Structured assessment of your cryptographic posture, risk exposure, and migration readiness." },
  { n: "參", t: "System Design", d: "Architecture and migration planning for quantum-resistant systems that endure." },
  { n: "肆", t: "Bespoke Solutions", d: "Custom applications and tooling tailored to your specific operational and compliance needs." },
];

const steps = [
  { c: "觀", t: "Observe", d: "Understand your systems, constraints, and real risk surface without assumption." },
  { c: "察", t: "Diagnose", d: "Identify gaps, prioritize exposure, and map a realistic path forward." },
  { c: "謀", t: "Design", d: "Architect quantum-resistant solutions that fit your actual operations." },
  { c: "守", t: "Fortify", d: "Implement, validate, and leave your organization stronger than we found it." },
];

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
  const onSubmit = (e: FormEvent) => { e.preventDefault(); setSent(true); };
  const field = "w-full border-b border-input bg-transparent py-3 text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none transition-colors";

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <LatticeField />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/70 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a href="#top" className="flex items-baseline gap-3">
            <span className="font-cjk text-lg text-primary">孔明</span>
            <span className="font-display text-lg tracking-wide">Kong Ming Quantum</span>
          </a>
          <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
            {["Services", "Approach", "About", "Contact"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="transition-colors hover:text-foreground">{l}</a>
            ))}
          </nav>
          <div className="flex text-xs tracking-widest text-muted-foreground">
            {(["EN", "中文"] as const).map((l, i) => (
              <button key={l} onClick={() => setLang(l)} className={`px-1.5 ${lang === l ? "text-primary" : "hover:text-foreground"} ${i ? "border-l border-border" : ""}`}>{l}</button>
            ))}
          </div>
        </div>
      </header>

      <main id="top">
        <section className="mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-6 pb-32 pt-28">
          <p className="eyebrow reveal">Post-Quantum Strategic Advisory</p>
          <h1 className="reveal mt-8 font-display text-5xl font-light leading-[1.05] sm:text-6xl md:text-8xl" style={{ animationDelay: "0.15s" }}>
            Strategic foresight<br /><em className="text-primary">for those who must endure.</em>
          </h1>
          <p className="reveal mt-8 max-w-xl leading-relaxed text-muted-foreground" style={{ animationDelay: "0.3s" }}>
            We help East Asian SMEs and their global communities become post-quantum ready — through clear training, rigorous auditing, resilient system design, and bespoke solutions. Quiet competence in service of real organizations.
          </p>
          <div className="reveal mt-12 flex flex-col gap-4 sm:flex-row" style={{ animationDelay: "0.45s" }}>
            <a href="#contact" className="bg-primary px-7 py-4 text-center text-sm tracking-wide text-primary-foreground transition-opacity hover:opacity-90">Begin a conversation</a>
            <a href="#services" className="border border-border px-7 py-4 text-center text-sm tracking-wide transition-colors hover:border-primary hover:text-primary">View services</a>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-28">
          <SectionHead label="What we offer" title="Four paths to readiness" desc="From first principles to production systems. We meet organizations where they are and build lasting cryptographic resilience." />
          <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
            {services.map((s) => (
              <article key={s.t} className="group relative bg-card/90 p-8 backdrop-blur-sm transition-colors hover:bg-card md:p-10">
                <span className="inlay absolute inset-x-0 top-0 scale-x-0 transition-transform duration-700 group-hover:scale-x-100" />
                <span className="font-cjk text-sm text-accent-muted">{s.n}</span>
                <h3 className="mt-6 font-display text-2xl">{s.t}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="approach" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-28">
          <SectionHead label="How we work" title="A disciplined process" desc="Inspired by the clarity of classical strategy. We move deliberately from understanding to lasting defense." />
          <ol className="relative grid gap-10 md:grid-cols-4 md:gap-0">
            <span className="absolute left-5 top-0 h-full w-px bg-border md:left-0 md:top-5 md:h-px md:w-full" />
            {steps.map((s, i) => (
              <li key={s.t} className="relative pl-16 md:pl-0 md:pr-8 md:pt-16">
                <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center border border-primary/40 bg-background font-cjk text-primary">{s.c}</span>
                <p className="text-xs tracking-[0.3em] text-accent-muted">0{i + 1}</p>
                <h3 className="mt-2 font-display text-2xl">{s.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="px-6 py-36 text-center">
          <div className="inlay mx-auto mb-16 w-24" />
          <blockquote className="mx-auto max-w-3xl font-display text-3xl font-light italic leading-snug md:text-5xl">
            “The greatest victory is that which requires no battle.<br />
            <span className="text-primary">Preparation is the quiet form of care.</span>”
          </blockquote>
          <p className="eyebrow mt-10 text-muted-foreground">— In the spirit of Kong Ming</p>
          <div className="inlay mx-auto mt-16 w-24" />
        </section>

        <section id="about" className="mx-auto grid max-w-6xl scroll-mt-20 gap-12 px-6 py-28 md:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="eyebrow">About</p>
            <h2 className="mt-5 font-display text-4xl font-light leading-tight md:text-5xl">Brilliant strategy.<br /><em className="text-primary">In service of the many.</em></h2>
            <p className="mt-8 font-cjk text-6xl text-primary/15">諸葛</p>
          </div>
          <div className="space-y-6 leading-relaxed text-muted-foreground">
            <p>Kong Ming Quantum exists for organizations that cannot rely on scale or state resources. We bring rigorous post-quantum expertise to East Asian SMEs and their overseas communities with the same care and clarity once reserved for larger institutions.</p>
            <p>Our name honors Zhuge Liang — the strategist who combined unmatched intellect with genuine concern for the people under his protection. We aspire to the same dual standard: technical excellence and practical service.</p>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-3xl scroll-mt-20 px-6 py-28">
          <SectionHead label="Contact" title="Request a strategic briefing" />
          {sent ? (
            <div className="border border-border bg-card/90 p-10 text-center">
              <p className="font-display text-2xl">Thank you.</p>
              <p className="mt-3 text-sm text-muted-foreground">Your message has been received. We will respond with care.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-8 border border-border bg-card/80 p-8 backdrop-blur-sm md:grid-cols-2 md:p-10">
              <input required placeholder="Name" className={field} />
              <input required type="email" placeholder="Email" className={field} />
              <input placeholder="Organization" className={field} />
              <select defaultValue="" className={`${field} bg-card`}>
                <option value="" disabled>Interest</option>
                {services.map((s) => <option key={s.t}>{s.t}</option>)}
                <option>General inquiry</option>
              </select>
              <textarea required rows={4} placeholder="Message" className={`${field} resize-none md:col-span-2`} />
              <button className="bg-primary px-7 py-4 text-sm tracking-wide text-primary-foreground transition-opacity hover:opacity-90 md:col-span-2 md:justify-self-start">Send message</button>
            </form>
          )}
        </section>
      </main>

      <footer className="border-t border-border bg-background/80 px-6 py-12">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-3 text-sm md:flex-row">
          <span className="font-display text-lg">Kong Ming Quantum</span>
          <span className="text-muted-foreground">Strategic foresight for the quantum era</span>
        </div>
      </footer>
    </div>
  );
}
