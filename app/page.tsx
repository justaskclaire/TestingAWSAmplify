'use client';

import NavHeader from './components/NavHeader';
import FilterBar from './components/FilterBar';
import PersonalFilter from './components/PersonalFilter';
import ColorFilter from './components/ColorFilter';
import FinishFilter from './components/FinishFilter';
import PolishGrid from './components/PolishGrid';
import { usePolishFilters, Polish } from './hooks/usePolishFilters';
import './page.css';

// Full polish collection (60 polishes)
const allPolishes: Polish[] = [
  { id: '1', brand: 'DND', number: '427', name: 'Air Of Mint', link: 'https://www.dndgel.com/products/air-of-mint-427', imageAddress: 'https://www.dndgel.com/cdn/shop/files/DND-427-SWATCH.jpg?v=1755193733&width=823', localImage: '/images/427-Air_Of_Mint.jpg', colors: ['Blue', 'Green'], finish: 'Cream' },
  { id: '2', brand: 'DND', number: '729', name: 'Ambrosia', link: 'https://www.dndgel.com/products/ambrosia-729', imageAddress: 'https://www.dndgel.com/cdn/shop/files/729-1.jpg?v=1755194475&width=823', localImage: '/images/729-Ambrosia.jpg', colors: ['Blue'], finish: 'Cream' },
  { id: '3', brand: 'DND', number: '112', name: 'Apple Cider', link: 'https://www.dndgel.com/products/apple-cider-112', imageAddress: 'https://www.dndgel.com/cdn/shop/files/DC-112-SWATCH.png?v=1755193657&width=823', localImage: '/images/112-Apple_Cider.png', colors: ['Orange'], finish: 'Cream' },
  { id: '4', brand: 'DND', number: '283', name: 'Army Green', link: 'https://www.dndgel.com/products/diva-283', imageAddress: 'https://www.dndgel.com/cdn/shop/files/DV-283-HS_8cb42d33-1f73-4441-b68c-f699dd22ba85.png?v=1755192664&width=823', localImage: '/images/283-Army_Green.png', colors: ['Green'], finish: 'Cream' },
  { id: '5', brand: 'DND', number: '272', name: 'Autumn Blaze', link: 'https://www.dndgel.com/products/diva-272', imageAddress: 'https://www.dndgel.com/cdn/shop/files/DV-272-HS_2.png?v=1755192647&width=1346', localImage: '/images/272-Autumn_Blaze.png', colors: ['Orange', 'Red'], finish: 'Cream' },
  { id: '6', brand: 'DND', number: '497', name: 'Baby Girl', link: 'https://www.dndgel.com/products/baby-girl-497', imageAddress: 'https://www.dndgel.com/cdn/shop/files/DND-497-SWATCH_2.jpg?v=1755193834&width=823', localImage: '/images/497-Baby_Girl.jpg', colors: ['Pink'], finish: 'Cream' },
  { id: '7', brand: 'DND', number: '143', name: 'Banana Crepe', link: 'https://www.dndgel.com/products/banana-crepe-143', imageAddress: 'https://www.dndgel.com/cdn/shop/files/DC-143-HS.png?v=1755193692&width=823', localImage: '/images/143-Banana_Crepe.png', colors: ['Pink'], finish: 'Cream' },
  { id: '8', brand: 'DND', number: '52', name: 'Biscuits N Honey', link: 'https://www.dndgel.com/products/biscuits-n-honey-diva-052', imageAddress: 'https://www.dndgel.com/cdn/shop/files/DV-052-SWATCH.png?v=1755192554&width=823', localImage: '/images/52-Biscuits_N_Honey.png', colors: ['Yellow', 'Neutral'], finish: 'Cream' },
  { id: '9', brand: 'DND', number: '23', name: 'Blossom Orchid', link: 'https://www.dndgel.com/products/blossom-orchid-023', imageAddress: 'https://www.dndgel.com/cdn/shop/files/DC-023-DOT.png?v=1762198950&width=823', localImage: '/images/23-Blossom_Orchid.png', colors: ['Purple', 'Pink'], finish: 'Cream' },
  { id: '10', brand: 'DND', number: '437', name: 'Blue De France', link: 'https://www.dndgel.com/products/blue-de-france-437', imageAddress: 'https://www.dndgel.com/cdn/shop/files/DND-437-SWATCH.png?v=1756934220&width=823', localImage: '/images/437-Blue_De_France.png', colors: ['Blue'], finish: 'Cream' },
  { id: '11', brand: 'DND', number: '530', name: 'Blue Lake', link: 'https://www.dndgel.com/products/blue-lake-530', imageAddress: 'https://www.dndgel.com/cdn/shop/files/DND-530-HS_2.png?v=1759857080&width=823', localImage: '/images/530-Blue_Lake.png', colors: ['Blue'], finish: 'Cream' },
  { id: '12', brand: 'DND', number: '3', name: 'Blue Violet', link: 'https://www.dndgel.com/products/blue-violet-003', imageAddress: 'https://www.dndgel.com/cdn/shop/products/003.jpg?v=1756507716&width=823', localImage: '/images/3-Blue_Violet.jpg', colors: ['Purple', 'Blue'], finish: 'Cream' },
  { id: '13', brand: 'DND', number: '116', name: 'Blushing Face', link: 'https://www.dndgel.com/products/blushing-face-116', imageAddress: 'https://www.dndgel.com/cdn/shop/files/DC-116-SWATCH.jpg?v=1755193661&width=823', localImage: '/images/116-Blushing_Face.jpg', colors: ['Pink'], finish: 'Cream' },
  { id: '14', brand: 'DND', number: '775', name: "Boo'd Up", link: 'https://www.dndgel.com/products/bood-up-775', imageAddress: 'https://www.dndgel.com/cdn/shop/products/775-2.jpg?v=1762197925&width=1346', localImage: "/images/775-Boo'd_Up.jpg", colors: ['Purple', 'Pink'], finish: 'Shimmer' },
  { id: '15', brand: 'DND', number: '635', name: 'Burgundy Mist', link: 'https://www.dndgel.com/products/burgandy-mist-635', imageAddress: 'https://www.dndgel.com/cdn/shop/files/DND-635-SWATCH.jpg?v=1760558347&width=823', localImage: '/images/635-Burgundy_Mist.jpg', colors: ['Red', 'Purple'], finish: 'Cream' },
  { id: '16', brand: 'DND', number: '418', name: 'Butternut Squash', link: 'https://www.dndgel.com/products/butternut-squash-418', imageAddress: 'https://www.dndgel.com/cdn/shop/files/DND-418-SWATCH.png?v=1755193721&width=1346', localImage: '/images/418-Butternut_Squash.png', colors: ['Orange', 'Neutral'], finish: 'Cream' },
  { id: '17', brand: 'DND', number: '278', name: 'California Grace', link: 'https://www.dndgel.com/products/california-grace-278', imageAddress: 'https://www.dndgel.com/cdn/shop/products/DP04dot_8be71160-3d92-4eb2-818d-df6df329c4db.jpg?v=1762198430&width=823', localImage: '/images/278-California_Grace.jpg', colors: ['Pink'], finish: 'Cream' },
  { id: '18', brand: 'DND', number: '151', name: 'Castles In Spain', link: 'https://www.dndgel.com/products/castles-in-spain-diva-151', imageAddress: 'https://www.dndgel.com/cdn/shop/files/DV-151-HS.jpg?v=1755192879&width=823', localImage: '/images/151-Castles_In_Spain.jpg', colors: ['Neutral', 'Grey'], finish: 'Cream' },
  { id: '19', brand: 'DND', number: '2442', name: 'Catch Me Sheering', link: 'https://www.dndgel.com/products/catch-me-sheering-2442', imageAddress: 'https://www.dndgel.com/cdn/shop/files/DC-2442-SWATCH.jpg?v=1765823799&width=823', localImage: '/images/2442-Catch_Me_Sheering.jpg', colors: ['Pink'], finish: 'Sheer' },
  { id: '20', brand: 'DND', number: '250', name: 'Cedar Brown', link: 'https://www.dndgel.com/products/cedar-brown-diva-250', imageAddress: 'https://www.dndgel.com/cdn/shop/files/DV-250-HS-KRI_21481e91-dfed-4070-a726-c682f7cba831.jpg?v=1755192694&width=823', localImage: '/images/250-Cedar_Brown.jpg', colors: ['Brown', 'Neutral'], finish: 'Cream' },
  { id: '21', brand: 'DND', number: '26', name: 'Chartreux Cat', link: 'https://www.dndgel.com/products/dc-cat-eyes-26-chartreux-cat', imageAddress: 'https://www.dndgel.com/cdn/shop/products/cateyes26-1.jpg?v=1762198671&width=823', localImage: '/images/26-Chartreux_Cat.jpg', colors: ['Purple'], finish: 'Cat Eye' },
  { id: '22', brand: 'DND', number: '751', name: 'Cherry Mocha', link: 'https://www.dndgel.com/products/cherry-mocha-751', imageAddress: 'https://www.dndgel.com/cdn/shop/files/DND-751-SWATCH_2_9f174fd2-ccc7-41d9-9333-7070cee00fb6.png?v=1755195228&width=1346', localImage: '/images/751-Cherry_Mocha.png', colors: ['Purple', 'Red'], finish: 'Cream' },
  { id: '23', brand: 'DND', number: '248', name: 'Cherry On Top', link: 'https://www.dndgel.com/products/cherry-on-top-diva-248', imageAddress: 'https://www.dndgel.com/cdn/shop/files/DV-248-HS.png?v=1755192697&width=823', localImage: '/images/248-Cherry_On_Top.png', colors: ['Red'], finish: 'Cream' },
  { id: '24', brand: 'DND', number: '981', name: 'Chestnut Cassette', link: 'https://www.dndgel.com/products/chestnut-cassette-981', imageAddress: 'https://www.dndgel.com/cdn/shop/files/DND-981-SWATCH.png?v=1755193320&width=823', localImage: '/images/981-Chestnut_Cassette.png', colors: ['Brown', 'Neutral'], finish: 'Cream' },
  { id: '25', brand: 'DND', number: '20', name: 'Chubby Himalayan', link: 'https://www.dndgel.com/products/dc-cat-eyes-20-chubby-himalayan', imageAddress: 'https://www.dndgel.com/cdn/shop/products/cateyes20-1.jpg?v=1762198675&width=823', localImage: '/images/20-Chubby_Himalayan.jpg', colors: ['Blue'], finish: 'Cat Eye' },
  { id: '26', brand: 'DND', number: '184', name: 'Clean Pallet', link: 'https://www.dndgel.com/products/clean-pallet-diva-184', imageAddress: 'https://www.dndgel.com/cdn/shop/files/DV-184-FS.jpg?v=1755192959&width=823', localImage: '/images/184-Clean_Pallet.jpg', colors: ['Pink'], finish: 'Cream' },
  { id: '27', brand: 'DND', number: '194', name: 'Clique-Bait', link: 'https://www.dndgel.com/products/clique-bait-diva-194', imageAddress: 'https://www.dndgel.com/cdn/shop/files/DV-194-FS.jpg?v=1755192941&width=823', localImage: '/images/194-Clique-Bait.jpg', colors: ['Purple'], finish: 'Cream' },
  { id: '28', brand: 'DND', number: '310', name: 'Confetti', link: 'https://www.dndgel.com/products/confetti-310', imageAddress: 'https://www.dndgel.com/cdn/shop/products/confetti-dnd-gel-dc-310.jpg?v=1755194810&width=1346', localImage: '/images/310-Confetti.jpg', colors: ['Pink', 'Neutral'], finish: 'Cream' },
  { id: '29', brand: 'DND', number: '317', name: 'Cookie Chips', link: 'https://www.dndgel.com/products/cookie-chips-317', imageAddress: 'https://www.dndgel.com/cdn/shop/files/DC-317-FS.png?v=1755194820&width=1346', localImage: '/images/317-Cookie_Chips.png', colors: ['Brown'], finish: 'Cream' },
  { id: '30', brand: 'DND', number: '209', name: 'Coral Breeze', link: 'https://www.dndgel.com/products/coral-breeze-diva-209', imageAddress: 'https://www.dndgel.com/cdn/shop/files/DV-209-SWATCH.png?v=1755192921&width=1346', localImage: '/images/209-Coral_Breeze.png', colors: ['Orange', 'Pink'], finish: 'Cream' },
  { id: '31', brand: 'DND', number: '43', name: 'Dark Salmon', link: 'https://www.dndgel.com/products/dark-salmon-043', imageAddress: 'https://www.dndgel.com/cdn/shop/files/DC-043-SWATCH.jpg?v=1755193571&width=823', localImage: '/images/43-Dark_Salmon.jpg', colors: ['Purple'], finish: 'Cream' },
  { id: '32', brand: 'DND', number: '299', name: 'Dream World', link: 'https://www.dndgel.com/products/dream-world-299', imageAddress: 'https://www.dndgel.com/cdn/shop/files/DC-299-SWATCH.png?v=1755194797&width=823', localImage: '/images/299-Dream_World.png', colors: ['Neutral'], finish: 'Cream' },
  { id: '33', brand: 'DND', number: '178', name: 'Farm Brown aka Fawn Over Me', link: 'https://www.dndgel.com/products/fawn-over-me-diva-178', imageAddress: 'https://www.dndgel.com/cdn/shop/files/DIVA-178-HS-COMPARISON.jpg?v=1755192841&width=1346', localImage: '/images/178-Farm_Brown_aka_Fawn_Over_Me.jpg', colors: ['Brown', 'Neutral'], finish: 'Cream' },
  { id: '34', brand: 'DND', number: '39', name: 'Fire Brick', link: 'https://www.dndgel.com/products/fire-brick-039', imageAddress: 'https://www.dndgel.com/cdn/shop/products/dc_swatch_039.jpg?v=1762198939&width=823', localImage: '/images/39-Fire_Brick.jpg', colors: ['Pink', 'Red'], finish: 'Cream' },
  { id: '35', brand: 'DND', number: '67', name: 'Fire Engine Red', link: 'https://www.dndgel.com/products/fire-engine-red-067', imageAddress: 'https://www.dndgel.com/cdn/shop/products/dc_swatch_067.jpg?v=1762198921&width=823', localImage: '/images/67-Fire_Engine_Red.jpg', colors: ['Red'], finish: 'Cream' },
  { id: '36', brand: 'DND', number: '34', name: 'Fur-st Place', link: 'https://www.dndgel.com/products/9d-cat-eye-35', imageAddress: 'https://www.dndgel.com/cdn/shop/files/DIVA-9DCE-34_3.jpg?v=1755192448&width=823', localImage: '/images/34-Fur-st_Place.jpg', colors: ['Orange'], finish: 'Cat Eye' },
  { id: '37', brand: 'DND', number: '769', name: 'Glistening Sky', link: 'https://www.dndgel.com/products/glistening-sky-769', imageAddress: 'https://www.dndgel.com/cdn/shop/products/769.jpg?v=1762197928&width=1346', localImage: '/images/769-Glistening_Sky.jpg', colors: ['Red'], finish: 'Glitter' },
  { id: '38', brand: 'DND', number: '607', name: 'Hazelnut', link: 'https://www.dndgel.com/products/hazelnut-607', imageAddress: 'https://www.dndgel.com/cdn/shop/files/DND-607-SWATCH.png?v=1760459836&width=1346', localImage: '/images/607-Hazelnut.png', colors: ['Pink', 'Purple'], finish: 'Cream' },
  { id: '39', brand: 'DND', number: '243', name: 'Imperial Jade', link: 'https://www.dndgel.com/products/imperial-jade-diva-243', imageAddress: 'https://www.dndgel.com/cdn/shop/files/DV-243-HS-SYD-3.jpg?v=1755192707&width=823', localImage: '/images/243-Imperial_Jade.jpg', colors: ['Green'], finish: 'Cream' },
  { id: '40', brand: 'DND', number: '140', name: 'Little Piggy', link: 'https://www.dndgel.com/products/little-piggy-diva-140', imageAddress: 'https://www.dndgel.com/cdn/shop/files/DV-140-HS-4.jpg?v=1755193125&width=823', localImage: '/images/140-Little_Piggy.jpg', colors: ['Pink'], finish: 'Cream' },
  { id: '41', brand: 'DND', number: '920', name: 'Magenta Aura', link: 'https://www.dndgel.com/products/magenta-aura-920', imageAddress: 'https://www.dndgel.com/cdn/shop/products/920-DND.jpg?v=1755193242&width=1346', localImage: '/images/920-Magenta_Aura.jpg', colors: ['Pink', 'Purple'], finish: 'Glitter' },
  { id: '42', brand: 'DND', number: '204', name: 'Marigold', link: 'https://www.dndgel.com/products/marigold-diva-204', imageAddress: 'https://www.dndgel.com/cdn/shop/files/DV-204-HS.jpg?v=1755192928&width=823', localImage: '/images/204-Marigold.jpg', colors: ['Yellow'], finish: 'Cream' },
  { id: '43', brand: 'DND', number: '19', name: 'Bridal Pink', link: 'https://www.dndgel.com/products/dc-mood-change-19-bridal-pink-to-brighter-pink', imageAddress: 'https://www.dndgel.com/cdn/shop/products/19.jpg?v=1762198583&width=823', localImage: '/images/19-Bridal_Pink.jpg', colors: ['Pink', 'Purple'], finish: 'Mood Change' },
  { id: '44', brand: 'DND', number: '440', name: 'Papaya Whip', link: 'https://www.dndgel.com/products/papaya-whip-440', imageAddress: 'https://www.dndgel.com/cdn/shop/files/DND-440-SWATCH_3.png?v=1756936557&width=1346', localImage: '/images/440-Papaya_Whip.png', colors: ['Neutral'], finish: 'Cream' },
  { id: '45', brand: 'DND', number: '490', name: 'Redwood City', link: 'https://www.dndgel.com/products/redwood-city-490', imageAddress: 'https://www.dndgel.com/cdn/shop/products/redwood-city-490.jpg?v=1757029697&width=1346', localImage: '/images/490-Redwood_City.jpg', colors: ['Red', 'Brown'], finish: 'Cream' },
  { id: '46', brand: 'DND', number: '753', name: 'Scarlett Dreams', link: 'https://www.dndgel.com/products/scarlett-dreams-753', imageAddress: 'https://www.dndgel.com/cdn/shop/files/DND-753-SWATCH_2.png?v=1755195231&width=823', localImage: '/images/753-Scarlett_Dreams.png', colors: ['Red'], finish: 'Cream' },
  { id: '47', brand: 'DND', number: '781', name: 'Starry Night', link: 'https://www.dndgel.com/products/starry-night-781', imageAddress: 'https://www.dndgel.com/cdn/shop/files/DND-781-SWATCH.png?v=1755195266&width=823', localImage: '/images/781-Starry_Night.png', colors: ['Yellow', 'Gold'], finish: 'Glitter' },
  { id: '48', brand: 'DND', number: '210', name: 'Sunkissed Coral', link: 'https://www.dndgel.com/products/sunkissed-coral-diva-210', imageAddress: 'https://www.dndgel.com/cdn/shop/files/DV-210-FS.png?v=1755192919&width=823', localImage: '/images/210-Sunkissed_Coral.png', colors: ['Orange', 'Pink'], finish: 'Cream' },
  { id: '49', brand: 'DND', number: '254', name: 'Vampire Kiss', link: 'https://www.dndgel.com/products/vampire-s-kiss-diva-254', imageAddress: 'https://www.dndgel.com/cdn/shop/files/DIVA-254-NAILART.webp?v=1764189647&width=823', localImage: '/images/254-Vampire_Kiss.webp', colors: ['Purple'], finish: 'Cream' },
  { id: '50', brand: 'DND', number: '754', name: 'Winter Berry', link: 'https://www.dndgel.com/products/winter-berry-754', imageAddress: 'https://www.dndgel.com/cdn/shop/files/DND-754-SWATCH.png?v=1755195233&width=823', localImage: '/images/754-Winter_Berry.png', colors: ['Red', 'Purple'], finish: 'Cream' },
  { id: '51', brand: 'DND', number: '41', name: 'With GRAYce', link: 'https://www.dndgel.com/products/with-grayce-diva-041', imageAddress: 'https://www.dndgel.com/cdn/shop/files/DIVA-041-SWATCH_2.jpg?v=1755192576&width=823', localImage: '/images/41-With_GRAYce.jpg', colors: ['Neutral', 'Grey'], finish: 'Cream' },
  { id: '52', brand: 'DND', number: '929', name: 'Orange Aura', link: 'https://www.dndgel.com/products/orange-aura-929', imageAddress: 'https://www.dndgel.com/cdn/shop/products/929-DND_281c3eab-89b2-41ad-97b2-02ce88cfee21.jpg?v=1755193257&width=823', localImage: '/images/929-Orange_Aura.jpg', colors: ['Orange'], finish: 'Glitter' },
  { id: '53', brand: 'DND', number: '25', name: 'Chunky Holo', link: 'https://www.dndgel.com/products/chunky-holo-diva-025', imageAddress: 'https://www.dndgel.com/cdn/shop/files/DIVA-25-FS.jpg?v=1755193080&width=823', localImage: '/images/25-Chunky_Holo.jpg', colors: ['Grey'], finish: 'Glitter' },
  { id: '54', brand: 'DND', number: '219', name: 'Tulip', link: 'https://www.dndgel.com/products/dc-mermaid-219-tulip', imageAddress: 'https://www.dndgel.com/cdn/shop/products/219.jpg?v=1762198560&width=823', localImage: '/images/219-Tulip.jpg', colors: ['Pink'], finish: 'Glitter' },
  { id: '55', brand: 'DND', number: '36', name: 'Sultry Gem', link: 'https://www.dndgel.com/products/sultry-gem-diva-036', imageAddress: 'https://www.dndgel.com/cdn/shop/files/DIVA-036-SWATCH.jpg?v=1755193063&width=823', localImage: '/images/36-Sultry_Gem.jpg', colors: ['Purple', 'Red'], finish: 'Glitter' },
  { id: '56', brand: 'DND', number: '21', name: 'Japanese Bobtail', link: 'https://www.dndgel.com/products/dc-cat-eyes-21-japanese-bobtail', imageAddress: 'https://www.dndgel.com/cdn/shop/products/cateyes21-1.jpg?v=1762198675&width=823', localImage: '/images/21-Japanese_Bobtail.jpg', colors: ['Orange'], finish: 'Cat Eye' },
  { id: '57', brand: 'DND', number: '17', name: 'Shy Snowshoe', link: 'https://www.dndgel.com/products/dc-cat-eyes-17-shy-snowshoe', imageAddress: 'https://www.dndgel.com/cdn/shop/products/cateyes17-1.jpg?v=1762197948&width=823', localImage: '/images/17-Shy_Snowshoe.jpg', colors: ['Purple'], finish: 'Cat Eye' },
  { id: '58', brand: 'DND', number: '12', name: 'Ragdoll', link: 'https://www.dndgel.com/products/5d-ragdoll-12', imageAddress: 'https://www.dndgel.com/cdn/shop/products/5DCateye12.jpg?v=1762198561&width=823', localImage: '/images/12-Ragdoll.jpg', colors: ['Red', 'Orange'], finish: 'Cat Eye' },
  { id: '59', brand: 'DND', number: '10', name: 'Siamese Cat', link: 'https://www.dndgel.com/products/5d-siamese-cat-10', imageAddress: 'https://www.dndgel.com/cdn/shop/products/5DCateye10.jpg?v=1762197914&width=823', localImage: '/images/10-Siamese_Cat.jpg', colors: ['Blue'], finish: 'Cat Eye' },
  { id: '60', brand: 'DND', number: '26', name: 'Cleocatra', link: 'https://www.dndgel.com/products/creamy-26-cleocatra', imageAddress: 'https://www.dndgel.com/cdn/shop/products/ce-26.jpg?v=1755193453&width=823', localImage: '/images/26-Cleocatra.jpg', colors: ['Red', 'Orange'], finish: 'Cat Eye' },
];

export default function App() {
  // Initialize filter hook with full collection
  const {
    selectedColors,
    selectedFinishes,
    showFavorites,
    showNextAppointment,
    hasActiveFilters,
    toggleColor,
    toggleFinish,
    toggleFavorites,
    toggleNextAppointment,
    clearAll,
    filteredPolishes,
  } = usePolishFilters(allPolishes);

  return (
    <>
      <NavHeader />
      
      <main className="container">
        <FilterBar 
          hasActiveFilters={hasActiveFilters}
          onClearAll={clearAll}
        >
          <PersonalFilter 
            showFavorites={showFavorites}
            showNextAppointment={showNextAppointment}
            onToggleFavorites={toggleFavorites}
            onToggleNextAppointment={toggleNextAppointment}
          />
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
      </main>
    </>
  );
}


