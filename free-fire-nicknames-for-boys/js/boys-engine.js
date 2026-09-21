/**
 * Free Fire Boys Nickname Browser - Engine
 * Handles typo-tolerant fuzzy search, multi-criteria filtering,
 * semantic "More Like This" cluster engine, "Pick For Me",
 * shuffle, and deterministic Name of the Day.
 */

const BoysEngine = {
  /**
   * Lightweight Levenshtein distance for typo tolerance
   */
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
            matrix[i - 1][j - 1] + 1, // substitution
            matrix[i][j - 1] + 1,     // insertion
            matrix[i - 1][j] + 1      // deletion
          );
        }
      }
    }
    return matrix[bLen][aLen];
  },

  /**
   * Fuzzy check if query matches target word with typo allowance
   */
  matchesFuzzy(query, target) {
    const q = query.toLowerCase().trim();
    const t = target.toLowerCase().trim();

    // Direct substring or exact
    if (t.includes(q) || q.includes(t)) return true;

    // Length difference too large
    if (Math.abs(q.length - t.length) > 2) return false;

    // Typo tolerance: max 1-2 distance depending on length
    const maxDist = q.length > 5 ? 2 : 1;
    return this.levenshtein(q, t) <= maxDist;
  },

  /**
   * Filter and search the database
   */
  filterNames(options = {}) {
    const {
      query = '',
      category = 'all',
      vibe = 'all',
      playstyle = 'all',
      length = 'any',
      wordCount = 'any',
      sort = 'recommended'
    } = options;

    const cleanQuery = query.trim().toLowerCase();

    let results = BOYS_DATABASE.filter(item => {
      // 1. Search Query
      if (cleanQuery) {
        const nameMatches = this.matchesFuzzy(cleanQuery, item.baseName);
        const tagMatches = item.tags.some(tag => this.matchesFuzzy(cleanQuery, tag));
        const categoryMatches = item.categories.some(cat => cat.toLowerCase().includes(cleanQuery));
        const playstyleMatches = item.playstyles.some(ps => ps.toLowerCase().includes(cleanQuery));

        if (!nameMatches && !tagMatches && !categoryMatches && !playstyleMatches) {
          return false;
        }
      }

      // 2. Category Filter
      if (category && category !== 'all') {
        if (!item.categories.includes(category)) {
          return false;
        }
      }

      // 3. Vibe Filter
      if (vibe && vibe !== 'all') {
        if (vibe === 'aggressive' && !item.categories.includes('attitude') && !item.tags.includes('aggressive')) return false;
        if (vibe === 'dark' && !item.categories.includes('dark')) return false;
        if (vibe === 'royal' && !item.categories.includes('royal')) return false;
        if (vibe === 'sniper' && !item.categories.includes('sniper')) return false;
        if (vibe === 'pro' && !item.categories.includes('pro')) return false;
        if (vibe === 'minimal' && item.lengthProfile !== 'short' && !item.categories.includes('minimal')) return false;
      }

      // 4. Playstyle Filter
      if (playstyle && playstyle !== 'all') {
        if (!item.playstyles.includes(playstyle)) {
          return false;
        }
      }

      // 5. Length Filter
      if (length && length !== 'any') {
        if (length === 'short' && item.baseName.replace(/\s+/g, '').length > 5) return false;
        if (length === 'medium' && (item.baseName.replace(/\s+/g, '').length <= 5 || item.baseName.replace(/\s+/g, '').length > 9)) return false;
      }

      // 6. Word Count Filter
      if (wordCount && wordCount !== 'any') {
        if (wordCount === '1' && item.wordCount !== 1) return false;
        if (wordCount === '2' && item.wordCount !== 2) return false;
      }

      return true;
    });

    // Apply Sorting
    return this.sortResults(results, sort);
  },

  /**
   * Sort names
   */
  sortResults(items, sortMode) {
    const list = [...items];
    switch (sortMode) {
      case 'az':
        return list.sort((a, b) => a.baseName.localeCompare(b.baseName));
      case 'shortest':
        return list.sort((a, b) => a.baseName.length - b.baseName.length || a.baseName.localeCompare(b.baseName));
      case 'recently-added':
        return list.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
      case 'recommended':
      default:
        // Featured entries first, then alphabetical
        return list.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return a.baseName.localeCompare(b.baseName);
        });
    }
  },

  /**
   * Semantic "More Like This" Engine
   * Finds conceptually related names via semantic clusters & shared tags
   */
  getMoreLikeThis(baseNameId, limit = 8) {
    const target = BOYS_DATABASE.find(item => item.id === baseNameId);
    if (!target) return [];

    // Check cluster membership
    let clusterIds = [];
    for (const [clusterKey, members] of Object.entries(SEMANTIC_CLUSTERS)) {
      if (members.includes(target.id)) {
        clusterIds = clusterIds.concat(members.filter(m => m !== target.id));
      }
    }

    const seenIds = new Set([target.id]);
    const matches = [];

    // 1. Add direct cluster siblings
    for (const cid of clusterIds) {
      if (!seenIds.has(cid)) {
        const found = BOYS_DATABASE.find(item => item.id === cid);
        if (found) {
          matches.push(found);
          seenIds.add(cid);
        }
      }
    }

    // 2. Supplement with shared tag & category overlap
    if (matches.length < limit) {
      const candidates = BOYS_DATABASE.filter(item => !seenIds.has(item.id))
        .map(item => {
          let score = 0;
          item.categories.forEach(cat => {
            if (target.categories.includes(cat)) score += 2;
          });
          item.tags.forEach(tag => {
            if (target.tags.includes(tag)) score += 1;
          });
          item.playstyles.forEach(ps => {
            if (target.playstyles.includes(ps)) score += 1.5;
          });
          return { item, score };
        })
        .sort((a, b) => b.score - a.score);

      for (const cand of candidates) {
        if (cand.score > 0 && matches.length < limit) {
          matches.push(cand.item);
          seenIds.add(cand.item.id);
        }
      }
    }

    return matches.slice(0, limit);
  },

  /**
   * "Pick For Me" 2-Question Matcher
   */
  pickForMe(playstyle, vibe, limit = 8) {
    const scored = BOYS_DATABASE.map(item => {
      let score = 0;
      if (item.playstyles.includes(playstyle)) score += 4;
      if (vibe === 'dark' && item.categories.includes('dark')) score += 3;
      if (vibe === 'pro' && item.categories.includes('pro')) score += 3;
      if (vibe === 'royal' && item.categories.includes('royal')) score += 3;
      if (vibe === 'minimal' && item.lengthProfile === 'short') score += 3;
      if (vibe === 'aggressive' && item.categories.includes('attitude')) score += 3;
      if (item.featured) score += 1;
      return { item, score };
    });

    return scored
      .sort((a, b) => b.score - a.score || Math.random() - 0.5)
      .slice(0, limit)
      .map(s => s.item);
  },

  /**
   * Shuffle keeping current items in random order
   */
  shuffle(items) {
    const array = [...items];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  },

  /**
   * Surprise Me: 10 varied selections across different categories
   */
  surpriseMe(count = 10) {
    return this.shuffle(BOYS_DATABASE).slice(0, count);
  },

  /**
   * Deterministic "Name of the Day"
   */
  getNameOfTheDay() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const index = dayOfYear % BOYS_DATABASE.length;
    return BOYS_DATABASE[index];
  },

  /**
   * Factually detects if a string contains special / Unicode characters
   */
  hasSpecialCharacters(str) {
    // Normal ASCII letters, digits, and standard spaces
    return /[^\x20-\x7E]/.test(str);
  }
};
