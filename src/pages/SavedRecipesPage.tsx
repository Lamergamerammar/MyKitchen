"use client";

import React from 'react';
import { useRecipes } from '@/context/RecipeContext';
import { RecipeCard } from '@/components/RecipeCard';

const SavedRecipesPage = () => {
  const { recipes, savedRecipeIds } = useRecipes();
  const savedRecipes = recipes.filter(recipe => savedRecipeIds.includes(recipe.id));

  return (
    <div className="space-y-8 py-4">
      <h1 className="text-4xl font-bold text-center mt-4">My Saved Recipes</h1>
      {savedRecipes.length === 0 ? (
        <p className="text-center text-xl text-muted-foreground mt-12">You haven't saved any recipes yet. Start exploring and save your favorites!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {savedRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedRecipesPage;