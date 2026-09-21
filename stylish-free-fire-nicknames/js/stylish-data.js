/**
 * Free Fire Nickname Style Gallery — Data Source
 * Contains:
 * 1. BASE_NAMES: 100+ curated gamer identities
 * 2. STYLE_TEMPLATES: 60+ verified human-curated visual style templates
 * 3. STYLE_CATEGORIES: Metadata and display specs for style families
 * 4. FEATURED_COLLECTIONS: Curated style packages
 * 5. MINI_SYMBOLS & FRAMES: Interactive builder assets
 */

const STYLISH_CATEGORIES = [
  {
    id: "pro",
    name: "Pro",
    icon: "⚡",
    badge: "Competitive",
    subtitle: "Tournament & clan symbols",
    accentColor: "#ff5722",
    sampleTemplates: ["pro-01", "pro-02", "pro-04"],
    description: "Restrained, aggressive competitive designs with tridents, slashes, and clan marks."
  },
  {
    id: "symbol",
    name: "Symbol",
    icon: "亗",
    badge: "Signature",
    subtitle: "High-impact gaming glyphs",
    accentColor: "#ff9100",
    sampleTemplates: ["sym-01", "sym-02", "sym-05"],
    description: "Signature tridents, crossblades, and sacred gaming emblems."
  },
  {
    id: "royal",
    name: "Royal",
    icon: "👑",
    badge: "Elite",
    subtitle: "Crown & monarch designs",
    accentColor: "#ffaa00",
    sampleTemplates: ["royal-01", "royal-02", "royal-03"],
    description: "Noble crown emblems, king/queen insignia, and prestige golden treatments."
  },
  {
    id: "aesthetic",
    name: "Aesthetic",
    icon: "✨",
    badge: "Refined",
    subtitle: "Elegant star & heart accents",
    accentColor: "#b388ff",
    sampleTemplates: ["aes-01", "aes-02", "aes-05"],
    description: "Balanced, ethereal accents with sparkles, hearts, and delicate flourishes."
  },
  {
    id: "dark",
    name: "Dark",
    icon: "☠",
    badge: "Edgy",
    subtitle: "Skulls & shadow sigils",
    accentColor: "#ff3366",
    sampleTemplates: ["dark-01", "dark-02", "dark-04"],
    description: "Menacing skull, biohazard, dagger, and occult symbol treatments."
  },
  {
    id: "framed",
    name: "Framed",
    icon: "『 』",
    badge: "Bordered",
    subtitle: "Japanese brackets & shields",
    accentColor: "#00e5ff",
    sampleTemplates: ["frame-01", "frame-02", "frame-04"],
    description: "Clean boundary brackets, square frames, and protective borders."
  },
  {
    id: "fire",
    name: "Fire",
    icon: "🔥",
    badge: "Aggressive",
    subtitle: "Flames & storm surges",
    accentColor: "#ff4500",
    sampleTemplates: ["fire-01", "fire-02", "fire-03"],
    description: "Energetic flame surges, thunderbolts, and tactical assault markings."
  },
  {
    id: "cyber",
    name: "Cyber",
    icon: "🤖",
    badge: "Digital",
    subtitle: "Tech brackets & code marks",
    accentColor: "#00ffcc",
    sampleTemplates: ["cyber-01", "cyber-02", "cyber-03"],
    description: "Geometric slashes, futuristic system brackets, and neon vector aesthetics."
  },
  {
    id: "star",
    name: "Star",
    icon: "★",
    badge: "Stellar",
    subtitle: "Five-star rank decorations",
    accentColor: "#ffd700",
    sampleTemplates: ["star-01", "star-02", "star-03"],
    description: "Bold solid stars, hollow rank marks, and celestial badges."
  },
  {
    id: "wings",
    name: "Wings",
    icon: "🪽",
    badge: "Legendary",
    subtitle: "Mythic wings & scrolls",
    accentColor: "#d8b4fe",
    sampleTemplates: ["wing-01", "wing-02", "wing-04"],
    description: "Flourished wing scrolls, Tibetan crests, and mythical angel/demon spans."
  },
  {
    id: "clean",
    name: "Clean",
    icon: "🧊",
    badge: "Minimalist",
    subtitle: "Pure letters & tiny dots",
    accentColor: "#a2abbd",
    sampleTemplates: ["clean-01", "clean-02", "clean-04"],
    description: "Zero or micro decoration. Highly readable, sleek, and timeless."
  },
  {
    id: "premium",
    name: "Premium",
    icon: "💎",
    badge: "Spaced Out",
    subtitle: "Wide full-width typography",
    accentColor: "#80d8ff",
    sampleTemplates: ["prem-01", "prem-02", "prem-03"],
    description: "Sophisticated full-width spacing paired with balanced border accents."
  }
];

