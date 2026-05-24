"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { Arrow } from "@/components/icons/Arrow";

interface HomeButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
  arrow?: boolean;
}

export default function HomeButton({
  href,
  children,
  className = "",
  arrow = true,
}: HomeButtonProps) {
  return (
    <Link
      href={href}
      className={`
        inline-flex items-center justify-center
        px-8 py-3
        rounded-full
        border border-text3
        text-text3
        transition-all duration-300
        hover:text-text
        hover:border-text
        gap-3
        ${className}
      `}
    >
      <span className="whitespace-nowrap">{children}</span>

      {arrow && (
        <div className="animate-[bounceX_2.5s_infinite]">
          <Arrow width={25} height={25} angle={90} />
        </div>
      )}
    </Link>
  );
}