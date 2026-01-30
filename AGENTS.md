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
└── global.css       # Global styles, CSS variables, and utility classes
```

## Global CSS Architecture

### Design Philosophy
The project uses a hybrid approach combining global utility classes with component-specific styling to maximize maintainability while preserving unique component behaviors.

### Global Utility Classes
Utility classes are created in `global.css` when:
- Used by 2+ components AND contains 2+ style rules
- Eliminates CSS duplication while maintaining flexibility

#### Available Utility Classes

**`.max-width-wrapper`**
- Used for: Header, Footer, About, Partners containers
- Provides: `max-width: var(--max-width)` + `margin: 0 auto`
- HTML usage: `<div class="max-width-wrapper">`

**`.section-header`**
- Used for: About, Partners section headers
- Provides: `padding-block: 4rem`, `text-align: center`
- Responsive: `padding-block: 7rem` at `min-width: 1024px`
- Includes nested classes for section structure:
  - `.section-header .pre-title` - Uppercase accent text
  - `.section-header .title` - Main heading
- HTML usage: `<div class="section-header">`

**`.text-body`**
- Used for: About, Partners, Footer paragraph text
- Provides: `font-size: 1.125rem`, `line-height: 1.75rem`
- Inherits color from global `body` (`var(--muted-foreground)`)
- HTML usage: `<p class="text-body">`

**`.link-primary`**
- Used for: Header navigation, Footer links
- Provides: `text-decoration: none`, `transition: color 0.3s ease-in-out`
- Hover: `color: var(--primary)`
- Inherits base color from global `body` (`var(--muted-foreground)`)
- HTML usage: `<a href="#" class="link-primary">`

### CSS Precedence Strategy
**HTML Class Order:** Apply global classes first, component classes last
```html
<!-- Correct: global first, component-specific last -->
<div class="max-width-wrapper section-header about-container">

<!-- Incorrect: mixed order -->
<div class="about-container max-width-wrapper section-header">
```

This ensures component-specific styles override global classes when conflicts exist.

### Media Query Management
- **Global Media Queries:** Handle responsive patterns for common utility classes
- **Component Media Queries:** Handle component-specific responsive behaviors
- **Conflict Prevention:** No overlapping responsive rules between global and component

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

#### Global Settings
- Use CSS custom properties defined in `global.css`
- Leverage CSS variables for consistent theming:
  - `--foreground`, `--muted-foreground`
  - `--primary`, `--primary-light`
  - `--background`, `--border-color`

#### Typography & Color Inheritance
**Global Font Settings:**
- `body` has `font-family: var(--font-open-sans)` (inherited by all text)
- All `h1-h6` have `font-family: var(--font-unna)` (inherited by headings)
- **Never re-declare** `font-family` unless overriding global defaults

**Global Color Settings:**
- `body` has `color: var(--muted-foreground)` (inherited by all text)
- All `h1-h6` have `color: var(--foreground)` (inherited by headings)
- **Never re-declare** colors unless intentionally different from defaults

#### Responsive Design
- Use mobile-first approach
- Leverage global responsive behavior where possible
- Use semantic HTML5 elements
- Component-scoped styles in `<style>` tags

#### Duplication Prevention Rules
1. **Font-family:** Only declare if different from global settings
2. **Colors:** Only declare if different from inherited defaults
3. **Patterns:** Use global utility classes for common layouts
4. **Media Queries:** Prefer global responsive behavior

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

#### Hybrid Class Application Strategy
For components that need both global utility and specific styling:
```html
<!-- Example: Component with global layout + specific grid behavior -->
<div class="max-width-wrapper section-header component-specific">
  <span class="pre-title">Accent Text</span>
  <h2 class="title">Main Heading</h2>
  <p class="text-body">Body content</p>
