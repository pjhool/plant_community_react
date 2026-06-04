import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';
import imageCompression from 'browser-image-compression';

export const StorageService = {
  /**
   * Compress and upload an image to Firebase Storage
   */
  uploadImage: async (file: File, path: string): Promise<string> => {
    try {
      // 1. Image Compression
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      
      const compressedFile = await imageCompression(file, options);
      
      // 2. Upload to Storage
      const storageRef = ref(storage, path);
      const snapshot = await uploadBytes(storageRef, compressedFile);
      
      // 3. Get Download URL
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  },

  /**
   * Upload multiple images
   */
  uploadImages: async (files: File[], basePath: string): Promise<string[]> => {
    const uploadPromises = files.map((file, index) => {
      const fileName = `${Date.now()}_${index}_${file.name}`;
      const fullPath = `${basePath}/${fileName}`;
      return StorageService.uploadImage(file, fullPath);
    });

    return Promise.all(uploadPromises);
  }
};
