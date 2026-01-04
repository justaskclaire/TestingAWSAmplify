/**
 * Filter Bar Container Component
 * 
 * Contains all filter sections:
 * - Clear All button
 * - Color filters
 * - Finish filters
 * - My Picks filters (favorites/next appt)
 * 
 * Features:
 * - Responsive layout (stacks on mobile)
 * - Clear all functionality
 * - Active filter count display
 */

'use client';

interface FilterBarProps {
  onClearAll: () => void;
  hasActiveFilters: boolean;
  children: React.ReactNode;
}

export default function FilterBar({ 
  onClearAll, 
  hasActiveFilters,
  children 
}: FilterBarProps) {
  
  return (
    <div className="filter-bar">
      {/* Filter controls - Clear All button */}
      <div className="filter-controls">
        <button
          type="button"
          className="btn-clear-filters"
          onClick={onClearAll}
          disabled={!hasActiveFilters}
          aria-label="Clear all filters"
        >
          Clear All Filters
        </button>
      </div>
      
      {/* Filter sections passed as children */}
      {children}
    </div>
  );
}
