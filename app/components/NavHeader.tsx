/**
 * Navigation Header Component
 * 
 * Features:
 * - Brand name "Studio Claire" with display font
 * - Navigation links (Polishes active, others disabled/coming soon)
 * - Responsive design (stacks on mobile)
 * - Active and disabled states
 */

import Link from 'next/link';
import './NavHeader.css';

interface NavLink {
  label: string;
  href: string;
  active?: boolean;
  disabled?: boolean;
}

export default function NavHeader() {
  const navLinks: NavLink[] = [
    { label: 'Polishes', href: '/', active: true },
    { label: 'Charms', href: '/charms', disabled: true },
    { label: 'Stickers', href: '/stickers', disabled: true },
    { label: 'Accessories', href: '/accessories', disabled: true },
  ];

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <Link href="/" className="nav-brand">
          Studio Claire
        </Link>
        
        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.label}>
              {link.disabled ? (
                <span 
                  className="nav-link disabled" 
                  title="Coming soon"
                  aria-disabled="true"
                >
                  {link.label}
                </span>
              ) : (
                <Link 
                  href={link.href} 
                  className={`nav-link ${link.active ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
