import React, { useState } from 'react';
import { X } from 'lucide-react';

interface FooterProps {
  onOpenSaved: () => void;
  onOpenGenerator: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSaved, onOpenGenerator }) => {
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="section-container">
        <div className="footer-top">
          {/* Brand info */}
          <div className="footer-brand-col">
            <div className="brand-wordmark">
              <span>kiroo</span>
              <span className="brand-accent-dot" />
            </div>
            <p className="footer-desc">
              A minimalist editorial library and interactive topic generator designed to help
              speakers, writers, and language learners master the craft of English expression.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links">
              <li>
                <button className="footer-link" onClick={() => scrollTo('library')}>
                  Explore Library
                </button>
              </li>
              <li>
                <button className="footer-link" onClick={() => scrollTo('categories')}>
                  Categories
                </button>
              </li>
              <li>
                <button className="footer-link" onClick={() => scrollTo('how-it-works')}>
                  How It Works
                </button>
              </li>
              <li>
                <button className="footer-link" onClick={onOpenGenerator}>
                  Generate a Topic
                </button>
              </li>
            </ul>
          </div>

          {/* Library Links */}
          <div>
            <h4 className="footer-col-title">Personal</h4>
            <ul className="footer-links">
              <li>
                <button className="footer-link" onClick={onOpenSaved}>
                  Saved Topics
                </button>
              </li>
              <li>
                <button className="footer-link" onClick={() => setPrivacyModalOpen(true)}>
                  Privacy & Data
                </button>
              </li>
            </ul>
          </div>

          {/* Philosophy */}
          <div>
            <h4 className="footer-col-title">Philosophy</h4>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              Built with Japanese aesthetic restraint, physical depth, and genuine respect for deep
              thought. No generic AI templates or distracting noise.
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <span>&copy; 2026 Kiroo. All rights reserved.</span>
          <span>Curated for English fluency & articulate discourse.</span>
        </div>
      </div>

      {/* Privacy modal */}
      {privacyModalOpen && (
        <div
          className="detail-backdrop"
          onClick={() => setPrivacyModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="generator-modal"
            style={{ maxWidth: '520px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="detail-header">
              <h3 style={{ fontSize: '1.1rem' }}>Privacy & Data Notice</h3>
              <button
                className="close-btn"
                onClick={() => setPrivacyModalOpen(false)}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
            <div style={{ padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <p style={{ color: 'var(--text-primary)' }}>
                Kiroo stores your saved topics exclusively in your browser's local storage.
              </p>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                No tracking cookies, third-party analytics scripts, or personal identity identifiers
                are collected or transmitted across the wire. Your practice sessions and reflective
                notes remain completely private to your machine.
              </p>
              <button
                className="btn-primary"
                style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }}
                onClick={() => setPrivacyModalOpen(false)}
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
