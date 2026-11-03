import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ALL_TOPICS, getRandomTopic } from '../data/fanDeckTopics';
import type { TopicEntry } from '../data/fanDeckTopics';
import '../styles/fandeck.css';

// ─── Types ───────────────────────────────────────────────────────────────────
interface Petal {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
  rotation: number;
  drift: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const DECK_SIZE = 9;

// Symmetrical fan angles: -80° to +80°, centred at 0°
const FAN_ANGLES = [-80, -60, -40, -20, 0, 20, 40, 60, 80];

// Card colors for variety — all dark crimson palette
const CARD_THEMES = [
  { bg: '#1A0505', accent: '#DC143C', glow: 'rgba(220, 20, 60, 0.5)' },
  { bg: '#170408', accent: '#C01230', glow: 'rgba(192, 18, 48, 0.5)' },
  { bg: '#120303', accent: '#B22222', glow: 'rgba(178, 34, 34, 0.5)' },
  { bg: '#190406', accent: '#D4163C', glow: 'rgba(212, 22, 60, 0.45)' },
  { bg: '#1B0507', accent: '#E0182E', glow: 'rgba(224, 24, 46, 0.5)' },
  { bg: '#160304', accent: '#C41230', glow: 'rgba(196, 18, 48, 0.45)' },
  { bg: '#130204', accent: '#BA1226', glow: 'rgba(186, 18, 38, 0.5)' },
  { bg: '#1A0608', accent: '#D61636', glow: 'rgba(214, 22, 54, 0.45)' },
  { bg: '#110203', accent: '#AA0E20', glow: 'rgba(170, 14, 32, 0.5)' },
];

// Helper to label format badge
const getFormatLabel = (topic: TopicEntry): string => {
  if (topic.format === 'one-word') return 'One-Word Theme';
  if (topic.format === 'short') return 'Short Concept';
  if (topic.format === 'long') return 'Thought Experiment';
  if (topic.format === 'medium') return 'Inquiry & Debate';
  const words = topic.question.split(' ').length;
  if (words <= 2) return 'One-Word Theme';
  if (words <= 6) return 'Short Concept';
  if (words > 18) return 'Thought Experiment';
  return 'Inquiry & Debate';
};

// ─── FanDeck Component ─────────────────────────────────────────────────────────
export const FanDeckGenerator: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentTopic, setCurrentTopic] = useState<TopicEntry | null>(null);
  const [lastTopicId, setLastTopicId] = useState<string | undefined>(undefined);
  const [showTopic, setShowTopic] = useState(false);
  const [petalActive, setPetalActive] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);

  const deckRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const revealRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Generate floating petals
  const petals = useMemo<Petal[]>(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        size: 12 + Math.random() * 20,
        delay: Math.random() * 8,
        duration: 8 + Math.random() * 10,
        rotation: Math.random() * 360,
        drift: (Math.random() - 0.5) * 180,
      })),
    []
  );

  // Generate atmospheric particles
  useEffect(() => {
    setParticles(
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1 + Math.random() * 2.5,
      }))
    );
  }, []);

  // Prevent overlapping animations
  const killCurrentTimeline = useCallback(() => {
    if (tlRef.current) {
      tlRef.current.kill();
      tlRef.current = null;
    }
  }, []);

  // ─── Core Animation Sequence ──────────────────────────────────────────────
  const handleGenerate = useCallback(() => {
    if (isAnimating) return;

    killCurrentTimeline();
    setIsAnimating(true);
    setShowTopic(false);
    setPetalActive(false);

    // Pick new random topic (avoid last)
    const newTopic = getRandomTopic(lastTopicId);
    const pickedCardIdx = Math.floor(Math.random() * DECK_SIZE);
    setSelectedCardIndex(pickedCardIdx);

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length === 0) {
      setIsAnimating(false);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false);
      },
    });
    tlRef.current = tl;

    // ── Phase 1: Shuffle deck (brief stagger in/out) ──
    tl.to(cards, {
      rotateY: (i) => (i % 2 === 0 ? 8 : -8),
      x: (i) => (i % 2 === 0 ? 6 : -6),
      duration: 0.2,
      stagger: 0.03,
      ease: 'power2.inOut',
    });
    tl.to(cards, {
      rotateY: 0,
      x: 0,
      duration: 0.18,
      stagger: 0.03,
      ease: 'power2.inOut',
    });

    // ── Phase 2: Fan out ──
    tl.to(cards, {
      rotateZ: (i) => FAN_ANGLES[i],
      translateZ: (i) => {
        // Active card gets a bigger Z lift when revealed
        return i === pickedCardIdx ? 80 : 40 + Math.abs(FAN_ANGLES[i]) * 0.3;
      },
      y: (i) => {
        // Cards further from centre drop slightly more
        return -60 - Math.abs(FAN_ANGLES[i]) * 0.5;
      },
      duration: 0.75,
      stagger: 0.06,
      ease: 'power3.out',
    });

    // ── Phase 3: Briefly hold the fan ──
    tl.to({}, { duration: 0.35 });

    // ── Phase 4: Card selection highlight ──
    tl.to(
      cards.filter((_, i) => i !== pickedCardIdx),
      {
        opacity: 0.35,
        scale: 0.97,
        filter: 'brightness(0.5)',
        duration: 0.3,
        ease: 'power2.inOut',
      }
    );

    // ── Phase 5: Selected card breaks out ──
    tl.to(
      cards[pickedCardIdx],
      {
        rotateZ: 0,
        rotateY: '+=360', // dramatic flip
        y: '-=180',
        scale: 1.1,
        translateZ: 120,
        duration: 0.7,
        ease: 'back.out(1.6)',
      },
      '-=0.1'
    );

    // ── Phase 6: Trigger petal & set topic ──
    tl.call(() => {
      setCurrentTopic(newTopic);
      setLastTopicId(newTopic.id);
      setPetalActive(true);
    });

    // ── Phase 7: Collapse remaining cards ──
    tl.to(
      cards.filter((_, i) => i !== pickedCardIdx),
      {
        rotateZ: 0,
        y: 0,
        translateZ: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.04,
        ease: 'power3.in',
      },
      '-=0.3'
    );

    // ── Phase 8: Move selected card to centre reveal ──
    tl.to(cards[pickedCardIdx], {
      x: 0,
      y: 0,
      rotateZ: 0,
      scale: 1,
      opacity: 0,
      translateZ: 0,
      duration: 0.4,
      ease: 'power2.inOut',
    });

    // ── Phase 9: Show topic reveal card ──
    tl.call(() => {
      setShowTopic(true);
      // Restore deck for next round
      setTimeout(() => {
        gsap.set(cards, {
          rotateZ: 0,
          rotateY: 0,
          y: 0,
          x: 0,
          scale: 1,
          opacity: 1,
          filter: 'none',
          translateZ: 0,
        });
      }, 800);
    });
  }, [isAnimating, lastTopicId, killCurrentTimeline]);

  // Keyboard shortcut: Space or Enter
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (
        (e.key === ' ' || e.key === 'Enter') &&
        !['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)
      ) {
        e.preventDefault();
        handleGenerate();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleGenerate]);

  // Reveal card entrance
  useEffect(() => {
    if (showTopic && revealRef.current) {
      gsap.fromTo(
        revealRef.current,
        { opacity: 0, y: 60, rotateX: -25, scale: 0.88 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.7,
          ease: 'back.out(1.4)',
        }
      );
    }
  }, [showTopic]);

  // Topic count for display
  const topicCount = ALL_TOPICS.length;

  return (
    <div className="fd-root" aria-label="Kiroo Fan Deck Generator">
      {/* ── Atmospheric Background ── */}
      <div className="fd-bg">
        <div className="fd-bg-vignette" />
        <div className="fd-bg-radial" />
        <div className="fd-bg-radial fd-bg-radial--left" />
      </div>

      {/* ── Atmospheric Particles ── */}
      <div className="fd-particles" aria-hidden="true">
        {particles.map((p) => (
          <span
            key={p.id}
            className="fd-particle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              animationDelay: `${p.id * 0.3}s`,
              animationDuration: `${4 + (p.id % 5)}s`,
            }}
          />
        ))}
      </div>

      {/* ── Floating Red Petals ── */}
      <div className="fd-petals-layer" aria-hidden="true">
        {petals.map((p) => (
          <div
            key={p.id}
            className="fd-petal"
            style={{
              left: `${p.x}%`,
              width: p.size,
              height: p.size * 0.6,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              '--drift': `${p.drift}px`,
              '--rot': `${p.rotation}deg`,
            } as React.CSSProperties}
          />
        ))}
        {/* Triggered Petal — travels with card reveal */}
        {petalActive && (
          <div className="fd-petal fd-petal--travel" key="travel" />
        )}
      </div>

      {/* ── Spider Lily Stems — Left ── */}
      <div className="fd-lilies fd-lilies--left" aria-hidden="true">
        {[...Array(4)].map((_, i) => (
          <div key={i} className={`fd-lily fd-lily--${i + 1}`}>
            <div className="fd-lily__stem" />
            <div className="fd-lily__head">
              {[...Array(6)].map((__, j) => (
                <div key={j} className="fd-lily__petal" style={{ '--pi': j } as React.CSSProperties} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Spider Lily Stems — Right ── */}
      <div className="fd-lilies fd-lilies--right" aria-hidden="true">
        {[...Array(4)].map((_, i) => (
          <div key={i} className={`fd-lily fd-lily--${i + 1}`}>
            <div className="fd-lily__stem" />
            <div className="fd-lily__head">
              {[...Array(6)].map((__, j) => (
                <div key={j} className="fd-lily__petal" style={{ '--pi': j } as React.CSSProperties} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Header ── */}
      <header className="fd-header">
        <div className="fd-wordmark">
          <span className="fd-wordmark__text">kiroo</span>
          <span className="fd-wordmark__dot" />
        </div>
        <p className="fd-tagline">
          1,00,000+ topics ({topicCount.toLocaleString()}) · Draw your next idea
        </p>
      </header>

      {/* ── Main Stage ── */}
      <main className="fd-stage">

        {/* Heading */}
        <div className="fd-hero-text">
          <h1 className="fd-title">
            Draw Your<br />
            <span className="fd-title--crimson">Next Idea</span>
          </h1>
          <p className="fd-subtitle">
            Press Generate to fan the deck and reveal a topic.
          </p>
        </div>

        {/* ── Card Deck ── */}
        <div
          className="fd-deck-wrapper"
          style={{ perspective: '1200px' }}
          aria-label="Topic card deck"
        >
          <div ref={deckRef} className="fd-deck">
            {CARD_THEMES.map((theme, i) => (
              <div
                key={i}
                ref={(el) => { cardRefs.current[i] = el; }}
                className={`fd-card ${selectedCardIndex === i ? 'fd-card--selected' : ''}`}
                style={{
                  '--card-bg': theme.bg,
                  '--card-accent': theme.accent,
                  '--card-glow': theme.glow,
                  zIndex: i === selectedCardIndex ? 20 : DECK_SIZE - i,
                } as React.CSSProperties}
                aria-hidden="true"
              >
                {/* Card Face */}
                <div className="fd-card__face">
                  <div className="fd-card__border-inner" />
                  <div className="fd-card__ornament fd-card__ornament--top" />
                  <div className="fd-card__kanji">語</div>
                  <div className="fd-card__logo">kiroo</div>
                  <div className="fd-card__ornament fd-card__ornament--btm" />
                </div>

                {/* Card Edge Glow */}
                <div className="fd-card__edge-glow" />
              </div>
            ))}
          </div>

          {/* Ground Shadow */}
          <div className="fd-deck-shadow" />
        </div>

        {/* ── Generate Button ── */}
        <button
          className={`fd-generate-btn ${isAnimating ? 'fd-generate-btn--animating' : ''}`}
          onClick={handleGenerate}
          disabled={isAnimating}
          aria-label="Generate a random topic"
        >
          <span className="fd-generate-btn__inner">
            <svg className="fd-generate-btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L12 22M2 12L22 12" />
              <circle cx="12" cy="12" r="9" />
            </svg>
            <span className="fd-generate-btn__label">
              {isAnimating ? 'Drawing…' : 'Generate Topic'}
            </span>
          </span>
          <span className="fd-generate-btn__shimmer" />
        </button>

        <p className="fd-keyboard-hint">Press <kbd>Space</kbd> or <kbd>Enter</kbd> to draw</p>
      </main>

      {/* ── Topic Reveal Overlay ── */}
      {showTopic && currentTopic && (
        <div
          className="fd-reveal-overlay"
          onClick={() => setShowTopic(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="revealed-topic"
        >
          <div
            ref={revealRef}
            className="fd-reveal-card"
            onClick={(e) => e.stopPropagation()}
            style={{ perspective: '1000px' }}
          >
            {/* Card Decorations */}
            <div className="fd-rc__edge-top" />
            <div className="fd-rc__edge-bottom" />
            <div className="fd-rc__edge-left" />
            <div className="fd-rc__edge-right" />

            {/* Lily artwork */}
            <div className="fd-rc__artwork" aria-hidden="true">
              <svg viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="fd-rc__lily-svg">
                {/* Stem */}
                <line x1="100" y1="220" x2="100" y2="120" stroke="#DC143C" strokeWidth="2.5" opacity="0.7" />
                {/* Filaments — spidery */}
                {[...Array(8)].map((_, i) => {
                  const angle = (i / 8) * Math.PI * 2;
                  const ex = 100 + Math.cos(angle) * 68;
                  const ey = 120 + Math.sin(angle) * 48;
                  return (
                    <g key={i}>
                      <line x1="100" y1="120" x2={ex} y2={ey} stroke="#DC143C" strokeWidth="1.5" opacity="0.6" />
                      <circle cx={ex} cy={ey} r="3" fill="#DC143C" opacity="0.8" />
                    </g>
                  );
                })}
                {/* Petals */}
                {[...Array(6)].map((_, i) => {
                  const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
                  const px1 = 100 + Math.cos(angle) * 12;
                  const py1 = 120 + Math.sin(angle) * 12;
                  const px2 = 100 + Math.cos(angle) * 55;
                  const py2 = 120 + Math.sin(angle) * 55;
                  const cp1x = 100 + Math.cos(angle - 0.5) * 40;
                  const cp1y = 120 + Math.sin(angle - 0.5) * 40;
                  const cp2x = 100 + Math.cos(angle + 0.5) * 40;
                  const cp2y = 120 + Math.sin(angle + 0.5) * 40;
                  return (
                    <path
                      key={i}
                      d={`M ${px1} ${py1} C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${px2} ${py2}`}
                      stroke="#DC143C"
                      strokeWidth="2.5"
                      opacity={0.55 + i * 0.05}
                      fill="none"
                    />
                  );
                })}
              </svg>
            </div>

            {/* Card Content */}
            <div className="fd-rc__content">
              <div className="fd-rc__badges">
                <span className="fd-rc__theme-tag">{currentTopic.theme}</span>
                <span className="fd-rc__format-badge">{getFormatLabel(currentTopic)}</span>
              </div>

              {currentTopic.format === 'one-word' || (currentTopic.question.includes(' — ') && currentTopic.question.split(' — ')[0].trim().split(' ').length === 1) ? (
                <div className="fd-rc__one-word">
                  <div className="fd-rc__word-title">
                    {currentTopic.question.split(' — ')[0].trim()}
                  </div>
                  {currentTopic.question.includes(' — ') && (
                    <p className="fd-rc__word-gloss">
                      {currentTopic.question.split(' — ')[1].trim()}
                    </p>
                  )}
                </div>
              ) : (
                <p
                  id="revealed-topic"
                  className={`fd-rc__topic fd-rc__topic--${currentTopic.format || (currentTopic.question.length > 110 ? 'long' : currentTopic.question.split(' ').length <= 6 ? 'short' : 'medium')}`}
                >
                  {currentTopic.question}
                </p>
              )}

              <div className="fd-rc__divider" />

              <div className="fd-rc__meta">
                <span className="fd-rc__id">#{currentTopic.id}</span>
                <span className="fd-rc__pool">{ALL_TOPICS.length.toLocaleString()} topics</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="fd-rc__actions">
              <button
                className="fd-rc__btn fd-rc__btn--generate"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTopic(false);
                  setTimeout(() => handleGenerate(), 80);
                }}
              >
                Draw Again
              </button>

              <button
                className="fd-rc__btn fd-rc__btn--copy"
                onClick={async (e) => {
                  e.stopPropagation();
                  await navigator.clipboard.writeText(currentTopic.question);
                }}
              >
                Copy Topic
              </button>

              <button
                className="fd-rc__btn fd-rc__btn--close"
                onClick={() => setShowTopic(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
