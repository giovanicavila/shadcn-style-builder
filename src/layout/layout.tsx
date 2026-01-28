import { Header } from "@/components/header/header";
import { DesignBuilder } from "@/pages/design-builder/design-builder";
import { Providers } from "@/providers/providers";

export function Layout() {
  return (
    <div className="bg-background">
      <Providers>
        <Header />
        <DesignBuilder />
      </Providers>
    </div>
  );
}
