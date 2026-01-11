"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Plus, Bookmark, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

export const NavigationBar = () => {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return null; // Hide navigation bar on desktop
  }

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Plus, label: 'Add', path: '/add-recipe' },
    { icon: Bookmark, label: 'Saved', path: '/saved-recipes' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t shadow-lg z-50 md:hidden">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <Button
            key={item.label}
            asChild
            variant="ghost"
            className="flex flex-col items-center justify-center h-full w-full text-muted-foreground data-[state=active]:text-primary"
          >
            <Link to={item.path}>
              <item.icon className="h-5 w-5 mb-1" />
              <span className="text-xs">{item.label}</span>
            </Link>
          </Button>
        ))}
      </div>
    </nav>
  );
};