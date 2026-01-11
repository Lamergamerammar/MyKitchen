"use client";

import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RecipeType } from '@/context/RecipeContext';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedType: RecipeType | 'All';
  setSelectedType: (type: RecipeType | 'All') => void;
}

export const SearchBar = ({ searchTerm, setSearchTerm, selectedType, setSelectedType }: SearchBarProps) => {
  const recipeTypes: (RecipeType | 'All')[] = ['All', 'Sweet', 'Salty', 'Snack', 'Lunch', 'Dinner', 'Breakfast', 'Dessert'];

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <Input
        type="text"
        placeholder="Search recipes by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-grow"
      />
      <Select value={selectedType} onValueChange={(value: RecipeType | 'All') => setSelectedType(value)}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Filter by type" />
        </SelectTrigger>
        <SelectContent>
          {recipeTypes.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};