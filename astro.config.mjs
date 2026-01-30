// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import sitemap from "@astrojs/sitemap";

import robotsTxt from "astro-robots-txt";

// https://astro.build/config
export default defineConfig({
  experimental: {
        fonts: [{
            provider: fontProviders.google(),
            name: "Unna",
            cssVariable: "--font-unna",
            weights: [ "400", "700" ],
            },
            {
                provider: fontProviders.google(),
                name: "Open Sans",
                cssVariable: "--font-open-sans",
                weights: [ "400", "700" ],
        }],
    },
    site: 'https://www.henxhospitality.com',
    integrations: [sitemap(), robotsTxt()]
});
