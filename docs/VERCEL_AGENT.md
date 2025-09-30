# Vercel Agent (Pre-merge Reviewer)

## Overview

The Vercel Agent is an automated code review system that runs on every pull request to ensure code quality and security before deployment. It **blocks merges and deployments** when critical issues are detected.

## Features

### Security Scanning
- **AWS Keys Detection**: Identifies exposed AWS access keys
- **Google OAuth Credentials**: Detects exposed OAuth client IDs and secrets
- **GCP Keys**: Finds exposed Google Cloud Platform API keys
- **High-Entropy Secrets**: Identifies potential secrets using entropy analysis
- **Security Vulnerabilities**: Detects dangerous patterns like:
  - `eval()` usage
  - `child_process.exec()` calls
  - Insecure HTTP URLs
  - Weak cryptography (MD5, SHA1)

### Code Quality Checks
- **TODO/FIXME Comments**: Tracks technical debt
- **TypeScript Validation**: Runs type checking (if `tsconfig.json` exists)
- **ESLint**: Enforces code style (if configured)
- **Jest/Vitest**: Runs tests (if configured)

## How It Works

1. **Triggers on PR Events**:
   - Pull request opened
   - New commits pushed
   - PR reopened
   - PR marked ready for review

2. **Analyzes Changed Files**:
   - Scans only files modified in the PR
   - Runs pattern matching for security issues
   - Executes optional quality checks

3. **Generates Report**:
   - Creates JSON and Markdown reports
   - Calculates quality score (0-100)
   - Posts findings as PR comment

4. **Gates Deployment**:
   - **HIGH severity findings**: ❌ Blocks merge (exit code 2)
   - **MEDIUM severity**: ⚠️ Warning, recommended to fix
   - **LOW severity**: ℹ️ Informational

## Severity Levels

| Level | Examples | Action |
|-------|----------|--------|
| **HIGH** | AWS keys, OAuth secrets, eval(), exec() | Blocks merge |
| **MEDIUM** | High-entropy strings, HTTP URLs, weak crypto | Warning |
| **LOW** | TODO/FIXME comments | Informational |

## Local Testing

Run the review locally before pushing:

```bash
# Review changes against main branch
BASE_REF=origin/main HEAD_REF=HEAD node scripts/review/run-review.js

# Review specific branches
BASE_REF=main HEAD_REF=feature/my-branch node scripts/review/run-review.js
```

## GitHub Configuration

### Enable the Workflow

Set the repository variable to enable CI:

```bash
gh variable set CI_ENABLED --repo jgtolentino/w9-studios-landing-page --body "1"
```

### Make Check Required (Block Merges)

1. Go to **Settings → Branches**
2. Edit protection rules for `main` branch
3. Under **Require status checks to pass before merging**:
   - Check **Require branches to be up to date before merging**
   - Search and add: **Vercel Agent Review**
4. Save changes

Now:
- ✅ PRs can only merge when review passes
- ✅ Vercel won't deploy failing PRs to production
- ✅ Preview deployments still work for testing

## Report Output

Reports are saved to: `.agents/<git-sha>/vercel-agent/`

- `report.json`: Machine-readable findings
- `report.md`: Human-readable Markdown report

### Sample Report

```markdown
# Vercel Agent Review

**Score:** 60/100
**Files scanned:** 12

**Checks:** `typecheck:pass` `eslint:pass`

## HIGH findings (2)
- **secret.google_oauth** in `.env.local` L2 `916601142061-acq...` — Google OAuth Client ID
- **sec.eval** in `utils/dynamic.js` L45 `eval(userInput)` — Use of eval

## MEDIUM findings (3)
- **sec.http** in `config.js` L12 `http://api.example.com` — Insecure http URL
...

---
Gate: fail if any **HIGH** findings. Medium findings recommended fixes before merge.
```

## Troubleshooting

### Review Not Running

Check if CI is enabled:
```bash
gh variable get CI_ENABLED --repo jgtolentino/w9-studios-landing-page
```

### False Positives

To exclude files from scanning, modify the patterns in `scripts/review/run-review.js`.

### Custom Rules

Add new patterns to the `patterns` array:
```javascript
{
  id: 'custom.rule',
  desc: 'Description',
  re: /pattern/,
  sev: 'high'
}
```

## Integration with Vercel

The Vercel Agent integrates seamlessly with Vercel's deployment system:

1. **Preview Deployments**: Always created (even with findings)
2. **Production Deployments**: Blocked if HIGH severity issues
3. **Automatic Retries**: Re-runs on new commits

## SuperClaude Integration

The agent is part of the SuperClaude framework:

- **Agent**: `pulser/agents/vercel-agent-reviewer.yaml`
- **Lane**: `pulser/lanes/vercel_agent_review.yaml`
- **Bruno Tool**: `bruno/tools/vercel-agent.yaml`

## Best Practices

1. **Fix HIGH Issues Immediately**: These block deployment
2. **Address MEDIUM Issues**: Before final merge
3. **Track LOW Issues**: Create tickets for technical debt
4. **Run Locally First**: Test before pushing
5. **Keep Secrets in Environment**: Never commit credentials

## Support

For issues or questions:
- Check the workflow logs in GitHub Actions
- Review artifacts in `.agents/` directory
- Open an issue in the repository