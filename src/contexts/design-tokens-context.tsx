import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";

export interface ColorToken {
  l: number; // lightness (0-100)
  c: number; // chroma (0-0.4)
  h: number; // hue (0-360)
}

export type ComponentType = "buttons" | "cards" | "inputs" | "all";

export interface DesignTokens {
  colors: {
    background: ColorToken;
    foreground: ColorToken;
    card: ColorToken;
    "card-foreground": ColorToken;
    popover: ColorToken;
    "popover-foreground": ColorToken;
    primary: ColorToken;
    "primary-foreground": ColorToken;
    secondary: ColorToken;
    "secondary-foreground": ColorToken;
    muted: ColorToken;
    "muted-foreground": ColorToken;
    accent: ColorToken;
    "accent-foreground": ColorToken;
    destructive: ColorToken;
    border: ColorToken;
    input: ColorToken;
    ring: ColorToken;
  };
  radius: number; // in rem
  componentRadius: {
    buttons: number | null; // null means use global radius
    cards: number | null;
    inputs: number | null;
  };
  selectedComponent: ComponentType;
  typography: {
    fontFamily: string;
    fontSize: {
      base: string;
      sm: string;
      lg: string;
      xl: string;
    };
    fontWeight: {
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
    };
  };
  spacing: {
    padding: {
      sm: string;
      md: string;
      lg: string;
    };
    gap: {
      sm: string;
      md: string;
      lg: string;
    };
  };
}

const defaultTokens: DesignTokens = {
  colors: {
    background: { l: 100, c: 0, h: 0 },
    foreground: { l: 14.5, c: 0, h: 0 },
    card: { l: 100, c: 0, h: 0 },
    "card-foreground": { l: 14.5, c: 0, h: 0 },
    popover: { l: 100, c: 0, h: 0 },
    "popover-foreground": { l: 14.5, c: 0, h: 0 },
    primary: { l: 20.5, c: 0, h: 0 },
    "primary-foreground": { l: 98.5, c: 0, h: 0 },
    secondary: { l: 97, c: 0, h: 0 },
    "secondary-foreground": { l: 20.5, c: 0, h: 0 },
    muted: { l: 97, c: 0, h: 0 },
    "muted-foreground": { l: 55.6, c: 0, h: 0 },
    accent: { l: 97, c: 0, h: 0 },
    "accent-foreground": { l: 20.5, c: 0, h: 0 },
    destructive: { l: 57.7, c: 0.245, h: 27.325 },
    border: { l: 92.2, c: 0, h: 0 },
    input: { l: 92.2, c: 0, h: 0 },
    ring: { l: 70.8, c: 0, h: 0 },
  },
  radius: 0.625,
  componentRadius: {
    buttons: null,
    cards: null,
    inputs: null,
  },
  selectedComponent: "all",
  typography: {
    fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
    fontSize: {
      base: "1rem",
      sm: "0.875rem",
      lg: "1.125rem",
      xl: "1.25rem",
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  spacing: {
    padding: {
      sm: "0.5rem",
      md: "1rem",
      lg: "1.5rem",
    },
    gap: {
      sm: "0.5rem",
      md: "1rem",
      lg: "1.5rem",
    },
  },
};

interface DesignTokensContextType {
  tokens: DesignTokens;
  updateColor: (key: keyof DesignTokens["colors"], color: ColorToken) => void;
  updateRadius: (radius: number) => void;
  updateComponentRadius: (
    component: keyof DesignTokens["componentRadius"],
    radius: number | null
  ) => void;
  setSelectedComponent: (component: ComponentType) => void;
  updateTypography: <K extends keyof DesignTokens["typography"]>(
    key: K,
    value: DesignTokens["typography"][K]
  ) => void;
  updateSpacing: <K extends keyof DesignTokens["spacing"]>(
    key: K,
    value: DesignTokens["spacing"][K]
  ) => void;
  reset: () => void;
}

type ComponentRadiusKey = keyof DesignTokens["componentRadius"];

const DesignTokensContext = createContext<DesignTokensContextType | undefined>(
  undefined
);

export function DesignTokensProvider({ children }: { children: ReactNode }) {
  const [tokens, setTokens] = useState<DesignTokens>(defaultTokens);

  const updateColor = (
    key: keyof DesignTokens["colors"],
    color: ColorToken
  ) => {
    setTokens((prev) => ({
      ...prev,
      colors: {
        ...prev.colors,
        [key]: color,
      },
    }));
  };

  const updateRadius = (radius: number) => {
    setTokens((prev) => {
      const newTokens = { ...prev, radius };
      // If "all" is selected, update all component-specific radii
      if (prev.selectedComponent === "all") {
        newTokens.componentRadius = {
          buttons: radius,
          cards: radius,
          inputs: radius,
        };
      } else {
        // Update the selected component's radius
        const componentKey = prev.selectedComponent as ComponentRadiusKey;
        newTokens.componentRadius = {
          ...prev.componentRadius,
          [componentKey]: radius,
        };
      }
      return newTokens;
    });
  };

  const updateComponentRadius = (
    component: keyof DesignTokens["componentRadius"],
    radius: number | null
  ) => {
    setTokens((prev) => ({
      ...prev,
      componentRadius: {
        ...prev.componentRadius,
        [component]: radius,
      },
    }));
  };

  const setSelectedComponent = (component: ComponentType) => {
    setTokens((prev) => ({
      ...prev,
      selectedComponent: component,
    }));
  };

  const updateTypography = <K extends keyof DesignTokens["typography"]>(
    key: K,
    value: DesignTokens["typography"][K]
  ) => {
    setTokens((prev) => ({
      ...prev,
      typography: {
        ...prev.typography,
        [key]: value,
      },
    }));
  };

  const updateSpacing = <K extends keyof DesignTokens["spacing"]>(
    key: K,
    value: DesignTokens["spacing"][K]
  ) => {
    setTokens((prev) => ({
      ...prev,
      spacing: {
        ...prev.spacing,
        [key]: value,
      },
    }));
  };

  const reset = () => {
    setTokens(defaultTokens);
  };

  return (
    <DesignTokensContext.Provider
      value={{
        tokens,
        updateColor,
        updateRadius,
        updateComponentRadius,
        setSelectedComponent,
        updateTypography,
        updateSpacing,
        reset,
      }}
    >
      {children}
    </DesignTokensContext.Provider>
  );
}

export function useDesignTokens() {
  const context = useContext(DesignTokensContext);
  if (context === undefined) {
    throw new Error(
      "useDesignTokens must be used within a DesignTokensProvider"
    );
  }
  return context;
}
