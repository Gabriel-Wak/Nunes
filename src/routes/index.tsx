import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import {
  STORES,
  LANDLINE,
  SITE_URL,
  absoluteUrl,
  whatsappLink,
  mapEmbed,
  mapsLink,
  type Store,
} from "@/lib/stores";
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

const STORE_PHOTOS: Record<
  Store["id"],
  { src: string; width: number; height: number; position: string }
> = {
  forquilhinhas: { src: fotoForquilhinhas.url, width: 1707, height: 1280, position: "center 45%" },
  sertao: { src: fotoSertao.url, width: 1600, height: 1107, position: "center" },
};

const shortAddress = (s: Store) => s.address.split(" — ")[0];

const TITLE = "Nunes Autocenter — Mecânica e auto elétrica em São José, SC";
const DESC =
  "Desde 1999 cuidando dos carros de São José. Mecânica, auto elétrica, freios, ar-condicionado e check-up grátis de +30 itens em Forquilhinhas e Sertão do Maruim.";

const OG_IMAGE = absoluteUrl(fotoForquilhinhas.url);

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
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1707" },
      { property: "og:image:height", content: "1280" },
      {
        property: "og:image:alt",
        content: "Fachada da Nunes Autocenter em Forquilhinhas, São José",
      },
      { name: "twitter:image", content: OG_IMAGE },
      ...(SITE_URL ? [{ property: "og:url", content: SITE_URL + "/" }] : []),
    ],
    links: SITE_URL ? [{ rel: "canonical", href: SITE_URL + "/" }] : [],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          STORES.map((s) => ({
            "@context": "https://schema.org",
            "@type": "AutoRepair",
            name: `Nunes Autocenter ${s.name}`,
            telephone: `+${s.whatsapp}`,
            address: {
              "@type": "PostalAddress",
              streetAddress: s.address,
              addressLocality: "São José",
              addressRegion: "SC",
              addressCountry: "BR",
            },
            image: absoluteUrl(STORE_PHOTOS[s.id].src),
            ...(SITE_URL ? { url: SITE_URL + "/" } : {}),
            hasMap: mapsLink(s),
            foundingDate: "1999",
          })),
        ),
      },
    ],
  }),
  component: Index,
});

/* ---------- small pieces ---------- */

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
            "group inline-flex items-center gap-3 rounded-sm px-5 py-4 font-display text-base font-bold uppercase tracking-wide transition-colors " +
            (s.id === "forquilhinhas"
              ? "bg-signal text-graphite shadow-cta hover:bg-signal-dark"
              : dark
                ? "border-2 border-paper/40 text-paper hover:border-signal hover:text-signal"
                : "border-2 border-graphite text-graphite hover:bg-graphite hover:text-paper")
          }
        >
          <WaIcon />
          <span>
            <span className="block text-xs tracking-[0.12em] opacity-70">WhatsApp</span>
            Loja {s.name}
          </span>
          <span aria-hidden>→</span>
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

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- sections ---------- */

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-steel bg-graphite">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
        <a href="#topo" className="py-1">
          <img
            src={logoLight.url}
            alt="Nunes Autocenter"
            width={948}
            height={390}
            className="h-10 w-auto"
          />
        </a>
        <nav className="hidden gap-8 text-sm font-semibold text-paper md:flex">
          <a href="#servicos" className="hover:text-signal">
            Serviços
          </a>
          <a href="#historia" className="hover:text-signal">
            Nossa história
          </a>
          <a href="#avaliacoes" className="hover:text-signal">
            Avaliações
          </a>
          <a href="#lojas" className="hover:text-signal">
            Lojas
          </a>
        </nav>
        <a
          href="#lojas"
          className="rounded-sm bg-signal px-4 py-2 font-display text-sm font-bold uppercase tracking-wide text-graphite hover:bg-signal-dark"
        >
          Agendar
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section
      id="topo"
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-graphite text-paper"
    >
      <img
        src={fotoForquilhinhas.url}
        alt="Fachada da Nunes Autocenter em Forquilhinhas, São José"
        width={1707}
        height={1280}
        fetchPriority="high"
        className="absolute inset-0 -z-20 h-full w-full object-cover [filter:contrast(1.05)_saturate(0.95)]"
        style={{ objectPosition: "center 40%" }}
      />
      <div className="absolute inset-0 -z-10 bg-graphite/45" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-graphite/95 via-graphite/50 to-transparent md:bg-gradient-to-r md:from-graphite/90 md:via-graphite/55" />

      <div className="mx-auto w-full max-w-7xl px-5 pb-14 pt-32">
        <p className="eyebrow mb-5 inline-block bg-signal px-2 py-1 text-graphite">
          São José · SC · desde 1999
        </p>
        <h1 className="display-xl text-[clamp(3.5rem,11vw,9.5rem)]">
          Seu carro
          <br />
          nas mãos
          <br />
          <span className="text-signal">da família</span>
        </h1>
        <div className="mt-8 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <p className="max-w-xl text-lg text-paper/90 md:text-xl">
            Começou como a elétrica do Carlos em Forquilhinhas. Hoje são duas lojas, mais de 21 mil
            carros atendidos — e o{" "}
            <strong className="text-paper">check-up de +30 itens continua grátis</strong>.
          </p>
          <StoreButtons dark />
        </div>
        <a
          href="#lojas"
          className="mt-8 flex flex-col gap-1 border-t border-paper/20 pt-4 pr-20 text-sm text-paper/85 hover:text-signal md:flex-row md:gap-6 md:pr-0"
        >
          {STORES.map((s) => (
            <span key={s.id}>
              <strong className="font-semibold text-paper">{s.name}</strong> —{" "}
              <span className="whitespace-nowrap">{shortAddress(s)}</span>
            </span>
          ))}
        </a>
      </div>
    </section>
  );
}

