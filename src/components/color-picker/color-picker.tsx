import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import type { ColorToken } from "@/contexts/design-tokens-context";
import { colorTokenToOklch, hexToOklch, oklchToHex } from "@/lib/color-utils";

const HEX_REGEX = /^#[0-9A-Fa-f]{6}$/;
const OKLCH_REGEX = /oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/;

interface ColorPickerProps {
  color: ColorToken;
  onColorChange: (color: ColorToken) => void;
}

export function ColorPicker({ color, onColorChange }: ColorPickerProps) {
  const [open, setOpen] = useState(false);
  const hexValue = oklchToHex(colorTokenToOklch(color));

  const handleHexChange = (hex: string) => {
    if (HEX_REGEX.test(hex)) {
      const oklch = hexToOklch(hex);
      const match = oklch.match(OKLCH_REGEX);
      if (match) {
        onColorChange({
          l: Number.parseFloat(match[1]) * 100,
          c: Number.parseFloat(match[2]),
          h: Number.parseFloat(match[3]),
        });
      }
    }
  };

  const handleLightnessChange = (value: number[]) => {
    onColorChange({ ...color, l: value[0] });
  };

  const handleChromaChange = (value: number[]) => {
    onColorChange({ ...color, c: value[0] / 100 });
  };

  const handleHueChange = (value: number[]) => {
    onColorChange({ ...color, h: value[0] });
  };

  const handleNativeColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleHexChange(e.target.value);
  };

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <button
          aria-label="Pick a color"
          className="size-8 cursor-pointer rounded border border-border transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          style={{ backgroundColor: hexValue }}
          type="button"
        />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-80">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs" htmlFor="color-picker-hex">
              Hex
            </Label>
            <div className="flex items-center gap-2">
              <Input
                className="font-mono text-xs"
                id="color-picker-hex"
                onChange={(e) => handleHexChange(e.target.value)}
                placeholder="#000000"
                type="text"
                value={hexValue}
              />
              <input
                className="size-10 cursor-pointer rounded border"
                onChange={handleNativeColorChange}
                type="color"
                value={hexValue}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs" htmlFor="color-picker-lightness">
                Lightness: {Math.round(color.l)}%
              </Label>
            </div>
            <Slider
              id="color-picker-lightness"
              max={100}
              min={0}
              onValueChange={handleLightnessChange}
              step={1}
              value={[color.l]}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs" htmlFor="color-picker-chroma">
                Chroma: {color.c.toFixed(3)}
              </Label>
            </div>
            <Slider
              id="color-picker-chroma"
              max={40}
              min={0}
              onValueChange={handleChromaChange}
              step={0.1}
              value={[color.c * 100]}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs" htmlFor="color-picker-hue">
                Hue: {Math.round(color.h)}°
              </Label>
            </div>
            <Slider
              id="color-picker-hue"
              max={360}
              min={0}
              onValueChange={handleHueChange}
              step={1}
              value={[color.h]}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