const BASE_NAMES = [
  { id: "shadow", baseName: "Shadow", concepts: ["dark", "stealth", "pro"], lengthProfile: "short" },
  { id: "vortex", baseName: "Vortex", concepts: ["energy", "pro", "cyber"], lengthProfile: "short" },
  { id: "nova", baseName: "Nova", concepts: ["cosmic", "clean", "aesthetic"], lengthProfile: "short" },
  { id: "phantom", baseName: "Phantom", concepts: ["dark", "stealth", "ghost"], lengthProfile: "medium" },
  { id: "blaze", baseName: "Blaze", concepts: ["fire", "aggressive", "pro"], lengthProfile: "short" },
  { id: "titan", baseName: "Titan", concepts: ["royal", "strong", "pro"], lengthProfile: "short" },
  { id: "ghost", baseName: "Ghost", concepts: ["stealth", "clean", "dark"], lengthProfile: "short" },
  { id: "apex", baseName: "Apex", concepts: ["pro", "royal", "competitive"], lengthProfile: "short" },
  { id: "venom", baseName: "Venom", concepts: ["toxic", "dark", "aggressive"], lengthProfile: "short" },
  { id: "viper", baseName: "Viper", concepts: ["stealth", "fast", "toxic"], lengthProfile: "short" },
  { id: "reaper", baseName: "Reaper", concepts: ["dark", "death", "skull"], lengthProfile: "short" },
  { id: "kaiser", baseName: "Kaiser", concepts: ["royal", "ruler", "pro"], lengthProfile: "short" },
  { id: "storm", baseName: "Storm", concepts: ["thunder", "energy", "clean"], lengthProfile: "short" },
  { id: "zenith", baseName: "Zenith", concepts: ["apex", "cosmic", "pro"], lengthProfile: "short" },
  { id: "frost", baseName: "Frost", concepts: ["cold", "clean", "stealth"], lengthProfile: "short" },
  { id: "specter", baseName: "Specter", concepts: ["stealth", "ghost", "dark"], lengthProfile: "medium" },
  { id: "matrix", baseName: "Matrix", concepts: ["cyber", "tech", "pro"], lengthProfile: "short" },
  { id: "havoc", baseName: "Havoc", concepts: ["chaos", "aggressive", "pro"], lengthProfile: "short" },
  { id: "chaos", baseName: "Chaos", concepts: ["chaos", "aggressive", "dark"], lengthProfile: "short" },
  { id: "raptor", baseName: "Raptor", concepts: ["predator", "fast", "pro"], lengthProfile: "short" },
  { id: "pulse", baseName: "Pulse", concepts: ["energy", "clean", "cyber"], lengthProfile: "short" },
  { id: "onyx", baseName: "Onyx", concepts: ["dark", "gem", "clean"], lengthProfile: "short" },
  { id: "striker", baseName: "Striker", concepts: ["combat", "pro", "competitive"], lengthProfile: "medium" },
  { id: "draco", baseName: "Draco", concepts: ["dragon", "fire", "mythic"], lengthProfile: "short" },
  { id: "hydra", baseName: "Hydra", concepts: ["mythic", "beast", "pro"], lengthProfile: "short" },
  { id: "inferno", baseName: "Inferno", concepts: ["fire", "aggressive", "hell"], lengthProfile: "medium" },
  { id: "ronin", baseName: "Ronin", concepts: ["samurai", "sword", "pro"], lengthProfile: "short" },
  { id: "blade", baseName: "Blade", concepts: ["sword", "sharp", "clean"], lengthProfile: "short" },
  { id: "valkyrie", baseName: "Valkyrie", concepts: ["mythic", "wings", "royal"], lengthProfile: "medium" },
  { id: "nemesis", baseName: "Nemesis", concepts: ["dark", "rival", "pro"], lengthProfile: "medium" },
  { id: "hunter", baseName: "Hunter", concepts: ["predator", "combat", "pro"], lengthProfile: "short" },
  { id: "wolf", baseName: "Wolf", concepts: ["beast", "predator", "clean"], lengthProfile: "short" },
  { id: "hawk", baseName: "Hawk", concepts: ["wings", "predator", "clean"], lengthProfile: "short" },
  { id: "falcon", baseName: "Falcon", concepts: ["wings", "speed", "pro"], lengthProfile: "short" },
  { id: "savage", baseName: "Savage", concepts: ["wild", "aggressive", "pro"], lengthProfile: "short" },
  { id: "fury", baseName: "Fury", concepts: ["rage", "fire", "clean"], lengthProfile: "short" },
  { id: "bullet", baseName: "Bullet", concepts: ["speed", "sniper", "pro"], lengthProfile: "short" },
  { id: "ace", baseName: "Ace", concepts: ["card", "winner", "clean"], lengthProfile: "short" },
  { id: "echo", baseName: "Echo", concepts: ["sound", "clean", "stealth"], lengthProfile: "short" },
  { id: "cipher", baseName: "Cipher", concepts: ["cyber", "code", "stealth"], lengthProfile: "short" },
  { id: "toxic", baseName: "Toxic", concepts: ["biohazard", "dark", "pro"], lengthProfile: "short" },
  { id: "rogue", baseName: "Rogue", concepts: ["stealth", "rebel", "pro"], lengthProfile: "short" },
  { id: "sniper", baseName: "Sniper", concepts: ["marksman", "aim", "pro"], lengthProfile: "short" },
  { id: "zero", baseName: "Zero", concepts: ["cyber", "clean", "stealth"], lengthProfile: "short" },
  { id: "karma", baseName: "Karma", concepts: ["fate", "mystic", "clean"], lengthProfile: "short" },
  { id: "demon", baseName: "Demon", concepts: ["dark", "hell", "aggressive"], lengthProfile: "short" },
  { id: "beast", baseName: "Beast", concepts: ["wild", "strong", "pro"], lengthProfile: "short" },
  { id: "knight", baseName: "Knight", concepts: ["sword", "royal", "honor"], lengthProfile: "short" },
  { id: "king", baseName: "King", concepts: ["royal", "monarch", "clean"], lengthProfile: "short" },
  { id: "myth", baseName: "Myth", concepts: ["legend", "clean", "mystic"], lengthProfile: "short" },
  { id: "legend", baseName: "Legend", concepts: ["fame", "royal", "pro"], lengthProfile: "short" },
  { id: "psycho", baseName: "Psycho", concepts: ["insane", "dark", "aggressive"], lengthProfile: "short" },
  { id: "immortal", baseName: "Immortal", concepts: ["god", "mythic", "wings"], lengthProfile: "medium" },
  { id: "valor", baseName: "Valor", concepts: ["honor", "brave", "pro"], lengthProfile: "short" },
  { id: "cobra", baseName: "Cobra", concepts: ["snake", "toxic", "pro"], lengthProfile: "short" },
  { id: "raven", baseName: "Raven", concepts: ["dark", "wings", "stealth"], lengthProfile: "short" },
  { id: "titanium", baseName: "Titanium", concepts: ["steel", "strong", "cyber"], lengthProfile: "medium" },
  { id: "neon", baseName: "Neon", concepts: ["cyber", "glow", "clean"], lengthProfile: "short" },
  { id: "enigma", baseName: "Enigma", concepts: ["mystery", "stealth", "cyber"], lengthProfile: "short" },
  { id: "slayer", baseName: "Slayer", concepts: ["combat", "aggressive", "pro"], lengthProfile: "short" },
  { id: "ares", baseName: "Ares", concepts: ["war", "god", "pro"], lengthProfile: "short" },
  { id: "omega", baseName: "Omega", concepts: ["end", "greek", "pro"], lengthProfile: "short" },
  { id: "eclipse", baseName: "Eclipse", concepts: ["dark", "cosmic", "stealth"], lengthProfile: "medium" },
  { id: "vandal", baseName: "Vandal", concepts: ["rebel", "aggressive", "pro"], lengthProfile: "short" },
  { id: "overkill", baseName: "Overkill", concepts: ["heavy", "combat", "aggressive"], lengthProfile: "medium" },
  { id: "glitch", baseName: "Glitch", concepts: ["cyber", "code", "clean"], lengthProfile: "short" },
  { id: "surge", baseName: "Surge", concepts: ["energy", "electric", "clean"], lengthProfile: "short" },
  { id: "abyss", baseName: "Abyss", concepts: ["dark", "deep", "void"], lengthProfile: "short" },
  { id: "vector", baseName: "Vector", concepts: ["cyber", "math", "clean"], lengthProfile: "short" },
  { id: "bane", baseName: "Bane", concepts: ["curse", "dark", "clean"], lengthProfile: "short" },
  { id: "rebel", baseName: "Rebel", concepts: ["anarchy", "pro", "combat"], lengthProfile: "short" },
  { id: "dusk", baseName: "Dusk", concepts: ["dark", "twilight", "clean"], lengthProfile: "short" },
  { id: "dawn", baseName: "Dawn", concepts: ["light", "clean", "aesthetic"], lengthProfile: "short" },
  { id: "zen", baseName: "Zen", concepts: ["calm", "clean", "samurai"], lengthProfile: "short" },
  { id: "clutch", baseName: "Clutch", concepts: ["esports", "pro", "speed"], lengthProfile: "short" },
  { id: "hazard", baseName: "Hazard", concepts: ["danger", "toxic", "pro"], lengthProfile: "short" },
  { id: "volt", baseName: "Volt", concepts: ["electric", "fast", "clean"], lengthProfile: "short" },
  { id: "reign", baseName: "Reign", concepts: ["royal", "ruler", "clean"], lengthProfile: "short" },
  { id: "void", baseName: "Void", concepts: ["dark", "empty", "clean"], lengthProfile: "short" },
  { id: "hydrix", baseName: "Hydrix", concepts: ["cyber", "beast", "pro"], lengthProfile: "short" },
  { id: "krypton", baseName: "Krypton", concepts: ["cyber", "cosmic", "pro"], lengthProfile: "medium" },
  { id: "lunar", baseName: "Lunar", concepts: ["moon", "aesthetic", "clean"], lengthProfile: "short" },
  { id: "solar", baseName: "Solar", concepts: ["sun", "fire", "clean"], lengthProfile: "short" },
  { id: "blitz", baseName: "Blitz", concepts: ["speed", "electric", "pro"], lengthProfile: "short" },
  { id: "phantomx", baseName: "PhantomX", concepts: ["cyber", "stealth", "pro"], lengthProfile: "medium" },
  { id: "specter99", baseName: "Specter99", concepts: ["pro", "ghost", "clan"], lengthProfile: "medium" },
  { id: "azazel", baseName: "Azazel", concepts: ["demon", "dark", "mythic"], lengthProfile: "short" },
  { id: "lucifer", baseName: "Lucifer", concepts: ["dark", "fallen", "royal"], lengthProfile: "medium" },
  { id: "zeus", baseName: "Zeus", concepts: ["god", "thunder", "royal"], lengthProfile: "short" },
  { id: "odin", baseName: "Odin", concepts: ["god", "norse", "royal"], lengthProfile: "short" },
  { id: "thor", baseName: "Thor", concepts: ["god", "thunder", "clean"], lengthProfile: "short" },
  { id: "fenrir", baseName: "Fenrir", concepts: ["beast", "wolf", "mythic"], lengthProfile: "short" },
  { id: "anubis", baseName: "Anubis", concepts: ["egyptian", "death", "royal"], lengthProfile: "short" },
  { id: "seraph", baseName: "Seraph", concepts: ["angel", "wings", "aesthetic"], lengthProfile: "short" },
  { id: "chariot", baseName: "Chariot", concepts: ["royal", "war", "pro"], lengthProfile: "medium" },
  { id: "warlord", baseName: "Warlord", concepts: ["combat", "royal", "strong"], lengthProfile: "medium" },
  { id: "bulletproof", baseName: "Bulletproof", concepts: ["armor", "tank", "combat"], lengthProfile: "long" },
  { id: "unstoppable", baseName: "Unstoppable", concepts: ["beast", "tank", "pro"], lengthProfile: "long" }
];

