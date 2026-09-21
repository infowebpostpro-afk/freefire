/**
 * Free Fire Guild Name Studio - Semantic Generation Engine
 * Generates complete guild identities:
 * Guild Name + Matching Tag + Styled Variation + Member Preview + Plain Fallback
 * 
 * Team Types: Competitive, Friends, Esports, Creator
 * Styles: Tactical, Aggressive, Elite, Minimal, Aesthetic, Funny
 * Decoration Levels: Plain, Light, Styled
 */

const GUILD_TYPES = [
  { id: 'competitive', label: 'Competitive', icon: '⚔️', desc: 'Ranked & high-stakes squads' },
  { id: 'friends', label: 'Friends', icon: '🐺', desc: 'Casual brotherhood & crew' },
  { id: 'esports', label: 'Esports', icon: '⚡', desc: 'Tournament-ready roster' },
  { id: 'creator', label: 'Creator', icon: '🎬', desc: 'Streaming & community clan' }
];

const GUILD_STYLES = [
  { id: 'tactical', label: 'Tactical', icon: '🎯' },
  { id: 'aggressive', label: 'Aggressive', icon: '💥' },
  { id: 'elite', label: 'Elite', icon: '👑' },
  { id: 'minimal', label: 'Minimal', icon: '⚡' },
  { id: 'aesthetic', label: 'Aesthetic', icon: '✨' },
  { id: 'funny', label: 'Funny', icon: '🎭' }
];

const GUILD_DECORATIONS = [
  { id: 'plain', label: 'Plain', desc: 'Clean raw text' },
  { id: 'light', label: 'Light', desc: 'Subtle brackets & tags' },
  { id: 'styled', label: 'Styled', desc: 'Gaming symbols & glyphs' }
];

const STYLE_WORD_BANKS = {
  tactical: {
    roots: ['Delta', 'Vanguard', 'Recon', 'Sector', 'Vector', 'Echo', 'Ranger', 'Overwatch', 'Aegis', 'Bunker', 'Arsenal', 'Apex', 'Phantom', 'Night', 'Zero', 'Alpha', 'Bravo', 'Trigger', 'Siege', 'Blackout'],
    units: ['Unit', 'Force', 'Ops', 'Division', 'Corps', 'Squad', 'Battalion', 'TaskForce', 'Protocol', 'Regiment', 'Network'],
    creatures: ['Snipers', 'Ravens', 'Commandos', 'Operatives', 'Hunters', 'Scouts', 'Falcons', 'Spiders']
  },
  aggressive: {
    roots: ['Blaze', 'Fury', 'Rage', 'Blood', 'Savage', 'Vicious', 'Wrath', 'Chaos', 'Havoc', 'Carnage', 'Venom', 'Storm', 'Thunder', 'Inferno', 'Rampage', 'Toxic', 'Lethal', 'Brutal', 'Pyro', 'Vortex'],
    units: ['Raiders', 'Strikers', 'Killers', 'Squad', 'Legion', 'Warriors', 'Force', 'Assassins', 'Executioners', 'Mob'],
    creatures: ['Vipers', 'Dragons', 'Beasts', 'Sharks', 'Tigers', 'Demons', 'Titans', 'Wolves', 'Gryphons', 'Hydras']
  },
  elite: {
    roots: ['Monarch', 'Crown', 'Throne', 'Imperial', 'Prestige', 'Noble', 'Immortal', 'Exalted', 'Ascent', 'Prime', 'Supreme', 'Valiant', 'Origin', 'Valhalla', 'Sovereign', 'Dynasty', 'Kingdom', 'Apex', 'Empire', 'Majesty'],
    units: ['Order', 'Empire', 'Reign', 'Kings', 'Dynasty', 'Elite', 'Alliance', 'Society', 'Syndicate', 'Dominion', 'Circle'],
    creatures: ['Lions', 'Dragons', 'Griffins', 'Knights', 'Champions', 'Titans', 'Gods', 'Lords', 'Eagles']
  },
  minimal: {
    roots: ['Apex', 'Nova', 'Echo', 'Void', 'Flux', 'Aura', 'Zero', 'Onyx', 'Vex', 'Pulse', 'Zenith', 'Core', 'Rush', 'Axis', 'Nexus', 'Shift', 'Volt', 'Byte', 'Clutch', 'Sync'],
    units: ['Unit', 'Crew', 'Clan', 'Team', 'Corp', 'Hub', 'Line', 'Base', 'Set', 'Grid', 'Link'],
    creatures: ['Fox', 'Hawk', 'Wolf', 'Crow', 'Bat', 'Lynx', 'Bear', 'Ape']
  },
  aesthetic: {
    roots: ['Celestial', 'Astral', 'Luminous', 'Valkyrie', 'Nebula', 'Cosmic', 'Solar', 'Lunar', 'Stellar', 'Radiant', 'Velvet', 'Aurora', 'Mirage', 'Spectral', 'Whisper', 'Serene', 'Ethereal', 'Zephyr', 'Aura', 'Solstice'],
    units: ['Collective', 'Club', 'Universe', 'Vibe', 'Kingdom', 'Society', 'Coven', 'Harmonics', 'Garden', 'Sanctuary'],
    creatures: ['Sirens', 'Angels', 'Spirits', 'Butterflies', 'Doves', 'Stars', 'Sparks', 'Nymphs']
  },
  funny: {
    roots: ['Potato', 'Noob', 'Bot', 'Clutch', 'Lag', 'Ping', 'Panic', 'TapOut', 'Camping', 'Salty', 'Loot', 'Respawn', 'Headshot', 'Banana', 'Choco', 'Boba', 'Couch', 'Sneaky', 'Lazy', 'Wasted'],
    units: ['Army', 'Brigade', 'Gang', 'Mafia', 'Crew', 'Squad', 'Federation', 'Tribe', 'Party', 'Platoon', 'Cartel'],
    creatures: ['Potatoes', 'Chickens', 'Ducks', 'Sloths', 'Pandas', 'Pigs', 'Monkeys', 'Koalas', 'Pigeons']
  }
};

