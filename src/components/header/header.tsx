import { RotateCcw } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle/mode-toggle";
import { Button } from "../ui/button";
export function Header() {
  const reset = () => {
    console.log("reset");
  };

  return (
    <header className="border-b bg-card">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <div>
          <h1 className="font-bold text-2xl">Shadcn Design Style Builder</h1>
          <p className="text-muted-foreground text-sm">
            Customize your design system visually and export ready-to-use styles
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={reset} variant="outline">
            <RotateCcw className="mr-2 size-4" />
            Reset
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
