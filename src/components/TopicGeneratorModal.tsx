import React, { useState } from 'react';
import {
  Bookmark,
  BookmarkCheck,
  Check,
  Copy,
  ExternalLink,
  RefreshCw,
  Sparkles,
  X,
} from 'lucide-react';
import type { Difficulty, GeneratorOptions, Topic, TopicStyle } from '../types/topic';

interface TopicGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  options: GeneratorOptions;
  setCategory: (cat: string) => void;
  setDifficulty: (diff: Difficulty) => void;
  setStyle: (style: TopicStyle) => void;
  setSubject: (sub: string) => void;
  onGenerate: () => Promise<Topic | null>;
  generatedTopic: Topic | null;
  isGenerating: boolean;
  announcement: string;
  onOpenDetail: (topic: Topic) => void;
  onSaveToggle: (topic: Topic) => void;
  isSaved: boolean;
}

const CATEGORIES: Array<{ id: string; label: string }> = [
  { id: 'Any', label: 'Any Category' },
  { id: 'Essay', label: 'Essay' },
  { id: 'Speaking', label: 'Speaking' },
  { id: 'Debate', label: 'Debate' },
  { id: 'Storytelling', label: 'Storytelling' },
  { id: 'Journal', label: 'Journal' },
  { id: 'Opinion', label: 'Opinion' },
  { id: 'Creative Writing', label: 'Creative Writing' },
  { id: 'Daily Conversation', label: 'Daily Conversation' },
];

const DIFFICULTIES: Difficulty[] = ['Beginner', 'Intermediate', 'Advanced'];

const STYLES: TopicStyle[] = [
  'Interesting',
  'Deep',
  'Practical',
  'Creative',
  'Challenging',
  'Random',
];

export const TopicGeneratorModal: React.FC<TopicGeneratorModalProps> = ({
  isOpen,
  onClose,
  options,
  setCategory,
  setDifficulty,
  setStyle,
  setSubject,
  onGenerate,
  generatedTopic,
  isGenerating,
  announcement,
  onOpenDetail,
  onSaveToggle,
  isSaved,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    if (!generatedTopic) return;
    const textToCopy = `[Kiroo Topic] ${generatedTopic.title} (${generatedTopic.category} - ${generatedTopic.difficulty})
Prompt: ${generatedTopic.mainQuestion}
Task: ${generatedTopic.task.description} (${generatedTopic.task.timeOrWordTarget})`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className="detail-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="generator-title"
    >
      <div className="generator-modal">
        {/* Header */}
        <div className="detail-header">
          <div className="stage-title-wrap">
            <Sparkles size={18} color="#9B8AFB" />
            <h2 id="generator-title" style={{ fontSize: '1.1rem', fontWeight: 600 }}>
              Topic Generator
            </h2>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Close generator">
            <X size={18} />
          </button>
        </div>

        {/* Form & Controls */}
        <div className="generator-content">
          <div className="generator-intro">
            <h3>Find your next line of thought.</h3>
            <p>
              Tune the parameters below to discover an editorial question tailored for your practice.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onGenerate();
            }}
          >
            <div className="generator-form-grid">
              {/* Category */}
              <div className="form-group">
                <label htmlFor="gen-category" className="form-label">
                  Category
                </label>
                <select
                  id="gen-category"
                  className="form-select"
                  value={options.category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Difficulty */}
              <div className="form-group">
                <label htmlFor="gen-diff" className="form-label">
                  Difficulty Level
                </label>
                <select
                  id="gen-diff"
                  className="form-select"
                  value={options.difficulty}
                  onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                >
                  {DIFFICULTIES.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              {/* Topic Style */}
              <div className="form-group">
                <label htmlFor="gen-style" className="form-label">
                  Topic Style
                </label>
                <select
                  id="gen-style"
                  className="form-select"
                  value={options.style}
                  onChange={(e) => setStyle(e.target.value as TopicStyle)}
                >
                  {STYLES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Optional Subject */}
              <div className="form-group">
                <label htmlFor="gen-subject" className="form-label">
                  Optional Subject / Theme
                </label>
                <input
                  id="gen-subject"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Technology, Solitude, Education..."
                  value={options.subject || ''}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ marginTop: '1.4rem', display: 'flex', gap: '0.8rem' }}>
              <button
                type="submit"
                className="btn-primary"
                disabled={isGenerating}
                style={{ flex: 1 }}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    <span>Curating Topic...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    <span>Generate topic</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Accessible Live Region */}
          <div className="sr-only" aria-live="polite">
            {announcement}
          </div>

          {/* Generated Result Card */}
          {generatedTopic && (
            <div className="generator-result-card" role="region" aria-label="Generated Topic Result">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <span className="badge-tag">{generatedTopic.category}</span>
                  <span className="badge-tag diff-intermediate">{generatedTopic.difficulty}</span>
                </div>
                <span className="stage-hint">Curated Editorial Topic</span>
              </div>

              <div>
                <h3
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: 600,
                    marginBottom: '0.4rem',
                    color: 'var(--text-primary)',
                  }}
                >
                  {generatedTopic.title}
                </h3>
                <p style={{ fontStyle: 'italic', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)' }}>
                  “{generatedTopic.mainQuestion}”
                </p>
              </div>

              <div className="task-box">
                <span className="task-tag">Exercise ({generatedTopic.task.type})</span>
                <p className="task-desc">{generatedTopic.task.description}</p>
                <span className="task-target">Target: {generatedTopic.task.timeOrWordTarget}</span>
              </div>

              {/* Actions */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '0.6rem',
                  borderTop: '1px solid var(--border)',
                  flexWrap: 'wrap',
                  gap: '0.6rem',
                }}
              >
                <div style={{ display: 'flex', gap: '0.6rem' }}>
                  <button className="btn-secondary" onClick={handleCopy}>
                    {copied ? <Check size={15} color="#7FE5A8" /> : <Copy size={15} />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>

                  <button className="btn-secondary" onClick={() => onSaveToggle(generatedTopic)}>
                    {isSaved ? (
                      <>
                        <BookmarkCheck size={15} color="#B2A5FF" />
                        <span>Saved</span>
                      </>
                    ) : (
                      <>
                        <Bookmark size={15} />
                        <span>Save</span>
                      </>
                    )}
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '0.6rem' }}>
                  <button
                    className="btn-secondary"
                    onClick={() => {
                      onOpenDetail(generatedTopic);
                    }}
                  >
                    <span>Full View</span>
                    <ExternalLink size={14} />
                  </button>

                  <button className="btn-primary" onClick={() => onGenerate()}>
                    <RefreshCw size={14} />
                    <span>Generate another</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
