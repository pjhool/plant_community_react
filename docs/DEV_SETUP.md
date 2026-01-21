# Development Environment Setup Guide

## Prerequisites

### Node.js
- **Required Version**: 18.x or higher
- **Current Version**: v22.16.0 ✅
- **Installation**: Download from [nodejs.org](https://nodejs.org/)

### pnpm
- **Required Version**: 9.x
- **Installation**:
  ```powershell
  # Option 1: Using npm
  npm install -g pnpm
  
  # Option 2: Using standalone installer
  # Download from https://pnpm.io/installation
  ```

> **Note**: If you encounter PowerShell execution policy errors, run:
> ```powershell
> Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
> ```

### Verification
```bash
node --version  # Should show v18.x or higher
pnpm --version  # Should show 9.x
```

## IDE Setup

### VS Code (Recommended)
Already installed ✅

### Required Extensions
The following extensions will be automatically suggested when you open the project:

1. **ESLint** (`dbaeumer.vscode-eslint`)
   - Linting and code quality

2. **Prettier** (`esbenp.prettier-vscode`)
   - Code formatting

3. **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`)
   - Tailwind class autocomplete

4. **TypeScript** (`ms-vscode.vscode-typescript-next`)
   - Enhanced TypeScript support

5. **Error Lens** (`usernamehw.errorlens`)
   - Inline error display

6. **Code Spell Checker** (`streetsidesoftware.code-spell-checker`)
   - Spell checking

### Installing Extensions
```bash
# Install all recommended extensions at once
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension bradlc.vscode-tailwindcss
code --install-extension ms-vscode.vscode-typescript-next
code --install-extension usernamehw.errorlens
code --install-extension streetsidesoftware.code-spell-checker
```

Or click "Install All" when VS Code prompts you.

## Git Configuration

### Repository Setup
```bash
# Verify Git is initialized
git status

# Verify remote connection
git remote -v
```

### Branch Strategy
- `main` - Production branch
- `develop` - Development branch (to be created)
- `feature/*` - Feature branches
- `release/*` - Release branches

## Project Configuration Files

### .gitignore
Configured to exclude:
- `node_modules/`
- `.next/` build output
- `.env*.local` environment files
- Coverage reports
- IDE files (except recommended settings)

### .vscode/settings.json
Configured for:
- Format on save with Prettier
- Auto-fix ESLint issues on save
- Tailwind CSS IntelliSense
- TypeScript workspace version

## Next Steps

1. Install pnpm if not already installed
2. Install VS Code extensions
3. Proceed to Phase 0.6: Project Structure Setup
4. Proceed to Phase 0.7: Dependency Installation

## Troubleshooting

### pnpm not found
- Ensure pnpm is installed globally
- Restart terminal/VS Code after installation
- Check PATH environment variable

### Extension not working
- Reload VS Code window
- Check extension is enabled
- Verify workspace trust settings

### Git issues
- Ensure Git is installed
- Configure user name and email:
  ```bash
  git config user.name "Your Name"
  git config user.email "your.email@example.com"
  ```
