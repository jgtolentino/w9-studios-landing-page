import 'dotenv/config';
import Fastify from 'fastify';
import { z } from 'zod';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const app = Fastify();
const Port = Number(process.env.MCP_PORT || 3845);

if (process.env.MCP_DISABLE === '1') {
  console.error('MCP disabled by MCP_DISABLE=1');
  process.exit(0);
}

const Policy = JSON.parse(fs.readFileSync('.claude/policies/supabase-policy.json', 'utf8'));

const Env = z.object({
  BRUNO_KEYREF_SUPABASE_SERVICE_ROLE: z.string().min(5),
  BRUNO_KEYREF_SUPABASE_URL: z.string().url()
});

const env = Env.parse(process.env);

// Bruno injects secrets at runtime; Claude never sees raw values.
const supabase = createClient(env.BRUNO_KEYREF_SUPABASE_URL, env.BRUNO_KEYREF_SUPABASE_SERVICE_ROLE);

type Json = any;

const audit = (entry: Json) => {
  try {
    fs.appendFileSync(Policy.audit.logFile, JSON.stringify({ ts: Date.now(), ...entry }) + '\n');
  } catch {}
};

app.post('/jsonrpc', async (req, res) => {
  const { id, method, params } = (req.body as any) || {};

  try {
    if (method === 'rpc.call') {
      const name = params?.name as string;
      if (!Policy.allowed.rpc.includes(name)) throw new Error('RPC not allowed');

      const { data, error } = await supabase.rpc(name, params?.args || {});
      if (error) throw error;

      audit({ type: 'rpc', name, ok: true, rows: Array.isArray(data) ? data.length : 1 });
      return res.send({ jsonrpc: '2.0', id, result: data });
    }

    if (method === 'table.select') {
      const table = params?.table as string;
      if (!Policy.allowed.select.includes(table)) throw new Error('SELECT not allowed');

      const limit = Math.min(
        params?.limit || Policy.allowed.limits.maxRows,
        Policy.allowed.limits.maxRows
      );

      const { data, error } = await supabase
        .from(table.replace('public.', ''))
        .select('*')
        .limit(limit);

      if (error) throw error;

      audit({ type: 'select', table, ok: true, rows: Array.isArray(data) ? data.length : 0 });
      return res.send({ jsonrpc: '2.0', id, result: data });
    }

    throw new Error('Method not supported');
  } catch (e: any) {
    audit({ type: 'error', method, msg: e.message });
    return res.send({ jsonrpc: '2.0', id, error: { code: -32000, message: e.message } });
  }
});

app.get('/health', async (_req, res) => res.send({ ok: true }));

app.listen({ port: Port, host: '0.0.0.0' }).then(() => console.log(`MCP up on :${Port}`));
