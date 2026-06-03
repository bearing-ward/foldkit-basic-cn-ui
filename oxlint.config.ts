import { defineConfig } from "oxlint";
import core from "ultracite/oxlint/core";

export default defineConfig({
  extends: [core],
  ignorePatterns: [...core.ignorePatterns, "repos/**", "**/repos/**"],
  rules: {
    "no-empty-function": "off",
    "no-nested-ternary": "off",
    "no-shadow": "off",
    "sort-keys": "off",
    "typescript/no-inferrable-types": "off",
    "unicorn/consistent-function-scoping": "off",
    "unicorn/filename-case": "off",
    "unicorn/no-array-for-each": "off",
    "unicorn/no-array-method-this-argument": "off",
    "unicorn/no-nested-ternary": "off",
    "unicorn/no-useless-undefined": "off",
    "vitest/no-conditional-expect": "off",
  },
  overrides: [
    {
      files: ["src/ui/view/checkbox.ts"],
      rules: {
        "no-use-before-define": "off",
      },
    },
  ],
});
