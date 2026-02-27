import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  // https://<あなたのGitHubのユーザー名>.github.io
  site: 'https://KazuhiroIi.github.io',

  // GitHubでのレポジトリ名
  base: 'ridai-astro-handson',

  adapter: cloudflare()
});