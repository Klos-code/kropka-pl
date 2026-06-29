import logo from "@/assets/kropka-logo.png";
import { useI18n } from "@/lib/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="bg-[var(--forest)] py-12 text-ivory/70">
      <div className="container-page flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-2.5">
          <img src={logo} alt="" width={28} height={28} className="h-7 w-7" loading="lazy" />
          <span className="font-serif text-base text-ivory">Kropka<span className="text-[var(--gold)]">.pl</span></span>
        </div>
        <p className="text-xs text-center">© {new Date().getFullYear()} Kropka.pl · {t.footer.slogan}</p>
        <div className="flex flex-col items-center gap-3 md:items-end">
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-xs">
            {t.footer.links.map((l: string) => (
              <a key={l} href="#" className="hover:text-[var(--gold)]">{l}</a>
            ))}
          </div>
          <LanguageSwitcher tone="light" />
        </div>
      </div>
    </footer>
  );
}
