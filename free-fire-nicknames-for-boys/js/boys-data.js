/**
 * Free Fire Boys Nickname Browser - Structured Name Database
 * Strictly separates Base Nicknames from Presentation Styles.
 * Every entry is a distinct, high-quality base gaming identity.
 */

const BOYS_CATEGORIES = [
  { id: 'popular', label: 'Popular', icon: '🔥', desc: 'Curated community favorites' },
  { id: 'pro', label: 'Pro', icon: '⚡', desc: 'Esports & competitive identities' },
  { id: 'attitude', label: 'Attitude', icon: '😈', desc: 'Bold, rebellious, aggressive names' },
  { id: 'dark', label: 'Dark', icon: '☠', desc: 'Ghost, shadow, void & reaper styles' },
  { id: 'royal', label: 'Royal', icon: '👑', desc: 'King, crown, emperor & elite themes' },
  { id: 'sniper', label: 'Sniper', icon: '🎯', desc: 'Precision, scope & marksman vibes' },
  { id: 'warrior', label: 'Warrior', icon: '⚔', desc: 'Battle, blade, armor & combat names' },
  { id: 'stealth', label: 'Stealth', icon: '🥷', desc: 'Ninja, silent, covert & shadow operatives' },
  { id: 'cool', label: 'Cool', icon: '💎', desc: 'Sleek, modern, charismatic gamer handles' },
  { id: 'stylish', label: 'Stylish', icon: '✨', desc: 'Ornamental, aesthetic & expressive flair' },
  { id: 'minimal', label: 'Minimal', icon: '🧊', desc: 'Clean, punchy, 3-5 letter handles' },
  { id: 'cyber', label: 'Cyber', icon: '🤖', desc: 'Futuristic, glitch, code & neon identities' }
];

const BOYS_VIBES = [
  { id: 'aggressive', label: 'Aggressive', icon: '🔥', tagLine: 'Fast, bold names' },
  { id: 'dark', label: 'Dark', icon: '☠', tagLine: 'Ghost & shadow vibes' },
  { id: 'royal', label: 'Royal', icon: '👑', tagLine: 'King & elite styles' },
  { id: 'sniper', label: 'Sniper', icon: '🎯', tagLine: 'Precision-inspired' },
  { id: 'pro', label: 'Pro', icon: '⚡', tagLine: 'Competitive badges' },
  { id: 'minimal', label: 'Minimal', icon: '🧊', tagLine: 'Clean & short handles' }
];

const BOYS_PLAYSTYLES = [
  { id: 'rusher', label: 'Rusher', icon: '⚡', desc: 'High aggression, close combat, pushing enemies' },
  { id: 'sniper', label: 'Sniper', icon: '🎯', desc: 'Long-range precision, patient, deadly headshots' },
  { id: 'tactical', label: 'Tactical', icon: '🛡', desc: 'Zone control, cover play, strategic calls' },
  { id: 'leader', label: 'Leader', icon: '👑', desc: 'Squad shot-caller, clutch playmaker' },
  { id: 'stealth', label: 'Stealth', icon: '🥷', desc: 'Flanker, silent rotations, unexpected angles' },
  { id: 'casual', label: 'Casual', icon: '🎮', desc: 'Chill gameplay, fun squad sessions' }
];

// Semantic clusters for intelligent "More Like This"
const SEMANTIC_CLUSTERS = {
  shadow: ['shadow', 'phantom', 'ghost', 'specter', 'void', 'shade', 'eclipse', 'onyx', 'abyss', 'grim', 'kage', 'wraith', 'nocturne', 'dread'],
  fire: ['blaze', 'inferno', 'pyro', 'ember', 'scorch', 'flame', 'ignite', 'vulcan', 'cinder', 'magma', 'flare', 'torment'],
  royal: ['king', 'crown', 'reign', 'emperor', 'throne', 'sovereign', 'monarch', 'caesar', 'prince', 'dynasty', 'regal', 'tsar'],
  power: ['titan', 'apex', 'prime', 'alpha', 'havoc', 'vortex', 'storm', 'juggernaut', 'colossus', 'crusher', 'golem', 'zenith'],
  venom: ['venom', 'viper', 'cobra', 'fang', 'toxic', 'bane', 'hazard', 'voodoo', 'serpent', 'hydra', 'acid', 'sting'],
  sniper: ['sniper', 'bullet', 'trigger', 'scope', 'recon', 'crosshair', 'headshot', 'ballistic', 'arrow', 'tracer', 'bullseye', 'zero'],
  warrior: ['slayer', 'ronin', 'knight', 'saber', 'vandal', 'blade', 'gladiator', 'valkyrie', 'raider', 'outlaw', 'berserk', 'warlord'],
  cyber: ['cipher', 'pulse', 'matrix', 'glitch', 'neon', 'pixel', 'byte', 'circuit', 'vector', 'binary', 'nexus', 'core'],
  minimal: ['zen', 'jax', 'rex', 'ace', 'kai', 'neo', 'fox', 'lex', 'zac', 'dax', 'nyx', 'ash'],
  beast: ['falcon', 'raven', 'wolf', 'raptor', 'hawk', 'draco', 'panther', 'griffin', 'hound', 'cougar', 'chimera', 'fenrir'],
  speed: ['drift', 'blitz', 'dash', 'turbo', 'stride', 'surge', 'rush', 'flash', 'warp', 'sonic', 'swift', 'velocity']
};

/**
 * 160+ Curated Base Boy Nicknames
 * Real, distinct base concepts with rich taxonomy.
 */
