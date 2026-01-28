import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppState {
    theme: "light" | "dark" | "system";
    setTheme: (theme: "light" | "dark" | "system") => void;
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
}

export const useAppStore = create<AppState>()(
    persist(
        (set) => ({
            theme: "system",
            setTheme: (theme) => set({ theme }),
            isSidebarOpen: false,
            toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
        }),
        {
            name: "app-storage",
        }
    )
);
