/**
 * Personal Filter Component
 * 
 * My Picks section with:
 * - ❤️ My Favorites filter
 * - 📅 My Next Appt filter
 * 
 * These will be fully functional in Phase 4 with user authentication
 */

'use client';

import './PersonalFilter.css';

interface PersonalFilterProps {
  showFavorites: boolean;
  showNextAppointment: boolean;
  onToggleFavorites: () => void;
  onToggleNextAppointment: () => void;
}

export default function PersonalFilter({
  showFavorites,
  showNextAppointment,
  onToggleFavorites,
  onToggleNextAppointment,
}: PersonalFilterProps) {
  return (
    <div className="filter-group">
      <div className="filter-label">My Picks</div>
      <div className="filter-options" id="personal-filters">
        <div className="filter-option">
          <input 
            type="checkbox" 
            id="filter-favorites" 
            checked={showFavorites}
            onChange={onToggleFavorites}
          />
          <label htmlFor="filter-favorites">❤️ My Favorites</label>
        </div>
        <div className="filter-option">
          <input 
            type="checkbox" 
            id="filter-nextappt" 
            checked={showNextAppointment}
            onChange={onToggleNextAppointment}
          />
          <label htmlFor="filter-nextappt">📅 My Next Appt</label>
        </div>
      </div>
    </div>
  );
}
