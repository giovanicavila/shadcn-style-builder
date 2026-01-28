import { useEffect } from "react";
import { useDesignTokens } from "@/contexts/design-tokens-context";
import { colorTokenToOklch } from "@/lib/color-utils";

type DynamicStylesProps = {
  containerRef: React.RefObject<HTMLDivElement | null>;
};

export function DynamicStyles({ containerRef }: DynamicStylesProps) {
  const { tokens } = useDesignTokens();
  const styleId = "preview-dynamic-styles";

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create or update style element for scoped CSS variables
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    // Build CSS with scoped variables for the preview container
    const cssVariables: string[] = [];
    for (const [key, color] of Object.entries(tokens.colors)) {
      const oklch = colorTokenToOklch(color);
      cssVariables.push(`  --${key}: ${oklch};`);
    }
    cssVariables.push(`  --radius: ${tokens.radius}rem;`);

    // Add derived radius values for Tailwind
    cssVariables.push(
      "  --radius-sm: calc(var(--radius) - 4px);",
      "  --radius-md: calc(var(--radius) - 2px);",
      "  --radius-lg: var(--radius);",
      "  --radius-xl: calc(var(--radius) + 4px);"
    );

    // Add component-specific radius styles
    const componentStyles: string[] = [];

    // Buttons radius - override rounded-md class
    const buttonRadius = tokens.componentRadius.buttons ?? tokens.radius;
    componentStyles.push(
      `  [data-preview-container] [data-slot="button"] { border-radius: ${buttonRadius}rem !important; }`
    );

    // Cards radius - override rounded-xl class
    const cardRadius = tokens.componentRadius.cards ?? tokens.radius;
    componentStyles.push(
      `  [data-preview-container] [data-slot="card"] { border-radius: ${cardRadius}rem !important; }`
    );

    // Inputs radius - override rounded-md class
    const inputRadius = tokens.componentRadius.inputs ?? tokens.radius;
    componentStyles.push(
      `  [data-preview-container] [data-slot="input"] { border-radius: ${inputRadius}rem !important; }`
    );
    componentStyles.push(
      `  [data-preview-container] [data-slot="select-trigger"] { border-radius: ${inputRadius}rem !important; }`
    );

    // Scope styles to elements within the preview container
    styleElement.textContent = `
			[data-preview-container] {
${cssVariables.join("\n")}
				font-family: ${tokens.typography.fontFamily};
			}
${componentStyles.join("\n")}
		`;
  }, [tokens, containerRef]);

  return null;
}
