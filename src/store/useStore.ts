// stores/useStore.ts
import { create } from "zustand";

type StoreState = {
  focusDuration: number;
  breakDuration: number;
  longBreakDuration: number;
  longBreakInterval: number;

  setFocusDuration: (time: number) => void;
  setBreakDuration: (time: number) => void;
  setLongBreakDuration: (time: number) => void;
  setLongBreakInterval: (time: number) => void;

  isOpenConfigModal: boolean;
  toggleOpenConfigModal: () => void;
};

export const useStore = create<StoreState>((set) => ({
  focusDuration: 60 * 25,
  setFocusDuration: (n: number) => set(() => ({ focusDuration: n })),

  breakDuration: 60 * 5,
  setBreakDuration: (n: number) => set(() => ({ breakDuration: n })),

  longBreakDuration: 60 * 5,
  setLongBreakDuration: (n: number) => set(() => ({ longBreakDuration: n })),

  longBreakInterval: 60 * 5,
  setLongBreakInterval: (n: number) => set(() => ({ longBreakInterval: n })),

  isOpenConfigModal: false,
  toggleOpenConfigModal: () =>
    set((state) => ({ isOpenConfigModal: !state.isOpenConfigModal })),
}));
