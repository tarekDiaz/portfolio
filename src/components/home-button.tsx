"use client";

import Link from "next/link";
import { ReactNode, useState } from "react";
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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        inline-flex items-center justify-center
        px-8 py-3
        rounded-full
        border border-text3
        text-text3 max-md:text-text
        transition-all duration-300
        hover:border-text
        gap-3
        project-card
        ${className}
      `}
    >
      <span className="whitespace-nowrap project-title">{children}</span>

      {arrow && (
        <div className="animate-[bounceX_2.5s_infinite]">
          <Arrow width={25} height={25} angle={90} gradient={isHovered} />
        </div>
      )}
    </Link>
  );
}