import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TimerMode = "focus" | "shortBreak" | "longBreak";

interface PomodoroState {
  mode: TimerMode;
  timeLeft: number;
  isRunning: boolean;
  focusDuration: number; // in seconds
  shortBreakDuration: number;
  longBreakDuration: number;
  sessionsCompleted: number;
  focusMode: boolean; // UI lock mode

  setMode: (mode: TimerMode) => void;
  setTimeLeft: (time: number) => void;
  setIsRunning: (isRunning: boolean) => void;
  updateSettings: (settings: { focus?: number; shortBreak?: number; longBreak?: number }) => void;
  tick: () => void;
  resetTimer: () => void;
  completeSession: () => void;
  toggleFocusMode: () => void;
}

const DEFAULT_FOCUS = 25 * 60;
const DEFAULT_SHORT_BREAK = 5 * 60;
const DEFAULT_LONG_BREAK = 15 * 60;

export const usePomodoroStore = create<PomodoroState>()(
  persist(
    (set, get) => ({
      mode: "focus",
      timeLeft: DEFAULT_FOCUS,
      isRunning: false,
      focusDuration: DEFAULT_FOCUS,
      shortBreakDuration: DEFAULT_SHORT_BREAK,
      longBreakDuration: DEFAULT_LONG_BREAK,
      sessionsCompleted: 0,
      focusMode: false,

      setMode: (mode) => {
        const state = get();
        let newTime = state.focusDuration;
        if (mode === "shortBreak") newTime = state.shortBreakDuration;
        if (mode === "longBreak") newTime = state.longBreakDuration;
        
        set({ mode, timeLeft: newTime, isRunning: false });
      },

      setTimeLeft: (time) => set({ timeLeft: time }),
      
      setIsRunning: (isRunning) => set({ isRunning }),
      
      updateSettings: (settings) => {
        set((state) => {
          const focusDuration = settings.focus !== undefined ? settings.focus * 60 : state.focusDuration;
          const shortBreakDuration = settings.shortBreak !== undefined ? settings.shortBreak * 60 : state.shortBreakDuration;
          const longBreakDuration = settings.longBreak !== undefined ? settings.longBreak * 60 : state.longBreakDuration;
          
          let timeLeft = state.timeLeft;
          if (!state.isRunning) {
            if (state.mode === "focus") timeLeft = focusDuration;
            else if (state.mode === "shortBreak") timeLeft = shortBreakDuration;
            else if (state.mode === "longBreak") timeLeft = longBreakDuration;
          }

          return { focusDuration, shortBreakDuration, longBreakDuration, timeLeft };
        });
      },

      tick: () => set((state) => ({ timeLeft: Math.max(0, state.timeLeft - 1) })),

      resetTimer: () => {
        const state = get();
        let newTime = state.focusDuration;
        if (state.mode === "shortBreak") newTime = state.shortBreakDuration;
        if (state.mode === "longBreak") newTime = state.longBreakDuration;
        set({ timeLeft: newTime, isRunning: false });
      },

      completeSession: () => {
        const state = get();
        if (state.mode === "focus") {
          const newSessions = state.sessionsCompleted + 1;
          set({ sessionsCompleted: newSessions });
          
          // Auto switch to break
          if (newSessions % 4 === 0) {
            get().setMode("longBreak");
          } else {
            get().setMode("shortBreak");
          }
        } else {
          // Break is over, back to focus
          get().setMode("focus");
        }
      },

      toggleFocusMode: () => set((state) => ({ focusMode: !state.focusMode })),
    }),
    {
      name: "pomodoro-storage",
      partialize: (state) => ({
        focusDuration: state.focusDuration,
        shortBreakDuration: state.shortBreakDuration,
        longBreakDuration: state.longBreakDuration,
        sessionsCompleted: state.sessionsCompleted,
      }), // only persist settings and stats
    }
  )
);
