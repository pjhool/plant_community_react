import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    User as FirebaseUser,
    updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/core/services/firebase';
import { User } from '../types/user';

export const AuthService = {
    /**
     * Sign up with email and password
     */
    signUpWithEmail: async (email: string, password: string, displayName: string): Promise<User> => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;

        // Update profile with display name
        await updateProfile(firebaseUser, { displayName });

        // Create user document in Firestore
        const newUser: User = {
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: displayName,
            photoURL: firebaseUser.photoURL,
            bio: '',
            createdAt: serverTimestamp() as any,
            updatedAt: serverTimestamp() as any,
        };

        await setDoc(doc(db, 'users', firebaseUser.uid), newUser);

        return newUser;
    },

    /**
     * Sign in with email and password
     */
    signInWithEmail: async (email: string, password: string): Promise<User> => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;

        // Fetch user data from Firestore or return basic info
        return await AuthService.getUserProfile(firebaseUser.uid) || AuthService.mapFirebaseUserToUser(firebaseUser);
    },

    /**
     * Sign in with Google
     */
    signInWithGoogle: async (): Promise<User> => {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        const firebaseUser = userCredential.user;

        // Check if user exists in Firestore
        const existingUser = await AuthService.getUserProfile(firebaseUser.uid);

        if (existingUser) {
            return existingUser;
        }

        // Create new user if not exists
        const newUser: User = {
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || 'User',
            photoURL: firebaseUser.photoURL,
            bio: '',
            createdAt: serverTimestamp() as any,
            updatedAt: serverTimestamp() as any,
        };

        await setDoc(doc(db, 'users', firebaseUser.uid), newUser);
        return newUser;
    },

    /**
     * Sign out
     */
    signOut: async (): Promise<void> => {
        await firebaseSignOut(auth);
    },

    /**
     * Get user profile from Firestore
     */
    getUserProfile: async (uid: string): Promise<User | null> => {
        const docRef = doc(db, 'users', uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data() as User;
        }
        return null;
    },

    /**
     * Helper to map Firebase User to domain User
     */
    mapFirebaseUserToUser: (firebaseUser: FirebaseUser): User => {
        return {
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || 'User',
            photoURL: firebaseUser.photoURL,
            bio: '',
            // These will be inaccurate for just-mapped users without Firestore data, 
            // but serve as a fallback.
            createdAt: serverTimestamp() as any,
            updatedAt: serverTimestamp() as any,
        };
    },

    /**
     * Subscribe to auth state changes
     */
    onAuthStateChanged: (callback: (user: FirebaseUser | null) => void) => {
        return onAuthStateChanged(auth, callback);
    }
};
