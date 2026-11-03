import React from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import type { Topic } from '../types/topic';

interface TopicCarouselFallbackProps {
  topics: Topic[];
  selectedTopic: Topic | null;
  onSelectTopic: (topic: Topic) => void;
  onOpenDetail: (topic: Topic) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const TopicCarouselFallback: React.FC<TopicCarouselFallbackProps> = ({
  topics,
  selectedTopic,
  onSelectTopic,
  onOpenDetail,
}) => {
  const activeIndex = Math.max(
    0,
    topics.findIndex((t) => t.id === selectedTopic?.id)
  );

  const handleNext = () => {
    if (topics.length === 0) return;
    const nextIdx = (activeIndex + 1) % topics.length;
    onSelectTopic(topics[nextIdx]);
  };

  const handlePrev = () => {
    if (topics.length === 0) return;
    const prevIdx = (activeIndex - 1 + topics.length) % topics.length;
    onSelectTopic(topics[prevIdx]);
  };

  return (
    <div className="topic-stage-wrapper">
      <div className="stage-top-bar">
        <div className="stage-title-wrap">
          <span className="stage-status-dot" />
          <span className="stage-title">Topic Library</span>
        </div>
        <div className="stage-counter">
          {topics.length > 0 ? `${activeIndex + 1} / ${topics.length}` : '0 / 0'}
        </div>
      </div>

      {/* Featured Editorial Card */}
      {selectedTopic && (
        <div
          className="editorial-card-plate"
          style={{
            cursor: 'pointer',
            margin: '1rem auto',
            transform: 'scale(1)',
            transition: 'transform 0.2s ease',
          }}
          onClick={() => onOpenDetail(selectedTopic)}
        >
          <div className="card-plate-top">
            <span>{selectedTopic.coverTheme?.romanNumeral || 'I'}</span>
            <span>{selectedTopic.category.toUpperCase()}</span>
          </div>

          <div className="card-plate-center">
            {selectedTopic.coverTheme?.kanji && (
              <span className="card-plate-kanji">{selectedTopic.coverTheme.kanji}</span>
            )}
            <h3 className="card-plate-title">{selectedTopic.title}</h3>
            {selectedTopic.coverTheme?.japaneseSub && (
              <span style={{ fontSize: '0.78rem', color: 'rgba(23, 23, 32, 0.6)' }}>
                {selectedTopic.coverTheme.japaneseSub}
              </span>
            )}
          </div>

          <div className="card-plate-bottom">
            <span>{selectedTopic.subject.toUpperCase()}</span>
            <span style={{ color: selectedTopic.coverTheme?.accentColor || '#6554CB' }}>
              {selectedTopic.difficulty.toUpperCase()}
            </span>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="stage-controls-bar">
        <div className="stage-nav-btns">
          <button className="stage-nav-btn" onClick={handlePrev} aria-label="Previous topic">
            <ChevronLeft size={18} />
          </button>
          <button className="stage-nav-btn" onClick={handleNext} aria-label="Next topic">
            <ChevronRight size={18} />
          </button>
        </div>

        {selectedTopic && (
          <button
            className="stage-action-pill"
            onClick={() => onOpenDetail(selectedTopic)}
          >
            <span>Read Details</span>
            <ExternalLink size={14} />
          </button>
        )}
      </div>
    </div>
  );
};
