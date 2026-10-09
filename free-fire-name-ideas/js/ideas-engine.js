/**
 * Free Fire Name Ideas — Recommendation & Combinatorial Discovery Engine
 * Implements: Vibe discovery, Seed-based synthesis, Word Locking (🔒),
 * Semantic "More Like This" cousin exploration, and Name DNA generation.
 */

const IdeasEngine = {
  // Normalize and capitalize a word
  capitalize(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  // Calculate length category: short (<= 6 chars) vs medium (7-12 chars)
  getLengthCategory(name) {
    if (!name) return "short";
    return name.length <= 6 ? "short" : "medium";
  },

  // Generate Name DNA descriptors
  buildNameDNA(name, vibes = [], partsCount = 2, customTag = null) {
    const tags = [];
    
    // 1. Primary vibe
    if (vibes.length > 0 && vibes[0] !== 'all') {
      tags.push(this.capitalize(vibes[0]));
    } else {
      tags.push("Tactical");
    }

    // 2. Trait or length or custom
    if (customTag) {
      tags.push(customTag);
    } else if (name.length <= 5) {
      tags.push("Minimal");
    } else if (vibes.length > 1) {
      tags.push(this.capitalize(vibes[1]));
    } else {
      tags.push("Balanced");
    }

    // 3. Structural type
    if (partsCount === 1 || name.length <= 6 && !/[A-Z].*[A-Z]/.test(name)) {
      tags.push("One Word");
    } else {
      tags.push("Two-Part");
    }

    return tags.join(" • ");
  },

  // Main filter and generation function
  filterAndGenerate(options = {}) {
    const {
      vibe = 'all',
      length = 'any', // 'any' | 'short' | 'medium'
      seed = '',
      lockedPart = null,
      lockPosition = 'prefix' // 'prefix' | 'suffix'
    } = options;

    const cleanSeed = (seed || '').trim();
    let results = [];

    // =========================================================================
    // MODE 1: WORD LOCKING ACTIVE (🔒 Lock a word/part and explore variations)
    // =========================================================================
    if (lockedPart) {
      const lockWord = this.capitalize(lockedPart.trim());
      const targetVibe = vibe === 'all' ? 'competitive' : vibe;
      
      const availableSuffixes = [
        ...(VOCABULARY_BANKS.suffixes[targetVibe] || []),
        ...(VOCABULARY_BANKS.suffixes['dark'] || []),
        ...(VOCABULARY_BANKS.suffixes['competitive'] || [])
      ];

      const availablePrefixes = [
        ...(VOCABULARY_BANKS.prefixes[targetVibe] || []),
        ...(VOCABULARY_BANKS.prefixes['dark'] || []),
        ...(VOCABULARY_BANKS.prefixes['competitive'] || [])
      ];

      if (lockPosition === 'prefix') {
        // Locked as prefix: 🔒 lockWord + [variation]
        const uniqueSuffixes = [...new Set(availableSuffixes)];
        uniqueSuffixes.forEach(sfx => {
          if (sfx.toLowerCase() !== lockWord.toLowerCase()) {
            const candidate = `${lockWord}${this.capitalize(sfx)}`;
            results.push({
              id: `lock-${lockWord.toLowerCase()}-${sfx.toLowerCase()}`,
              baseName: candidate,
              vibes: [targetVibe],
              prefix: lockWord,
              suffix: this.capitalize(sfx),
              length: this.getLengthCategory(candidate),
              dna: `🔒 ${lockWord} • ${this.capitalize(targetVibe)} • Variation`,
              concept: `Fixed "${lockWord}" anchor with dynamic ${sfx} suffix`
            });
          }
        });
      } else {
        // Locked as suffix: [variation] + 🔒 lockWord
        const uniquePrefixes = [...new Set(availablePrefixes)];
        uniquePrefixes.forEach(pfx => {
          if (pfx.toLowerCase() !== lockWord.toLowerCase()) {
            const candidate = `${this.capitalize(pfx)}${lockWord}`;
            results.push({
              id: `lock-${pfx.toLowerCase()}-${lockWord.toLowerCase()}`,
              baseName: candidate,
              vibes: [targetVibe],
              prefix: this.capitalize(pfx),
              suffix: lockWord,
              length: this.getLengthCategory(candidate),
              dna: `Variation • ${this.capitalize(targetVibe)} • 🔒 ${lockWord}`,
              concept: `Dynamic ${pfx} prefix ending with fixed "${lockWord}"`
            });
          }
        });
      }
    } 
    // =========================================================================
    // MODE 2: SEED WORD ENTERED (Personalize suggestions around user word)
    // =========================================================================
    else if (cleanSeed) {
      const seedCap = this.capitalize(cleanSeed);
      const seedLower = cleanSeed.toLowerCase();

      // 1. Check curated database for exact substring matches
      IDEAS_DATABASE.forEach(item => {
        if (item.baseName.toLowerCase().includes(seedLower) ||
            item.prefix.toLowerCase().includes(seedLower) ||
            item.suffix.toLowerCase().includes(seedLower)) {
          results.push(item);
        }
      });

      // 2. Synthesize dynamic combinations with seed as prefix
      const primaryVibe = vibe === 'all' ? 'competitive' : vibe;
      const bankSuffixes = [
        ...(VOCABULARY_BANKS.suffixes[primaryVibe] || []),
        ...(VOCABULARY_BANKS.suffixes.dark || []),
        ...(VOCABULARY_BANKS.suffixes.competitive || []),
        "Ace", "Nova", "Rift", "Vex", "Hex", "Pulse", "Fang", "Core", "Strike", "Rush"
      ];

      const bankPrefixes = [
        ...(VOCABULARY_BANKS.prefixes[primaryVibe] || []),
        "Night", "Dark", "Ghost", "Apex", "Nova", "Iron", "Silent", "Shadow"
      ];

      // Seed + Suffix
      [...new Set(bankSuffixes)].slice(0, 10).forEach(sfx => {
        const candidate = `${seedCap}${this.capitalize(sfx)}`;
        if (!results.some(r => r.baseName.toLowerCase() === candidate.toLowerCase())) {
          results.push({
            id: `seed-pfx-${seedLower}-${sfx.toLowerCase()}`,
            baseName: candidate,
            vibes: [primaryVibe],
            prefix: seedCap,
            suffix: this.capitalize(sfx),
            length: this.getLengthCategory(candidate),
            dna: `${this.capitalize(primaryVibe)} • Seed • Two-Part`,
            concept: `Built around custom seed "${seedCap}"`
          });
        }
      });

      // Prefix + Seed
      [...new Set(bankPrefixes)].slice(0, 8).forEach(pfx => {
        const candidate = `${this.capitalize(pfx)}${seedCap}`;
        if (!results.some(r => r.baseName.toLowerCase() === candidate.toLowerCase())) {
          results.push({
            id: `seed-sfx-${pfx.toLowerCase()}-${seedLower}`,
            baseName: candidate,
            vibes: [primaryVibe],
            prefix: this.capitalize(pfx),
            suffix: seedCap,
            length: this.getLengthCategory(candidate),
            dna: `Tactical • Seed • Two-Part`,
            concept: `Prefix leading into "${seedCap}"`
          });
        }
      });

      // Shortened / stylized seed variation if seed is >= 5 letters
      if (cleanSeed.length >= 5) {
        const clipped = seedCap.slice(0, cleanSeed.length - 1);
        results.unshift({
          id: `seed-clip-${seedLower}`,
          baseName: clipped,
          vibes: ["clean", "oneword"],
          prefix: clipped,
          suffix: "",
          length: "short",
          dna: "Clean • Shortened Seed • One Word",
          concept: `Shortened minimalist cut of "${seedCap}"`
        });
      }
    } 
    // =========================================================================
    // MODE 3: STANDARD VIBE DISCOVERY (Curated Catalog + Combinatorial Depth)
    // =========================================================================
    else {
      results = IDEAS_DATABASE.filter(item => {
        if (vibe !== 'all' && !item.vibes.includes(vibe)) {
          return false;
        }
        return true;
      });
    }

    // Apply length filtering if specified
    if (length !== 'any') {
      results = results.filter(item => {
        const cat = this.getLengthCategory(item.baseName);
        return cat === length;
      });
    }

    // Deduplicate by baseName
    const seen = new Set();
    const unique = [];
    results.forEach(item => {
      const lower = item.baseName.toLowerCase();
      if (!seen.has(lower)) {
        seen.add(lower);
        unique.push(item);
      }
    });

    return unique;
  },

  // ===========================================================================
  // SIGNATURE FEATURE: "MORE LIKE THIS" (Semantic Proximity & Branching)
  // Generates sibling ideas using prefix affinity, suffix affinity, and relatives
  // e.g., ShadowVex -> ShadowHex, ShadowNyx, VexShade, NightVex, ShadeVex
  // ===========================================================================
  moreLikeThis(targetName, dataset = IDEAS_DATABASE) {
    if (!targetName) return [];

    const clean = targetName.trim();
    const cleanLower = clean.toLowerCase();

    // 1. Locate if exists in database
    const existing = dataset.find(i => i.baseName.toLowerCase() === cleanLower);

    let prefix = "";
    let suffix = "";
    let primaryVibe = "dark";

    if (existing) {
      prefix = existing.prefix;
      suffix = existing.suffix;
      primaryVibe = existing.vibes[0] || "dark";
    } else {
      // Heuristic splitting by capital letters (e.g. ShadowVex -> Shadow + Vex)
      const parts = clean.match(/[A-Z][a-z0-9]*/g) || [clean];
      if (parts.length >= 2) {
        prefix = parts[0];
        suffix = parts.slice(1).join("");
      } else {
        prefix = clean;
        suffix = "";
      }
    }

    const cousins = [];
    const addedNames = new Set([cleanLower]);

    const addCandidate = (name, pfx, sfx, reasonTag) => {
      const lower = name.toLowerCase();
      if (!addedNames.has(lower) && name.length <= 13) {
        addedNames.add(lower);
        cousins.push({
          id: `mlt-${lower}-${Date.now().toString().slice(-4)}`,
          baseName: name,
          vibes: [primaryVibe],
          prefix: pfx,
          suffix: sfx,
          length: this.getLengthCategory(name),
          dna: `${this.capitalize(primaryVibe)} • ${reasonTag}`,
          concept: `Branching from "${clean}" (${reasonTag})`
        });
      }
    };

    // Branch 1: Same Prefix + Cousin Suffixes (e.g. Shadow -> ShadowHex, ShadowNyx, ShadowNova)
    if (prefix) {
      const pfxLower = prefix.toLowerCase();
      const relativeSuffixes = [
        "Hex", "Nyx", "Rift", "Nova", "Pulse", "Fang", "Rush", "Ace", "Blade", "Core", "Storm"
      ];
      relativeSuffixes.forEach(s => {
        if (s.toLowerCase() !== suffix.toLowerCase()) {
          addCandidate(`${prefix}${s}`, prefix, s, "Shared Root");
        }
      });

      // Semantic cousin prefixes if available
      const cousinPrefixes = VOCABULARY_BANKS.semanticRelatives[pfxLower] || [];
      cousinPrefixes.forEach(cp => {
        if (suffix) {
          addCandidate(`${cp}${suffix}`, cp, suffix, "Semantic Kin");
        }
      });
    }

    // Branch 2: Same Suffix + Cousin Prefixes (e.g. Vex -> NightVex, ShadeVex, GhostVex, DarkVex)
    if (suffix) {
      const sfxLower = suffix.toLowerCase();
      const relativePrefixes = [
        "Night", "Shade", "Dark", "Ghost", "Void", "Nova", "Frost", "Grim", "Apex", "Echo"
      ];
      relativePrefixes.forEach(p => {
        if (p.toLowerCase() !== prefix.toLowerCase()) {
          addCandidate(`${p}${suffix}`, p, suffix, "Suffix Cousin");
        }
      });

      // Semantic cousin suffixes if available
      const cousinSuffixes = VOCABULARY_BANKS.semanticRelatives[sfxLower] || [];
      cousinSuffixes.forEach(cs => {
        if (prefix) {
          addCandidate(`${prefix}${cs}`, prefix, cs, "Harmonic Shift");
        }
      });
    }

    // Branch 3: Inversion if two-part (e.g. Shadow + Vex -> VexShade or VexShadow)
    if (prefix && suffix && suffix.length >= 3) {
      addCandidate(`${suffix}${prefix}`, suffix, prefix, "Inverted Match");
    }

    // Branch 4: Single word cousin branching if no suffix
    if (!suffix && prefix) {
      const endings = ["ora", "ix", "yn", "us", "en", "is"];
      endings.forEach(end => {
        const modified = `${prefix.slice(0, 4)}${end}`;
        addCandidate(modified, modified, "", "Variant Moniker");
      });
    }

    return cousins.slice(0, 12);
  },

  // Pick an inspired surprise suggestion
  surpriseMe(dataset = IDEAS_DATABASE) {
    const idx = Math.floor(Math.random() * dataset.length);
    return dataset[idx];
  }
};
