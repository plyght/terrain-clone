"use client";

import { useEffect, useState } from "react";

/**
 * From source: the byline card starts angled (tablet:rotate-[3deg]) on load and
 * settles to straight (rotate-0) after 1000ms, animated by transition-transform
 * duration-300. It still rotates on hover via the group-hover class in className.
 */
export default function SettleRotate({
  className = "",
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const [settled, setSettled] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setSettled(true), 1000);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className={`${className} ${settled ? "rotate-0" : "tablet:rotate-[3deg]"}`}>
      {children}
    </div>
  );
}
