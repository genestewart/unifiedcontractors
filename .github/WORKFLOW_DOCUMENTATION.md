# GitHub Actions Workflow Documentation

## Overview

This repository uses GitHub Actions for continuous integration and deployment. The workflows are designed to ensure code quality, security, and reliable deployments.

## Workflow Files

### 1. CI Pipeline (`ci.yml`)

**Purpose:** Runs on every push and pull request to ensure code quality and functionality.

**Triggers:**
- Push to main, master, or develop branches
- Pull requests to main, master, or develop branches

**Jobs:**

#### `lint-and-test`
- **Matrix Testing:** Runs on Node.js 18.x, 20.x, and 22.x
- **Steps:**
  1. Checkout code
  2. Setup Node.js with caching
  3. Install dependencies
  4. Run ESLint for code quality
  5. Run Vitest unit tests
  6. Generate test coverage reports
  7. Upload coverage to Codecov

#### `build`
- **Dependencies:** Requires lint-and-test to pass
- **Purpose:** Ensures the application builds successfully
- **Artifacts:** Uploads built files for deployment

#### `lighthouse`
- **Runs on:** Pull requests only
- **Purpose:** Performance audit using Google Lighthouse
- **Metrics:** Performance, accessibility, best practices, SEO

#### `security-scan`
- **Purpose:** Identifies security vulnerabilities
- **Tools:** npm audit, dependency-check
- **Non-blocking:** Continues on error to report issues without failing CI

#### `ci-success`
- **Purpose:** Final check that all required jobs passed
- **Use case:** Can be used as a single status check for branch protection

### 2. Deploy Workflow (`deploy.yml`)

**Purpose:** Automatically deploys to GitHub Pages when CI passes on main branch.

**Triggers:**
- Successful completion of CI Pipeline on main/master
- Manual workflow dispatch with environment selection

**Features:**
- **Environment Support:** Production and staging environments
- **GitHub Pages Deployment:** Primary deployment target
- **Alternative Deployments:** Netlify and Vercel (disabled by default)
- **SPA Support:** Copies index.html to 404.html for client-side routing

**Configuration Required:**
1. Enable GitHub Pages in repository settings
2. Set source to GitHub Actions
3. Update base URL if not deploying to root

### 3. Dependency Update (`dependency-update.yml`)

**Purpose:** Automated weekly dependency updates with safety checks.

**Schedule:** Every Monday at 9 AM UTC

**Process:**
1. Checks for outdated packages
2. Updates to latest compatible versions
3. Runs full test suite
4. Creates PR if updates available
5. Auto-assigns reviewers

## Secrets and Variables

### Required Secrets

```yaml
# For Codecov integration (optional)
CODECOV_TOKEN: <codecov-upload-token>

# For Netlify deployment (optional)
NETLIFY_AUTH_TOKEN: <netlify-api-token>
NETLIFY_SITE_ID: <netlify-site-id>

# For Vercel deployment (optional)
VERCEL_TOKEN: <vercel-api-token>
VERCEL_ORG_ID: <vercel-organization-id>
VERCEL_PROJECT_ID: <vercel-project-id>
```

### Setting Secrets
1. Go to Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add name and value
4. Click "Add secret"

## Best Practices Implemented

### 1. Performance Optimization
- **Dependency Caching:** NPM packages cached between runs
- **Parallel Jobs:** Lint, test, and build run in parallel where possible
- **Conditional Uploads:** Coverage only uploaded once despite matrix testing
- **Concurrency Groups:** Cancels outdated runs for same PR/branch

### 2. Security
- **Minimal Permissions:** Workflows use least privilege principle
- **Secret Management:** Sensitive data stored as encrypted secrets
- **Dependency Scanning:** Regular vulnerability checks
- **Signed Commits:** Support for GPG signed commits

### 3. Reliability
- **Matrix Testing:** Tests across multiple Node.js versions
- **Artifact Retention:** Build artifacts kept for 30-90 days
- **Error Handling:** Graceful failure with informative messages
- **Retry Logic:** Network operations have built-in retry

### 4. Developer Experience
- **Fast Feedback:** Linting runs before tests
- **Clear Status:** Descriptive job names and steps
- **PR Comments:** Lighthouse results posted to PRs
- **Manual Triggers:** Workflows can be run manually when needed

## Workflow Optimization Tips

### Reducing CI Time

1. **Use Dependency Caching:**
   ```yaml
   - uses: actions/cache@v4
     with:
       path: ~/.npm
       key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
   ```

2. **Run Jobs in Parallel:**
   ```yaml
   jobs:
     lint:
       runs-on: ubuntu-latest
     test:
       runs-on: ubuntu-latest
     # Both run simultaneously
   ```

