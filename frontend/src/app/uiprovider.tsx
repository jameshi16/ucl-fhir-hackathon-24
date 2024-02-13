'use client';

import { NextUIProvider } from "@nextui-org/react";
import { DataProvider } from "./contexts/DataProvider";

export default function UIProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <DataProvider>
        {children}
      </DataProvider>
    </NextUIProvider>
  );
}
