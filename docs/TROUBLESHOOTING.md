# CI/CD Troubleshooting Guide

## Common Issues and Solutions

### 1. Workflow Not Triggering

**Symptom**: Push or PR created but workflow doesn't run

**Possible Causes**:
- Workflow file has syntax errors
- Branch name doesn't match trigger pattern
- GitHub Actions disabled for repository

**Solutions**:
```bash
# Check workflow file syntax
cat .github/workflows/pr-check.yml

# Verify branch name
git branch --show-current

# Check if Actions are enabled
# Go to: Settings → Actions → General → Allow all actions
```

### 2. `pnpm: command not found`

**Symptom**: Workflow fails with "pnpm: command not found"

**Cause**: pnpm not installed in workflow

**Solution**: Ensure workflow includes pnpm setup step:
```yaml
- uses: pnpm/action-setup@v3
  with:
    version: 9
```

### 3. `pnpm install` Fails

**Symptom**: Dependency installation fails

**Possible Causes**:
- `pnpm-lock.yaml` out of sync
- Network issues
- Invalid package versions

**Solutions**:
```bash
# Regenerate lockfile locally
rm pnpm-lock.yaml
pnpm install

# Commit updated lockfile
git add pnpm-lock.yaml
git commit -m "chore: update lockfile"
git push
```

### 4. Lint Errors

**Symptom**: `pnpm lint` fails in CI

**Solution**:
```bash
# Run locally to see errors
pnpm lint

# Auto-fix where possible
pnpm lint --fix

# Commit fixes
git add .
git commit -m "fix: resolve linting issues"
```

### 5. Type Check Errors

**Symptom**: `pnpm type-check` fails

**Solution**:
```bash
# Run locally
pnpm type-check

# Common fixes:
# - Add missing type definitions
# - Fix type mismatches
# - Add @ts-expect-error comments (last resort)
```

### 6. Test Failures

**Symptom**: Tests pass locally but fail in CI

**Possible Causes**:
- Environment differences
- Timing issues
- Missing test data

**Solutions**:
```bash
# Run tests in CI mode locally
CI=true pnpm test

# Check for console warnings
pnpm test --silent=false

# Increase test timeouts if needed
```

### 7. Security Audit Failures

**Symptom**: `pnpm audit` reports vulnerabilities

**Solutions**:
```bash
# View audit report
pnpm audit

# Auto-fix where possible
pnpm audit --fix

# For unfixable issues, check severity
# Low/moderate may be acceptable temporarily
# High/critical should be addressed immediately
```

### 8. Coverage Upload Fails

**Symptom**: Coverage artifact upload fails

**Possible Causes**:
- Coverage directory doesn't exist
- Insufficient permissions

**Solution**: Ensure tests generate coverage:
```bash
# Check coverage is generated
pnpm test:coverage
ls -la coverage/
```

### 9. Workflow Timeout

**Symptom**: Workflow runs for too long and times out

**Solutions**:
- Optimize test suite
- Use test sharding
- Increase timeout in workflow:
```yaml
jobs:
  quality-check:
    timeout-minutes: 15  # Default is 360
```

### 10. Permission Denied Errors

**Symptom**: Workflow fails with permission errors

**Solution**: Check workflow permissions:
```yaml
permissions:
  contents: read
  pull-requests: write
```

## Debugging Workflows

### Enable Debug Logging

Set repository secrets:
- `ACTIONS_STEP_DEBUG`: `true`
- `ACTIONS_RUNNER_DEBUG`: `true`

### View Detailed Logs

```bash
# Download logs
gh run view <run-id> --log

# View specific job
gh run view <run-id> --job=<job-id> --log
```

### Re-run Failed Jobs

```bash
# Re-run all jobs
gh run rerun <run-id>

# Re-run only failed jobs
gh run rerun <run-id> --failed
```

## Getting Help

1. Check workflow logs for specific error messages
2. Search GitHub Actions documentation
3. Check this project's Issues for similar problems
4. Create new issue with:
   - Workflow run URL
   - Error message
   - Steps to reproduce

## Useful Commands

```bash
# List all workflows
gh workflow list

# View workflow file
gh workflow view pr-check.yml

# Disable workflow temporarily
gh workflow disable pr-check.yml

# Enable workflow
gh workflow enable pr-check.yml
```

## Next Steps

- Review [CI_CD_PIPELINE.md](./CI_CD_PIPELINE.md) for pipeline overview
- Review [WORKFLOW_GUIDE.md](./WORKFLOW_GUIDE.md) for usage instructions
