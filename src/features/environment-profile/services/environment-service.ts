import { db } from '@/core/services/firebase';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc 
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
    const docRef = doc(db, COLLECTION_NAME, userId);
    const now = new Date().toISOString();
    const fullProfile: EnvironmentProfile = {
      ...profile,
      userId,
      createdAt: now,
      updatedAt: now,
    };
    await setDoc(docRef, fullProfile);
  },

  async updateProfile(userId: string, profile: Partial<EnvironmentProfile>): Promise<void> {
    const docRef = doc(db, COLLECTION_NAME, userId);
    await updateDoc(docRef, {
      ...profile,
      updatedAt: new Date().toISOString(),
    });
  }
};
