# Branch Protection Recommendations

This document outlines recommended branch protection rules for the Unified Contractors repository to ensure code quality and maintain a stable main branch.

## Main/Master Branch Protection

### Required Settings

1. **Require a pull request before merging**
   - Require approvals: 1-2 reviewers (depending on team size)
   - Dismiss stale pull request approvals when new commits are pushed
   - Require review from CODEOWNERS (if configured)
   - Require approval of the most recent reviewable push

2. **Require status checks to pass before merging**
   - Require branches to be up to date before merging
   - Required status checks:
     - `CI Pipeline / Lint and Test (18.x)`
     - `CI Pipeline / Lint and Test (20.x)`
     - `CI Pipeline / Lint and Test (22.x)`
     - `CI Pipeline / Build Application`
     - `CI Pipeline / Security Vulnerability Scan` (optional but recommended)

3. **Require conversation resolution before merging**
   - Ensures all PR comments and discussions are addressed

4. **Require signed commits** (optional but recommended)
   - Adds an extra layer of security by verifying commit authorship

5. **Include administrators**
   - Apply these rules to administrators as well (recommended for production)

6. **Restrict who can push to matching branches**
   - Limit direct pushes to specific users or teams
   - Prevent force pushes and deletions

## Development Branch Protection (if applicable)

For a `develop` or `staging` branch:

1. **Require a pull request before merging**
   - Require at least 1 approval
   - Do not dismiss stale reviews (more flexible)

2. **Require status checks to pass**
   - At minimum: lint and test checks
   - Build check recommended

3. **Allow force pushes** (optional)
   - Only for specific users/admins
   - Use with caution

## How to Configure in GitHub

1. Navigate to your repository on GitHub
2. Go to **Settings** → **Branches**
3. Click **Add rule** or edit existing rules
4. Enter branch name pattern (e.g., `main`, `master`, `develop`)
5. Configure the protection rules as outlined above
6. Click **Create** or **Save changes**

## Automated Configuration Script

You can use GitHub CLI to configure branch protection:

```bash
# Install GitHub CLI if not already installed
# brew install gh (macOS)
# or visit: https://cli.github.com/

# Authenticate
gh auth login

# Configure main branch protection
gh api repos/:owner/:repo/branches/main/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["CI Pipeline / Lint and Test (20.x)","CI Pipeline / Build Application"]}' \
  --field enforce_admins=true \
  --field required_pull_request_reviews='{"required_approving_review_count":1,"dismiss_stale_reviews":true}' \
  --field restrictions=null \
  --field allow_force_pushes=false \
  --field allow_deletions=false
```

## Best Practices

1. **Start with minimal protection** and gradually increase as the team adapts
2. **Document exceptions** when protection rules need to be bypassed
3. **Regular reviews** of protection rules to ensure they meet current needs
4. **Emergency procedures** documented for critical fixes that need expedited merging
5. **CODEOWNERS file** to automatically request reviews from relevant team members

## CODEOWNERS Configuration (Optional)

Create a `.github/CODEOWNERS` file:

```
# Global owners
* @teamlead @senior-developer

# Frontend specific
/src/components/ @frontend-team
/src/views/ @frontend-team
*.vue @frontend-team

# Configuration files
/vite.config.js @devops-team
/.github/ @devops-team
/package.json @teamlead

# Documentation
*.md @documentation-team
```

## Bypass Procedures

In case of emergency deployments:

1. **Document the reason** for bypassing protection
2. **Get verbal approval** from team lead/manager
3. **Create an issue** documenting what was bypassed and why
4. **Follow up** with proper PR after emergency is resolved
5. **Review the incident** in the next team meeting

## Monitoring and Compliance

- Review branch protection settings monthly
- Audit bypass incidents quarterly
- Track PR approval times to ensure rules aren't causing bottlenecks
- Adjust rules based on team feedback and development velocity

## Additional Security Recommendations

1. **Enable Dependabot** for automated security updates
2. **Configure secret scanning** to prevent credential leaks
3. **Enable code scanning** with CodeQL for vulnerability detection
4. **Set up security advisories** for responsible disclosure
5. **Regular security audits** of dependencies and code

## Contact

For questions or changes to branch protection rules, contact:
- Repository Admin: [admin-email]
- DevOps Team: [devops-email]
- Security Team: [security-email]