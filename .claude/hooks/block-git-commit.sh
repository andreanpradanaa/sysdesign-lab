#!/usr/bin/env bash
# PreToolUse (Bash): tolak perintah yang menjalankan `git commit` atau `git push`.
# Hanya memeriksa AWAL tiap segmen perintah (setelah ; && || | atau awal baris), dengan prefix
# opsional seperti sudo/env/cd … &&. Teks "git commit" di dalam echo/heredoc/komentar tidak terkena.
set -u
INPUT=$(cat)
CMD=$(printf '%s' "$INPUT" | jq -r '.tool_input.command // empty' 2>/dev/null)
[ -z "$CMD" ] && exit 0

# Buang isi heredoc (<<EOF ... EOF, <<'EOF', <<-EOF) agar teks di dalamnya tidak ikut dicek.
STRIPPED=$(printf '%s\n' "$CMD" | awk '
  BEGIN { inside = 0; tag = "" }
  {
    if (inside) { if ($0 ~ ("^[[:space:]]*" tag "[[:space:]]*$")) { inside = 0 }; next }
    line = $0
    if (match(line, /<<-?[[:space:]]*['"'"'"]?[A-Za-z_][A-Za-z0-9_]*['"'"'"]?/)) {
      tag = substr(line, RSTART, RLENGTH)
      sub(/<<-?[[:space:]]*/, "", tag); gsub(/['"'"'"]/, "", tag)
      print substr(line, 1, RSTART - 1)
      inside = 1
      next
    }
    print line
  }')

# Pecah jadi segmen pada ; && || | dan newline, lalu cek awal segmen.
# Pakai process substitution (bukan pipe) supaya `exit 2` di dalam loop menghentikan skrip.
while IFS= read -r seg; do
  # buang spasi awal dan prefix umum (sudo, env VAR=x, command, exec, nohup, VAR=x)
  s=$(printf '%s' "$seg" | sed -E 's/^[[:space:]]+//; s/^(sudo( -[A-Za-z]+)*[[:space:]]+)?//; s/^(env[[:space:]]+([A-Za-z_][A-Za-z0-9_]*=[^[:space:]]*[[:space:]]+)*)?//; s/^(command|exec|nohup)[[:space:]]+//; s/^([A-Za-z_][A-Za-z0-9_]*=[^[:space:]]*[[:space:]]+)*//')
  if printf '%s' "$s" | grep -Eq '^git([[:space:]]+-[^[:space:]]*([[:space:]]+[^-[:space:]][^[:space:]]*)?)*[[:space:]]+(commit|push)([[:space:]]|$)'; then
    echo "DITOLAK oleh hook: '$s' — kebijakan repo: Claude tidak commit/push. Usulkan pesan commit, user yang commit." >&2
    exit 2
  fi
done < <(printf '%s\n' "$STRIPPED" | tr ';' '\n' | sed -E 's/\|\|/\n/g; s/&&/\n/g; s/\|/\n/g')
exit 0
