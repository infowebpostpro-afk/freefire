/**
 * Attitude Free Fire Nicknames — Discovery & Recommendation Engine
 * Handles multi-persona filtering, semantic search, fuzzy typo matching,
 * relational "More Like This", similar vs opposite vibe, and style stepping.
 */

const AttitudeEngine = {
  levenshtein(a, b) {
    const matrix = [];
    const aLen = a.length;
    const bLen = b.length;

    for (let i = 0; i <= bLen; i++) matrix[i] = [i];
    for (let j = 0; j <= aLen; j++) matrix[0][j] = j;

    for (let i = 1; i <= bLen; i++) {
      for (let j = 1; j <= aLen; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    return matrix[bLen][aLen];
  },

  matchesFuzzy(query, target) {
    const q = query.toLowerCase().trim();
    const t = target.toLowerCase().trim();

    if (t.includes(q) || q.includes(t)) return true;
    if (Math.abs(q.length - t.length) > 2) return false;

    const maxDist = q.length > 5 ? 2 : 1;
    return this.levenshtein(q, t) <= maxDist;
  },

  getPersonaById(id) {
    return ATTITUDE_PERSONAS.find(p => p.id === id) || ATTITUDE_PERSONAS[0];
  },

  getNameItem(idOrName) {
    if (!idOrName) return ATTITUDE_DATABASE[0];
    const target = idOrName.toLowerCase().trim();
    return ATTITUDE_DATABASE.find(item => item.id === target || item.baseName.toLowerCase() === target) || ATTITUDE_DATABASE[0];
  },

  calculateStats(rendered, baseName) {
    const base = baseName || "";
    const str = rendered || "";
    const renderedChars = Array.from(str);
    const baseChars = Array.from(base);

    return {
      baseLength: baseChars.length,
      renderedLength: renderedChars.length,
      hasSpecialUnicode: /[^\u0000-\u007F]/.test(str)
    };
  },

  applyStyle(baseName, styleKey = 'clean') {
    const raw = baseName || "Rogue";
    switch (styleKey) {
      case 'pro':
        return `亗 ${raw.toUpperCase()} 亗`;
      case 'extreme':
        return `꧁亗${raw.toUpperCase()}亗꧂`;
      case 'royal':
        return `♛ ${raw.toUpperCase()} ♛`;
      case 'dark':
        return `☠ ${raw.toUpperCase()} ☠`;
      case 'frame':
        return `『 ${raw} 』`;
      case 'clean':
      default:
        return raw;
    }
  },

  filterNames(options = {}) {
    const {
      personas = [], // array of up to 2 persona IDs
      lockedPersona = null,
      query = '',
      length = 'all', // 'all' | 'short' | 'medium' | 'long'
      wordCount = 'all', // 'all' | 1 | 2
      appearance = 'all' // 'all' | 'clean' | 'pro' | 'extreme'
    } = options;

    const cleanQuery = query.trim().toLowerCase();

    // Expand semantic query with synonym dictionary
    let synonymTargetIds = [];
    if (cleanQuery) {
      for (const [key, ids] of Object.entries(CONCEPT_SYNONYMS)) {
        if (cleanQuery.includes(key) || this.matchesFuzzy(cleanQuery, key)) {
          synonymTargetIds = [...synonymTargetIds, ...ids];
        }
      }
    }

    const effectivePersonas = lockedPersona ? [lockedPersona] : personas;

    const results = ATTITUDE_DATABASE.filter(item => {
      // 1. Persona Filter
      if (effectivePersonas.length > 0) {
        const matchesAny = effectivePersonas.some(p => item.personas.includes(p));
        if (!matchesAny) return false;
      }

      // 2. Length Filter
      if (length !== 'all' && item.lengthProfile !== length) {
        return false;
      }

      // 3. Word Count
      if (wordCount !== 'all' && item.wordCount !== parseInt(wordCount, 10)) {
        return false;
      }

      // 4. Search Query (Literal + Semantic + Fuzzy)
      if (cleanQuery) {
        const matchesName = this.matchesFuzzy(cleanQuery, item.baseName);
        const matchesPersona = item.personas.some(p => p.includes(cleanQuery) || this.matchesFuzzy(cleanQuery, p));
        const matchesConcept = item.concepts.some(c => c.includes(cleanQuery) || this.matchesFuzzy(cleanQuery, c));
        const matchesTone = item.tone.some(t => t.includes(cleanQuery));
        const matchesSynonym = synonymTargetIds.includes(item.id);

        if (!matchesName && !matchesPersona && !matchesConcept && !matchesTone && !matchesSynonym) {
          return false;
        }
      }

      return true;
    });

    // Sort by persona synergy if dual personas are active
    if (effectivePersonas.length === 2) {
      results.sort((a, b) => {
        const aMatchesBoth = effectivePersonas.every(p => a.personas.includes(p)) ? 1 : 0;
        const bMatchesBoth = effectivePersonas.every(p => b.personas.includes(p)) ? 1 : 0;
        return bMatchesBoth - aMatchesBoth;
      });
    }

    // Map appearance
    return results.map(item => {
      let styled = item.baseName;
      if (appearance === 'pro') styled = item.proStyle;
      else if (appearance === 'extreme') styled = item.extremeStyle;

      return {
        ...item,
        rendered: styled,
        appearance: appearance === 'all' ? 'clean' : appearance,
        stats: this.calculateStats(styled, item.baseName)
      };
    });
  },

  getMoreLikeThis(idOrName) {
    const current = this.getNameItem(idOrName);
    const relatedFromIds = (current.relatedIds || [])
      .map(id => ATTITUDE_DATABASE.find(item => item.id === id))
      .filter(Boolean);

    // Complement with items sharing personas and concepts
    const conceptualSiblings = ATTITUDE_DATABASE.filter(item => {
      if (item.id === current.id) return false;
      const sharesPersona = item.personas.some(p => current.personas.includes(p));
      const sharesConcept = item.concepts.some(c => current.concepts.includes(c));
      return sharesPersona && sharesConcept;
    });

    // Deduplicate
    const combined = [...relatedFromIds, ...conceptualSiblings];
    const unique = [];
    const seen = new Set();
    for (const item of combined) {
      if (!seen.has(item.id) && item.id !== current.id) {
        seen.add(item.id);
        unique.push(item);
      }
    }

    return unique.slice(0, 8);
  },

  getSameAttitude(idOrName) {
    const current = this.getNameItem(idOrName);
    const primaryPersona = current.personas[0] || "boss";

    return ATTITUDE_DATABASE
      .filter(item => item.id !== current.id && item.personas.includes(primaryPersona))
      .slice(0, 8);
  },

  getSimilarAndOpposite(idOrName) {
    const current = this.getNameItem(idOrName);
    const primaryPersona = this.getPersonaById(current.personas[0] || "boss");

    const complementaryIds = primaryPersona.complementaryIds || [];
    const oppositeIds = primaryPersona.oppositeIds || [];

    const similarItems = ATTITUDE_DATABASE.filter(item => 
      item.id !== current.id && item.personas.some(p => complementaryIds.includes(p))
    ).slice(0, 4);

    const oppositeItems = ATTITUDE_DATABASE.filter(item => 
      item.id !== current.id && item.personas.some(p => oppositeIds.includes(p))
    ).slice(0, 4);

    return {
      current,
      primaryPersona,
      similar: similarItems,
      opposite: oppositeItems
    };
  },

  stepCleaner(currentRendered, baseName) {
    const raw = baseName || "Rogue";
    if (currentRendered.includes('꧁') || currentRendered.includes('【')) {
      return this.applyStyle(raw, 'pro');
    }
    return raw;
  },

  stepBolder(currentRendered, baseName) {
    const raw = baseName || "Rogue";
    if (currentRendered === raw) {
      return this.applyStyle(raw, 'pro');
    }
    return this.applyStyle(raw, 'extreme');
  },

  pickForMe(activePersonas = []) {
    let pool = ATTITUDE_DATABASE;
    if (activePersonas.length > 0) {
      const filtered = ATTITUDE_DATABASE.filter(item => 
        activePersonas.some(p => item.personas.includes(p))
      );
      if (filtered.length > 0) pool = filtered;
    }

    const randomIndex = Math.floor(Math.random() * pool.length);
    const item = pool[randomIndex];
    const styled = item.proStyle;

    return {
      ...item,
      rendered: styled,
      stats: this.calculateStats(styled, item.baseName)
    };
  },

  quizPick(feelAnswer, lookAnswer) {
    let targetPersonas = [];
    switch (feelAnswer) {
      case 'powerful':
        targetPersonas = ['boss', 'unstoppable', 'bold'];
        break;
      case 'mysterious':
        targetPersonas = ['mysterious', 'silent', 'cold'];
        break;
      case 'independent':
        targetPersonas = ['lone-wolf', 'rebel', 'savage'];
        break;
      case 'calm':
        targetPersonas = ['cold', 'confident', 'royal'];
        break;
      default:
        targetPersonas = ['boss', 'fearless'];
        break;
    }

    const candidates = ATTITUDE_DATABASE.filter(item => 
      item.personas.some(p => targetPersonas.includes(p))
    );

    const shuffled = [...candidates].sort(() => 0.5 - Math.random()).slice(0, 6);

    return shuffled.map(item => {
      let rendered = item.baseName;
      if (lookAnswer === 'pro') rendered = item.proStyle;
      else if (lookAnswer === 'dark') rendered = item.darkStyle;
      else if (lookAnswer === 'royal') rendered = item.royalStyle;
      else if (lookAnswer === 'extreme') rendered = item.extremeStyle;

      return {
        ...item,
        rendered,
        stats: this.calculateStats(rendered, item.baseName)
      };
    });
  }
};
