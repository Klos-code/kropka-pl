import logo from "@/assets/kropka-logo.png";
import { useI18n } from "@/lib/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Nav() {
  const { t } = useI18n();
  return (
    <header className="absolute top-0 left-0 right-0 z-20">
      <div className="container-page flex items-center justify-between py-6">
        <a href="#top" className="flex items-center gap-2.5 text-ivory">
          <img src={logo} alt="Kropka.pl" width={36} height={36} className="h-9 w-9" />
          <span className="font-serif text-xl tracking-tight">
            Kropka<span className="text-[var(--gold)]">.pl</span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-9 text-sm text-ivory/80">
          <a href="#services" className="hover:text-[var(--gold)] transition-colors">{t.nav.services}</a>
          <a href="#process" className="hover:text-[var(--gold)] transition-colors">{t.nav.process}</a>
          <a href="#about" className="hover:text-[var(--gold)] transition-colors">{t.nav.about}</a>
          <a href="#contact" className="hover:text-[var(--gold)] transition-colors">{t.nav.contact}</a>
        </nav>
        <div className="flex items-center gap-5">
          <LanguageSwitcher tone="light" />
          <a
            href="#contact"
            className="inline-flex items-center rounded-full bg-[var(--gold)] px-5 py-2.5 text-sm font-medium text-[var(--forest)] transition hover:brightness-95"
          >
            {t.nav.cta}
          </a>
        </div>
      </div>
    </header>
  );
}
