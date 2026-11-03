import type { Category } from '../types/topic';

export interface CategoryInfo {
  id: Category;
  name: string;
  tagline: string;
  description: string;
  japanese: string;
  iconType: 'quill' | 'mic' | 'scale' | 'book-open' | 'feather' | 'compass' | 'sparkles' | 'message-circle';
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'Speaking',
    name: 'Speaking',
    tagline: 'Articulate thoughts with clarity and confidence',
    description: 'Impromptu speeches, presentations, and rhetorical structure for vocal mastery.',
    japanese: '対話・話術',
    iconType: 'mic',
  },
  {
    id: 'Essay',
    name: 'Essay',
    tagline: 'Structured analytical & expository prose',
    description: 'Academic arguments, synthesis of ideas, and methodical exploration of complex themes.',
    japanese: '論説・随想',
    iconType: 'quill',
  },
  {
    id: 'Debate',
    name: 'Debate',
    tagline: 'Defend viewpoints and dissect counterarguments',
    description: 'High-stakes ethical, political, and philosophical controversies with sharp counter-points.',
    japanese: '論争・弁証',
    iconType: 'scale',
  },
  {
    id: 'Journal',
    name: 'Journal',
    tagline: 'Introspective writing and reflective observation',
    description: 'Personal inquiry, emotional clarity, and thoughtful self-examination in quiet moments.',
    japanese: '内省・日誌',
    iconType: 'feather',
  },
  {
    id: 'Storytelling',
    name: 'Storytelling',
    tagline: 'Narrative tension, pacing, and human experience',
    description: 'Personal anecdotes, transformative memories, and character-driven vignettes.',
    japanese: '物語・回想',
    iconType: 'book-open',
  },
  {
    id: 'Creative Writing',
    name: 'Creative Writing',
    tagline: 'Evocative imagery and boundless imagination',
    description: 'Speculative worlds, poetic metaphors, and unconventional perspectives.',
    japanese: '創作・文学',
    iconType: 'sparkles',
  },
  {
    id: 'Opinion',
    name: 'Opinion',
    tagline: 'Personal stances on modern culture and lifestyle',
    description: 'Nuanced critiques, cultural commentary, and defensible personal conviction.',
    japanese: '見解・批評',
    iconType: 'compass',
  },
  {
    id: 'Daily Conversation',
    name: 'Daily Conversation',
    tagline: 'Natural fluency for everyday human connection',
    description: 'Authentic dialogue prompts, idioms, and natural transitions for relaxed discussions.',
    japanese: '日常・対話',
    iconType: 'message-circle',
  },
];
