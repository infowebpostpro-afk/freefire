/**
 * Free Fire Girls Nickname Browser - Structured Name Database
 * Strictly separates Base Nicknames from Presentation Styles.
 * High-quality, distinct female gaming identities across vibes and playstyles.
 */

const GIRLS_CATEGORIES = [
  { id: 'queen', label: 'Queen', icon: '👑', desc: 'Royal, sovereign & commanding handles' },
  { id: 'badass', label: 'Badass', icon: '😈', desc: 'Fierce, aggressive & rebellious identities' },
  { id: 'aesthetic', label: 'Aesthetic', icon: '✨', desc: 'Soft, celestial, stylish & artistic names' },
  { id: 'pro', label: 'Pro', icon: '⚡', desc: 'Competitive, esports & clutch playmakers' },
  { id: 'dark', label: 'Dark', icon: '☠', desc: 'Gothic, shadow, void & reaper styles' },
  { id: 'cute', label: 'Cute', icon: '🌸', desc: 'Sweet, charming & playful gaming handles' },
  { id: 'sniper', label: 'Sniper', icon: '🎯', desc: 'Precision, scope & long-range huntress vibes' },
  { id: 'minimal', label: 'Minimal', icon: '🧊', desc: 'Punchy 3–5 letter sleek handles' },
  { id: 'cyber', label: 'Cyber', icon: '🤖', desc: 'Futuristic, neon, glitch & tech identities' },
  { id: 'warrior', label: 'Warrior', icon: '⚔', desc: 'Blade, combat, armor & battle-tested names' },
  { id: 'cool', label: 'Cool', icon: '💎', desc: 'Sleek, chill, modern & charismatic names' },
  { id: 'mystical', label: 'Mystical', icon: '🌙', desc: 'Mythology, goddesses & enchanted lore' }
];

const GIRLS_VIBES = [
  { id: 'queen', label: 'Queen', icon: '👑', tagLine: 'Royal & elite styles' },
  { id: 'badass', label: 'Badass', icon: '😈', tagLine: 'Fierce & bold names' },
  { id: 'cute', label: 'Cute', icon: '🌸', tagLine: 'Sweet & playful handles' },
  { id: 'dark', label: 'Dark', icon: '☠', tagLine: 'Gothic & shadow vibes' },
  { id: 'aesthetic', label: 'Aesthetic', icon: '✨', tagLine: 'Celestial & stylish' },
  { id: 'pro', label: 'Pro', icon: '⚡', tagLine: 'Competitive badges' }
];

const GIRLS_PLAYSTYLES = [
  { id: 'rusher', label: 'Rusher', icon: '⚡', desc: 'Close-quarters entry fragger, aggressive pusher' },
  { id: 'sniper', label: 'Sniper', icon: '🎯', desc: 'Deadly marksman, cover specialist, precision headshots' },
  { id: 'tactical', label: 'Tactical', icon: '🛡', desc: 'Zone controller, strategic anchor, squad support' },
  { id: 'leader', label: 'Leader', icon: '👑', desc: 'Squad shot-caller, clutch playmaker' },
  { id: 'stealth', label: 'Stealth', icon: '🥷', desc: 'Silent flanker, unseen rotations, unexpected angles' },
  { id: 'casual', label: 'Casual', icon: '🎮', desc: 'Fun sessions, squad laughs, chill matches' }
];

// Semantic clusters for intelligent "More Like This"
const GIRLS_SEMANTIC_CLUSTERS = {
  queen: ['queen', 'empress', 'duchess', 'princess', 'monarch', 'reign', 'majesty', 'sovereign', 'lady', 'dynasty', 'regal', 'crown', 'regalia', 'reina', 'celeste', 'crownv'],
  royal: ['regalia', 'aurelia', 'reina', 'celeste', 'crownv', 'queen', 'empress', 'duchess', 'princess', 'monarch', 'reign', 'majesty', 'sovereign', 'regal', 'crown'],
  badass: ['viper', 'rogue', 'blaze', 'valkyr', 'storm', 'raven', 'vixen', 'medusa', 'rebel', 'psycho', 'toxic', 'harley', 'widow', 'riot', 'savage', 'banshee', 'wrath', 'predator'],
  fierce: ['viper', 'rogue', 'blaze', 'valkyr', 'storm', 'raven', 'vixen', 'medusa', 'rebel', 'psycho', 'toxic', 'harley', 'widow', 'riot', 'savage', 'banshee', 'wrath', 'predator'],
  dark: ['nyx', 'noira', 'eclipse', 'shade', 'raven', 'vanta', 'shadow', 'witch', 'nocturna', 'grim', 'abyss', 'phantom', 'obsidian', 'voodoo', 'void'],
  goddess: ['valkyrie', 'athena', 'artemis', 'freya', 'hera', 'venus', 'selene', 'pandora', 'aurora', 'cleo', 'aphrodite', 'diana'],
  cute: ['mochi', 'mimi', 'peachy', 'lumi', 'bunnyv', 'cherryx', 'honey', 'blossom', 'daisy', 'kitten', 'candy', 'cherie', 'angel', 'sugar', 'peach', 'cupcake', 'bella', 'cutie', 'foxy', 'mia'],
  aesthetic: ['lunara', 'velora', 'iris', 'nova', 'selene', 'aurelia', 'aura', 'velvet', 'luminous', 'celestial', 'stella', 'mystic', 'eclipse', 'nebula', 'mirage', 'whisper', 'ethereal', 'lotus', 'lux'],
  cool: ['nyra', 'vexa', 'ryn', 'zara', 'echo', 'nova', 'cleo', 'diana', 'monarch', 'lady', 'tempest', 'pulse', 'vee'],
  cyber: ['cyber', 'glitch', 'matrix', 'pixel', 'neon', 'nexus', 'pulse', 'circuit', 'echo', 'binary', 'zero', 'vector'],
  sniper: ['deadeye', 'huntress', 'viper', 'scope', 'arrow', 'crosshair', 'bullseye', 'headshot', 'tracer', 'bullet', 'recon', 'talon'],
  warrior: ['blade', 'slayer', 'ronin', 'tempest', 'saber', 'dagger', 'scythe', 'gladiator', 'knight', 'raider', 'storm', 'havoc', 'valkyr'],
  minimal: ['nyx', 'lux', 'mia', 'ryn', 'vee', 'aya', 'ivy', 'luna', 'cleo', 'roxy', 'ruby', 'fay', 'joy', 'zoe', 'eve', 'sky', 'zen', 'ash', 'kia']
};

