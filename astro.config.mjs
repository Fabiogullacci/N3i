// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://n3i.com.ar',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/gracias') && !page.includes('/portal')
    })
  ],
  build: {
    format: 'directory'
  }
});
