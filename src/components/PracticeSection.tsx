import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface PracticeSectionProps {
  onStartPracticing: () => void;
}

export const PracticeSection: React.FC<PracticeSectionProps> = ({ onStartPracticing }) => {
  return (
    <section className="section-padding" aria-label="Call to Practice">
      <div className="section-container">
        <div className="practice-banner">
          <div className="practice-left">
            <span className="section-eyebrow">Daily Momentum</span>
            <h2 className="practice-title">One idea. A better conversation.</h2>
            <p className="practice-subtext">
              Choose a topic, organise your thoughts, and express them in your own words.
            </p>
          </div>

          <button className="btn-primary" style={{ padding: '0.9rem 1.8rem', fontSize: '1rem' }} onClick={onStartPracticing}>
            <span>Start practising</span>
            <ArrowUpRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};
