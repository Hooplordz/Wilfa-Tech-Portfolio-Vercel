import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { site, nav, stats, ticker, projects, expertise, about } from "./content";
import type { Project } from "./content";

/* ---------- hooks ---------- */

function useInView<T extends Element>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setSeen(true);
        io.disconnect();
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen] as const;
}

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [ref, seen] = useInView<HTMLSpanElement>();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!seen) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return setN(to);
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - t0) / 1600, 1);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

/* ---------- small pieces ---------- */

const Pill = ({ children }: { children: ReactNode }) => (
  <span className="rounded-full border border-line px-3 py-1 text-xs text-mute">{children}</span>
);

const TextLink = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} className="underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent">
    {children}
  </a>
);

const Section = ({ id, children, className = "" }: { id: string; children: ReactNode; className?: string }) => (
  <section id={id} className={`px-5 py-24 md:px-10 md:py-36 ${className}`}>{children}</section>
);

/* ---------- navigation ---------- */

function Header({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-5 py-4 text-white mix-blend-difference md:px-10">
      <a href="#top" className="font-display text-lg font-semibold">{site.brand}</a>
      <div className="flex items-center gap-5">
        <a href="#contact" className="hidden text-sm md:inline">Let's talk</a>
        <button
          aria-expanded={open}
          aria-controls="menu"
          onClick={() => setOpen(!open)}
          className="rounded-full border border-current px-4 py-1.5 text-sm"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
    </header>
  );
}

function Menu({ open, close }: { open: boolean; close: () => void }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  return (
    <nav
      id="menu"
      aria-hidden={!open}
      className={`fixed inset-0 z-30 flex flex-col justify-center bg-char px-5 transition-[clip-path] duration-500 ease-[cubic-bezier(.7,0,.2,1)] md:px-10 ${
        open ? "[clip-path:inset(0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
      }`}
    >
      <ul>
        {nav.map((n) => (
          <li key={n.href} className="border-b border-line">
            <a
              href={n.href}
              onClick={close}
              tabIndex={open ? 0 : -1}
              className="block py-3 font-display text-[clamp(2.5rem,10vw,7rem)] leading-none transition-colors hover:text-accent"
            >
              {n.label}
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-8 break-all text-sm text-mute">{site.email}</p>
    </nav>
  );
}

/* ---------- sections ---------- */

function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col justify-end px-5 pb-10 pt-28 md:px-10">
      <img
        src={site.portrait}
        alt={`Portrait of ${site.name}`}
        width={900}
        height={1200}
        className="absolute right-5 top-20 h-[34svh] w-auto md:right-10 md:top-24 md:h-[40svh]"
      />
      <h1 className="font-display text-[clamp(4.2rem,19vw,18rem)] font-semibold leading-[0.82] tracking-tighter">
        {["Favour", "Williams"].map((w, i) => (
          <span key={w} className="block overflow-hidden pb-[0.08em]">
            <span className="rise block" style={{ animationDelay: `${i * 120}ms` }}>{w}</span>
          </span>
        ))}
      </h1>
      <div className="mt-10 grid gap-6 border-t border-line pt-6 md:grid-cols-12">
        <p className="max-w-md text-lg md:col-span-5">{site.intro}</p>
        <p className="text-mute md:col-span-3">{site.role}</p>
        <div className="flex gap-6 md:col-span-4 md:justify-end">
          <TextLink href="#work">Selected work</TextLink>
          <TextLink href="#contact">Contact</TextLink>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <Section id="numbers" className="!py-16 md:!py-24">
      <h2 className="mb-10 text-mute">By the numbers</h2>
      <dl className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="border-t border-line pt-4">
            <dd className="font-display text-[clamp(3rem,8vw,7rem)] font-semibold leading-none">
              <CountUp to={s.value} suffix={s.suffix} />
            </dd>
            <dt className="mt-3 flex flex-wrap items-center gap-2 text-mute">
              {s.label}
              {s.placeholder && <Pill>placeholder</Pill>}
            </dt>
          </div>
        ))}
      </dl>
    </Section>
  );
}

