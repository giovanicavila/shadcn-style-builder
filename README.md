# shadcn Design Style Builder

An interactive visual builder for customizing shadcn/ui design tokens. Customize colors, typography, spacing, and border radius with a live preview, then export the styles as CSS variables or Tailwind config.

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite 7** - Build tool and dev server
- **Bun** - Package manager
- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn/ui (Radix UI)** - High-quality, accessible component library
- **OKLCH Color Space** - Modern color representation for better color manipulation
- **Biome + Ultracite** - Linting and formatting
- **Husky** - Git hooks

## Features

- **Color Controls** - Adjust colors with visual picker and OKLCH sliders
- **Border Radius** - Customize global or component-specific radius
- **Typography** - Customize font family, sizes, and weights
- **Spacing** - Adjust padding and gap values
- **Live Preview** - See changes in real-time with actual shadcn components
- **Dark/Light Mode** - Built-in theme switching
- **Export** - Copy CSS variables or Tailwind config

## Project Structure

```
src/
├── assets/                    # Static assets (favicon, logos)
├── components/
│   ├── ui/                    # shadcn/ui primitives (Button, Card, Input, etc.)
│   ├── color-picker/          # Color picker component with popover
│   ├── card/                  # Reusable card components
│   ├── design-builder/        # Main builder components
│   │   ├── color-controls.tsx      # Color customization controls
│   │   ├── spacing-controls.tsx    # Radius, padding, gap controls
│   │   ├── typography-controls.tsx # Font family, sizes, weights
│   │   ├── live-preview.tsx        # Live component preview
│   │   ├── output-panel.tsx        # CSS/Tailwind config output
│   │   └── dynamic-styles.tsx      # Dynamic CSS injection for preview
│   ├── header/                # Header component with mode toggle
│   └── mode-toggle/           # Dark/light mode toggle
├── contexts/
│   ├── design-tokens-context.tsx  # Global design tokens state
│   └── theme-provider.tsx         # Theme context (dark/light)
├── layout/                    # App layout wrapper
├── lib/
│   ├── color-utils.ts        # OKLCH color conversion utilities
│   ├── css-generator.ts      # CSS variables & Tailwind config generator
│   └── utils.ts              # General utilities (cn helper)
├── pages/
│   └── design-builder/       # Main design builder page
└── providers/                # Context providers wrapper
```

## Prerequisites

- **Bun** - Package manager

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd shadcn-style-builder
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Start the development server**
   ```bash
   bun run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## Available Scripts

| Script | Description |
|--------|-------------|
| `bun run dev` | Start development server with HMR |
| `bun run build` | Build for production |
| `bun run preview` | Preview production build locally |
| `bun run lint` | Run Biome linting and formatting |
| `bun run check` | Run Ultracite checks and auto-fix issues |
| `bun run fix` | Fix issues with Ultracite |
| `bun run test` | Run Vitest tests |

## Code Quality

### Linting & Formatting

This project uses **Biome** with the **Ultracite** preset for consistent code style.

```bash
# Format code
bun run fix

# Check for issues (auto-fixes)
bun run check
```

### Git Hooks

**Husky** is configured with pre-commit and pre-push hooks to ensure code quality:

- **Pre-commit**: Runs linting and formatting checks
- **Pre-push**: Runs tests (if configured)


## Usage

1. Select a component type (or "All Components")
2. Adjust colors, radius, typography, and spacing using the controls
3. See changes update in real-time in the preview
4. Copy the generated CSS variables or Tailwind config from the output panel

## Additional Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vite.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [OKLCH Color Space](https://oklch.com)
- [Bun Documentation](https://bun.sh/docs)