/**
 * 160+ Curated Base Girl Nicknames
 */
const GIRLS_DATABASE = [
  // --- QUEEN & ROYAL CLUSTER ---
  {
    id: 'queen',
    baseName: 'Queen',
    categories: ['queen', 'pro', 'cool'],
    playstyles: ['leader', 'tactical'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['royal', 'crown', 'monarch', 'ruler', 'boss', 'gold', 'elite'],
    featured: true,
    addedAt: '2026-01-10'
  },
  {
    id: 'empress',
    baseName: 'Empress',
    categories: ['queen', 'aesthetic', 'pro'],
    playstyles: ['leader', 'tactical'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['empire', 'dynasty', 'ruler', 'sovereign', 'majesty'],
    featured: true,
    addedAt: '2026-01-11'
  },
  {
    id: 'duchess',
    baseName: 'Duchess',
    categories: ['queen', 'aesthetic'],
    playstyles: ['leader', 'casual'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['noble', 'royalty', 'court', 'grace', 'elite'],
    featured: false,
    addedAt: '2026-01-12'
  },
  {
    id: 'princess',
    baseName: 'Princess',
    categories: ['queen', 'cute'],
    playstyles: ['casual', 'rusher'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['tiara', 'crown', 'pink', 'sweet', 'royal'],
    featured: true,
    addedAt: '2026-01-13'
  },
  {
    id: 'monarch',
    baseName: 'Monarch',
    categories: ['queen', 'pro', 'cool'],
    playstyles: ['leader', 'tactical'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['butterfly', 'sovereign', 'ruler', 'crown', 'wings'],
    featured: false,
    addedAt: '2026-01-14'
  },
  {
    id: 'reign',
    baseName: 'Reign',
    categories: ['queen', 'minimal', 'pro'],
    playstyles: ['leader', 'rusher'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['rule', 'power', 'throne', 'clean', 'dynasty'],
    featured: true,
    addedAt: '2026-01-15'
  },
  {
    id: 'majesty',
    baseName: 'Majesty',
    categories: ['queen', 'aesthetic'],
    playstyles: ['leader', 'tactical'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['royal', 'grand', 'crown', 'noble', 'grace'],
    featured: false,
    addedAt: '2026-01-16'
  },
  {
    id: 'lady',
    baseName: 'Lady',
    categories: ['queen', 'minimal', 'cool'],
    playstyles: ['casual', 'tactical'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['noble', 'classy', 'clean', 'respect', 'grace'],
    featured: false,
    addedAt: '2026-01-17'
  },
  {
    id: 'dynasty',
    baseName: 'Dynasty',
    categories: ['queen', 'pro'],
    playstyles: ['leader', 'tactical'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['empire', 'heritage', 'generations', 'royal'],
    featured: false,
    addedAt: '2026-01-18'
  },

  // --- BADASS & ATTITUDE CLUSTER ---
  {
    id: 'vixen',
    baseName: 'Vixen',
    categories: ['badass', 'pro', 'cool'],
    playstyles: ['rusher', 'stealth'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['fox', 'fierce', 'rebel', 'sharp', 'quick', 'wild', 'bold'],
    featured: true,
    addedAt: '2026-01-10'
  },
  {
    id: 'medusa',
    baseName: 'Medusa',
    categories: ['badass', 'dark', 'mystical'],
    playstyles: ['rusher', 'tactical'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['stone', 'snakes', 'gorgon', 'gaze', 'deadly', 'myth'],
    featured: true,
    addedAt: '2026-01-11'
  },
  {
    id: 'rebel',
    baseName: 'Rebel',
    categories: ['badass', 'minimal', 'pro'],
    playstyles: ['rusher', 'casual'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['defiant', 'riot', 'anarchy', 'free', 'bold'],
    featured: true,
    addedAt: '2026-01-12'
  },
  {
    id: 'psycho',
    baseName: 'Psycho',
    categories: ['badass', 'dark'],
    playstyles: ['rusher', 'casual'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['crazy', 'wild', 'harley', 'reckless', 'rebel'],
    featured: true,
    addedAt: '2026-01-13'
  },
  {
    id: 'toxic',
    baseName: 'Toxic',
    categories: ['badass', 'minimal'],
    playstyles: ['rusher', 'casual'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['poison', 'acid', 'venom', 'lethal', 'bite'],
    featured: true,
    addedAt: '2026-01-14'
  },
  {
    id: 'harley',
    baseName: 'Harley',
    categories: ['badass', 'cool'],
    playstyles: ['rusher', 'casual'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['quinn', 'mallet', 'joker', 'pigtails', 'rebel'],
    featured: true,
    addedAt: '2026-01-15'
  },
  {
    id: 'widow',
    baseName: 'Widow',
    categories: ['badass', 'dark', 'sniper'],
    playstyles: ['sniper', 'stealth'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['blackwidow', 'spider', 'lethal', 'bite', 'avenger'],
    featured: true,
    addedAt: '2026-01-16'
  },
  {
    id: 'riot',
    baseName: 'Riot',
    categories: ['badass', 'minimal', 'warrior'],
    playstyles: ['rusher', 'leader'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['chaos', 'strike', 'rebellion', 'protest', 'fire'],
    featured: false,
    addedAt: '2026-01-17'
  },
  {
    id: 'savage',
    baseName: 'Savage',
    categories: ['badass', 'warrior'],
    playstyles: ['rusher', 'casual'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['wild', 'fierce', 'brutal', 'untamed', 'bold'],
    featured: false,
    addedAt: '2026-01-18'
  },
  {
    id: 'banshee',
    baseName: 'Banshee',
    categories: ['badass', 'dark', 'mystical'],
    playstyles: ['rusher', 'tactical'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['scream', 'wail', 'ghost', 'spirit', 'celtic', 'sonic'],
    featured: true,
    addedAt: '2026-01-19'
  },
  {
    id: 'wrath',
    baseName: 'Wrath',
    categories: ['badass', 'minimal', 'warrior'],
    playstyles: ['rusher', 'leader'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['fury', 'rage', 'fire', 'anger', 'vengeance'],
    featured: false,
    addedAt: '2026-01-20'
  },
  {
    id: 'predator',
    baseName: 'Predator',
    categories: ['badass', 'sniper', 'stealth'],
    playstyles: ['sniper', 'stealth'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['hunter', 'stalker', 'apex', 'unseen', 'claws'],
    featured: false,
    addedAt: '2026-01-21'
  },

  // --- GODDESS & MYTHOLOGY CLUSTER ---
  {
    id: 'valkyrie',
    baseName: 'Valkyrie',
    categories: ['mystical', 'warrior', 'pro', 'queen'],
    playstyles: ['leader', 'rusher'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['norse', 'wings', 'choosers', 'warrior', 'shield', 'valhalla'],
    featured: true,
    addedAt: '2026-01-10'
  },
  {
    id: 'athena',
    baseName: 'Athena',
    categories: ['mystical', 'warrior', 'pro'],
    playstyles: ['tactical', 'leader'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['greek', 'wisdom', 'war', 'shield', 'owl', 'strategy'],
    featured: true,
    addedAt: '2026-01-11'
  },
  {
    id: 'artemis',
    baseName: 'Artemis',
    categories: ['mystical', 'sniper', 'cool'],
    playstyles: ['sniper', 'stealth'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['goddess', 'hunt', 'bow', 'arrow', 'moon', 'wilderness'],
    featured: true,
    addedAt: '2026-01-12'
  },
  {
    id: 'freya',
    baseName: 'Freya',
    categories: ['mystical', 'queen', 'minimal'],
    playstyles: ['leader', 'tactical'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['norse', 'love', 'war', 'magic', 'queen'],
    featured: false,
    addedAt: '2026-01-13'
  },
  {
    id: 'hera',
    baseName: 'Hera',
    categories: ['mystical', 'queen', 'minimal'],
    playstyles: ['leader', 'tactical'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['queen', 'olympus', 'peacock', 'greek', 'majesty'],
    featured: false,
    addedAt: '2026-01-14'
  },
  {
    id: 'venus',
    baseName: 'Venus',
    categories: ['mystical', 'aesthetic', 'minimal'],
    playstyles: ['casual', 'tactical'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['planet', 'love', 'beauty', 'star', 'roman'],
    featured: false,
    addedAt: '2026-01-15'
  },
  {
    id: 'selene',
    baseName: 'Selene',
    categories: ['mystical', 'aesthetic', 'dark'],
    playstyles: ['tactical', 'stealth'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['moon', 'lunar', 'night', 'underworld', 'silver'],
    featured: false,
    addedAt: '2026-01-16'
  },
  {
    id: 'pandora',
    baseName: 'Pandora',
    categories: ['mystical', 'dark', 'aesthetic'],
    playstyles: ['tactical', 'rusher'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['box', 'curse', 'hope', 'myth', 'secrets'],
    featured: false,
    addedAt: '2026-01-17'
  },
  {
    id: 'cleo',
    baseName: 'Cleo',
    categories: ['queen', 'minimal', 'mystical'],
    playstyles: ['leader', 'casual'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['cleopatra', 'egypt', 'nile', 'gold', 'queen'],
    featured: true,
    addedAt: '2026-01-18'
  },

  // --- DARK & GOTHIC CLUSTER ---
  {
    id: 'nyx',
    baseName: 'Nyx',
    categories: ['dark', 'minimal', 'mystical'],
    playstyles: ['stealth', 'sniper'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['night', 'shadow', 'goddess', 'black', 'clean', 'void'],
    featured: true,
    addedAt: '2026-01-10'
  },
  {
    id: 'raven',
    baseName: 'Raven',
    categories: ['dark', 'cool', 'stealth'],
    playstyles: ['stealth', 'sniper'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['crow', 'feather', 'blackbird', 'omen', 'mystery'],
    featured: true,
    addedAt: '2026-01-11'
  },
  {
    id: 'shadow',
    baseName: 'Shadow',
    categories: ['dark', 'stealth', 'pro'],
    playstyles: ['stealth', 'tactical'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['unseen', 'night', 'covert', 'black', 'ninja'],
    featured: true,
    addedAt: '2026-01-12'
  },
  {
    id: 'witch',
    baseName: 'Witch',
    categories: ['dark', 'minimal', 'mystical'],
    playstyles: ['tactical', 'casual'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['magic', 'hex', 'coven', 'potion', 'spell'],
    featured: false,
    addedAt: '2026-01-13'
  },
  {
    id: 'nocturna',
    baseName: 'Nocturna',
    categories: ['dark', 'aesthetic', 'stylish'],
    playstyles: ['tactical', 'stealth'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['night', 'midnight', 'moon', 'gothic', 'dark'],
    featured: false,
    addedAt: '2026-01-14'
  },
  {
    id: 'abyss',
    baseName: 'Abyss',
    categories: ['dark', 'minimal', 'badass'],
    playstyles: ['rusher', 'stealth'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['deep', 'ocean', 'darkness', 'void', 'cold'],
    featured: false,
    addedAt: '2026-01-15'
  },
  {
    id: 'obsidian',
    baseName: 'Obsidian',
    categories: ['dark', 'cool', 'pro'],
    playstyles: ['tactical', 'rusher'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['volcanic', 'glass', 'black', 'blade', 'stone'],
    featured: false,
    addedAt: '2026-01-16'
  },
  {
    id: 'void',
    baseName: 'Void',
    categories: ['dark', 'minimal'],
    playstyles: ['rusher', 'stealth'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['empty', 'blackhole', 'space', 'deadly', 'clean'],
    featured: false,
    addedAt: '2026-01-17'
  },

  // --- CUTE & SWEET CLUSTER ---
  {
    id: 'honey',
    baseName: 'Honey',
    categories: ['cute', 'minimal', 'cool'],
    playstyles: ['casual', 'rusher'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['sweet', 'bee', 'gold', 'cute', 'charm'],
    featured: true,
    addedAt: '2026-01-10'
  },
  {
    id: 'blossom',
    baseName: 'Blossom',
    categories: ['cute', 'aesthetic'],
    playstyles: ['casual', 'tactical'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['cherry', 'sakura', 'flower', 'petal', 'pink', 'spring'],
    featured: true,
    addedAt: '2026-01-11'
  },
  {
    id: 'daisy',
    baseName: 'Daisy',
    categories: ['cute', 'minimal'],
    playstyles: ['casual', 'rusher'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['flower', 'white', 'yellow', 'cheerful', 'sweet'],
    featured: true,
    addedAt: '2026-01-12'
  },
  {
    id: 'kitten',
    baseName: 'Kitten',
    categories: ['cute', 'cool'],
    playstyles: ['casual', 'stealth'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['cat', 'whiskers', 'paws', 'purr', 'cute', 'playful'],
    featured: true,
    addedAt: '2026-01-13'
  },
  {
    id: 'candy',
    baseName: 'Candy',
    categories: ['cute', 'minimal'],
    playstyles: ['casual', 'rusher'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['sugar', 'sweet', 'pink', 'lollipop', 'treat'],
    featured: true,
    addedAt: '2026-01-14'
  },
  {
    id: 'cherie',
    baseName: 'Cherie',
    categories: ['cute', 'aesthetic'],
    playstyles: ['casual', 'tactical'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['cherry', 'darling', 'french', 'sweet', 'red'],
    featured: false,
    addedAt: '2026-01-15'
  },
  {
    id: 'angel',
    baseName: 'Angel',
    categories: ['cute', 'aesthetic', 'pro'],
    playstyles: ['tactical', 'leader'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['wings', 'halo', 'divine', 'pure', 'white', 'guardian'],
    featured: true,
    addedAt: '2026-01-16'
  },
  {
    id: 'sugar',
    baseName: 'Sugar',
    categories: ['cute', 'minimal'],
    playstyles: ['casual', 'rusher'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['sweet', 'spice', 'white', 'candy', 'cute'],
    featured: false,
    addedAt: '2026-01-17'
  },
  {
    id: 'peach',
    baseName: 'Peach',
    categories: ['cute', 'minimal', 'aesthetic'],
    playstyles: ['casual', 'stealth'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['princess', 'fruit', 'pink', 'soft', 'sweet'],
    featured: true,
    addedAt: '2026-01-18'
  },
  {
    id: 'bella',
    baseName: 'Bella',
    categories: ['cute', 'minimal', 'queen'],
    playstyles: ['casual', 'leader'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['beautiful', 'italian', 'pretty', 'grace', 'clean'],
    featured: false,
    addedAt: '2026-01-19'
  },

  // --- AESTHETIC & CELESTIAL CLUSTER ---
  {
    id: 'aura',
    baseName: 'Aura',
    categories: ['aesthetic', 'minimal', 'cool'],
    playstyles: ['tactical', 'stealth'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['glow', 'energy', 'vibe', 'radiance', 'light'],
    featured: true,
    addedAt: '2026-01-10'
  },
  {
    id: 'velvet',
    baseName: 'Velvet',
    categories: ['aesthetic', 'queen', 'cool'],
    playstyles: ['tactical', 'casual'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['smooth', 'fabric', 'luxury', 'soft', 'red'],
    featured: true,
    addedAt: '2026-01-11'
  },
  {
    id: 'luminous',
    baseName: 'Luminous',
    categories: ['aesthetic', 'pro'],
    playstyles: ['leader', 'tactical'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['bright', 'light', 'shine', 'glow', 'radiant'],
    featured: false,
    addedAt: '2026-01-12'
  },
  {
    id: 'celestial',
    baseName: 'Celestial',
    categories: ['aesthetic', 'mystical'],
    playstyles: ['tactical', 'leader'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['stars', 'sky', 'heavens', 'space', 'divine'],
    featured: true,
    addedAt: '2026-01-13'
  },
  {
    id: 'stella',
    baseName: 'Stella',
    categories: ['aesthetic', 'minimal', 'cute'],
    playstyles: ['casual', 'tactical'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['star', 'latin', 'shine', 'night', 'sky'],
    featured: true,
    addedAt: '2026-01-14'
  },
  {
    id: 'mystic',
    baseName: 'Mystic',
    categories: ['aesthetic', 'mystical', 'dark'],
    playstyles: ['tactical', 'stealth'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['magic', 'enchanted', 'arcane', 'mystery', 'seer'],
    featured: true,
    addedAt: '2026-01-15'
  },
  {
    id: 'eclipse',
    baseName: 'Eclipse',
    categories: ['aesthetic', 'dark', 'pro'],
    playstyles: ['tactical', 'leader'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['lunar', 'solar', 'blackout', 'shadow', 'moon'],
    featured: true,
    addedAt: '2026-01-16'
  },
  {
    id: 'nebula',
    baseName: 'Nebula',
    categories: ['aesthetic', 'cyber', 'cool'],
    playstyles: ['casual', 'tactical'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['cosmic', 'space', 'galaxy', 'violet', 'stars'],
    featured: false,
    addedAt: '2026-01-17'
  },
  {
    id: 'lotus',
    baseName: 'Lotus',
    categories: ['aesthetic', 'minimal', 'mystical'],
    playstyles: ['tactical', 'stealth'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['water', 'flower', 'zen', 'calm', 'pure'],
    featured: true,
    addedAt: '2026-01-18'
  },

  // --- SNIPER & PRECISION CLUSTER ---
  {
    id: 'huntress',
    baseName: 'Huntress',
    categories: ['sniper', 'warrior', 'pro'],
    playstyles: ['sniper', 'stealth'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['track', 'bow', 'scope', 'stalker', 'lethal', 'precision'],
    featured: true,
    addedAt: '2026-01-10'
  },
  {
    id: 'deadeye',
    baseName: 'Deadeye',
    categories: ['sniper', 'badass', 'pro'],
    playstyles: ['sniper', 'tactical'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['accuracy', 'aim', 'gunslinger', 'headshot', 'bullet'],
    featured: true,
    addedAt: '2026-01-11'
  },
  {
    id: 'viper',
    baseName: 'Viper',
    categories: ['sniper', 'badass', 'cool'],
    playstyles: ['sniper', 'stealth'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['snake', 'bite', 'venom', 'deadly', 'strike'],
    featured: true,
    addedAt: '2026-01-12'
  },
  {
    id: 'scope',
    baseName: 'Scope',
    categories: ['sniper', 'minimal', 'pro'],
    playstyles: ['sniper', 'tactical'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['lens', 'zoom', 'sight', 'target', 'awm'],
    featured: false,
    addedAt: '2026-01-13'
  },
  {
    id: 'arrow',
    baseName: 'Arrow',
    categories: ['sniper', 'minimal', 'cool'],
    playstyles: ['sniper', 'stealth'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['bow', 'quiver', 'fast', 'pierce', 'flight'],
    featured: false,
    addedAt: '2026-01-14'
  },
  {
    id: 'headshot',
    baseName: 'Headshot',
    categories: ['sniper', 'pro'],
    playstyles: ['sniper', 'rusher'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['critical', 'rednumber', 'onehit', 'kill', 'aim'],
    featured: false,
    addedAt: '2026-01-15'
  },

  // --- WARRIOR & COMBAT CLUSTER ---
  {
    id: 'blade',
    baseName: 'Blade',
    categories: ['warrior', 'minimal', 'cool'],
    playstyles: ['rusher', 'stealth'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['steel', 'sword', 'katana', 'edge', 'slash'],
    featured: true,
    addedAt: '2026-01-10'
  },
  {
    id: 'slayer',
    baseName: 'Slayer',
    categories: ['warrior', 'badass', 'pro'],
    playstyles: ['rusher', 'leader'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['combat', 'hunter', 'demon', 'kill', 'fighter'],
    featured: true,
    addedAt: '2026-01-11'
  },
  {
    id: 'ronin',
    baseName: 'Ronin',
    categories: ['warrior', 'stealth', 'cool'],
    playstyles: ['stealth', 'tactical'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['samurai', 'katana', 'honor', 'japan', 'lone'],
    featured: true,
    addedAt: '2026-01-12'
  },
  {
    id: 'tempest',
    baseName: 'Tempest',
    categories: ['warrior', 'cool', 'pro'],
    playstyles: ['rusher', 'tactical'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['storm', 'wind', 'cyclone', 'fury', 'gale'],
    featured: true,
    addedAt: '2026-01-13'
  },
  {
    id: 'dagger',
    baseName: 'Dagger',
    categories: ['warrior', 'stealth', 'cool'],
    playstyles: ['stealth', 'rusher'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['knife', 'silent', 'assassin', 'stab', 'quick'],
    featured: false,
    addedAt: '2026-01-14'
  },
  {
    id: 'storm',
    baseName: 'Storm',
    categories: ['warrior', 'cool', 'minimal'],
    playstyles: ['rusher', 'tactical'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['thunder', 'lightning', 'rain', 'tempest', 'power'],
    featured: true,
    addedAt: '2026-01-15'
  },

  // --- CYBER & NEON CLUSTER ---
  {
    id: 'cyber',
    baseName: 'Cyber',
    categories: ['cyber', 'minimal', 'pro'],
    playstyles: ['tactical', 'rusher'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['digital', 'matrix', 'tech', 'future', 'hacker'],
    featured: true,
    addedAt: '2026-01-10'
  },
  {
    id: 'glitch',
    baseName: 'Glitch',
    categories: ['cyber', 'badass', 'minimal'],
    playstyles: ['rusher', 'casual'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['error', 'distortion', 'hacker', 'pixel', 'bug'],
    featured: true,
    addedAt: '2026-01-11'
  },
  {
    id: 'matrix',
    baseName: 'Matrix',
    categories: ['cyber', 'cool', 'pro'],
    playstyles: ['tactical', 'leader'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['code', 'simulation', 'green', 'digital', 'grid'],
    featured: false,
    addedAt: '2026-01-12'
  },
  {
    id: 'pixel',
    baseName: 'Pixel',
    categories: ['cyber', 'cute', 'minimal'],
    playstyles: ['casual', 'stealth'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['retro', 'dot', 'screen', 'digital', 'cute'],
    featured: true,
    addedAt: '2026-01-13'
  },
  {
    id: 'neon',
    baseName: 'Neon',
    categories: ['cyber', 'aesthetic', 'minimal'],
    playstyles: ['casual', 'rusher'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['glow', 'light', 'cyberpunk', 'tokyo', 'pink'],
    featured: true,
    addedAt: '2026-01-14'
  },
  {
    id: 'nexus',
    baseName: 'Nexus',
    categories: ['cyber', 'pro', 'cool'],
    playstyles: ['leader', 'tactical'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['center', 'core', 'portal', 'hub', 'network'],
    featured: false,
    addedAt: '2026-01-15'
  },
  {
    id: 'echo',
    baseName: 'Echo',
    categories: ['cyber', 'stealth', 'minimal'],
    playstyles: ['tactical', 'stealth'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['sound', 'radar', 'voice', 'repeat', 'sonic'],
    featured: false,
    addedAt: '2026-01-16'
  },

  // --- MINIMAL SHORT HANDLES (3-5 Letters) ---
  {
    id: 'ivy',
    baseName: 'Ivy',
    categories: ['minimal', 'badass', 'cool'],
    playstyles: ['rusher', 'stealth'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['poison', 'green', 'plant', 'climbing', 'sharp'],
    featured: true,
    addedAt: '2026-01-10'
  },
  {
    id: 'luna',
    baseName: 'Luna',
    categories: ['minimal', 'aesthetic', 'mystical'],
    playstyles: ['casual', 'tactical'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['moon', 'silver', 'night', 'stars', 'lunar'],
    featured: true,
    addedAt: '2026-01-11'
  },
  {
    id: 'roxy',
    baseName: 'Roxy',
    categories: ['minimal', 'badass', 'cute'],
    playstyles: ['rusher', 'casual'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['rock', 'punk', 'bold', 'energetic', 'rebel'],
    featured: true,
    addedAt: '2026-01-12'
  },
  {
    id: 'ruby',
    baseName: 'Ruby',
    categories: ['minimal', 'cool', 'aesthetic'],
    playstyles: ['casual', 'tactical'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['gem', 'red', 'precious', 'stone', 'sparkle'],
    featured: true,
    addedAt: '2026-01-13'
  },
  {
    id: 'fay',
    baseName: 'Fay',
    categories: ['minimal', 'mystical', 'cute'],
    playstyles: ['stealth', 'casual'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['fairy', 'pixie', 'wings', 'enchanted', 'quick'],
    featured: false,
    addedAt: '2026-01-14'
  },
  {
    id: 'joy',
    baseName: 'Joy',
    categories: ['minimal', 'cute'],
    playstyles: ['casual', 'rusher'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['happy', 'bright', 'smile', 'cheerful', 'clean'],
    featured: false,
    addedAt: '2026-01-15'
  },
  {
    id: 'mia',
    baseName: 'Mia',
    categories: ['minimal', 'cute'],
    playstyles: ['casual', 'stealth'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['short', 'clean', 'simple', 'sweet', 'modern'],
    featured: false,
    addedAt: '2026-01-16'
  },
  {
    id: 'zoe',
    baseName: 'Zoe',
    categories: ['minimal', 'cute', 'pro'],
    playstyles: ['rusher', 'casual'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['life', 'greek', 'energetic', 'sparky', 'clean'],
    featured: false,
    addedAt: '2026-01-17'
  },
  {
    id: 'sky',
    baseName: 'Sky',
    categories: ['minimal', 'cool', 'aesthetic'],
    playstyles: ['casual', 'sniper'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['blue', 'clouds', 'air', 'flight', 'clean'],
    featured: false,
    addedAt: '2026-01-18'
  },

  // --- COOL & CHILL CLUSTER ---
  {
    id: 'frosty',
    baseName: 'Frosty',
    categories: ['cool', 'minimal'],
    playstyles: ['tactical', 'sniper'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['ice', 'cold', 'snow', 'chill', 'winter'],
    featured: true,
    addedAt: '2026-01-10'
  },
  {
    id: 'winter',
    baseName: 'Winter',
    categories: ['cool', 'aesthetic'],
    playstyles: ['tactical', 'stealth'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['snow', 'cold', 'ice', 'frost', 'season'],
    featured: true,
    addedAt: '2026-01-11'
  },
  {
    id: 'diamond',
    baseName: 'Diamond',
    categories: ['cool', 'queen'],
    playstyles: ['leader', 'casual'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['gem', 'hard', 'sparkle', 'precious', 'shine'],
    featured: true,
    addedAt: '2026-01-12'
  },
  {
    id: 'sapphire',
    baseName: 'Sapphire',
    categories: ['cool', 'aesthetic', 'queen'],
    playstyles: ['tactical', 'leader'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['gem', 'blue', 'jewel', 'ocean', 'noble'],
    featured: false,
    addedAt: '2026-01-13'
  },
  {
    id: 'crystal',
    baseName: 'Crystal',
    categories: ['cool', 'aesthetic'],
    playstyles: ['casual', 'tactical'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['clear', 'glass', 'quartz', 'gem', 'pure'],
    featured: false,
    addedAt: '2026-01-14'
  },
  {
    id: 'nova',
    baseName: 'Nova',
    categories: ['pro', 'aesthetic', 'minimal'],
    playstyles: ['rusher', 'leader'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['supernova', 'star', 'explosion', 'bright', 'space'],
    featured: true,
    addedAt: '2026-01-15'
  },

  // --- TWO-WORD POWER COMBOS ---
  {
    id: 'darkqueen',
    baseName: 'Dark Queen',
    categories: ['queen', 'dark', 'badass'],
    playstyles: ['leader', 'tactical'],
    lengthProfile: 'medium',
    wordCount: 2,
    tags: ['crown', 'shadow', 'night', 'ruler', 'gothic'],
    featured: true,
    addedAt: '2026-01-10'
  },
  {
    id: 'sweetdevil',
    baseName: 'Sweet Devil',
    categories: ['cute', 'badass'],
    playstyles: ['rusher', 'casual'],
    lengthProfile: 'medium',
    wordCount: 2,
    tags: ['horns', 'rebel', 'candy', 'cute', 'trick'],
    featured: true,
    addedAt: '2026-01-11'
  },
  {
    id: 'angelicdemon',
    baseName: 'Angelic Demon',
    categories: ['badass', 'aesthetic', 'dark'],
    playstyles: ['rusher', 'tactical'],
    lengthProfile: 'medium',
    wordCount: 2,
    tags: ['wings', 'horns', 'duality', 'divine', 'hell'],
    featured: false,
    addedAt: '2026-01-12'
  },
  {
    id: 'moonwitch',
    baseName: 'Moon Witch',
    categories: ['dark', 'mystical', 'aesthetic'],
    playstyles: ['stealth', 'tactical'],
    lengthProfile: 'medium',
    wordCount: 2,
    tags: ['lunar', 'spell', 'coven', 'night', 'magic'],
    featured: true,
    addedAt: '2026-01-13'
  },
  {
    id: 'babygirl',
    baseName: 'Baby Girl',
    categories: ['cute', 'minimal'],
    playstyles: ['casual', 'rusher'],
    lengthProfile: 'medium',
    wordCount: 2,
    tags: ['sweet', 'teen', 'cute', 'pink', 'gamer'],
    featured: false,
    addedAt: '2026-01-14'
  },
  {
    id: 'silentrose',
    baseName: 'Silent Rose',
    categories: ['aesthetic', 'stealth', 'sniper'],
    playstyles: ['sniper', 'stealth'],
    lengthProfile: 'medium',
    wordCount: 2,
    tags: ['thorns', 'flower', 'unseen', 'covert', 'red'],
    featured: false,
    addedAt: '2026-01-15'
  },
  // --- RESEARCH ADDITIONS (September 2026) ---
  { id: 'lunara', baseName: 'Lunara', categories: ['aesthetic', 'royal', 'cool'], playstyles: ['leader', 'tactical'], lengthProfile: 'medium', wordCount: 1, tags: ['lunar', 'moon', 'celestial', 'dreamy', 'stars'], featured: true, addedAt: '2026-09-20' },
  { id: 'velora', baseName: 'Velora', categories: ['aesthetic', 'royal', 'cool'], playstyles: ['tactical', 'casual'], lengthProfile: 'medium', wordCount: 1, tags: ['velvet', 'aura', 'elegance', 'grace'], featured: true, addedAt: '2026-09-20' },
  { id: 'iris', baseName: 'Iris', categories: ['aesthetic', 'minimal', 'cute'], playstyles: ['casual', 'stealth'], lengthProfile: 'short', wordCount: 1, tags: ['rainbow', 'flower', 'goddess', 'eyes'], featured: false, addedAt: '2026-09-20' },
  { id: 'nova', baseName: 'Nova', categories: ['aesthetic', 'cool', 'minimal'], playstyles: ['rusher', 'sniper'], lengthProfile: 'short', wordCount: 1, tags: ['star', 'explosion', 'cosmic', 'space'], featured: true, addedAt: '2026-09-20' },
  { id: 'selene', baseName: 'Selene', categories: ['aesthetic', 'royal', 'cool'], playstyles: ['leader', 'tactical'], lengthProfile: 'medium', wordCount: 1, tags: ['moon', 'goddess', 'night', 'silver'], featured: true, addedAt: '2026-09-20' },
  { id: 'aurelia', baseName: 'Aurelia', categories: ['royal', 'aesthetic', 'cool'], playstyles: ['leader', 'casual'], lengthProfile: 'medium', wordCount: 1, tags: ['gold', 'golden', 'sun', 'majesty'], featured: true, addedAt: '2026-09-20' },
  { id: 'mochi', baseName: 'Mochi', categories: ['cute', 'minimal'], playstyles: ['casual', 'rusher'], lengthProfile: 'short', wordCount: 1, tags: ['sweet', 'soft', 'rice', 'squishy', 'playful'], featured: true, addedAt: '2026-09-20' },
  { id: 'mimi', baseName: 'Mimi', categories: ['cute', 'minimal'], playstyles: ['casual', 'stealth'], lengthProfile: 'short', wordCount: 1, tags: ['sweet', 'kitten', 'short', 'soft'], featured: false, addedAt: '2026-09-20' },
  { id: 'peachy', baseName: 'Peachy', categories: ['cute', 'aesthetic'], playstyles: ['casual', 'rusher'], lengthProfile: 'medium', wordCount: 1, tags: ['peach', 'fruit', 'sweet', 'summer'], featured: true, addedAt: '2026-09-20' },
  { id: 'lumi', baseName: 'Lumi', categories: ['cute', 'minimal', 'aesthetic'], playstyles: ['casual', 'tactical'], lengthProfile: 'short', wordCount: 1, tags: ['snow', 'light', 'glow', 'soft'], featured: false, addedAt: '2026-09-20' },
  { id: 'bunnyv', baseName: 'BunnyV', categories: ['cute', 'cool'], playstyles: ['rusher', 'casual'], lengthProfile: 'medium', wordCount: 1, tags: ['rabbit', 'hop', 'fast', 'playful'], featured: false, addedAt: '2026-09-20' },
  { id: 'cherryx', baseName: 'CherryX', categories: ['cute', 'cool'], playstyles: ['rusher', 'casual'], lengthProfile: 'medium', wordCount: 1, tags: ['cherry', 'sweet', 'red', 'fruit'], featured: false, addedAt: '2026-09-20' },
  { id: 'nyra', baseName: 'Nyra', categories: ['cool', 'minimal', 'aesthetic'], playstyles: ['rusher', 'sniper'], lengthProfile: 'short', wordCount: 1, tags: ['clean', 'sharp', 'modern', 'esports'], featured: true, addedAt: '2026-09-20' },
  { id: 'vexa', baseName: 'Vexa', categories: ['cool', 'pro', 'minimal'], playstyles: ['rusher', 'leader'], lengthProfile: 'short', wordCount: 1, tags: ['clutch', 'apex', 'clean', 'electric'], featured: true, addedAt: '2026-09-20' },
  { id: 'ryn', baseName: 'Ryn', categories: ['minimal', 'cool'], playstyles: ['sniper', 'stealth'], lengthProfile: 'short', wordCount: 1, tags: ['clean', '3letter', 'minimal', 'sharp'], featured: false, addedAt: '2026-09-20' },
  { id: 'zara', baseName: 'Zara', categories: ['cool', 'minimal'], playstyles: ['leader', 'rusher'], lengthProfile: 'short', wordCount: 1, tags: ['fashion', 'sharp', 'radiant', 'boss'], featured: true, addedAt: '2026-09-20' },
  { id: 'echo', baseName: 'Echo', categories: ['cool', 'minimal', 'aesthetic'], playstyles: ['stealth', 'sniper'], lengthProfile: 'short', wordCount: 1, tags: ['sound', 'wave', 'unseen', 'reverb'], featured: false, addedAt: '2026-09-20' },
  { id: 'viper', baseName: 'Viper', categories: ['badass', 'cool', 'sniper'], playstyles: ['sniper', 'rusher'], lengthProfile: 'short', wordCount: 1, tags: ['snake', 'poison', 'deadly', 'strike'], featured: true, addedAt: '2026-09-20' },
  { id: 'rogue', baseName: 'Rogue', categories: ['badass', 'cool'], playstyles: ['stealth', 'rusher'], lengthProfile: 'short', wordCount: 1, tags: ['rebel', 'outlaw', 'solo', 'stealth'], featured: true, addedAt: '2026-09-20' },
  { id: 'blaze', baseName: 'Blaze', categories: ['badass', 'pro'], playstyles: ['rusher', 'leader'], lengthProfile: 'short', wordCount: 1, tags: ['fire', 'flame', 'heat', 'fury'], featured: true, addedAt: '2026-09-20' },
  { id: 'valkyr', baseName: 'Valkyr', categories: ['badass', 'warrior', 'royal'], playstyles: ['leader', 'rusher'], lengthProfile: 'medium', wordCount: 1, tags: ['norse', 'warrior', 'wings', 'valkyrie'], featured: true, addedAt: '2026-09-20' },
  { id: 'storm', baseName: 'Storm', categories: ['badass', 'cool'], playstyles: ['rusher', 'tactical'], lengthProfile: 'short', wordCount: 1, tags: ['thunder', 'lightning', 'tempest', 'rain'], featured: false, addedAt: '2026-09-20' },
  { id: 'raven', baseName: 'Raven', categories: ['dark', 'cool'], playstyles: ['stealth', 'sniper'], lengthProfile: 'short', wordCount: 1, tags: ['bird', 'black', 'crow', 'shadow'], featured: true, addedAt: '2026-09-20' },
  { id: 'noira', baseName: 'Noira', categories: ['dark', 'aesthetic'], playstyles: ['stealth', 'tactical'], lengthProfile: 'short', wordCount: 1, tags: ['noir', 'black', 'night', 'mystery'], featured: false, addedAt: '2026-09-20' },
  { id: 'vanta', baseName: 'Vanta', categories: ['dark', 'minimal'], playstyles: ['stealth', 'sniper'], lengthProfile: 'short', wordCount: 1, tags: ['vantablack', 'pitch', 'void', 'darkness'], featured: true, addedAt: '2026-09-20' },
  { id: 'regalia', baseName: 'Regalia', categories: ['queen', 'royal', 'aesthetic'], playstyles: ['leader', 'tactical'], lengthProfile: 'medium', wordCount: 1, tags: ['crown', 'robe', 'emblem', 'monarch'], featured: true, addedAt: '2026-09-20' },
  { id: 'reina', baseName: 'Reina', categories: ['queen', 'royal', 'cool'], playstyles: ['leader', 'casual'], lengthProfile: 'short', wordCount: 1, tags: ['queen', 'spanish', 'crown', 'ruler'], featured: true, addedAt: '2026-09-20' },
  { id: 'celeste', baseName: 'Celeste', categories: ['royal', 'aesthetic'], playstyles: ['tactical', 'casual'], lengthProfile: 'medium', wordCount: 1, tags: ['heaven', 'sky', 'stars', 'divine'], featured: true, addedAt: '2026-09-20' },
  { id: 'crownv', baseName: 'CrownV', categories: ['queen', 'royal', 'pro'], playstyles: ['leader', 'rusher'], lengthProfile: 'medium', wordCount: 1, tags: ['crown', 'victory', 'gold', 'queen'], featured: false, addedAt: '2026-09-20' },
  { id: 'lux', baseName: 'Lux', categories: ['minimal', 'aesthetic'], playstyles: ['sniper', 'stealth'], lengthProfile: 'short', wordCount: 1, tags: ['light', 'radiance', 'clean', '3letter'], featured: true, addedAt: '2026-09-20' },
  { id: 'mia', baseName: 'Mia', categories: ['minimal', 'cute'], playstyles: ['casual', 'rusher'], lengthProfile: 'short', wordCount: 1, tags: ['sweet', '3letter', 'cute', 'clean'], featured: true, addedAt: '2026-09-20' },
  { id: 'vee', baseName: 'Vee', categories: ['minimal', 'cool'], playstyles: ['rusher', 'sniper'], lengthProfile: 'short', wordCount: 1, tags: ['victory', 'clean', '3letter'], featured: false, addedAt: '2026-09-20' },
  { id: 'aya', baseName: 'Aya', categories: ['minimal', 'aesthetic'], playstyles: ['casual', 'stealth'], lengthProfile: 'short', wordCount: 1, tags: ['bird', 'miracle', '3letter', 'soft'], featured: false, addedAt: '2026-09-20' }
];

/**
 * Presentation Styles Rules Engine for Girls
 */
const GIRLS_STYLE_RULES = {
  clean: (name) => name,
  pro: (name) => `亗 ${name} 亗`,
  wings: (name) => `𓆩 ${name} 𓆪`,
  royal: (name) => `♛ ${name} ♛`,
  heart: (name) => `♡ ${name} ♡`,
  butterfly: (name) => `ʚ ${name} ɞ`,
  blossom: (name) => `✿ ${name} ✿`,
  star: (name) => `✧ ${name} ✧`,
  brackets: (name) => `『${name}』`,
  extreme: (name) => `꧁༒${name}༒꧂`
};

/**
 * Popular symbols for the Girls mini-picker
 */
const GIRLS_POPULAR_SYMBOLS = [
  '♛', '亗', '♡', '♥', '𓆩', '𓆪', 'ʚ', 'ɞ', '✿', '❀', '✧', '✦', '★', '⚡', '☠', '〆', '彡', '꧁', '꧂', '『', '』', '⚔', '†', '☽', '☾', '⚘'
];

/**
 * Frame presets for the customizer
 */
const GIRLS_FRAME_PRESETS = [
  { id: 'none', label: 'None', format: (n) => n },
  { id: 'wings', label: '𓆩 Name 𓆪', format: (n) => `𓆩 ${n} 𓆪` },
  { id: 'royal_crown', label: '♛ Name ♛', format: (n) => `♛ ${n} ♛` },
  { id: 'heart', label: '♡ Name ♡', format: (n) => `♡ ${n} ♡` },
  { id: 'butterfly', label: 'ʚ Name ɞ', format: (n) => `ʚ ${n} ɞ` },
  { id: 'blossom', label: '✿ Name ✿', format: (n) => `✿ ${n} ✿` },
  { id: 'pro_crown', label: '亗 Name 亗', format: (n) => `亗 ${n} 亗` },
  { id: 'star', label: '✧ Name ✧', format: (n) => `✧ ${n} ✧` },
  { id: 'flourish', label: '꧁ Name ꧂', format: (n) => `꧁${n}꧂` }
];

/**
 * Smart remix generator for a base nickname
 */
function generateGirlsRemixes(baseName) {
  const clean = baseName.trim().replace(/\s+/g, '');
  return [
    `${clean}X`,
    `${clean}Girl`,
    `${clean}Queen`,
    `${clean}Nova`,
    `${clean}Rose`,
    `${clean}Cutie`,
    `${clean}Pro`,
    `${clean}07`
  ];
}
