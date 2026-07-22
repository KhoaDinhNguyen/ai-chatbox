"use client";

import { Send } from "lucide-react";
import { useInputState } from "@/hooks/useInputState";
import { useHistory } from "@/hooks/useHistory";

export default function SubmitButton() {
  const { input } = useInputState();
  const { isLoading } = useHistory();

  return (
    <div className="flex items-center gap-1 shrink-0 mb-0.5">
      <button
        disabled={!input.trim() || isLoading}
        className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center hover:bg-primary/90 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm shadow-primary/20"
        type="submit">
        <Send size={14} className="text-primary-foreground" />
      </button>
    </div>
  );
}
