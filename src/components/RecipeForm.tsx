"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecipes, RecipeType } from '@/context/RecipeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

export const RecipeForm = () => {
  const navigate = useNavigate();
  const { addRecipe } = useRecipes();
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [images, setImages] = useState<string[]>([]); // Store Base64 strings
  const [type, setType] = useState<RecipeType>('Dinner');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages([reader.result as string]); // Only allow one image for simplicity
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !ingredients || !instructions) {
      toast.error('Please fill in all required fields: Name, Ingredients, and Instructions.');
      return;
    }

    setLoading(true);
    addRecipe({
      name,
      ingredients,
      instructions,
      images,
      type,
      description,
    });
    setLoading(false);
    navigate('/'); // Redirect to home feed after adding
  };

  const recipeTypes: RecipeType[] = ['Sweet', 'Salty', 'Snack', 'Lunch', 'Dinner', 'Breakfast', 'Dessert'];

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-card rounded-xl shadow-lg border border-border"> {/* Enhanced form styling */}
      <div>
        <Label htmlFor="name" className="text-base">Recipe Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Delicious Pasta"
          required
          className="h-10 text-base"
        />
      </div>

      <div>
        <Label htmlFor="ingredients" className="text-base">Ingredients (one per line)</Label>
        <Textarea
          id="ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="200g pasta&#10;1 can tomatoes&#10;1 onion"
          rows={5}
          required
          className="text-base"
        />
      </div>

      <div>
        <Label htmlFor="instructions" className="text-base">Instructions (step-by-step)</Label>
        <Textarea
          id="instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder="1. Boil water.&#10;2. Cook pasta.&#10;3. Make sauce."
          rows={7}
          required
          className="text-base"
        />
      </div>

      <div>
        <Label htmlFor="image" className="text-base">Upload Image</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="h-10 text-base"
        />
        {images.length > 0 && (
          <div className="mt-4">
            <img src={images[0]} alt="Recipe preview" className="w-40 h-40 object-cover rounded-lg shadow-md" /> {/* Larger preview */}
          </div>
        )}
      </div>

      <div>
        <Label htmlFor="type" className="text-base">Recipe Type</Label>
        <Select value={type} onValueChange={(value: RecipeType) => setType(value)}>
          <SelectTrigger id="type" className="h-10 text-base">
            <SelectValue placeholder="Select a type" />
          </SelectTrigger>
          <SelectContent>
            {recipeTypes.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="description" className="text-base">Description / Notes (Optional)</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="A quick and easy weeknight meal."
          rows={3}
          className="text-base"
        />
      </div>

      <Button type="submit" className="w-full h-12 text-lg" disabled={loading}> {/* Larger button */}
        {loading ? 'Adding Recipe...' : 'Add Recipe'}
      </Button>
    </form>
  );
};