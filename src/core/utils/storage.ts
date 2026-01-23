/**
 * Safe wrapper for LocalStorage access
 */
export const storage = {
    get: <T>(key: string): T | null => {
        if (typeof window === "undefined") return null;
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error(`Error reading from localStorage key "${key}":`, error);
            return null;
        }
    },

    set: <T>(key: string, value: T): void => {
        if (typeof window === "undefined") return;
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`Error saving to localStorage key "${key}":`, error);
        }
    },

    remove: (key: string): void => {
        if (typeof window === "undefined") return;
        window.localStorage.removeItem(key);
    },

    clear: (): void => {
        if (typeof window === "undefined") return;
        window.localStorage.clear();
    },
};
