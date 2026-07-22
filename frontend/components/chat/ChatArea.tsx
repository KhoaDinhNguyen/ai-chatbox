"use client";

import { motion, AnimatePresence } from "motion/react";
import { useRef } from "react";
import EmptyState from "./EmptyChat";
import ChatUI from "./ChatUI";
import { useHistory } from "@/hooks/useHistory";
import { handleSubmit } from "@/utils/services";

export default function ChatArea() {
  const bottomRef = useRef<HTMLDivElement>(null);
  const { history, answeringOutput, isLoading } = useHistory();

  const intialState = history.length === 0 && answeringOutput === "" && !isLoading;

  return (
    <div
      className="flex-1 overflow-y-auto px-4 py-4 scroll-smooth"
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "transparent transparent",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.scrollbarColor = "var(--color-border) transparent";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.scrollbarColor = "transparent transparent";
      }}>
      <div className="max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          {intialState ? (
            <div key="empty" className="h-full min-h-[60vh] flex items-center justify-center">
              <EmptyState onSuggestion={(s) => handleSubmit(s)} />
            </div>
          ) : (
            <motion.div key="messages" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {history.map((msg, index) => (
                <ChatUI chat={msg} key={index} />
              ))}
              {isLoading && <ChatUI chat={{ role: "model", text: answeringOutput }} />}
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
