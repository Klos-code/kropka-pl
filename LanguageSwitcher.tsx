import { LANGS, useI18n } from "@/lib/i18n";

export function LanguageSwitcher({ tone = "light" }: { tone?: "light" | "dark" }) {
  const { lang, setLang } = useI18n();
  const base = tone === "light" ? "text-ivory/60" : "text-foreground/60";
  const active = tone === "light" ? "text-[var(--gold)]" : "text-[var(--forest)]";
  return (
    <div className="flex items-center gap-1 text-[11px] uppercase tracking-wider">
      {LANGS.map((l, i) => (
        <span key={l.code} className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setLang(l.code)}
            className={`px-1 transition-colors hover:text-[var(--gold)] ${lang === l.code ? active + " font-semibold" : base}`}
            aria-label={`Change language to ${l.label}`}
          >
            {l.label}
          </button>
          {i < LANGS.length - 1 && <span className={base}>·</span>}
        </span>
      ))}
    </div>
  );
}
