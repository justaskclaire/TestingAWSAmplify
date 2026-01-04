/**
 * Polish Card Component
 * 
 * Displays individual nail polish with:
 * - Image (lazy loaded)
 * - Number badge
 * - Polish name
 * - Hover effects (lift, shadow, image zoom)
 * - Link to product page
 * - Favorite/Next Appt icons (to be implemented in Phase 4)
 */

'use client';

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
  isFavorite?: boolean;
  isNextAppt?: boolean;
  onFavoriteToggle?: (id: string) => void;
  onNextApptToggle?: (id: string) => void;
}

export default function PolishCard({
  id,
  number,
  name,
  imageUrl,
  productLink,
  colors,
  finish,
  isFavorite = false,
  isNextAppt = false,
  onFavoriteToggle,
  onNextApptToggle,
}: PolishCardProps) {
  
  // Handle icon clicks - prevent navigation to product page
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onFavoriteToggle) {
      onFavoriteToggle(id);
    }
  };
  
  const handleNextApptClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onNextApptToggle) {
      onNextApptToggle(id);
    }
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
            {isFavorite ? '❤️' : '♡'}
          </button>
          
          <button
            type="button"
            className={`icon-btn nextappt-btn ${isNextAppt ? 'active' : ''}`}
            onClick={handleNextApptClick}
            aria-label={isNextAppt ? 'Remove from next appointment' : 'Add to next appointment'}
            title={isNextAppt ? 'Remove from next appointment' : 'Add to next appointment'}
          >
            📅
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
