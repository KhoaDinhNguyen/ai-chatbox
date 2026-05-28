import type { Chat } from "@/types/app";
import Markdown from "react-markdown";
import "bootstrap-icons/font/bootstrap-icons.css";
import "animate.css";

import styles from "./ChatComponent.module.css";

interface ChatProps {
  chat: Chat;
}

export default function ChatComponent(props: ChatProps) {
  const { chat } = props;

  if (chat.role == "user") {
    return (
      <>
        <hr className="bordr-2 border-top w-100 border-black"></hr>
        <div className="d-flex gap-3 animate__animated animate__fadeInTopLeft animate__fast">
          <div className="d-flex flex-column align-items-center">
            <i className="bi bi-person-circle fs-1" style={{ color: "#6c757d" }}></i>
            <p style={{ marginTop: "-5px", color: "#6c757d" }} className="fw-bold">
              User
            </p>
          </div>
          <div
            className={`mt-3 text-break ${styles["chat-text-container"]} p-2 rounded`}
            style={{ backgroundColor: "#dee2e6", height: "max-content" }}>
            <Markdown>{chat.text}</Markdown>
          </div>
        </div>
      </>
    );
  } else if (chat.role == "model") {
    if (chat.text == "")
      return (
        <div className="d-flex align-items-center gap-2">
          <div className="spinner-border" role="status" style={{ color: "#00b4d8" }}></div>
          <span style={{ color: "#00b4d8", fontWeight: "bold" }}>Finding answer...</span>
        </div>
      );

    return (
      <div className="d-flex gap-3">
        <div className="d-flex flex-column align-items-center">
          <i className="bi bi-robot fs-1" style={{ color: "#00b4d8" }}></i>
          <p style={{ marginTop: "-5px", color: "#00b4d8" }} className="fw-bold">
            AI
          </p>
        </div>
        <div
          className={`mt-3 text-break ${styles["chat-text-container"]} p-2 rounded`}
          style={{ backgroundColor: "#caf0f8", height: "max-content" }}>
          <Markdown>{chat.text}</Markdown>
        </div>
      </div>
    );
  }
}