function ServiceStrip() {
  const items = [
    "Mecânica",
    "Elétrica",
    "Injeção",
    "Freios",
    "Ar-condicionado",
    "Arrefecimento",
    "Troca de óleo",
    "Linha pesada",
  ];
  return (
    <div className="hazard py-1.5">
      <ul className="flex flex-wrap justify-center gap-2 bg-graphite px-5 py-5">
        {items.map((t) => (
          <li
            key={t}
            className="bg-signal px-3 py-1.5 font-display text-lg font-bold uppercase leading-none text-graphite md:text-xl"
          >
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Numbers() {
  const stats = [
    { n: "21.658", label: "veículos atendidos" },
    { n: "+25", label: "anos em São José" },
    { n: "4,7 ★", label: "estrelas no Google" },
    { n: "2", label: "lojas da família" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-5 py-20">
      <div className="grid grid-cols-2 gap-y-10 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="border-l-4 border-signal pl-5">
            <div className="tabular font-display text-5xl font-bold leading-none text-ink md:text-6xl">
              {s.n}
            </div>
            <div className="mt-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Offer() {
  const checks = [
    "Freios e fluido",
    "Bateria e alternador",
    "Suspensão",
    "Iluminação",
    "Arrefecimento",
    "Óleo e filtros",
    "Pneus e alinhamento",
    "Palhetas e buzina",
  ];
  return (
    <section className="bg-signal py-20 text-graphite">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-2 md:items-center">
        <Reveal>
          <p className="eyebrow mb-4 text-bolt">Oferta da casa</p>
          <h2 className="display-xl text-6xl md:text-8xl">
            +30 itens.
            <br />
            R$ 0.
          </h2>
          <p className="mt-6 max-w-md text-lg">
            Agende sua revisão e a gente confere o carro de ponta a ponta, sem custo. Você sai
            sabendo o que precisa agora e o que pode esperar.
          </p>
          <div className="mt-8">
            <StoreButtons topic="o check-up grátis de +30 itens" />
          </div>
        </Reveal>
        <ul className="grid grid-cols-1 gap-px border-2 border-graphite bg-graphite sm:grid-cols-2">
          {checks.map((c, i) => (
            <li
              key={c}
              className="flex items-center gap-3 bg-paper px-4 py-4 font-semibold text-ink"
            >
              <span className="tabular w-6 font-display text-base font-bold text-bolt">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className="flex size-5 shrink-0 items-center justify-center border-2 border-graphite text-xs font-bold leading-none"
                aria-hidden
              >
                ✓
              </span>
              {c}
            </li>
          ))}
          <li className="bg-graphite px-4 py-4 font-display text-base font-bold uppercase tracking-wide text-signal sm:col-span-2">
            + 22 itens conferidos na loja
          </li>
        </ul>
      </div>
    </section>
  );
}

const SERVICES = [
  {
    t: "Mecânica geral e revisão",
    d: "Troca de óleo e filtros, alinhamento, balanceamento, suspensão, motor.",
  },
  {
    t: "Auto elétrica",
    d: "Onde tudo começou. Bateria, alternador, motor de partida, iluminação — linha leve e pesada.",
  },
  {
    t: "Injeção e diagnóstico",
    d: "Leitura computadorizada das falhas eletrônicas antes de trocar qualquer peça.",
  },
  { t: "Freios", d: "Manutenção, limpeza do sistema e troca de fluido." },
  { t: "Ar-condicionado", d: "Diagnóstico, recarga de gás e higienização." },
  { t: "Arrefecimento", d: "Limpeza, reparo do sistema e troca de fluidos." },
  { t: "Acessórios", d: "Alarme, trava elétrica, máquina de vidro, lâmpadas halógenas e LED." },
];

function Services() {
  return (
    <section id="servicos" className="bg-graphite py-24 text-paper">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <p className="eyebrow mb-4 text-signal">O que a gente faz</p>
            <h2 className="display-xl text-5xl md:text-7xl">
              Da bateria
              <br />
              ao motor.
            </h2>
          </Reveal>
          <p className="max-w-sm text-paper/75">
            Mecânica geral, auto elétrica e injeção eletrônica no mesmo lugar. Você não precisa
            levar o carro em três oficinas.
          </p>
        </div>
        <ul className="border-t border-steel">
          {SERVICES.map((s, i) => (
            <li key={s.t} className="group border-b border-steel transition-colors hover:bg-signal">
              <a
                href={whatsappLink(STORES[0]!, s.t.toLowerCase())}
                target="_blank"
                rel="noopener noreferrer"
                className="grid gap-2 px-2 py-6 md:grid-cols-[5rem_1fr_1.2fr_auto] md:items-center md:px-4"
              >
                <span className="tabular font-display text-base font-bold text-signal group-hover:text-bolt">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-3xl font-bold group-hover:text-graphite md:text-4xl">
                  {s.t}
                </h3>
                <p className="text-paper/70 group-hover:text-graphite">{s.d}</p>
                <span className="hidden font-display text-sm font-bold uppercase tracking-wide text-steel-mid group-hover:text-graphite md:block">
                  Orçar →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Story() {
  const timeline = [
    { y: "1999", t: "Carlos Nunes abre a Eletro Nunes, uma elétrica em Forquilhinhas." },
    {
      y: "Com o tempo",
      t: "A elétrica vira centro automotivo completo: mecânica, injeção, freios, ar.",
    },
    {
      y: "Hoje",
      t: "Duas lojas em São José. A do Sertão do Maruim é tocada pela Naida, esposa do Carlos.",
    },
  ];
  return (
    <section
      id="historia"
      className="mx-auto grid max-w-7xl gap-14 px-5 py-24 md:grid-cols-2 md:items-center"
    >
      <figure>
        <img
          src={family.url}
          alt="Carlos e Naida Nunes no balcão amarelo da Nunes Autocenter"
          width={800}
          height={533}
          loading="lazy"
          className="h-auto w-full object-cover"
        />
        <figcaption className="mt-2 text-sm text-muted-foreground">
          Carlos e Naida Nunes, na loja.
        </figcaption>
      </figure>
      <div>
        <Reveal>
          <p className="eyebrow mb-4 text-bolt">Nossa história</p>
          <h2 className="display-xl text-5xl text-ink md:text-7xl">
            Começou
            <br />
            com um fio.
          </h2>
        </Reveal>
        <div className="relative mt-10 pl-8">
          <div className="absolute left-0 top-0 h-full w-0.5 bg-bolt" />
          {timeline.map((e) => (
            <div key={e.y} className="relative mb-10 last:mb-0">
              <span className="absolute -left-[2.35rem] top-1.5 size-3 bg-signal ring-4 ring-paper" />
              <div className="font-display text-3xl font-bold uppercase leading-none text-ink">
                {e.y}
              </div>
              <p className="mt-2 max-w-md text-muted-foreground">{e.t}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 font-display text-xl font-bold italic text-ink">
          "Tudo é possível ao que crê!"
        </p>
      </div>
    </section>
  );
}

const REVIEWS = [
  {
    n: "Simone Santos Silva",
    t: "A melhor oficina da região de São José, com um ótimo atendimento do Pedro e do Thiago, que são muito atenciosos e prestativos. Sem palavras!",
  },
  {
    n: "Francesco Claro Berben",
    t: "Recomendo, sempre me atendem bem, com atendimento honesto e valor justo.",
  },
  {
    n: "João Vitor Santos",
    t: "Atendimento de qualidade, recomendo bastante pela eficiência e rapidez nos serviços.",
  },
  { n: "Jadson Patrick", t: "Ótima oficina! Mecânicos diferenciados e atendimento excepcional." },
];

function Reviews() {
  return (
    <section id="avaliacoes" className="border-y border-border bg-secondary py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <p className="eyebrow mb-4 text-bolt">Avaliações do Google</p>
            <h2 className="display-xl text-5xl text-ink md:text-7xl">4,7 de 5.</h2>
          </Reveal>
          <p className="max-w-xs text-muted-foreground">
            O que mais aparece nas avaliações: honestidade no preço e gente que explica o que está
            fazendo.
          </p>
        </div>
        <div className="grid gap-px border border-border bg-border md:grid-cols-2">
          {REVIEWS.map((r) => (
            <blockquote key={r.n} className="bg-card p-7 text-card-foreground">
              <div className="mb-3 text-bolt" aria-label="5 estrelas">
                ★★★★★
              </div>
              <p className="text-lg leading-relaxed">“{r.t}”</p>
              <footer className="mt-5 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                {r.n} · Google
              </footer>
            </blockquote>
          ))}
        </div>
        <p className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-semibold text-ink">
          <span>Ver todas as avaliações no Google:</span>
          {STORES.map((s) => (
            <a
              key={s.id}
              href={mapsLink(s)}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-signal decoration-2 underline-offset-4 hover:text-bolt"
            >
              Loja {s.name} →
            </a>
          ))}
        </p>
      </div>
    </section>
  );
}

function StoreCard({ s, i }: { s: Store; i: number }) {
  const photo = STORE_PHOTOS[s.id];
  return (
    <Reveal className="flex flex-col bg-card">
      <figure>
        <img
          src={photo.src}
          alt={`Fachada da Nunes Autocenter ${s.name}`}
          width={photo.width}
          height={photo.height}
          loading="lazy"
          className="h-72 w-full object-cover"
          style={{ objectPosition: photo.position }}
        />
        <figcaption className="bg-steel px-4 py-2 text-sm text-paper/80">
          {shortAddress(s)}
        </figcaption>
      </figure>
      <iframe
        title={`Mapa da loja Nunes Autocenter ${s.name}`}
        src={mapEmbed(s)}
        loading="lazy"
        className="h-48 w-full grayscale-[40%]"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="flex flex-1 flex-col gap-4 p-7">
        <p className="eyebrow text-bolt">Loja {String(i + 1).padStart(2, "0")}</p>
        <h3 className="font-display text-4xl font-bold text-ink">{s.name}</h3>
        <p className="text-muted-foreground">{s.address}</p>
        <a
          href={`tel:+${s.whatsapp}`}
          className="tabular font-display text-2xl font-bold text-navy hover:text-bolt"
        >
          {s.phone}
        </a>
        <a
          href={whatsappLink(s)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center justify-center gap-3 rounded-sm bg-signal py-4 pl-5 pr-16 sm:px-5 font-display text-base font-bold uppercase tracking-wide text-graphite shadow-cta transition-colors hover:bg-signal-dark"
        >
          <WaIcon /> Chamar a loja {s.name}
        </a>
      </div>
    </Reveal>
  );
}

function Stores() {
  return (
    <section id="lojas" className="bg-graphite pb-28 pt-24 md:pb-24">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal className="mb-12 text-paper">
          <p className="eyebrow mb-4 text-signal">Duas lojas em São José</p>
          <h2 className="display-xl text-5xl md:text-7xl">Escolha a mais perto.</h2>
          <p className="mt-4 max-w-lg text-paper/75">
            A mensagem já vai pronta pedindo o check-up grátis. É só apertar enviar.
          </p>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {STORES.map((s, i) => (
            <StoreCard key={s.id} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FloatingWa() {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
      {open &&
        STORES.map((s) => (
          <a
            key={s.id}
            href={whatsappLink(s)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm border border-steel-mid bg-graphite px-4 py-3 text-sm font-semibold text-paper hover:bg-steel"
          >
            Loja {s.name}
          </a>
        ))}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Falar no WhatsApp"
        aria-expanded={open}
        className="flex size-14 items-center justify-center rounded-full bg-signal text-graphite shadow-cta transition-colors hover:bg-signal-dark"
      >
        <span className="[&>svg]:size-7">
          <WaIcon />
        </span>
      </button>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t-4 border-signal bg-graphite pb-24 pt-14 text-sm text-paper/75">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-[1fr_1fr_1fr]">
        <div>
          <img
            src={logoLight.url}
            alt="Nunes Autocenter"
            width={948}
            height={390}
            loading="lazy"
            className="h-10 w-auto"
          />
          <p className="mt-4">Mecânica geral · Auto elétrica · Injeção eletrônica — São José, SC</p>
          <p className="mt-2">
            Fixo:{" "}
            <a href={`tel:${LANDLINE.tel}`} className="tabular hover:text-signal">
              {LANDLINE.phone}
            </a>
          </p>
        </div>
        {STORES.map((s) => (
          <div key={s.id}>
            <p className="font-display text-xl font-bold uppercase text-paper">Loja {s.name}</p>
            <p className="mt-2">{s.address}</p>
            <a
              href={whatsappLink(s)}
              target="_blank"
              rel="noopener noreferrer"
              className="tabular mt-2 inline-flex items-center gap-2 font-display text-lg font-bold text-signal hover:text-paper"
            >
              <WaIcon /> {s.phone}
            </a>
          </div>
        ))}
      </div>
    </footer>
  );
}

function Index() {
  return (
    <main className="bg-background">
      <Header />
      <Hero />
      <ServiceStrip />
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
