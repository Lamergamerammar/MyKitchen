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
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <Link to={`/recipes/${recipe.id}`}>
        {recipe.images.length > 0 ? (
          <img
            src={recipe.images[0]}
            alt={recipe.name}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-muted flex items-center justify-center text-muted-foreground">
            No Image
          </div>
        )}
      </Link>
      <CardHeader>
        <CardTitle className="text-xl font-semibold truncate">
          <Link to={`/recipes/${recipe.id}`} className="hover:underline">
            {recipe.name}
          </Link>
        </CardTitle>
        <div className="flex items-center text-sm text-muted-foreground">
          <Avatar className="h-6 w-6 mr-2">
            <AvatarImage src={recipe.profilePicture} alt={recipe.username} />
            <AvatarFallback>{recipe.username.charAt(0)}</AvatarFallback>
          </Avatar>
          <span>{recipe.username}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-2">
          {recipe.type}
        </p>
        <p className="text-sm line-clamp-2">{recipe.description || 'No description provided.'}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Button variant="ghost" size="sm" onClick={() => likeRecipe(recipe.id)} className="flex items-center space-x-1">
          <Heart className="h-4 w-4" fill={recipe.likes > 0 ? "currentColor" : "none"} />
          <span>{recipe.likes}</span>
        </Button>
        <Button variant="ghost" size="sm" onClick={() => toggleSaveRecipe(recipe.id)} className="flex items-center space-x-1">
          <Bookmark className="h-4 w-4" fill={isSaved ? "currentColor" : "none"} />
          <span>{isSaved ? 'Saved' : 'Save'}</span>
        </Button>
      </CardFooter>
    </Card>
  );
};