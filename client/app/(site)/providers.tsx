"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import { useState, useEffect } from "react";

interface ProviderProps {
  children: ReactNode;
}

export default function Provider({ children }: ProviderProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ThemeProvider enableSystem={true} attribute="class">
      {children}
    </ThemeProvider>
  );
}
