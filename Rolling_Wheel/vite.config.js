import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Sets relative paths instead of absolute root (crucial for GitHub Pages subdirectories)
});
