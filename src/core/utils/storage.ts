export const storage = {
    get: (key: string) => {
        if (typeof window === 'undefined') return null;
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Error getting from storage', error);
            return null;
        }
    },
    set: (key: string, value: any) => {
        if (typeof window === 'undefined') return;
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Error setting storage', error);
        }
    },
    remove: (key: string) => {
        if (typeof window === 'undefined') return;
        window.localStorage.removeItem(key);
    },
    clear: () => {
        if (typeof window === 'undefined') return;
        window.localStorage.clear();
    }
};
