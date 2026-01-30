import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ErrorMessage } from '@/core/components/ErrorMessage';
import React from "react";

describe("ErrorMessage Component", () => {
    it("should display the error message", () => {
        const message = "Test Error Message";
        render(<ErrorMessage message={message} />);
        expect(screen.getByText(message)).toBeDefined();
    });
});
