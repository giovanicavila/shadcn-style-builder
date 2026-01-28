import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDesignTokens } from "@/contexts/design-tokens-context";
import {
  generateCSSVariables,
  generateTailwindConfig,
} from "@/lib/css-generator";

export function OutputPanel() {
  const { tokens } = useDesignTokens();
  const [copied, setCopied] = useState<string | null>(null);

  const cssVariables = generateCSSVariables(tokens);
  const tailwindConfig = generateTailwindConfig(tokens);

  const handleCopy = async (text: string, type: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Output</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="css">
          <TabsList>
            <TabsTrigger value="css">CSS Variables</TabsTrigger>
            <TabsTrigger value="tailwind">Tailwind Config</TabsTrigger>
          </TabsList>
          <TabsContent className="mt-4" value="css">
            <div className="relative">
              <pre className="overflow-auto rounded-md bg-muted p-4 text-sm">
                <code>{cssVariables}</code>
              </pre>
              <Button
                className="absolute top-2 right-2"
                onClick={() => handleCopy(cssVariables, "css")}
                size="sm"
                variant="outline"
              >
                {copied === "css" ? (
                  <>
                    <Check className="mr-2 size-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 size-4" />
                    Copy
                  </>
                )}
              </Button>
            </div>
            <p className="mt-2 text-muted-foreground text-xs">
              Copy this CSS and paste it into your globals.css file
            </p>
          </TabsContent>
          <TabsContent className="mt-4" value="tailwind">
            <div className="relative">
              <pre className="overflow-auto rounded-md bg-muted p-4 text-sm">
                <code>{tailwindConfig}</code>
              </pre>
              <Button
                className="absolute top-2 right-2"
                onClick={() => handleCopy(tailwindConfig, "tailwind")}
                size="sm"
                variant="outline"
              >
                {copied === "tailwind" ? (
                  <>
                    <Check className="mr-2 size-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 size-4" />
                    Copy
                  </>
                )}
              </Button>
            </div>
            <p className="mt-2 text-muted-foreground text-xs">
              Copy this configuration and merge it into your tailwind.config.js
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
