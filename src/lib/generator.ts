import { INITIAL_TOPICS } from '../data/topics';
import type { Category, Difficulty, GeneratorOptions, Topic, TopicStyle, VocabularyItem } from '../types/topic';

// Dynamic vocabulary pools categorized by intellectual domains
const VOCABULARY_POOLS: Record<string, VocabularyItem[]> = {
  general: [
    { word: 'Articulate', meaning: 'Express an idea or feeling fluently and coherently.', example: 'She was able to articulate her thesis with remarkable clarity.' },
    { word: 'Deliberate', meaning: 'Done consciously and intentionally; unhurried and careful.', example: 'A deliberate choice of phrasing prevents unintended misunderstandings.' },
    { word: 'Nuanced', meaning: 'Characterized by subtle shades of meaning or expression.', example: 'The critique was balanced, insightful, and richly nuanced.' },
    { word: 'Insightful', meaning: 'Having or showing an accurate and deep understanding.', example: 'His comments provided an insightful analysis of recent developments.' },
    { word: 'Cohesive', meaning: 'Forming a united, logical whole.', example: 'A cohesive argument flows smoothly between structural premises.' },
  ],
  deep: [
    { word: 'Epistemology', meaning: 'The theory of knowledge, especially with regard to its methods, validity, and scope.', example: 'His inquiry challenged the traditional epistemology of perception.' },
    { word: 'Quintessential', meaning: 'Representing the most perfect or typical example of a quality or class.', example: 'Her calm demeanor was the quintessential mark of seasoned mentorship.' },
    { word: 'Paradoxical', meaning: 'Seemingly absurd or self-contradictory, but possibly expressing a hidden truth.', example: 'Restricting one’s screen time yields paradoxical gains in social intimacy.' },
    { word: 'Dialectic', meaning: 'The discourse between two opposing sides seeking the truth of a matter through reasoned arguments.', example: 'The seminar utilized an open dialectic between ancient and modern ethics.' },
    { word: 'Introspection', meaning: 'The examination of one’s own conscious thoughts and feelings.', example: 'Through honest introspection, he uncovered the roots of his hesitation.' },
  ],
  practical: [
    { word: 'Pragmatic', meaning: 'Dealing with things sensibly and realistically based on practical rather than theoretical considerations.', example: 'She adopted a pragmatic roadmap to achieve measurable weekly milestones.' },
    { word: 'Iterate', meaning: 'Perform repeatedly, making small modifications and improvements each time.', example: 'Writers must iterate their rough drafts before sharing public copies.' },
    { word: 'Leverage', meaning: 'Use something to maximum advantage.', example: 'He leveraged early morning quiet to compose his most challenging chapters.' },
    { word: 'Frictionless', meaning: 'Smooth and effortless; without difficulty or resistance.', example: 'Developing good habits requires creating a frictionless initial environment.' },
    { word: 'Systemic', meaning: 'Relating to a system, especially as opposed to a particular part.', example: 'Addressing procrastination demands systemic changes to one’s workspace.' },
  ],
  creative: [
    { word: 'Juxtaposition', meaning: 'The fact of two things being seen or placed close together with contrasting effect.', example: 'The juxtaposition of ancient stone alleys and neon towers was striking.' },
    { word: 'Visceral', meaning: 'Relating to deep inward feelings rather than to intellect.', example: 'The melody evoked a visceral sensation of returning home.' },
    { word: 'Metaphorical', meaning: 'Characteristic of or relating to a metaphor; figurative.', example: 'The voyage across the quiet lake was distinctly metaphorical.' },
    { word: 'Resonance', meaning: 'The power to evoke enduring images, memories, and emotions.', example: 'The final stanza possessed a haunting emotional resonance.' },
    { word: 'Sensory', meaning: 'Relating to sensation or the physical senses.', example: 'The author painted the rain-soaked marketplace in rich sensory detail.' },
  ],
  challenging: [
    { word: 'Antithetical', meaning: 'Directly opposed or contrasted; mutually incompatible.', example: 'Greed is entirely antithetical to public stewardship.' },
    { word: 'Dichotomy', meaning: 'A division or contrast between two things that are represented as being opposed or entirely different.', example: 'He rejected the false dichotomy between scientific rigor and poetic wonder.' },
    { word: 'Fallacy', meaning: 'A mistaken belief, especially one based on unsound argument.', example: 'Assuming correlation implies causation is a common logical fallacy.' },
    { word: 'Ubiquity', meaning: 'The fact of appearing everywhere or of being very common.', example: 'The ubiquity of instant streaming has diminished the charm of anticipation.' },
    { word: 'Subversive', meaning: 'Seeking or intended to subvert an established system or institution.', example: 'Socratic questioning is subtly subversive to dogmatic thinking.' },
  ],
};

