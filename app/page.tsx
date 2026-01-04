import NavHeader from './components/NavHeader';
import PolishGrid from './components/PolishGrid';
import { PolishCardProps } from './components/PolishCard';
import './page.css';

// Sample data for testing UI (will be replaced with Amplify data in Phase 5)
const samplePolishes: PolishCardProps[] = [
  {
    id: '1',
    number: '427',
    name: 'Air Of Mint',
    imageUrl: '/images/427-Air_Of_Mint.jpg',
    productLink: 'https://www.dndgel.com/products/air-of-mint-427',
    colors: ['Blue', 'Green'],
    finish: 'Cream',
  },
  {
    id: '2',
    number: '729',
    name: 'Ambrosia',
    imageUrl: '/images/729-Ambrosia.jpg',
    productLink: 'https://www.dndgel.com/products/ambrosia-729',
    colors: ['Blue'],
    finish: 'Cream',
  },
  {
    id: '3',
    number: '112',
    name: 'Apple Cider',
    imageUrl: '/images/112-Apple_Cider.png',
    productLink: 'https://www.dndgel.com/products/apple-cider-112',
    colors: ['Orange'],
    finish: 'Cream',
  },
  {
    id: '4',
    number: '497',
    name: 'Baby Girl',
    imageUrl: '/images/497-Baby_Girl.jpg',
    productLink: 'https://www.dndgel.com/products/baby-girl-497',
    colors: ['Pink'],
    finish: 'Cream',
  },
  {
    id: '5',
    number: '775',
    name: "Boo'd Up",
    imageUrl: '/images/775-Boo\'d_Up.jpg',
    productLink: 'https://www.dndgel.com/products/bood-up-775',
    colors: ['Purple', 'Pink'],
    finish: 'Shimmer',
  },
  {
    id: '6',
    number: '26',
    name: 'Chartreux Cat',
    imageUrl: '/images/26-Chartreux_Cat.jpg',
    productLink: 'https://www.dndgel.com/products/dc-cat-eyes-26-chartreux-cat',
    colors: ['Purple'],
    finish: 'Cat Eye',
  },
];

export default function App() {
  return (
    <>
      <NavHeader />
      
      <main className="container">
        <div className="page-header">
          <h1 className="page-title">Nail Polish Collection</h1>
          <p className="page-subtitle">Browse and select your favorites</p>
        </div>
        
        <PolishGrid polishes={samplePolishes} />
        
        <div className="progress-notice">
          <p>
            <strong>🔄 Phase 2 In Progress:</strong> Displaying sample data. 
            Full database integration and filtering coming in Phase 3-5.
          </p>
        </div>
      </main>
    </>
  );
}


