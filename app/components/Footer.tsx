import Link from "next/link";
import FooterFlag from "./FooterSvg0";
import FooterOrnament from "./FooterSvg1";
import FooterArrow from "./FooterSvg2";

export default function Footer({ className = "" }: { className?: string }) {
  return (
    <footer
      className={`w-full py-6 pb-[50px] pt-[50px] border-t flex flex-col tablet:flex-row max-tablet:gap-[24px] tablet:max-w-[min(85vw,846px)] mx-auto border-light-200 ${className}`}
    >
      {/* left */}
      <div className="shrink max-tablet:text-center tablet:max-w-[194px] tablet:mr-auto w-full col-span-1 flex flex-col gap-[12px] tablet:gap-[32px] uppercase standard-type-mono-sm text-wrap-balance">
        <p>Terrain is an early-stage investment firm.</p>
        <p>
          Based in the USA{" "}
          <span className="inline-block align-middle mx-[2px] mb-[2px] [&>svg]:inline [&>svg]:w-[15px] [&>svg]:h-[9px]">
            <FooterFlag />
          </span>{" "}
          &amp; worldwide online.
        </p>
      </div>

      {/* center */}
      <div className="grow max-tablet:text-center tablet:max-w-[458px] tablet:px-[44px] max-tablet:max-w-[300px] mx-auto w-full col-span-1 flex flex-col items-center gap-[24px] tablet:gap-[66px] uppercase standard-type-mono-sm text-wrap-balance">
        <FooterOrnament className="w-[88px] h-auto text-dark-500" />
        <div className="flex flex-col text-center justify-center items-center w-full uppercase">
          <p className="mb-[14px]">Terrain Capital Management LLC</p>
          <p className="opacity-20 mb-[6px]">
            ©<span>2026</span>
            <span className="opacity-70 mx-2">·</span>All Rights Reserved
          </p>
          <div className="flex flex-row justify-between gap-2 opacity-20 pointer-events-auto">
            <Link href="/" target="_self" rel="noreferrer" className="standard-type-mono-sm uppercase">
              Terms
            </Link>
            <span className="opacity-70">·</span>
            <Link href="/" target="_self" rel="noreferrer" className="standard-type-mono-sm uppercase">
              Privacy
            </Link>
          </div>
        </div>
      </div>

      {/* right */}
      <div className="max-tablet:text-center max-tablet:items-center tablet:max-w-[194px] tablet:ml-auto max-tablet:max-w-[300px] max-tablet:mx-auto w-full col-span-1 flex flex-col items-end gap-[24px] tablet:gap-[32px]">
        <div className="relative">
          <div className="w-full h-[40px] min-w-[194px]">
            <div className="inline-block w-full">
              <a
                href="https://terrain.com"
                className="group overflow-hidden cursor-pointer relative flex items-center justify-between gap-6 rounded-[10px] text-[12px] select-none tracking-body whitespace-nowrap uppercase font-mono leading-none w-full h-[40px] py-[14px] px-[12px] bg-white text-[rgba(0,0,0,.5)] hover:text-dark-500 transition-colors pointer-events-auto"
              >
                <span className="relative z-10">Get Updates</span>
                <FooterArrow className="pointer-events-none w-3.5 shrink-0 text-inherit" />
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center tablet:justify-end items-center w-full max-w-[194px] gap-2 pointer-events-auto">
          <a href="https://x.com/terraincap" target="_blank" rel="noreferrer" className="standard-type-mono-sm uppercase">
            X
          </a>
          <span className="opacity-70 mb-[2px] leading-none">·</span>
          <a
            href="https://www.linkedin.com/company/terraincap/"
            target="_blank"
            rel="noreferrer"
            className="standard-type-mono-sm uppercase"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
