import type { DesignTokens } from "@/contexts/design-tokens-context";
import { colorTokenToOklch } from "./color-utils";

export function generateCSSVariables(tokens: DesignTokens): string {
  const lines: string[] = [":root {"];

  // Colors
  for (const [key, color] of Object.entries(tokens.colors)) {
    const oklch = colorTokenToOklch(color);
    const cssKey = `--${key}`;
    lines.push(`  ${cssKey}: ${oklch};`);
  }

  // Radius
  lines.push(`  --radius: ${tokens.radius}rem;`);

  lines.push("}");

  // Dark mode
  lines.push("");
  lines.push(".dark {");
  // For dark mode, we'll use inverted lightness values
  for (const [key, color] of Object.entries(tokens.colors)) {
    const darkColor = {
      ...color,
      l: 100 - color.l, // Invert lightness for dark mode
    };
    const oklch = colorTokenToOklch(darkColor);
    const cssKey = `--${key}`;
    lines.push(`  ${cssKey}: ${oklch};`);
  }
  lines.push(`  --radius: ${tokens.radius}rem;`);
  lines.push("}");

  return lines.join("\n");
}

export function generateTailwindConfig(tokens: DesignTokens): string {
  const config = {
    theme: {
      extend: {
        borderRadius: {
          lg: `${tokens.radius}rem`,
          md: `calc(${tokens.radius}rem - 2px)`,
          sm: `calc(${tokens.radius}rem - 4px)`,
        },
        colors: {
          background: "var(--background)",
          foreground: "var(--foreground)",
          card: {
            DEFAULT: "var(--card)",
            foreground: "var(--card-foreground)",
          },
          popover: {
            DEFAULT: "var(--popover)",
            foreground: "var(--popover-foreground)",
          },
          primary: {
            DEFAULT: "var(--primary)",
            foreground: "var(--primary-foreground)",
          },
          secondary: {
            DEFAULT: "var(--secondary)",
            foreground: "var(--secondary-foreground)",
          },
          muted: {
            DEFAULT: "var(--muted)",
            foreground: "var(--muted-foreground)",
          },
          accent: {
            DEFAULT: "var(--accent)",
            foreground: "var(--accent-foreground)",
          },
          destructive: {
            DEFAULT: "var(--destructive)",
            foreground: "var(--destructive-foreground)",
          },
          border: "var(--border)",
          input: "var(--input)",
          ring: "var(--ring)",
        },
      },
    },
  };

  return JSON.stringify(config, null, 2);
}
