/**
 * Finish Filter Component
 * 
 * 6 finish types with animated visual effects:
 * - Cream: Subtle gradient
 * - Shimmer: Pulsing shine animation
 * - Cat Eye: Diagonal magnetic stripe animation
 * - Mood Change: Color-cycling animation
 * - Sheer: Semi-transparent with glow
 * - Glitter: Sparkle particle animation
 * 
 * Features:
 * - Multi-select checkboxes
 * - Animated icons/badges per finish type
 * - Active state styling
 */

'use client';

import './FinishFilter.css';

interface FinishFilterProps {
  selectedFinishes: Set<string>;
  onFinishToggle: (finish: string) => void;
}

const FINISHES = [
  'Cream',
  'Shimmer',
  'Cat Eye',
  'Mood Change',
  'Sheer',
  'Glitter',
] as const;

export default function FinishFilter({ selectedFinishes, onFinishToggle }: FinishFilterProps) {
  return (
    <div className="filter-group">
      <label className="filter-label">Finish Type</label>
      <div className="filter-options">
        {FINISHES.map((finish) => {
          const isChecked = selectedFinishes.has(finish);
          // Convert "Cat Eye" to "cat-eye" for CSS class
          const finishClass = finish.toLowerCase().replace(/\s+/g, '-');
          
          return (
            <div key={finish} className={`filter-option finish-${finishClass}`}>
              <input
                type="checkbox"
                id={`finish-${finish}`}
                checked={isChecked}
                onChange={() => onFinishToggle(finish)}
                aria-label={`Filter by ${finish} finish`}
              />
              <label htmlFor={`finish-${finish}`}>
                {finish}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
