import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type SavedLabsState = {
  savedLabIds: string[];
  toggleSaved: (labId: string) => void;
  isSaved: (labId: string) => boolean;
};

// TODO: no bookmark-toggle button exists in the UI yet (not part of the
// current Labs design reference) — wire one up on LabListItem/
// FeaturedLabCard once that affordance is designed, so this list can
// actually be populated from the app.
export const useSavedLabsStore = create<SavedLabsState>()(
  persist(
    (set, get) => ({
      savedLabIds: [],

      toggleSaved: (labId) => {
        set((state) => ({
          savedLabIds: state.savedLabIds.includes(labId)
            ? state.savedLabIds.filter((id) => id !== labId)
            : [...state.savedLabIds, labId],
        }));
      },

      isSaved: (labId) => get().savedLabIds.includes(labId),
    }),
    {
      name: "saved-labs-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);