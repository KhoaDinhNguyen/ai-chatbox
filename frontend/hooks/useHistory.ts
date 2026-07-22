import { create } from "zustand";
import { Chat } from "@/utils/app";

interface HistoryState {
  history: Chat[];
  answeringOutput: string;
  isLoading: boolean;
  addMessage: (message: Chat) => void;
  updateAnsweringOutput: (output: string) => void;
  setLoading: (b: boolean) => void;
}

export const useHistory = create<HistoryState>((set) => ({
  history: [],
  answeringOutput: "",
  isLoading: false,
  addMessage: (message: Chat) => {
    set(state => ({
      history: [...state.history, message]
    }));
  },
  updateAnsweringOutput: (output: string) => {
    set(state => ({
      answeringOutput: output,
    }))
  },
  setLoading: (b: boolean) => {
    set(state => ({
      isLoading: b
    }))
  }
}))