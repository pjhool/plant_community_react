# Workflow Usage Guide

## Getting Started with CI/CD

This guide explains how to use the CI/CD workflows in the Plant Community React project.

## Prerequisites

- Git installed and configured
- GitHub account with repository access
- `gh` CLI installed (optional, for issue management)

## Workflow: Creating a Pull Request

### 1. Create a Feature Branch

```bash
# From develop branch
git checkout develop
git pull origin develop

# Create feature branch
git checkout -b feature/your-feature-name
```

### 2. Make Changes and Commit

```bash
# Make your changes
git add .
git commit -m "feat: add your feature description"
```

### 3. Push and Create PR

```bash
# Push to remote
git push origin feature/your-feature-name

# Create PR (using gh CLI)
gh pr create --base develop --title "Your PR Title" --body "Description"
```

### 4. PR Check Workflow Runs Automatically

The `pr-check.yml` workflow will run automatically:
- ✅ Install dependencies
- ✅ Lint check
- ✅ Type check
- ✅ Security audit
- ✅ Run tests with coverage

### 5. Review Results

Check the PR page for workflow status:
- Green checkmark ✅ = All checks passed
- Red X ❌ = Some checks failed

Click "Details" to see which step failed.

## Workflow: Merging to Develop

Once PR checks pass and code is reviewed:

```bash
# Merge via GitHub UI or CLI
gh pr merge --squash
```

This triggers:
- Vercel preview deployment (when configured in Phase 1)
- Additional integration tests

## Workflow: Creating a Release

### 1. Create Release Branch

```bash
git checkout develop
git pull origin develop
git checkout -b release/v1.0.0
git push origin release/v1.0.0
```

### 2. Release Workflow Runs

- Full test suite
- Production build
- Staging deployment

### 3. Merge to Main

After staging validation:

```bash
git checkout main
git merge release/v1.0.0
git push origin main
```

## Local Development

### Running Checks Locally

Before pushing, run checks locally:

```bash
# Install dependencies
pnpm install

# Run all checks
pnpm lint
pnpm type-check
pnpm test:coverage

# Fix linting issues automatically
pnpm lint --fix
```

## Viewing Workflow Runs

### Via GitHub UI
1. Go to repository → Actions tab
2. Click on workflow run to see details
3. Click on job to see step-by-step logs

### Via CLI
```bash
# List recent workflow runs
gh run list

# View specific run
gh run view <run-id>

# Watch live run
gh run watch
```

## Artifacts

Coverage reports are uploaded as artifacts:

```bash
# Download artifacts
gh run download <run-id>
```

## Best Practices

1. **Always create PRs from feature branches**
2. **Never push directly to develop or main**
3. **Run checks locally before pushing**
4. **Keep commits atomic and well-described**
5. **Wait for CI checks before requesting review**
6. **Fix failing checks immediately**

## Next Steps

- See [CI_CD_PIPELINE.md](./CI_CD_PIPELINE.md) for pipeline overview
- See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for common issues
