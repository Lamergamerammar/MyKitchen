"use client";

import React from 'react';
import { useRecipes } from '@/context/RecipeContext';
import { useAuth } from '@/context/AuthContext'; // Import useAuth
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RecipeCard } from '@/components/RecipeCard';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

const UserProfilePage = () => {
  const { recipes } = useRecipes();
  const { user, signOut } = useAuth(); // Get user and signOut from AuthContext

  // Use actual user data from Supabase
  const currentUser = {
    id: user?.id || '',
    username: user?.email || 'Guest', // Use email as username for now
    profilePicture: `https://api.dicebear.com/8.x/adventurer/svg?seed=${user?.email}`, // Generate avatar based on email
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
        <p className="text-muted-foreground">{user?.email}</p>
        <Button variant="outline" className="mt-4" onClick={signOut}>
          <LogOut className="h-4 w-4 mr-2" /> Logout
        </Button>
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