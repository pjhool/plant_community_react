import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Loading } from "./Loading";
import React from "react";

describe("Loading Component", () => {
    it("should render correctly", () => {
        render(<Loading />);
        // Since it's a lucide-react icon, we check if it's in the document
        const svg = document.querySelector("svg");
        expect(svg).toBeDefined();
        expect(svg).toHaveClass("animate-spin");
    });
});
