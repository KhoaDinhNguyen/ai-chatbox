"use client";
import { useState } from "react";
import type { Chat } from "@/types/app";
import ChatComponent from "@/components/app/ChatComponent";

export default function Page() {
  // const history = await getChatHistory();
  const [history, setHistory] = useState<Chat[]>([
    {
      role: "model",
      text: "Hi, how can I help you?",
    },
  ]);

  const [complete, setComplete] = useState(true);
  const [output, setOutput] = useState("");
  const [prompt, setPrompt] = useState("");

  async function handleOnChangePrompt(event: React.ChangeEvent<HTMLInputElement>) {
    setPrompt((prev) => event.target.value);
  }

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/chat`;
    const content = { prompt: prompt };

    try {
      setHistory((prev) => [...prev, { role: "user", text: prompt }]);
      setPrompt((prev) => "");
      setComplete((prev) => false);

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
    <main className="d-flex flex-column justify-content-center align-items-center min-vh-100 pt-5">
      <div className="text-break d-flex flex-column align-items-start w-50">
        {history.map((chat, idx) => (
          <ChatComponent chat={chat} key={idx} />
        ))}
        {!complete && <ChatComponent chat={{ role: "model", text: output }} />}
      </div>
      <div>
        <h1>Welcome to KBot, ask anything</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Ask something"
              required
              value={prompt}
              onChange={handleOnChangePrompt}></input>
            <button className="btn btn-outline-secondary" type="submit" id="sumbit-prompt">
              Ask
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
