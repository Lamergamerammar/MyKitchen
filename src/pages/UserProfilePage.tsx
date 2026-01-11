"use client";

import React from 'react';
import { useRecipes } from '@/context/RecipeContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RecipeCard } from '@/components/RecipeCard';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

const UserProfilePage = () => {
  const { recipes } = useRecipes();

  // Generic user for now
  const currentUser = {
    id: 'guest-user',
    username: 'GuestChef',
    profilePicture: `https://api.dicebear.com/8.x/adventurer/svg?seed=GuestChef`, // Generate avatar based on generic name
  };

  const userRecipes = recipes.filter(recipe => recipe.userId === currentUser.id);

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="flex flex-col items-center mb-8">
        <Avatar className="h-24 w-24 mb-4">
          <AvatarImage src={currentUser.profilePicture} alt={currentUser.username} />
          <AvatarFallback className="text-4xl">{currentUser.username.charAt(0)}</AvatarFallback>
        </Avatar>
        <h1 className="text-4xl font-bold">{currentUser.username}</h1>
        <p className="text-muted-foreground">Enjoy exploring and sharing recipes!</p>
      </div>

      <Separator className="my-8" />

      <h2 className="text-2xl font-bold mb-6 text-center">Recipes Posted by You ({userRecipes.length})</h2>
      {userRecipes.length === 0 ? (
        <p className="text-center text-muted-foreground mt-8">You haven't posted any recipes yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;