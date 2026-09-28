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
      setActive(bestId);
    }

    const elements = SECTIONS.map((section) => document.getElementById(section.id)).filter(
      (element): element is HTMLElement => element !== null,
    );
    if (elements.length > 0) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
          }
          markVisibleSection();
        },
        { threshold: [0, 0.15, 0.35, 0.6, 1] },
      );
      elements.forEach((element) => observer?.observe(element));
    }

    const hash = window.location.hash.replace('#', '');
    if (SECTIONS.some((section) => section.id === hash)) {
      requestAnimationFrame(() => scrollToSection(hash));
    }

    return () => observer?.disconnect();
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

  const navLink = (id: string, label: string, size: 'bar' | 'menu') => {
    const current = pathname === '/' && active === id;
    return (
      <Link
        href={`/#${id}`}
        onClick={(event) => onSectionClick(event, id)}
        aria-current={current ? 'true' : undefined}
        className={
          size === 'menu'
            ? `font-display text-[1.7rem] no-underline ${current ? 'text-[var(--mist)]' : ''}`
            : `font-mono text-[0.75rem] tracking-[0.16em] uppercase no-underline ${
                current ? 'text-[var(--mist)]' : 'text-[var(--muted)] hover:text-[var(--ink)]'
              }`
        }
      >
        {label}
      </Link>
    );
  };

  return (
    <div>
      <header className="sticky top-0 z-20 border-b border-[var(--line)] bg-[var(--field)]/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1080px] items-center justify-between gap-4 px-6 py-3">
          <Link href="/" className="flex items-center gap-3 no-underline">
            <span className="block h-10 shrink-0 overflow-hidden">
              <Image
                src="/logo.png"
                alt=""
                width={326}
                height={260}
                className="h-14 w-auto max-w-none"
              />
            </span>
            <span className="font-display max-w-[11rem] text-[15px] leading-tight sm:max-w-none sm:text-[17px]">
              Idaho Software Development
            </span>
          </Link>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Sections">
            {SECTIONS.map((section) => (
              <span key={section.id}>{navLink(section.id, section.label, 'bar')}</span>
            ))}
          </nav>
          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="studio-menu"
            className="font-mono px-3 py-2 text-[0.75rem] tracking-[0.16em] uppercase md:hidden"
            onClick={() => setMenuOpen(true)}
          >
            Menu
          </button>
        </div>
      </header>

      {children}

      <footer className="mx-auto flex max-w-[1080px] flex-col gap-4 px-6 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2 text-[13px] leading-relaxed text-[var(--muted)]">
          <p>Erik Short, Founder · Treasure Valley</p>
          <p>
            <a href="mailto:admin@idsoftwaredev.com" className="text-[var(--ink)] underline decoration-[var(--teal)] underline-offset-4">
              admin@idsoftwaredev.com
            </a>
          </p>
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            {COMPLIANCE.map((item) => (
              <Link key={item.href} href={item.href} className="underline decoration-[var(--line)] underline-offset-4">
                {item.label}
              </Link>
            ))}
          </p>
        </div>
        <p className="font-mono text-[0.72rem] tracking-wide text-[var(--faint)]">
          © {year} Idaho Software Development
        </p>
      </footer>

      {menuOpen ? (
        <div
          ref={menuRef}
          id="studio-menu"
          role="dialog"
          aria-modal="true"
          aria-labelledby={menuTitleId}
          className="fixed inset-0 z-30 flex flex-col bg-[var(--field)] px-6 py-6 md:hidden"
        >
          <div className="flex items-center justify-between">
            <p id={menuTitleId} className="font-display text-[15px]">
              Idaho Software Development
            </p>
            <button
              type="button"
              className="font-mono px-3 py-2 text-[0.75rem] tracking-[0.16em] uppercase"
              onClick={() => closeMenu(true)}
            >
              Close
            </button>
          </div>
          <nav className="mt-12 flex flex-col gap-6" aria-label="Menu">
            {SECTIONS.map((section) => (
              <span key={section.id}>{navLink(section.id, section.label, 'menu')}</span>
            ))}
            {COMPLIANCE.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-display text-[1.35rem] text-[var(--muted)] no-underline"
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