const STYLE_TEMPLATES = [
  /* ===================================================================
     1. PRO CATEGORY (Competitive & Restrained)
     =================================================================== */
  {
    id: "pro-01",
    name: "Pro Dual Trident",
    category: "pro",
    prefix: "亗",
    suffix: "亗",
    decorationLevel: "medium",
    structure: "both",
    transform: "uppercase",
    intensity: 3,
    tags: ["competitive", "trident", "balanced", "symbol"],
    relatedStyleIds: ["pro-02", "pro-03", "sym-01", "dark-01"]
  },
  {
    id: "pro-02",
    name: "Crossblade Clan",
    category: "pro",
    prefix: "乂",
    suffix: "乂",
    decorationLevel: "medium",
    structure: "both",
    transform: "uppercase",
    intensity: 3,
    tags: ["cross", "clan", "competitive", "esports"],
    relatedStyleIds: ["pro-01", "pro-04", "pro-05", "sym-02"]
  },
  {
    id: "pro-03",
    name: "Leader Trident",
    category: "pro",
    prefix: "亗",
    suffix: "",
    decorationLevel: "low",
    structure: "prefix",
    transform: "none",
    intensity: 2,
    tags: ["single", "clean", "leader", "trident"],
    relatedStyleIds: ["pro-01", "pro-06", "clean-02"]
  },
  {
    id: "pro-04",
    name: "Pro Slasher",
    category: "pro",
    prefix: "〆",
    suffix: "",
    decorationLevel: "low",
    structure: "prefix",
    transform: "none",
    intensity: 2,
    tags: ["japanese", "clean", "slash", "esports"],
    relatedStyleIds: ["pro-05", "pro-03", "clean-03"]
  },
  {
    id: "pro-05",
    name: "Dual Slasher",
    category: "pro",
    prefix: "〆",
    suffix: "〆",
    decorationLevel: "medium",
    structure: "both",
    transform: "uppercase",
    intensity: 3,
    tags: ["slash", "symmetrical", "clan"],
    relatedStyleIds: ["pro-04", "pro-02", "sym-03"]
  },
  {
    id: "pro-06",
    name: "Clan Suffix Trident",
    category: "pro",
    prefix: "",
    suffix: "亗",
    decorationLevel: "low",
    structure: "suffix",
    transform: "uppercase",
    intensity: 2,
    tags: ["suffix", "clean", "trident"],
    relatedStyleIds: ["pro-03", "pro-01", "clean-01"]
  },
  {
    id: "pro-07",
    name: "Pro Triple Slash",
    category: "pro",
    prefix: "彡",
    suffix: "彡",
    decorationLevel: "medium",
    structure: "both",
    transform: "uppercase",
    intensity: 3,
    tags: ["slash", "speed", "wind", "clan"],
    relatedStyleIds: ["pro-02", "fire-03", "sym-04"]
  },
  {
    id: "pro-08",
    name: "Clan Repeat Mark",
    category: "pro",
    prefix: "々",
    suffix: "々",
    decorationLevel: "medium",
    structure: "both",
    transform: "none",
    intensity: 3,
    tags: ["kanji", "clean", "competitive"],
    relatedStyleIds: ["pro-05", "frame-01", "clean-03"]
  },

  /* ===================================================================
     2. ROYAL CATEGORY (Crown & Prestige)
     =================================================================== */
  {
    id: "royal-01",
    name: "Monarch Crown",
    category: "royal",
    prefix: "♛",
    suffix: "♛",
    decorationLevel: "medium",
    structure: "both",
    transform: "uppercase",
    intensity: 3,
    tags: ["crown", "queen", "king", "gold"],
    relatedStyleIds: ["royal-02", "royal-04", "star-01", "prem-01"]
  },
  {
    id: "royal-02",
    name: "Emperor King",
    category: "royal",
    prefix: "♚",
    suffix: "♚",
    decorationLevel: "medium",
    structure: "both",
    transform: "uppercase",
    intensity: 3,
    tags: ["king", "chess", "sovereign"],
    relatedStyleIds: ["royal-01", "royal-03", "sym-01"]
  },
  {
    id: "royal-03",
    name: "White Crown Crest",
    category: "royal",
    prefix: "♔",
    suffix: "♔",
    decorationLevel: "medium",
    structure: "both",
    transform: "none",
    intensity: 3,
    tags: ["hollow", "crown", "elegant"],
    relatedStyleIds: ["royal-01", "royal-02", "aes-01"]
  },
  {
    id: "royal-04",
    name: "Crown Sovereign Prefix",
    category: "royal",
    prefix: "♛",
    suffix: "",
    decorationLevel: "low",
    structure: "prefix",
    transform: "none",
    intensity: 2,
    tags: ["single", "crown", "minimal"],
    relatedStyleIds: ["royal-01", "pro-03"]
  },
  {
    id: "royal-05",
    name: "Heavy Crown Guard",
    category: "royal",
    prefix: "『♛",
    suffix: "♛』",
    decorationLevel: "high",
    structure: "framed",
    transform: "uppercase",
    intensity: 4,
    tags: ["framed", "crown", "shield"],
    relatedStyleIds: ["royal-01", "frame-01", "wing-04"]
  },
  {
    id: "royal-06",
    name: "Royal Spaced King",
    category: "royal",
    prefix: "♛ ",
    suffix: " ♛",
    decorationLevel: "medium",
    structure: "both",
    transform: "spaced",
    intensity: 3,
    tags: ["spaced", "wide", "crown"],
    relatedStyleIds: ["royal-01", "prem-01"]
  },

  /* ===================================================================
     3. SYMBOL CATEGORY (Signature Gaming Glyphs)
     =================================================================== */
  {
    id: "sym-01",
    name: "Trident Classic",
    category: "symbol",
    prefix: "亗",
    suffix: "亗",
    decorationLevel: "medium",
    structure: "both",
    transform: "none",
    intensity: 3,
    tags: ["trident", "classic", "gaming"],
    relatedStyleIds: ["pro-01", "sym-02", "sym-05"]
  },
  {
    id: "sym-02",
    name: "Khanda Sacred",
    category: "symbol",
    prefix: "☬",
    suffix: "☬",
    decorationLevel: "medium",
    structure: "both",
    transform: "uppercase",
    intensity: 3,
    tags: ["khanda", "swords", "warrior"],
    relatedStyleIds: ["sym-01", "sym-03", "royal-02"]
  },
  {
    id: "sym-03",
    name: "Dual Crossed Swords",
    category: "symbol",
    prefix: "⚔",
    suffix: "⚔",
    decorationLevel: "medium",
    structure: "both",
    transform: "uppercase",
    intensity: 3,
    tags: ["swords", "combat", "melee"],
    relatedStyleIds: ["sym-02", "pro-02", "dark-01"]
  },
  {
    id: "sym-04",
    name: "Yin Yang Balance",
    category: "symbol",
    prefix: "☯",
    suffix: "☯",
    decorationLevel: "medium",
    structure: "both",
    transform: "none",
    intensity: 3,
    tags: ["yinyang", "balance", "calm"],
    relatedStyleIds: ["sym-01", "aes-02", "clean-04"]
  },
  {
    id: "sym-05",
    name: "Spade Ace",
    category: "symbol",
    prefix: "♠",
    suffix: "♠",
    decorationLevel: "medium",
    structure: "both",
    transform: "uppercase",
    intensity: 3,
    tags: ["spade", "card", "casino"],
    relatedStyleIds: ["sym-01", "star-01", "dark-01"]
  },
  {
    id: "sym-06",
    name: "Trident Blade Combo",
    category: "symbol",
    prefix: "亗",
    suffix: "乂",
    decorationLevel: "medium",
    structure: "both",
    transform: "uppercase",
    intensity: 3,
    tags: ["hybrid", "asymmetrical", "trident"],
    relatedStyleIds: ["pro-01", "pro-02"]
  },

  /* ===================================================================
     4. AESTHETIC CATEGORY (Ethereal & Luminous)
     =================================================================== */
  {
    id: "aes-01",
    name: "Sparkle Starlight",
    category: "aesthetic",
    prefix: "✧",
    suffix: "✧",
    decorationLevel: "medium",
    structure: "both",
    transform: "none",
    intensity: 2,
    tags: ["sparkle", "star", "gentle"],
    relatedStyleIds: ["aes-02", "aes-03", "star-03"]
  },
  {
    id: "aes-02",
    name: "Sweet Heart",
    category: "aesthetic",
    prefix: "♡",
    suffix: "♡",
    decorationLevel: "medium",
    structure: "both",
    transform: "none",
    intensity: 2,
    tags: ["heart", "cute", "soft"],
    relatedStyleIds: ["aes-01", "aes-04", "aes-05"]
  },
  {
    id: "aes-03",
    name: "Four Point Diamond",
    category: "aesthetic",
    prefix: "✦",
    suffix: "✦",
    decorationLevel: "medium",
    structure: "both",
    transform: "uppercase",
    intensity: 3,
    tags: ["diamond", "glow", "stellar"],
    relatedStyleIds: ["aes-01", "star-01", "prem-02"]
  },
  {
    id: "aes-04",
    name: "Crescent Moon",
    category: "aesthetic",
    prefix: "☾",
    suffix: "☽",
    decorationLevel: "medium",
    structure: "both",
    transform: "none",
    intensity: 3,
    tags: ["moon", "lunar", "night"],
    relatedStyleIds: ["aes-01", "aes-03", "dark-04"]
  },
  {
    id: "aes-05",
    name: "Sakura Blossom",
    category: "aesthetic",
    prefix: "✿",
    suffix: "✿",
    decorationLevel: "medium",
    structure: "both",
    transform: "none",
    intensity: 2,
    tags: ["flower", "japanese", "blossom"],
    relatedStyleIds: ["aes-02", "clean-04"]
  },
  {
    id: "aes-06",
    name: "Angel Sprout Wings",
    category: "aesthetic",
    prefix: "˚ʚ",
    suffix: "ɞ˚",
    decorationLevel: "high",
    structure: "framed",
    transform: "none",
    intensity: 4,
    tags: ["wings", "soft", "angelic"],
    relatedStyleIds: ["wing-01", "aes-01", "aes-02"]
  },

  /* ===================================================================
     5. DARK CATEGORY (Edgy & Menacing)
     =================================================================== */
  {
    id: "dark-01",
    name: "Skull Crossbones",
    category: "dark",
    prefix: "☠",
    suffix: "☠",
    decorationLevel: "medium",
    structure: "both",
    transform: "uppercase",
    intensity: 3,
    tags: ["skull", "pirate", "death", "reaper"],
    relatedStyleIds: ["dark-02", "dark-03", "pro-01"]
  },
  {
    id: "dark-02",
    name: "Biohazard Warning",
    category: "dark",
    prefix: "☣",
    suffix: "☣",
    decorationLevel: "medium",
    structure: "both",
    transform: "uppercase",
    intensity: 3,
    tags: ["toxic", "hazard", "radiation"],
    relatedStyleIds: ["dark-01", "cyber-02", "pro-02"]
  },
  {
    id: "dark-03",
    name: "Occult Dagger Cross",
    category: "dark",
    prefix: "†",
    suffix: "†",
    decorationLevel: "low",
    structure: "both",
    transform: "uppercase",
    intensity: 2,
    tags: ["cross", "dagger", "goth"],
    relatedStyleIds: ["dark-01", "dark-04", "clean-02"]
  },
  {
    id: "dark-04",
    name: "Dark Void Frame",
    category: "dark",
    prefix: "•|",
    suffix: "|•",
    decorationLevel: "medium",
    structure: "both",
    transform: "uppercase",
    intensity: 3,
    tags: ["bars", "bullet", "void"],
    relatedStyleIds: ["frame-03", "clean-04", "dark-03"]
  },
  {
    id: "dark-05",
    name: "Grim Trident Skull",
    category: "dark",
    prefix: "☠亗",
    suffix: "亗☠",
    decorationLevel: "high",
    structure: "both",
    transform: "uppercase",
    intensity: 5,
    tags: ["heavy", "skull", "trident", "extreme"],
    relatedStyleIds: ["dark-01", "pro-01", "wing-04"]
  },
  {
    id: "dark-06",
    name: "Dark Cross Slash",
    category: "dark",
    prefix: "♰",
    suffix: "♰",
    decorationLevel: "medium",
    structure: "both",
    transform: "none",
    intensity: 3,
    tags: ["cross", "shadow", "occult"],
    relatedStyleIds: ["dark-03", "dark-01"]
  },

  /* ===================================================================
     6. FRAMED CATEGORY (Bordered & Shielded)
     =================================================================== */
  {
    id: "frame-01",
    name: "Japanese Brackets",
    category: "framed",
    prefix: "『",
    suffix: "』",
    decorationLevel: "medium",
    structure: "framed",
    transform: "uppercase",
    intensity: 3,
    tags: ["brackets", "japanese", "clean", "shield"],
    relatedStyleIds: ["frame-02", "frame-03", "pro-01"]
  },
  {
    id: "frame-02",
    name: "Bold Black Brackets",
    category: "framed",
    prefix: "【",
    suffix: "】",
    decorationLevel: "medium",
    structure: "framed",
    transform: "uppercase",
    intensity: 3,
    tags: ["brackets", "bold", "heavy"],
    relatedStyleIds: ["frame-01", "frame-04", "pro-02"]
  },
  {
    id: "frame-03",
    name: "White Corner Brackets",
    category: "framed",
    prefix: "〘",
    suffix: "〙",
    decorationLevel: "medium",
    structure: "framed",
    transform: "none",
    intensity: 3,
    tags: ["white", "brackets", "geometric"],
    relatedStyleIds: ["frame-01", "cyber-01"]
  },
  {
    id: "frame-04",
    name: "Double Angle Brackets",
    category: "framed",
    prefix: "《",
    suffix: "》",
    decorationLevel: "low",
    structure: "framed",
    transform: "uppercase",
    intensity: 2,
    tags: ["arrows", "clean", "minimal"],
    relatedStyleIds: ["frame-01", "clean-01", "cyber-01"]
  },
  {
    id: "frame-05",
    name: "Shielded Trident Frame",
    category: "framed",
    prefix: "『亗",
    suffix: "亗』",
    decorationLevel: "high",
    structure: "framed",
    transform: "uppercase",
    intensity: 4,
    tags: ["trident", "shield", "clan"],
    relatedStyleIds: ["frame-01", "pro-01", "wing-04"]
  },
  {
    id: "frame-06",
    name: "Tortoise Shell Brackets",
    category: "framed",
    prefix: "〔",
    suffix: "〕",
    decorationLevel: "low",
    structure: "framed",
    transform: "none",
    intensity: 2,
    tags: ["brackets", "curved", "clean"],
    relatedStyleIds: ["frame-01", "frame-03"]
  },

  /* ===================================================================
     7. FIRE CATEGORY (Dynamic & Warm)
     =================================================================== */
  {
    id: "fire-01",
    name: "Flame Dual Ember",
    category: "fire",
    prefix: "🔥",
    suffix: "🔥",
    decorationLevel: "medium",
    structure: "both",
    transform: "uppercase",
    intensity: 3,
    tags: ["flame", "hot", "fire", "ember"],
    relatedStyleIds: ["fire-02", "fire-03", "pro-01"]
  },
  {
    id: "fire-02",
    name: "Thunder Volt",
    category: "fire",
    prefix: "⚡",
    suffix: "⚡",
    decorationLevel: "medium",
    structure: "both",
    transform: "uppercase",
    intensity: 3,
    tags: ["lightning", "electric", "speed"],
    relatedStyleIds: ["fire-01", "pro-07", "cyber-02"]
  },
  {
    id: "fire-03",
    name: "Flame Wind Slash",
    category: "fire",
    prefix: "彡🔥",
    suffix: "🔥彡",
    decorationLevel: "high",
    structure: "both",
    transform: "uppercase",
    intensity: 4,
    tags: ["slash", "fire", "wind", "fast"],
    relatedStyleIds: ["fire-01", "pro-07", "wing-02"]
  },
  {
    id: "fire-04",
    name: "Lightning Leader Prefix",
    category: "fire",
    prefix: "⚡",
    suffix: "",
    decorationLevel: "low",
    structure: "prefix",
    transform: "none",
    intensity: 2,
    tags: ["single", "speed", "fast"],
    relatedStyleIds: ["fire-02", "pro-03"]
  },

  /* ===================================================================
     8. CYBER CATEGORY (Digital & Futuristic)
     =================================================================== */
  {
    id: "cyber-01",
    name: "Double Angle Vector",
    category: "cyber",
    prefix: "⟨",
    suffix: "⟩",
    decorationLevel: "low",
    structure: "framed",
    transform: "uppercase",
    intensity: 2,
    tags: ["vector", "math", "clean", "terminal"],
    relatedStyleIds: ["cyber-02", "frame-04", "clean-01"]
  },
  {
    id: "cyber-02",
    name: "Double Slash Matrix",
    category: "cyber",
    prefix: "//",
    suffix: "//",
    decorationLevel: "low",
    structure: "both",
    transform: "uppercase",
    intensity: 2,
    tags: ["code", "tech", "slash"],
    relatedStyleIds: ["cyber-01", "pro-04", "clean-02"]
  },
  {
    id: "cyber-03",
    name: "Square Mathematical Brackets",
    category: "cyber",
    prefix: "⟦",
    suffix: "⟧",
    decorationLevel: "medium",
    structure: "framed",
    transform: "uppercase",
    intensity: 3,
    tags: ["matrix", "bracket", "cyber"],
    relatedStyleIds: ["cyber-01", "frame-03"]
  },
  {
    id: "cyber-04",
    name: "System Tag Suffix",
    category: "cyber",
    prefix: "00·",
    suffix: "·00",
    decorationLevel: "medium",
    structure: "both",
    transform: "uppercase",
    intensity: 3,
    tags: ["numbers", "binary", "system"],
    relatedStyleIds: ["cyber-02", "clean-04"]
  },

  /* ===================================================================
     9. STAR CATEGORY (Rank & Stellar)
     =================================================================== */
  {
    id: "star-01",
    name: "Solid Black Star",
    category: "star",
    prefix: "★",
    suffix: "★",
    decorationLevel: "medium",
    structure: "both",
    transform: "uppercase",
    intensity: 3,
    tags: ["star", "rank", "general", "heroic"],
    relatedStyleIds: ["star-02", "star-03", "pro-01"]
  },
  {
    id: "star-02",
    name: "Circled Star Badge",
    category: "star",
    prefix: "✪",
    suffix: "✪",
    decorationLevel: "medium",
    structure: "both",
    transform: "uppercase",
    intensity: 3,
    tags: ["badge", "captain", "military"],
    relatedStyleIds: ["star-01", "sym-01", "royal-01"]
  },
  {
    id: "star-03",
    name: "Pinwheel Star",
    category: "star",
    prefix: "✯",
    suffix: "✯",
    decorationLevel: "medium",
    structure: "both",
    transform: "none",
    intensity: 3,
    tags: ["spark", "celestial", "officer"],
    relatedStyleIds: ["star-01", "aes-03"]
  },
  {
    id: "star-04",
    name: "White Star Rank",
    category: "star",
    prefix: "✰",
    suffix: "✰",
    decorationLevel: "low",
    structure: "both",
    transform: "none",
    intensity: 2,
    tags: ["hollow", "clean", "rank"],
    relatedStyleIds: ["star-01", "clean-02"]
  },

  /* ===================================================================
     10. WINGS CATEGORY (Mythic Scrolls & Wings)
     =================================================================== */
  {
    id: "wing-01",
    name: "Tibetan Wing Scroll",
    category: "wings",
    prefix: "꧁",
    suffix: "꧂",
    decorationLevel: "high",
    structure: "framed",
    transform: "uppercase",
    intensity: 4,
    tags: ["wings", "scroll", "ornate", "legend"],
    relatedStyleIds: ["wing-02", "wing-03", "wing-04"]
  },
  {
    id: "wing-02",
    name: "Mythic Royal Wings",
    category: "wings",
    prefix: "༺",
    suffix: "༻",
    decorationLevel: "medium",
    structure: "framed",
    transform: "uppercase",
    intensity: 3,
    tags: ["scroll", "royal", "wings", "clean"],
    relatedStyleIds: ["wing-01", "frame-01", "royal-01"]
  },
  {
    id: "wing-03",
    name: "Vajra Crest Wings",
    category: "wings",
    prefix: "༒",
    suffix: "༒",
    decorationLevel: "high",
    structure: "both",
    transform: "uppercase",
    intensity: 4,
    tags: ["crest", "sacred", "mythic"],
    relatedStyleIds: ["wing-01", "sym-01", "dark-01"]
  },
  {
    id: "wing-04",
    name: "Grand Imperial Wings",
    category: "wings",
    prefix: "꧁亗",
    suffix: "亗꧂",
    decorationLevel: "high",
    structure: "framed",
    transform: "uppercase",
    intensity: 5,
    tags: ["heavy", "wings", "trident", "extreme", "grand"],
    relatedStyleIds: ["wing-01", "pro-01", "wing-05"]
  },
  {
    id: "wing-05",
    name: "Vajra Wing Masterpiece",
    category: "wings",
    prefix: "꧁༒",
    suffix: "༒꧂",
    decorationLevel: "high",
    structure: "framed",
    transform: "uppercase",
    intensity: 5,
    tags: ["heavy", "legendary", "ornate"],
    relatedStyleIds: ["wing-04", "wing-01", "wing-03"]
  },

  /* ===================================================================
     11. CLEAN CATEGORY (Minimalist & Pure)
     =================================================================== */
  {
    id: "clean-01",
    name: "Pure Clean",
    category: "clean",
    prefix: "",
    suffix: "",
    decorationLevel: "low",
    structure: "both",
    transform: "none",
    intensity: 1,
    tags: ["pure", "minimal", "clean", "simple"],
    relatedStyleIds: ["clean-02", "clean-03", "clean-04"]
  },
  {
    id: "clean-02",
    name: "Clean All Caps",
    category: "clean",
    prefix: "",
    suffix: "",
    decorationLevel: "low",
    structure: "both",
    transform: "uppercase",
    intensity: 1,
    tags: ["caps", "bold", "clean", "simple"],
    relatedStyleIds: ["clean-01", "clean-03", "pro-03"]
  },
  {
    id: "clean-03",
    name: "Single Suffix X",
    category: "clean",
    prefix: "",
    suffix: "X",
    decorationLevel: "low",
    structure: "suffix",
    transform: "none",
    intensity: 1,
    tags: ["suffix", "clean", "modern"],
    relatedStyleIds: ["clean-01", "clean-02", "pro-04"]
  },
  {
    id: "clean-04",
    name: "Center Dot Minimal",
    category: "clean",
    prefix: "•",
    suffix: "•",
    decorationLevel: "low",
    structure: "both",
    transform: "none",
    intensity: 1,
    tags: ["bullet", "dot", "minimal"],
    relatedStyleIds: ["clean-01", "dark-04", "prem-01"]
  },
  {
    id: "clean-05",
    name: "Clean Pipeline",
    category: "clean",
    prefix: "|",
    suffix: "|",
    decorationLevel: "low",
    structure: "both",
    transform: "uppercase",
    intensity: 2,
    tags: ["bar", "pipe", "clean"],
    relatedStyleIds: ["clean-04", "cyber-02"]
  },

  /* ===================================================================
     12. PREMIUM CATEGORY (Spaced & Refined)
     =================================================================== */
  {
    id: "prem-01",
    name: "Fullwidth Spaced Trident",
    category: "premium",
    prefix: "亗 ",
    suffix: " 亗",
    decorationLevel: "medium",
    structure: "both",
    transform: "spaced",
    intensity: 3,
    tags: ["spaced", "wide", "trident", "luxurious"],
    relatedStyleIds: ["pro-01", "prem-02", "royal-06"]
  },
  {
    id: "prem-02",
    name: "Fullwidth Spaced Crown",
    category: "premium",
    prefix: "♛ ",
    suffix: " ♛",
    decorationLevel: "medium",
    structure: "both",
    transform: "spaced",
    intensity: 3,
    tags: ["spaced", "crown", "monarch"],
    relatedStyleIds: ["royal-01", "royal-06", "prem-01"]
  },
  {
    id: "prem-03",
    name: "Fullwidth Spaced Star",
    category: "premium",
    prefix: "★ ",
    suffix: " ★",
    decorationLevel: "medium",
    structure: "both",
    transform: "spaced",
    intensity: 3,
    tags: ["spaced", "star", "wide"],
    relatedStyleIds: ["star-01", "prem-01"]
  },
  {
    id: "prem-04",
    name: "Pure Spaced Typography",
    category: "premium",
    prefix: "",
    suffix: "",
    decorationLevel: "low",
    structure: "both",
    transform: "spaced",
    intensity: 2,
    tags: ["spaced", "typography", "clean", "wide"],
    relatedStyleIds: ["clean-02", "prem-01"]
  }
];

