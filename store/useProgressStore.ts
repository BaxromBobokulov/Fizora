import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const XP_PER_LEVEL = 500;
const XP_PER_LAB_COMPLETION = 50;

type ProgressState = {
  xp: number;
  level: number;
  currentLevelXp: number;
  nextLevelXpTarget: number;
  streakCount: number;
  lastActiveDate: string | null;
  lastActiveLabId: string | null;
  completedLabIds: string[];
  hoursLearned: number;
  achievementsCount: number;

  addXp: (amount: number) => void;
  completeLab: (labId: string) => void;
  hasEverCompletedLab: () => boolean;
};

// Shared so any screen showing the XP bar (Home's Learning Progress card,
// Profile's Level card) derives the same percentage instead of each
// re-deriving it inline.
export function xpProgressPercent(currentLevelXp: number, nextLevelXpTarget: number): number {
  return nextLevelXpTarget === 0 ? 0 : Math.round((currentLevelXp / nextLevelXpTarget) * 100);
}

export function useXpProgressPercent(): number {
  const currentLevelXp = useProgressStore((state) => state.currentLevelXp);
  const nextLevelXpTarget = useProgressStore((state) => state.nextLevelXpTarget);
  return xpProgressPercent(currentLevelXp, nextLevelXpTarget);
}

// "YYYY-MM-DD" in the device's local time — Date#toISOString() rolls over at
// UTC midnight instead of the student's actual midnight, which would corrupt
// same-day/yesterday streak comparisons for anyone east/west of UTC.
export function getLocalDateString(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Bare "YYYY-MM-DD" strings parse as UTC per the Date spec, so pin both sides
// to local midnight before diffing or the day count drifts near midnight.
function daysBetween(fromDate: string, toDate: string): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  const from = new Date(`${fromDate}T00:00:00`).getTime();
  const to = new Date(`${toDate}T00:00:00`).getTime();
  return Math.round((to - from) / msPerDay);
}

export function nextStreakCount(
  lastActiveDate: string | null,
  today: string,
  currentStreak: number
): number {
  if (lastActiveDate === null) return 1;

  const diff = daysBetween(lastActiveDate, today);
  if (diff === 0) return currentStreak;
  if (diff === 1) return currentStreak + 1;
  return 1;
}

type XpState = {
  xp: number;
  level: number;
  currentLevelXp: number;
  nextLevelXpTarget: number;
};

export function applyXp(state: XpState, amount: number): XpState {
  let level = state.level;
  let currentLevelXp = state.currentLevelXp + amount;
  const nextLevelXpTarget = state.nextLevelXpTarget;

  while (currentLevelXp >= nextLevelXpTarget) {
    currentLevelXp -= nextLevelXpTarget;
    level += 1;
  }

  return { xp: state.xp + amount, level, currentLevelXp, nextLevelXpTarget };
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      xp: 0,
      level: 1,
      currentLevelXp: 0,
      nextLevelXpTarget: XP_PER_LEVEL,
      streakCount: 0,
      lastActiveDate: null,
      lastActiveLabId: null,
      completedLabIds: [],
      hoursLearned: 0,
      achievementsCount: 0,

      addXp: (amount) => {
        set((state) => applyXp(state, amount));
      },

      completeLab: (labId) => {
        const state = get();
        const today = getLocalDateString();

        set({
          ...applyXp(state, XP_PER_LAB_COMPLETION),
          lastActiveDate: today,
          lastActiveLabId: labId,
          completedLabIds: state.completedLabIds.includes(labId)
            ? state.completedLabIds
            : [...state.completedLabIds, labId],
          streakCount: nextStreakCount(state.lastActiveDate, today, state.streakCount),
        });
      },

      hasEverCompletedLab: () => get().completedLabIds.length > 0,
    }),
    {
      name: "progress-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
