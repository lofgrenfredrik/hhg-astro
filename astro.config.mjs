// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

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
        }]
    }
});
