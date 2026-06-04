import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';
import imageCompression from 'browser-image-compression';

export const StorageService = {
    /**
     * Compress image file
     */
    compressImage: async (file: File): Promise<File> => {
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        };
        try {
            return await imageCompression(file, options);
        } catch (error) {
            console.error('Image compression failed:', error);
            return file; // Fallback to original
        }
    },

    /**
     * Upload compressed image to Firebase Storage
     */
    uploadPostImage: async (userId: string, file: File): Promise<string> => {
        const compressedFile = await StorageService.compressImage(file);
        const fileName = `${Date.now()}_${file.name}`;
        const storageRef = ref(storage, `posts/${userId}/${fileName}`);
        
        await uploadBytes(storageRef, compressedFile);
        return await getDownloadURL(storageRef);
    },

    /**
     * Upload multiple images
     */
    uploadMultipleImages: async (userId: string, files: File[]): Promise<string[]> => {
        const uploadPromises = files.map(file => StorageService.uploadPostImage(userId, file));
        return await Promise.all(uploadPromises);
    }
};
