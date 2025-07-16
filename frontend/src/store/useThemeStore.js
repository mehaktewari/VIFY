import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("vify-theme") || "light",
  setTheme: (theme) => {
    localStorage.setItem("vify-theme", theme);
    set({ theme });
  },
}));
