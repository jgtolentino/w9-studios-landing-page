#!/usr/bin/env bash
set -euo pipefail
# Uses semgrep if available (semgrep CLI or docker). No-op otherwise.
OUT=".agents/${GIT_SHA:-local}/vercel-agent"
mkdir -p "$OUT"
if command -v semgrep >/dev/null 2>&1; then
  semgrep scan --config p/ci --json --error --output "$OUT/semgrep.json" || true
elif command -v docker >/dev/null 2>&1; then
  docker run --rm -v "$PWD:/src" returntocorp/semgrep semgrep scan --config p/ci --json --error --output "/src/$OUT/semgrep.json" || true
else
  echo "semgrep not available; skipping" | tee "$OUT/semgrep.skip.txt"
fi