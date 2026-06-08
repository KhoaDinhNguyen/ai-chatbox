"use client";

import useTheme from "@/hooks/useTheme";
import { ReactNode, CSSProperties } from "react";

export default function ThemeWrapper({ children }: { children: ReactNode }) {
  const { theme } = useTheme();

  return (
    <div className={`d-flex flex-column min-vh-100 ${theme}`} style={styles.rootContainer}>
      {children}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  rootContainer: {
    background: "var(--background)",
  },
};
