"use client";

import React from 'react';
import { useRecipes } from '@/context/RecipeContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RecipeCard } from '@/components/RecipeCard';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

const UserProfilePage = () => {
  const { recipes, guestUser } = useRecipes(); // Get guestUser from context

  const currentUser = guestUser; // Use the dynamic guest user

  const userRecipes = recipes.filter(recipe => recipe.userId === currentUser.id);

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="flex flex-col items-center mb-10 p-6 bg-card rounded-xl shadow-lg border border-border"> {/* Enhanced profile card */}
        <Avatar className="h-32 w-32 mb-6 border-4 border-primary-foreground shadow-md"> {/* Larger avatar */}
          <AvatarImage src={currentUser.profilePicture} alt={currentUser.username} />
          <AvatarFallback className="text-5xl">{currentUser.username.charAt(0)}</AvatarFallback>
        </Avatar>
        <h1 className="text-5xl font-extrabold mb-2">{currentUser.username}</h1> {/* Larger, bolder username */}
        <p className="text-lg text-muted-foreground">Your personal cooking space!</p>
      </div>

      <Separator className="my-10" />

      <h2 className="text-3xl font-bold mb-8 text-center">Recipes Posted by You ({userRecipes.length})</h2> {/* Larger heading */}
      {userRecipes.length === 0 ? (
        <p className="text-center text-xl text-muted-foreground mt-12">You haven't posted any recipes yet. Share your culinary creations!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> {/* Increased gap */}
          {userRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;