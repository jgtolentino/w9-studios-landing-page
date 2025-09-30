# Vercel Agent — Security Hardening

## Enhanced Security Features

### SARIF Reporting
- Findings appear in GitHub → **Security** → **Code scanning alerts**
- Persistent security record with trackable status
- Integration with GitHub Advanced Security (if enabled)

### Dependency Review
- PRs automatically fail on high-severity dependency vulnerabilities
- Supply chain attack prevention
- Comments summary directly in PR

### Optional Deep Scans
Automatically runs if tools are available (CLI or Docker):

#### Semgrep
- Advanced static analysis with rule packs
- OWASP Top 10 coverage
- Language-specific security patterns
- Results in: `.agents/<sha>/vercel-agent/semgrep.json`

#### Gitleaks
- Deep secret scanning across entire git history
- Detects patterns GitHub might miss
- Results in: `.agents/<sha>/vercel-agent/gitleaks.json`

### Gate Policy
- **HIGH findings**: Merge blocked, deployment prevented
- **Dependency vulnerabilities (HIGH)**: PR blocked
- **SARIF alerts**: Tracked in Security tab

## Installation of Optional Tools

### Local Development
```bash
# Semgrep
pip install semgrep
# or
brew install semgrep

# Gitleaks
brew install gitleaks
# or
go install github.com/zricethezav/gitleaks/v8@latest
```

### Docker (Alternative)
Tools will auto-detect and use Docker if CLI not found:
- `returntocorp/semgrep:latest`
- `zricethezav/gitleaks:latest`

## Security Dashboard

View all findings:
1. Go to repository **Security** tab
2. Click **Code scanning**
3. Filter by tool: "Vercel Agent Review"

## Compliance Features

- **SARIF format**: Industry-standard security reporting
- **Audit trail**: All scans archived as artifacts
- **PR template**: Enforces security checklist
- **Dependency tracking**: Full SBOM visibility

## Response Procedures

### When HIGH Finding Detected
1. PR automatically blocked
2. Review finding in PR comment
3. Fix the issue
4. Push fix commit
5. Review re-runs automatically

### Managing False Positives
1. Check Security tab for alert
2. Dismiss with reason if false positive
3. Or add inline suppression comment:
   ```js
   // nosemgrep: rule-id
   // gitleaks:allow
   ```

## Integration Points

- **Vercel**: Deployments blocked on security failures
- **GitHub Security**: Central alert management
- **SIEM**: Export SARIF for enterprise logging
- **Slack/Teams**: Webhook notifications available