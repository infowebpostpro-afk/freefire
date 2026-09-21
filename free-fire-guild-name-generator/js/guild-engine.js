/**
 * Free Fire Guild Name Studio - Generation Engine
 * Semantic word banks, multi-formula composition, smart tag extraction,
 * word locking, style intensity, and quality validation.
 */

const GUILD_VIBES = [
  { id: 'mixed', label: 'Mixed / All', icon: '🔥' },
  { id: 'aggressive', label: 'Aggressive', icon: '💥' },
  { id: 'pro', label: 'Pro / Esports', icon: '⚡' },
  { id: 'royal', label: 'Royal', icon: '👑' },
  { id: 'dark', label: 'Dark', icon: '☠' },
  { id: 'tactical', label: 'Tactical', icon: '🎯' },
  { id: 'stealth', label: 'Stealth', icon: '🥷' },
  { id: 'elite', label: 'Elite', icon: '💎' },
  { id: 'stylish', label: 'Stylish', icon: '✨' },
  { id: 'squad', label: 'Squad / Clan', icon: '🐺' },
  { id: 'cyber', label: 'Cyber', icon: '🤖' }
];

const WORD_BANKS = {
  aggressive: {
    roots: ['Blaze', 'Fury', 'Rage', 'Blood', 'Savage', 'Vicious', 'Wrath', 'Chaos', 'Havoc', 'Carnage', 'Venom', 'Storm', 'Thunder', 'Inferno', 'Rampage'],
    creatures: ['Vipers', 'Dragons', 'Beasts', 'Sharks', 'Tigers', 'Demons', 'Titans'],
    suffixes: ['Force', 'Raiders', 'Strikers', 'Killers', 'Squad', 'Legion', 'Warriors']
  },
  pro: {
    roots: ['Apex', 'Prime', 'Clutch', 'Rush', 'Vertex', 'Zenith', 'Master', 'Alpha', 'Optic', 'Hyper', 'Focus', 'Precision', 'Vector', 'Overdrive'],
    creatures: ['Hawks', 'Eagles', 'Falcons', 'Panthers', 'Wolves'],
    suffixes: ['Elite', 'Esports', 'Gaming', 'Core', 'Unit', 'Squad', 'Crew', 'Syndicate']
  },
  royal: {
    roots: ['Empire', 'Reign', 'Crown', 'Throne', 'Dynasty', 'Monarch', 'Imperial', 'Majesty', 'Sovereign', 'Kingdom', 'Regal', 'Golden', 'Tsar'],
    creatures: ['Lions', 'Dragons', 'Griffins', 'Knights', 'Lords'],
    suffixes: ['Empire', 'Reign', 'Dynasty', 'Kings', 'Order', 'Guard', 'Crown', 'Realm']
  },
  dark: {
    roots: ['Shadow', 'Void', 'Night', 'Ghost', 'Phantom', 'Eclipse', 'Abyss', 'Grim', 'Shade', 'Sinister', 'Blackout', 'Obsidian', 'Nether', 'Reaper'],
    creatures: ['Phantoms', 'Reapers', 'Ravens', 'Spectres', 'Crows', 'Ghouls'],
    suffixes: ['Legion', 'Cult', 'Order', 'Coven', 'Shadows', 'Core', 'Hollow']
  },
  tactical: {
    roots: ['Delta', 'Vanguard', 'Strike', 'Recon', 'Bravo', 'Vector', 'Echo', 'Ranger', 'Overwatch', 'Aegis', 'Trigger', 'Siege', 'Bunker', 'Arsenal'],
    creatures: ['Snipers', 'Commandos', 'Operatives', 'Hunters', 'Scouts'],
    suffixes: ['Force', 'Squad', 'Division', 'Corps', 'Unit', 'Battalion', 'TaskForce']
  },
  stealth: {
    roots: ['Silent', 'Ninja', 'Covert', 'Wraith', 'Stalker', 'Veil', 'Hollow', 'Mirage', 'Spectral', 'Whisper', 'Mist', 'Smoke', 'Zero'],
    creatures: ['Ninjas', 'Assassins', 'Spiders', 'Vipers', 'Spectres'],
    suffixes: ['Clan', 'Shadows', 'Order', 'Ghosts', 'Guild', 'Brotherhood']
  },
  elite: {
    roots: ['Prestige', 'Noble', 'Immortal', 'Exalted', 'Ascent', 'Paradox', 'Legacy', 'Pinnacle', 'Summit', 'Valiant', 'Origin', 'Valhalla'],
    creatures: ['Champions', 'Gods', 'Heroes', 'Legends', 'Titans'],
    suffixes: ['Elite', 'Alliance', 'Society', 'Order', 'Circle', 'Pact']
  },
  stylish: {
    roots: ['Nova', 'Aura', 'Celestial', 'Astral', 'Luminous', 'Valkyrie', 'Nebula', 'Cosmic', 'Solar', 'Lunar', 'Stellar', 'Radiant', 'Velvet'],
    creatures: ['Stars', 'Angels', 'Sirens', 'Sparks', 'Spirits'],
    suffixes: ['Aura', 'Collective', 'Club', 'Universe', 'Vibe', 'Kingdom']
  },
  squad: {
    roots: ['Wolfpack', 'Brotherhood', 'Syndicate', 'Allies', 'Cartel', 'Alliance', 'Brothers', 'Fellowship', 'Crew', 'Clan', 'Bandits'],
    creatures: ['Wolves', 'Lions', 'Bulls', 'Bears', 'Warriors'],
    suffixes: ['Brotherhood', 'Syndicate', 'Cartel', 'Alliance', 'Guild', 'Family', 'Brigade']
  },
  cyber: {
    roots: ['Cyber', 'Neon', 'Byte', 'Pulse', 'Glitch', 'Matrix', 'Nexus', 'Protocol', 'Synthetic', 'Digital', 'Zero', 'Quantum', 'Pixel'],
    creatures: ['Bots', 'Cyborgs', 'Droids', 'Viruses', 'Glitches'],
    suffixes: ['Core', 'Network', 'Matrix', 'Protocol', 'System', 'Labs', 'Grid']
  }
};

