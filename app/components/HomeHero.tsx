"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import Button from "./Button";
import { useTheme } from "./ThemeProvider";

// exact preset from the source bundle (animation-presets chunk)
const GENTLE = [0.05, 0.5, 0.5, 0.75] as const;

const SHADOW_JOINED_BOX =
  "0.015725806451613308px 3.664112903225807px 1.5px rgba(0, 0, 0, 0.081),  0.035080645161291224px 8.173790322580645px 3.4px rgba(0, 0, 0, 0.12),  0.05927419354838862px 13.810887096774195px 5.6px rgba(0, 0, 0, 0.15),  0.08951612903226036px 20.85725806451613px 8.5px rgba(0, 0, 0, 0.174),  0.12883064516129364px 30.01754032258065px 12.3px rgba(0, 0, 0, 0.195),  0.1820564516129079px 42.41915322580646px 17.4px rgba(0, 0, 0, 0.216),  0.2582661290322647px 60.17600806451614px 24.6px rgba(0, 0, 0, 0.24),  0.3756048387096871px 87.51592741935485px 35.8px rgba(0, 0, 0, 0.27),  0.5782258064516277px 134.7266129032258px 55.1px rgba(0, 0, 0, 0.309),  1.0282258064516392px 239.57661290322582px 98px rgba(0, 0, 0, 0.39)";

export default function HomeHero() {
  const { isDark: dark, toggleTheme: toggle } = useTheme(); // W (shared theme)
  const [mounted, setMounted] = useState(false); // Y
  const [transitioning, setTransitioning] = useState(false); // F

  // mount
  useEffect(() => setMounted(true), []);

  // on mount + each theme change: pulse "transitioning" for 300ms (hides shadows)
  useEffect(() => {
    if (!mounted) return;
    setTransitioning(true);
    const t = setTimeout(() => setTransitioning(false), 300);
    return () => clearTimeout(t);
  }, [dark, mounted]);

  const napkinCls = mounted
    ? dark
      ? "opacity-0 duration-300"
      : "opacity-100 duration-300 delay-500"
    : "opacity-0";
  const rockCls = mounted
    ? dark
      ? "opacity-100 duration-300 delay-500"
      : "opacity-0 duration-300"
    : "opacity-0";
  const shadowJoinedCls = mounted
    ? transitioning
      ? "opacity-0"
      : dark
        ? "opacity-100 rotate-[-4.3deg] rounded-[78px_67px_84px_95px] h-[84%] duration-300 delay-300"
        : "opacity-0"
    : "opacity-0";
  const shadowNapkinCls = mounted
    ? transitioning
      ? "opacity-0"
      : dark
        ? "opacity-0 duration-300"
        : "opacity-100 duration-300 delay-300"
    : "opacity-0";

  return (
    <main
      className={`px-section flex justify-center items-center h-screen transition-colors duration-500 ${
        dark ? "bg-dark-500" : "bg-light-200"
      }`}
    >
      <div className="w-full max-w-[600px] flex flex-col">
        <div
          className="relative cursor-pointer mt-[25px] tablet:mt-[60px] mb-[53px] tablet:mb-[60px] overflow-visible"
          onClick={toggle}
        >
          <div className="relative flex items-center justify-center w-full h-[min(77vw,380px)] tablet:h-[394px] mx-auto overflow-visible">
            <Image
              src="/napkin.webp"
              alt="Logo"
              width={1000}
              height={1000}
              priority
              unoptimized
              className={`z-10 absolute w-full h-full object-contain transition-all ease-in-out transform-gpu ${napkinCls}`}
            />
            <Image
              src="/rock.webp"
              alt="Logo"
              width={1000}
              height={1000}
              priority
              unoptimized
              className={`z-10 absolute w-full h-full object-contain transition-all ease-in-out transform-gpu ${rockCls}`}
            />
            <div
              id="shadow-joined"
              className={`z-[9] absolute object-contain ease-in-out transition-opacity transform-gpu ${shadowJoinedCls}`}
              style={{
                width: "58%",
                marginTop: "5px",
                transform: "rotate(-4.3deg)",
                boxShadow: SHADOW_JOINED_BOX,
              }}
            />
            <div
              id="shadow-NAPKIN"
              className={`z-[9] absolute object-contain ease-in-out transform-gpu ${shadowNapkinCls}`}
              style={{
                position: "absolute",
                height: "97.5%",
                width: "auto",
                filter: "blur(5px)",
                marginLeft: "28.5px",
                marginTop: "3px",
              }}
            >
              <Image src="/shadow.png" alt="" width={1000} height={1000} priority className="w-full h-full" />
            </div>
          </div>
        </div>

        <motion.div
          key={dark ? "dark" : "light"}
          className="z-20 max-w-[310px] mx-auto flex flex-col items-center justify-center gap-[26px] tablet:gap-[32px]"
          initial={{ y: dark ? 10 : -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3, ease: GENTLE }}
        >
          <h1
            className={`flex-1 standard-type-body font-sans leading-[1.5] text-wrap-balance text-center ${
              dark ? "text-light-300" : "text-dark-500"
            }`}
          >
            Terrain is a technology investment firm and creative partner to
            founders.
          </h1>
          <div className="flex list-none items-center gap-2">
            <div className="inline-block">
              <Button
                href="/letter"
                className={dark ? "!bg-dark-400 !text-light-300" : "!bg-light-100"}
              >
                Call Your Shot
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
