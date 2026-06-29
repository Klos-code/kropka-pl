import { useI18n } from "@/lib/i18n";

export function Services() {
  const { t } = useI18n();
  return (
    <section id="services" className="bg-ivory py-28">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)]">{t.services.kicker}</span>
            <h2 className="mt-4 max-w-2xl font-serif text-4xl md:text-5xl text-[var(--forest)] text-balance">
              {t.services.titleA}<br />
              <span className="italic">{t.services.titleB}</span>
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground">{t.services.lede}</p>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {t.services.items.map((s: any, i: number) => (
            <article key={i} className="group relative flex flex-col bg-card p-8 transition hover:bg-[var(--forest)]">
              <div className="flex items-center justify-between">
                <span className="font-serif text-sm text-muted-foreground group-hover:text-[var(--gold)]">{String(i + 1).padStart(2, "0")}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
              </div>
              <h3 className="mt-8 font-serif text-2xl text-[var(--forest)] group-hover:text-ivory">{s.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground group-hover:text-ivory/70">{s.d}</p>
              <ul className="mt-6 space-y-1.5 text-xs text-[var(--forest)]/70 group-hover:text-ivory/60">
                {s.p.map((p: string) => (
                  <li key={p} className="flex items-center gap-2">
                    <span className="h-px w-3 bg-[var(--gold)]" />
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
