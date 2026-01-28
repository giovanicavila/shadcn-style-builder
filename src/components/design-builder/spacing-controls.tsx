import { CardComponentSelection } from "@/components/card/card-component-selection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useDesignTokens } from "@/contexts/design-tokens-context";

export function SpacingControls() {
  const { tokens, updateRadius, updateSpacing } = useDesignTokens();

  const getCurrentRadius = () => {
    if (tokens.selectedComponent === "all") {
      return tokens.radius;
    }
    const componentRadius = tokens.componentRadius[tokens.selectedComponent];
    return componentRadius ?? tokens.radius;
  };

  const handleRadiusChange = (value: number[]) => {
    updateRadius(value[0] / 10);
  };

  return (
    <div className="space-y-4">
      <CardComponentSelection />

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Border Radius</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs" htmlFor="radius">
                Radius: {getCurrentRadius()}rem
                {tokens.selectedComponent !== "all" &&
                  tokens.componentRadius[tokens.selectedComponent] === null &&
                  " (using global)"}
              </Label>
            </div>
            <Slider
              id="radius"
              max={50}
              min={0}
              onValueChange={handleRadiusChange}
              step={1}
              value={[getCurrentRadius() * 10]}
            />
            <div className="flex gap-2">
              <Button
                className="text-xs"
                onClick={() => updateRadius(0)}
                size="sm"
                variant="outline"
              >
                None
              </Button>
              <Button
                className="text-xs"
                onClick={() => updateRadius(0.25)}
                size="sm"
                variant="outline"
              >
                Small
              </Button>
              <Button
                className="text-xs"
                onClick={() => updateRadius(0.5)}
                size="sm"
                variant="outline"
              >
                Medium
              </Button>
              <Button
                className="text-xs"
                onClick={() => updateRadius(0.625)}
                size="sm"
                variant="outline"
              >
                Default
              </Button>
              <Button
                className="text-xs"
                onClick={() => updateRadius(1)}
                size="sm"
                variant="outline"
              >
                Large
              </Button>
              <Button
                className="text-xs"
                onClick={() => updateRadius(9999)}
                size="sm"
                variant="outline"
              >
                Full
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Padding</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs" htmlFor="padding-sm">
              Small
            </Label>
            <Input
              id="padding-sm"
              onChange={(e) =>
                updateSpacing("padding", {
                  ...tokens.spacing.padding,
                  sm: e.target.value,
                })
              }
              placeholder="0.5rem"
              type="text"
              value={tokens.spacing.padding.sm}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs" htmlFor="padding-md">
              Medium
            </Label>
            <Input
              id="padding-md"
              onChange={(e) =>
                updateSpacing("padding", {
                  ...tokens.spacing.padding,
                  md: e.target.value,
                })
              }
              placeholder="1rem"
              type="text"
              value={tokens.spacing.padding.md}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs" htmlFor="padding-lg">
              Large
            </Label>
            <Input
              id="padding-lg"
              onChange={(e) =>
                updateSpacing("padding", {
                  ...tokens.spacing.padding,
                  lg: e.target.value,
                })
              }
              placeholder="1.5rem"
              type="text"
              value={tokens.spacing.padding.lg}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Gap</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs" htmlFor="gap-sm">
              Small
            </Label>
            <Input
              id="gap-sm"
              onChange={(e) =>
                updateSpacing("gap", {
                  ...tokens.spacing.gap,
                  sm: e.target.value,
                })
              }
              placeholder="0.5rem"
              type="text"
              value={tokens.spacing.gap.sm}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs" htmlFor="gap-md">
              Medium
            </Label>
            <Input
              id="gap-md"
              onChange={(e) =>
                updateSpacing("gap", {
                  ...tokens.spacing.gap,
                  md: e.target.value,
                })
              }
              placeholder="1rem"
              type="text"
              value={tokens.spacing.gap.md}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs" htmlFor="gap-lg">
              Large
            </Label>
            <Input
              id="gap-lg"
              onChange={(e) =>
                updateSpacing("gap", {
                  ...tokens.spacing.gap,
                  lg: e.target.value,
                })
              }
              placeholder="1.5rem"
              type="text"
              value={tokens.spacing.gap.lg}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
