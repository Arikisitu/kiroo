import React from 'react';
import { Bookmark, ExternalLink, Trash2, X } from 'lucide-react';
import type { Topic } from '../types/topic';

interface SavedTopicsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedTopics: Topic[];
  onRemove: (id: string) => void;
  onSelectTopic: (topic: Topic) => void;
  onOpenDetail: (topic: Topic) => void;
}

export const SavedTopicsDrawer: React.FC<SavedTopicsDrawerProps> = ({
  isOpen,
  onClose,
  savedTopics,
  onRemove,
  onSelectTopic,
  onOpenDetail,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="drawer-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="saved-drawer-title"
    >
      <div className="drawer-panel">
        <div className="drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Bookmark size={18} color="#9B8AFB" />
            <h2 id="saved-drawer-title" className="drawer-title">
              Saved Topics ({savedTopics.length})
            </h2>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Close saved topics">
            <X size={18} />
          </button>
        </div>

        <div className="drawer-content">
          {savedTopics.length === 0 ? (
            <div className="empty-state">
              <Bookmark size={32} opacity={0.3} />
              <p>No saved topics yet.</p>
              <span style={{ fontSize: '0.84rem' }}>
                Click "Save Topic" on any card or detail sheet to collect topics for later study.
              </span>
            </div>
          ) : (
            savedTopics.map((topic) => (
              <div key={topic.id} className="saved-item-card">
                <div className="saved-item-top">
                  <span className="badge-tag">{topic.category}</span>
                  <span className="stage-hint">{topic.difficulty}</span>
                </div>

                <div
                  className="saved-item-title"
                  onClick={() => {
                    onSelectTopic(topic);
                    onOpenDetail(topic);
                  }}
                >
                  {topic.title}
                </div>

                <p
                  style={{
                    fontSize: '0.84rem',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.4',
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                  }}
                >
                  “{topic.mainQuestion}”
                </p>

                <div className="saved-item-actions">
                  <button
                    className="stage-action-pill"
                    style={{ padding: '0.3rem 0.75rem', fontSize: '0.78rem' }}
                    onClick={() => {
                      onSelectTopic(topic);
                      onOpenDetail(topic);
                    }}
                  >
                    <span>Open</span>
                    <ExternalLink size={12} />
                  </button>

                  <button
                    className="stage-nav-btn"
                    style={{ width: '30px', height: '30px' }}
                    onClick={() => onRemove(topic.id)}
                    aria-label={`Remove ${topic.title} from saved`}
                    title="Remove from saved"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
