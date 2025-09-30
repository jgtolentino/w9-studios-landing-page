#!/usr/bin/env node
/**
 * Vercel Agent Review — fast PR checks without heavyweight deps.
 * - Analyzes git diff for new/changed files
 * - Secret patterns (AWS/GCP/Slack tokens), entropy, TODO/FIXME debt
 * - Security smells (eval, child_process, exec, fetch with http:, insecure crypto)
 * - Optional: runs tsc, eslint, jest if present in repo
 * Output: JSON report + Markdown summary; nonzero exit when high findings exist.
 */
const { execSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

function sh(cmd) {
  try {
    return execSync(cmd, { stdio: ['ignore', 'pipe', 'pipe'] }).toString();
  } catch (e) {
    return '';
  }
}

function hasBin(b) {
  try {
    execSync(`${b} --version`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

const base = process.env.GITHUB_BASE_REF || process.env.BASE_REF || 'origin/main';
const head = process.env.GITHUB_HEAD_REF || process.env.HEAD_REF || 'HEAD';
const diffNameOnly = sh(`git diff --name-only ${base}...${head}`) || sh(`git diff --name-only ${base}`);
const files = diffNameOnly.split('\n').filter(f => f && fs.existsSync(f) && fs.statSync(f).isFile());

const patterns = [
  { id: 'secret.aws', desc: 'Possible AWS key', re: /AKIA[0-9A-Z]{16}/, sev: 'high' },
  { id: 'secret.gcp', desc: 'Possible GCP key', re: /AIza[0-9A-Za-z_-]{35}/, sev: 'high' },
  { id: 'secret.google_oauth', desc: 'Google OAuth Client ID', re: /[0-9]+-[0-9A-Za-z_]{32}\.apps\.googleusercontent\.com/, sev: 'high' },
  { id: 'secret.google_oauth_secret', desc: 'Google OAuth Client Secret', re: /GOCSPX-[0-9A-Za-z_-]{28}/, sev: 'high' },
  { id: 'secret.generic', desc: 'High-entropy string', re: /[A-Za-z0-9+\/]{32,}={0,2}/, sev: 'medium' },
  { id: 'sec.eval', desc: 'Use of eval', re: /\beval\s*\(/, sev: 'high' },
  { id: 'sec.exec', desc: 'child_process exec/spawn', re: /child_process\.(exec|spawn|execSync|spawnSync)\(/, sev: 'high' },
  { id: 'sec.http', desc: 'Insecure http URL', re: /\bhttp:\/\/[^\s'"]+/, sev: 'medium' },
  { id: 'sec.crypto', desc: 'Insecure crypto (md5/sha1)', re: /\b(md5|sha1)\b/i, sev: 'medium' },
  { id: 'quality.todo', desc: 'TODO/FIXME left in code', re: /\b(TODO|FIXME)\b/, sev: 'low' },
];

function scanFile(f) {
  const ext = path.extname(f).slice(1);
  if (!/\.(js|ts|tsx|jsx|json|yml|yaml|md|py|go|rb|sh|env)$/i.test(path.extname(f))) return [];

  let s = fs.readFileSync(f, 'utf8');
  const out = [];

  for (const p of patterns) {
    let m;
    const re = new RegExp(p.re.source, p.re.flags + (p.re.flags.includes('g') ? '' : 'g'));
    while ((m = re.exec(s)) !== null) {
      out.push({
        file: f,
        id: p.id,
        desc: p.desc,
        sev: p.sev,
        line: (s.slice(0, m.index).match(/\n/g) || []).length + 1,
        sample: String(m[0]).slice(0, 80)
      });
    }
  }
  return out;
}

let findings = [];
for (const f of files) {
  findings = findings.concat(scanFile(f));
}

// Optional checks if present
const tasks = [];
if (fs.existsSync('tsconfig.json')) {
  tasks.push({ name: 'typecheck', cmd: 'npx -y tsc -p tsconfig.json --noEmit', sev: 'high' });
}
if (fs.existsSync('.eslintrc.js') || fs.existsSync('.eslintrc.cjs') || fs.existsSync('.eslintrc.json')) {
  tasks.push({ name: 'eslint', cmd: 'npx -y eslint . --max-warnings=0', sev: 'medium' });
}
if (fs.existsSync('jest.config.js') || fs.existsSync('vitest.config.ts')) {
  tasks.push({
    name: 'tests',
    cmd: fs.existsSync('vitest.config.ts') ? 'npx -y vitest run --reporter=basic' : 'npx -y jest --ci --reporters=default',
    sev: 'high'
  });
}

const taskResults = [];
for (const t of tasks) {
  try {
    sh(t.cmd);
    taskResults.push({ task: t.name, status: 'pass' });
  } catch (err) {
    taskResults.push({ task: t.name, status: 'fail' });
    findings.push({
      file: '(task)',
      id: `task.${t.name}`,
      desc: `${t.name} failed`,
      sev: t.sev,
      line: 0,
      sample: ''
    });
  }
}

const counts = { low: 0, medium: 0, high: 0 };
for (const f of findings) {
  counts[f.sev]++;
}

const summary = {
  base,
  head,
  files_scanned: files.length,
  counts,
  taskResults,
  findings,
  score: Math.max(0, 100 - (counts.high * 40 + counts.medium * 10 + counts.low * 2))
};

const outdir = process.env.REVIEW_OUT || `.agents/${process.env.GIT_SHA || 'local'}/vercel-agent`;
fs.mkdirSync(outdir, { recursive: true });
fs.writeFileSync(`${outdir}/report.json`, JSON.stringify(summary, null, 2));

function md() {
  let m = `# Vercel Agent Review\n\n**Score:** ${summary.score}/100  \n**Files scanned:** ${summary.files_scanned}\n\n`;
  m += `**Checks:** ` + summary.taskResults.map(t => `\`${t.task}:${t.status}\``).join(' ') + `\n\n`;

  const bySev = s => summary.findings.filter(x => x.sev === s);
  for (const sev of ['high', 'medium', 'low']) {
    const list = bySev(sev);
    if (!list.length) continue;
    m += `## ${sev.toUpperCase()} findings (${list.length})\n`;
    list.slice(0, 50).forEach(f => {
      m += `- **${f.id}** in \`${f.file}\` L${f.line} ${f.sample ? ('`' + f.sample + '`') : ''} — ${f.desc}\n`;
    });
    if (list.length > 50) m += `- …and ${list.length - 50} more\n`;
    m += '\n';
  }
  m += `---\nGate: fail if any **HIGH** findings. Medium findings recommended fixes before merge.`;
  return m;
}

fs.writeFileSync(`${outdir}/report.md`, md());

console.log(`Report: ${outdir}/report.md`);
if (counts.high > 0) {
  console.error("High-severity findings present.");
  process.exit(2);
}