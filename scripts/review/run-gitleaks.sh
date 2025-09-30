#!/usr/bin/env bash
set -euo pipefail
OUT=".agents/${GIT_SHA:-local}/vercel-agent"
mkdir -p "$OUT"
if command -v gitleaks >/dev/null 2>&1; then
  gitleaks detect --no-banner --log-opts="--all" -f json -r "$OUT/gitleaks.json" || true
elif command -v docker >/dev/null 2>&1; then
  docker run --rm -v "$PWD:/repo" zricethezav/gitleaks:latest detect --no-banner --log-opts="--all" -f json -r "/repo/$OUT/gitleaks.json" || true
else
  echo "gitleaks not available; skipping" | tee "$OUT/gitleaks.skip.txt"
fi