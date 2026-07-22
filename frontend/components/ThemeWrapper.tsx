"use client";

import useTheme from "@/hooks/useTheme";
import { ReactNode, CSSProperties, useEffect } from "react";

export default function ThemeWrapper({ children }: { children: ReactNode }) {
  const { theme } = useTheme();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div
      className="size-full flex flex-col bg-background min-h-screen"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {children}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  rootContainer: {
    background: "var(--background)",
  },
};
