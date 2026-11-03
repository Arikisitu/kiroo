import React, { useState } from 'react';
import { Bookmark, Menu, Sparkles, X } from 'lucide-react';

interface NavigationProps {
  onOpenGenerator: () => void;
  onOpenSaved: () => void;
  savedCount: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  onOpenGenerator,
  onOpenSaved,
  savedCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="nav-header" role="navigation" aria-label="Main Navigation">
      <div className="nav-inner">
        {/* Left: Brand Wordmark */}
        <a href="#" className="brand-wordmark" aria-label="Kiroo Home">
          <span>kiroo</span>
          <span className="brand-accent-dot" />
        </a>

        {/* Center / Right Links */}
        <ul className="nav-links">
          <li>
            <button className="nav-link-item" onClick={() => scrollTo('library')}>
              Explore
            </button>
          </li>
          <li>
            <button className="nav-link-item" onClick={() => scrollTo('categories')}>
              Categories
            </button>
          </li>
          <li>
            <button className="nav-link-item" onClick={() => scrollTo('how-it-works')}>
              How it works
            </button>
          </li>
          <li>
            <button
              className="nav-link-item"
              onClick={onOpenSaved}
              aria-label={`Saved topics (${savedCount})`}
            >
              <Bookmark size={15} />
              <span>Saved</span>
              {savedCount > 0 && <span className="nav-badge">{savedCount}</span>}
            </button>
          </li>
        </ul>

        {/* Right CTA */}
        <div className="nav-actions">
          <button className="btn-primary" onClick={onOpenGenerator}>
            <Sparkles size={15} />
            <span>Generate a topic</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            background: 'var(--surface-raised)',
            borderBottom: '1px solid var(--border)',
            padding: '1.2rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <button
            className="nav-link-item"
            style={{ textAlign: 'left', width: '100%' }}
            onClick={() => scrollTo('library')}
          >
            Explore
          </button>
          <button
            className="nav-link-item"
            style={{ textAlign: 'left', width: '100%' }}
            onClick={() => scrollTo('categories')}
          >
            Categories
          </button>
          <button
            className="nav-link-item"
            style={{ textAlign: 'left', width: '100%' }}
            onClick={() => scrollTo('how-it-works')}
          >
            How it works
          </button>
          <button
            className="nav-link-item"
            style={{ textAlign: 'left', width: '100%' }}
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenSaved();
            }}
          >
            Saved Topics ({savedCount})
          </button>
        </div>
      )}
    </nav>
  );
};