const TEAM_TYPE_MODIFIERS = {
  competitive: {
    suffixes: ['Division', 'Unit', 'Ops', 'Force', 'Sector', 'Squad'],
    tagStyle: 'phonetic'
  },
  friends: {
    suffixes: ['Crew', 'Brotherhood', 'Clan', 'Family', 'Pact', 'Allies'],
    tagStyle: 'initials'
  },
  esports: {
    suffixes: ['Esports', 'Gaming', 'GG', 'Prime', 'Core', 'Vanguard'],
    tagStyle: 'acronym'
  },
  creator: {
    suffixes: ['Hub', 'Studio', 'Network', 'Collective', 'Nation', 'Vibe'],
    tagStyle: 'initials'
  }
};

class GuildNameEngine {
  constructor() {
    this.sessionGenerated = new Set();
  }

  /**
   * Generates a batch of unique guild identities
   */
  generateBatch({
    count = 10,
    themeWord = '',
    teamType = 'competitive',
    style = 'tactical',
    decoration = 'plain',
    sampleMember = 'Ghost'
  }) {
    const results = [];
    let attempts = 0;
    const maxAttempts = count * 20;

    while (results.length < count && attempts < maxAttempts) {
      attempts++;
      const item = this.generateSingle({ themeWord, teamType, style, decoration, sampleMember });
      if (!item) continue;

      const norm = item.rawName.toLowerCase().trim();
      if (this.sessionGenerated.has(norm)) continue;

      this.sessionGenerated.add(norm);
      results.push(item);
    }

    return results;
  }

