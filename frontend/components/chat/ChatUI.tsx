import type { Chat } from "@/utils/app";
import Markdown from "react-markdown";
import { motion } from "motion/react";
import { Bot, UserRound } from "lucide-react";
import remakeGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";

export default function ChatUI({ chat }: { chat: Chat }) {
  const { role, text } = chat;
  const isUser = role === "user";

  return isUser ? <UserMessage text={text} /> : <AIMessage text={text} />;
}

function AIMessage({ text }: { text: string }) {
  if (text === "") return <Loading />;

  return (
    <motion.div
      initial={{ opacity: 0, x: -16, y: 8 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex items-end gap-2 mb-4">
      <div className="shrink-0 w-8 h-8 rounded-full bg-card flex items-center justify-center shadow-sm">
        <Bot size={15} className="text-card-foreground" />
      </div>
      <div className="max-w-[90%]">
        <div className="bg-card border border-border rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
          <div className="text-card-foreground text-base leading-relaxed wrap-break-word">
            <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-border prose-code:before:content-none prose-code:after:content-none break-words">
              <ReactMarkDown>{text}</ReactMarkDown>
            </div>
          </div>
        </div>
        {/* <p className="text-muted-foreground text-xs mt-1 ml-1">{formatTime(message.timestamp)}</p> */}
      </div>
    </motion.div>
  );
}

function UserMessage({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 16, y: 8 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex items-end gap-2 mb-4 flex-row-reverse">
      <div className="shrink-0 w-8 h-8 rounded-full bg-primary dark:bg-[#004e66] flex items-center justify-center shadow-sm">
        <UserRound size={15} className="text-primary-foreground" />
      </div>
      <div className="max-w-[90%]">
        <div className="bg-primary dark:bg-[#004e66] rounded-2xl rounded-br-sm px-4 py-3 shadow-sm">
          <div className="text-primary-foreground text-base leading-relaxed">
            <ReactMarkDown>{text}</ReactMarkDown>
          </div>
        </div>
        {/* <p className="text-muted-foreground text-xs mt-1 mr-1 text-right">{formatTime(message.timestamp)}</p> */}
      </div>
    </motion.div>
  );
}

function Loading() {
  return (
    <div className="flex items-end gap-2 mb-4">
      <div className="shrink-0 w-8 h-8 rounded-full bg-card flex items-center justify-center shadow-sm">
        <Bot size={15} className="text-card-foreground" />
      </div>
      <div className="bg-card border border-border rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
        <div className="flex gap-1 items-center h-5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-2 h-2 rounded-full bg-card-foreground"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ReactMarkDown({ children }: { children: string }) {
  return (
    <Markdown remarkPlugins={[remakeGfm]} rehypePlugins={[rehypeSanitize]}>
      {children}
    </Markdown>
  );
}
