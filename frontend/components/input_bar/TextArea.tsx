"use client";

import { useHistory } from "@/hooks/useHistory";
import { useInputState } from "@/hooks/useInputState";
import { useRef } from "react";

export default function TextArea() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { input, onChangeInput } = useInputState();
  const { isLoading } = useHistory();

  const autoResize = () => {
    const element = textareaRef.current;

    if (!element) return;

    element.style.height = "auto";
    element.style.height = Math.min(element.scrollHeight, 140) + "px";
  };

  return (
    <textarea
      ref={textareaRef}
      value={input}
      placeholder="Ask KBot anything…"
      rows={1}
      name="prompt"
      onChange={(e) => {
        onChangeInput(e.target.value);
        autoResize();
      }}
      disabled={isLoading}
      className="flex-1 bg-transparent resize-none outline-none text-sm text-foreground placeholder:text-muted-foreground leading-relaxed py-1 min-h-[28px] max-h-[140px] disabled:opacity-50"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    />
  );
}
