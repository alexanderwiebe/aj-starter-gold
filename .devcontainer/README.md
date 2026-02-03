# Dev Container Setup

## Claude Code Authentication

Claude Code is installed automatically when the container is created. To authenticate it with your existing Claude subscription, follow these steps:

### One-time setup (macOS)

Add this to your `~/.zshenv` to export your OAuth token:

```bash
export CLAUDE_CODE_OAUTH_TOKEN=$(security find-generic-password -s "Claude Code-credentials" -w | jq -r '.claudeAiOauth.accessToken')
```

This extracts your OAuth token from the macOS Keychain and makes it available to applications.

**Prerequisites:** You must have signed into Claude Code on your host machine at least once, and have `jq` installed (`brew install jq`).

### Starting the dev container

1. Source your shell profile (or open a new terminal):
   ```bash
   source ~/.zshenv
   ```

2. Open VS Code from the terminal:
   ```bash
   code /path/to/project
   ```

3. Reopen in container (Cmd+Shift+P -> "Dev Containers: Reopen in Container")

Alternatively, if you started the container via CLI:
- Cmd+Shift+P -> "Dev Containers: Attach to Running Container..."

### How it works

The `devcontainer.json` is configured to:
1. Mount `~/.claude` from the host into the container
2. Forward `CLAUDE_CODE_OAUTH_TOKEN` from the host environment via `remoteEnv`
3. Install Claude Code globally via `postCreateCommand`

### Troubleshooting

**Token not being passed to container:**
- Ensure you launched VS Code from a terminal (not Dock/Spotlight)
- Verify the token is set: `echo $CLAUDE_CODE_OAUTH_TOKEN`
- Rebuild the container after setting the env var

**Token expired:**
- Sign into Claude Code on your host machine again
- Re-source `~/.zshenv`
- Rebuild the container

**"No such keychain item" error:**
- Sign into Claude Code on your host machine first: `claude`
