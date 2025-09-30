#!/usr/bin/env node
const fs = require('fs'), path = require('path');
const inDir = process.env.REVIEW_OUT || `.agents/${process.env.GIT_SHA||'local'}/vercel-agent`;
const src = path.join(inDir, 'report.json');
if (!fs.existsSync(src)) { console.error('No report.json'); process.exit(0); }
const r = JSON.parse(fs.readFileSync(src,'utf8'));
const sevMap = { high: 'error', medium: 'warning', low: 'note' };
const rules = {};
for (const f of r.findings) { rules[f.id] = { id:f.id, shortDescription:{text:f.desc}, defaultConfiguration:{level: sevMap[f.sev]||'warning'} }; }
const results = r.findings.map(f => ({
  ruleId: f.id,
  level: sevMap[f.sev] || 'warning',
  message: { text: `${f.desc}${f.sample?`: ${f.sample}`:''}` },
  locations: [{ physicalLocation: { artifactLocation: { uri: f.file }, region: { startLine: f.line||1 } } }]
}));
const sarif = {
  $schema: "https://json.schemastore.org/sarif-2.1.0.json",
  version: "2.1.0",
  runs: [{ tool: { driver: { name: "Vercel Agent Review", rules: Object.values(rules) } }, results }]
};
const out = path.join(inDir, 'report.sarif');
fs.writeFileSync(out, JSON.stringify(sarif,null,2));
console.log('SARIF:', out);