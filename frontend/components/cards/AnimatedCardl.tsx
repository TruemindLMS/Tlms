"use client";

import { useEffect, useRef, ReactNode } from "react";

type Direction = "left" | "right" | "up" | "down";

type Props = {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
};

export default function ScrollAnimatel({
  children,
  delay = 0,
  direction = "left",
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const hiddenClass = {
      left: "-translate-x-6",
      right: "translate-x-6",
      up: "-translate-y-6",
      down: "translate-y-6",
    }[direction];

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove("opacity-0", hiddenClass);
          el.classList.add("opacity-100", "translate-x-0", "translate-y-0");
        } else {
          el.classList.remove("opacity-100", "translate-x-0", "translate-y-0");
          el.classList.add("opacity-0", hiddenClass);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [direction]);

  const initialClass = {
    left: "-translate-x-6",
    right: "translate-x-6",
    up: "-translate-y-6",
    down: "translate-y-6",
  }[direction];

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`opacity-0 ${initialClass} transition-all duration-500 ease-out `}
    >
      {children}
    </div>
  );
}