.PHONY: mcp fs supabase tunnel tunnel-off

MCP_PORT ?= 3845

mcp:
	node mcp/bruno-supabase/server.ts

fs:
	mcp-filesystem --allow "$(PWD)" --deny "/" --deny "/Users"

tunnel: ## Requires Cloudflare Access configured; protect with JWT + IP allowlist.
	cloudflared tunnel run mcp --url http://localhost:$(MCP_PORT)

tunnel-off:
	pkill -f cloudflared || true
