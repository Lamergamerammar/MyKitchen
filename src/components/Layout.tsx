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
      <main className="flex-grow container mx-auto py-8 px-4 md:px-6 lg:px-8 pb-20"> {/* Adjusted padding */}
        {children}
      </main>
      <NavigationBar />
      <MadeWithDyad />
    </div>
  );
};