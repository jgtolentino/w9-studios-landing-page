# MCP Usage (Filesystem + Bruno Supabase)

## Overview

This project integrates two Model Context Protocol (MCP) servers for secure, controlled data access:

1. **Filesystem MCP** - Scoped to project root only
2. **Bruno Supabase MCP** - Read-only via whitelisted RPCs/views

## Security Model

### Zero-Secret Architecture
- **Claude never sees credentials** - All secrets injected by Bruno at runtime
- **Bruno vault integration** - Credentials stored in `~/.bruno/vault/`
- **Environment variable references** - Use `@bruno:keychain/*` pattern
- **Audit logging** - All MCP requests logged to `.claude/logs/`

### Access Controls

**Filesystem MCP:**
- ✅ Allowed: Project root (`~/Documents/W9/wix-nextjs-migration`)
- ❌ Denied: System root (`/`), user directory (`/Users`)

**Supabase MCP:**
- ✅ Allowed: Whitelisted RPCs and views only
- ❌ Denied: All DDL, DML write operations (ALTER, DROP, INSERT, UPDATE, DELETE)
- ✅ Row limits: 5000 max per query
- ✅ Timeout: 8000ms per request

## Configuration

### Policy File
Located at `.claude/policies/supabase-policy.json`:

```json
{
  "allowed": {
    "rpc": ["get_dashboard_kpis", "search_creatives", "list_transactions"],
    "select": ["public.kpis_view", "public.creatives_view"],
    "limits": { "maxRows": 5000, "timeoutMs": 8000 }
  },
  "denied": {
    "sqlPatterns": ["ALTER ", "DROP ", "GRANT ", "CREATE ", "TRUNCATE ", "DELETE ", "UPDATE ", "INSERT "]
  },
  "audit": {
    "logFile": ".claude/logs/supabase_mcp_audit.log"
  }
}
```

### MCP Server Configuration
Located at `.claude/.mcp.json`:

```json
{
  "servers": {
    "fs": {
      "command": "mcp-filesystem",
      "args": ["--allow", "${PWD}", "--deny", "/", "--deny", "/Users"],
      "disabled": false
    },
    "bruno-supabase": {
      "command": "node",
      "args": ["mcp/bruno-supabase/server.ts"],
      "env": {
        "BRUNO_KEYREF_SUPABASE_SERVICE_ROLE": "@bruno:keychain/SUPABASE_SERVICE_ROLE",
        "BRUNO_KEYREF_SUPABASE_URL": "@bruno:keychain/SUPABASE_URL",
        "MCP_DISABLE": "0"
      },
      "disabled": false
    }
  }
}
```

## Running MCP Servers

### Start Supabase MCP
```bash
yarn mcp
```

**Prerequisites:**
- Bruno must inject `@bruno:keychain/SUPABASE_SERVICE_ROLE`
- Bruno must inject `@bruno:keychain/SUPABASE_URL`

### Disable MCP (Kill Switch)
```bash
yarn mcp:off
# or
MCP_DISABLE=1 yarn mcp
```

### Start Filesystem MCP
```bash
make fs
```

## Tunnel Configuration (DISABLED by default)

### ⚠️ Security Warning
Tunnels expose MCP servers to network access. **Only enable with proper security:**

1. **Cloudflare Access** with JWT authentication
2. **IP Allowlist** restricting source IPs
3. **Short TTL** for tunnel sessions
4. **Audit logging** for all tunnel access

### Enable Tunnel (Advanced)
```bash
make tunnel
```

**Requirements:**
- Cloudflare account with Access configured
- `cloudflared` installed and authenticated
- JWT verification enabled
- IP allowlist configured

### Disable Tunnel
```bash
make tunnel-off
```

## Audit Logs

All MCP requests are logged to `.claude/logs/supabase_mcp_audit.log`:

```json
{"ts":1696234567890,"type":"rpc","name":"get_dashboard_kpis","ok":true,"rows":42}
{"ts":1696234568123,"type":"select","table":"public.kpis_view","ok":true,"rows":100}
{"ts":1696234569456,"type":"error","method":"rpc.call","msg":"RPC not allowed"}
```

**Log Fields:**
- `ts` - Unix timestamp (milliseconds)
- `type` - Operation type (rpc, select, error)
- `name/table` - Target RPC or table
- `ok` - Success boolean
- `rows` - Result row count
- `msg` - Error message (if applicable)

## Adding New RPCs/Views

Edit `.claude/policies/supabase-policy.json`:

```json
{
  "allowed": {
    "rpc": [
      "get_dashboard_kpis",
      "your_new_rpc_name"  // Add here
    ],
    "select": [
      "public.kpis_view",
      "public.your_new_view"  // Add here
    ]
  }
}
```

**Then restart MCP:**
```bash
yarn mcp:off
yarn mcp
```

## Troubleshooting

### MCP Server Won't Start
```bash
# Check environment
cat .env.local

# Verify policy file
cat .claude/policies/supabase-policy.json

# Check logs
tail -f .claude/logs/supabase_mcp_audit.log
```

### "RPC not allowed" Error
- Check policy file: `.claude/policies/supabase-policy.json`
- Ensure RPC name is in `allowed.rpc` array
- Restart MCP server after policy changes

### "SELECT not allowed" Error
- Check policy file: `.claude/policies/supabase-policy.json`
- Ensure table/view is in `allowed.select` array
- Use fully qualified names (e.g., `public.view_name`)

### Filesystem Access Denied
- Verify path is within project root
- Check MCP config: `.claude/.mcp.json`
- Ensure `--allow` includes project directory

## Best Practices

1. **Minimal Permissions** - Only whitelist necessary RPCs/views
2. **Audit Regularly** - Review `.claude/logs/` for suspicious activity
3. **Rotate Credentials** - Update Bruno vault secrets periodically
4. **No Tunnels in Production** - Keep MCP servers local-only
5. **Version Control** - Keep policy files in git, exclude logs
6. **Test Before Deploy** - Validate policy changes locally first

## Related Documentation

- [POLICY.md](.claude/POLICY.md) - Network & secrets guardrails
- [Supabase Policy](. claude/policies/supabase-policy.json) - Access control configuration
- [MCP Config](.claude/.mcp.json) - Server configuration
- [Makefile](Makefile) - MCP commands and tunnel controls

---

**Security Note:** Never commit credentials or audit logs to version control. Always use Bruno vault for secrets management.
