// chatStore.js - Global state using Zustand

import { create } from 'zustand';

export const useChatStore = create((set) => ({
  messages: [],
  goal: '',
  
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  setGoal: (goal) => set({ goal }),

  reset: () => set({ messages: [], goal: '' }),
}));