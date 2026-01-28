import type { ReactNode } from "react";
import { DesignTokensProvider } from "@/contexts/design-tokens-context";
import { ThemeProvider } from "@/contexts/theme-provider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider defaultTheme="dark">
      <DesignTokensProvider>{children}</DesignTokensProvider>
    </ThemeProvider>
  );
}
