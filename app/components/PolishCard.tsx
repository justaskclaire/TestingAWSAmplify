/**
 * Polish Card Component
 * 
 * Displays individual nail polish with:
 * - Image (lazy loaded)
 * - Number badge
 * - Polish name
 * - Hover effects (lift, shadow, image zoom)
 * - Link to product page
 * - Favorite/Next Appt icons with localStorage persistence
 */

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import './PolishCard.css';

export interface PolishCardProps {
  id: string;
  number: string;
  name: string;
  imageUrl: string;
  productLink: string;
  colors: string[];
  finish: string;
}

// localStorage utilities
function getPolishId(number: string, name: string): string {
  return `${number}-${name}`;
}

function getStoredList(key: string): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(`nailpolish_${key}`);
    if (!data) return [];
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(item => typeof item === 'string');
  } catch (e) {
    console.warn(`Failed to load ${key} from localStorage:`, e);
    return [];
  }
}

function saveStoredList(key: string, list: string[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`nailpolish_${key}`, JSON.stringify(list));
  } catch (e) {
    console.error(`Failed to save ${key} to localStorage:`, e);
  }
}

function toggleInList(key: string, polishId: string): boolean {
  const list = getStoredList(key);
  const index = list.indexOf(polishId);
  
  if (index > -1) {
    list.splice(index, 1);
    saveStoredList(key, list);
    return false;
  } else {
    list.push(polishId);
    saveStoredList(key, list);
    return true;
  }
}

function isInList(key: string, polishId: string): boolean {
  return getStoredList(key).includes(polishId);
}

export default function PolishCard({
  number,
  name,
  imageUrl,
  productLink,
}: PolishCardProps) {
  const polishId = getPolishId(number, name);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isNextAppt, setIsNextAppt] = useState(false);
  
  useEffect(() => {
    setIsFavorite(isInList('favorites', polishId));
    setIsNextAppt(isInList('nextappt', polishId));
  }, [polishId]);
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newState = toggleInList('favorites', polishId);
    setIsFavorite(newState);
    // Dispatch custom event for filter update
    window.dispatchEvent(new CustomEvent('personalFilterChange'));
  };
  
  const handleNextApptClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newState = toggleInList('nextappt', polishId);
    setIsNextAppt(newState);
    // Dispatch custom event for filter update
    window.dispatchEvent(new CustomEvent('personalFilterChange'));
  };
  
  // Determine if we should show the icon container
  const hasActiveIcons = isFavorite || isNextAppt;
  
  return (
    <a
      href={productLink}
      target="_blank"
      rel="noopener noreferrer"
      className="card"
    >
      {/* Image container with icons overlay */}
      <div className="card-image-container">
        <Image
          src={imageUrl}
          alt={`${name} - Polish #${number}`}
          width={300}
          height={300}
          className="card-thumb"
          loading="lazy"
        />
        
        {/* Personalization icons (Phase 4) */}
        <div className={`card-icons ${hasActiveIcons ? 'has-active' : ''}`}>
          <button
            type="button"
            className={`icon-btn favorite-btn ${isFavorite ? 'active' : ''}`}
            onClick={handleFavoriteClick}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
          
          <button
            type="button"
            className={`icon-btn nextappt-btn ${isNextAppt ? 'active' : ''}`}
            onClick={handleNextApptClick}
            aria-label={isNextAppt ? 'Remove from next appointment' : 'Add to next appointment'}
            title={isNextAppt ? 'Remove from next appointment' : 'Add to next appointment'}
          >
            {isNextAppt ? '📅' : '🗓️'}
          </button>
        </div>
      </div>
      
      {/* Card metadata */}
      <div className="card-meta">
        <span className="card-num">{number}</span>
        <p className="card-name">{name}</p>
      </div>
    </a>
  );
}
