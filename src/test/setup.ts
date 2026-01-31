import '@testing-library/jest-dom';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
    cleanup();
});

// Mock Firebase
vi.mock('firebase/app', () => ({
    initializeApp: vi.fn(() => ({})),
    getApps: vi.fn(() => []),
    getApp: vi.fn(),
}));

vi.mock('firebase/auth', () => ({
    getAuth: vi.fn(() => ({
        currentUser: null,
    })),
    signInWithEmailAndPassword: vi.fn(),
    createUserWithEmailAndPassword: vi.fn(),
    updateProfile: vi.fn(),
    signOut: vi.fn(),
    onAuthStateChanged: vi.fn((auth, callback) => {
        callback(null);
        return () => { };
    }),
    GoogleAuthProvider: vi.fn(),
    signInWithPopup: vi.fn(),
}));

vi.mock('firebase/firestore', () => ({
    getFirestore: vi.fn(() => ({})),
    initializeFirestore: vi.fn(() => ({})),
    persistentLocalCache: vi.fn(),
    persistentMultipleTabManager: vi.fn(),
    doc: vi.fn(),
    setDoc: vi.fn(),
    getDoc: vi.fn(),
    updateDoc: vi.fn(),
    writeBatch: vi.fn(() => ({
        set: vi.fn(),
        update: vi.fn(),
        commit: vi.fn().mockResolvedValue(undefined),
    })),
    serverTimestamp: vi.fn(),
}));


vi.mock('firebase/storage', () => ({
    getStorage: vi.fn(() => ({})),
}));