const JAPANESE_TERMS: Array<{ kanji: string; sub: string }> = [
  { kanji: '創', sub: '創造の源' },
  { kanji: '静', sub: '静寂の思索' },
  { kanji: '智', sub: '知恵の探求' },
  { kanji: '研', sub: '研鑽の日々' },
  { kanji: '識', sub: '見識の広がり' },
  { kanji: '導', sub: '先導の指針' },
  { kanji: '挑', sub: '新たなる挑戦' },
  { kanji: '究', sub: '真理の探求' },
];

const RECENT_IDS = new Set<string>();

export function generateTopic(options: GeneratorOptions): Topic {
  const { category, difficulty, style, subject } = options;

  // Filter curated pool first
  let candidates = INITIAL_TOPICS.filter((t) => {
    const matchCat = category === 'Any' || !category ? true : t.category === category;
    const matchDiff = !difficulty ? true : t.difficulty === difficulty;
    const matchStyle = !style || style === 'Random' ? true : t.style === style;
    const matchSubj =
      !subject || subject.trim() === ''
        ? true
        : t.subject.toLowerCase().includes(subject.toLowerCase().trim()) ||
          t.title.toLowerCase().includes(subject.toLowerCase().trim()) ||
          t.mainQuestion.toLowerCase().includes(subject.toLowerCase().trim());

    return matchCat && matchDiff && matchStyle && matchSubj;
  });

  // Exclude very recently viewed topic if there are alternatives
  const freshCandidates = candidates.filter((c) => !RECENT_IDS.has(c.id));
  const poolToUse = freshCandidates.length > 0 ? freshCandidates : candidates;

  if (poolToUse.length > 0) {
    const selected = poolToUse[Math.floor(Math.random() * poolToUse.length)];
    RECENT_IDS.add(selected.id);
    if (RECENT_IDS.size > 8) {
      const first = RECENT_IDS.values().next().value;
      if (first) RECENT_IDS.delete(first);
    }
    return selected;
  }

  // If filtered candidate pool is empty because of specific criteria or custom subject,
  // we synthesize a tailored, high-fidelity topic deterministically based on options.
  const chosenCategory: Category =
    category === 'Any' || !category
      ? (['Speaking', 'Essay', 'Debate', 'Journal', 'Storytelling', 'Opinion', 'Creative Writing', 'Daily Conversation'][
          Math.floor(Math.random() * 8)
        ] as Category)
      : (category as Category);

  const chosenDifficulty: Difficulty = difficulty || 'Intermediate';
  const chosenStyle: TopicStyle = !style || style === 'Random' ? 'Interesting' : style;
  const cleanSubject = subject && subject.trim() ? subject.trim() : 'Modern Life & Reflection';

  return synthesizeTopic(chosenCategory, chosenDifficulty, chosenStyle, cleanSubject);
}

