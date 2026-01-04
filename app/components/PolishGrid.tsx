/**
 * Polish Grid Component
 * 
 * Responsive grid layout for displaying polish cards
 * Features:
 * - CSS Grid with auto-fill
 * - Min 170px per card, max 1fr
 * - Gap spacing from design system
 * - Empty state handling
 * - Loading state (future)
 */

import PolishCard, { PolishCardProps } from './PolishCard';
import './PolishGrid.css';

interface PolishGridProps {
  polishes: PolishCardProps[];
  emptyMessage?: string;
}

export default function PolishGrid({ 
  polishes, 
  emptyMessage = "No polishes found. Try adjusting your filters." 
}: PolishGridProps) {
  
  if (polishes.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">💅</div>
        <h3 className="empty-state-title">No Polishes Found</h3>
        <p className="empty-state-text">{emptyMessage}</p>
      </div>
    );
  }
  
  return (
    <div className="polish-grid">
      {polishes.map((polish) => (
        <PolishCard key={polish.id} {...polish} />
      ))}
    </div>
  );
}
