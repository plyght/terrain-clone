"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HomeIcon from "./nav-icons/home";
import LetterIcon from "./nav-icons/letter";
import InvestmentsIcon from "./nav-icons/investments";
import ProductionsIcon from "./nav-icons/productions";
import NewsIcon from "./nav-icons/news";
import HistoryIcon from "./nav-icons/history";

const ITEMS = [
  { href: "/", label: "Home", Icon: HomeIcon },
  { href: "/letter", label: "Letter", Icon: LetterIcon },
  { href: "/investments", label: "Investments", Icon: InvestmentsIcon },
  { href: "/productions", label: "Productions", Icon: ProductionsIcon },
  { href: "/news", label: "News", Icon: NewsIcon },
  { href: "/history", label: "History", Icon: HistoryIcon },
] as const;

type Item = (typeof ITEMS)[number];

// cn helper (mirrors the source's className join)
const cn = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

function NavLinks({
  isHome,
  activeHref,
  hovered,
  setHovered,
  near,
  isMobile,
  onNavigate,
}: {
  isHome: boolean;
  activeHref: string | null;
  hovered: string | null;
  setHovered: (h: string | null) => void;
  near: boolean;
  isMobile?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <>
      {ITEMS.map((item: Item) => {
        const t = hovered === item.href; // this item hovered
        const h = activeHref === item.href; // this item active
        const p = hovered != null && hovered !== item.href; // another item hovered

        // icon opacity
        const b = near ? (t || h ? 1 : 0.2) : h ? 1 : 0.2;
        // label opacity
        const v = near ? (t ? 1 : h && !p ? 1 : 0.2) : 0;

        // background class (light mode; isHome picks the ramp)
        const x = h
          ? isHome
            ? "lg:bg-light-100 lg:hover:bg-light-100/75"
            : "lg:bg-light-200 lg:hover:bg-light-200/75"
          : t
            ? isHome
              ? "lg:bg-light-100/75"
              : "lg:bg-light-200/75"
            : isHome
              ? "lg:hover:bg-light-100/75"
              : "lg:hover:bg-light-200/75";
        const f = h || t ? cn("bg-light-100", x) : x;

        const { Icon } = item;
        return (
          <Link
            key={item.href}
            data-id={item.href}
            href={item.href}
            target="_self"
            rel="noopener noreferrer"
            onMouseEnter={() => setHovered(item.href)}
            onClick={() => onNavigate?.()}
            className={cn(
              "select-none px-2 h-[40px] inline-flex flex-row items-center justify-start",
              f,
              isMobile && "gap-3 w-full",
              "rounded-[7px]"
            )}
          >
            <div
              className={cn(
                "z-10 relative size-[24px] flex items-center justify-center override-child-path-fill override-child-path-stroke",
                "[&>svg]:h-auto",
                "text-dark-500",
                "max-lg:!opacity-100"
              )}
              style={{ opacity: b, transition: "opacity 150ms ease" }}
            >
              <Icon />
            </div>
            {isMobile ? (
              <span className="z-20 relative font-mono text-[12px] leading-none uppercase whitespace-nowrap max-lg:!opacity-100 text-dark-500">
                {item.label}
              </span>
            ) : (
              <div
                className={cn(
                  "max-tablet:!opacity-100 absolute left-0 w-full h-[40px] pl-[10px] translate-x-[calc(var(--nav-width)-4px)] flex-1 z-10 text-left font-mono text-[12px] leading-none uppercase flex items-center",
                  "text-dark-500",
                  t ? "" : "max-ultrawide:pointer-events-none"
                )}
                style={{ minWidth: 160, opacity: v, transition: "opacity 150ms ease" }}
              >
                {item.label}
              </div>
            )}
          </Link>
        );
      })}
    </>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const activeHref =
    ITEMS.find((i) => i.href === pathname)?.href ?? null;

  const [near, setNear] = useState(false); // userHasHoveredNear (items container)
  const [hovered, setHovered] = useState<string | null>(null); // hoveredLink
  const [menuOpen, setMenuOpen] = useState(false); // mobile
  const [asideHovered, setAsideHovered] = useState(false); // C: aside hovered
  const [past2s, setPast2s] = useState(false); // O: 2s after mount

  const asideRef = useRef<HTMLElement>(null);

  const onEnter = useCallback(() => setNear(true), []);
  const onLeave = useCallback(() => {
    setHovered(null);
    setNear(false);
  }, []);

  // O: the nav stays fully visible for 2s after load, then (on home) auto-hides
  useEffect(() => {
    const t = setTimeout(() => setPast2s(true), 2000);
    return () => clearTimeout(t);
  }, []);

  // aside opacity (from source): visible 2s after load, then auto-hides on the
  // home page only until the mouse approaches the left edge (C).
  const opacityClass = past2s
    ? asideHovered
      ? "opacity-100"
      : isHome
        ? "opacity-0 delay-1000"
        : "opacity-100"
    : "opacity-100";

  // close mobile menu on outside mousedown
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const nav = document.querySelector("nav");
      if (nav && !nav.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const menuBg = isHome
    ? "bg-[--home-light-nav-with-opacity-75-correction]"
    : "bg-[--global-light-nav-with-opacity-75-correction]";

  return (
    <aside
      ref={asideRef}
      onMouseEnter={() => setAsideHovered(true)}
      onMouseLeave={() => setAsideHovered(false)}
      className={cn(
        "[--nav-width:48px] z-[99] fixed top-4 h-auto tablet:h-screen left-0 flex items-center justify-center pl-4",
        "transition-opacity duration-300 max-tablet:!opacity-100",
        opacityClass
      )}
    >
      <nav className="z-[51] relative rounded-[7px]">
        <div className="flex flex-col w-full">
          {/* mobile hamburger + dropdown */}
          <div className="tablet:hidden rounded-[7.5px] overflow-hidden">
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Open menu"
              className="backdrop-blur-sm select-none p-1 size-[42px] inline-flex items-center justify-center text-dark-500"
            >
              <svg width="32" height="28" viewBox="0 0 32 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="backdrop-blur-sm pointer-events-none text-dark-500">
                <g style={{ transformOrigin: "center", transform: menuOpen ? "rotate(45deg)" : "none", transition: "all 300ms cubic-bezier(0.05,0.2,0.4,0.85)" }}>
                  <path d="M9 10H23" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" style={{ transform: menuOpen ? "translateY(4px)" : "none", transition: "transform 0.3s cubic-bezier(0.05,0.2,0.4,0.85)" }} />
                </g>
                <path d="M9 14H23" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: menuOpen ? 0 : 1, transition: "opacity 150ms cubic-bezier(0.05,0.2,0.4,0.85)" }} />
                <g style={{ transformOrigin: "center", transform: menuOpen ? "rotate(-45deg)" : "none", transition: "all 300ms cubic-bezier(0.05,0.2,0.4,0.85)" }}>
                  <path d="M9 18H23" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" style={{ transform: menuOpen ? "translateY(-4px)" : "none", transition: "transform 300ms cubic-bezier(0.05,0.2,0.4,0.85)" }} />
                </g>
              </svg>
            </button>

            <div
              className={cn(
                "backdrop-blur-sm absolute top-[62px] left-0 rounded-lg",
                menuBg,
                !menuOpen && "pointer-events-none"
              )}
              style={{
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(-20px)",
                transition: "opacity 350ms cubic-bezier(0.22,1,0.36,1), transform 350ms cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              <div className="p-1">
                <NavLinks
                  isHome={isHome}
                  activeHref={activeHref}
                  hovered={hovered}
                  setHovered={setHovered}
                  near
                  isMobile
                  onNavigate={() => setMenuOpen(false)}
                />
              </div>
            </div>
          </div>

          {/* desktop rail */}
          <div
            className="hidden tablet:flex flex-col p-[3px]"
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
          >
            <NavLinks
              isHome={isHome}
              activeHref={activeHref}
              hovered={hovered}
              setHovered={setHovered}
              near={near}
            />
          </div>
        </div>
      </nav>
    </aside>
  );
}
