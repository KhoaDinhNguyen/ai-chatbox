import { create } from "zustand";
import { Chat } from "@/utils/app";

interface HistoryState {
  history: Chat[];
  answeringOutput: string;
  isLoading: boolean;
  interactionId: string;
  addMessage: (message: Chat) => void;
  updateAnsweringOutput: (output: string) => void;
  setLoading: (b: boolean) => void;
  setInteractionId: (str: string) => void;
  resetHistory: () => void;
}

export const useHistory = create<HistoryState>((set) => ({
  history: [],
  answeringOutput: "",
  isLoading: false,
  interactionId: "",
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
  },
  setInteractionId: (str: string) => {
    set(state => ({
      interactionId: str
    }))
  },
  resetHistory: () => {
    set(state => ({
      interactionId: "",
      answeringOutput: "",
      isLoading: false,
      history: []
    }))
  }
}))