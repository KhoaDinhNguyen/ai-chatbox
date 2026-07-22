import { create } from "zustand";

interface InputState {
  input: string,
  onChangeInput: (s: string) => void
}

export const useInputState = create<InputState>((set) => ({
  input: "",
  onChangeInput(s: string) {
    set(state => ({
      ...state,
      input: s,
    }))
  }
}))