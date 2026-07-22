import { motion } from "motion/react";
import { Bot } from "lucide-react";

export default function EmptyState({ onSuggestion }: { onSuggestion: (text: string) => void }) {
  const suggestions = [
    "What can you help me with?",
    "Explain a complex topic simply",
    "Help me write something",
    "Analyze this for me",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center h-full gap-8 px-6">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
          <Bot size={32} className="text-primary-foreground" />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground tracking-tight">
            Hello, I'm <span className="text-primary">KBot</span>
          </h2>
          <p className="text-muted-foreground text-sm mt-1">Your intelligent assistant. How can I help you today?</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 w-full max-w-md">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => onSuggestion(s)}
            className="text-left px-4 py-3 rounded-xl border border-border bg-card text-card-foreground text-sm hover:border-primary/40 hover:bg-secondary transition-all duration-150 leading-snug">
            {s}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
