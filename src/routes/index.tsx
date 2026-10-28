import { createFileRoute } from "@tanstack/react-router";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useInView,
  animate,
  useReducedMotion,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { STORES, whatsappLink, mapEmbed, type Store } from "@/lib/stores";
import logoSrc from "@/assets/nunes-logo.png";
const logo = { url: logoSrc };
import logoLightSrc from "@/assets/nunes-logo-light.png";
const logoLight = { url: logoLightSrc };
import fotoForquilhinhasSrc from "@/assets/forquilhinhas-fachada.webp";
const fotoForquilhinhas = { url: fotoForquilhinhasSrc };
import fotoSertaoSrc from "@/assets/sertao-fachada.webp";
const fotoSertao = { url: fotoSertaoSrc };
import familySrc from "@/assets/nunes-carlos-naida.jpg";
const family = { url: familySrc };
import heroEngine from "@/assets/hero-engine.jpg";

const TITLE = "Nunes Autocenter — Mecânica e auto elétrica em São José, SC";
const DESC =
  "Desde 1999 cuidando dos carros de São José. Mecânica, auto elétrica, freios, ar-condicionado e check-up grátis de +30 itens em Forquilhinhas e Sertão do Maruim.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          STORES.map((s) => ({
            "@context": "https://schema.org",
            "@type": "AutoRepair",
            name: `Nunes Autocenter ${s.name}`,
            telephone: `+${s.whatsapp}`,
            address: { "@type": "PostalAddress", streetAddress: s.address, addressLocality: "São José", addressRegion: "SC", addressCountry: "BR" },
            aggregateRating: { "@type": "AggregateRating", ratingValue: "4.7", bestRating: "5" },
            foundingDate: "1999",
          })),
        ),
      },
    ],
  }),
  component: Index,
});

/* ---------- small pieces ---------- */

function Bolt({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 120 260" className={className} style={style} aria-hidden>
      <path d="M120 0 L40 120 H82 L22 196 H62 L0 260 L58 170 H18 L76 96 H34 Z" fill="currentColor" />
    </svg>
  );
}

function StoreButtons({ topic, dark = false }: { topic?: string; dark?: boolean }) {
  return (
    <div className="flex flex-wrap gap-3">
      {STORES.map((s) => (
        <a
          key={s.id}
          href={whatsappLink(s, topic)}
          target="_blank"
          rel="noopener noreferrer"
          className={
            "group inline-flex items-center gap-3 rounded-sm px-5 py-4 font-display text-sm font-extrabold uppercase tracking-wider transition-transform hover:-translate-y-0.5 " +
            (s.id === "forquilhinhas"
              ? "bg-signal text-navy-deep shadow-cta"
              : dark
                ? "border-2 border-paper/40 text-paper hover:border-signal hover:text-signal"
                : "border-2 border-navy text-navy hover:bg-navy hover:text-paper")
          }
        >
          <WaIcon />
          <span>
            <span className="block text-[0.65rem] tracking-[0.25em] opacity-70">WhatsApp</span>
            Loja {s.name}
          </span>
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>
      ))}
    </div>
  );
}

function WaIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 shrink-0" fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.1-1.2l-.5-.3Z" />
    </svg>
  );
}

