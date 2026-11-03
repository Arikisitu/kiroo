import React, { useEffect, useState } from 'react';
import { Bookmark, BookmarkCheck, Check, Copy, RefreshCw, X } from 'lucide-react';
import type { Topic } from '../types/topic';

interface TopicDetailSheetProps {
  topic: Topic | null;
  isOpen: boolean;
  onClose: () => void;
  onSaveToggle: (topic: Topic) => void;
  isSaved: boolean;
  onGenerateAnother?: () => void;
}

export const TopicDetailSheet: React.FC<TopicDetailSheetProps> = ({
  topic,
  isOpen,
  onClose,
  onSaveToggle,
  isSaved,
  onGenerateAnother,
}) => {
  const [copied, setCopied] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !topic) return null;

  const handleCopy = async () => {
    const textToCopy = `[Kiroo Editorial Topic]
Title: ${topic.title}
Category: ${topic.category} | Difficulty: ${topic.difficulty}
Subject: ${topic.subject}

PROMPT:
${topic.mainQuestion}

GUIDING QUESTIONS:
${topic.guidingQuestions.map((q, i) => `${i + 1}. ${q}`).join('\n')}

PRACTICE TASK:
${topic.task.description} (${topic.task.timeOrWordTarget})

VOCABULARY:
${topic.vocabulary.map((v) => `• ${v.word}: ${v.meaning}`).join('\n')}
`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch (err) {
      console.error('Failed to copy topic:', err);
    }
  };

  const diffClass =
    topic.difficulty === 'Beginner'
      ? 'diff-beginner'
      : topic.difficulty === 'Intermediate'
      ? 'diff-intermediate'
      : 'diff-advanced';

  return (
    <div
      className="detail-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="detail-modal-title"
    >
      <div className="detail-modal">
        {/* Header */}
        <div className="detail-header">
          <div className="detail-meta-tags">
            <span className="badge-tag">{topic.category}</span>
            <span className={`badge-tag ${diffClass}`}>{topic.difficulty}</span>
            <span className="stage-hint" style={{ marginLeft: '0.4rem' }}>
              {topic.subject}
            </span>
          </div>

          <button
            className="close-btn"
            onClick={onClose}
            aria-label="Close topic detail"
            title="Close (Esc)"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="detail-body">
          {/* Left Column: Editorial Content */}
          <div className="detail-left">
            <h2 id="detail-modal-title" className="detail-title">
              {topic.title}
            </h2>

            {/* Main Prompt */}
            <div className="detail-prompt-box">
              <div className="detail-prompt-label">Inquiry & Focus</div>
              <p className="detail-prompt-text">“{topic.mainQuestion}”</p>
            </div>

            {/* Guiding Questions */}
            <div>
              <h3 className="detail-subheading">Guiding Questions</h3>
              <ul className="guiding-questions-list">
                {topic.guidingQuestions.map((q, idx) => (
                  <li key={idx} className="guiding-q-item">
                    <span className="q-num">0{idx + 1}</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Vocabulary Suggestions */}
            <div>
              <h3 className="detail-subheading">Curated Vocabulary & Nuance</h3>
              <div className="vocab-grid">
                {topic.vocabulary.map((v, i) => (
                  <div key={i} className="vocab-card">
                    <div className="vocab-header">
                      <span className="vocab-word">{v.word}</span>
                      <span className="vocab-meaning">— {v.meaning}</span>
                    </div>
                    {v.example && (
                      <div className="vocab-example">“{v.example}”</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Physical Editorial Cover & Task */}
          <div className="detail-right">
            <div className="editorial-card-plate">
              <div className="card-plate-top">
                <span>{topic.coverTheme?.romanNumeral || 'I'}</span>
                <span>{topic.category.toUpperCase()}</span>
              </div>

              <div className="card-plate-center">
                {topic.coverTheme?.kanji && (
                  <span className="card-plate-kanji">{topic.coverTheme.kanji}</span>
                )}
                <h4 className="card-plate-title">{topic.title}</h4>
                {topic.coverTheme?.japaneseSub && (
                  <span style={{ fontSize: '0.8rem', color: 'rgba(23, 23, 32, 0.6)' }}>
                    {topic.coverTheme.japaneseSub}
                  </span>
                )}
              </div>

              <div className="card-plate-bottom">
                <span>{topic.subject.toUpperCase()}</span>
                <span style={{ color: topic.coverTheme?.accentColor || '#6554CB' }}>
                  {topic.difficulty.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Practice Task Box */}
            <div className="task-box">
              <span className="task-tag">Practical Exercise</span>
              <p className="task-desc">{topic.task.description}</p>
              <span className="task-target">Target: {topic.task.timeOrWordTarget}</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="detail-actions-footer">
          <div className="detail-btn-group">
            <button
              className="btn-secondary"
              onClick={handleCopy}
              title="Copy topic and questions to clipboard"
            >
              {copied ? <Check size={16} color="#7FE5A8" /> : <Copy size={16} />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy Topic'}</span>
            </button>

            <button
              className="btn-secondary"
              onClick={() => onSaveToggle(topic)}
              title={isSaved ? 'Remove from saved' : 'Save topic'}
            >
              {isSaved ? (
                <>
                  <BookmarkCheck size={16} color="#B2A5FF" />
                  <span>Saved</span>
                </>
              ) : (
                <>
                  <Bookmark size={16} />
                  <span>Save Topic</span>
                </>
              )}
            </button>
          </div>

          {onGenerateAnother && (
            <button className="btn-primary" onClick={onGenerateAnother}>
              <RefreshCw size={15} />
              <span>Generate another</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
