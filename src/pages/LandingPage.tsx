"use client";

import React from 'react';
import { AuthForm } from '@/components/AuthForm';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-red-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          HomeCooked
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 max-w-xl mx-auto">
          Discover, share, and save delicious home-cooked recipes from real people.
        </p>
      </div>
      <AuthForm />
    </div>
  );
};

export default LandingPage;