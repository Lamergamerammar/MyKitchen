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
    <div className="space-y-8 py-4"> {/* Added vertical padding and increased spacing */}
      <h1 className="text-4xl font-extrabold text-center mb-6">Home Cooking Feed</h1> {/* Larger, bolder title */}
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />
      {filteredRecipes.length === 0 ? (
        <p className="text-center text-xl text-muted-foreground mt-12">No recipes found. Be the first to add one!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Increased gap */}
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;