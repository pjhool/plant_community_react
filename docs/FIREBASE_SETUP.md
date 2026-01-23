# Firebase Setup Guide

This document describes how to set up and configure Firebase for the Plant Community React app.

## 1. Firebase Project Creation
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click **Add project** and follow the instructions.
3. Enable **Google Analytics** (recommended).

## 2. Web App Configuration
1. In your Firebase project, click the **Web** icon (</>) to add an app.
2. Register the app (e.g., `plant-community-react`).
3. Copy the `firebaseConfig` object.

## 3. Environment Variables
Create a `.env.local` file in the `plant_community_react` directory and add the following variables using the values from your `firebaseConfig`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

Refer to [ENVIRONMENT_VARIABLES.md](./ENVIRONMENT_VARIABLES.md) for more details.

## 4. Services Enabled
- **Authentication**: Email/Password and Social Providers.
- **Firestore Database**: NoSQL database for application data.
- **Storage**: For user-uploaded images.
- **App Distribution**: For internal testing (Optional).

## 5. SDK Initialization
The SDK is initialized in `src/core/services/firebase.ts` using the singleton pattern.
```typescript
import { app, auth, db, storage } from "@/core/services/firebase";
```
