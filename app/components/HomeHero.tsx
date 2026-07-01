"use client";

import { useEffect, useState } from "react";
import Button from "./Button";

export default function HomeHero() {
  const [mounted, setMounted] = useState(false);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <main className="px-section flex justify-center items-center h-screen bg-light-200">
      <div className="w-full max-w-[600px] flex flex-col">
        <div
          className="relative cursor-pointer mt-[25px] tablet:mt-[60px] mb-[53px] tablet:mb-[60px] overflow-visible"
          onClick={() => setFlipped((v) => !v)}
          onMouseEnter={() => setFlipped(true)}
          onMouseLeave={() => setFlipped(false)}
        >
          <div className="relative flex items-center justify-center w-full h-[min(77vw,380px)] tablet:h-[394px] mx-auto overflow-visible">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Napkin"
              width={1000}
              height={1000}
              decoding="async"
              className={`z-10 absolute w-full h-full object-contain transition-all duration-500 ease-in-out transform-gpu ${
                mounted && !flipped ? "opacity-100" : "opacity-0"
              }`}
              style={{ color: "transparent" }}
              src="/napkin.webp"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Rock"
              width={1000}
              height={1000}
              decoding="async"
              className={`z-10 absolute w-full h-full object-contain transition-all duration-500 ease-in-out transform-gpu ${
                mounted && flipped ? "opacity-100" : "opacity-0"
              }`}
              style={{ color: "transparent" }}
              src="/rock.webp"
            />
            <div
              id="shadow-joined"
              className={`z-[9] absolute object-contain ease-in-out transition-opacity duration-500 transform-gpu ${
                mounted ? "opacity-100" : "opacity-0"
              }`}
              style={{
                width: "58%",
                marginTop: "5px",
                transform: "rotate(-4.3deg)",
                boxShadow:
                  "0.015725806451613308px 3.664112903225807px 1.5px rgba(0,0,0,0.081), 0.035080645161291224px 8.173790322580645px 3.4px rgba(0,0,0,0.12), 0.05927419354838862px 13.810887096774195px 5.6px rgba(0,0,0,0.15), 0.08951612903226036px 20.85725806451613px 8.5px rgba(0,0,0,0.174), 0.12883064516129364px 30.01754032258065px 12.3px rgba(0,0,0,0.195), 0.1820564516129079px 42.41915322580646px 17.4px rgba(0,0,0,0.216), 0.2582661290322647px 60.17600806451614px 24.6px rgba(0,0,0,0.24), 0.3756048387096871px 87.51592741935485px 35.8px rgba(0,0,0,0.27), 0.5782258064516277px 134.7266129032258px 55.1px rgba(0,0,0,0.309), 1.0282258064516392px 239.57661290322582px 98px rgba(0,0,0,0.39)",
              }}
            />
          </div>
        </div>

        <div
          className="z-20 max-w-[310px] mx-auto flex flex-col items-center justify-center gap-[26px] tablet:gap-[32px] transition-all duration-500"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(-10px)",
          }}
        >
          <h1 className="flex-1 standard-type-body font-sans leading-[1.5] text-center text-dark-500">
            Terrain is a technology investment firm and creative partner to
            founders.
          </h1>
          <div className="flex list-none items-center gap-2">
            <div className="inline-block">
              <Button href="/letter">Call Your Shot</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