const MINI_SYMBOLS = [
  "亗", "乂", "★", "♛", "♚", "☠", "⚡", "〆", "彡", "『", "』",
  "【", "】", "꧁", "꧂", "༒", "༺", "༻", "✦", "✧", "♡", "☬", "⚔", "☯", "•"
];

const CURATED_FRAMES = [
  { id: "f-japanese", label: "『 』 Japanese Brackets", left: "『", right: "』" },
  { id: "f-bold", label: "【 】 Bold Brackets", left: "【", right: "】" },
  { id: "f-corner", label: "〘 〙 Corner Brackets", left: "〘", right: "〙" },
  { id: "f-wings", label: "꧁ ꧂ Wing Scrolls", left: "꧁", right: "꧂" },
  { id: "f-royal-wings", label: "༺ ༻ Royal Wings", left: "༺", right: "༻" },
  { id: "f-angles", label: "《 》 Double Angles", left: "《", right: "》" },
  { id: "f-vector", label: "⟨ ⟩ Vector Brackets", left: "⟨", right: "⟩" },
  { id: "f-stars", label: "★ ★ Star Shield", left: "★", right: "★" },
  { id: "f-crowns", label: "♛ ♛ Crown Guard", left: "♛", right: "♛" },
  { id: "f-tridents", label: "亗 亗 Trident Guard", left: "亗", right: "亗" }
];

