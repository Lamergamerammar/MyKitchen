"use client";

import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation
import { Home, Plus, Bookmark, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

export const NavigationBar = () => {
  const isMobile = useIsMobile();
  const location = useLocation(); // Get current location

  // Hide navigation bar on desktop AND on the landing page
  if (!isMobile || location.pathname === '/welcome') {
    return null;
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