import Link from "next/link";

export default function Button({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const external = /^https?:/.test(href);
  const cls = `group group/button text-[12px] select-none tracking-body whitespace-nowrap uppercase font-mono leading-none text-dark-500 w-auto [&_span]:!font-sans [&_span]:!normal-case [&_span]:!select-none [&_span]:!whitespace-nowrap [&_span]:!text-[16px] [&_span]:!mt-[3px] min-w-[220px] overflow-hidden cursor-pointer relative flex items-center justify-between gap-6 rounded-[10px] px-[16px] py-[10px] bg-light-100 hover:bg-light-200 transition-colors ${className}`;
  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      <svg
        width="13"
        height="12"
        viewBox="0 0 13 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="pointer-events-none w-3.5 md:w-4 text-inherit shrink-0 transition-transform group-hover/button:translate-x-1"
      >
        <path d="M13 6L0 12L3.31373 6L4.24572e-07 0L13 6Z" fill="currentColor" />
      </svg>
    </>
  );
  if (external) {
    return (
      <a className={cls} href={href} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  return (
    <Link className={cls} href={href}>
      {inner}
    </Link>
  );
}