function Counter({ to, suffix = "", decimals = 0 }: { to: number; suffix?: string; decimals?: number | undefined }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 2, ease: [0.16, 1, 0.3, 1], onUpdate: setV });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref}>
      {v.toLocaleString("pt-BR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- sections ---------- */

function Header() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  useEffect(() => scrollY.on("change", (y) => setSolid(y > 60)), [scrollY]);
  return (
    <header
      className={
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300 " +
        (solid ? "bg-paper/95 shadow-sm backdrop-blur" : "bg-transparent")
      }
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
        <a href="#topo" className="py-1">
          <img src={solid ? logo.url : logoLight.url} alt="Nunes Autocenter" width={948} height={390} className="h-10 w-auto" />
        </a>
        <nav className={"hidden gap-8 text-sm font-semibold md:flex " + (solid ? "text-navy" : "text-paper")}>
          <a href="#servicos" className="hover:text-bolt">Serviços</a>
          <a href="#historia" className="hover:text-bolt">Nossa história</a>
          <a href="#avaliacoes" className="hover:text-bolt">Avaliações</a>
          <a href="#lojas" className="hover:text-bolt">Lojas</a>
        </nav>
        <a href="#lojas" className="rounded-sm bg-signal px-4 py-2 font-display text-xs font-extrabold uppercase tracking-wider text-navy-deep">
          Agendar
        </a>
      </div>
    </header>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.25]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const boltRotY = useTransform(scrollYProgress, [0, 1], [0, 180]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [18, -18]), { stiffness: 80, damping: 15 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-24, 24]), { stiffness: 80, damping: 15 });

  return (
    <section
      id="topo"
      ref={ref}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-navy-deep text-paper"
    >
      <motion.img
        src={heroEngine}
        alt="Detalhe de alternador e chicote elétrico iluminado na oficina"
        width={1920}
        height={1088}
        fetchPriority="high"
        style={reduce ? {} : { y: bgY, scale: bgScale }}
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-60"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-deep via-navy-deep/70 to-navy-deep/30" />
      <div className="blueprint absolute inset-0 -z-10 opacity-60" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-24 bg-gradient-to-b from-signal/10 to-transparent animate-scan" />

      {/* rotating gauge ring */}
      <svg viewBox="0 0 400 400" className="animate-spin-slow pointer-events-none absolute -right-40 top-10 -z-10 size-[44rem] text-paper/10" aria-hidden>
        <circle cx="200" cy="200" r="190" fill="none" stroke="currentColor" strokeWidth="1" />
        {Array.from({ length: 60 }).map((_, i) => (
          <line key={i} x1="200" y1="14" x2="200" y2={i % 5 === 0 ? 40 : 26} stroke="currentColor" strokeWidth={i % 5 === 0 ? 3 : 1} transform={`rotate(${i * 6} 200 200)`} />
        ))}
      </svg>

      {/* 3D bolt */}
      <div className="pointer-events-none absolute right-[6%] top-[14%] -z-10 hidden md:block" style={{ perspective: 900 }}>
        <motion.div style={{ rotateX: rx, rotateY: reduce ? 0 : ry, transformStyle: "preserve-3d" }}>
          <motion.div style={{ rotateY: reduce ? 0 : boltRotY, transformStyle: "preserve-3d" }} className="relative h-[26rem] w-48">
            {Array.from({ length: 10 }).map((_, i) => (
              <Bolt
                key={i}
                className={"absolute inset-0 h-full w-full " + (i === 9 ? "text-bolt animate-flicker drop-shadow-[0_0_40px_var(--bolt)]" : "text-bolt/60")}
                style={{ transform: `translateZ(${i * 3}px)`, filter: i < 9 ? `brightness(${0.4 + i * 0.05})` : undefined }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div style={reduce ? {} : { y: textY }} className="mx-auto w-full max-w-7xl px-5 pb-16 pt-32">
        <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="eyebrow mb-6 flex items-center gap-3 text-signal">
          <span className="inline-block h-px w-10 bg-signal" /> São José · SC · desde 1999
        </motion.p>
        <h1 className="display-xl text-[clamp(3rem,10vw,9.5rem)]">
          {["Seu carro", "nas mãos", "da família"].map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className={"block " + (i === 2 ? "text-signal" : "")}
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.3 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="mt-8 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <p className="max-w-xl text-lg text-paper/85 md:text-xl">
            Começou como a elétrica do Carlos em Forquilhinhas. Hoje são duas lojas, mais de 21 mil carros atendidos — e
            o <strong className="text-paper">check-up de +30 itens continua grátis</strong>.
          </p>
          <StoreButtons dark />
        </motion.div>
      </motion.div>
    </section>
  );
}

function Marquee() {
  const items = ["Mecânica geral", "Auto elétrica", "Injeção eletrônica", "Freios", "Ar-condicionado", "Arrefecimento", "Diagnóstico computadorizado", "Linha pesada"];
  return (
    <div className="hazard py-1.5">
      <div className="overflow-hidden bg-navy-deep py-4 text-paper">
        <div className="animate-marquee flex w-max gap-10 whitespace-nowrap font-display text-2xl font-black uppercase">
          {[...items, ...items].map((t, i) => (
            <span key={i} className="flex items-center gap-10">
              {t} <Bolt className="h-6 w-3 text-signal" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Numbers() {
  const stats = [
    { n: 21658, label: "veículos atendidos", s: "" },
    { n: 25, label: "anos em São José", s: "+" },
    { n: 4.7, label: "estrelas no Google", s: "★", d: 1 },
    { n: 2, label: "lojas da família", s: "" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-5 py-24">
      <div className="grid grid-cols-2 gap-y-12 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="border-l-2 border-navy pl-5">
            <div className="font-display text-5xl font-black text-navy md:text-6xl" style={{ fontStretch: "125%" }}>
              <Counter to={s.n} suffix={s.s} decimals={s.d} />
            </div>
            <div className="mt-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground">{s.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Offer() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["10%", "-30%"]);
  const checks = ["Freios e fluido", "Bateria e alternador", "Suspensão", "Iluminação", "Arrefecimento", "Óleo e filtros", "Pneus e alinhamento", "Palhetas e buzina"];
  return (
    <section ref={ref} className="relative overflow-hidden bg-signal py-24 text-navy-deep">
      <motion.div style={{ x }} className="pointer-events-none absolute -top-6 left-0 whitespace-nowrap font-display text-[16rem] font-black uppercase leading-none text-navy-deep/[0.06]" aria-hidden>
        check-up grátis check-up grátis
      </motion.div>
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-2 md:items-center">
        <Reveal>
          <p className="eyebrow mb-4 text-bolt">Oferta da casa</p>
          <h2 className="display-xl text-6xl md:text-8xl">
            +30 itens.
            <br />
            R$ 0.
          </h2>
          <p className="mt-6 max-w-md text-lg">
            Agende sua revisão e a gente confere o carro de ponta a ponta, sem custo. Você sai sabendo o que precisa agora e o que pode esperar.
          </p>
          <div className="mt-8">
            <StoreButtons topic="o check-up grátis de +30 itens" />
          </div>
        </Reveal>
        <ul className="grid grid-cols-2 gap-px bg-navy-deep/20">
          {checks.map((c, i) => (
            <motion.li
              key={c}
              initial={{ opacity: 0, rotateX: -90 }}
              whileInView={{ opacity: 1, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.6 }}
              style={{ transformPerspective: 600 }}
              className="flex items-center gap-3 bg-signal p-5 font-semibold"
            >
              <span className="font-display text-xs font-black text-bolt">{String(i + 1).padStart(2, "0")}</span> {c}
            </motion.li>
          ))}
          <li className="col-span-2 bg-navy-deep p-5 font-display text-sm font-bold uppercase tracking-widest text-signal">+ 22 itens conferidos na loja</li>
        </ul>
      </div>
    </section>
  );
}

const SERVICES = [
  { t: "Mecânica geral e revisão", d: "Troca de óleo e filtros, alinhamento, balanceamento, suspensão, motor." },
  { t: "Auto elétrica", d: "Onde tudo começou. Bateria, alternador, motor de partida, iluminação — linha leve e pesada." },
  { t: "Injeção e diagnóstico", d: "Leitura computadorizada das falhas eletrônicas antes de trocar qualquer peça." },
  { t: "Freios", d: "Manutenção, limpeza do sistema e troca de fluido." },
  { t: "Ar-condicionado", d: "Diagnóstico, recarga de gás e higienização." },
  { t: "Arrefecimento", d: "Limpeza, reparo do sistema e troca de fluidos." },
  { t: "Acessórios", d: "Alarme, trava elétrica, máquina de vidro, lâmpadas halógenas e LED." },
];

function Services() {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <section id="servicos" className="bg-navy-deep py-28 text-paper">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <p className="eyebrow mb-4 text-signal">O que a gente faz</p>
            <h2 className="display-xl text-5xl md:text-7xl">Da bateria<br />ao motor.</h2>
          </Reveal>
          <p className="max-w-sm text-paper/75">Mecânica geral, auto elétrica e injeção eletrônica no mesmo lugar. Você não precisa levar o carro em três oficinas.</p>
        </div>
        <ul className="border-t border-paper/15" onMouseLeave={() => setHover(null)}>
          {SERVICES.map((s, i) => (
            <motion.li
              key={s.t}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.05 }}
              onMouseEnter={() => setHover(i)}
              className="group relative border-b border-paper/15"
            >
              <a href={whatsappLink(STORES[0]!, s.t.toLowerCase())} target="_blank" rel="noopener noreferrer" className="relative z-10 grid gap-2 py-7 md:grid-cols-[5rem_1fr_1.2fr_auto] md:items-center">
                <span className="font-display text-sm font-bold text-signal">{String(i + 1).padStart(2, "0")}</span>
                <h3 className={"font-display text-2xl font-extrabold uppercase transition-transform duration-300 group-hover:translate-x-3 md:text-4xl " + (hover === i ? "text-navy-deep" : "")}>{s.t}</h3>
                <p className={"text-paper/70 transition-colors " + (hover === i ? "text-navy-deep" : "")}>{s.d}</p>
                <span className={"hidden font-display text-xs font-bold uppercase tracking-widest md:block " + (hover === i ? "text-navy-deep" : "text-paper/40")}>Orçar →</span>
              </a>
              {hover === i && <motion.div layoutId="svc-hl" className="absolute inset-0 bg-signal" transition={{ type: "spring", stiffness: 300, damping: 30 }} />}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Story() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const rot = useTransform(scrollYProgress, [0, 1], [-4, 3]);
  const lineH = useTransform(scrollYProgress, [0.15, 0.7], ["0%", "100%"]);
  const timeline = [
    { y: "1999", t: "Carlos Nunes abre a Eletro Nunes, uma elétrica em Forquilhinhas." },
    { y: "Depois", t: "A elétrica vira centro automotivo completo: mecânica, injeção, freios, ar." },
    { y: "Hoje", t: "Duas lojas em São José. A do Sertão do Maruim é tocada pela Naida, esposa do Carlos." },
  ];
  return (
    <section id="historia" ref={ref} className="mx-auto grid max-w-7xl gap-16 overflow-hidden px-5 py-28 md:grid-cols-2 md:items-center">
      <motion.figure style={{ y: imgY, rotate: rot }} className="relative">
        <div className="hazard absolute -inset-3 -z-10 translate-x-4 translate-y-4" />
        <img src={family.url} alt="Carlos e Naida Nunes no balcão amarelo da Nunes Autocenter" width={800} height={533} loading="lazy" className="w-full object-cover" />
        <figcaption className="bg-navy-deep px-4 py-3 text-sm text-paper">Carlos e Naida Nunes, na loja.</figcaption>
      </motion.figure>
      <div>
        <Reveal>
          <p className="eyebrow mb-4 text-bolt">Nossa história</p>
          <h2 className="display-xl text-5xl text-navy md:text-7xl">Começou<br />com um fio.</h2>
        </Reveal>
        <div className="relative mt-10 pl-8">
          <div className="absolute left-0 top-0 h-full w-0.5 bg-border" />
          <motion.div style={{ height: lineH }} className="absolute left-0 top-0 w-0.5 bg-bolt" />
          {timeline.map((e, i) => (
            <Reveal key={e.y} delay={i * 0.1} className="relative mb-10 last:mb-0">
              <span className="absolute -left-[2.35rem] top-1 size-3 rotate-45 bg-signal ring-4 ring-paper" />
              <div className="font-display text-3xl font-black text-navy">{e.y}</div>
              <p className="mt-1 max-w-md text-muted-foreground">{e.t}</p>
            </Reveal>
          ))}
        </div>
        <p className="mt-10 font-display text-lg font-bold italic text-navy">"Tudo é possível ao que crê!"</p>
      </div>
    </section>
  );
}

const REVIEWS = [
  { n: "Simone Santos Silva", t: "A melhor oficina da região de São José, com um ótimo atendimento do Pedro e do Thiago, que são muito atenciosos e prestativos. Sem palavras!" },
  { n: "Francesco Claro Berben", t: "Recomendo, sempre me atendem bem, com atendimento honesto e valor justo." },
  { n: "João Vitor Santos", t: "Atendimento de qualidade, recomendo bastante pela eficiência e rapidez nos serviços." },
  { n: "Jadson Patrick", t: "Ótima oficina! Mecânicos diferenciados e atendimento excepcional." },
];

function Reviews() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-35%"]);
  return (
    <section id="avaliacoes" ref={ref} className="overflow-hidden border-y border-border bg-secondary py-28">
      <div className="mx-auto mb-14 flex max-w-7xl flex-wrap items-end justify-between gap-6 px-5">
        <Reveal>
          <p className="eyebrow mb-4 text-bolt">Avaliações do Google</p>
          <h2 className="display-xl text-5xl text-navy md:text-7xl">4,7 de 5.</h2>
        </Reveal>
        <p className="max-w-xs text-muted-foreground">O que mais aparece nas avaliações: honestidade no preço e gente que explica o que está fazendo.</p>
      </div>
      <motion.div style={{ x }} className="flex w-max gap-6 px-5">
        {REVIEWS.map((r, i) => (
          <blockquote key={r.n} className={"w-[22rem] shrink-0 p-8 md:w-[28rem] " + (i % 2 ? "bg-navy text-paper" : "bg-card text-card-foreground")}>
            <div className="mb-4 text-signal" aria-label="5 estrelas">★★★★★</div>
            <p className="font-display text-xl font-semibold leading-snug">“{r.t}”</p>
            <footer className="mt-6 text-sm font-semibold uppercase tracking-widest opacity-70">{r.n} · Google</footer>
          </blockquote>
        ))}
      </motion.div>
    </section>
  );
}

const STORE_PHOTOS: Record<Store["id"], string> = {
  forquilhinhas: fotoForquilhinhas.url,
  sertao: fotoSertao.url,
};

function StoreCard({ s, i }: { s: Store; i: number }) {
  return (
    <Reveal delay={i * 0.1} className="flex flex-col bg-card">
      <div className="group relative h-72 overflow-hidden">
        <img
          src={STORE_PHOTOS[s.id]}
          alt={`Fachada da Nunes Autocenter ${s.name}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 bg-signal px-3 py-1 font-display text-xs font-extrabold uppercase tracking-wider text-navy-deep">
          Fachada real
        </span>
      </div>
      <iframe
        title={`Mapa da loja Nunes Autocenter ${s.name}`}
        src={mapEmbed(s)}
        loading="lazy"
        className="h-48 w-full grayscale-[40%]"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="flex flex-1 flex-col gap-4 p-8">
        <p className="eyebrow text-bolt">Loja {String(i + 1).padStart(2, "0")}</p>
        <h3 className="font-display text-3xl font-black uppercase text-navy">{s.name}</h3>
        <p className="text-muted-foreground">{s.address}</p>
        <a href={`tel:+${s.whatsapp}`} className="font-display text-xl font-bold text-navy hover:text-bolt">{s.phone}</a>
        <a
          href={whatsappLink(s)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center justify-center gap-3 rounded-sm bg-signal px-5 py-4 font-display text-sm font-extrabold uppercase tracking-wider text-navy-deep shadow-cta transition-transform hover:-translate-y-0.5"
        >
          <WaIcon /> Chamar a loja {s.name}
        </a>
      </div>
    </Reveal>
  );
}

function Stores() {
  return (
    <section id="lojas" className="bg-navy-deep py-28">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal className="mb-14 text-paper">
          <p className="eyebrow mb-4 text-signal">Duas lojas em São José</p>
          <h2 className="display-xl text-5xl md:text-7xl">Escolha a mais perto.</h2>
          <p className="mt-4 max-w-lg text-paper/75">A mensagem já vai pronta pedindo o check-up grátis. É só apertar enviar.</p>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {STORES.map((s, i) => <StoreCard key={s.id} s={s} i={i} />)}
        </div>
      </div>
    </section>
  );
}

function FloatingWa() {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
      {open &&
        STORES.map((s, i) => (
          <motion.a
            key={s.id}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            href={whatsappLink(s)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm bg-navy-deep px-4 py-3 text-sm font-semibold text-paper shadow-lg hover:bg-navy"
          >
            Loja {s.name}
          </motion.a>
        ))}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Falar no WhatsApp"
        className="flex size-16 items-center justify-center rounded-full bg-signal text-navy-deep shadow-cta transition-transform hover:scale-105"
      >
        <span className="[&>svg]:size-8"><WaIcon /></span>
      </button>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-paper py-12">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-5 text-sm text-muted-foreground">
        <img src={logo.url} alt="Nunes Autocenter" width={948} height={390} loading="lazy" className="h-10 w-auto" />
        <p>Mecânica geral · Auto elétrica · Injeção eletrônica — São José, SC</p>
        <p>Fixo: (48) 3034-2831</p>
      </div>
    </footer>
  );
}

function ScrollBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-bolt" />;
}

function Index() {
  return (
    <main className="bg-background">
      <ScrollBar />
      <Header />
      <Hero />
      <Marquee />
      <Numbers />
      <Offer />
      <Services />
      <Story />
      <Reviews />
      <Stores />
      <Footer />
      <FloatingWa />
    </main>
  );
}
