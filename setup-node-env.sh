#!/bin/zsh

set -e

echo "▶️ Installing NVM..."

export NVM_DIR="$HOME/.nvm"
if [ ! -d "$NVM_DIR" ]; then
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
fi

# Load NVM
export NVM_DIR="$HOME/.nvm"
[[ -s "$NVM_DIR/nvm.sh" ]] && source "$NVM_DIR/nvm.sh"
[[ -s "$NVM_DIR/bash_completion" ]] && source "$NVM_DIR/bash_completion"

echo "✅ NVM installed."

echo "📦 Ensuring Node LTS is installed..."
nvm install --lts
nvm use --lts
nvm alias default 'lts/*'

echo "✅ Node.js version: $(node -v)"
echo "✅ NPM version: $(npm -v)"

echo "📄 Creating .nvmrc with current Node version..."
node -v > .nvmrc

echo "💡 Adding automatic Node version switching to ~/.zshrc (if not already present)..."
grep -q 'load-nvmrc' ~/.zshrc || cat << 'EOF' >> ~/.zshrc

# Auto-switch node versions using .nvmrc
autoload -U add-zsh-hook

load-nvmrc() {
  local node_version="$(nvm version)"
  local nvmrc_path="$(nvm_find_nvmrc)"

  if [ -n "$nvmrc_path" ]; then
    local nvmrc_node_version=$(cat "$nvmrc_path")

    if [ "$nvmrc_node_version" != "$node_version" ]; then
      nvm use "$nvmrc_node_version"
    fi
  fi
}

add-zsh-hook chpwd load-nvmrc
load-nvmrc
EOF

echo "✅ Done. Restart your terminal or run: source ~/.zshrc"
