// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Required for GitHub Pages when the site is at username.github.io/REPO_NAME/
  // Use '/' if this is a user/org site (username.github.io).
  base: '/CBDS-website/',
  vite: {
    plugins: [tailwindcss()]
  }
});