const COMMON_GROUPS = ['Legion', 'Squad', 'Unit', 'Force', 'Order', 'Core', 'Clan', 'Kings', 'Crew', 'Pack', 'Army', 'Guild', 'Empire', 'Division'];

class GuildNameEngine {
  constructor() {
    this.sessionGenerated = new Set();
  }

  /**
   * Generates a batch of unique, high-quality guild names
   */
  generateBatch({
    count = 10,
    keywords = [],
    vibe = 'mixed',
    length = 'any', // 'short', 'medium', 'any'
    style = 'clean' // 'clean', 'pro', 'extreme'
  }) {
    const results = [];
    let attempts = 0;
    const maxAttempts = count * 15;

    while (results.length < count && attempts < maxAttempts) {
      attempts++;
      const generated = this.generateSingle({ keywords, vibe, length, style });
      if (!generated) continue;

      const norm = generated.name.toLowerCase().trim();
      if (this.sessionGenerated.has(norm)) continue;

      this.sessionGenerated.add(norm);
      results.push(generated);
    }

    return results;
  }

  /**
   * Generates a single guild name with tags and attributes
   */
  generateSingle({ keywords = [], vibe = 'mixed', length = 'any', style = 'clean' }) {
    const resolvedVibe = vibe === 'mixed' ? this.getRandomVibe() : vibe;
    const bank = WORD_BANKS[resolvedVibe] || WORD_BANKS.pro;

    let words = [];
    const seedKeyword = (keywords.length > 0 && keywords[0].trim()) ? keywords[0].trim() : null;

    if (seedKeyword) {
      words = this.combineWithKeyword(seedKeyword, bank, length);
    } else {
      words = this.generateByFormula(bank, resolvedVibe, length);
    }

    // Quality check on words
    if (!this.validateWords(words)) return null;

    const rawName = words.join(' ');
    const tags = this.generateSmartTags(words);
    const primaryTag = tags[0] || 'FF';

    // Apply decoration style
    const decoratedName = this.applyStyle(rawName, style);

    return {
      id: 'guild_' + Math.random().toString(36).substring(2, 9),
      name: decoratedName,
      rawName: rawName,
      words: words,
      tagSuggestions: tags,
      selectedTag: primaryTag,
      vibe: resolvedVibe,
      style: style,
      lengthProfile: words.length === 1 ? 'Short' : (rawName.length <= 13 ? 'Medium' : 'Long'),
      isFavorite: false,
      isShortlisted: false
    };
  }