function Ticker() {
  return (
    <div className="overflow-hidden border-y border-line py-6" aria-hidden="true">
      <div className="marquee flex w-max whitespace-nowrap font-display text-[clamp(2.5rem,7vw,6rem)] font-medium">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0">
            {ticker.map((t) => (
              <span key={t} className="flex items-center gap-10 pr-10">
                {t}
                <span className="text-accent">/</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const patterns: Record<Project["visual"], string> = {
  home: "radial-gradient(circle, rgba(138,180,255,.5) 1.5px, transparent 1.5px) 0 0/28px 28px",
  robot: "repeating-linear-gradient(135deg, rgba(138,180,255,.35) 0 1px, transparent 1px 18px)",
  iot: "repeating-radial-gradient(circle at 30% 60%, rgba(138,180,255,.4) 0 1px, transparent 1px 22px)",
  ai: "conic-gradient(from 200deg at 60% 50%, rgba(138,180,255,.35), transparent 40%, rgba(138,180,255,.12) 70%, transparent)",
};

function ProjectVisual({ p }: { p: Project }) {
  return (
    <div className="aspect-[4/3] w-full overflow-hidden bg-char" role="img" aria-label={`${p.name} visual`}>
      {p.image ? (
        <img src={p.image} alt="" loading="lazy" className="h-full w-full object-cover" />
      ) : (
        <div className="h-full w-full" style={{ background: patterns[p.visual] }} />
      )}
    </div>
  );
}

function ProjectItem({ p, flip }: { p: Project; flip: boolean }) {
  return (
    <article className="grid gap-8 border-t border-line py-12 md:grid-cols-12 md:gap-12 md:py-16">
      <div className={`md:col-span-7 ${flip ? "md:order-2" : ""}`}>
        <ProjectVisual p={p} />
      </div>
      <div className={`flex flex-col justify-between gap-8 md:col-span-5 ${flip ? "md:order-1" : ""}`}>
        <div>
          <div className="flex flex-wrap items-center gap-3 text-mute">
            <span>{p.category}</span>
            {p.sample && <Pill>Sample</Pill>}
          </div>
          <h3 className="mt-4 font-display text-4xl font-semibold leading-tight md:text-5xl">{p.name}</h3>
          <p className="mt-4 max-w-md text-bone/80">{p.description}</p>
          <p className="mt-6 text-mute">My role: <span className="text-bone">{p.role}</span></p>
        </div>
        <div>
          <ul className="flex flex-wrap gap-2">{p.tech.map((t) => <li key={t}><Pill>{t}</Pill></li>)}</ul>
          <div className="mt-6 flex gap-6">
            <TextLink href={p.live}>Live project</TextLink>
            <TextLink href={p.caseStudy}>Case study</TextLink>
          </div>
        </div>
      </div>
    </article>
  );
}

function Work() {
  return (
    <Section id="work">
      <h2 className="font-display text-[clamp(3rem,9vw,8rem)] font-semibold leading-none tracking-tight">Selected work</h2>
      <div className="mt-16">
        {projects.map((p, i) => <ProjectItem key={p.name} p={p} flip={i % 2 === 1} />)}
      </div>
    </Section>
  );
}

function Expertise() {
  return (
    <Section id="expertise" className="bg-char">
      <h2 className="font-display text-[clamp(3rem,9vw,8rem)] font-semibold leading-none tracking-tight">Expertise</h2>
      <div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {expertise.map((g) => (
          <div key={g.group} className="border-t border-line pt-4">
            <h3 className="font-display text-2xl font-semibold">{g.group}</h3>
            <ul className="mt-4 space-y-2 text-bone/80">
              {g.items.map((i) => <li key={i}>{i}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

function About() {
  return (
    <Section id="about">
      <div className="grid gap-12 md:grid-cols-12">
        <h2 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-[1.02] tracking-tight md:col-span-7">
          {about.statement}
        </h2>
        <div className="md:col-span-5">
          {about.paragraphs.map((t) => <p key={t} className="mb-5 max-w-md text-lg text-bone/85">{t}</p>)}
          <dl className="mt-10 space-y-6">
            {about.facts.map((f) => (
              <div key={f.k} className="border-t border-line pt-4">
                <dt className="text-mute">{f.k}</dt>
                <dd className="mt-1">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <Section id="contact" className="border-t border-line">
      <h2 className="font-display text-[clamp(3rem,11vw,10rem)] font-semibold leading-[0.9] tracking-tighter">
        Let's build something together.
      </h2>
      <p className="mt-8 max-w-md text-lg text-bone/85">
        Working on robotics, AI or a connected product? Send a note about the problem and I'll reply.
      </p>
      <a
        href={`mailto:${site.email}`}
        className="mt-10 block break-all font-display text-xl underline decoration-line underline-offset-8 transition-colors hover:text-accent hover:decoration-accent md:text-3xl"
      >
        {site.email}
      </a>
      <div className="mt-8 flex gap-8">
        <TextLink href={site.github}>GitHub</TextLink>
        <TextLink href={site.linkedin}>LinkedIn</TextLink>
      </div>
    </Section>
  );
}

/* ---------- app ---------- */

export default function App() {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-ink text-bone">
      <Header open={open} setOpen={setOpen} />
      <Menu open={open} close={() => setOpen(false)} />
      <main>
        <Hero />
        <Stats />
        <Ticker />
        <Work />
        <Expertise />
        <About />
        <Contact />
      </main>
      <footer className="px-5 py-8 text-sm text-mute md:px-10">
        © {new Date().getFullYear()} {site.brand}. {site.name}.
      </footer>
    </div>
  );
}
