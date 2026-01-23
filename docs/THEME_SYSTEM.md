# Theme System Guide

The project uses a semantic design system powered by Tailwind CSS and `next-themes`.

## 1. Design Tokens
Tokens are defined in `tailwind.config.ts` and mapped to CSS variables in `src/core/styles/globals.css`.

### Colors
- **Primary**: Green palette (`primary.50` to `primary.900`). Used for brand and growth actions.
- **Background**: `bg-background`.
- **Text**: `text-foreground`.
- **Semantic**: `text-success`, `text-warning`, `text-error`, `text-info`.

### Typography
Apply typography styles using custom Tailwind classes:
- **H1**: `text-h1` (Bold, 28px)
- **H2**: `text-h2` (Medium, 22px)
- **Body1**: `text-body1` (Regular, 16px)
- **Body2**: `text-body2` (Regular, 14px)
- **Caption**: `text-caption` (Regular, 12px)

## 2. Dark Mode
The application supports Light and Dark modes.
- Toggle theme using `useTheme` from `next-themes`.
- Style changes are handled automatically via the `.dark` class on the `<html>` element.

## 3. Using Components
Common UI components should be used from `src/core/components/`:
- **Button**: Supports `variant="primary"`, `"secondary"`, `"outline"`, etc.
- **Loading**: Semantic spinner.
- **ErrorMessage**: Standard error display.

## 4. Principles
- **Radius**: Default border radius is `--radius` (12px).
- **Spacing**: Use standard Tailwind spacing scale (`p-4`, `m-2`, etc.).
- **Font**: **Noto Sans KR** is the primary font.
