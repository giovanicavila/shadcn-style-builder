import { CardComponentSelection } from "@/components/card/card-component-selection";
import { ColorPicker } from "@/components/color-picker/color-picker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  type ComponentType,
  useDesignTokens,
} from "@/contexts/design-tokens-context";
import { colorTokenToOklch, hexToOklch, oklchToHex } from "@/lib/color-utils";

const HEX_REGEX = /^#[0-9A-Fa-f]{6}$/;
const OKLCH_REGEX = /oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/;

interface ColorControlProps {
  colorKey: keyof ReturnType<typeof useDesignTokens>["tokens"]["colors"];
  label: string;
}

function ColorControl({ colorKey, label }: ColorControlProps) {
  const { tokens, updateColor } = useDesignTokens();
  const color = tokens.colors[colorKey];

  const handleLightnessChange = (value: number[]) => {
    updateColor(colorKey, { ...color, l: value[0] });
  };

  const handleChromaChange = (value: number[]) => {
    updateColor(colorKey, { ...color, c: value[0] / 100 });
  };

  const handleHueChange = (value: number[]) => {
    updateColor(colorKey, { ...color, h: value[0] });
  };

  const handleHexChange = (hex: string) => {
    if (HEX_REGEX.test(hex)) {
      const oklch = hexToOklch(hex);
      const match = oklch.match(OKLCH_REGEX);
      if (match) {
        updateColor(colorKey, {
          l: Number.parseFloat(match[1]) * 100,
          c: Number.parseFloat(match[2]),
          h: Number.parseFloat(match[3]),
        });
      }
    }
  };

  const hexValue = oklchToHex(colorTokenToOklch(color));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">{label}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs" htmlFor={`${colorKey}-hex`}>
              Hex
            </Label>
            <ColorPicker
              color={color}
              onColorChange={(newColor) => updateColor(colorKey, newColor)}
            />
          </div>
          <Input
            className="font-mono text-xs"
            id={`${colorKey}-hex`}
            onChange={(e) => handleHexChange(e.target.value)}
            placeholder="#000000"
            type="text"
            value={hexValue}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs" htmlFor={`${colorKey}-lightness`}>
              Lightness: {Math.round(color.l)}%
            </Label>
          </div>
          <Slider
            id={`${colorKey}-lightness`}
            max={100}
            min={0}
            onValueChange={handleLightnessChange}
            step={1}
            value={[color.l]}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs" htmlFor={`${colorKey}-chroma`}>
              Chroma: {color.c.toFixed(3)}
            </Label>
          </div>
          <Slider
            id={`${colorKey}-chroma`}
            max={40}
            min={0}
            onValueChange={(value) => handleChromaChange(value)}
            step={0.1}
            value={[color.c * 100]}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs" htmlFor={`${colorKey}-hue`}>
              Hue: {Math.round(color.h)}°
            </Label>
          </div>
          <Slider
            id={`${colorKey}-hue`}
            max={360}
            min={0}
            onValueChange={handleHueChange}
            step={1}
            value={[color.h]}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export function ColorControls() {
  const { tokens } = useDesignTokens();
  const { selectedComponent } = tokens;

  // Define which colors are relevant for each component
  const componentColorMap: Record<
    ComponentType,
    Array<{ key: keyof typeof tokens.colors; label: string }>
  > = {
    all: [
      { key: "background", label: "Background" },
      { key: "foreground", label: "Foreground" },
      { key: "card", label: "Card" },
      { key: "card-foreground", label: "Card Foreground" },
      { key: "primary", label: "Primary" },
      { key: "primary-foreground", label: "Primary Foreground" },
      { key: "secondary", label: "Secondary" },
      { key: "secondary-foreground", label: "Secondary Foreground" },
      { key: "accent", label: "Accent" },
      { key: "accent-foreground", label: "Accent Foreground" },
      { key: "muted", label: "Muted" },
      { key: "muted-foreground", label: "Muted Foreground" },
      { key: "destructive", label: "Destructive" },
      { key: "border", label: "Border" },
      { key: "input", label: "Input" },
      { key: "ring", label: "Ring" },
    ],
    buttons: [
      { key: "primary", label: "Primary" },
      { key: "primary-foreground", label: "Primary Foreground" },
      { key: "secondary", label: "Secondary" },
      { key: "secondary-foreground", label: "Secondary Foreground" },
      { key: "destructive", label: "Destructive" },
      { key: "accent", label: "Accent" },
      { key: "accent-foreground", label: "Accent Foreground" },
    ],
    cards: [
      { key: "card", label: "Card" },
      { key: "card-foreground", label: "Card Foreground" },
      { key: "background", label: "Background" },
      { key: "foreground", label: "Foreground" },
      { key: "border", label: "Border" },
    ],
    inputs: [
      { key: "input", label: "Input" },
      { key: "border", label: "Border" },
      { key: "ring", label: "Ring" },
      { key: "foreground", label: "Foreground" },
      { key: "background", label: "Background" },
      { key: "muted", label: "Muted" },
      { key: "muted-foreground", label: "Muted Foreground" },
    ],
  };

  // Get relevant colors for selected component
  const relevantColors = componentColorMap[selectedComponent];

  // Group colors logically
  const getColorGroups = () => {
    if (selectedComponent === "all") {
      return [
        {
          title: "Base Colors",
          colors: [
            { key: "background" as const, label: "Background" },
            { key: "foreground" as const, label: "Foreground" },
          ],
        },
        {
          title: "Card Colors",
          colors: [
            { key: "card" as const, label: "Card" },
            { key: "card-foreground" as const, label: "Card Foreground" },
          ],
        },
        {
          title: "Primary Colors",
          colors: [
            { key: "primary" as const, label: "Primary" },
            { key: "primary-foreground" as const, label: "Primary Foreground" },
          ],
        },
        {
          title: "Secondary Colors",
          colors: [
            { key: "secondary" as const, label: "Secondary" },
            {
              key: "secondary-foreground" as const,
              label: "Secondary Foreground",
            },
          ],
        },
        {
          title: "Accent Colors",
          colors: [
            { key: "accent" as const, label: "Accent" },
            { key: "accent-foreground" as const, label: "Accent Foreground" },
          ],
        },
        {
          title: "Muted Colors",
          colors: [
            { key: "muted" as const, label: "Muted" },
            { key: "muted-foreground" as const, label: "Muted Foreground" },
          ],
        },
        {
          title: "Other Colors",
          colors: [
            { key: "destructive" as const, label: "Destructive" },
            { key: "border" as const, label: "Border" },
            { key: "input" as const, label: "Input" },
            { key: "ring" as const, label: "Ring" },
          ],
        },
      ];
    }

    // For specific components, show all relevant colors in one group
    let title = "Input Colors";
    if (selectedComponent === "buttons") {
      title = "Button Colors";
    } else if (selectedComponent === "cards") {
      title = "Card Colors";
    }

    return [
      {
        title,
        colors: relevantColors.map((c) => ({
          key: c.key,
          label: c.label,
        })),
      },
    ];
  };

  const colorGroups = getColorGroups();

  return (
    <div className="space-y-6">
      <CardComponentSelection />
      {colorGroups.map((group) => (
        <div className="space-y-3" key={group.title}>
          <h3 className="font-semibold text-sm">{group.title}</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {group.colors.map(({ key, label }) => (
              <ColorControl colorKey={key} key={key} label={label} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
