#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PORT="${PORT:-3307}"
BASE="http://127.0.0.1:${PORT}"
OUT_DIR="$ROOT/docs/screenshots"

mkdir -p "$OUT_DIR"

cleanup() {
  if [[ -n "${DEV_PID:-}" ]] && kill -0 "$DEV_PID" 2>/dev/null; then
    kill "$DEV_PID" || true
    wait "$DEV_PID" 2>/dev/null || true
  fi
}
trap cleanup EXIT

cd "$ROOT"

echo "[screenshot] starting next dev on :$PORT"
PORT="$PORT" npm run dev >/tmp/freedomcity-dev.log 2>&1 &
DEV_PID=$!

for i in {1..45}; do
  if curl -fsS "$BASE" >/dev/null 2>&1; then
    break
  fi
  sleep 1
done

curl -fsS "$BASE" >/dev/null

echo "[screenshot] capturing pages"
npx -y playwright screenshot "$BASE" "$OUT_DIR/home.png"
npx -y playwright screenshot "$BASE/login" "$OUT_DIR/login.png"
npx -y playwright screenshot "$BASE/app" "$OUT_DIR/app-dashboard.png"
npx -y playwright screenshot "$BASE/board" "$OUT_DIR/board.png"

echo "[screenshot] done -> $OUT_DIR"
