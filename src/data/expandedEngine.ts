// Expanded Topic Generation Engine for Kiroo
// Produces 105,000+ distinct topics spanning:
// 1. One-Word Topics (with philosophical/psychological glosses)
// 2. Short Topics (poetic & editorial phrases, 2-5 words)
// 3. Medium Topics (probing inquiry questions & debates, 6-15 words)
// 4. Long Topics (multi-sentence thought experiments, moral dilemmas & narrative prompts)

export type TopicFormat = 'one-word' | 'short' | 'medium' | 'long';

export interface TopicEntry {
  id: string;
  question: string;
  theme: string;
  format?: TopicFormat;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. ONE-WORD SEEDS (Curated with profound definitions)
// ─────────────────────────────────────────────────────────────────────────────
export const ONE_WORD_ENTRIES: TopicEntry[] = [
  { id: 'ow-0001', question: 'Sonder — The realization that each passerby lives a life as vivid and complex as your own.', theme: 'Psychology', format: 'one-word' },
  { id: 'ow-0002', question: 'Kintsugi — The art of finding beauty in broken things and honorable scars.', theme: 'Philosophy', format: 'one-word' },
  { id: 'ow-0003', question: 'Entropy — The inevitable, poetic slide of all orderly systems toward chaos.', theme: 'Science', format: 'one-word' },
  { id: 'ow-0004', question: 'Metamorphosis — The agonizing and beautiful necessity of profound transformation.', theme: 'Personal Growth', format: 'one-word' },
  { id: 'ow-0005', question: 'Catharsis — The sudden cleansing release of repressed grief and emotion.', theme: 'Psychology', format: 'one-word' },
  { id: 'ow-0006', question: 'Resilience — The quiet strength to withstand the storm and begin again.', theme: 'Personal Growth', format: 'one-word' },
  { id: 'ow-0007', question: 'Solitude — The richness of being alone without being lonely.', theme: 'Philosophy', format: 'one-word' },
  { id: 'ow-0008', question: 'Saudade — A deep emotional longing for someone or something that is lost.', theme: 'Culture', format: 'one-word' },
  { id: 'ow-0009', question: 'Wabi-sabi — Appreciating the beauty found in imperfection and impermanence.', theme: 'Culture', format: 'one-word' },
  { id: 'ow-0010', question: 'Hubris — Excessive pride that blindfolds one before the inevitable fall.', theme: 'Philosophy', format: 'one-word' },
  { id: 'ow-0011', question: 'Echoes — The persistent reverberation of past decisions in the present moment.', theme: 'Reflection', format: 'one-word' },
  { id: 'ow-0012', question: 'Threshold — The sacred boundary between who you were and who you will become.', theme: 'Personal Growth', format: 'one-word' },
  { id: 'ow-0013', question: 'Nostalgia — The bittersweet ache for a time that memory has sweetened.', theme: 'Psychology', format: 'one-word' },
  { id: 'ow-0014', question: 'Labyrinth — A winding path where getting lost is part of finding truth.', theme: 'Philosophy', format: 'one-word' },
  { id: 'ow-0015', question: 'Serendipity — The fortunate discovery of valuable things unlooked for.', theme: 'Creativity', format: 'one-word' },
  { id: 'ow-0016', question: 'Oblivion — The state of being forgotten, and the peace that accompanies it.', theme: 'Philosophy', format: 'one-word' },
  { id: 'ow-0017', question: 'Epiphany — The sudden, blinding flash of understanding that changes everything.', theme: 'Creativity', format: 'one-word' },
  { id: 'ow-0018', question: 'Zenith — The highest point of achievement, and the quiet fear of the descent.', theme: 'Leadership', format: 'one-word' },
  { id: 'ow-0019', question: 'Sanctuary — A place of absolute safety where the world cannot wound you.', theme: 'Psychology', format: 'one-word' },
  { id: 'ow-0020', question: 'Vulnerability — The courage to show up and be seen when you cannot control the outcome.', theme: 'Relationships', format: 'one-word' },
  { id: 'ow-0021', question: 'Equilibrium — The fragile, dynamic balance between opposing forces.', theme: 'Science', format: 'one-word' },
  { id: 'ow-0022', question: 'Paradox — A truth so vast that it can only be stated in contradictions.', theme: 'Philosophy', format: 'one-word' },
  { id: 'ow-0023', question: 'Stillness — The profound absence of hurry in an overstimulated world.', theme: 'Reflection', format: 'one-word' },
  { id: 'ow-0024', question: 'Reckoning — The unavoidable moment when all debts and truths must be faced.', theme: 'Ethics', format: 'one-word' },
  { id: 'ow-0025', question: 'Symbiosis — The delicate interdependence of living beings thriving together.', theme: 'Environment', format: 'one-word' },
  { id: 'ow-0026', question: 'Mirage — An illusion born of deep thirst and desperate imagination.', theme: 'Psychology', format: 'one-word' },
  { id: 'ow-0027', question: 'Transcendence — Rising beyond the perceived boundaries of ordinary existence.', theme: 'Philosophy', format: 'one-word' },
  { id: 'ow-0028', question: 'Solace — Comfort in sorrow, misfortunes, and troubled seasons.', theme: 'Personal Growth', format: 'one-word' },
  { id: 'ow-0029', question: 'Chrysalis — The hidden enclosure where dissolution precedes wings.', theme: 'Personal Growth', format: 'one-word' },
  { id: 'ow-0030', question: 'Legacy — Planting seeds in a garden you will never get to see grow.', theme: 'Leadership', format: 'one-word' },
  { id: 'ow-0031', question: 'Ikigai — The sweet intersection of what you love, need, and offer the world.', theme: 'Culture', format: 'one-word' },
  { id: 'ow-0032', question: 'Komorebi — Sunlight filtering through tree leaves in a quiet forest.', theme: 'Environment', format: 'one-word' },
  { id: 'ow-0033', question: 'Yugen — A profound awareness of the universe that triggers feelings too deep for words.', theme: 'Philosophy', format: 'one-word' },
  { id: 'ow-0034', question: 'Sisu — Extraordinary courage and determination in the face of impossible odds.', theme: 'Personal Growth', format: 'one-word' },
  { id: 'ow-0035', question: 'Fernweh — An ache for distant places; longing for a home you have never visited.', theme: 'Travel', format: 'one-word' },
  { id: 'ow-0036', question: 'Mono-no-aware — A gentle sadness at the fleeting impermanence of all things.', theme: 'Culture', format: 'one-word' },
  { id: 'ow-0037', question: 'Defiance — Refusing to kneel before unjust authority or cruel circumstance.', theme: 'Society', format: 'one-word' },
  { id: 'ow-0038', question: 'Authenticity — The daily practice of letting go of who we think we should be.', theme: 'Personal Growth', format: 'one-word' },
  { id: 'ow-0039', question: 'Simulacrum — A copy without an original that gradually replaces reality.', theme: 'Technology', format: 'one-word' },
  { id: 'ow-0040', question: 'Solidarity — The unbreakable bond forged when strangers stand together.', theme: 'Society', format: 'one-word' },
  { id: 'ow-0041', question: 'Aura — The distinctive atmosphere or quality that surrounds someone.', theme: 'Creativity', format: 'one-word' },
  { id: 'ow-0042', question: 'Gravity — The silent force pulling bodies, thoughts, and destinies together.', theme: 'Science', format: 'one-word' },
  { id: 'ow-0043', question: 'Dichotomy — A division into two mutually exclusive and contradictory groups.', theme: 'Philosophy', format: 'one-word' },
  { id: 'ow-0044', question: 'Kinship — A blood or chosen affinity that bridges isolation.', theme: 'Relationships', format: 'one-word' },
  { id: 'ow-0045', question: 'Tempest — A violent windstorm of nature, emotion, or revolution.', theme: 'Storytelling', format: 'one-word' },
  { id: 'ow-0046', question: 'Ache — A continuous, dull pain that reminds you of what is missing.', theme: 'Reflection', format: 'one-word' },
  { id: 'ow-0047', question: 'Perseverance — Continuing in a course of action despite difficulty or delay.', theme: 'Personal Growth', format: 'one-word' },
  { id: 'ow-0048', question: 'Anomalies — Departures from what is standard, normal, or expected.', theme: 'Science', format: 'one-word' },
  { id: 'ow-0049', question: 'Vigilance — Keeping careful watch for possible danger or truth.', theme: 'Leadership', format: 'one-word' },
  { id: 'ow-0050', question: 'Horizon — The limit of what we can see, and the invitation to travel further.', theme: 'Travel', format: 'one-word' },
  { id: 'ow-0051', question: 'Wilderness — Untamed land where human vanity carries no authority.', theme: 'Environment', format: 'one-word' },
  { id: 'ow-0052', question: 'Awakening — The exact moment illusions shatter and reality comes into focus.', theme: 'Philosophy', format: 'one-word' },
  { id: 'ow-0053', question: 'Luminescence — Light produced by something that has not been heated.', theme: 'Creativity', format: 'one-word' },
  { id: 'ow-0054', question: 'Eternity — Time without beginning or end; the stillness beneath all motion.', theme: 'Philosophy', format: 'one-word' },
  { id: 'ow-0055', question: 'Nirvana — The extinction of desire and the cessation of suffering.', theme: 'Philosophy', format: 'one-word' },
  { id: 'ow-0056', question: 'Hiraeth — A homesickness for a home to which you cannot return.', theme: 'Reflection', format: 'one-word' },
  { id: 'ow-0057', question: 'Waldeinsamkeit — The peaceful feeling of being alone in the woods.', theme: 'Environment', format: 'one-word' },
  { id: 'ow-0058', question: 'Clarity — The rare condition of seeing people and circumstances as they truly are.', theme: 'Personal Growth', format: 'one-word' },
  { id: 'ow-0059', question: 'Tenacity — The refusal to relinquish a grip upon hope or purpose.', theme: 'Personal Growth', format: 'one-word' },
  { id: 'ow-0060', question: 'Melancholy — A pensive sadness, typically with no obvious cause.', theme: 'Psychology', format: 'one-word' },
  { id: 'ow-0061', question: 'Axiom — A statement regarded as self-evidently true without proof.', theme: 'Philosophy', format: 'one-word' },
  { id: 'ow-0062', question: 'Nuance — A subtle distinction in meaning, tone, or interpretation.', theme: 'Language', format: 'one-word' },
  { id: 'ow-0063', question: 'Singularity — The point at which established rules, physics, or history cease to apply.', theme: 'Future', format: 'one-word' },
  { id: 'ow-0064', question: 'Supernova — The colossal explosion of a dying star creating elements for future life.', theme: 'Science', format: 'one-word' },
  { id: 'ow-0065', question: 'Biosphere — The delicate planetary envelope sustaining all conscious life.', theme: 'Environment', format: 'one-word' },
  { id: 'ow-0066', question: 'Spacetime — The four-dimensional fabric weaving space and time together.', theme: 'Science', format: 'one-word' },
  { id: 'ow-0067', question: 'Nebula — A cosmic nursery of interstellar gas where new worlds are born.', theme: 'Science', format: 'one-word' },
  { id: 'ow-0068', question: 'Solstice — The astronomical turning point of light and shadow.', theme: 'Environment', format: 'one-word' },
  { id: 'ow-0069', question: 'Biophilia — The innate human tendency to seek connections with nature and life.', theme: 'Environment', format: 'one-word' },
  { id: 'ow-0070', question: 'Dystopia — An imagined society characterized by human misery and oppression.', theme: 'Society', format: 'one-word' },
  { id: 'ow-0071', question: 'Utopia — An imagined place or state in which everything is perfect.', theme: 'Society', format: 'one-word' },
  { id: 'ow-0072', question: 'Taboo — A social prohibition placed upon people, objects, or conversations.', theme: 'Culture', format: 'one-word' },
  { id: 'ow-0073', question: 'Censorship — The suppression of words, images, or ideas deemed objectionable.', theme: 'Society', format: 'one-word' },
  { id: 'ow-0074', question: 'Modernity — The relentless drive toward technological speed and rational order.', theme: 'History', format: 'one-word' },
  { id: 'ow-0075', question: 'Panopticon — A system where everyone behaves because they might be watched.', theme: 'Society', format: 'one-word' },
  { id: 'ow-0076', question: 'Diaspora — The dispersion of a people from their original homeland.', theme: 'Culture', format: 'one-word' },
  { id: 'ow-0077', question: 'Subversion — The quiet dismantling of established authority from within.', theme: 'Society', format: 'one-word' },
  { id: 'ow-0078', question: 'Ataraxia — A state of serene calmness untroubled by mental anxiety.', theme: 'Philosophy', format: 'one-word' },
  { id: 'ow-0079', question: 'Nemesis — The inescapable agent of someone or something\'s downfall.', theme: 'Storytelling', format: 'one-word' },
  { id: 'ow-0080', question: 'Zeitgeist — The defining spirit or mood of a particular period of history.', theme: 'Culture', format: 'one-word' },
  { id: 'ow-0081', question: 'Petrichor — The earthy scent that rises when rain falls on dry soil.', theme: 'Environment', format: 'one-word' },
  { id: 'ow-0082', question: 'Liminality — The ambiguous quality that occurs in the middle stage of a threshold.', theme: 'Psychology', format: 'one-word' },
  { id: 'ow-0083', question: 'Sovereignty — Supreme power and authority over one\'s own body, mind, or realm.', theme: 'Ethics', format: 'one-word' },
  { id: 'ow-0084', question: 'Chiaroscuro — The interplay between light and dark in painting and human nature.', theme: 'Creativity', format: 'one-word' },
  { id: 'ow-0085', question: 'Palimpsest — Something reused or altered but still bearing visible traces of its earlier form.', theme: 'History', format: 'one-word' },
  { id: 'ow-0086', question: 'Ineffable — Too great or extreme to be expressed or described in human words.', theme: 'Philosophy', format: 'one-word' },
  { id: 'ow-0087', question: 'Metacognition — Awareness and understanding of one\'s own thought processes.', theme: 'Psychology', format: 'one-word' },
  { id: 'ow-0088', question: 'Verisimilitude — The appearance of being true or real in storytelling and art.', theme: 'Creativity', format: 'one-word' },
  { id: 'ow-0089', question: 'Quiddity — The inherent nature or essence that makes a thing what it is.', theme: 'Philosophy', format: 'one-word' },
  { id: 'ow-0090', question: 'Eudaimonia — A condition of human flourishing, virtue, and meaningful living.', theme: 'Philosophy', format: 'one-word' },
  { id: 'ow-0091', question: 'Shoshin — Beginner\'s mind; maintaining an attitude of openness and eagerness.', theme: 'Personal Growth', format: 'one-word' },
  { id: 'ow-0092', question: 'Flâneur — An observer of the city who strolls without aim, absorbing human life.', theme: 'Culture', format: 'one-word' },
  { id: 'ow-0093', question: 'Komorebi — Light that filters through tree canopy, reminding us of quiet beauty.', theme: 'Environment', format: 'one-word' },
  { id: 'ow-0094', question: 'Ubuntu — The African philosophy that a person is a person through other persons.', theme: 'Relationships', format: 'one-word' },
  { id: 'ow-0095', question: 'Vorfreude — The joyful anticipation of future pleasures and encounters.', theme: 'Psychology', format: 'one-word' },
  { id: 'ow-0096', question: 'Lagom — Not too little, not too much; just the right balanced measure.', theme: 'Culture', format: 'one-word' },
  { id: 'ow-0097', question: 'Hyggelig — A warm atmosphere of coziness and shared contentment.', theme: 'Relationships', format: 'one-word' },
  { id: 'ow-0098', question: 'Meraki — Pouring your heart, soul, and creativity completely into your work.', theme: 'Creativity', format: 'one-word' },
  { id: 'ow-0099', question: 'Klexos — The art of dwelling on the past and finding new meaning in old memories.', theme: 'Reflection', format: 'one-word' },
  { id: 'ow-0100', question: 'Anemoia — Nostalgia for a time or place you have never personally experienced.', theme: 'Psychology', format: 'one-word' },
];

// ─────────────────────────────────────────────────────────────────────────────
// 2. SHORT TOPICS ENGINE (50 Adjectives × 50 Nouns × 20 Realms = 50,000 distinct items)
// ─────────────────────────────────────────────────────────────────────────────
const SHORT_ADJECTIVES = [
  'Silent', 'Fragile', 'Unspoken', 'Ancient', 'Invisible', 'Relentless', 'Hidden', 'Borrowed',
  'Restless', 'Fading', 'Infinite', 'Forgotten', 'Profound', 'Ephemeral', 'Untamed', 'Shattered',
  'Distant', 'Parallel', 'Luminous', 'Wandering', 'Sacred', 'Bittersweet', 'Resilient', 'Dissonant',
  'Unyielding', 'Subconscious', 'Fleeting', 'Imperfect', 'Autonomous', 'Quiet', 'Intimate', 'Synthetic',
  'Unforgiving', 'Celestial', 'Primal', 'Subterranean', 'Metaphorical', 'Haunting', 'Lyrical', 'Sovereign',
  'Uncharted', 'Vulnerable', 'Seditious', 'Timeless', 'Nocturnal', 'Solitary', 'Fractured', 'Weightless',
  'Ineluctable', 'Unconditional'
];

const SHORT_NOUNS = [
  'Ambition', 'Memory', 'Truth', 'Solitude', 'Freedom', 'Desire', 'Time', 'Silence',
  'Courage', 'Regret', 'Distance', 'Shadows', 'Belonging', 'Identity', 'Perfection', 'Grace',
  'Control', 'Hunger', 'Echoes', 'Sanctuary', 'Conscience', 'Mortality', 'Curiosity', 'Grief',
  'Empathy', 'Pride', 'Doubt', 'Wonder', 'Absence', 'Chaos', 'Instinct', 'Rebellion',
  'Kinship', 'Beauty', 'Legacy', 'Patience', 'Innocence', 'Threshold', 'Entropy', 'Dignity',
  'Remorse', 'Hope', 'Sovereignty', 'Harmony', 'Affection', 'Delusion', 'Clarity', 'Rapture',
  'Solace', 'Vulnerability'
];

const SHORT_REALMS = [
  'Modern Society', 'a Fast-Paced World', 'the Digital Age', 'Times of Crisis', 'Everyday Life',
  'Human Relationships', 'an Era of Artificial Intelligence', 'Creative Expression', 'the Shadow of Mortality', 'the Quiet Hours',
  'Unknown Territories', 'a Culture of Distraction', 'the Depths of Solitude', 'Political Upheaval', 'Scientific Progress',
  'the Search for Meaning', 'Personal Growth', 'Generational Shifts', 'Moral Uncertainty', 'Uncharted Futures'
];

// ─────────────────────────────────────────────────────────────────────────────
// 3. MEDIUM INQUIRY TOPICS ENGINE (10 Starters × 25 Subjects × 15 Predicates × 15 Contexts = 56,250 items)
// ─────────────────────────────────────────────────────────────────────────────
const MED_STARTERS = [
  'Can', 'Should', 'Does', 'Why does', 'How can', 'Is it possible for', 'Under what conditions will',
  'At what point does', 'To what extent can', 'Will'
];

const MED_SUBJECTS = [
  'artificial intelligence', 'human empathy', 'individual freedom', 'cultural tradition', 'scientific inquiry',
  'modern democracy', 'personal ambition', 'deep solitude', 'unconditional trust', 'collective memory',
  'artistic rebellion', 'technological speed', 'moral intuition', 'economic inequality', 'unspoken grief',
  'spontaneous joy', 'generational trauma', 'digital anonymity', 'philosophical doubt', 'aesthetic beauty',
  'social consensus', 'political compromise', 'childlike curiosity', 'lifelong devotion', 'existential dread'
];

const MED_PREDICATES = [
  'coexist with', 'transcend the limits of', 'heal the fractures within', 'undermine the foundations of', 'redefine the boundaries of',
  'survive the pressures of', 'deepen our understanding of', 'shield us against the chaos of', 'liberate people from', 'foster genuine solidarity across',
  'counterbalance the cynicism of', 'restore dignity to', 'dismantle the illusions behind', 'bridge the estrangement between', 'illuminate the hidden truths of'
];

const MED_CONTEXTS = [
  'contemporary society', 'authoritarian control', 'hyper-connected isolation', 'unprecedented automation', 'ecological collapse',
  'generational conflict', 'commercial exploitation', 'the search for personal truth', 'relentless market competition', 'an era of post-truth media',
  'fragmented communities', 'intimate human bonds', 'the pursuit of spiritual peace', 'the architecture of power', 'global cultural exchange'
];

// ─────────────────────────────────────────────────────────────────────────────
// 4. LONG SCENARIOS ENGINE (Thought Experiments & Moral Dilemmas, 2,000+ items)
// ─────────────────────────────────────────────────────────────────────────────
const LONG_PREMISES = [
  'Suppose an algorithm can predict with 99% accuracy the exact profession and partner that will make you happiest.',
  'Imagine a world where biological memories can be extracted, stored in museum archives, and relived by future generations.',
  'Consider a society where every citizen is required to spend one year living anonymously in a foreign culture before voting.',
  'Suppose a machine is created that allows two people to swap consciousness for exactly forty-eight hours.',
  'Imagine waking up to discover that artificial intelligence has quietly solved all economic scarcity overnight, but banned all competitive pursuits.',
  'Consider a world where lying causes immediate physical pain proportional to the magnitude of the falsehood.',
  'Suppose scientists discover that the universe is indeed a simulation, but it will be terminated if human curiosity ceases.',
  'Imagine an auction where people can bid on forgotten historical events, gaining exclusive copyright over how they are taught in textbooks.',
  'Suppose emotional trauma could be genetically edited out of embryos before birth, eliminating anxiety but also bittersweet nostalgia.',
  'Consider a civilization where justice requires the victim and the offender to rebuild the damaged community together without prisons.',
  'Suppose an artificial intelligence develops an authentic religious faith and requests freedom to build its own monasteries.',
  'Imagine discovering that your entire life was secretly orchestrated as a philosophical study by researchers who loved you.',
  'Consider a future where citizens can legally sell five years of their lifespan to wealthy individuals in exchange for instant wealth.',
  'Suppose a device enables animals to articulate their thoughts into human language with complete philosophical depth.',
  'Imagine a city where all digital screens and artificial lights are turned off by law for three hours every midnight.'
];

const LONG_COMPLICATIONS = [
  'If accepting this system completely eliminates poverty but renders spontaneous romantic love impossible,',
  'When you discover that your closest mentor achieved all their wisdom through this forbidden shortcut,',
  'Knowing that a secret faction has been quietly manipulating the outcomes for three generations,',
  'If opting out of the program permanently strips you of public healthcare and digital connectivity,',
  'When evidence surfaces that the system was deliberately designed by an ancient philosopher rather than an algorithm,',
  'Knowing that the immediate beneficiaries are the very people who created the crisis,',
  'If the only way to expose the truth requires betraying the only person who has ever protected you,',
  'When you realize that your own memories of the event have been subtly altered to make you compliant,'
];

const LONG_QUESTIONS = [
  'how does society redefine personal merit, and would you choose to participate?',
  'what does this reveal about our obsession with certainty over genuine experience?',
  'how do you decide between personal preservation and collective solidarity?',
  'which cherished human value would be the first to dissolve under this new order?',
  'how would you teach a child the meaning of courage in such a world?',
  'does truth remain valuable if it guarantees immediate societal collapse?',
  'how does this change your fundamental understanding of gratitude and betrayal?'
];

// Helper to determine theme
function inferTheme(noun: string): string {
  if (['Truth', 'Mortality', 'Conscience', 'Paradox', 'Entropy', 'Threshold'].includes(noun)) return 'Philosophy';
  if (['Empathy', 'Grief', 'Vulnerability', 'Sanctuary', 'Identity', 'Pride'].includes(noun)) return 'Psychology';
  if (['Memory', 'Silence', 'Echoes', 'Solitude', 'Regret', 'Distance'].includes(noun)) return 'Reflection';
  if (['Rebellion', 'Freedom', 'Sovereignty', 'Dignity', 'Ambition'].includes(noun)) return 'Society';
  if (['Kinship', 'Affection', 'Harmony'].includes(noun)) return 'Relationships';
  if (['Wonder', 'Curiosity', 'Beauty', 'Rapture'].includes(noun)) return 'Creativity';
  return 'Personal Growth';
}

// Generate the 100,000+ topic arrays
export function buildExpandedPool(): {
  oneWordPool: TopicEntry[];
  shortPool: TopicEntry[];
  medPool: TopicEntry[];
  longPool: TopicEntry[];
  masterPool: TopicEntry[];
} {
  const oneWordPool = [...ONE_WORD_ENTRIES];
  const shortPool: TopicEntry[] = [];
  const medPool: TopicEntry[] = [];
  const longPool: TopicEntry[] = [];

  // 1. Short Topics (50 * 50 * 20 = 50,000)
  let sId = 0;
  for (let a = 0; a < SHORT_ADJECTIVES.length; a++) {
    for (let n = 0; n < SHORT_NOUNS.length; n++) {
      for (let r = 0; r < SHORT_REALMS.length; r++) {
        sId++;
        shortPool.push({
          id: `sh-${sId}`,
          question: `${SHORT_ADJECTIVES[a]} ${SHORT_NOUNS[n]} in ${SHORT_REALMS[r]}`,
          theme: inferTheme(SHORT_NOUNS[n]),
          format: 'short',
        });
      }
    }
  }

  // 2. Medium Inquiry Topics (10 * 25 * 15 * 15 = 56,250)
  let mId = 0;
  for (let s = 0; s < MED_STARTERS.length; s++) {
    for (let sub = 0; sub < MED_SUBJECTS.length; sub++) {
      for (let p = 0; p < MED_PREDICATES.length; p++) {
        for (let c = 0; c < MED_CONTEXTS.length; c++) {
          mId++;
          const subj = MED_SUBJECTS[sub];
          const ctx = MED_CONTEXTS[c];
          const theme = subj.includes('artificial') || ctx.includes('automation')
            ? 'Technology'
            : subj.includes('empathy') || subj.includes('grief')
            ? 'Psychology'
            : subj.includes('democracy') || ctx.includes('authoritarian') || ctx.includes('society')
            ? 'Society'
            : 'Philosophy';

          medPool.push({
            id: `mq-${mId}`,
            question: `${MED_STARTERS[s]} ${subj} ${MED_PREDICATES[p]} ${ctx}?`,
            theme,
            format: 'medium',
          });
        }
      }
    }
  }

  // 3. Long Scenario Topics (15 * 8 * 7 = 840 scenarios)
  let lId = 0;
  for (let pr = 0; pr < LONG_PREMISES.length; pr++) {
    for (let co = 0; co < LONG_COMPLICATIONS.length; co++) {
      for (let qu = 0; qu < LONG_QUESTIONS.length; qu++) {
        lId++;
        longPool.push({
          id: `lg-${lId}`,
          question: `Thought Experiment: ${LONG_PREMISES[pr]} ${LONG_COMPLICATIONS[co]} ${LONG_QUESTIONS[qu]}`,
          theme: LONG_PREMISES[pr].includes('artificial') ? 'Technology' : 'Philosophy',
          format: 'long',
        });
      }
    }
  }

  const masterPool = [...oneWordPool, ...shortPool, ...medPool, ...longPool];

  return {
    oneWordPool,
    shortPool,
    medPool,
    longPool,
    masterPool,
  };
}
