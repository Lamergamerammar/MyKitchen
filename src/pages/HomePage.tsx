"use client";

import React, { useState } from 'react';
import { useRecipes } from '@/context/RecipeContext';
import { RecipeCard } from '@/components/RecipeCard';
import { SearchBar } from '@/components/SearchBar';
import { RecipeType } from '@/context/RecipeContext';

const HomePage = () => {
  const { recipes } = useRecipes();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<RecipeType | 'All'>('All');

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || recipe.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-center mt-4">Home Cooking Feed</h1>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />
      {filteredRecipes.length === 0 ? (
        <p className="text-center text-muted-foreground mt-8">No recipes found. Be the first to add one!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;