import { useI18n } from "@/lib/i18n";

export function Process() {
  const { t } = useI18n();
  return (
    <section id="process" className="bg-[var(--forest)] py-28 text-ivory">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)]">{t.process.kicker}</span>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl text-balance">
            {t.process.titleA}<br />
            <span className="italic text-[var(--gold)]">{t.process.titleB}</span>.
          </h2>
        </div>

        <ol className="mt-20 grid gap-12 md:grid-cols-4 md:gap-6">
          {t.process.steps.map((s: any, i: number) => (
            <li key={i} className="relative">
              <div className="flex items-center gap-3">
                <span className="font-serif text-3xl text-[var(--gold)]">{String(i + 1).padStart(2, "0")}</span>
                {i < t.process.steps.length - 1 && (
                  <span className="hidden md:block h-px flex-1 bg-ivory/15" />
                )}
              </div>
              <h3 className="mt-6 font-serif text-xl text-ivory">{s.t}</h3>
              <p className="mt-2 text-sm text-ivory/65 leading-relaxed">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
