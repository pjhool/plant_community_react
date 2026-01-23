# Firestore Security Rules

This document outlines the security rules for the Firestore database.

## 1. Core Principles
- **Authentication Required**: Most write operations require a logged-in user.
- **Owner-Only Access**: Users can only modify their own data (profiles, posts, comments).
- **Public Read (Specific)**: Posts and public profiles are readable by authenticated users.

## 2. Rules Structure
The rules are defined in `firestore.rules`.

### Users Collection
- **Read**: Authenticated users can read other users' public profiles.
- **Write**: Users can only create or update their own profile document (`/users/{userId}`).

### Posts Collection
- **Read**: Authenticated users can read all posts.
- **Write**: Users can only create, update, or delete posts where `userId` matches their `request.auth.uid`.

### Comments Collection
- **Read**: Authenticated users can read comments on any public post.
- **Write**: Users can only create or modify their own comments.

## 3. Testing Rules
Security rules should be tested using the Firebase Emulator Suite.
```bash
firebase emulators:start --only firestore
```
