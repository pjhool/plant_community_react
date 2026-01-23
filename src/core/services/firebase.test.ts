import { describe, it, expect } from "vitest";
import { auth, db, storage } from "./firebase";

describe("Firebase Service", () => {
    it("should initialize firebase services", () => {
        expect(auth).toBeDefined();
        expect(db).toBeDefined();
        expect(storage).toBeDefined();
    });
});
