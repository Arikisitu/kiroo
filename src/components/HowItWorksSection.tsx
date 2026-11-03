import React from 'react';

export const HowItWorksSection: React.FC = () => {
  return (
    <section className="section-padding" id="how-it-works" aria-label="How Kiroo Works">
      <div className="section-container">
        <div className="section-header">
          <span className="section-eyebrow">The Editorial Process</span>
          <h2 className="section-title">How It Works</h2>
          <p className="section-desc">
            A simple, distraction-free framework to practice articulate English thought and speech.
          </p>
        </div>

        <div className="steps-grid">
          {/* Step 01 */}
          <div className="step-card">
            <span className="step-num">01</span>
            <h3 className="step-title">Choose your direction</h3>
            <p className="step-body">
              Filter by speech, essay, debate, or quiet reflection. Set your preferred difficulty
              and focal theme to anchor your session.
            </p>
          </div>

          {/* Step 02 */}
          <div className="step-card">
            <span className="step-num">02</span>
            <h3 className="step-title">Discover your topic</h3>
            <p className="step-body">
              Browse the physical 3D shelf or generate a bespoke inquiry. Each card unfolds with
              curated vocabulary, nuance, and guiding questions.
            </p>
          </div>

          {/* Step 03 */}
          <div className="step-card">
            <span className="step-num">03</span>
            <h3 className="step-title">Think, write, and speak</h3>
            <p className="step-body">
              Complete the timed target—whether delivering a 2-minute speech or drafting 200 words.
              Store your favorite prompts to measure growth over time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