function synthesizeTopic(
  category: Category,
  difficulty: Difficulty,
  style: TopicStyle,
  subject: string
): Topic {
  const uniqueId = `gen-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const templates: Record<Category, { titlePrefix: string; mainQ: string; taskType: 'writing' | 'speaking' | 'debate' }> = {
    Speaking: {
      titlePrefix: `The Architecture of ${subject}`,
      mainQ: `How does our evolving relationship with ${subject} redefine our communication, communal trust, and individual character?`,
      taskType: 'speaking',
    },
    Essay: {
      titlePrefix: `Examining ${subject} in an Accelerated World`,
      mainQ: `In what fundamental ways does modern ${subject} challenge traditional assumptions of human flourishing and social responsibility?`,
      taskType: 'writing',
    },
    Debate: {
      titlePrefix: `The Moral Boundaries of ${subject}`,
      mainQ: `Should society impose stricter ethical boundaries upon developments in ${subject}, or does unrestricted innovation foster superior outcomes?`,
      taskType: 'debate',
    },
    Journal: {
      titlePrefix: `Reflections on ${subject}`,
      mainQ: `When you contemplate your direct personal experience with ${subject}, what unspoken truths and shifting boundaries emerge?`,
      taskType: 'writing',
    },
    Storytelling: {
      titlePrefix: `An Encounter with ${subject}`,
      mainQ: `Recount a defining encounter where ${subject} tested your convictions or unveiled an unexpected reality.`,
      taskType: 'writing',
    },
    Opinion: {
      titlePrefix: `Rethinking the Value of ${subject}`,
      mainQ: `Why has conventional consensus regarding ${subject} grown outdated, and what alternative perspective deserves urgent consideration?`,
      taskType: 'writing',
    },
    'Creative Writing': {
      titlePrefix: `Echoes of ${subject}`,
      mainQ: `Craft a rich speculative narrative depicting a sanctuary where the essence of ${subject} is preserved in tangible form.`,
      taskType: 'writing',
    },
    'Daily Conversation': {
      titlePrefix: `Talking Honestly About ${subject}`,
      mainQ: `How can two people discuss ${subject} with warmth, sincere curiosity, and zero pretense?`,
      taskType: 'speaking',
    },
  };

  const tmpl = templates[category] || templates['Speaking'];
  const vocabKey = style === 'Deep' ? 'deep' : style === 'Practical' ? 'practical' : style === 'Creative' ? 'creative' : style === 'Challenging' ? 'challenging' : 'general';
  const vocabList = VOCABULARY_POOLS[vocabKey] || VOCABULARY_POOLS['general'];

  const japaneseMeta = JAPANESE_TERMS[Math.floor(Math.random() * JAPANESE_TERMS.length)];

  const timeTargets = {
    Beginner: tmpl.taskType === 'speaking' ? '90 seconds spoken' : '150 words',
    Intermediate: tmpl.taskType === 'speaking' ? '2 minutes spoken' : '220 words',
    Advanced: tmpl.taskType === 'speaking' ? '3 minutes spoken' : '300 words',
  };

  const newTopic: Topic = {
    id: uniqueId,
    title: tmpl.titlePrefix,
    category,
    difficulty,
    style,
    subject,
    coverTheme: {
      accentColor: '#9B8AFB',
      paperColor: '#EBE6DC',
      inkColor: '#14141E',
      pattern: 'geometric-arch',
      romanNumeral: 'XX',
      kanji: japaneseMeta.kanji,
      japaneseSub: japaneseMeta.sub,
    },
    mainQuestion: tmpl.mainQ,
    guidingQuestions: [
      `What common misconceptions about ${subject} undermine constructive dialogue?`,
      `How does your personal background shape your instinctive reactions to ${subject}?`,
      `What long-term consequences of this issue are most frequently overlooked by mainstream commentary?`,
      `What concrete step could an individual take today to embody a more thoughtful stance?`,
    ],
    vocabulary: vocabList.slice(0, 5),
    task: {
      type: tmpl.taskType,
      description:
        tmpl.taskType === 'speaking'
          ? `Deliver a persuasive, uninterrupted ${timeTargets[difficulty]} speech exploring your core stance on ${subject}.`
          : `Compose a disciplined ${timeTargets[difficulty]} analysis presenting two distinct viewpoints on ${subject}.`,
      timeOrWordTarget: timeTargets[difficulty],
    },
    isAiGenerated: false,
  };

  return newTopic;
}