  /**
   * Generates a single complete Guild Identity
   */
  generateSingle({
    themeWord = '',
    teamType = 'competitive',
    style = 'tactical',
    decoration = 'plain',
    sampleMember = 'Ghost'
  }) {
    const bank = STYLE_WORD_BANKS[style] || STYLE_WORD_BANKS.tactical;
    const teamMod = TEAM_TYPE_MODIFIERS[teamType] || TEAM_TYPE_MODIFIERS.competitive;

    let words = [];
    let derivationDetails = {};

    const cleanTheme = themeWord ? themeWord.trim() : '';

    if (cleanTheme) {
      // User provided a seed theme/word
      const capitalized = cleanTheme.charAt(0).toUpperCase() + cleanTheme.slice(1);
      const roll = Math.random();

      if (roll < 0.45) {
        // Theme + Unit/Suffix (e.g. Shadow Unit, Shadow Ops)
        const unit = this.getRandomItem(teamMod.suffixes.concat(bank.units));
        words = [capitalized, unit];
        derivationDetails = {
          theme: style,
          core: capitalized,
          teamWord: unit
        };
      } else if (roll < 0.75) {
        // Root + Theme (e.g. Night Shadow, Alpha Shadow)
        const root = this.getRandomItem(bank.roots);
        words = [root, capitalized];
        derivationDetails = {
          theme: style,
          core: root,
          teamWord: capitalized
        };
      } else {
        // Theme + Creature (e.g. Shadow Ravens, Shadow Vipers)
        const creature = this.getRandomItem(bank.creatures);
        words = [capitalized, creature];
        derivationDetails = {
          theme: style,
          core: capitalized,
          teamWord: creature
        };
      }
    } else {
      // Procedural generation from style & team type
      const formulaRoll = Math.random();

      if (style === 'minimal' && formulaRoll > 0.6) {
        // Single punchy word for minimal
        const root = this.getRandomItem(bank.roots);
        words = [root];
        derivationDetails = {
          theme: style,
          core: root,
          teamWord: ''
        };
      } else if (formulaRoll < 0.45) {
        // Root + Unit (e.g. Night Ravens, Nova Unit, Delta Sector)
        const root = this.getRandomItem(bank.roots);
        const unit = this.getRandomItem(bank.units.concat(teamMod.suffixes));
        words = [root, unit];
        derivationDetails = {
          theme: style,
          core: root,
          teamWord: unit
        };
      } else if (formulaRoll < 0.75) {
        // Root + Creature (e.g. Night Ravens, Venom Vipers, Storm Hawks)
        const root = this.getRandomItem(bank.roots);
        const creature = this.getRandomItem(bank.creatures);
        words = [root, creature];
        derivationDetails = {
          theme: style,
          core: root,
          teamWord: creature
        };
      } else {
        // Two atmospheric roots or Root + Team Suffix
        const root = this.getRandomItem(bank.roots);
        const suffix = this.getRandomItem(teamMod.suffixes);
        words = [root, suffix];
        derivationDetails = {
          theme: style,
          core: root,
          teamWord: suffix
        };
      }
    }

    if (!this.validateWords(words)) return null;

    const rawName = words.join(' ');
    const tags = this.generateSmartTags(words);
    const primaryTag = tags[0] || 'FF';
    derivationDetails.tag = primaryTag;

    // Generate styled variations based on decoration level
    const styledName = this.applyDecoration(rawName, primaryTag, decoration);
    const lightOption = this.applyDecoration(rawName, primaryTag, 'light');
    const styledOption = this.applyDecoration(rawName, primaryTag, 'styled');
    const plainFallback = rawName.toUpperCase();

    // Member preview
    const memberName = sampleMember.trim() || 'Ghost';
    const memberPreview = `[${primaryTag}] ${memberName}`;

    const charCount = Array.from(rawName).length;
    const styledCharCount = Array.from(styledOption).length;

    return {
      id: 'g_' + Math.random().toString(36).substring(2, 9),
      name: rawName,
      rawName: rawName,
      words: words,
      tag: primaryTag,
      tagSuggestions: tags,
      styledName: styledName,
      lightOption: lightOption,
      styledOption: styledOption,
      plainFallback: plainFallback,
      memberPreview: memberPreview,
      derivation: derivationDetails,
      teamType: teamType,
      style: style,
      decoration: decoration,
      charCount: charCount,
      styledCharCount: styledCharCount,
      isPlain: decoration === 'plain',
      isShortlisted: false,
      isCompared: false
    };
  }

