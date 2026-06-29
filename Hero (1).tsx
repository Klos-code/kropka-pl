import hero from "@/assets/kropka-hero.jpg";

export function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden bg-[var(--forest)] text-ivory">
      <img
        src={hero}
        alt="Документы в польском кабинете"
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, oklch(0.25 0.05 165 / 0.85) 0%, oklch(0.32 0.055 165 / 0.95) 60%, var(--forest) 100%)" }}
      />
      <div className="relative container-page flex min-h-[100svh] flex-col justify-center pt-32 pb-20">
        <span className="inline-flex items-center gap-2 self-start rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/5 px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-[var(--gold)] animate-float-in">
          Legalizacja w Polsce · с 2018 года
        </span>
        <h1 className="mt-8 max-w-4xl font-serif text-5xl leading-[1.05] tracking-tight text-balance md:text-7xl lg:text-[88px] animate-float-in" style={{ animationDelay: "0.1s" }}>
          Ставим точку<br />
          <span className="italic text-[var(--gold)]">в вопросах</span> легализации<span className="kropka-dot" />
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-ivory/75 animate-float-in" style={{ animationDelay: "0.2s" }}>
          Карта побыта, гражданство и документы для иностранцев в Польше.
          Сопровождаем от первого обращения до результата.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4 animate-float-in" style={{ animationDelay: "0.3s" }}>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--gold)] px-7 py-3.5 text-sm font-semibold text-[var(--forest)] shadow-[var(--shadow-elegant)] transition hover:brightness-95"
          >
            Оставить заявку
            <span aria-hidden>→</span>
          </a>
          <a href="#services" className="text-sm text-ivory/80 underline-offset-8 hover:text-[var(--gold)] hover:underline">
            Посмотреть услуги
          </a>
        </div>
      </div>
    </section>
  );
}