  getRandomVibe() {
    const vibes = ['aggressive', 'pro', 'royal', 'dark', 'tactical', 'stealth', 'elite', 'stylish', 'squad', 'cyber'];
    return vibes[Math.floor(Math.random() * vibes.length)];
  }

  combineWithKeyword(keyword, bank, length) {
    const cleanWord = keyword.charAt(0).toUpperCase() + keyword.slice(1);
    const isSingle = length === 'short' && Math.random() > 0.6;

    if (isSingle) {
      const suffix = this.getRandomItem(['Nova', 'Core', 'Fire', 'Prime', 'Apex']);
      return [`${cleanWord}${suffix}`];
    }

    const roll = Math.random();
    if (roll < 0.5) {
      // Keyword + Suffix/Group (e.g. Shadow Legion)
      const group = this.getRandomItem(bank.suffixes.concat(COMMON_GROUPS));
      return [cleanWord, group];
    } else if (roll < 0.8) {
      // Root + Keyword (e.g. Night Shadow)
      const root = this.getRandomItem(bank.roots);
      return [root, cleanWord];
    } else {
      // Keyword + Creature (e.g. Shadow Wolves)
      const creature = this.getRandomItem(bank.creatures);
      return [cleanWord, creature];
    }
  }

  generateByFormula(bank, vibe, length) {
    const isShort = length === 'short' || (length === 'any' && Math.random() > 0.8);

    if (isShort) {
      // Single compound word like DarkNova, ApexCore, Blackout
      const root = this.getRandomItem(bank.roots);
      const suffix = this.getRandomItem(['Nova', 'Core', 'Strike', 'Zone', 'Peak', 'Fire', 'Reign']);
      if (Math.random() > 0.4) {
        return [`${root}${suffix}`];
      }
      return [root];
    }

    const formulaRoll = Math.random();

    if (formulaRoll < 0.4) {
      // Formula 1: [Concept] + [Group] (e.g. Shadow Legion, Prime Squad)
      const root = this.getRandomItem(bank.roots);
      const group = this.getRandomItem(bank.suffixes.concat(COMMON_GROUPS));
      return [root, group];
    } else if (formulaRoll < 0.7) {
      // Formula 2: [Atmosphere/Power] + [Creature] (e.g. Night Wolves, Venom Dragons)
      const root = this.getRandomItem(bank.roots);
      const creature = this.getRandomItem(bank.creatures);
      return [root, creature];
    } else {
      // Formula 3: [Tactical/Power] + [Status/Concept] (e.g. Alpha Apex, Apex Reign)
      const root1 = this.getRandomItem(bank.roots);
      const root2 = this.getRandomItem(bank.suffixes);
      return [root1, root2];
    }
  }

  generateSmartTags(words) {
    const tags = [];

    if (words.length === 1) {
      const w = words[0].toUpperCase();
      // 2-4 letter tags from single word
      if (w.length >= 2) tags.push(w.substring(0, 2));
      if (w.length >= 3) tags.push(w.substring(0, 3));
      if (w.length >= 4) tags.push(w.substring(0, 4));
      // Consonants tag
      const consonants = w.replace(/[AEIOU]/g, '');
      if (consonants.length >= 2 && !tags.includes(consonants.substring(0, 3))) {
        tags.push(consonants.substring(0, 3));
      }
    } else if (words.length >= 2) {
      const w1 = words[0].toUpperCase();
      const w2 = words[1].toUpperCase();

      // Tag 1: Initials (SL)
      tags.push(w1[0] + w2[0]);

      // Tag 2: 3-letter phonetic (e.g. SHD, SLEG)
      const t3 = w1.substring(0, 2) + w2[0];
      if (!tags.includes(t3)) tags.push(t3);

      const t4 = w1[0] + w2.substring(0, 2);
      if (!tags.includes(t4)) tags.push(t4);

      // Tag 4: 4-letter tag (e.g. SLEG)
      if (w1.length >= 2 && w2.length >= 2) {
        const t22 = w1.substring(0, 2) + w2.substring(0, 2);
        if (!tags.includes(t22)) tags.push(t22);
      }
    }

    // Add decorated tag variant
    if (tags[0]) {
      tags.push(`亗${tags[0]}`);
    }

    return tags.slice(0, 5);
  }

