"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Recipe, useRecipes } from '@/context/RecipeContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Bookmark } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const { toggleSaveRecipe, savedRecipeIds, likeRecipe } = useRecipes();
  const isSaved = savedRecipeIds.includes(recipe.id);

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl border border-border"> {/* Enhanced card styling */}
      <Link to={`/recipes/${recipe.id}`}>
        {recipe.images.length > 0 ? (
          <img
            src={recipe.images[0]}
            alt={recipe.name}
            className="w-full h-52 object-cover" // Slightly taller image
          />
        ) : (
          <div className="w-full h-52 bg-muted flex items-center justify-center text-muted-foreground text-lg font-medium">
            No Image Available
          </div>
        )}
      </Link>
      <CardHeader className="pb-3"> {/* Adjusted padding */}
        <CardTitle className="text-2xl font-bold truncate"> {/* Larger, bolder title */}
          <Link to={`/recipes/${recipe.id}`} className="hover:underline">
            {recipe.name}
          </Link>
        </CardTitle>
        <div className="flex items-center text-sm text-muted-foreground mt-1">
          <Avatar className="h-7 w-7 mr-2">
            <AvatarImage src={recipe.profilePicture} alt={recipe.username} />
            <AvatarFallback>{recipe.username.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="font-medium">{recipe.username}</span>
        </div>
      </CardHeader>
      <CardContent className="pt-2 pb-4"> {/* Adjusted padding */}
        <p className="text-sm text-primary mb-2 capitalize font-semibold">
          {recipe.type}
        </p>
        <p className="text-base line-clamp-2 text-gray-700 dark:text-gray-300">{recipe.description || 'No description provided.'}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-4"> {/* Adjusted padding */}
        <Button variant="ghost" size="sm" onClick={() => likeRecipe(recipe.id)} className="flex items-center space-x-1 text-base">
          <Heart className="h-5 w-5" fill={recipe.likes > 0 ? "currentColor" : "none"} />
          <span>{recipe.likes}</span>
        </Button>
        <Button variant="ghost" size="sm" onClick={() => toggleSaveRecipe(recipe.id)} className="flex items-center space-x-1 text-base">
          <Bookmark className="h-5 w-5" fill={isSaved ? "currentColor" : "none"} />
          <span>{isSaved ? 'Saved' : 'Save'}</span>
        </Button>
      </CardFooter>
    </Card>
  );
};