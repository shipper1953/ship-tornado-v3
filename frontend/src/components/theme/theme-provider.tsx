// ship-tornado-v3/frontend/src/components/theme/theme-provider.tsx
import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { ReactNode } from "react";

export function ThemeProvider({
  children,
  ...props
}: { children: ReactNode } & Record<string, any>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}