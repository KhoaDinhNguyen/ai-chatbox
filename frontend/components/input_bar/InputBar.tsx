import TextArea from "./TextArea";
import SubmitButton from "./SubmitButton";
import { useInputState } from "@/hooks/useInputState";
import { handleSubmit } from "@/utils/services";

export default function InputBar() {
  const { input, onChangeInput } = useInputState();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(input);
        onChangeInput("");
      }}
      className="shrink-0 border-t border-border bg-card/80 backdrop-blur-sm px-4 py-3">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-end gap-2 bg-input-background border border-border rounded-2xl px-3 py-2 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20 transition-all duration-150">
          <TextArea />

          <SubmitButton />
        </div>

        {/** Display warning that KBot is just an AI, can make mistake */}
        <p className="text-center text-xs text-muted-foreground mt-2">
          KBot can make mistakes. Consider checking important information.
        </p>
      </div>
    </form>
  );
}
