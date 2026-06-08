"use client";
import { useEffect, useRef, useState } from "react";
import type { Chat } from "@/types/app";
import ChatComponent from "@/components/app/ChatComponent";

export default function Page() {
  const [history, setHistory] = useState<Chat[]>([
    {
      role: "model",
      text: "Hi, how can I help you?",
    },
  ]);

  const itemRefs = useRef(new Map());

  useEffect(() => {
    let lastUserPrompt = history.length - 1;

    while (lastUserPrompt >= 0 && history[lastUserPrompt].role == "model") lastUserPrompt--;

    if (lastUserPrompt != -1) {
      const targetElement = itemRefs.current.get(lastUserPrompt);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  }, []);

  const [complete, setComplete] = useState(true);
  const [output, setOutput] = useState("");
  const [prompt, setPrompt] = useState("");

  async function handleOnChangePrompt(event: React.ChangeEvent<HTMLInputElement>) {
    setPrompt((prev) => event.target.value);
  }

  // function scrollToBottom() {
  //   window.scrollTo({
  //     top: document.body.scrollHeight,
  //     behavior: "smooth",
  //   });
  // }
  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/chat`;
    const content = { prompt: prompt };

    try {
      setHistory((prev) => [...prev, { role: "user", text: prompt }]);
      setPrompt((prev) => "");
      setComplete((prev) => false);

      // scrollToBottom();

      const jsonResponse = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
      });

      const reader = jsonResponse.body?.getReader();

      if (!reader) return;

      const decoder = new TextDecoder();
      let accumulateOutput = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          setHistory((prev) => [...prev, { role: "model", text: accumulateOutput }]);
          setOutput((prev) => "");
          setComplete((prev) => true);
          break;
        }

        const chunk = decoder.decode(value, {
          stream: true,
        });

        accumulateOutput += chunk;
        setOutput((prev) => prev + chunk);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center pt-5 flex-grow-1"
      style={{ paddingBottom: "100px" }}>
      <div className="text-break d-flex flex-column align-items-start w-50">
        {history.map((chat, idx) => (
          <ChatComponent
            chat={chat}
            key={idx}
            ref={(node) => {
              if (node) itemRefs.current.set(idx, node);
              else itemRefs.current.delete(idx);
            }}
          />
        ))}
        {!complete && <ChatComponent chat={{ role: "model", text: output }} />}
      </div>
      <div className="w-50">
        {history.length == 1 && (
          <h1 className="text-center" style={{ color: "#00b4d8" }}>
            Welcome to KBot, ask anything
          </h1>
        )}
        <form
          onSubmit={handleSubmit}
          className={`${history.length == 1 ? "" : "fixed-bottom w-50"}`}
          style={history.length == 1 ? {} : { marginBottom: "20px", marginRight: "auto", marginLeft: "auto" }}>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control border-1"
              placeholder="Ask something"
              required
              value={prompt}
              onChange={handleOnChangePrompt}
              style={{ borderColor: "#00b4d8" }}></input>
            <button
              className="btn btn-light btn-lg"
              type="submit"
              id="sumbit-prompt"
              style={{ backgroundColor: "#00b4d8", borderColor: "#00b4d8" }}>
              <i className="bi bi-send-fill" style={{ color: "#fff" }}></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
