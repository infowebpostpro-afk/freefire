/**
 * Free Fire Girls Nickname Browser - Engine
 * Handles typo-tolerant fuzzy search, multi-criteria filtering,
 * semantic "More Like This" cluster engine, "Pick For Me",
 * shuffle, and deterministic Name of the Day.
 */

const GirlsEngine = {
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

    let results = GIRLS_DATABASE.filter(item => {
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
        if (vibe === 'queen' && !item.categories.includes('queen')) return false;
        if (vibe === 'badass' && !item.categories.includes('badass')) return false;
        if (vibe === 'cute' && !item.categories.includes('cute')) return false;
        if (vibe === 'dark' && !item.categories.includes('dark')) return false;
        if (vibe === 'aesthetic' && !item.categories.includes('aesthetic')) return false;
        if (vibe === 'pro' && !item.categories.includes('pro')) return false;
      }

      // 4. Playstyle Filter
      if (playstyle && playstyle !== 'all') {
        if (!item.playstyles.includes(playstyle)) {
          return false;
        }
      }

      // 5. Length Filter
      if (length && length !== 'any') {
        const len = item.baseName.replace(/\s+/g, '').length;
        if (length === 'short' && len > 5) return false;
        if (length === 'medium' && (len <= 5 || len > 9)) return false;
      }

      // 6. Word Count Filter
      if (wordCount && wordCount !== 'any') {
        if (wordCount === '1' && item.wordCount !== 1) return false;
        if (wordCount === '2' && item.wordCount !== 2) return false;
      }

      return true;
    });

    return this.sortResults(results, sort);
  },

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
        return list.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return a.baseName.localeCompare(b.baseName);
        });
    }
  },

  getMoreLikeThis(baseNameId, limit = 8) {
    const target = GIRLS_DATABASE.find(item => item.id === baseNameId);
    if (!target) return [];

    let clusterIds = [];
    for (const [clusterKey, members] of Object.entries(GIRLS_SEMANTIC_CLUSTERS)) {
      if (members.includes(target.id)) {
        clusterIds = clusterIds.concat(members.filter(m => m !== target.id));
      }
    }

    const seenIds = new Set([target.id]);
    const matches = [];

    // 1. Cluster siblings
    for (const cid of clusterIds) {
      if (!seenIds.has(cid)) {
        const found = GIRLS_DATABASE.find(item => item.id === cid);
        if (found) {
          matches.push(found);
          seenIds.add(cid);
        }
      }
    }

    // 2. Tag and category overlap
    if (matches.length < limit) {
      const candidates = GIRLS_DATABASE.filter(item => !seenIds.has(item.id))
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

  pickForMe(playstyle, vibe, limit = 8) {
    const scored = GIRLS_DATABASE.map(item => {
      let score = 0;
      if (item.playstyles.includes(playstyle)) score += 4;
      if (vibe === 'queen' && item.categories.includes('queen')) score += 3.5;
      if (vibe === 'badass' && item.categories.includes('badass')) score += 3.5;
      if (vibe === 'cute' && item.categories.includes('cute')) score += 3.5;
      if (vibe === 'dark' && item.categories.includes('dark')) score += 3.5;
      if (vibe === 'aesthetic' && item.categories.includes('aesthetic')) score += 3.5;
      if (vibe === 'pro' && item.categories.includes('pro')) score += 3.5;
      if (item.featured) score += 1;
      return { item, score };
    });

    return scored
      .sort((a, b) => b.score - a.score || Math.random() - 0.5)
      .slice(0, limit)
      .map(s => s.item);
  },

  shuffle(items) {
    const array = [...items];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  },

  surpriseMe(count = 10) {
    return this.shuffle(GIRLS_DATABASE).slice(0, count);
  },

  getNameOfTheDay() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const index = dayOfYear % GIRLS_DATABASE.length;
    return GIRLS_DATABASE[index];
  },

  hasSpecialCharacters(str) {
    return /[^\x20-\x7E]/.test(str);
  }
};
