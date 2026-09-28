'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SECTIONS = [
  { id: 'work', label: 'Work' },
  { id: 'capabilities', label: 'Capabilities' },
  { id: 'start', label: 'Start a project' },
] as const;

const COMPLIANCE = [
  { href: '/sms-signup', label: 'SMS opt-in' },
  { href: '/privacy-policy', label: 'Privacy' },
  { href: '/terms-of-service', label: 'Terms' },
] as const;

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  target.scrollIntoView({
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    block: 'start',
  });
  if (window.location.pathname === '/' && window.location.hash !== `#${id}`) {
    window.history.replaceState(null, '', `#${id}`);
  }
}

export default function StudioFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const year = new Date().getFullYear();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const menuTitleId = useId();

  useEffect(() => {
    if (pathname !== '/') {
      setActive(null);
      return;
    }

    const desktop = window.matchMedia('(min-width: 768px)');
    const ratios = new Map<string, number>();
    let observer: IntersectionObserver | null = null;

    function markVisibleSection() {
      let bestId: string | null = null;
      let bestRatio = 0;
      for (const section of SECTIONS) {
        const ratio = ratios.get(section.id) ?? 0;
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = section.id;
        }
      }
      if (bestId) setActive(bestId);
    }

    function observe() {
      observer?.disconnect();
      ratios.clear();
      const scroller = scrollerRef.current;
      const elements = SECTIONS.map((section) => document.getElementById(section.id)).filter(
        (element): element is HTMLElement => element !== null,
      );
      if (!scroller || elements.length === 0) {
        setActive(null);
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
          }
          markVisibleSection();
        },
        {
          root: desktop.matches ? scroller : null,
          threshold: [0, 0.25, 0.5, 0.75, 1],
        },
      );

      elements.forEach((element) => observer?.observe(element));
    }

    observe();
    desktop.addEventListener('change', observe);

    const hash = window.location.hash.replace('#', '');
    if (SECTIONS.some((section) => section.id === hash)) {
      requestAnimationFrame(() => scrollToSection(hash));
    }

    return () => {
      desktop.removeEventListener('change', observe);
      observer?.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const menu = menuRef.current;
    if (!menu) return;

    const focusable = () =>
      Array.from(menu.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));

    menu.querySelector<HTMLElement>('nav a[href]')?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        setMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab') return;
      const items = focusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  function closeMenu(returnFocus: boolean) {
    setMenuOpen(false);
    if (returnFocus) menuButtonRef.current?.focus();
  }

  function onSectionClick(event: React.MouseEvent<HTMLAnchorElement>, id: string) {
    event.preventDefault();
    if (pathname !== '/') {
      if (menuOpen) setMenuOpen(false);
      window.location.assign(`/#${id}`);
      return;
    }
    if (menuOpen) closeMenu(true);
    scrollToSection(id);
    setActive(id);
  }

  const navLink = (id: string, label: string) => {
    const current = pathname === '/' && active === id;
    return (
      <Link
        href={`/#${id}`}
        onClick={(event) => onSectionClick(event, id)}
        aria-current={current ? 'true' : undefined}
        className={
          current
            ? 'underline decoration-[#141614] decoration-2 underline-offset-4'
            : 'no-underline'
        }
      >
        {label}
      </Link>
    );
  };

  return (
    <div className="md:h-screen">
      <aside className="hidden h-screen w-[340px] flex-col bg-[#f3efe6] px-8 py-8 md:fixed md:inset-y-0 md:left-0 md:flex">
        <Image
          src="/logo.png"
          alt="Idaho Software Development"
          width={326}
          height={260}
          className="h-[120px] w-auto"
        />
        <p className="font-news mt-8 text-[26px] leading-snug text-[#141614]">
          Custom software for businesses that have outgrown their tools.
        </p>
        <nav className="mt-10 flex flex-col gap-4 text-[17px]" aria-label="Sections">
          {SECTIONS.map((section) => (
            <span key={section.id}>{navLink(section.id, section.label)}</span>
          ))}
        </nav>
        <div className="mt-auto space-y-3 pt-10 text-[13px] leading-relaxed">
          <p>Erik Short, Founder · Treasure Valley</p>
          <p>
            <a href="mailto:admin@idsoftwaredev.com" className="underline">
              admin@idsoftwaredev.com
            </a>
          </p>
          <p className="flex flex-wrap gap-x-3 gap-y-1">
            {COMPLIANCE.map((item) => (
              <Link key={item.href} href={item.href} className="underline">
                {item.label}
              </Link>
            ))}
          </p>
          <p>© {year} Idaho Software Development</p>
        </div>
      </aside>

      <div
        ref={scrollerRef}
        className="md:ml-[340px] md:h-screen md:overflow-y-auto"
      >
        <header className="sticky top-0 z-20 flex items-center justify-between gap-3 bg-[#f3efe6] px-4 py-3 md:hidden">
          <Link href="/" className="flex items-center gap-3 no-underline">
            <Image
              src="/logo.png"
              alt="Idaho Software Development"
              width={326}
              height={260}
              className="h-10 w-auto"
            />
            <span className="text-[15px] leading-tight">Idaho Software Development</span>
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="studio-menu"
            className="px-3 py-2 text-[15px]"
            onClick={() => setMenuOpen(true)}
          >
            Menu
          </button>
        </header>

        {children}

        <p className="px-6 py-10 text-[13px] md:hidden">© {year} Idaho Software Development</p>
      </div>

      {menuOpen ? (
        <div
          ref={menuRef}
          id="studio-menu"
          role="dialog"
          aria-modal="true"
          aria-labelledby={menuTitleId}
          className="fixed inset-0 z-30 flex flex-col bg-[#f3efe6] px-6 py-6 md:hidden"
        >
          <div className="flex items-center justify-between">
            <p id={menuTitleId} className="text-[15px]">
              Idaho Software Development
            </p>
            <button type="button" className="px-3 py-2 text-[15px]" onClick={() => closeMenu(true)}>
              Close
            </button>
          </div>
          <nav className="mt-10 flex flex-col gap-6 text-[28px]" aria-label="Menu">
            {SECTIONS.map((section) => (
              <span key={section.id}>{navLink(section.id, section.label)}</span>
            ))}
            {COMPLIANCE.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="no-underline"
                onClick={() => closeMenu(true)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </div>
  );
}
