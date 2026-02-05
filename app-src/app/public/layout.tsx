"use client";

import React from 'react';
import { useTheme } from "../../contexts/theme-context";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
      {children}
    </main>
  );
}
