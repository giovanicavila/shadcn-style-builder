import { ColorControls } from "@/components/design-builder/color-controls";
import { LivePreview } from "@/components/design-builder/live-preview";
import { OutputPanel } from "@/components/design-builder/output-panel";
import { SpacingControls } from "@/components/design-builder/spacing-controls";
import { TypographyControls } from "@/components/design-builder/typography-controls";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DesignTokensProvider } from "@/contexts/design-tokens-context";

function BuilderContent() {
  return (
    <div className="bg-background py-5">
      <div className="container mx-auto grid gap-6 p-4 lg:grid-cols-[400px_1fr_400px]">
        <div className="space-y-6 overflow-y-auto lg:max-h-[calc(100vh-120px)]">
          <Tabs className="w-full" defaultValue="colors">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="colors">Colors</TabsTrigger>
              <TabsTrigger value="typography">Typography</TabsTrigger>
              <TabsTrigger value="spacing">Spacing</TabsTrigger>
            </TabsList>
            <TabsContent className="mt-4" value="colors">
              <ColorControls />
            </TabsContent>
            <TabsContent className="mt-4" value="typography">
              <TypographyControls />
            </TabsContent>
            <TabsContent className="mt-4" value="spacing">
              <SpacingControls />
            </TabsContent>
          </Tabs>
        </div>

        <div className="overflow-y-auto lg:max-h-[calc(100vh-120px)]">
          <div className="rounded-lg border bg-card">
            <LivePreview />
          </div>
        </div>

        <div className="overflow-y-auto lg:max-h-[calc(100vh-120px)]">
          <OutputPanel />
        </div>
      </div>
    </div>
  );
}

export function DesignBuilder() {
  return (
    <DesignTokensProvider>
      <BuilderContent />
    </DesignTokensProvider>
  );
}
