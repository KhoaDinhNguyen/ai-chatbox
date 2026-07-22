"use client";

import useTheme from "../hooks/useTheme";
import { Bot, RotateCcw, Moon, Sun } from "lucide-react";
import { motion } from "motion/react";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-5 py-3 border-b border-border bg-card/80 backdrop-blur-sm shrink-0">
      <BrandLogo />

      <div className="flex items-center gap-2">
        <NewChatButton visible={false} />

        <ThemeToggleButton />
      </div>
    </header>
  );
}

function BrandLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-sm shadow-primary/30">
        <Bot size={16} className="text-primary-foreground" />
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="font-bold text-lg tracking-tight text-foreground">KBot</span>
        <span className="text-xs text-primary font-medium px-1.5 py-0.5 rounded-full bg-primary/10">AI</span>
      </div>
    </div>
  );
}

function NewChatButton({ visible }: { visible: boolean }) {
  if (!visible) return <></>;

  return (
    <button
      // onClick={reset}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-muted-foreground
                hover:text-foreground hover:bg-secondary transition-all duration-150 border border-border">
      <RotateCcw size={12} />
      New chat
    </button>
  );
}

function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  const dark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative w-12 h-6 rounded-full border border-border bg-secondary transition-colors duration-200 flex items-center">
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute w-5 h-5 rounded-full bg-primary shadow-sm flex items-center justify-center"
        style={{ left: dark ? "calc(100% - 22px)" : "2px" }}>
        {dark ? (
          <Moon size={10} className="text-primary-foreground" />
        ) : (
          <Sun size={10} className="text-primary-foreground" />
        )}
      </motion.div>
    </button>
  );
}