  /**
   * Derives short 2-4 letter tags directly linked to the guild name
   * Example: Night Ravens -> NRV, Nova Unit -> NVU, Shadow Crew -> SHD
   */
  generateSmartTags(words) {
    const tags = [];

    if (words.length === 1) {
      const w = words[0].toUpperCase().replace(/[^A-Z]/g, '');
      if (w.length >= 2) tags.push(w.substring(0, 2));
      if (w.length >= 3) tags.push(w.substring(0, 3));
      if (w.length >= 4) tags.push(w.substring(0, 4));

      // Consonant extraction
      const consonants = w.replace(/[AEIOU]/g, '');
      if (consonants.length >= 3 && !tags.includes(consonants.substring(0, 3))) {
        tags.push(consonants.substring(0, 3));
      }
    } else if (words.length >= 2) {
      const w1 = words[0].toUpperCase().replace(/[^A-Z]/g, '');
      const w2 = words[1].toUpperCase().replace(/[^A-Z]/g, '');

      // Formula A: 3-letter Phonetic (e.g. Night Ravens -> NRV)
      // First letter of w1 + first letter of w2 + last/second consonant of w2
      if (w1.length >= 1 && w2.length >= 2) {
        // If w1 = NIGHT, w2 = RAVENS -> N + R + V (consonant from raVens)
        const w2Consonants = w2.replace(/[AEIOU]/g, '');
        if (w2Consonants.length >= 2) {
          const tNrv = w1[0] + w2[0] + w2Consonants[1];
          if (!tags.includes(tNrv)) tags.push(tNrv);
        }

        // Formula B: Initials + next char (e.g. Nova Unit -> NVU)
        const tNvu = w1.substring(0, 2) + w2[0];
        if (!tags.includes(tNvu)) tags.push(tNvu);

        // Formula C: 2-letter Initials (e.g. NR)
        const tInit = w1[0] + w2[0];
        if (!tags.includes(tInit)) tags.push(tInit);

        // Formula D: 1st letter of w1 + first 2 of w2 (e.g. N + RA -> NRA)
        const t3 = w1[0] + w2.substring(0, 2);
        if (!tags.includes(t3)) tags.push(t3);

        // Formula E: 4-letter tag (e.g. N + RAV or NO + UN -> NOUN / NVUN)
        if (w1.length >= 2 && w2.length >= 2) {
          const t4 = w1.substring(0, 2) + w2.substring(0, 2);
          if (!tags.includes(t4)) tags.push(t4);
        }
      }
    }

    // Default fallbacks
    if (tags.length === 0) tags.push('FF');
    return tags.slice(0, 5);
  }

  /**
   * Applies plain, light, or styled decoration
   */
  applyDecoration(rawName, tag, level = 'plain') {
    const caps = rawName.toUpperCase();
    const titleCase = this.toTitleCase(rawName);

    if (level === 'plain') {
      return caps;
    }

    if (level === 'light') {
      // Light: clean brackets or minimal accents
      const lightPresets = [
        `『${tag}』${titleCase}`,
        `[${tag}] ${titleCase}`,
        `★${tag}★ ${titleCase}`,
        `‹${tag}› ${titleCase}`
      ];
      return lightPresets[0];
    }

    if (level === 'styled') {
      // Styled: gaming glyphs & ornaments
      const styledPresets = [
        `『${tag}』${titleCase}`,
        `꧁★${tag}★ ${caps}★꧂`,
        `亗 ${tag} • ${caps} 亗`,
        `⚔️ ${tag} | ${caps} ⚔️`,
        `メ ${tag} ٭ ${caps} メ`
      ];
      return styledPresets[1] || styledPresets[0];
    }

    return caps;
  }

  toTitleCase(str) {
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  }

  validateWords(words) {
    if (!words || words.length === 0) return false;
    if (words.length === 2 && words[0].toLowerCase() === words[1].toLowerCase()) {
      return false;
    }
    return true;
  }

  getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /**
   * Word Lock Studio: Regerates only the unlocked word
   */
  regenerateLocked(words, lockedIndex = 0, style = 'tactical', teamType = 'competitive') {
    const bank = STYLE_WORD_BANKS[style] || STYLE_WORD_BANKS.tactical;
    const teamMod = TEAM_TYPE_MODIFIERS[teamType] || TEAM_TYPE_MODIFIERS.competitive;
    const newWords = [...words];

    if (lockedIndex === 0) {
      // Word 0 locked: regenerate Word 1
      const pool = bank.units.concat(bank.creatures, teamMod.suffixes);
      newWords[1] = this.getRandomItem(pool);
    } else {
      // Word 1 locked: regenerate Word 0
      newWords[0] = this.getRandomItem(bank.roots);
    }

    const rawName = newWords.join(' ');
    const tags = this.generateSmartTags(newWords);
    const primaryTag = tags[0] || 'FF';

    return {
      rawName: rawName,
      name: rawName,
      words: newWords,
      tag: primaryTag,
      tagSuggestions: tags
    };
  }
}

// Global export
window.GuildEngine = new GuildNameEngine();
