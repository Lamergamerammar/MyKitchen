"use client";

import React, { useState } from 'react';
import { useRecipes, RecipeType } from '@/context/RecipeContext';
import { RecipeCard } from '@/components/RecipeCard';
import { SearchBar } from '@/components/SearchBar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

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
    <div className="space-y-12 py-4">
      {/* Hero Section */}
      <section className="text-center py-16 px-4 bg-gradient-to-r from-primary to-blue-600 text-primary-foreground rounded-xl shadow-lg">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
          Discover Your Next Favorite Meal
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90">
          Explore a world of delicious recipes shared by home cooks like you.
        </p>
        <Button asChild className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8 py-6 text-lg rounded-full shadow-md hover:shadow-xl transition-all duration-300">
          <Link to="/add-recipe">
            <Plus className="mr-2 h-5 w-5" /> Add Your Recipe
          </Link>
        </Button>
      </section>

      {/* Search and Filter Section */}
      <section className="px-4">
        <h2 className="text-3xl font-bold text-center mb-6">Browse Recipes</h2>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />
      </section>

      {/* Recipe List Section */}
      <section className="px-4">
        {filteredRecipes.length === 0 ? (
          <div className="text-center py-16 bg-muted rounded-lg shadow-inner">
            <p className="text-2xl text-muted-foreground font-semibold mb-4">No recipes found matching your criteria.</p>
            <p className="text-lg text-muted-foreground">Try adjusting your search or be the first to add a new recipe!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;