  applyStyle(rawName, style) {
    if (style === 'pro') {
      return `亗 ${rawName} 亗`;
    } else if (style === 'extreme') {
      return `꧁亗 ${rawName} 亗꧂`;
    }
    return rawName; // Clean
  }

  simplifyStyle(decoratedName) {
    return decoratedName.replace(/[꧁꧂亗★♛乂〆彡⚡☠\[\]]/g, '').trim();
  }

  validateWords(words) {
    if (!words || words.length === 0) return false;
    // Disallow duplicates (e.g. Shadow Shadow)
    if (words.length === 2 && words[0].toLowerCase() === words[1].toLowerCase()) {
      return false;
    }
    return true;
  }

  getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /**
   * Word Lock: Replaces only the unlocked word
   */
  regenerateLocked(words, lockedIndex, vibe = 'pro') {
    const bank = WORD_BANKS[vibe] || WORD_BANKS.pro;
    const newWords = [...words];

    if (lockedIndex === 0) {
      // Word 0 is locked, regenerate word 1
      newWords[1] = this.getRandomItem(bank.suffixes.concat(bank.creatures));
    } else {
      // Word 1 is locked, regenerate word 0
      newWords[0] = this.getRandomItem(bank.roots);
    }

    const rawName = newWords.join(' ');
    const tags = this.generateSmartTags(newWords);

    return {
      name: rawName,
      rawName: rawName,
      words: newWords,
      tagSuggestions: tags,
      selectedTag: tags[0] || 'FF',
      vibe: vibe
    };
  }

  /**
   * Remixes a specific guild name into 4-6 related conceptual variants
   */
  remixGuild(nameObj) {
    const bank = WORD_BANKS[nameObj.vibe] || WORD_BANKS.pro;
    const baseWord = nameObj.words && nameObj.words.length > 0 ? nameObj.words[0] : 'Shadow';
    const variations = [];

    const candidateSuffixes = bank.suffixes.concat(bank.creatures, COMMON_GROUPS);
    for (let i = 0; i < 6; i++) {
      const suff = this.getRandomItem(candidateSuffixes);
      if (suff.toLowerCase() !== (nameObj.words[1] || '').toLowerCase()) {
        const words = [baseWord, suff];
        variations.push({
          id: 'remix_' + Math.random().toString(36).substring(2, 9),
          name: words.join(' '),
          rawName: words.join(' '),
          words: words,
          tagSuggestions: this.generateSmartTags(words),
          selectedTag: this.generateSmartTags(words)[0],
          vibe: nameObj.vibe,
          style: 'clean',
          lengthProfile: 'Medium',
          isFavorite: false,
          isShortlisted: false
        });
      }
    }

    return variations;
  }

  /**
   * Generates hybrid names by mixing two selected guild names
   */
  mixTwoNames(nameObj1, nameObj2) {
    const w1 = nameObj1.words || [nameObj1.rawName];
    const w2 = nameObj2.words || [nameObj2.rawName];

    const combos = [];
    if (w1.length >= 2 && w2.length >= 2) {
      combos.push([w1[0], w2[1]]);
      combos.push([w2[0], w1[1]]);
      combos.push([w1[0], w2[0]]);
    } else {
      combos.push([w1[0], w2[0]]);
    }

    return combos.map(pair => {
      const raw = pair.join(' ');
      const tags = this.generateSmartTags(pair);
      return {
        id: 'mix_' + Math.random().toString(36).substring(2, 9),
        name: raw,
        rawName: raw,
        words: pair,
        tagSuggestions: tags,
        selectedTag: tags[0],
        vibe: nameObj1.vibe || 'pro',
        style: 'clean',
        lengthProfile: 'Medium',
        isFavorite: false,
        isShortlisted: false
      };
    });
  }
}

// Global instance
window.GuildEngine = new GuildNameEngine();
