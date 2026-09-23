/**
 * Attitude Free Fire Nicknames — Recommendation & Vibe Engine
 * Handles vibe filtering, Name DNA, semantic More Like This (Remix), and multi-style finishing.
 */

const AttitudeEngine = {
  smallCapsMap: {
    'a': 'ᴀ', 'b': 'ʙ', 'c': 'ᴄ', 'd': 'ᴅ', 'e': 'ᴇ', 'f': 'ꜰ',
    'g': 'ɢ', 'h': 'ʜ', 'i': 'ɪ', 'j': 'ᴊ', 'k': 'ᴋ', 'l': 'ʟ',
    'm': 'ᴍ', 'n': 'ɴ', 'o': 'ᴏ', 'p': 'ᴘ', 'q': 'ǫ', 'r': 'ʀ',
    's': 's', 't': 'ᴛ', 'u': 'ᴜ', 'v': 'ᴠ', 'w': 'ᴡ', 'x': 'x',
    'y': 'ʏ', 'z': 'ᴢ',
    'A': 'A', 'B': 'B', 'C': 'C', 'D': 'D', 'E': 'E', 'F': 'F',
    'G': 'G', 'H': 'H', 'I': 'I', 'J': 'J', 'K': 'K', 'L': 'L',
    'M': 'M', 'N': 'N', 'O': 'O', 'P': 'P', 'Q': 'Q', 'R': 'R',
    'S': 'S', 'T': 'T', 'U': 'U', 'V': 'V', 'W': 'W', 'X': 'X',
    'Y': 'Y', 'Z': 'Z'
  },

  toSmallCaps(str) {
    if (!str) return "";
    return str.split('').map(c => {
      const lower = c.toLowerCase();
      // Keep uppercase as uppercase if original was uppercase, or convert to small cap
      if (c === c.toUpperCase() && /[A-Z]/.test(c)) {
        return c; // Capital leading letter
      }
      return this.smallCapsMap[lower] || c;
    }).join('');
  },

  // Filter by vibe and search query
  filter(vibe = 'all', query = '') {
    const q = (query || '').trim().toLowerCase();

    return ATTITUDE_DATABASE.filter(item => {
      // 1. Vibe check
      if (vibe !== 'all' && !item.vibes.includes(vibe)) {
        return false;
      }

      // 2. Query check
      if (q) {
        const matchName = item.baseName.toLowerCase().includes(q);
        const matchDna = item.dna.toLowerCase().includes(q);
        const matchMeaning = item.meaning.toLowerCase().includes(q);
        const matchPrefix = item.prefix.toLowerCase().includes(q);
        const matchSuffix = item.suffix.toLowerCase().includes(q);
        if (!matchName && !matchDna && !matchMeaning && !matchPrefix && !matchSuffix) {
          return false;
        }
      }

      return true;
    });
  },

  // Semantic Remix (More Like This)
  remix(targetItem) {
    if (!targetItem) return [];

    const prefix = targetItem.prefix.toLowerCase();
    const suffix = targetItem.suffix.toLowerCase();
    const vibes = targetItem.vibes;

    // Rank database items by semantic proximity to targetItem
    const scores = [];

    ATTITUDE_DATABASE.forEach(item => {
      if (item.id === targetItem.id) return; // skip self

      let score = 0;
      // Matching prefix is high semantic affinity (e.g. DarkViper -> DarkWolf, DarkNova)
      if (item.prefix.toLowerCase() === prefix) score += 6;
      // Matching suffix is high affinity (e.g. DarkViper -> NightViper, ColdViper)
      if (item.suffix.toLowerCase() === suffix) score += 5;
      // Overlapping vibes
      item.vibes.forEach(v => {
        if (vibes.includes(v)) score += 2;
      });

      if (score > 0) {
        scores.push({ item, score });
      }
    });

    // Sort descending by proximity score
    scores.sort((a, b) => b.score - a.score);

    // Take top 8
    const results = scores.slice(0, 8).map(s => s.item);

    // If less than 4 matches, synthesize dynamic semantic pairings
    if (results.length < 4 && targetItem.prefix && targetItem.suffix) {
      const relatedSuffixes = ['Wolf', 'Viper', 'Ace', 'Nova', 'Frost', 'Strike', 'Soul'];
      relatedSuffixes.forEach(sfx => {
        if (sfx.toLowerCase() !== suffix && results.length < 6) {
          const dynamicName = `${targetItem.prefix}${sfx}`;
          if (!results.some(r => r.baseName === dynamicName)) {
            results.push({
              id: dynamicName.toLowerCase(),
              baseName: dynamicName,
              vibes: targetItem.vibes,
              dna: `${targetItem.dna} · Remix`,
              prefix: targetItem.prefix,
              suffix: sfx,
              meaning: `Remix variation based on ${targetItem.baseName}.`
            });
          }
        }
      });
    }

    return results;
  },

  // Customization: Generate Clean, Bold/Small Caps, Framed, and Decorated versions
  customize(baseName) {
    const raw = (baseName && baseName.trim()) ? baseName.trim() : "DarkViper";
    const smallCaps = this.toSmallCaps(raw);

    return [
      {
        id: 'clean',
        label: 'Clean',
        tag: 'Clean & Pure',
        rendered: raw,
        desc: 'Plain text with zero extra symbols for instant compatibility.'
      },
      {
        id: 'bold',
        label: 'Bold / Small Caps',
        tag: 'Light Style',
        rendered: smallCaps,
        desc: 'Refined small-caps typography putting full focus on the name.'
      },
      {
        id: 'framed',
        label: 'Framed',
        tag: 'Japanese Frame',
        rendered: `『${smallCaps}』`,
        desc: 'Protective Japanese anime bracket frame.'
      },
      {
        id: 'decorated',
        label: 'Decorated',
        tag: 'Gaming Cross',
        rendered: `乂${smallCaps}乂`,
        desc: 'Crossed blades framing for aggressive presence.'
      },
      {
        id: 'crown',
        label: 'Royal',
        tag: 'Crown Guard',
        rendered: `♛${smallCaps}♛`,
        desc: 'Imperial sovereign crown badges.'
      },
      {
        id: 'wings',
        label: 'Wings',
        tag: 'Angel Wings',
        rendered: `꧁༒${smallCaps}༒꧂`,
        desc: 'Mythical Tibetan wing flourish.'
      }
    ];
  },

  // Shuffle items randomly
  shuffle(items) {
    const array = [...items];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = AttitudeEngine;
}
