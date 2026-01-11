"use client";

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecipes } from '@/context/RecipeContext';
import { Button } from '@/components/ui/button';
import { Heart, Bookmark, MessageCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const RecipeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getRecipeById, toggleSaveRecipe, savedRecipeIds, likeRecipe, addComment } = useRecipes();
  const recipe = id ? getRecipeById(id) : undefined;
  const [commentText, setCommentText] = React.useState('');

  if (!recipe) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold mb-4">Recipe Not Found</h1>
        <Button onClick={() => navigate('/')}>Go to Home</Button>
      </div>
    );
  }

  const isSaved = savedRecipeIds.includes(recipe.id);

  const handleAddComment = () => {
    if (commentText.trim()) {
      addComment(recipe.id, commentText);
      setCommentText('');
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-card rounded-lg shadow-lg overflow-hidden">
      {recipe.images.length > 0 && (
        <img
          src={recipe.images[0]}
          alt={recipe.name}
          className="w-full h-64 object-cover"
        />
      )}
      <div className="p-6">
        <h1 className="text-4xl font-extrabold mb-2">{recipe.name}</h1>
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <Avatar className="h-6 w-6 mr-2">
            <AvatarImage src={recipe.profilePicture} alt={recipe.username} />
            <AvatarFallback>{recipe.username.charAt(0)}</AvatarFallback>
          </Avatar>
          <span>By {recipe.username}</span>
          <span className="mx-2">•</span>
          <span className="capitalize">{recipe.type}</span>
        </div>

        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">{recipe.description}</p>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => likeRecipe(recipe.id)} className="flex items-center space-x-1">
              <Heart className="h-5 w-5" fill={recipe.likes > 0 ? "currentColor" : "none"} />
              <span>{recipe.likes}</span>
            </Button>
            <Button variant="ghost" onClick={() => toggleSaveRecipe(recipe.id)} className="flex items-center space-x-1">
              <Bookmark className="h-5 w-5" fill={isSaved ? "currentColor" : "none"} />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </Button>
          </div>
        </div>

        <Separator className="my-6" />

        <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
        <ul className="list-disc list-inside space-y-2 text-lg text-gray-800 dark:text-gray-200 mb-6">
          {recipe.ingredients.split('\n').map((item, index) => (
            item.trim() && <li key={index}>{item.trim()}</li>
          ))}
        </ul>

        <h2 className="text-2xl font-bold mb-4">Instructions</h2>
        <ol className="list-decimal list-inside space-y-3 text-lg text-gray-800 dark:text-gray-200 mb-6">
          {recipe.instructions.split('\n').map((step, index) => (
            step.trim() && <li key={index}>{step.trim()}</li>
          ))}
        </ol>

        <Separator className="my-6" />

        <h2 className="text-2xl font-bold mb-4">Comments ({recipe.comments.length})</h2>
        <div className="space-y-4 mb-6">
          {recipe.comments.length === 0 ? (
            <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
          ) : (
            recipe.comments.map((comment) => (
              <div key={comment.id} className="flex items-start space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={`https://api.dicebear.com/8.x/adventurer/svg?seed=${comment.username}`} alt={comment.username} />
                  <AvatarFallback>{comment.username.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-sm">{comment.username}</p>
                  <p className="text-gray-700 dark:text-gray-300 text-base">{comment.text}</p>
                  <p className="text-xs text-muted-foreground">{new Date(comment.timestamp).toLocaleString()}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex space-x-2">
          <Input
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddComment();
              }
            }}
          />
          <Button onClick={handleAddComment}>
            <MessageCircle className="h-4 w-4 mr-2" /> Comment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;