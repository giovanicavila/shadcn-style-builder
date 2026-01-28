import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  type ComponentType,
  useDesignTokens,
} from "@/contexts/design-tokens-context";

export function CardComponentSelection() {
  const { tokens, setSelectedComponent } = useDesignTokens();

  return (
    <Card className="border-0 border-l-4 border-l-primary bg-primary/5">
      <CardHeader>
        <CardTitle className="text-sm">Component Selection</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label className="text-xs" htmlFor="component-select">
            Select Component
          </Label>
          <Select
            onValueChange={(value) =>
              setSelectedComponent(value as ComponentType)
            }
            value={tokens.selectedComponent}
          >
            <SelectTrigger
              className="border-0 bg-background/50 shadow-none"
              id="component-select"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Components</SelectItem>
              <SelectItem value="buttons">Buttons</SelectItem>
              <SelectItem value="cards">Cards</SelectItem>
              <SelectItem value="inputs">Inputs</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
