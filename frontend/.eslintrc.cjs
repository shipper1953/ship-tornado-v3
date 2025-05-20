module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: "detect"
    }
  },
  env: {
    browser: true,
    es2022: true,
    node: true
  },
  plugins: ["react", "react-hooks", "jsx-a11y", "@typescript-eslint", "import"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:storybook/recommended"
  ],
  rules: {
    "react/react-in-jsx-scope": "off", // Not needed with React 17+
    "react/prop-types": "off",         // Using TypeScript instead
    "import/no-unresolved": "error",
    "import/order": [
      "error",
      {
        "alphabetize": { "order": "asc" },
        "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
        "newlines-between": "always"
      }
    ]
  }
};
