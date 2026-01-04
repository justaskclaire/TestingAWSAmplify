/**
 * Color Filter Component
 * 
 * 11 color categories with color-coded chips:
 * Red, Pink, Orange, Yellow, Green, Blue, Purple, Brown, Neutral, Grey, Gold
 * 
 * Features:
 * - Multi-select checkboxes
 * - Color-coded backgrounds
 * - Active state styling
 * - OR logic (any selected color matches)
 */

'use client';

import './ColorFilter.css';

interface ColorFilterProps {
  selectedColors: Set<string>;
  onColorToggle: (color: string) => void;
}

const COLORS = [
  'Red',
  'Pink',
  'Orange',
  'Yellow',
  'Green',
  'Blue',
  'Purple',
  'Brown',
  'Neutral',
  'Grey',
  'Gold',
] as const;

export default function ColorFilter({ selectedColors, onColorToggle }: ColorFilterProps) {
  return (
    <div className="filter-group">
      <label className="filter-label">Color Family</label>
      <div className="filter-options">
        {COLORS.map((color) => {
          const isChecked = selectedColors.has(color);
          const colorClass = color.toLowerCase();
          
          return (
            <div key={color} className={`filter-option color-${colorClass}`}>
              <input
                type="checkbox"
                id={`color-${color}`}
                checked={isChecked}
                onChange={() => onColorToggle(color)}
                aria-label={`Filter by ${color}`}
              />
              <label htmlFor={`color-${color}`}>
                {color}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