</div>
```

#### When to Use Global Classes
- **`.max-width-wrapper`**: Any centered content container with max-width constraint
- **`.section-header`**: Section titles with accent text + main heading pattern
- **`.text-body`**: Standard paragraph text content
- **`.link-primary`**: Navigation and footer links with hover behavior

#### When to Use Component-Specific Classes
- Unique layout grids (`.about-grid`, `.partners-grid`)
- Component-specific responsive behaviors
- When global utility classes conflict with component requirements

### Page Creation
1. Create in `src/pages/` with route-based naming
2. Wrap in `Layout` component
3. Import necessary components
4. Follow semantic HTML structure

### Asset Management
- Use Cloudinary for media assets via content collections
- Local assets in `src/assets/` for static images
- Always optimize with `Picture` component

### Media Query Best Practices
- **Global responsive patterns**: Use `.section-header` responsive behavior
- **Component-specific**: Keep unique responsive styles in component
- **Never duplicate**: Don't override global responsive behavior locally
- **Breakpoint consistency**: Use `min-width: 1024px` for desktop patterns

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

## CSS Development Workflow

### Before Writing New CSS
1. **Check Global Classes**: Review available utility classes in `global.css`
2. **Check Inheritance**: Verify if font-family/color already set globally
3. **Check Duplication**: Ensure style pattern isn't already handled globally

### Adding New Utility Classes
1. **Verify Multi-Component Use**: Pattern used in 2+ components
2. **Verify Multi-Rule**: Class contains 2+ CSS properties
3. **Add to Global**: Place in `global.css` with semantic naming
4. **Document Usage**: Add to AGENTS.md utility reference

### CSS Precedence Testing
1. **Apply Classes Correctly**: Global classes first, component classes last
2. **Test Overrides**: Verify component styles work when conflicts exist
3. **Test Responsive**: Ensure media queries don't conflict with global patterns

### Common Pitfalls to Avoid
1. **Don't Re-declare Font Family**: Already set globally in `body` and `h1-h6`
2. **Don't Re-declare Colors**: Already set globally with proper inheritance
3. **Don't Duplicate Media Queries**: Use global responsive patterns where possible
4. **Don't Mix Class Order**: Always global-first, component-last

## Utility Classes Reference

### Quick Reference

| Class | Purpose | Used By | Responsive Behavior |
|--------|---------|-----------|-------------------|
| `.max-width-wrapper` | Centered container with max-width | Header, Footer, About, Partners | None |
| `.section-header` | Section title pattern with padding | About, Partners | `padding-block: 7rem` at 1024px+ |
| `.text-body` | Standard paragraph styling | About, Partners, Footer | None |
| `.link-primary` | Primary link with hover | Header, Footer | None |

### Detailed Class Documentation

#### `.max-width-wrapper`
```css
.max-width-wrapper {
  max-width: var(--max-width);
  margin: 0 auto;
}
```
**When to Use:** Any container that needs centered max-width layout
**HTML Pattern:** `<div class="max-width-wrapper">`
**Component Overrides:** Add component-specific class after global class

#### `.section-header`
```css
.section-header {
  padding-block: 4rem;
  text-align: center;
}

.section-header .pre-title {
  display: block;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--primary);
  margin-bottom: 1rem;
  letter-spacing: 0.1em;
}

.section-header .title {
  font-size: 2rem;
  margin-bottom: 1rem;
}

@media (min-width: 1024px) {
  .section-header {
    padding-block: 7rem;
  }
}
```
**When to Use:** Section headers with accent text + main heading
**HTML Pattern:**
```html
<div class="section-header">
  <span class="pre-title">Accent Text</span>
  <h2 class="title">Main Heading</h2>
</div>
```

#### `.text-body`
```css
.text-body {
  font-size: 1.125rem;
  line-height: 1.75rem;
}
```
**When to Use:** Standard paragraph text content
**HTML Pattern:** `<p class="text-body">`
**Color Inheritance:** Uses global `color: var(--muted-foreground)`

#### `.link-primary`
```css
.link-primary {
  text-decoration: none;
  transition: color 0.3s ease-in-out;
  color: var(--muted-foreground);
}

.link-primary:hover {
  color: var(--primary);
}
```
**When to Use:** Navigation links and footer links
**HTML Pattern:** `<a href="#" class="link-primary">`
**Component Overrides:** Can add hover transforms, borders, etc.

### Adding New Utility Classes

Follow these criteria when creating new global utility classes:
1. **Multi-Component Usage**: Used in 2+ components
2. **Multiple Style Rules**: Contains 2+ CSS properties
3. **Semantic Naming**: Use descriptive names that reflect purpose
4. **Documentation**: Update this reference section
5. **Testing**: Ensure no conflicts with existing styles
