import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDesignTokens } from "@/contexts/design-tokens-context";

export function TypographyControls() {
  const { tokens, updateTypography } = useDesignTokens();

  const fontFamilies = [
    {
      value: "system-ui, Avenir, Helvetica, Arial, sans-serif",
      label: "System",
    },
    { value: "Inter, sans-serif", label: "Inter" },
    { value: "Roboto, sans-serif", label: "Roboto" },
    { value: "Open Sans, sans-serif", label: "Open Sans" },
    { value: "Lato, sans-serif", label: "Lato" },
    { value: "Montserrat, sans-serif", label: "Montserrat" },
    { value: "Poppins, sans-serif", label: "Poppins" },
    { value: "Playfair Display, serif", label: "Playfair Display" },
    { value: "Georgia, serif", label: "Georgia" },
    { value: "Times New Roman, serif", label: "Times New Roman" },
    { value: "Courier New, monospace", label: "Courier New" },
    { value: "Monaco, monospace", label: "Monaco" },
  ];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Font Family</CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            onValueChange={(value) => updateTypography("fontFamily", value)}
            value={tokens.typography.fontFamily}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fontFamilies.map((font) => (
                <SelectItem key={font.value} value={font.value}>
                  {font.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Font Sizes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs" htmlFor="font-size-sm">
              Small
            </Label>
            <Input
              id="font-size-sm"
              onChange={(e) =>
                updateTypography("fontSize", {
                  ...tokens.typography.fontSize,
                  sm: e.target.value,
                })
              }
              placeholder="0.875rem"
              type="text"
              value={tokens.typography.fontSize.sm}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs" htmlFor="font-size-base">
              Base
            </Label>
            <Input
              id="font-size-base"
              onChange={(e) =>
                updateTypography("fontSize", {
                  ...tokens.typography.fontSize,
                  base: e.target.value,
                })
              }
              placeholder="1rem"
              type="text"
              value={tokens.typography.fontSize.base}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs" htmlFor="font-size-lg">
              Large
            </Label>
            <Input
              id="font-size-lg"
              onChange={(e) =>
                updateTypography("fontSize", {
                  ...tokens.typography.fontSize,
                  lg: e.target.value,
                })
              }
              placeholder="1.125rem"
              type="text"
              value={tokens.typography.fontSize.lg}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs" htmlFor="font-size-xl">
              Extra Large
            </Label>
            <Input
              id="font-size-xl"
              onChange={(e) =>
                updateTypography("fontSize", {
                  ...tokens.typography.fontSize,
                  xl: e.target.value,
                })
              }
              placeholder="1.25rem"
              type="text"
              value={tokens.typography.fontSize.xl}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Font Weights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs" htmlFor="font-weight-normal">
              Normal
            </Label>
            <Input
              id="font-weight-normal"
              max={900}
              min={100}
              onChange={(e) =>
                updateTypography("fontWeight", {
                  ...tokens.typography.fontWeight,
                  normal: Number.parseInt(e.target.value) || 400,
                })
              }
              step={100}
              type="number"
              value={tokens.typography.fontWeight.normal}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs" htmlFor="font-weight-medium">
              Medium
            </Label>
            <Input
              id="font-weight-medium"
              max={900}
              min={100}
              onChange={(e) =>
                updateTypography("fontWeight", {
                  ...tokens.typography.fontWeight,
                  medium: Number.parseInt(e.target.value) || 500,
                })
              }
              step={100}
              type="number"
              value={tokens.typography.fontWeight.medium}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs" htmlFor="font-weight-semibold">
              Semibold
            </Label>
            <Input
              id="font-weight-semibold"
              max={900}
              min={100}
              onChange={(e) =>
                updateTypography("fontWeight", {
                  ...tokens.typography.fontWeight,
                  semibold: Number.parseInt(e.target.value) || 600,
                })
              }
              step={100}
              type="number"
              value={tokens.typography.fontWeight.semibold}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs" htmlFor="font-weight-bold">
              Bold
            </Label>
            <Input
              id="font-weight-bold"
              max={900}
              min={100}
              onChange={(e) =>
                updateTypography("fontWeight", {
                  ...tokens.typography.fontWeight,
                  bold: Number.parseInt(e.target.value) || 700,
                })
              }
              step={100}
              type="number"
              value={tokens.typography.fontWeight.bold}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
