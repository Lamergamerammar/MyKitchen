"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

export type RecipeType = 'Sweet' | 'Salty' | 'Snack' | 'Lunch' | 'Dinner' | 'Breakfast' | 'Dessert';

export interface Recipe {
  id: string;
  name: string;
  ingredients: string;
  instructions: string;
  images: string[]; // Base64 strings for images
  type: RecipeType;
  description?: string;
  userId: string; // To link to a user profile
  username: string;
  profilePicture?: string; // Base64 string for profile picture
  likes: number;
  comments: Comment[];
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  text: string;
  timestamp: number;
}

interface GuestUser {
  id: string;
  username: string;
  profilePicture: string;
}

interface RecipeContextType {
  recipes: Recipe[];
  savedRecipeIds: string[];
  guestUser: GuestUser; // Expose guest user
  addRecipe: (recipe: Omit<Recipe, 'id' | 'userId' | 'username' | 'profilePicture' | 'likes' | 'comments'>) => void;
  toggleSaveRecipe: (recipeId: string) => void;
  likeRecipe: (recipeId: string) => void;
  addComment: (recipeId: string, commentText: string) => void;
  getRecipeById: (id: string) => Recipe | undefined;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

// Function to generate a random guest username and avatar
const generateGuestUser = (): GuestUser => {
  const adjectives = ['Happy', 'Clever', 'Hungry', 'Creative', 'Spicy', 'Sweet', 'Savvy', 'Quick'];
  const nouns = ['Chef', 'Cook', 'Baker', 'Gourmet', 'Foodie', 'Creator', 'Maestro'];
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  const randomNumber = Math.floor(Math.random() * 1000);
  const username = `${randomAdjective}${randomNoun}${randomNumber}`;
  const profilePicture = `https://api.dicebear.com/8.x/adventurer/svg?seed=${username}`;
  return { id: `guest-${username}`, username, profilePicture };
};

export const RecipeProvider = ({ children }: { children: ReactNode }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [savedRecipeIds, setSavedRecipeIds] = useState<string[]>([]);
  const [guestUser, setGuestUser] = useState<GuestUser>(() => {
    // Initialize guest user from localStorage or generate new
    const storedGuestUserId = localStorage.getItem('guestUserId');
    const storedGuestUsername = localStorage.getItem('guestUsername');
    const storedGuestProfilePicture = localStorage.getItem('guestProfilePicture');

    if (storedGuestUserId && storedGuestUsername && storedGuestProfilePicture) {
      return {
        id: storedGuestUserId,
        username: storedGuestUsername,
        profilePicture: storedGuestProfilePicture,
      };
    } else {
      const newGuestUser = generateGuestUser();
      localStorage.setItem('guestUserId', newGuestUser.id);
      localStorage.setItem('guestUsername', newGuestUser.username);
      localStorage.setItem('guestProfilePicture', newGuestUser.profilePicture);
      return newGuestUser;
    }
  });

  useEffect(() => {
    const storedRecipes = localStorage.getItem('recipes');
    if (storedRecipes) {
      setRecipes(JSON.parse(storedRecipes));
    }
    const storedSavedRecipes = localStorage.getItem('savedRecipeIds');
    if (storedSavedRecipes) {
      setSavedRecipeIds(JSON.parse(storedSavedRecipes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  useEffect(() => {
    localStorage.setItem('savedRecipeIds', JSON.stringify(savedRecipeIds));
  }, [savedRecipeIds]);

  const addRecipe = (newRecipeData: Omit<Recipe, 'id' | 'userId' | 'username' | 'profilePicture' | 'likes' | 'comments'>) => {
    const newRecipe: Recipe = {
      ...newRecipeData,
      id: `recipe-${Date.now()}`,
      userId: guestUser.id, // Use dynamic guest user
      username: guestUser.username, // Use dynamic guest user
      profilePicture: guestUser.profilePicture, // Use dynamic guest user
      likes: 0,
      comments: [],
    };
    setRecipes((prev) => [newRecipe, ...prev]);
    toast.success('Recipe added successfully!');
  };

  const toggleSaveRecipe = (recipeId: string) => {
    setSavedRecipeIds((prev) => {
      if (prev.includes(recipeId)) {
        toast.info('Recipe unsaved.');
        return prev.filter((id) => id !== recipeId);
      } else {
        toast.success('Recipe saved!');
        return [...prev, recipeId];
      }
    });
  };

  const likeRecipe = (recipeId: string) => {
    setRecipes((prev) =>
      prev.map((recipe) =>
        recipe.id === recipeId ? { ...recipe, likes: recipe.likes + 1 } : recipe
      )
    );
    toast.success('Recipe liked!');
  };

  const addComment = (recipeId: string, commentText: string) => {
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      userId: guestUser.id, // Use dynamic guest user
      username: guestUser.username, // Use dynamic guest user
      text: commentText,
      timestamp: Date.now(),
    };
    setRecipes((prev) =>
      prev.map((recipe) =>
        recipe.id === recipeId
          ? { ...recipe, comments: [...recipe.comments, newComment] }
          : recipe
      )
    );
    toast.success('Comment added!');
  };

  const getRecipeById = (id: string) => recipes.find(recipe => recipe.id === id);

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        savedRecipeIds,
        guestUser, // Provide guestUser in context
        addRecipe,
        toggleSaveRecipe,
        likeRecipe,
        addComment,
        getRecipeById,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (context === undefined) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return context;
};