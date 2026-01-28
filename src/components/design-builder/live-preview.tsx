import { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDesignTokens } from "@/contexts/design-tokens-context";
import { DynamicStyles } from "./dynamic-styles";

export function LivePreview() {
  const previewRef = useRef<HTMLDivElement>(null);
  const { tokens } = useDesignTokens();
  const { selectedComponent } = tokens;

  const showAll = selectedComponent === "all";
  const showButtons = showAll || selectedComponent === "buttons";
  const showCards = showAll || selectedComponent === "cards";
  const showInputs = showAll || selectedComponent === "inputs";

  return (
    <div className="space-y-8 p-6" data-preview-container ref={previewRef}>
      <DynamicStyles containerRef={previewRef} />
      {showButtons && (
        <div
          className={`space-y-6 rounded-lg border-l-4 p-6 transition-all ${
            selectedComponent === "buttons"
              ? "border-l-primary bg-primary/5 shadow-lg ring-2 ring-primary/20"
              : "border-l-transparent"
          }`}
        >
          <div>
            <h2 className="mb-2 font-bold text-2xl">Buttons</h2>
            <p className="text-muted-foreground text-sm">
              All button variants and sizes with different states
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="mb-3 font-semibold text-sm">Variants</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>

            <div>
              <h3 className="mb-3 font-semibold text-sm">Sizes</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="xs">Extra Small</Button>
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>

            <div>
              <h3 className="mb-3 font-semibold text-sm">States</h3>
              <div className="flex flex-wrap gap-4">
                <Button>Normal</Button>
                <Button disabled>Disabled</Button>
                <Button disabled variant="outline">
                  Disabled Outline
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCards && (
        <div
          className={`space-y-6 rounded-lg border-l-4 p-6 transition-all ${
            selectedComponent === "cards"
              ? "border-l-primary bg-primary/5 shadow-lg ring-2 ring-primary/20"
              : "border-l-transparent"
          }`}
        >
          <div>
            <h2 className="mb-2 font-bold text-2xl">Cards</h2>
            <p className="text-muted-foreground text-sm">
              Preview of card components with different layouts and content
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Card with Footer</CardTitle>
                <CardDescription>Card description goes here</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  This is the card content area where you can place any content.
                </p>
              </CardContent>
              <CardFooter>
                <Button>Action</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Simple Card</CardTitle>
                <CardDescription>With different content</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Cards are great for organizing content into distinct sections.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Card with Long Content</CardTitle>
                <CardDescription>
                  Demonstrating how cards handle longer text
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-2">
                  This card demonstrates how content flows within a card
                  component. You can add paragraphs, lists, images, and other
                  elements here.
                </p>
                <ul className="list-inside list-disc space-y-1 text-sm">
                  <li>Feature one</li>
                  <li>Feature two</li>
                  <li>Feature three</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Card with Multiple Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <p>This card shows multiple action buttons in the footer.</p>
              </CardContent>
              <CardFooter className="gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Save</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Minimal Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p>A minimal card with just title and content.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {showInputs && (
        <div
          className={`space-y-6 rounded-lg border-l-4 p-6 transition-all ${
            selectedComponent === "inputs"
              ? "border-l-primary bg-primary/5 shadow-lg ring-2 ring-primary/20"
              : "border-l-transparent"
          }`}
        >
          <div>
            <h2 className="mb-2 font-bold text-2xl">Form Elements</h2>
            <p className="text-muted-foreground text-sm">
              Input fields, selects, sliders, and labels with different states
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Text Inputs</CardTitle>
                <CardDescription>Different input types</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-preview">Email</Label>
                  <Input
                    id="email-preview"
                    placeholder="Enter your email"
                    type="email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-preview">Password</Label>
                  <Input
                    id="password-preview"
                    placeholder="Enter your password"
                    type="password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="text-preview">Text Input</Label>
                  <Input
                    id="text-preview"
                    placeholder="Enter text"
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="disabled-preview">Disabled Input</Label>
                  <Input
                    disabled
                    id="disabled-preview"
                    placeholder="Disabled"
                    type="text"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Select & Slider</CardTitle>
                <CardDescription>Dropdown and range controls</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="select-preview">Select Option</Label>
                  <Select>
                    <SelectTrigger id="select-preview">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">Option 1</SelectItem>
                      <SelectItem value="option2">Option 2</SelectItem>
                      <SelectItem value="option3">Option 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slider-preview">Volume</Label>
                  <Slider
                    defaultValue={[50]}
                    id="slider-preview"
                    max={100}
                    step={1}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slider-min">Minimum</Label>
                  <Slider
                    defaultValue={[25]}
                    id="slider-min"
                    max={100}
                    step={1}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slider-max">Maximum</Label>
                  <Slider
                    defaultValue={[75]}
                    id="slider-max"
                    max={100}
                    step={1}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Complete Form Example</CardTitle>
              <CardDescription>All form elements together</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" type="text" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-form">Email</Label>
                  <Input
                    id="email-form"
                    placeholder="your@email.com"
                    type="email"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Input id="message" placeholder="Your message" type="text" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                    <SelectItem value="feedback">Feedback</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Submit</Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {showAll && (
        <div className="space-y-4">
          <h2 className="font-bold text-2xl">Tabs</h2>
          <Tabs defaultValue="tab1">
            <TabsList>
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
              <TabsTrigger value="tab2">Tab 2</TabsTrigger>
              <TabsTrigger value="tab3">Tab 3</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">
              <Card>
                <CardHeader>
                  <CardTitle>Tab 1 Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>This is the content for tab 1.</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="tab2">
              <Card>
                <CardHeader>
                  <CardTitle>Tab 2 Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>This is the content for tab 2.</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="tab3">
              <Card>
                <CardHeader>
                  <CardTitle>Tab 3 Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>This is the content for tab 3.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}
