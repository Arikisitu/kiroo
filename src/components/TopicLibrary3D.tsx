import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import type { Topic } from '../types/topic';
import { TopicCard3D } from './TopicCard3D';

interface TopicLibrary3DProps {
  topics: Topic[];
  selectedTopic: Topic | null;
  onSelectTopic: (topic: Topic) => void;
  onOpenDetail: (topic: Topic) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onHoverCard?: (isActive: boolean | null) => void;
}

const CATEGORIES_LIST: Array<{ id: string; label: string }> = [
  { id: 'All', label: 'All Topics' },
  { id: 'Essay', label: 'Essay' },
  { id: 'Speaking', label: 'Speaking' },
  { id: 'Debate', label: 'Debate' },
  { id: 'Journal', label: 'Journal' },
  { id: 'Storytelling', label: 'Storytelling' },
  { id: 'Opinion', label: 'Opinion' },
  { id: 'Creative Writing', label: 'Creative' },
  { id: 'Daily Conversation', label: 'Dialogue' },
];

export const TopicLibrary3D: React.FC<TopicLibrary3DProps> = ({
  topics,
  selectedTopic,
  onSelectTopic,
  onOpenDetail,
  selectedCategory,
  onSelectCategory,
  onHoverCard,
}) => {
  const [hasWebGLError, setHasWebGLError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Compute activeIndex based on selectedTopic
  const activeIndex = Math.max(
    0,
    topics.findIndex((t) => t.id === selectedTopic?.id)
  );

  const handleNext = useCallback(() => {
    if (topics.length === 0) return;
    const nextIdx = (activeIndex + 1) % topics.length;
    onSelectTopic(topics[nextIdx]);
  }, [activeIndex, topics, onSelectTopic]);

  const handlePrev = useCallback(() => {
    if (topics.length === 0) return;
    const prevIdx = (activeIndex - 1 + topics.length) % topics.length;
    onSelectTopic(topics[prevIdx]);
  }, [activeIndex, topics, onSelectTopic]);

  // Keyboard navigation (Left / Right arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if an input or modal is active
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Enter' && selectedTopic) {
        onOpenDetail(selectedTopic);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, onOpenDetail, selectedTopic]);

  // Touch and drag swipe handlers with threshold
  const dragStartX = useRef<number | null>(null);
  const isDragging = useRef(false);

  const handlePointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
    isDragging.current = true;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || dragStartX.current === null) return;
    const deltaX = e.clientX - dragStartX.current;
    if (Math.abs(deltaX) > 65) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
      dragStartX.current = null;
      isDragging.current = false;
    }
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    dragStartX.current = null;
  };

  return (
    <div
      className="topic-stage-wrapper"
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      role="region"
      aria-label="3D Topic Library"
    >
      {/* Top stage status & categories bar */}
      <div className="stage-top-bar">
        <div className="stage-title-wrap">
          <span className="stage-status-dot" aria-hidden="true" />
          <span className="stage-title">Spatial Library</span>
        </div>

        {/* Category Filter Pills */}
        <div className="stage-category-filters" role="tablist" aria-label="Topic Categories">
          {CATEGORIES_LIST.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={selectedCategory === cat.id}
              className={`filter-pill ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => onSelectCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="stage-counter" aria-live="polite">
          {topics.length > 0 ? `${activeIndex + 1} / ${topics.length}` : '0 / 0'}
        </div>
      </div>

      {/* 3D WebGL Canvas */}
      <div className="canvas-container" tabIndex={0} aria-label="Interactive 3D Carousel">
        {!hasWebGLError ? (
          <Canvas
            shadows
            camera={{ position: [0, 0, 5.8], fov: 42 }}
            gl={{ antialias: true, alpha: true }}
            onCreated={({ gl }) => {
              gl.setClearColor(0x000000, 0);
            }}
            onError={() => {
              console.warn('WebGL failed to initialize. Falling back to CSS mode.');
              setHasWebGLError(true);
            }}
          >
            {/* Studio Lighting */}
            <ambientLight intensity={0.85} />
            <directionalLight
              position={[4, 6, 6]}
              intensity={1.2}
              castShadow
              shadow-mapSize={[1024, 1024]}
              shadow-camera-near={1}
              shadow-camera-far={15}
            />
            <directionalLight position={[-4, 3, 2]} intensity={0.4} />

            {/* 3D Topic Cards Collection */}
            <group position={[0, 0, 0]}>
              {topics.map((topic, idx) => (
                <TopicCard3D
                  key={topic.id}
                  topic={topic}
                  index={idx}
                  activeIndex={activeIndex}
                  totalCards={topics.length}
                  onSelect={(i) => onSelectTopic(topics[i])}
                  onOpenDetail={onOpenDetail}
                  onHoverCard={onHoverCard}
                />
              ))}
            </group>
          </Canvas>
        ) : (
          <div className="empty-state">
            <p>Interactive 3D preview mode unavailable on this device.</p>
          </div>
        )}
      </div>

      {/* Stage Bottom Controls Bar */}
      <div className="stage-controls-bar">
        <div className="stage-nav-btns">
          <button
            className="stage-nav-btn"
            onClick={handlePrev}
            aria-label="Previous topic card"
            title="Previous (Left arrow)"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            className="stage-nav-btn"
            onClick={handleNext}
            aria-label="Next topic card"
            title="Next (Right arrow)"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {selectedTopic && (
          <button
            className="stage-action-pill"
            onClick={() => onOpenDetail(selectedTopic)}
            title="Open full topic detail"
          >
            <span>Open Topic Detail</span>
            <ExternalLink size={14} />
          </button>
        )}

        <div className="stage-hint">
          <span>Click to select · Press arrows or drag to browse</span>
        </div>
      </div>
    </div>
  );
};
