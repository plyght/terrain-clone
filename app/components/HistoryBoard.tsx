"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import LogoWordmark from "./LogoWordmark";
import Footer from "./Footer";
import boardData from "../history/board-data.json";

type Item = {
  id: string;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number | null;
  url: string;
  alt: string | null;
};

const ITEMS = boardData as Item[];

// recovered constants (desktop / mobile) from the source bundle
const BOARD = 6300;
const MAX_SCALE = 5;

export default function HistoryBoard() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const cam = useRef({ x: 0, y: 0, scale: 0.75 });
  const drag = useRef<{ active: boolean; px: number; py: number } | null>(null);
  const cfg = useRef({ M: 0.75, d: 0.2, c: 2500 });
  const [ready, setReady] = useState(false);

  const clamp = (x: number, y: number, scale: number) => {
    const vp = viewportRef.current;
    if (!vp) return { x, y, scale };
    const A = vp.clientWidth;
    const a = vp.clientHeight;
    const l = BOARD * scale;
    const n = BOARD * scale;
    return {
      x: l <= A ? (A - l) / 2 : Math.max(A - l, Math.min(x, 0)),
      y: n <= a ? (a - n) / 2 : Math.max(a - n, Math.min(y, 0)),
      scale,
    };
  };

  const apply = () => {
    const layer = layerRef.current;
    if (!layer) return;
    const { x, y, scale } = cam.current;
    layer.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
  };

  const center = () => {
    const vp = viewportRef.current;
    if (!vp) return;
    const { M, c } = cfg.current;
    cam.current = clamp((vp.clientWidth - BOARD * M) / 2, -(c * M), M);
    apply();
  };

  useEffect(() => {
    const mobile = window.innerWidth < 768;
    cfg.current = mobile
      ? { M: 0.375, d: 0.3, c: 2150 }
      : { M: 0.75, d: 0.2, c: 2500 };
    cam.current.scale = cfg.current.M;
    center();
    setReady(true);

    const vp = viewportRef.current;
    if (!vp) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const { d } = cfg.current;
      if (e.ctrlKey || e.metaKey) {
        const t = -(0.005 * e.deltaY);
        const A = Math.min(Math.max(cam.current.scale * (1 + t), d), MAX_SCALE);
        const rect = vp.getBoundingClientRect();
        const ex = e.clientX - rect.left;
        const ey = e.clientY - rect.top;
        const l = A / cam.current.scale;
        const nx = ex - (ex - cam.current.x) * l;
        const ny = ey - (ey - cam.current.y) * l;
        cam.current = clamp(nx, ny, A);
      } else {
        cam.current = clamp(
          cam.current.x - e.deltaX,
          cam.current.y - e.deltaY,
          cam.current.scale
        );
      }
      apply();
    };
    vp.addEventListener("wheel", onWheel, { passive: false });

    const onResize = () => center();
    window.addEventListener("resize", onResize);
    return () => {
      vp.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    drag.current = { active: true, px: e.clientX, py: e.clientY };
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current?.active) return;
    const dx = e.clientX - drag.current.px;
    const dy = e.clientY - drag.current.py;
    drag.current.px = e.clientX;
    drag.current.py = e.clientY;
    cam.current = clamp(
      cam.current.x + dx,
      cam.current.y + dy,
      cam.current.scale
    );
    apply();
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (drag.current) drag.current.active = false;
    (e.target as Element).releasePointerCapture?.(e.pointerId);
  };

  return (
    <div
      ref={viewportRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      className="relative w-full h-screen overflow-hidden cursor-grab active:cursor-grabbing touch-none bg-light-400"
    >
      <div
        ref={layerRef}
        style={{
          width: BOARD,
          height: BOARD,
          transformOrigin: "top left",
          opacity: ready ? 1 : 0,
          transition: "opacity 300ms ease",
        }}
        className="absolute top-0 left-0"
      >
        {ITEMS.map((it) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={it.id}
            src={it.url}
            alt={it.alt || ""}
            draggable={false}
            loading="lazy"
            style={{
              position: "absolute",
              left: it.x,
              top: it.y,
              width: it.width,
              height: it.height,
              zIndex: it.zIndex ?? 1,
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
            className="select-none pointer-events-none max-w-none"
          />
        ))}

        {/* center text block (content coords 3150, 2500) */}
        <div
          style={{ left: BOARD / 2, top: cfg.current.c, zIndex: 50 }}
          className="-translate-x-1/2 w-[630px] absolute flex flex-col items-center pointer-events-none"
        >
          <Link
            href="/"
            className="opacity-50 z-[3] relative w-[90vw] max-w-[260px] mx-auto h-auto text-dark-100 pointer-events-auto"
          >
            <div className="text-dark-500 w-[190px] mx-auto">
              <LogoWordmark />
            </div>
          </Link>

          <p className="font-mono uppercase tracking-[-0.01em] text-[16px] leading-none opacity-50 z-[3] relative mt-12 text-center">
            Hunt Valley · New York City
          </p>

          <div className="z-[3] relative mt-8 select-none text-left text-dark-500 w-full max-w-[450px]">
            <Image
              src="/horse.webp"
              alt="Horse"
              width={1000}
              height={1000}
              priority
              draggable={false}
              className="w-full h-auto"
            />
            <div className="mt-8 flex flex-col gap-[133px] items-center">
              <div className="font-sans flex flex-col gap-[36px] w-[630px]">
                <div className="font-sans text-justify text-[24px] leading-[40px] flex flex-col gap-[36px] text-wrap-pretty">
                  <p>
                    Terrain is a technology investment firm and creative partner
                    to founders.
                  </p>
                  <p>
                    We back founders who{" "}
                    <Link
                      href="/letter"
                      className="underline-offset-4 pointer-events-auto underline"
                    >
                      call their shot
                    </Link>
                    : those with magnetic visions for the future and the
                    fortitude to make them real.
                  </p>
                  <p>
                    We work with a small number of companies each year, investing
                    early and concentrating our time and capital as they grow.
                  </p>
                  <p>
                    We partner closely with founders to shape their story,
                    identity, and creative expression from the earliest stages
                    through scale. We believe the best companies are built with
                    pride and intentionality.
                  </p>
                  <p>
                    Launched in 2024, the Terrain partnership is led by{" "}
                    <Link
                      href="/history"
                      className="underline-offset-4 pointer-events-auto underline"
                    >
                      Eric Stromberg
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/history"
                      className="underline-offset-4 pointer-events-auto underline"
                    >
                      Willem Van Lancker
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="z-[3] relative w-full mt-[50px] tablet:mt-[--py-section]">
            <div className="z-50 relative max-tablet:pb-[40px] pointer-events-auto bg-transparent text-dark-500">
              <Footer />
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={center}
        className="select-none fixed bottom-0 left-1/2 -translate-x-1/2 z-[60] bg-dark-500 text-light-500 px-3 py-1.5 rounded-[8px] font-mono text-[12px] uppercase mb-4 hover:opacity-90 transition-opacity"
      >
        Back to Center
      </button>
    </div>
  );
}
