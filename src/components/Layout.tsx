"use client";

import React, { ReactNode } from 'react';
import { MadeWithDyad } from './made-with-dyad';
import { NavigationBar } from './NavigationBar';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-grow container mx-auto p-4 pb-20"> {/* Added pb-20 for bottom padding */}
        {children}
      </main>
      <NavigationBar />
      <MadeWithDyad />
    </div>
  );
};