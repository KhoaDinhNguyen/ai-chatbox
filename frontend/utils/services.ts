import { useHistory } from "@/hooks/useHistory";

export async function handleSubmit(content: string) {
  const { addMessage, setLoading, updateAnsweringOutput, interactionId, setInteractionId } = useHistory.getState();
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/chat`;

  if (!content) return;
  try {
    /** Add new user messages to the history, indicate loaders, and clear the input  */
    addMessage({ role: "user", text: content });
    setLoading(true);

    const body: any = { prompt: content };

    if (interactionId) {
      body["interaction_id"] = interactionId;
    }

    console.log(body);
    const jsonResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const reader = jsonResponse.body?.getReader();

    if (!reader) return;

    const decoder = new TextDecoder();
    let buffer = "";
    let accumulateOutput = "";

    while (true) {
      const { done, value } = await reader.read();

      /** Once the text is fully dilivered, add it to the history and clear progress output */
      if (done) {
        addMessage({ role: "model", text: accumulateOutput });
        updateAnsweringOutput("");
        setLoading(false);
        break;
      }

      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        if (!line.trim()) continue;

        const message = JSON.parse(line);

        switch (message.type) {
          case "stream":
            accumulateOutput += message.text;
            updateAnsweringOutput(accumulateOutput);
            break;

          case "done":
            // setInteractionId(message.interactionId);
            setInteractionId(message.interactionId);
            break;
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
}