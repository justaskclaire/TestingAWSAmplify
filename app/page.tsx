'use client';

import NavHeader from './components/NavHeader';
import FilterBar from './components/FilterBar';
import ColorFilter from './components/ColorFilter';
import FinishFilter from './components/FinishFilter';
import PolishGrid from './components/PolishGrid';
import { usePolishFilters, Polish } from './hooks/usePolishFilters';
import './page.css';

// Sample data for testing UI (will be replaced with Amplify data in Phase 5)
const samplePolishes: Polish[] = [
  {
    id: '1',
    brand: 'DND',
    number: '427',
    name: 'Air Of Mint',
    link: 'https://www.dndgel.com/products/air-of-mint-427',
    imageAddress: 'https://www.dndgel.com/...',
    localImage: '/images/427-Air_Of_Mint.jpg',
    colors: ['Blue', 'Green'],
    finish: 'Cream',
  },
  {
    id: '2',
    brand: 'DND',
    number: '729',
    name: 'Ambrosia',
    link: 'https://www.dndgel.com/products/ambrosia-729',
    imageAddress: 'https://www.dndgel.com/...',
    localImage: '/images/729-Ambrosia.jpg',
    colors: ['Blue'],
    finish: 'Cream',
  },
  {
    id: '3',
    brand: 'DND',
    number: '112',
    name: 'Apple Cider',
    link: 'https://www.dndgel.com/products/apple-cider-112',
    imageAddress: 'https://www.dndgel.com/...',
    localImage: '/images/112-Apple_Cider.png',
    colors: ['Orange'],
    finish: 'Cream',
  },
  {
    id: '4',
    brand: 'DND',
    number: '497',
    name: 'Baby Girl',
    link: 'https://www.dndgel.com/products/baby-girl-497',
    imageAddress: 'https://www.dndgel.com/...',
    localImage: '/images/497-Baby_Girl.jpg',
    colors: ['Pink'],
    finish: 'Cream',
  },
  {
    id: '5',
    brand: 'DND',
    number: '775',
    name: "Boo'd Up",
    link: 'https://www.dndgel.com/products/bood-up-775',
    imageAddress: 'https://www.dndgel.com/...',
    localImage: '/images/775-Boo\'d_Up.jpg',
    colors: ['Purple', 'Pink'],
    finish: 'Shimmer',
  },
  {
    id: '6',
    brand: 'DND',
    number: '26',
    name: 'Chartreux Cat',
    link: 'https://www.dndgel.com/products/dc-cat-eyes-26-chartreux-cat',
    imageAddress: 'https://www.dndgel.com/...',
    localImage: '/images/26-Chartreux_Cat.jpg',
    colors: ['Purple'],
    finish: 'Cat Eye',
  },
];

export default function App() {
  // Initialize filter hook with sample data
  const {
    selectedColors,
    selectedFinishes,
    hasActiveFilters,
    toggleColor,
    toggleFinish,
    clearAll,
    filteredPolishes,
  } = usePolishFilters(samplePolishes);

  return (
    <>
      <NavHeader />
      
      <main className="container">
        <div className="page-header">
          <h1 className="page-title">Nail Polish Collection</h1>
          <p className="page-subtitle">Browse and select your favorites</p>
        </div>
        
        <FilterBar 
          hasActiveFilters={hasActiveFilters}
          onClearAll={clearAll}
        >
          <ColorFilter 
            selectedColors={selectedColors}
            onColorToggle={toggleColor}
          />
          <FinishFilter 
            selectedFinishes={selectedFinishes}
            onFinishToggle={toggleFinish}
          />
        </FilterBar>
        
        <PolishGrid 
          polishes={filteredPolishes.map(polish => ({
            id: polish.id,
            number: polish.number,
            name: polish.name,
            imageUrl: polish.localImage,
            productLink: polish.link,
            colors: polish.colors,
            finish: polish.finish,
          }))} 
        />
        
        <div className="progress-notice">
          <p>
            <strong>🔄 Phase 3 In Progress:</strong> Filter system active! 
            Personalization features (favorites, next appointment) coming in Phase 4.
          </p>
        </div>
      </main>
    </>
  );
}


