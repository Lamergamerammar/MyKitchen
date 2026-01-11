"use client";

import React from 'react';
import { RecipeForm } from '@/components/RecipeForm';

const AddRecipePage = () => {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Add New Recipe</h1>
      <RecipeForm />
    </div>
  );
};

export default AddRecipePage;