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
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold mb-4">Recipe Not Found</h1>
        <p className="text-lg text-muted-foreground mb-6">The recipe you are looking for does not exist.</p>
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
    <div className="max-w-3xl mx-auto bg-card rounded-xl shadow-xl overflow-hidden border border-border"> {/* Enhanced card styling */}
      {recipe.images.length > 0 && (
        <img
          src={recipe.images[0]}
          alt={recipe.name}
          className="w-full h-72 object-cover" // Slightly taller image
        />
      )}
      <div className="p-8"> {/* Increased padding */}
        <h1 className="text-5xl font-extrabold mb-3 leading-tight">{recipe.name}</h1> {/* Larger, bolder title */}
        <div className="flex items-center text-base text-muted-foreground mb-6"> {/* Larger text */}
          <Avatar className="h-7 w-7 mr-2">
            <AvatarImage src={recipe.profilePicture} alt={recipe.username} />
            <AvatarFallback>{recipe.username.charAt(0)}</AvatarFallback>
          </Avatar>
          <span>By <span className="font-semibold">{recipe.username}</span></span>
          <span className="mx-3">•</span>
          <span className="capitalize font-medium">{recipe.type}</span>
        </div>

        <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">{recipe.description}</p> {/* Larger description */}

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-6"> {/* Increased spacing */}
            <Button variant="ghost" onClick={() => likeRecipe(recipe.id)} className="flex items-center space-x-2 text-lg"> {/* Larger button text */}
              <Heart className="h-6 w-6" fill={recipe.likes > 0 ? "currentColor" : "none"} />
              <span>{recipe.likes} Likes</span>
            </Button>
            <Button variant="ghost" onClick={() => toggleSaveRecipe(recipe.id)} className="flex items-center space-x-2 text-lg">
              <Bookmark className="h-6 w-6" fill={isSaved ? "currentColor" : "none"} />
              <span>{isSaved ? 'Saved' : 'Save Recipe'}</span>
            </Button>
          </div>
        </div>

        <Separator className="my-8" />

        <h2 className="text-3xl font-bold mb-5">Ingredients</h2> {/* Larger heading */}
        <ul className="list-disc list-inside space-y-3 text-lg text-gray-800 dark:text-gray-200 mb-8"> {/* Increased spacing */}
          {recipe.ingredients.split('\n').map((item, index) => (
            item.trim() && <li key={index}>{item.trim()}</li>
          ))}
        </ul>

        <h2 className="text-3xl font-bold mb-5">Instructions</h2> {/* Larger heading */}
        <ol className="list-decimal list-inside space-y-4 text-lg text-gray-800 dark:text-gray-200 mb-8"> {/* Increased spacing */}
          {recipe.instructions.split('\n').map((step, index) => (
            step.trim() && <li key={index}>{step.trim()}</li>
          ))}
        </ol>

        <Separator className="my-8" />

        <h2 className="text-3xl font-bold mb-5">Comments ({recipe.comments.length})</h2> {/* Larger heading */}
        <div className="space-y-6 mb-8"> {/* Increased spacing */}
          {recipe.comments.length === 0 ? (
            <p className="text-muted-foreground text-lg">No comments yet. Be the first to comment!</p>
          ) : (
            recipe.comments.map((comment) => (
              <div key={comment.id} className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg"> {/* Styled comment */}
                <Avatar className="h-9 w-9">
                  <AvatarImage src={`https://api.dicebear.com/8.x/adventurer/svg?seed=${comment.username}`} alt={comment.username} />
                  <AvatarFallback>{comment.username.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-base">{comment.username}</p>
                  <p className="text-gray-700 dark:text-gray-300 text-lg mt-1">{comment.text}</p>
                  <p className="text-xs text-muted-foreground mt-2">{new Date(comment.timestamp).toLocaleString()}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex space-x-3"> {/* Increased spacing */}
          <Input
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddComment();
              }
            }}
            className="h-12 text-base"
          />
          <Button onClick={handleAddComment} className="h-12 px-6 text-base">
            <MessageCircle className="h-5 w-5 mr-2" /> Comment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;