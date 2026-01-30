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
        csp: {
            directives: [
                "default-src 'self'",
                "img-src 'self' https://res.cloudinary.com",
                "connect-src 'self'",
                "frame-ancestors 'none'"
            ],
            styleDirective: {
                resources: [
                "'self'", "'unsafe-inline'", "'unsafe-eval'"
                ]
            },
            scriptDirective: {
                resources: [
                "'self'", "'unsafe-inline'"
                ]
            }
        },
    },
    site: 'https://www.henxhospitality.com',
    integrations: [sitemap(), robotsTxt()]
});
