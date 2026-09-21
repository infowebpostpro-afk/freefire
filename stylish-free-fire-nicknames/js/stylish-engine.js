/**
 * Free Fire Nickname Style Gallery — Engine
 * Handles dynamic rendering, symbol search, style-name cross exploration,
 * variants generation, intensity stepping, and objective character analytics.
 */

const StylishEngine = {
  smallCapsMap: {
    'a': 'ᴀ', 'b': 'ʙ', 'c': 'ᴄ', 'd': 'ᴅ', 'e': 'ᴇ', 'f': 'ꜰ',
    'g': 'ɢ', 'h': 'ʜ', 'i': 'ɪ', 'j': 'ᴊ', 'k': 'ᴋ', 'l': 'ʟ',
    'm': 'ᴍ', 'n': 'ɴ', 'o': 'ᴏ', 'p': 'ᴘ', 'q': 'ǫ', 'r': 'ʀ',
    's': 's', 't': 'ᴛ', 'u': 'ᴜ', 'v': 'ᴠ', 'w': 'ᴡ', 'x': 'x',
    'y': 'ʏ', 'z': 'ᴢ'
  },

  toSmallCaps(str) {
    return str.toLowerCase().split('').map(c => this.smallCapsMap[c] || c).join('');
  },

  renderStyle(baseName, template) {
    if (!baseName) baseName = "Shadow";
    if (!template) template = STYLE_TEMPLATES[0];

    let transformed = baseName;

    switch (template.transform) {
      case 'uppercase':
        transformed = baseName.toUpperCase();
        break;
      case 'lowercase':
        transformed = baseName.toLowerCase();
        break;
      case 'spaced':
        transformed = baseName.toUpperCase().split('').join(' ');
        break;
      case 'smallcaps':
        transformed = this.toSmallCaps(baseName);
        break;
      case 'none':
      default:
        transformed = baseName;
        break;
    }

    const prefix = template.prefix || "";
    const suffix = template.suffix || "";

    return `${prefix}${transformed}${suffix}`;
  },

  getTemplateById(id) {
    return STYLE_TEMPLATES.find(t => t.id === id) || STYLE_TEMPLATES[0];
  },

  getBaseNameById(id) {
    return BASE_NAMES.find(b => b.id === id) || BASE_NAMES[0];
  },

  calculateStats(renderedString, baseName) {
    const rawBase = baseName || "";
    const rendered = renderedString || "";
    const renderedChars = Array.from(rendered);
    const baseChars = Array.from(rawBase);

    const hasSpecialUnicode = /[^\u0000-\u007F]/.test(rendered);
    const symbolCount = Math.max(0, renderedChars.length - baseChars.length);

    return {
      baseLength: baseChars.length,
      renderedLength: renderedChars.length,
      symbolCount: symbolCount,
      hasSpecialUnicode: hasSpecialUnicode
    };
  },

  filterCombinations(options = {}) {
    const {
      mode = 'browse-styles', // 'browse-styles' | 'browse-names'
      query = '',
      category = 'all',
      decorationLevel = 'all', // 'all' | 'low' | 'medium' | 'high'
      structure = 'all', // 'all' | 'prefix' | 'suffix' | 'both' | 'framed'
      length = 'all', // 'all' | 'short' | 'medium' | 'long'
      lockedName = null,
      lockedStyle = null
    } = options;

    const cleanQuery = query.trim().toLowerCase();
    const isSymbolQuery = /[亗乂★♛♚☠⚡〆彡『』【】꧁꧂༒༺༻✦✧♡☬⚔☯•|/⟨⟩⟦⟧《》]/.test(cleanQuery);

    // 1. Filter Base Names
    let filteredBaseNames = BASE_NAMES.filter(item => {
      if (lockedName && item.baseName.toLowerCase() !== lockedName.toLowerCase()) {
        return false;
      }

      if (cleanQuery && !isSymbolQuery) {
        const matchesName = item.baseName.toLowerCase().includes(cleanQuery);
        const matchesConcept = item.concepts.some(c => c.toLowerCase().includes(cleanQuery));
        if (!matchesName && !matchesConcept) {
          // If query might be category or style tag, don't eliminate names yet
          const queryMatchesAnyCategory = STYLISH_CATEGORIES.some(cat => 
            cat.name.toLowerCase().includes(cleanQuery) || cat.id.toLowerCase().includes(cleanQuery)
          );
          const queryMatchesAnyTag = STYLE_TEMPLATES.some(t => 
            t.tags.some(tag => tag.toLowerCase().includes(cleanQuery))
          );
          if (!queryMatchesAnyCategory && !queryMatchesAnyTag) {
            return false;
          }
        }
      }

      if (length !== 'all') {
        if (length === 'short' && item.baseName.length > 6) return false;
        if (length === 'medium' && (item.baseName.length < 7 || item.baseName.length > 10)) return false;
        if (length === 'long' && item.baseName.length <= 10) return false;
      }

      return true;
    });

    if (lockedName && filteredBaseNames.length === 0) {
      filteredBaseNames = [{ id: "custom", baseName: lockedName, concepts: ["custom"], lengthProfile: "custom" }];
    }

    // 2. Filter Style Templates
    let filteredTemplates = STYLE_TEMPLATES.filter(tpl => {
      if (lockedStyle && tpl.id !== lockedStyle) {
        return false;
      }

      if (category !== 'all' && tpl.category !== category) {
        return false;
      }

      if (decorationLevel !== 'all' && tpl.decorationLevel !== decorationLevel) {
        return false;
      }

      if (structure !== 'all' && tpl.structure !== structure) {
        return false;
      }

      if (cleanQuery) {
        if (isSymbolQuery) {
          const hasSymbol = (tpl.prefix && tpl.prefix.includes(cleanQuery)) ||
                            (tpl.suffix && tpl.suffix.includes(cleanQuery));
          if (!hasSymbol) return false;
        } else {
          const categoryMatches = tpl.category.toLowerCase().includes(cleanQuery);
          const nameMatches = tpl.name.toLowerCase().includes(cleanQuery);
          const tagMatches = tpl.tags.some(t => t.toLowerCase().includes(cleanQuery));
          const baseNameMatches = filteredBaseNames.some(b => b.baseName.toLowerCase().includes(cleanQuery));

          if (!categoryMatches && !nameMatches && !tagMatches && !baseNameMatches) {
            return false;
          }
        }
      }

      return true;
    });

    if (filteredTemplates.length === 0) {
      filteredTemplates = STYLE_TEMPLATES.slice(0, 10);
    }
    if (filteredBaseNames.length === 0) {
      filteredBaseNames = BASE_NAMES.slice(0, 10);
    }

    // 3. Dynamic Combination Generator (Style ↔ Name Matrix)
    const combinations = [];

    if (lockedName) {
      // All templates applied to locked name
      filteredTemplates.forEach(tpl => {
        const rendered = this.renderStyle(lockedName, tpl);
        combinations.push({
          id: `${lockedName}-${tpl.id}`,
          baseName: lockedName,
          template: tpl,
          rendered: rendered,
          stats: this.calculateStats(rendered, lockedName)
        });
      });
    } else if (lockedStyle) {
      // Locked template applied to all base names
      const tpl = this.getTemplateById(lockedStyle);
      filteredBaseNames.forEach(base => {
        const rendered = this.renderStyle(base.baseName, tpl);
        combinations.push({
          id: `${base.baseName}-${tpl.id}`,
          baseName: base.baseName,
          template: tpl,
          rendered: rendered,
          stats: this.calculateStats(rendered, base.baseName)
        });
      });
    } else if (mode === 'browse-names') {
      // In Browse Names Mode: Each base name displayed with its primary or rotating stylish treatment
      filteredBaseNames.forEach((base, idx) => {
        const tpl = filteredTemplates[idx % filteredTemplates.length];
        const rendered = this.renderStyle(base.baseName, tpl);
        combinations.push({
          id: `${base.baseName}-${tpl.id}`,
          baseName: base.baseName,
          template: tpl,
          rendered: rendered,
          stats: this.calculateStats(rendered, base.baseName)
        });
      });
    } else {
      // In Browse Styles Mode (Default): Cross combinations prioritizing variety
      const maxCombinations = Math.min(filteredBaseNames.length * filteredTemplates.length, 300);
      let bIdx = 0;
      let tIdx = 0;

      for (let i = 0; i < maxCombinations; i++) {
        const base = filteredBaseNames[bIdx % filteredBaseNames.length];
        const tpl = filteredTemplates[tIdx % filteredTemplates.length];
        const rendered = this.renderStyle(base.baseName, tpl);

        combinations.push({
          id: `${base.baseName}-${tpl.id}-${i}`,
          baseName: base.baseName,
          template: tpl,
          rendered: rendered,
          stats: this.calculateStats(rendered, base.baseName)
        });

        tIdx++;
        if (tIdx % filteredTemplates.length === 0) {
          bIdx++;
        }
      }
    }

    return combinations;
  },

  getVariants(baseName, currentTemplateId) {
    const currentTpl = this.getTemplateById(currentTemplateId);
    const variants = [];

    // 1. Current Uppercase
    variants.push({
      label: "Uppercase",
      rendered: this.renderStyle(baseName, { ...currentTpl, transform: 'uppercase' }),
      templateId: currentTpl.id
    });

    // 2. Current Normal
    variants.push({
      label: "Standard Case",
      rendered: this.renderStyle(baseName, { ...currentTpl, transform: 'none' }),
      templateId: currentTpl.id
    });

    // 3. Prefix Only
    if (currentTpl.prefix) {
      variants.push({
        label: "Prefix Only",
        rendered: `${currentTpl.prefix}${baseName}`,
        templateId: currentTpl.id
      });
    }

    // 4. Suffix Only
    if (currentTpl.suffix) {
      variants.push({
        label: "Suffix Only",
        rendered: `${baseName}${currentTpl.suffix}`,
        templateId: currentTpl.id
      });
    }

    // 5. Spaced Typography
    variants.push({
      label: "Spaced Wide",
      rendered: this.renderStyle(baseName, { ...currentTpl, transform: 'spaced' }),
      templateId: currentTpl.id
    });

    // 6. Related Styles
    if (currentTpl.relatedStyleIds && currentTpl.relatedStyleIds.length > 0) {
      currentTpl.relatedStyleIds.forEach(relId => {
        const relTpl = this.getTemplateById(relId);
        if (relTpl && relTpl.id !== currentTpl.id) {
          variants.push({
            label: relTpl.name,
            rendered: this.renderStyle(baseName, relTpl),
            templateId: relTpl.id
          });
        }
      });
    }

    // 7. Clean fallback
    variants.push({
      label: "Clean Fallback",
      rendered: baseName,
      templateId: "clean-01"
    });

    // Deduplicate rendered results
    const unique = [];
    const seen = new Set();
    for (const v of variants) {
      if (!seen.has(v.rendered)) {
        seen.add(v.rendered);
        unique.push(v);
      }
    }

    return unique.slice(0, 8);
  },

  getMoreLikeThisStyle(currentTemplateId, baseName) {
    const currentTpl = this.getTemplateById(currentTemplateId);
    let related = (currentTpl.relatedStyleIds || []).map(id => this.getTemplateById(id));

    if (related.length < 4) {
      // Fallback: templates in same category
      const sameCategory = STYLE_TEMPLATES.filter(t => 
        t.category === currentTpl.category && t.id !== currentTpl.id
      );
      related = [...related, ...sameCategory];
    }

    return related.slice(0, 6).map(tpl => ({
      template: tpl,
      rendered: this.renderStyle(baseName, tpl),
      stats: this.calculateStats(this.renderStyle(baseName, tpl), baseName)
    }));
  },

  getMoreNamesInStyle(templateId, currentBaseName, count = 8) {
    const tpl = this.getTemplateById(templateId);
    const otherNames = BASE_NAMES.filter(b => b.baseName.toLowerCase() !== currentBaseName.toLowerCase());
    
    // Shuffle and pick
    const shuffled = [...otherNames].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count).map(b => ({
      baseName: b.baseName,
      rendered: this.renderStyle(b.baseName, tpl),
      stats: this.calculateStats(this.renderStyle(b.baseName, tpl), b.baseName)
    }));
  },

  stepCleaner(baseName, currentTemplateId) {
    const currentTpl = this.getTemplateById(currentTemplateId);
    if (currentTpl.intensity <= 1) {
      return { template: this.getTemplateById("clean-01"), rendered: baseName };
    }

    // Find template with lower intensity in same category, or in pro/clean
    const lower = STYLE_TEMPLATES
      .filter(t => t.intensity < currentTpl.intensity && (t.category === currentTpl.category || t.category === 'pro' || t.category === 'clean'))
      .sort((a, b) => b.intensity - a.intensity);

    const nextTpl = lower[0] || this.getTemplateById("clean-01");
    return {
      template: nextTpl,
      rendered: this.renderStyle(baseName, nextTpl)
    };
  },

  stepMoreStylish(baseName, currentTemplateId) {
    const currentTpl = this.getTemplateById(currentTemplateId);
    if (currentTpl.intensity >= 5) {
      return { template: currentTpl, rendered: this.renderStyle(baseName, currentTpl) };
    }

    // Find template with higher intensity in same category, or wings/royal
    const higher = STYLE_TEMPLATES
      .filter(t => t.intensity > currentTpl.intensity && (t.category === currentTpl.category || t.category === 'wings' || t.category === 'royal'))
      .sort((a, b) => a.intensity - b.intensity);

    const nextTpl = higher[0] || this.getTemplateById("wing-04");
    return {
      template: nextTpl,
      rendered: this.renderStyle(baseName, nextTpl)
    };
  },

  getStyleOfTheDay() {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    const tplIndex = dayOfYear % STYLE_TEMPLATES.length;
    const tpl = STYLE_TEMPLATES[tplIndex];
    const sampleBase = BASE_NAMES[dayOfYear % BASE_NAMES.length].baseName;

    return {
      template: tpl,
      sampleBaseName: sampleBase,
      rendered: this.renderStyle(sampleBase, tpl)
    };
  }
};
