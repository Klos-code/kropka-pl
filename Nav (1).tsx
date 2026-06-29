import logo from "@/assets/kropka-logo.png";

export function Nav() {
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
          <a href="#services" className="hover:text-[var(--gold)] transition-colors">Услуги</a>
          <a href="#process" className="hover:text-[var(--gold)] transition-colors">Как работаем</a>
          <a href="#about" className="hover:text-[var(--gold)] transition-colors">О нас</a>
          <a href="#contact" className="hover:text-[var(--gold)] transition-colors">Контакты</a>
        </nav>
        <a
          href="#contact"
          className="inline-flex items-center rounded-full bg-[var(--gold)] px-5 py-2.5 text-sm font-medium text-[var(--forest)] transition hover:brightness-95"
        >
          Оставить заявку
        </a>
      </div>
    </header>
  );
}
