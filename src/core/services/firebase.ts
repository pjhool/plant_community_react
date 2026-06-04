import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
    getFirestore,
    initializeFirestore,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Guard: Firebase SDK is browser-only.
// During Next.js SSG/SSR prerender (server side), NEXT_PUBLIC_* variables are
// available but Firebase Auth and Firestore must not be initialised on the
// server — they rely on browser APIs (IndexedDB, localStorage, etc.).
// All pages in this project are "use client" and only call Firebase at runtime,
// so it is safe to skip initialisation in the server environment.
const isServer = typeof window === "undefined";

// Lazy-initialise so that server-side prerender imports this module without
// throwing. Actual values are only resolved in the browser.
const getFirebaseApp = () => {
    if (isServer) return null as any;
    return !getApps().length ? initializeApp(firebaseConfig) : getApp();
};

const app = getFirebaseApp();

const auth = isServer ? null as any : getAuth(app);

const db = isServer
    ? null as any
    : initializeFirestore(app, {
          ignoreUndefinedProperties: true,
      });

const storage = isServer ? null as any : getStorage(app);

export { app, auth, db, storage };
export default app;
