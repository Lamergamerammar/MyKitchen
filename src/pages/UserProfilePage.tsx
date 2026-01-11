"use client";

import React from 'react';
import { useRecipes } from '@/context/RecipeContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RecipeCard } from '@/components/RecipeCard';
import { Separator } from '@/components/ui/separator';

const UserProfilePage = () => {
  const { recipes } = useRecipes();
  // Mock user for now, matching the one in RecipeContext
  const currentUser = {
    id: 'user-123',
    username: 'ChefMaster',
    profilePicture: 'https://api.dicebear.com/8.x/adventurer/svg?seed=ChefMaster',
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
        <p className="text-muted-foreground">Your culinary journey starts here!</p>
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