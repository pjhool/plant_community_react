import { describe, it, expect, vi } from "vitest";
import { useAppStore } from "@/core/stores/useAppStore";

describe("useAppStore", () => {
    it("should have initial state", () => {
        const state = useAppStore.getState();
        expect(state.theme).toBe("system");
        expect(state.isSidebarOpen).toBe(false);
    });

    it("should update theme", () => {
        useAppStore.getState().setTheme("dark");
        expect(useAppStore.getState().theme).toBe("dark");
    });

    it("should toggle sidebar", () => {
        const initialState = useAppStore.getState().isSidebarOpen;
        useAppStore.getState().toggleSidebar();
        expect(useAppStore.getState().isSidebarOpen).toBe(!initialState);
    });
});
