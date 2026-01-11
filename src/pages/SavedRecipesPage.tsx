"use client";

import React from 'react';
import { useRecipes } from '@/context/RecipeContext';
import { RecipeCard } from '@/components/RecipeCard';

const SavedRecipesPage = () => {
  const { recipes, savedRecipeIds } = useRecipes();
  const savedRecipes = recipes.filter(recipe => savedRecipeIds.includes(recipe.id));

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-center mt-4">My Saved Recipes</h1>
      {savedRecipes.length === 0 ? (
        <p className="text-center text-muted-foreground mt-8">You haven't saved any recipes yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedRecipesPage;