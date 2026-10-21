# Setup Claude Code di repo ini

- **Aturan proyek**: `CLAUDE.md` (stack, lokasi spec, workflow, hemat token, kebijakan git, perintah).
- **Command**: `/feature <nama>` (alur wajib), `/figma-spec`, `/ui-check`, plus dari ECC: `/test-coverage`, `/build-fix`, `/code-review`.
- **Agent** (ECC): `typescript-reviewer`, `build-error-resolver`, `security-reviewer`, `a11y-architect`.
- **Skill** (ECC): `tdd-workflow`, `frontend-patterns`, `frontend-a11y`, `accessibility`, `security-review`.
- **Rules** (ECC): `rules/common`, `rules/typescript`, `rules/web` (aktif per path lewat frontmatter `paths:`).
- **Hooks** (`.claude/settings.json`): PostToolUse Edit|Write → `hooks/format.sh` (Prettier + ESLint pada file yang diubah); PreToolUse Bash → `hooks/block-git-commit.sh` (menolak `git commit`/`git push`).
- **Permission**: allow perintah rutin (pnpm test/build/lint/format/check, graphify, git status/diff/log); deny commit/push dan membaca `.env*`.
- **Override personal** (tidak di-commit): `.claude/settings.local.json`, `CLAUDE.local.md`.
- **Graphify**: `graphify update .` setelah mengubah kode; `graphify query "<pertanyaan>"` sebelum membaca file.

Memperbarui komponen ECC: bandingkan dengan `~/everything-claude-code` (git pull dulu), terapkan hanya untuk file yang belum disesuaikan (yang disesuaikan: `skills/tdd-workflow/SKILL.md` path script).
