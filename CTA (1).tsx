import { useI18n } from "@/lib/i18n";

export function CTA() {
  const { t } = useI18n();
  return (
    <section id="contact" className="bg-ivory pb-28">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl bg-[var(--forest)] p-10 md:p-16 text-ivory shadow-[var(--shadow-elegant)]">
          <div
            aria-hidden
            className="absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-30 blur-3xl"
            style={{ background: "var(--gradient-gold)" }}
          />
          <div className="relative grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)]">{t.cta.kicker}</span>
              <h2 className="mt-4 font-serif text-4xl md:text-5xl text-balance">
                {t.cta.titleA}<br /><span className="italic text-[var(--gold)]">{t.cta.titleB}</span>
              </h2>
              <p className="mt-6 max-w-md text-ivory/70">{t.cta.lede}</p>
              <ul className="mt-8 space-y-2 text-sm text-ivory/75">
                <li>📍 Katowice, ul. Korfantego 2/211</li>
                <li>📞 <a href="tel:+48539408468" className="hover:text-[var(--gold)]">+48 539 408 468</a></li>
                <li>✉ <a href="mailto:hello@kropka.pl" className="hover:text-[var(--gold)]">hello@kropka.pl</a></li>
              </ul>
            </div>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-4 rounded-2xl bg-ivory p-6 text-foreground md:p-8"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">{t.cta.name}</span>
                  <input
                    type="text"
                    className="mt-2 w-full border-b border-border bg-transparent py-2 outline-none focus:border-[var(--forest)]"
                    placeholder={t.cta.namePh}
                  />
                </label>
                <label className="block">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">{t.cta.phone}</span>
                  <input
                    type="tel"
                    className="mt-2 w-full border-b border-border bg-transparent py-2 outline-none focus:border-[var(--forest)]"
                    placeholder={t.cta.phonePh}
                  />
                </label>
              </div>
              <label className="block">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">{t.cta.msg}</span>
                <textarea
                  rows={3}
                  className="mt-2 w-full resize-none border-b border-border bg-transparent py-2 outline-none focus:border-[var(--forest)]"
                  placeholder={t.cta.msgPh}
                />
              </label>
              <button
                type="submit"
                className="mt-2 w-full rounded-full bg-[var(--forest)] py-3.5 text-sm font-semibold text-ivory transition hover:bg-[var(--emerald)]"
              >
                {t.cta.submit}
              </button>
              <p className="text-center text-[11px] text-muted-foreground">{t.cta.consent}</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
