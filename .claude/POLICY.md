# Network & Secrets Guardrails

## Security Policy

### Core Principles

1. **Zero Trust** - Never trust, always verify
2. **Minimal Exposure** - Expose only what's necessary
3. **Defense in Depth** - Multiple security layers
4. **Audit Everything** - Complete request logging

## Network Security

### Tunnel Policy (DEFAULT: DISABLED)

**Tunnels are disabled by default** to prevent unauthorized network access.

#### When Tunnels Are Allowed
Only enable tunnels when ALL of the following are configured:

1. **Cloudflare Access** with JWT authentication
2. **IP Allowlist** restricting source addresses
3. **Short TTL** (max 4 hours) for tunnel sessions
4. **Audit Logging** for all tunnel access

#### Enabling Tunnels

```bash
# ONLY after configuring Cloudflare Access
make tunnel
```

#### Disabling Tunnels

```bash
make tunnel-off
```

### Network Restrictions

- ✅ Local-only MCP servers (127.0.0.1)
- ❌ Public internet exposure without authentication
- ❌ Long-lived tunnel sessions (>4 hours)
- ❌ Unauthenticated tunnel access

## Secrets Management

### Bruno Vault Architecture

**Claude never receives raw credentials.** All secrets are:

1. Stored in Bruno vault (`~/.bruno/vault/`)
2. Referenced via `@bruno:keychain/*` pattern
3. Injected at runtime by Bruno
4. Never logged or exposed

### Required Vault Secrets

```bash
~/.bruno/vault/
├── SUPABASE_URL
├── SUPABASE_SERVICE_ROLE
├── wix_client_id
└── wix_client_secret
```

### Creating Vault Secrets

```bash
# Create vault directory
mkdir -p ~/.bruno/vault

# Add secrets
echo "your-supabase-url" > ~/.bruno/vault/SUPABASE_URL
echo "your-service-role-key" > ~/.bruno/vault/SUPABASE_SERVICE_ROLE

# Secure permissions
chmod 600 ~/.bruno/vault/*
```

### Environment Variables

**NEVER commit these to version control:**

```bash
# .env.local (gitignored)
NEXT_PUBLIC_WIX_CLIENT_ID=your-client-id
NEXT_PUBLIC_SITE_URL=https://your-site.com
```

**Use references in config:**

```json
{
  "env": {
    "BRUNO_KEYREF_SUPABASE_URL": "@bruno:keychain/SUPABASE_URL"
  }
}
```

## Access Control

### Supabase MCP Policy

#### Allowed Operations
- ✅ Whitelisted RPC calls
- ✅ SELECT from approved views
- ✅ Max 5000 rows per query
- ✅ 8000ms timeout per request

#### Denied Operations
- ❌ Raw SQL queries
- ❌ DDL operations (ALTER, DROP, CREATE)
- ❌ Write operations (INSERT, UPDATE, DELETE)
- ❌ Schema modifications
- ❌ User/role management

### Filesystem MCP Policy

#### Allowed Paths
- ✅ Project root: `~/Documents/W9/wix-nextjs-migration`
- ✅ Subdirectories within project

#### Denied Paths
- ❌ System root: `/`
- ❌ User directory: `/Users`
- ❌ System directories: `/etc`, `/var`, `/usr`
- ❌ Parent directories: `../`

## Audit & Monitoring

### Audit Logs

**Location:** `.claude/logs/supabase_mcp_audit.log`

**What's Logged:**
- Timestamp of every request
- Operation type (RPC, SELECT, error)
- Target resource (RPC name, table name)
- Success/failure status
- Row counts
- Error messages

**Log Format:**
```json
{"ts":1696234567890,"type":"rpc","name":"get_kpis","ok":true,"rows":42}
```

### Log Retention

- **Keep:** 30 days minimum
- **Review:** Weekly for suspicious activity
- **Rotate:** Monthly to prevent disk bloat

### Monitoring Checklist

- [ ] Review audit logs weekly
- [ ] Check for unauthorized access attempts
- [ ] Verify tunnel status (should be OFF)
- [ ] Confirm vault permissions (600)
- [ ] Validate policy file hasn't been modified

## Incident Response

### Security Breach Procedure

1. **Immediate Actions**
   ```bash
   # Disable MCP
   yarn mcp:off

   # Kill tunnels
   make tunnel-off

   # Rotate credentials
   # (Update vault secrets)
   ```

2. **Investigation**
   - Review audit logs
   - Check git history for unauthorized changes
   - Verify policy files integrity

3. **Remediation**
   - Update compromised credentials
   - Tighten access controls
   - Document incident

4. **Prevention**
   - Review and update policies
   - Implement additional controls
   - Train team on security practices

### Kill Switch

**Emergency disable:** Set `MCP_DISABLE=1` environment variable

```bash
# Immediate shutdown
MCP_DISABLE=1 yarn mcp
```

## Compliance

### Data Protection

- **PII Handling:** No PII in logs or audit trails
- **Data Minimization:** Query only necessary data
- **Encryption:** All data in transit (HTTPS/TLS)
- **Retention:** Follow data retention policies

### Access Auditing

All MCP operations are audited:
- Who (implicitly via Bruno session)
- What (operation type, target)
- When (timestamp)
- Result (success/failure, row count)

## Policy Updates

### Making Changes

1. Update policy file: `.claude/policies/supabase-policy.json`
2. Test changes locally
3. Review with security team
4. Commit to version control
5. Restart MCP server
6. Verify in audit logs

### Approval Required For

- Adding new RPCs/views
- Increasing row limits
- Extending timeout values
- Enabling tunnels
- Modifying denied patterns

## References

- [README_MCP.md](../README_MCP.md) - MCP usage guide
- [Supabase Policy](./policies/supabase-policy.json) - Access control config
- [MCP Config](./.mcp.json) - Server configuration

---

**Last Updated:** 2025-10-03
**Policy Version:** 1.0
**Review Frequency:** Quarterly
