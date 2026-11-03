import React, { useEffect, useState } from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';
import type { Topic } from '../types/topic';
import { TopicCarouselFallback } from './TopicCarouselFallback';
import { TopicLibrary3D } from './TopicLibrary3D';

interface HeroSectionProps {
  topics: Topic[];
  selectedTopic: Topic | null;
  onSelectTopic: (topic: Topic) => void;
  onOpenDetail: (topic: Topic) => void;
  onOpenGenerator: () => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onHoverCard?: (isActive: boolean | null) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  topics,
  selectedTopic,
  onSelectTopic,
  onOpenDetail,
  onOpenGenerator,
  selectedCategory,
  onSelectCategory,
  onHoverCard,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  const handleExploreClick = () => {
    const el = document.getElementById('categories');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section" id="library" aria-label="Hero Introduction and 3D Library">
      <div className="hero-radial-backdrop" aria-hidden="true" />

      <div className="section-container">
        <div className="hero-grid">
          {/* Left Content Column */}
          <div className="hero-left">
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-line" />
              <span>YOUR NEXT IDEA STARTS HERE</span>
            </div>

            <h1 className="hero-heading">
              Never run out of{' '}
              <span className="hero-heading-highlight">things to say.</span>
            </h1>

            <p className="hero-subtext">
              Discover meaningful English topics for writing, speaking, debates, storytelling and
              everyday practice.
            </p>

            <div className="hero-cta-group">
              <button className="btn-primary" onClick={handleExploreClick}>
                <span>Explore topics</span>
                <ArrowDown size={15} />
              </button>

              <button className="btn-secondary" onClick={onOpenGenerator}>
                <Sparkles size={15} color="#9B8AFB" />
                <span>Generate a topic</span>
              </button>
            </div>

            <div className="hero-meta-label">
              <span>Writing</span>
              <span>·</span>
              <span>Speaking</span>
              <span>·</span>
              <span>Ideas</span>
            </div>
          </div>

          {/* Right Content Column: Interactive Topic Library */}
          <div className="hero-right">
            {!isMobile ? (
              <TopicLibrary3D
                topics={topics}
                selectedTopic={selectedTopic}
                onSelectTopic={onSelectTopic}
                onOpenDetail={onOpenDetail}
                selectedCategory={selectedCategory}
                onSelectCategory={onSelectCategory}
                onHoverCard={onHoverCard}
              />
            ) : (
              <TopicCarouselFallback
                topics={topics}
                selectedTopic={selectedTopic}
                onSelectTopic={onSelectTopic}
                onOpenDetail={onOpenDetail}
                selectedCategory={selectedCategory}
                onSelectCategory={onSelectCategory}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
