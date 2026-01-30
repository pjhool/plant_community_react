import { db } from '@/core/services/firebase';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  writeBatch,
  serverTimestamp
} from 'firebase/firestore';
import { EnvironmentProfile } from '../types/environment';

const COLLECTION_NAME = 'environments';

export const EnvironmentService = {
  async getProfile(userId: string): Promise<EnvironmentProfile | null> {
    const docRef = doc(db, COLLECTION_NAME, userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as EnvironmentProfile;
    }
    return null;
  },

  async saveProfile(userId: string, profile: Omit<EnvironmentProfile, 'userId' | 'createdAt' | 'updatedAt'>): Promise<void> {
    console.log("Saving profile for userId:", userId);
    const batch = writeBatch(db);

    // 1. Set Environment Profile
    const envRef = doc(db, COLLECTION_NAME, userId);
    const now = new Date().toISOString();
    const fullProfile: EnvironmentProfile = {
      ...profile,
      userId,
      createdAt: now,
      updatedAt: now,
    };
    batch.set(envRef, fullProfile);

    // 2. Update User isOnboarded status in 'users' collection
    const userRef = doc(db, 'users', userId);
    batch.set(userRef, {
      isOnboarded: true,
      updatedAt: serverTimestamp()
    }, { merge: true });

    await batch.commit();
  },

  async updateProfile(userId: string, profile: Partial<EnvironmentProfile>): Promise<void> {
    const docRef = doc(db, COLLECTION_NAME, userId);
    await updateDoc(docRef, {
      ...profile,
      updatedAt: new Date().toISOString(),
    });
  }
};
