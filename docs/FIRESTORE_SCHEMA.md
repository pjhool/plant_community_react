# Firestore Schema Documentation

This document defines the data structure for the Firestore collections.

## 1. `users` Collection
- **Path**: `/users/{userId}`
- **Description**: Stores user profile and basic information.

| Field | Type | Description |
|-------|------|-------------|
| `uid` | string | Unique identifier (from Auth) |
| `email` | string | User's email |
| `displayName` | string | User's nickname |
| `photoURL` | string | URL to profile image |
| `bio` | string | Short user biography |
| `createdAt` | timestamp | Account creation date |
| `updatedAt` | timestamp | Profile last update date |

## 2. `posts` Collection
- **Path**: `/posts/{postId}`
- **Description**: User-generated posts.

| Field | Type | Description |
|-------|------|-------------|
| `userId` | string | Reference to user who created the post |
| `content` | string | Text content of the post |
| `images` | array<string> | URLs to associated images |
| `tags` | array<string> | List of tags/categories |
| `likesCount` | number | Number of likes |
| `commentsCount` | number | Number of comments |
| `createdAt` | timestamp | Post creation date |
| `updatedAt` | timestamp | Post last update date |

## 3. `comments` Collection
- **Path**: `/comments/{commentId}`
- **Description**: Comments on specific posts.

| Field | Type | Description |
|-------|------|-------------|
| `postId` | string | Reference to the parent post |
| `userId` | string | Reference to the user who commented |
| `content` | string | Comment text |
| `createdAt` | timestamp | Comment creation date |

## Composite Indexes

To support efficient queries, the following composite indexes are recommended:

- **Collection**: `posts`
  - `userId` (Ascending), `createdAt` (Descending)
  - `tags` (Array-Contains), `createdAt` (Descending)
