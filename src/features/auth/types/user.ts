import { Timestamp } from 'firebase/firestore';

/**
 * Represents a user in the application, matching the Firestore 'users' collection schema.
 */
export interface User {
    /**
     * Unique identifier (from Auth)
     */
    uid: string;
    /**
     * User's email
     */
    email: string;
    /**
     * User's nickname
     */
    displayName: string;
    /**
     * URL to profile image
     */
    photoURL: string | null;
    /**
     * Short user biography
     */
    bio: string;
    /**
     * Account creation date
     */
    createdAt: Timestamp;
    /**
     * Profile last update date
     */
    /**
     * Profile last update date
     */
    updatedAt: Timestamp;
    /**
     * Whether the user has completed the onboarding process (e.g. environment setup)
     */
    isOnboarded?: boolean;
}

/**
 * Represents the authentication state of the application.
 */
export interface AuthState {
    /**
     * The currently authenticated user, or null if not authenticated.
     */
    user: User | null;
    /**
     * Whether the auth state is currently loading (e.g. checking session).
     */
    isLoading: boolean;
    /**
     * Any error message related to authentication.
     */
    error: string | null;
}
