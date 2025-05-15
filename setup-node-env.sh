#!/bin/bash

echo "▶️ Installing NVM..."

# Download and run nvm installer
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

echo "✅ NVM installed."

echo "📦 Configuring your ~/.zshrc..."

# Ensure nvm loads automatically in zsh
cat << 'EOF' >> ~/.zshrc

# Load NVM automatically
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
EOF

# Reload zshrc in current session
source ~/.zshrc

echo "🚀 Installing latest LTS Node version..."
nvm install --lts
nvm use --lts
nvm alias default node

echo "✅ Node.js version: $(node -v)"
echo "✅ NPM version: $(npm -v)"

echo "📄 Creating .nvmrc with current node version..."
node -v > .nvmrc

echo "💡 Optional: Add automatic `.nvmrc` switching to your shell"
cat << 'EOF' >> ~/.zshrc

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