const BOYS_DATABASE = [
  // --- SHADOW & DARK CLUSTER ---
  {
    id: 'shadow',
    baseName: 'Shadow',
    categories: ['dark', 'stealth', 'popular', 'cool'],
    playstyles: ['stealth', 'tactical'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['dark', 'stealth', 'ghost', 'night', 'mysterious', 'ninja', 'covert', 'black', 'assassin'],
    featured: true,
    addedAt: '2026-01-10'
  },
  {
    id: 'phantom',
    baseName: 'Phantom',
    categories: ['dark', 'stealth', 'pro', 'popular'],
    playstyles: ['stealth', 'sniper'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['specter', 'ghost', 'unseen', 'haunt', 'spirit', 'silent', 'sniper'],
    featured: true,
    addedAt: '2026-01-11'
  },
  {
    id: 'ghost',
    baseName: 'Ghost',
    categories: ['dark', 'stealth', 'minimal', 'popular'],
    playstyles: ['stealth', 'sniper'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['spectral', 'silent', 'reaper', 'covert', 'unseen', 'sniper', 'recon'],
    featured: true,
    addedAt: '2026-01-12'
  },
  {
    id: 'specter',
    baseName: 'Specter',
    categories: ['dark', 'stealth', 'cool'],
    playstyles: ['stealth', 'tactical'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['apparition', 'spook', 'shadow', 'void', 'phantom', 'mystery'],
    featured: false,
    addedAt: '2026-01-14'
  },
  {
    id: 'void',
    baseName: 'Void',
    categories: ['dark', 'minimal', 'attitude'],
    playstyles: ['rusher', 'tactical'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['abyss', 'space', 'empty', 'blackhole', 'cold', 'deadly'],
    featured: true,
    addedAt: '2026-01-15'
  },
  {
    id: 'shade',
    baseName: 'Shade',
    categories: ['dark', 'minimal', 'stealth'],
    playstyles: ['stealth', 'casual'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['shadow', 'dim', 'covert', 'silhouette', 'night'],
    featured: false,
    addedAt: '2026-01-16'
  },
  {
    id: 'eclipse',
    baseName: 'Eclipse',
    categories: ['dark', 'stylish', 'cool'],
    playstyles: ['tactical', 'leader'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['solar', 'lunar', 'blackout', 'celestial', 'shadow', 'astronomy'],
    featured: true,
    addedAt: '2026-01-17'
  },
  {
    id: 'onyx',
    baseName: 'Onyx',
    categories: ['dark', 'minimal', 'cool'],
    playstyles: ['tactical', 'rusher'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['gem', 'black', 'stone', 'hard', 'mineral', 'clean'],
    featured: true,
    addedAt: '2026-01-18'
  },
  {
    id: 'abyss',
    baseName: 'Abyss',
    categories: ['dark', 'attitude', 'minimal'],
    playstyles: ['rusher', 'stealth'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['deep', 'ocean', 'darkness', 'bottomless', 'terror'],
    featured: false,
    addedAt: '2026-01-19'
  },
  {
    id: 'grim',
    baseName: 'Grim',
    categories: ['dark', 'minimal', 'attitude'],
    playstyles: ['rusher', 'tactical'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['reaper', 'death', 'scythe', 'skull', 'harvester', 'dark'],
    featured: true,
    addedAt: '2026-01-20'
  },
  {
    id: 'kage',
    baseName: 'Kage',
    categories: ['stealth', 'minimal', 'dark'],
    playstyles: ['stealth', 'rusher'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['shadow', 'ninja', 'hokage', 'shinobi', 'japanese', 'silent'],
    featured: false,
    addedAt: '2026-01-21'
  },
  {
    id: 'wraith',
    baseName: 'Wraith',
    categories: ['dark', 'stealth', 'pro'],
    playstyles: ['stealth', 'rusher'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['phantom', 'portal', 'void', 'apparition', 'fast'],
    featured: false,
    addedAt: '2026-01-22'
  },
  {
    id: 'dread',
    baseName: 'Dread',
    categories: ['dark', 'attitude', 'minimal'],
    playstyles: ['rusher', 'tactical'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['fear', 'horror', 'terror', 'intimidation', 'bold'],
    featured: false,
    addedAt: '2026-01-23'
  },
  {
    id: 'nocturne',
    baseName: 'Nocturne',
    categories: ['dark', 'stylish', 'cool'],
    playstyles: ['tactical', 'stealth'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['night', 'music', 'moonlight', 'shadow', 'midnight'],
    featured: false,
    addedAt: '2026-01-24'
  },

  // --- VENOM & AGGRESSIVE CLUSTER ---
  {
    id: 'venom',
    baseName: 'Venom',
    categories: ['attitude', 'popular', 'pro', 'cool'],
    playstyles: ['rusher', 'tactical'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['poison', 'viper', 'toxic', 'lethal', 'symbiote', 'strike', 'fatal'],
    featured: true,
    addedAt: '2026-01-10'
  },
  {
    id: 'viper',
    baseName: 'Viper',
    categories: ['attitude', 'sniper', 'stealth'],
    playstyles: ['sniper', 'stealth'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['snake', 'bite', 'toxic', 'strike', 'green', 'deadly'],
    featured: true,
    addedAt: '2026-01-11'
  },
  {
    id: 'cobra',
    baseName: 'Cobra',
    categories: ['attitude', 'pro', 'cool'],
    playstyles: ['rusher', 'tactical'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['snake', 'hood', 'poison', 'strike', 'desert', 'predator'],
    featured: true,
    addedAt: '2026-01-12'
  },
  {
    id: 'fang',
    baseName: 'Fang',
    categories: ['attitude', 'minimal', 'warrior'],
    playstyles: ['rusher', 'casual'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['teeth', 'bite', 'wolf', 'beast', 'predator', 'sharp'],
    featured: false,
    addedAt: '2026-01-13'
  },
  {
    id: 'toxic',
    baseName: 'Toxic',
    categories: ['attitude', 'minimal', 'popular'],
    playstyles: ['rusher', 'casual'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['poison', 'chemical', 'biohazard', 'acid', 'aggressive'],
    featured: true,
    addedAt: '2026-01-14'
  },
  {
    id: 'bane',
    baseName: 'Bane',
    categories: ['attitude', 'minimal', 'warrior'],
    playstyles: ['rusher', 'leader'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['curse', 'strength', 'villain', 'power', 'brute'],
    featured: false,
    addedAt: '2026-01-15'
  },
  {
    id: 'hazard',
    baseName: 'Hazard',
    categories: ['attitude', 'pro', 'cool'],
    playstyles: ['rusher', 'tactical'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['danger', 'warning', 'radiation', 'caution', 'biohazard'],
    featured: false,
    addedAt: '2026-01-16'
  },
  {
    id: 'voodoo',
    baseName: 'Voodoo',
    categories: ['attitude', 'dark', 'stylish'],
    playstyles: ['tactical', 'stealth'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['magic', 'witchcraft', 'hex', 'spirit', 'mystic'],
    featured: false,
    addedAt: '2026-01-17'
  },
  {
    id: 'hydra',
    baseName: 'Hydra',
    categories: ['attitude', 'pro', 'warrior'],
    playstyles: ['leader', 'tactical'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['myth', 'multihead', 'beast', 'serpent', 'immortal'],
    featured: true,
    addedAt: '2026-01-18'
  },

  // --- FIRE & INFERNO CLUSTER ---
  {
    id: 'blaze',
    baseName: 'Blaze',
    categories: ['popular', 'pro', 'attitude', 'cool'],
    playstyles: ['rusher', 'leader'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['fire', 'flame', 'heat', 'burn', 'pyro', 'hot', 'ignition'],
    featured: true,
    addedAt: '2026-01-10'
  },
  {
    id: 'inferno',
    baseName: 'Inferno',
    categories: ['attitude', 'warrior', 'cool'],
    playstyles: ['rusher', 'tactical'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['firestorm', 'hell', 'blaze', 'conflagration', 'heat'],
    featured: true,
    addedAt: '2026-01-12'
  },
  {
    id: 'pyro',
    baseName: 'Pyro',
    categories: ['minimal', 'attitude', 'pro'],
    playstyles: ['rusher', 'casual'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['fire', 'flame', 'spark', 'combustion', 'heat'],
    featured: false,
    addedAt: '2026-01-13'
  },
  {
    id: 'ember',
    baseName: 'Ember',
    categories: ['minimal', 'cool', 'stylish'],
    playstyles: ['tactical', 'stealth'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['spark', 'glow', 'fire', 'ash', 'coal', 'warmth'],
    featured: true,
    addedAt: '2026-01-14'
  },
  {
    id: 'scorch',
    baseName: 'Scorch',
    categories: ['attitude', 'warrior', 'cool'],
    playstyles: ['rusher', 'tactical'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['burn', 'singe', 'fire', 'desert', 'hot', 'searing'],
    featured: false,
    addedAt: '2026-01-15'
  },
  {
    id: 'ignite',
    baseName: 'Ignite',
    categories: ['pro', 'cool', 'stylish'],
    playstyles: ['rusher', 'leader'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['spark', 'start', 'fuel', 'fire', 'combust'],
    featured: false,
    addedAt: '2026-01-16'
  },
  {
    id: 'vulcan',
    baseName: 'Vulcan',
    categories: ['warrior', 'royal', 'cool'],
    playstyles: ['leader', 'tactical'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['volcano', 'forge', 'smith', 'fire', 'greek', 'roman'],
    featured: false,
    addedAt: '2026-01-17'
  },
  {
    id: 'cinder',
    baseName: 'Cinder',
    categories: ['dark', 'cool', 'stylish'],
    playstyles: ['tactical', 'stealth'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['ash', 'burned', 'ember', 'gray', 'smoke'],
    featured: false,
    addedAt: '2026-01-18'
  },

  // --- ROYAL & ELITE CLUSTER ---
  {
    id: 'king',
    baseName: 'King',
    categories: ['royal', 'popular', 'minimal', 'pro'],
    playstyles: ['leader', 'tactical'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['crown', 'monarch', 'rule', 'leader', 'gold', 'royalty', 'boss'],
    featured: true,
    addedAt: '2026-01-10'
  },
  {
    id: 'crown',
    baseName: 'Crown',
    categories: ['royal', 'minimal', 'cool'],
    playstyles: ['leader', 'casual'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['gold', 'tiara', 'jewel', 'monarch', 'royalty'],
    featured: false,
    addedAt: '2026-01-11'
  },
  {
    id: 'reign',
    baseName: 'Reign',
    categories: ['royal', 'minimal', 'pro'],
    playstyles: ['leader', 'tactical'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['rule', 'dynasty', 'monarch', 'power', 'control'],
    featured: true,
    addedAt: '2026-01-12'
  },
  {
    id: 'emperor',
    baseName: 'Emperor',
    categories: ['royal', 'pro', 'stylish'],
    playstyles: ['leader', 'tactical'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['empire', 'tsar', 'caesar', 'conqueror', 'ruler'],
    featured: true,
    addedAt: '2026-01-13'
  },
  {
    id: 'throne',
    baseName: 'Throne',
    categories: ['royal', 'attitude', 'cool'],
    playstyles: ['leader', 'rusher'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['seat', 'royalty', 'gold', 'court', 'monarch'],
    featured: false,
    addedAt: '2026-01-14'
  },
  {
    id: 'sovereign',
    baseName: 'Sovereign',
    categories: ['royal', 'stylish', 'pro'],
    playstyles: ['leader', 'tactical'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['supreme', 'ruler', 'independent', 'royal', 'noble'],
    featured: false,
    addedAt: '2026-01-15'
  },
  {
    id: 'caesar',
    baseName: 'Caesar',
    categories: ['royal', 'warrior', 'cool'],
    playstyles: ['leader', 'tactical'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['rome', 'conqueror', 'general', 'empire', 'legend'],
    featured: false,
    addedAt: '2026-01-16'
  },
  {
    id: 'dynasty',
    baseName: 'Dynasty',
    categories: ['royal', 'pro', 'stylish'],
    playstyles: ['leader', 'tactical'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['lineage', 'heritage', 'empire', 'generations'],
    featured: false,
    addedAt: '2026-01-17'
  },

  // --- POWER & TITAN CLUSTER ---
  {
    id: 'titan',
    baseName: 'Titan',
    categories: ['pro', 'popular', 'warrior', 'attitude'],
    playstyles: ['rusher', 'leader'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['giant', 'colossus', 'power', 'strength', 'heavy', 'beast', 'greek'],
    featured: true,
    addedAt: '2026-01-10'
  },
  {
    id: 'apex',
    baseName: 'Apex',
    categories: ['pro', 'popular', 'minimal', 'cool'],
    playstyles: ['rusher', 'tactical'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['top', 'peak', 'predator', 'highest', 'competitive', 'champion'],
    featured: true,
    addedAt: '2026-01-11'
  },
  {
    id: 'prime',
    baseName: 'Prime',
    categories: ['pro', 'minimal', 'cool'],
    playstyles: ['rusher', 'tactical'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['numberone', 'best', 'first', 'peak', 'esports'],
    featured: true,
    addedAt: '2026-01-12'
  },
  {
    id: 'alpha',
    baseName: 'Alpha',
    categories: ['pro', 'attitude', 'minimal'],
    playstyles: ['leader', 'rusher'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['wolf', 'pack', 'leader', 'first', 'dominant'],
    featured: true,
    addedAt: '2026-01-13'
  },
  {
    id: 'havoc',
    baseName: 'Havoc',
    categories: ['attitude', 'warrior', 'cool'],
    playstyles: ['rusher', 'casual'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['chaos', 'destruction', 'wreckage', 'damage', 'mayhem'],
    featured: true,
    addedAt: '2026-01-14'
  },
  {
    id: 'vortex',
    baseName: 'Vortex',
    categories: ['pro', 'cool', 'cyber'],
    playstyles: ['rusher', 'tactical'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['spiral', 'whirlpool', 'energy', 'portal', 'cyclone'],
    featured: true,
    addedAt: '2026-01-15'
  },
  {
    id: 'storm',
    baseName: 'Storm',
    categories: ['popular', 'warrior', 'minimal'],
    playstyles: ['rusher', 'tactical'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['thunder', 'lightning', 'tempest', 'rain', 'wind'],
    featured: true,
    addedAt: '2026-01-16'
  },
  {
    id: 'juggernaut',
    baseName: 'Juggernaut',
    categories: ['warrior', 'attitude', 'pro'],
    playstyles: ['rusher', 'leader'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['armor', 'unstoppable', 'tank', 'heavy', 'brute'],
    featured: false,
    addedAt: '2026-01-17'
  },
  {
    id: 'colossus',
    baseName: 'Colossus',
    categories: ['warrior', 'royal', 'cool'],
    playstyles: ['leader', 'tactical'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['giant', 'monument', 'bronze', 'massive', 'titan'],
    featured: false,
    addedAt: '2026-01-18'
  },
  {
    id: 'crusher',
    baseName: 'Crusher',
    categories: ['attitude', 'warrior'],
    playstyles: ['rusher', 'casual'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['smash', 'heavy', 'hammer', 'destroy', 'brute'],
    featured: false,
    addedAt: '2026-01-19'
  },
  {
    id: 'zenith',
    baseName: 'Zenith',
    categories: ['pro', 'cool', 'stylish'],
    playstyles: ['tactical', 'leader'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['peak', 'highest', 'sky', 'sun', 'pinnacle'],
    featured: false,
    addedAt: '2026-01-20'
  },

  // --- SNIPER & PRECISION CLUSTER ---
  {
    id: 'sniper',
    baseName: 'Sniper',
    categories: ['sniper', 'popular', 'pro'],
    playstyles: ['sniper', 'tactical'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['marksman', 'awm', 'scope', 'headshot', 'distance', 'rifle', 'precision'],
    featured: true,
    addedAt: '2026-01-10'
  },
  {
    id: 'bullet',
    baseName: 'Bullet',
    categories: ['sniper', 'minimal', 'attitude'],
    playstyles: ['sniper', 'rusher'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['ammo', 'fast', 'shot', 'metal', 'lead', 'firearm'],
    featured: true,
    addedAt: '2026-01-11'
  },
  {
    id: 'trigger',
    baseName: 'Trigger',
    categories: ['sniper', 'attitude', 'pro'],
    playstyles: ['sniper', 'rusher'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['pull', 'release', 'weapon', 'reflex', 'shot'],
    featured: false,
    addedAt: '2026-01-12'
  },
  {
    id: 'scope',
    baseName: 'Scope',
    categories: ['sniper', 'minimal', 'pro'],
    playstyles: ['sniper', 'tactical'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['lens', 'zoom', 'sight', 'target', 'optical'],
    featured: true,
    addedAt: '2026-01-13'
  },
  {
    id: 'recon',
    baseName: 'Recon',
    categories: ['sniper', 'stealth', 'minimal'],
    playstyles: ['sniper', 'tactical'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['scout', 'intel', 'surveillance', 'drone', 'forward'],
    featured: true,
    addedAt: '2026-01-14'
  },
  {
    id: 'crosshair',
    baseName: 'Crosshair',
    categories: ['sniper', 'pro'],
    playstyles: ['sniper', 'tactical'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['reticle', 'aim', 'center', 'target', 'sight'],
    featured: false,
    addedAt: '2026-01-15'
  },
  {
    id: 'headshot',
    baseName: 'Headshot',
    categories: ['sniper', 'popular', 'pro'],
    playstyles: ['sniper', 'rusher'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['critical', 'onehit', 'kill', 'aim', 'rednumber'],
    featured: true,
    addedAt: '2026-01-16'
  },
  {
    id: 'ballistic',
    baseName: 'Ballistic',
    categories: ['sniper', 'attitude', 'pro'],
    playstyles: ['sniper', 'rusher'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['missile', 'trajectory', 'bullet', 'range', 'heavy'],
    featured: false,
    addedAt: '2026-01-17'
  },
  {
    id: 'zero',
    baseName: 'Zero',
    categories: ['minimal', 'pro', 'stealth', 'cyber'],
    playstyles: ['sniper', 'stealth'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['clean', 'void', 'calibrated', 'number', 'cool'],
    featured: true,
    addedAt: '2026-01-18'
  },

  // --- WARRIOR & COMBAT CLUSTER ---
  {
    id: 'slayer',
    baseName: 'Slayer',
    categories: ['warrior', 'attitude', 'popular'],
    playstyles: ['rusher', 'tactical'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['killer', 'blade', 'hunter', 'combat', 'sword', 'death'],
    featured: true,
    addedAt: '2026-01-10'
  },
  {
    id: 'ronin',
    baseName: 'Ronin',
    categories: ['warrior', 'stealth', 'cool'],
    playstyles: ['stealth', 'tactical'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['samurai', 'masterless', 'katana', 'honor', 'japan'],
    featured: true,
    addedAt: '2026-01-11'
  },
  {
    id: 'knight',
    baseName: 'Knight',
    categories: ['warrior', 'royal', 'cool'],
    playstyles: ['leader', 'tactical'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['armor', 'chivalry', 'sword', 'shield', 'crusade'],
    featured: true,
    addedAt: '2026-01-12'
  },
  {
    id: 'saber',
    baseName: 'Saber',
    categories: ['warrior', 'cool', 'minimal'],
    playstyles: ['rusher', 'tactical'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['blade', 'sword', 'cavalry', 'slash', 'steel'],
    featured: false,
    addedAt: '2026-01-13'
  },
  {
    id: 'vandal',
    baseName: 'Vandal',
    categories: ['warrior', 'attitude', 'cool'],
    playstyles: ['rusher', 'casual'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['rebel', 'rifle', 'destroyer', 'anarchy', 'spray'],
    featured: true,
    addedAt: '2026-01-14'
  },
  {
    id: 'blade',
    baseName: 'Blade',
    categories: ['warrior', 'minimal', 'cool'],
    playstyles: ['rusher', 'stealth'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['edge', 'steel', 'sharp', 'slash', 'katana'],
    featured: true,
    addedAt: '2026-01-15'
  },
  {
    id: 'raider',
    baseName: 'Raider',
    categories: ['warrior', 'attitude', 'pro'],
    playstyles: ['rusher', 'leader'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['pirate', 'viking', 'pillage', 'attack', 'assault'],
    featured: false,
    addedAt: '2026-01-16'
  },
  {
    id: 'outlaw',
    baseName: 'Outlaw',
    categories: ['warrior', 'attitude', 'cool'],
    playstyles: ['rusher', 'casual'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['bandit', 'cowboy', 'rebel', 'wanted', 'gunslinger'],
    featured: false,
    addedAt: '2026-01-17'
  },
  {
    id: 'warlord',
    baseName: 'Warlord',
    categories: ['warrior', 'attitude', 'royal'],
    playstyles: ['leader', 'rusher'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['general', 'conqueror', 'commander', 'military', 'boss'],
    featured: false,
    addedAt: '2026-01-18'
  },
  {
    id: 'gladiator',
    baseName: 'Gladiator',
    categories: ['warrior', 'pro'],
    playstyles: ['rusher', 'tactical'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['arena', 'colosseum', 'combat', 'shield', 'sword'],
    featured: false,
    addedAt: '2026-01-19'
  },

  // --- CYBER & FUTURISTIC CLUSTER ---
  {
    id: 'cipher',
    baseName: 'Cipher',
    categories: ['cyber', 'stealth', 'cool', 'pro'],
    playstyles: ['tactical', 'stealth'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['code', 'cryptic', 'hacker', 'secret', 'data', 'matrix'],
    featured: true,
    addedAt: '2026-01-10'
  },
  {
    id: 'pulse',
    baseName: 'Pulse',
    categories: ['cyber', 'minimal', 'pro'],
    playstyles: ['rusher', 'tactical'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['beat', 'energy', 'emp', 'wave', 'electric'],
    featured: true,
    addedAt: '2026-01-11'
  },
  {
    id: 'matrix',
    baseName: 'Matrix',
    categories: ['cyber', 'cool', 'stylish'],
    playstyles: ['tactical', 'leader'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['code', 'virtual', 'green', 'simulation', 'grid'],
    featured: true,
    addedAt: '2026-01-12'
  },
  {
    id: 'glitch',
    baseName: 'Glitch',
    categories: ['cyber', 'attitude', 'minimal'],
    playstyles: ['rusher', 'casual'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['bug', 'error', 'hacker', 'distortion', 'static'],
    featured: true,
    addedAt: '2026-01-13'
  },
  {
    id: 'neon',
    baseName: 'Neon',
    categories: ['cyber', 'minimal', 'stylish'],
    playstyles: ['casual', 'rusher'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['glow', 'light', 'city', 'tokyo', 'bright', 'cyberpunk'],
    featured: true,
    addedAt: '2026-01-14'
  },
  {
    id: 'pixel',
    baseName: 'Pixel',
    categories: ['cyber', 'minimal', 'cool'],
    playstyles: ['casual', 'stealth'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['retro', 'screen', 'digital', 'game', 'dot'],
    featured: false,
    addedAt: '2026-01-15'
  },
  {
    id: 'circuit',
    baseName: 'Circuit',
    categories: ['cyber', 'pro'],
    playstyles: ['tactical', 'sniper'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['chip', 'board', 'tech', 'electric', 'wire'],
    featured: false,
    addedAt: '2026-01-16'
  },
  {
    id: 'vector',
    baseName: 'Vector',
    categories: ['cyber', 'pro', 'sniper'],
    playstyles: ['tactical', 'sniper'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['math', 'direction', 'smg', 'force', 'arrow'],
    featured: false,
    addedAt: '2026-01-17'
  },
  {
    id: 'nexus',
    baseName: 'Nexus',
    categories: ['cyber', 'pro', 'cool'],
    playstyles: ['leader', 'tactical'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['center', 'core', 'hub', 'connection', 'portal'],
    featured: false,
    addedAt: '2026-01-18'
  },

  // --- MINIMAL & SHORT HANDLES ---
  {
    id: 'zen',
    baseName: 'Zen',
    categories: ['minimal', 'stealth', 'cool'],
    playstyles: ['tactical', 'casual'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['calm', 'peace', 'focus', 'clean', 'monk', 'meditate'],
    featured: true,
    addedAt: '2026-01-10'
  },
  {
    id: 'jax',
    baseName: 'Jax',
    categories: ['minimal', 'attitude', 'pro'],
    playstyles: ['rusher', 'casual'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['short', 'punchy', 'fighter', 'brawler', 'cool'],
    featured: true,
    addedAt: '2026-01-11'
  },
  {
    id: 'rex',
    baseName: 'Rex',
    categories: ['minimal', 'royal', 'attitude'],
    playstyles: ['rusher', 'leader'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['king', 'dinosaur', 'tyrant', 't-rex', 'latin'],
    featured: true,
    addedAt: '2026-01-12'
  },
  {
    id: 'ace',
    baseName: 'Ace',
    categories: ['minimal', 'popular', 'pro', 'cool'],
    playstyles: ['rusher', 'sniper'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['card', 'pilot', 'best', 'squadwipe', 'flawless'],
    featured: true,
    addedAt: '2026-01-13'
  },
  {
    id: 'kai',
    baseName: 'Kai',
    categories: ['minimal', 'cool'],
    playstyles: ['stealth', 'rusher'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['ocean', 'fire', 'ninja', 'clean', 'modern'],
    featured: false,
    addedAt: '2026-01-14'
  },
  {
    id: 'neo',
    baseName: 'Neo',
    categories: ['minimal', 'cyber', 'pro'],
    playstyles: ['tactical', 'rusher'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['new', 'theone', 'chosen', 'matrix', 'clean'],
    featured: true,
    addedAt: '2026-01-15'
  },
  {
    id: 'fox',
    baseName: 'Fox',
    categories: ['minimal', 'stealth', 'cool'],
    playstyles: ['stealth', 'sniper'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['cunning', 'swift', 'animal', 'stealth', 'clever'],
    featured: false,
    addedAt: '2026-01-16'
  },
  {
    id: 'ash',
    baseName: 'Ash',
    categories: ['minimal', 'dark', 'cool'],
    playstyles: ['tactical', 'casual'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['gray', 'cinder', 'fire', 'remains', 'smoke'],
    featured: false,
    addedAt: '2026-01-17'
  },
  {
    id: 'nyx',
    baseName: 'Nyx',
    categories: ['minimal', 'dark', 'stylish'],
    playstyles: ['stealth', 'tactical'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['goddess', 'night', 'darkness', 'greek', 'shadow'],
    featured: false,
    addedAt: '2026-01-18'
  },

  // --- BEAST & PREDATOR CLUSTER ---
  {
    id: 'falcon',
    baseName: 'Falcon',
    categories: ['cool', 'sniper', 'pro'],
    playstyles: ['sniper', 'stealth'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['bird', 'dive', 'claws', 'speed', 'sky', 'precision'],
    featured: true,
    addedAt: '2026-01-10'
  },
  {
    id: 'raven',
    baseName: 'Raven',
    categories: ['dark', 'stealth', 'cool'],
    playstyles: ['stealth', 'sniper'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['blackbird', 'crow', 'feather', 'omen', 'mystery'],
    featured: true,
    addedAt: '2026-01-11'
  },
  {
    id: 'wolf',
    baseName: 'Wolf',
    categories: ['warrior', 'attitude', 'popular', 'minimal'],
    playstyles: ['rusher', 'leader'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['howl', 'pack', 'lone', 'canine', 'fang', 'hunter'],
    featured: true,
    addedAt: '2026-01-12'
  },
  {
    id: 'raptor',
    baseName: 'Raptor',
    categories: ['attitude', 'pro', 'cool'],
    playstyles: ['rusher', 'tactical'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['dino', 'talon', 'predator', 'speed', 'claw'],
    featured: false,
    addedAt: '2026-01-13'
  },
  {
    id: 'hawk',
    baseName: 'Hawk',
    categories: ['sniper', 'minimal', 'pro'],
    playstyles: ['sniper', 'tactical'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['eye', 'bird', 'prey', 'sky', 'talon', 'sharp'],
    featured: false,
    addedAt: '2026-01-14'
  },
  {
    id: 'draco',
    baseName: 'Draco',
    categories: ['royal', 'dark', 'cool'],
    playstyles: ['leader', 'rusher'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['dragon', 'fire', 'constellation', 'scale', 'beast'],
    featured: true,
    addedAt: '2026-01-15'
  },
  {
    id: 'panther',
    baseName: 'Panther',
    categories: ['stealth', 'dark', 'cool'],
    playstyles: ['stealth', 'rusher'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['cat', 'feline', 'black', 'jungle', 'claws'],
    featured: false,
    addedAt: '2026-01-16'
  },
  {
    id: 'griffin',
    baseName: 'Griffin',
    categories: ['royal', 'warrior', 'stylish'],
    playstyles: ['leader', 'tactical'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['myth', 'lion', 'eagle', 'wings', 'noble'],
    featured: false,
    addedAt: '2026-01-17'
  },

  // --- SPEED & SURGE CLUSTER ---
  {
    id: 'drift',
    baseName: 'Drift',
    categories: ['cool', 'popular', 'minimal'],
    playstyles: ['rusher', 'casual'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['slide', 'car', 'speed', 'smooth', 'shift', 'skate'],
    featured: true,
    addedAt: '2026-01-10'
  },
  {
    id: 'blitz',
    baseName: 'Blitz',
    categories: ['pro', 'attitude', 'minimal'],
    playstyles: ['rusher', 'tactical'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['fast', 'lightning', 'rush', 'attack', 'speed'],
    featured: true,
    addedAt: '2026-01-11'
  },
  {
    id: 'surge',
    baseName: 'Surge',
    categories: ['pro', 'minimal', 'cyber'],
    playstyles: ['rusher', 'tactical'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['electricity', 'wave', 'power', 'spike', 'boost'],
    featured: false,
    addedAt: '2026-01-12'
  },
  {
    id: 'flash',
    baseName: 'Flash',
    categories: ['minimal', 'cool', 'pro'],
    playstyles: ['rusher', 'stealth'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['light', 'speed', 'bang', 'quick', 'runner'],
    featured: false,
    addedAt: '2026-01-13'
  },
  {
    id: 'turbo',
    baseName: 'Turbo',
    categories: ['minimal', 'attitude', 'casual'],
    playstyles: ['rusher', 'casual'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['boost', 'engine', 'speed', 'nitro', 'fast'],
    featured: false,
    addedAt: '2026-01-14'
  },

  // --- ATTITUDE & REBEL NICKNAMES ---
  {
    id: 'rogue',
    baseName: 'Rogue',
    categories: ['attitude', 'stealth', 'pro'],
    playstyles: ['stealth', 'rusher'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['rebel', 'outcast', 'assassin', 'independent', 'thief'],
    featured: true,
    addedAt: '2026-01-10'
  },
  {
    id: 'reaper',
    baseName: 'Reaper',
    categories: ['dark', 'attitude', 'popular'],
    playstyles: ['rusher', 'tactical'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['death', 'scythe', 'skull', 'grim', 'soul'],
    featured: true,
    addedAt: '2026-01-11'
  },
  {
    id: 'frost',
    baseName: 'Frost',
    categories: ['cool', 'popular', 'minimal'],
    playstyles: ['tactical', 'sniper'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['ice', 'cold', 'freeze', 'chill', 'winter', 'snow'],
    featured: true,
    addedAt: '2026-01-12'
  },
  {
    id: 'nova',
    baseName: 'Nova',
    categories: ['stylish', 'cyber', 'minimal', 'popular'],
    playstyles: ['casual', 'rusher'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['star', 'explosion', 'supernova', 'space', 'bright'],
    featured: true,
    addedAt: '2026-01-13'
  },
  {
    id: 'stryker',
    baseName: 'Stryker',
    categories: ['warrior', 'pro', 'attitude'],
    playstyles: ['rusher', 'leader'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['attack', 'hit', 'commando', 'combat', 'assault'],
    featured: false,
    addedAt: '2026-01-14'
  },
  {
    id: 'psycho',
    baseName: 'Psycho',
    categories: ['attitude', 'dark'],
    playstyles: ['rusher', 'casual'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['crazy', 'insane', 'wild', 'reckless', 'rebel'],
    featured: true,
    addedAt: '2026-01-15'
  },
  {
    id: 'chaos',
    baseName: 'Chaos',
    categories: ['attitude', 'pro', 'minimal'],
    playstyles: ['rusher', 'leader'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['mayhem', 'disorder', 'entropy', 'wild', 'havoc'],
    featured: true,
    addedAt: '2026-01-16'
  },
  {
    id: 'diablo',
    baseName: 'Diablo',
    categories: ['attitude', 'dark', 'royal'],
    playstyles: ['rusher', 'tactical'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['devil', 'demon', 'fire', 'horns', 'hell', 'spanish'],
    featured: true,
    addedAt: '2026-01-17'
  },
  {
    id: 'thunder',
    baseName: 'Thunder',
    categories: ['warrior', 'attitude', 'cool'],
    playstyles: ['rusher', 'tactical'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['storm', 'lightning', 'boom', 'roar', 'electricity'],
    featured: false,
    addedAt: '2026-01-18'
  },
  {
    id: 'vex',
    baseName: 'Vex',
    categories: ['attitude', 'minimal', 'dark'],
    playstyles: ['stealth', 'casual'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['annoy', 'curse', 'shadow', 'goth', 'spite'],
    featured: false,
    addedAt: '2026-01-19'
  },
  {
    id: 'warlock',
    baseName: 'Warlock',
    categories: ['dark', 'stylish', 'attitude'],
    playstyles: ['tactical', 'stealth'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['sorcerer', 'magic', 'witch', 'darkarts', 'demon'],
    featured: false,
    addedAt: '2026-01-20'
  },
  {
    id: 'diesel',
    baseName: 'Diesel',
    categories: ['attitude', 'warrior', 'cool'],
    playstyles: ['rusher', 'casual'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['engine', 'truck', 'fuel', 'heavy', 'muscle'],
    featured: false,
    addedAt: '2026-01-21'
  },
  {
    id: 'maverick',
    baseName: 'Maverick',
    categories: ['pro', 'attitude', 'cool'],
    playstyles: ['leader', 'rusher'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['lone', 'rebel', 'pilot', 'fighter', 'ace'],
    featured: true,
    addedAt: '2026-01-22'
  },
  {
    id: 'talon',
    baseName: 'Talon',
    categories: ['attitude', 'stealth', 'minimal'],
    playstyles: ['stealth', 'rusher'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['claw', 'eagle', 'strike', 'sharp', 'assassin'],
    featured: false,
    addedAt: '2026-01-23'
  },
  {
    id: 'archer',
    baseName: 'Archer',
    categories: ['sniper', 'stealth', 'cool'],
    playstyles: ['sniper', 'tactical'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['bow', 'arrow', 'quiver', 'aim', 'precision'],
    featured: false,
    addedAt: '2026-01-24'
  },
  {
    id: 'legion',
    baseName: 'Legion',
    categories: ['pro', 'royal', 'warrior'],
    playstyles: ['leader', 'tactical'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['army', 'many', 'rome', 'soldiers', 'cohort'],
    featured: false,
    addedAt: '2026-01-25'
  },
  {
    id: 'razor',
    baseName: 'Razor',
    categories: ['attitude', 'minimal', 'warrior'],
    playstyles: ['rusher', 'stealth'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['sharp', 'blade', 'edge', 'cut', 'steel'],
    featured: true,
    addedAt: '2026-01-26'
  },
  {
    id: 'nomad',
    baseName: 'Nomad',
    categories: ['stealth', 'cool', 'minimal'],
    playstyles: ['stealth', 'tactical'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['wanderer', 'lone', 'desert', 'traveler', 'lone wolf'],
    featured: false,
    addedAt: '2026-01-27'
  },
  {
    id: 'axel',
    baseName: 'Axel',
    categories: ['minimal', 'cool', 'attitude'],
    playstyles: ['rusher', 'casual'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['wheel', 'spin', 'short', 'fighter', 'clean'],
    featured: false,
    addedAt: '2026-01-28'
  },
  {
    id: 'echo',
    baseName: 'Echo',
    categories: ['minimal', 'stealth', 'cyber'],
    playstyles: ['tactical', 'stealth'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['sound', 'radar', 'voice', 'repeat', 'sonar'],
    featured: false,
    addedAt: '2026-01-29'
  },
  {
    id: 'scythe',
    baseName: 'Scythe',
    categories: ['dark', 'attitude', 'warrior'],
    playstyles: ['rusher', 'stealth'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['reaper', 'blade', 'harvest', 'death', 'grim'],
    featured: false,
    addedAt: '2026-01-30'
  },
  {
    id: 'dagger',
    baseName: 'Dagger',
    categories: ['stealth', 'warrior', 'cool'],
    playstyles: ['stealth', 'rusher'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['knife', 'blade', 'stab', 'silent', 'assassin'],
    featured: false,
    addedAt: '2026-01-31'
  },
  {
    id: 'iron',
    baseName: 'Iron',
    categories: ['minimal', 'warrior', 'cool'],
    playstyles: ['tactical', 'rusher'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['metal', 'shield', 'fist', 'strong', 'heavy'],
    featured: false,
    addedAt: '2026-02-01'
  },
  {
    id: 'nitro',
    baseName: 'Nitro',
    categories: ['minimal', 'attitude', 'cool'],
    playstyles: ['rusher', 'casual'],
    lengthProfile: 'short',
    wordCount: 1,
    tags: ['gas', 'fuel', 'boost', 'fast', 'racing'],
    featured: false,
    addedAt: '2026-02-02'
  },
  {
    id: 'savage',
    baseName: 'Savage',
    categories: ['attitude', 'popular', 'warrior'],
    playstyles: ['rusher', 'casual'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['wild', 'beast', 'brutal', 'fierce', 'untamed'],
    featured: true,
    addedAt: '2026-02-03'
  },
  {
    id: 'hunter',
    baseName: 'Hunter',
    categories: ['popular', 'sniper', 'stealth'],
    playstyles: ['sniper', 'stealth'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['track', 'prey', 'bow', 'stalk', 'rifle'],
    featured: true,
    addedAt: '2026-02-04'
  },
  {
    id: 'bulletproof',
    baseName: 'Bulletproof',
    categories: ['pro', 'warrior'],
    playstyles: ['tactical', 'leader'],
    lengthProfile: 'medium',
    wordCount: 1,
    tags: ['armor', 'vest', 'strong', 'indestructible', 'shield'],
    featured: false,
    addedAt: '2026-02-05'
  },
  {
    id: 'darklord',
    baseName: 'Dark Lord',
    categories: ['dark', 'royal', 'attitude'],
    playstyles: ['leader', 'tactical'],
    lengthProfile: 'medium',
    wordCount: 2,
    tags: ['sith', 'boss', 'ruler', 'evil', 'crown', 'shadow'],
    featured: false,
    addedAt: '2026-02-06'
  },
  {
    id: 'ghostrider',
    baseName: 'Ghost Rider',
    categories: ['dark', 'attitude', 'stylish'],
    playstyles: ['rusher', 'casual'],
    lengthProfile: 'medium',
    wordCount: 2,
    tags: ['flame', 'motorcycle', 'skull', 'chain', 'hell'],
    featured: false,
    addedAt: '2026-02-07'
  },
  {
    id: 'shadowking',
    baseName: 'Shadow King',
    categories: ['dark', 'royal', 'popular'],
    playstyles: ['leader', 'tactical'],
    lengthProfile: 'medium',
    wordCount: 2,
    tags: ['crown', 'shadow', 'night', 'boss', 'monarch'],
    featured: true,
    addedAt: '2026-02-08'
  },
  {
    id: 'toxicboy',
    baseName: 'Toxic Boy',
    categories: ['attitude', 'popular'],
    playstyles: ['rusher', 'casual'],
    lengthProfile: 'medium',
    wordCount: 2,
    tags: ['gamer', 'rebel', 'aggressive', 'teen', 'bold'],
    featured: false,
    addedAt: '2026-02-09'
  },
  {
    id: 'silentkiller',
    baseName: 'Silent Killer',
    categories: ['stealth', 'pro', 'dark'],
    playstyles: ['stealth', 'sniper'],
    lengthProfile: 'medium',
    wordCount: 2,
    tags: ['assassin', 'ninja', 'unseen', 'headshot', 'covert'],
    featured: true,
    addedAt: '2026-02-10'
  }
];

/**
 * Presentation Styles Rules Engine
 * Separates Base Name from Styled Versions
 */
const STYLE_RULES = {
  clean: (name) => name,
  pro: (name) => `亗 ${name} 亗`,
  extreme: (name) => `꧁༒${name}༒꧂`,
  royal: (name) => `♛ ${name} ♛`,
  cross: (name) => `乂${name}乂`,
  star: (name) => `★ ${name} ★`,
  bracket: (name) => `『${name}』`,
  slash: (name) => `〆 ${name} 〆`,
  wing: (name) => `彡${name}彡`,
  samurai: (name) => `⚔ ${name} ⚔`
};

/**
 * Popular symbols for the mini-picker
 */
const POPULAR_SYMBOLS = [
  '亗', '乂', '★', '♛', '⚡', '☠', '〆', '彡', '꧁', '꧂', '☬', '༒', '『', '』', '⚔', '†', '🎯', '☣', '✦', '✧', '❖', '◈'
];

/**
 * Frame presets for the customizer
 */
const FRAME_PRESETS = [
  { id: 'none', label: 'None', format: (n) => n },
  { id: 'pro_crown', label: '亗 Name 亗', format: (n) => `亗 ${n} 亗` },
  { id: 'cross', label: '乂 Name 乂', format: (n) => `乂${n}乂` },
  { id: 'star', label: '★ Name ★', format: (n) => `★ ${n} ★` },
  { id: 'royal', label: '♛ Name ♛', format: (n) => `♛ ${n} ♛` },
  { id: 'brackets', label: '『 Name 』', format: (n) => `『${n}』` },
  { id: 'flourish', label: '꧁ Name ꧂', format: (n) => `꧁${n}꧂` },
  { id: 'slash', label: '〆 Name 〆', format: (n) => `〆 ${n} 〆` },
  { id: 'wings', label: '彡 Name 彡', format: (n) => `彡${n}彡` }
];

/**
 * Smart remix generator for a base nickname
 * e.g. Shadow -> ShadowX, ShadowAce, ShadowKing, ShadowOP
 */
function generateRemixes(baseName) {
  const clean = baseName.trim().replace(/\s+/g, '');
  return [
    `${clean}X`,
    `${clean}Ace`,
    `${clean}King`,
    `${clean}Nova`,
    `${clean}Rex`,
    `${clean}OP`,
    `${clean}Pro`,
    `${clean}07`
  ];
}