3. **Skip Unnecessary Runs:**
   ```yaml
   if: |
     !contains(github.event.head_commit.message, '[skip ci]')
   ```

### Debugging Failed Workflows

1. **Enable Debug Logging:**
   - Add secret: `ACTIONS_STEP_DEBUG` = `true`
   - Add secret: `ACTIONS_RUNNER_DEBUG` = `true`

2. **Use tmate for Interactive Debugging:**
   ```yaml
   - name: Debug with tmate
     if: ${{ failure() }}
     uses: mxschmitt/action-tmate@v3
   ```

3. **Check Workflow Logs:**
   - Click on failed workflow run
   - Expand failed step
   - Look for error messages

## Common Issues and Solutions

### Issue: Build works locally but fails in CI
**Solution:**
- Check Node.js version matches
- Ensure all dependencies are in package.json
- Verify case-sensitive file imports
- Check environment variables

### Issue: Deployment fails with 404
**Solution:**
- Verify base URL configuration
- Check GitHub Pages settings
- Ensure dist folder contains index.html
- Review deployment logs

### Issue: Tests timeout in CI
**Solution:**
- Increase test timeout in vitest.config.js
- Optimize slow tests
- Use test.concurrent for parallel tests
- Consider splitting large test suites

### Issue: Cache not working
**Solution:**
- Verify cache key includes lock file hash
- Check cache size (limit: 10GB)
- Clear cache from Actions → Caches
- Use restore-keys for partial matches

## Monitoring and Metrics

### Workflow Analytics
- **Actions Tab:** View run history and success rates
- **Insights → Actions:** Performance metrics and trends
- **API Access:** Use GitHub API for custom dashboards

### Key Metrics to Track
- **Success Rate:** Percentage of successful runs
- **Duration:** Average workflow completion time
- **Queue Time:** Time waiting for available runners
- **Failure Patterns:** Common failure points

### Setting Up Notifications

1. **Email Notifications:**
   - Settings → Notifications
   - Configure Actions preferences

2. **Slack Integration:**
   ```yaml
   - name: Slack Notification
     if: failure()
     uses: 8398a7/action-slack@v3
     with:
       status: ${{ job.status }}
       webhook_url: ${{ secrets.SLACK_WEBHOOK }}
   ```

3. **Custom Webhooks:**
   ```yaml
   - name: Send webhook
     if: always()
     run: |
       curl -X POST ${{ secrets.WEBHOOK_URL }} \
         -H "Content-Type: application/json" \
         -d '{"status": "${{ job.status }}"}'
   ```

## Advanced Configuration

### Custom Runners
For faster builds or specific requirements:

```yaml
runs-on: [self-hosted, linux, x64]
```

### Conditional Deployments
Deploy based on branch or tag:

```yaml
if: startsWith(github.ref, 'refs/tags/v')
```

### Environment-Specific Builds
Use environment files:

```yaml
- name: Setup environment
  run: |
    if [ "${{ github.ref }}" == "refs/heads/main" ]; then
      cp .env.production .env
    else
      cp .env.staging .env
    fi
```

### Composite Actions
Create reusable action components:

```yaml
# .github/actions/setup/action.yml
name: 'Setup'
runs:
  using: 'composite'
  steps:
    - uses: actions/setup-node@v4
      with:
        node-version: '20'
    - run: npm ci
      shell: bash
```

## Maintenance Schedule

### Daily
- Monitor workflow failures
- Check security alerts

### Weekly
- Review workflow performance
- Update dependencies (automated)

### Monthly
- Audit workflow permissions
- Clean up old artifacts
- Review and optimize slow workflows

### Quarterly
- Update action versions
- Review security practices
- Benchmark against best practices

## Contributing to Workflows

1. **Test locally with act:**
   ```bash
   act -W .github/workflows/ci.yml
   ```

2. **Create feature branch:**
   ```bash
   git checkout -b workflow/your-feature
   ```

3. **Make changes and test:**
   - Use workflow_dispatch for testing
   - Verify in forked repository first

4. **Submit PR:**
   - Include description of changes
   - Link to successful test runs
   - Request review from DevOps team

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Action Marketplace](https://github.com/marketplace?type=actions)
- [Workflow Syntax](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions)
- [Security Hardening](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions)
- [Billing and Usage](https://docs.github.com/en/billing/managing-billing-for-github-actions)

## Support

For workflow issues or questions:
1. Check this documentation
2. Review GitHub Actions logs
3. Open an issue with workflow logs
4. Contact DevOps team at [devops@example.com]