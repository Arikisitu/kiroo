import React from 'react';
import {
  ArrowRight,
  BookOpen,
  Compass,
  Feather,
  MessageCircle,
  Mic,
  PenTool,
  Scale,
  Sparkles,
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import type { CategoryInfo } from '../data/categories';
import type { Category, Topic } from '../types/topic';

interface CategoryGridProps {
  topics: Topic[];
  onSelectCategory: (cat: Category) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ topics, onSelectCategory }) => {
  const getCategoryCount = (category: Category) => {
    return topics.filter((t) => t.category === category).length;
  };

  const getIcon = (type: CategoryInfo['iconType']) => {
    switch (type) {
      case 'mic':
        return <Mic size={20} />;
      case 'quill':
        return <PenTool size={20} />;
      case 'scale':
        return <Scale size={20} />;
      case 'feather':
        return <Feather size={20} />;
      case 'book-open':
        return <BookOpen size={20} />;
      case 'sparkles':
        return <Sparkles size={20} />;
      case 'compass':
        return <Compass size={20} />;
      case 'message-circle':
        return <MessageCircle size={20} />;
    }
  };

  const handleCardClick = (cat: Category) => {
    onSelectCategory(cat);
    const libraryEl = document.getElementById('library');
    if (libraryEl) {
      libraryEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="section-padding" id="categories" aria-label="Explore Categories">
      <div className="section-container">
        <div className="section-header">
          <span className="section-eyebrow">Disciplines of Expression</span>
          <h2 className="section-title">Explore by Category</h2>
          <p className="section-desc">
            Curated formats tailored for vocal delivery, expository debate, reflective prose, and
            casual fluency.
          </p>
        </div>

        <div className="category-grid">
          {CATEGORIES.map((cat) => {
            const count = getCategoryCount(cat.id);
            return (
              <div
                key={cat.id}
                className="category-card"
                onClick={() => handleCardClick(cat.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCardClick(cat.id);
                }}
              >
                <div>
                  <div className="cat-top">
                    <div className="cat-icon-wrap">{getIcon(cat.iconType)}</div>
                    <span className="cat-kanji">{cat.japanese}</span>
                  </div>

                  <h3 className="cat-name">{cat.name}</h3>
                  <p className="cat-desc">{cat.description}</p>
                </div>

                <div className="cat-bottom">
                  <span className="cat-count">
                    {count} {count === 1 ? 'topic' : 'curated topics'}
                  </span>
                  <span className="cat-explore-link">
                    <span>Explore</span>
                    <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
