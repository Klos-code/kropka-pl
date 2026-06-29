import { useI18n } from "@/lib/i18n";

export function About() {
  const { t } = useI18n();
  return (
    <section id="about" className="bg-ivory py-28">
      <div className="container-page grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)]">{t.about.kicker}</span>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl text-[var(--forest)] text-balance">
            {t.about.titleA}<br />{t.about.titleB}<br />
            <span className="italic">{t.about.titleC}</span>.
          </h2>
        </div>
        <div className="lg:col-span-7 space-y-6 text-lg leading-relaxed text-foreground/80">
          <p>{t.about.p1}</p>
          <p>{t.about.p2}</p>
        </div>

      </div>
    </section>
  );
}
