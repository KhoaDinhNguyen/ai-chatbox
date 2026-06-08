import type { Chat } from "@/types/app";
import Markdown from "react-markdown";
import "bootstrap-icons/font/bootstrap-icons.css";
import "animate.css";
import clsx from "clsx";

import styles from "./ChatComponent.module.css";

interface ChatProps {
  chat: Chat;
  ref?: React.Ref<HTMLDivElement>;
}

export default function ChatComponent(props: ChatProps) {
  const { chat, ref } = props;

  if (chat.role == "user") {
    return (
      <>
        <hr className={`border-1 border-top w-100 ${styles.seperateLine}`}></hr>
        <div className="d-flex gap-3 animate__animated animate__fadeInTopLeft animate__fast" ref={ref}>
          <div className="d-flex flex-column align-items-center">
            <i className="bi bi-person-circle fs-1" style={{ color: "#6c757d" }}></i>
            <p style={{ marginTop: "-5px", color: "#6c757d" }} className="fw-bold">
              User
            </p>
          </div>
          <div className={clsx("mt-3 text-break p-2 rounded", styles.chatContainer, styles.userChatContainer)}>
            <Markdown>{chat.text}</Markdown>
          </div>
        </div>
      </>
    );
  } else if (chat.role == "model") {
    if (chat.text == "")
      return (
        <div className="d-flex align-items-center gap-2">
          <div className="spinner-border" role="status" style={{ color: "var(--primary-color)" }}></div>
          <span style={{ color: "var(--primary-color)", fontWeight: "bold" }}>Finding answer...</span>
        </div>
      );

    return (
      <div className="d-flex gap-3">
        <div className="d-flex flex-column align-items-center">
          <i className="bi bi-robot fs-1" style={{ color: "var(--primary-color)" }}></i>
          <p style={{ marginTop: "-5px", color: "var(--primary-color)" }} className="fw-bold">
            AI
          </p>
        </div>
        <div className={clsx("mt-3 text-break p-2 rounded", styles.chatContainer, styles.aiChatContainer)}>
          <Markdown>{chat.text}</Markdown>
        </div>
      </div>
    );
  }
}