const FEATURED_COLLECTIONS = [
  {
    id: "col-pro",
    title: "Pro & Clean",
    subtitle: "Restrained competitive emblems used by esports players",
    icon: "⚡",
    templates: ["pro-01", "pro-02", "pro-04"],
    sampleName: "Vortex"
  },
  {
    id: "col-royal",
    title: "Royal Monarch",
    subtitle: "Crown & king insignia with high visual prestige",
    icon: "👑",
    templates: ["royal-01", "royal-02", "royal-06"],
    sampleName: "Titan"
  },
  {
    id: "col-dark",
    title: "Dark Syndicate",
    subtitle: "Skulls, biohazards, and stealth void markers",
    icon: "☠",
    templates: ["dark-01", "dark-02", "dark-04"],
    sampleName: "Phantom"
  },
  {
    id: "col-minimal",
    title: "Minimalist Stealth",
    subtitle: "Uncluttered names with micro dots and clean slashes",
    icon: "🧊",
    templates: ["clean-01", "clean-04", "pro-03"],
    sampleName: "Nova"
  },
  {
    id: "col-framed",
    title: "Framed & Shielded",
    subtitle: "Bordered brackets for balanced name silhouettes",
    icon: "『 』",
    templates: ["frame-01", "frame-02", "frame-05"],
    sampleName: "Shadow"
  },
  {
    id: "col-wings",
    title: "Winged Immortals",
    subtitle: "Legendary Tibetan scrolls and mythical crests",
    icon: "🪽",
    templates: ["wing-01", "wing-02", "wing-04"],
    sampleName: "Blaze"
  }
];
