/**
 * Polish Filters Hook
 * 
 * Manages filter state and filtering logic for polish gallery:
 * - Color filters (11 colors)
 * - Finish filters (6 types)
 * - Personalization filters (favorites, next appointment)
 * 
 * Filter logic: AND between categories, OR within category
 * Example: (matchesColor OR noColorSelected) AND (matchesFinish OR noFinishSelected)
 */

'use client';

import { useState, useMemo } from 'react';

export interface Polish {
  id: string;
  brand: string;
  number: string;
  name: string;
  link: string;
  imageAddress: string;
  localImage: string;
  colors: string[];
  finish: string;
}

export interface FilterState {
  selectedColors: Set<string>;
  selectedFinishes: Set<string>;
  showFavorites: boolean;
  showNextAppointment: boolean;
}

export function usePolishFilters(allPolishes: Polish[]) {
  // Filter state
  const [selectedColors, setSelectedColors] = useState<Set<string>>(new Set());
  const [selectedFinishes, setSelectedFinishes] = useState<Set<string>>(new Set());
  const [showFavorites, setShowFavorites] = useState(false);
  const [showNextAppointment, setShowNextAppointment] = useState(false);

  // Toggle functions
  const toggleColor = (color: string) => {
    setSelectedColors(prev => {
      const newSet = new Set(prev);
      if (newSet.has(color)) {
        newSet.delete(color);
      } else {
        newSet.add(color);
      }
      return newSet;
    });
  };

  const toggleFinish = (finish: string) => {
    setSelectedFinishes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(finish)) {
        newSet.delete(finish);
      } else {
        newSet.add(finish);
      }
      return newSet;
    });
  };

  const toggleFavorites = () => {
    setShowFavorites(prev => !prev);
  };

  const toggleNextAppointment = () => {
    setShowNextAppointment(prev => !prev);
  };

  // Clear all filters
  const clearAll = () => {
    setSelectedColors(new Set());
    setSelectedFinishes(new Set());
    setShowFavorites(false);
    setShowNextAppointment(false);
  };

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return selectedColors.size > 0 || 
           selectedFinishes.size > 0 || 
           showFavorites || 
           showNextAppointment;
  }, [selectedColors, selectedFinishes, showFavorites, showNextAppointment]);

  // Filter polishes based on current filter state
  const filteredPolishes = useMemo(() => {
    return allPolishes.filter(polish => {
      // Color filter: OR logic within colors
      // If no colors selected, pass. Otherwise, check if polish has ANY selected color
      const matchesColor = selectedColors.size === 0 || 
        polish.colors.some(color => selectedColors.has(color));

      // Finish filter: exact match
      // If no finishes selected, pass. Otherwise, check if polish finish is selected
      const matchesFinish = selectedFinishes.size === 0 || 
        selectedFinishes.has(polish.finish);

      // Personalization filters (TODO: implement with user preferences from database)
      // For now, these will always pass since we don't have user data yet
      const matchesPersonalization = true;

      // AND logic between filter categories
      return matchesColor && matchesFinish && matchesPersonalization;
    });
  }, [allPolishes, selectedColors, selectedFinishes, showFavorites, showNextAppointment]);

  return {
    // State
    selectedColors,
    selectedFinishes,
    showFavorites,
    showNextAppointment,
    hasActiveFilters,
    
    // Toggle functions
    toggleColor,
    toggleFinish,
    toggleFavorites,
    toggleNextAppointment,
    
    // Utility
    clearAll,
    
    // Filtered results
    filteredPolishes,
  };
}
