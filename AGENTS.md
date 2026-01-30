# HHG Astro - Agent Guidelines

This file contains guidelines for AI agents working on the HHG Astro project.

## Project Overview

This is an Astro 5-based static website for Henx Hospitality Group (HHG), a luxury hospitality company. The project uses:
- Astro 5.16.11 with TypeScript
- Regular CSS for styling (via CSS custom properties) in
- Cloudinary integration for asset management
- Google Fonts integration (Unna, Open Sans)

## Build/Development Commands

```bash
# Development
pnpm dev              # Start dev server at localhost:4321

# Build & Preview
pnpm build           # Build production site to ./dist/
pnpm preview         # Preview build locally

# Astro CLI
pnpm astro ...       # Run CLI commands like astro add, astro check
pnpm astro -- --help # Get help using the Astro CLI
```

## Project Structure

```
src/
├── assets/          # Static assets (images, etc.)
├── components/      # Astro components (Header.astro, Hero.astro, etc.)
├── content/         # Content collections (Cloudinary integration)
├── layouts/         # Page layouts (Layout.astro)
├── pages/           # Route pages (index.astro, events.astro)
└── global.css       # Global styles and CSS variables
```

## Code Style Guidelines

### File Naming & Organization
- Component files: PascalCase (e.g., `Header.astro`, `Hero.astro`)
- Page files: lowercase (e.g., `index.astro`, `events.astro`)
- Layout files: PascalCase (e.g., `Layout.astro`)
- Use descriptive names that reflect component purpose

### Astro Component Structure
```astro
---
// Imports at the top
import Component from "../components/Component.astro";
import Asset from "../assets/asset.png";
---

<!-- HTML structure -->
<main>
  <Component />
</main>

<style>
  /* Component-specific styles */
  /* Use CSS custom properties from global.css */
</style>
```

### Import Conventions
- Use relative imports with `../` notation
- Group imports: Astro framework first, then components, then assets
- No default exports for components (use Astro's file-based routing)

### TypeScript & Types
- All files should be type-safe (extends `astro/tsconfigs/strict`)
- Use `@ts-check` comments in config files
- Prefer explicit types for complex data structures
- Use Astro's built-in type definitions

### CSS/Styling Guidelines
- Use CSS custom properties defined in `global.css`
- Responsive design with mobile-first approach
- Use semantic HTML5 elements
- Component-scoped styles in `<style>` tags
- Leverage CSS variables for consistent theming:
  - `--foreground`, `--muted-foreground`
  - `--primary`, `--primary-light`
  - `--background`, `--border-color`

### Error Handling
- Use Astro's error boundaries where appropriate
- Validate props in component frontmatter
- Handle Cloudinary asset loading errors gracefully

### Performance Guidelines
- Use `priority` prop for important images
- Specify appropriate image formats: `["avif", "webp"]`
- Leverage Astro's automatic code splitting
- Use `<Picture>` component for responsive images

### Content & Assets
- Images stored in `src/assets/` or managed via Cloudinary
- Use `astro:assets` `Picture` component for optimized images
- Content collections defined in `src/content/config.ts`

## Common Patterns

### Component Creation
1. Create in appropriate directory (`src/components/`)
2. Use PascalCase naming
3. Include proper imports and exports
4. Add responsive styles with CSS variables
5. Test across different viewport sizes

### Page Creation
1. Create in `src/pages/` with route-based naming
2. Wrap in `Layout` component
3. Import necessary components
4. Follow semantic HTML structure

### Asset Management
- Use Cloudinary for media assets via content collections
- Local assets in `src/assets/` for static images
- Always optimize with `Picture` component

## Development Workflow
1. Run `pnpm dev` for local development
2. Test responsive design at different breakpoints
3. Use `pnpm build` to verify production build
4. Check `pnpm preview` before deployment

## Font Usage
- `--font-unna`: Headings (serif)
- `--font-open-sans`: Body text and navigation (sans-serif)

## Testing
No specific test framework is configured. Verify functionality by:
- Running the development server
- Checking responsive behavior
- Testing navigation and interactions
- Validating build output with `pnpm build`
