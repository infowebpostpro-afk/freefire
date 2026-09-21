/**
 * Free Fire Nickname Style Gallery — Main Application Controller
 * Manages two-way style ↔ name discovery, lock mechanism, style lab,
 * dynamic rendering, variants, simulated preview sandbox, and dual favorites.
 */

const StylishApp = {
  state: {
    mode: 'browse-styles', // 'browse-styles' | 'browse-names'
    activeCategory: 'all',
    decorationLevel: 'all',
    structure: 'all',
    length: 'all',
    searchQuery: '',
    lockedName: null,
    lockedStyle: null,
    visibleCount: 24,
    currentResults: [],

    // Persistent storage
    savedNicknames: JSON.parse(localStorage.getItem('ff_stylish_saved_nicknames') || '[]'),
    savedStyles: JSON.parse(localStorage.getItem('ff_stylish_saved_styles') || '[]'),
    shortlist: JSON.parse(localStorage.getItem('ff_stylish_shortlist') || '[]'),
    recentStyles: JSON.parse(localStorage.getItem('ff_stylish_recents') || '[]'),

    // Active inspection context
    activeItem: null,

    // Style Lab Context
    labBaseName: 'Shadow',
    labIntensity: 3,
    labLeft: '亗',
    labCasing: 'uppercase',
    labRight: '亗',
    labFrame: 'none'
  },

  init() {
    this.initAmbientParticles();
    this.initDiscoveryModes();
    this.initCategoryCarousel();
    this.initCategoryCards();
    this.initSearch();
    this.initModalsAndDrawers();
    this.initStyleLab();
    this.initSavedAndShortlist();
    this.initActionButtons();
    this.updateBadges();

    // Instant zero-friction initial render
    this.applyFilters(true);
  },

  /* ===================================================================
     DISCOVERY MODES (Two-Way Exploration: Style → Names vs Name → Styles)
     =================================================================== */
  initDiscoveryModes() {
    const btnStyles = document.getElementById('mode-btn-styles');
    const btnNames = document.getElementById('mode-btn-names');

    btnStyles?.addEventListener('click', () => {
      this.state.mode = 'browse-styles';
      btnStyles.classList.add('active');
      btnStyles.setAttribute('aria-selected', 'true');
      btnNames.classList.remove('active');
      btnNames.setAttribute('aria-selected', 'false');
      this.applyFilters(true);
    });

    btnNames?.addEventListener('click', () => {
      this.state.mode = 'browse-names';
      btnNames.classList.add('active');
      btnNames.setAttribute('aria-selected', 'true');
      btnStyles.classList.remove('active');
      btnStyles.setAttribute('aria-selected', 'false');
      this.applyFilters(true);
    });
  },

  /* ===================================================================
     CATEGORY CAROUSEL & CARDS
     =================================================================== */
  initCategoryCarousel() {
    const container = document.getElementById('category-carousel');
    if (!container) return;

    let html = `
      <button class="cat-chip active" data-category="all">
        <span>⚡</span> All Styles
      </button>
    `;

    STYLISH_CATEGORIES.forEach(cat => {
      html += `
        <button class="cat-chip" data-category="${cat.id}">
          <span>${cat.icon}</span> ${cat.name}
        </button>
      `;
    });

    container.innerHTML = html;

    container.addEventListener('click', (e) => {
      const chip = e.target.closest('.cat-chip');
      if (!chip) return;

      container.querySelectorAll('.cat-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      this.state.activeCategory = chip.dataset.category;
      this.applyFilters(true);
    });
  },

  initCategoryCards() {
    const container = document.getElementById('style-category-grid');
    const toggleBtn = document.getElementById('btn-toggle-category-cards');
    const section = document.getElementById('style-category-cards-section');
    if (!container) return;

    let html = '';
    STYLISH_CATEGORIES.forEach(cat => {
      const sample1 = StylishEngine.renderStyle("Vortex", StylishEngine.getTemplateById(cat.sampleTemplates[0]));
      const sample2 = StylishEngine.renderStyle("Shadow", StylishEngine.getTemplateById(cat.sampleTemplates[1] || cat.sampleTemplates[0]));
      const sample3 = StylishEngine.renderStyle("Nova", StylishEngine.getTemplateById(cat.sampleTemplates[2] || cat.sampleTemplates[0]));

      html += `
        <div class="style-cat-card" style="--cat-accent: ${cat.accentColor};" data-category="${cat.id}">
          <div>
            <div class="cat-card-header">
              <div class="cat-card-title">
                <span>${cat.icon}</span> ${cat.name}
              </div>
              <span class="cat-card-badge">${cat.badge}</span>
            </div>
            <div class="cat-card-samples">
              <div class="cat-sample-item">${sample1}</div>
              <div class="cat-sample-item">${sample2}</div>
              <div class="cat-sample-item">${sample3}</div>
            </div>
          </div>
          <div class="cat-card-footer">
            <span>${cat.subtitle}</span>
            <span class="cat-explore-link">Explore →</span>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;

    container.addEventListener('click', (e) => {
      const card = e.target.closest('.style-cat-card');
      if (!card) return;

      const catId = card.dataset.category;
      this.state.activeCategory = catId;

      // Sync category chips
      const chips = document.querySelectorAll('.cat-chip');
      chips.forEach(c => {
        c.classList.toggle('active', c.dataset.category === catId);
      });

      this.applyFilters(true);
      document.getElementById('nickname-grid')?.scrollIntoView({ behavior: 'smooth' });
    });

    toggleBtn?.addEventListener('click', () => {
      if (container.style.display === 'none') {
        container.style.display = 'grid';
        toggleBtn.textContent = 'Hide Families ▲';
      } else {
        container.style.display = 'none';
        toggleBtn.textContent = 'Show Families ▼';
      }
    });
  },

  /* ===================================================================
     SEARCH & QUICK SUGGESTIONS
     =================================================================== */
  initSearch() {
    const input = document.getElementById('stylish-search-input');
    const clearBtn = document.getElementById('search-clear-btn');
    const dropdown = document.getElementById('search-suggestions');
    if (!input) return;

    let debounceTimer = null;

    input.addEventListener('input', (e) => {
      const val = e.target.value.trim();
      clearBtn.style.display = val ? 'block' : 'none';

      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        this.state.searchQuery = val;
        this.applyFilters(true);
      }, 150);
    });

    input.addEventListener('focus', () => {
      if (!input.value.trim()) {
        dropdown?.classList.add('open');
      }
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.stylish-search-section')) {
        dropdown?.classList.remove('open');
      }
    });

    clearBtn?.addEventListener('click', () => {
      input.value = '';
      clearBtn.style.display = 'none';
      this.state.searchQuery = '';
      this.applyFilters(true);
      input.focus();
    });

    // Suggestion chips
    dropdown?.addEventListener('click', (e) => {
      const chip = e.target.closest('.search-tag-chip');
      if (!chip) return;

      const query = chip.dataset.query;
      input.value = query;
      clearBtn.style.display = 'block';
      dropdown.classList.remove('open');
      this.state.searchQuery = query;
      this.applyFilters(true);
    });
  },

  /* ===================================================================
     FILTERING & RESULT RENDERING
     =================================================================== */
  applyFilters(resetPagination = true) {
    if (resetPagination) {
      this.state.visibleCount = 24;
    }

    this.state.currentResults = StylishEngine.filterCombinations({
      mode: this.state.mode,
      query: this.state.searchQuery,
      category: this.state.activeCategory,
      decorationLevel: this.state.decorationLevel,
      structure: this.state.structure,
      length: this.state.length,
      lockedName: this.state.lockedName,
      lockedStyle: this.state.lockedStyle
    });

    this.updateLockBanner();
    this.renderActiveFilterChips();
    this.renderNicknameGrid();
  },

  updateLockBanner() {
    const banner = document.getElementById('lock-banner');
    const typeLabel = document.getElementById('lock-type-label');
    const targetLabel = document.getElementById('lock-target-label');
    const unlockBtn = document.getElementById('btn-unlock-banner');
    if (!banner) return;

    if (this.state.lockedName) {
      banner.classList.add('active');
      typeLabel.textContent = 'Name';
      targetLabel.textContent = this.state.lockedName;
    } else if (this.state.lockedStyle) {
      const tpl = StylishEngine.getTemplateById(this.state.lockedStyle);
      banner.classList.add('active');
      typeLabel.textContent = 'Style';
      targetLabel.textContent = `${tpl.prefix}{name}${tpl.suffix}`;
    } else {
      banner.classList.remove('active');
    }

    if (unlockBtn) {
      unlockBtn.onclick = () => {
        this.unlockAll();
      };
    }
  },

  unlockAll() {
    this.state.lockedName = null;
    this.state.lockedStyle = null;
    this.applyFilters(true);
    this.showToast("Unlocked. Browsing full gallery.");
  },

  renderActiveFilterChips() {
    const row = document.getElementById('active-filters-row');
    if (!row) return;

    let html = '';

    if (this.state.activeCategory !== 'all') {
      html += `
        <div class="active-filter-pill">
          <span>Category: ${this.state.activeCategory}</span>
          <button data-clear="category">✕</button>
        </div>
      `;
    }

    if (this.state.decorationLevel !== 'all') {
      html += `
        <div class="active-filter-pill">
          <span>Decoration: ${this.state.decorationLevel}</span>
          <button data-clear="decorationLevel">✕</button>
        </div>
      `;
    }

    if (this.state.structure !== 'all') {
      html += `
        <div class="active-filter-pill">
          <span>Structure: ${this.state.structure}</span>
          <button data-clear="structure">✕</button>
        </div>
      `;
    }

    if (this.state.length !== 'all') {
      html += `
        <div class="active-filter-pill">
          <span>Length: ${this.state.length}</span>
          <button data-clear="length">✕</button>
        </div>
      `;
    }

    row.innerHTML = html;

    row.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-clear]');
      if (!btn) return;

      const clearType = btn.dataset.clear;
      if (clearType === 'category') {
        this.state.activeCategory = 'all';
        document.querySelectorAll('.cat-chip').forEach(c => {
          c.classList.toggle('active', c.dataset.category === 'all');
        });
      } else {
        this.state[clearType] = 'all';
      }

      this.applyFilters(true);
    });
  },

  renderNicknameGrid() {
    const grid = document.getElementById('nickname-grid');
    const countDisplay = document.getElementById('results-count');
    const loadMoreBtn = document.getElementById('btn-load-more');
    if (!grid) return;

    const total = this.state.currentResults.length;
    const visible = this.state.currentResults.slice(0, this.state.visibleCount);

    if (countDisplay) {
      countDisplay.textContent = total;
    }

    if (loadMoreBtn) {
      loadMoreBtn.style.display = this.state.visibleCount >= total ? 'none' : 'inline-block';
    }

    if (total === 0) {
      grid.innerHTML = `
        <div class="empty-gallery-box">
          <div class="empty-icon">🔍</div>
          <h3 class="empty-title">No matching styles found</h3>
          <p class="empty-text">Try adjusting your search query, clearing filters, or unlocking the name/style.</p>
          <button class="btn-step" id="btn-empty-reset" style="display: inline-flex; margin: 0 auto;">
            Reset All Filters &amp; Locks
          </button>
        </div>
      `;
      document.getElementById('btn-empty-reset')?.addEventListener('click', () => {
        this.state.searchQuery = '';
        this.state.activeCategory = 'all';
        this.state.decorationLevel = 'all';
        this.state.structure = 'all';
        this.state.length = 'all';
        this.state.lockedName = null;
        this.state.lockedStyle = null;
        const searchInput = document.getElementById('stylish-search-input');
        if (searchInput) searchInput.value = '';
        document.querySelectorAll('.cat-chip').forEach(c => c.classList.toggle('active', c.dataset.category === 'all'));
        this.applyFilters(true);
      });
      return;
    }

    let html = '';
    visible.forEach((item, index) => {
      const isSaved = this.state.savedNicknames.some(s => s.rendered === item.rendered);
      const isShortlisted = this.state.shortlist.some(s => s.rendered === item.rendered);

      html += `
        <article class="nickname-card" data-index="${index}">
          <div class="card-meta-top">
            <span class="card-category-tag">${item.template.category}</span>
            <span class="card-spec-tag">• ${item.template.decorationLevel.toUpperCase()} STYLE</span>
          </div>

          <div class="card-nickname-display" id="card-name-${index}">
            ${item.rendered}
          </div>

          <button class="btn-copy-nickname" data-action="copy" data-index="${index}">
            <span>📋</span> Copy Name
          </button>

          <div class="card-secondary-actions">
            <button class="card-action-btn ${isSaved ? 'active' : ''}" data-action="save" data-index="${index}" title="Save to Favorites">
              <span>${isSaved ? '♥' : '♡'}</span> Save
            </button>
            <button class="card-action-btn" data-action="preview" data-index="${index}" title="Inspect &amp; Test Context">
              <span>👁</span> Preview
            </button>
            <button class="card-action-btn" data-action="variants" data-index="${index}" title="View Style Variants">
              <span>✨</span> Variants
            </button>
            <button class="card-action-btn btn-lock-action" data-action="lock" data-index="${index}" title="Lock this Name or Style">
              <span>🔒</span> Lock
            </button>
          </div>

          <div class="card-clean-fallback">
            <button data-action="copy-clean" data-base="${item.baseName}">
              Copy Clean: ${item.baseName}
            </button>
          </div>
        </article>
      `;
    });

    grid.innerHTML = html;
  },

  /* ===================================================================
     CARD ACTIONS: COPY, SAVE, PREVIEW, VARIANTS, LOCK
     =================================================================== */
  initActionButtons() {
    const grid = document.getElementById('nickname-grid');
    const loadMoreBtn = document.getElementById('btn-load-more');

    grid?.addEventListener('click', (e) => {
      const target = e.target.closest('[data-action]');
      if (!target) return;

      const action = target.dataset.action;
      const index = parseInt(target.dataset.index, 10);
      const item = this.state.currentResults[index];

      if (action === 'copy' && item) {
        this.copyNickname(item.rendered, target);
      } else if (action === 'copy-clean') {
        const cleanName = target.dataset.base;
        this.copyNickname(cleanName);
      } else if (action === 'save' && item) {
        this.toggleSaveNickname(item);
      } else if (action === 'preview' && item) {
        this.openPreviewModal(item);
      } else if (action === 'variants' && item) {
        this.openPreviewModal(item, true); // scroll to variants
      } else if (action === 'lock' && item) {
        this.promptLockChoice(item);
      }
    });

    loadMoreBtn?.addEventListener('click', () => {
      this.state.visibleCount += 24;
      this.renderNicknameGrid();
    });

    // Random Style Quick Button
    document.getElementById('btn-random-style')?.addEventListener('click', () => {
      const allTemplates = STYLE_TEMPLATES;
      const randomTpl = allTemplates[Math.floor(Math.random() * allTemplates.length)];
      const randomBase = BASE_NAMES[Math.floor(Math.random() * BASE_NAMES.length)].baseName;
      const rendered = StylishEngine.renderStyle(randomBase, randomTpl);
      this.openPreviewModal({
        baseName: randomBase,
        template: randomTpl,
        rendered: rendered,
        stats: StylishEngine.calculateStats(rendered, randomBase)
      });
    });
  },

  promptLockChoice(item) {
    if (this.state.lockedName || this.state.lockedStyle) {
      this.unlockAll();
      return;
    }

    // Interactive lock prompt
    const choice = confirm(`Lock options for "${item.rendered}":\n\nClick [OK] to LOCK NAME "${item.baseName}" (Explore all styles with this name)\nClick [Cancel] to LOCK STYLE "${item.template.prefix}{name}${item.template.suffix}" (Explore all names with this style)`);
    if (choice) {
      this.lockName(item.baseName);
    } else {
      this.lockStyle(item.template.id);
    }
  },

  lockName(name) {
    this.state.lockedName = name;
    this.state.lockedStyle = null;
    this.state.mode = 'browse-styles';
    document.getElementById('mode-btn-styles')?.classList.add('active');
    document.getElementById('mode-btn-names')?.classList.remove('active');
    this.applyFilters(true);
    this.showToast(`🔒 Name "${name}" locked. Browsing all styles.`);
  },

  lockStyle(templateId) {
    this.state.lockedStyle = templateId;
    this.state.lockedName = null;
    this.state.mode = 'browse-names';
    document.getElementById('mode-btn-names')?.classList.add('active');
    document.getElementById('mode-btn-styles')?.classList.remove('active');
    const tpl = StylishEngine.getTemplateById(templateId);
    this.applyFilters(true);
    this.showToast(`🔒 Style "${tpl.prefix}{name}${tpl.suffix}" locked.`);
  },

  /* ===================================================================
     COPY & TOAST NOTIFICATION
     =================================================================== */
  copyNickname(text, buttonEl = null) {
    if (!text) return;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text);
    } else {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }

    if (buttonEl) {
      const originalText = buttonEl.innerHTML;
      buttonEl.classList.add('copied');
      buttonEl.innerHTML = '<span>✓</span> Copied!';
      setTimeout(() => {
        buttonEl.classList.remove('copied');
        buttonEl.innerHTML = originalText;
      }, 1500);
    }

    this.showToast("Stylish nickname copied.");

    // Store in history
    this.addToRecents(text);
  },

  showToast(message) {
    const toast = document.getElementById('stylish-toast');
    const toastMsg = document.getElementById('toast-message');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = message;
    toast.classList.add('show');

    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2200);
  },

  addToRecents(text) {
    this.state.recentStyles = [text, ...this.state.recentStyles.filter(r => r !== text)].slice(0, 30);
    localStorage.setItem('ff_stylish_recents', JSON.stringify(this.state.recentStyles));
  },

  /* ===================================================================
     QUICK VIEW / INSPECTOR MODAL
     =================================================================== */
  openPreviewModal(item, scrollToVariants = false) {
    this.state.activeItem = item;
    const modal = document.getElementById('preview-modal');
    if (!modal) return;

    // Set player card nickname
    document.getElementById('modal-player-nickname').textContent = item.rendered;
    document.getElementById('surface-dark-text').textContent = item.rendered;
    document.getElementById('surface-light-text').textContent = item.rendered;
    document.getElementById('squad-slot-selected').textContent = item.rendered;

    // Readability scale
    document.getElementById('read-small').textContent = item.rendered;
    document.getElementById('read-norm').textContent = item.rendered;
    document.getElementById('read-large').textContent = item.rendered;

    // Specs
    document.getElementById('spec-base-name').textContent = item.baseName;
    document.getElementById('spec-length-info').textContent = `Base: ${item.stats.baseLength} • Rendered: ${item.stats.renderedLength}`;
    document.getElementById('spec-structure-info').textContent = `${item.template.structure.toUpperCase()} • ${item.stats.symbolCount} Symbols`;

    // Step buttons
    const btnCleaner = document.getElementById('btn-step-cleaner');
    const btnStylish = document.getElementById('btn-step-stylish');

    btnCleaner.onclick = () => {
      const stepped = StylishEngine.stepCleaner(this.state.activeItem.baseName, this.state.activeItem.template.id);
      this.openPreviewModal({
        baseName: this.state.activeItem.baseName,
        template: stepped.template,
        rendered: stepped.rendered,
        stats: StylishEngine.calculateStats(stepped.rendered, this.state.activeItem.baseName)
      });
      this.showToast("Simplified style.");
    };

    btnStylish.onclick = () => {
      const stepped = StylishEngine.stepMoreStylish(this.state.activeItem.baseName, this.state.activeItem.template.id);
      this.openPreviewModal({
        baseName: this.state.activeItem.baseName,
        template: stepped.template,
        rendered: stepped.rendered,
        stats: StylishEngine.calculateStats(stepped.rendered, this.state.activeItem.baseName)
      });
      this.showToast("Increased style intensity.");
    };

    // Copy actions in modal
    document.getElementById('btn-modal-copy-styled').onclick = () => {
      this.copyNickname(this.state.activeItem.rendered);
    };
    document.getElementById('btn-modal-copy-clean').onclick = () => {
      this.copyNickname(this.state.activeItem.baseName);
    };

    // Variants rendering
    const variantsList = document.getElementById('modal-variants-list');
    const variants = StylishEngine.getVariants(item.baseName, item.template.id);
    let vHtml = '';
    variants.forEach(v => {
      vHtml += `
        <div class="variant-item">
          <div>
            <div class="variant-rendered">${v.rendered}</div>
            <span style="font-size: 0.68rem; color: var(--text-muted);">${v.label}</span>
          </div>
          <button class="btn-variant-copy" data-rendered="${v.rendered}">Copy</button>
        </div>
      `;
    });
    variantsList.innerHTML = vHtml;

    variantsList.onclick = (e) => {
      const copyBtn = e.target.closest('.btn-variant-copy');
      if (copyBtn) {
        this.copyNickname(copyBtn.dataset.rendered);
      }
    };

    // Two-way relational buttons
    document.getElementById('btn-explore-more-styles').onclick = () => {
      modal.classList.remove('open');
      this.lockName(this.state.activeItem.baseName);
    };

    document.getElementById('btn-explore-more-names').onclick = () => {
      modal.classList.remove('open');
      this.lockStyle(this.state.activeItem.template.id);
    };

    modal.classList.add('open');

    if (scrollToVariants) {
      setTimeout(() => {
        variantsList.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  },

  /* ===================================================================
     STYLE LAB (Interactive Adjustments, Intensity, Frames, Mix & Match)
     =================================================================== */
  initStyleLab() {
    const modal = document.getElementById('style-lab-modal');
    const triggerBtn = document.getElementById('btn-open-style-lab');
    const previewText = document.getElementById('lab-preview-text');
    const previewMeta = document.getElementById('lab-preview-meta');
    const baseInput = document.getElementById('lab-base-input');
    const slider = document.getElementById('lab-intensity-slider');
    const sliderLabel = document.getElementById('intensity-val-label');
    const frameSelect = document.getElementById('lab-frame-select');
    const leftSelect = document.getElementById('mix-left-select');
    const casingSelect = document.getElementById('mix-casing-select');
    const rightSelect = document.getElementById('mix-right-select');
    const palette = document.getElementById('lab-symbol-palette');

    // Populate mini symbol picker
    if (palette) {
      let pHtml = '';
      MINI_SYMBOLS.forEach(sym => {
        pHtml += `<button class="mini-symbol-btn" data-symbol="${sym}">${sym}</button>`;
      });
      palette.innerHTML = pHtml;

      palette.addEventListener('click', (e) => {
        const btn = e.target.closest('.mini-symbol-btn');
        if (!btn) return;
        const sym = btn.dataset.symbol;
        this.state.labLeft = sym;
        this.state.labRight = sym;
        leftSelect.value = sym;
        rightSelect.value = sym;
        updateLab();
      });
    }

    const updateLab = () => {
      const base = baseInput.value.trim() || "Shadow";
      this.state.labBaseName = base;
      const intensity = parseInt(slider.value, 10);
      const casing = casingSelect.value;
      const frameKey = frameSelect.value;

      let left = leftSelect.value;
      let right = rightSelect.value;

      if (frameKey !== 'none') {
        const frameObj = CURATED_FRAMES.find(f => f.id === frameKey);
        if (frameObj) {
          left = frameObj.left;
          right = frameObj.right;
        }
      }

      let processed = base;
      if (casing === 'uppercase') processed = base.toUpperCase();
      else if (casing === 'spaced') processed = base.toUpperCase().split('').join(' ');
      else if (casing === 'smallcaps') processed = StylishEngine.toSmallCaps(base);

      const rendered = `${left}${processed}${right}`;
      previewText.textContent = rendered;

      const intensityNames = ["", "Level 1 (Clean)", "Level 2 (Minimal)", "Level 3 (Pro)", "Level 4 (Decorated)", "Level 5 (Extreme)"];
      sliderLabel.textContent = intensityNames[intensity] || `Level ${intensity}`;
      previewMeta.textContent = `Custom Silhouette • ${Array.from(rendered).length} chars`;
    };

    triggerBtn?.addEventListener('click', () => {
      if (this.state.lockedName) {
        baseInput.value = this.state.lockedName;
      }
      updateLab();
      modal.classList.add('open');
    });

    baseInput?.addEventListener('input', updateLab);
    slider?.addEventListener('input', updateLab);
    frameSelect?.addEventListener('change', updateLab);
    leftSelect?.addEventListener('change', updateLab);
    casingSelect?.addEventListener('change', updateLab);
    rightSelect?.addEventListener('change', updateLab);

    document.getElementById('btn-lab-copy')?.addEventListener('click', () => {
      this.copyNickname(previewText.textContent);
    });

    document.getElementById('btn-lab-random-style')?.addEventListener('click', () => {
      const randomTpl = STYLE_TEMPLATES[Math.floor(Math.random() * STYLE_TEMPLATES.length)];
      leftSelect.value = randomTpl.prefix;
      rightSelect.value = randomTpl.suffix;
      frameSelect.value = 'none';
      updateLab();
    });

    document.getElementById('btn-lab-random-name')?.addEventListener('click', () => {
      const randomBase = BASE_NAMES[Math.floor(Math.random() * BASE_NAMES.length)].baseName;
      baseInput.value = randomBase;
      updateLab();
    });

    document.getElementById('btn-lab-surprise')?.addEventListener('click', () => {
      const randomTpl = STYLE_TEMPLATES[Math.floor(Math.random() * STYLE_TEMPLATES.length)];
      const randomBase = BASE_NAMES[Math.floor(Math.random() * BASE_NAMES.length)].baseName;
      baseInput.value = randomBase;
      leftSelect.value = randomTpl.prefix;
      rightSelect.value = randomTpl.suffix;
      frameSelect.value = 'none';
      slider.value = randomTpl.intensity;
      updateLab();
    });
  },

  /* ===================================================================
     FAVORITES & SHORTLIST
     =================================================================== */
  initSavedAndShortlist() {
    const savedModal = document.getElementById('saved-modal');
    const shortlistModal = document.getElementById('shortlist-modal');
    const compareModal = document.getElementById('compare-modal');

    document.getElementById('btn-nav-saved')?.addEventListener('click', () => {
      this.renderSavedModal();
      savedModal.classList.add('open');
    });

    document.getElementById('btn-nav-shortlist')?.addEventListener('click', () => {
      this.renderShortlistModal();
      shortlistModal.classList.add('open');
    });

    // Saved Tabs Switch
    const tabNames = document.getElementById('tab-saved-names');
    const tabStyles = document.getElementById('tab-saved-styles');
    const contNames = document.getElementById('saved-nicknames-container');
    const contStyles = document.getElementById('saved-styles-container');

    tabNames?.addEventListener('click', () => {
      tabNames.classList.add('active');
      tabStyles.classList.remove('active');
      contNames.style.display = 'flex';
      contStyles.style.display = 'none';
    });

    tabStyles?.addEventListener('click', () => {
      tabStyles.classList.add('active');
      tabNames.classList.remove('active');
      contNames.style.display = 'none';
      contStyles.style.display = 'flex';
    });

    // Shortlist Actions
    document.getElementById('btn-shortlist-compare')?.addEventListener('click', () => {
      shortlistModal.classList.remove('open');
      this.renderCompareModal();
      compareModal.classList.add('open');
    });

    document.getElementById('btn-shortlist-copy-all')?.addEventListener('click', () => {
      if (this.state.shortlist.length === 0) return;
      const text = this.state.shortlist.map(s => s.rendered).join('\n');
      this.copyNickname(text);
    });

    document.getElementById('btn-shortlist-share')?.addEventListener('click', () => {
      if (this.state.shortlist.length === 0) return;
      const text = "Which Free Fire nickname style looks best?\n\n" + 
        this.state.shortlist.map((s, i) => `${i + 1}. ${s.rendered}`).join('\n');

      if (navigator.share) {
        navigator.share({ title: 'Free Fire Nickname Shortlist', text: text });
      } else {
        this.copyNickname(text);
        this.showToast("Shortlist copied to clipboard for sharing.");
      }
    });
  },

  toggleSaveNickname(item) {
    const existsIdx = this.state.savedNicknames.findIndex(s => s.rendered === item.rendered);
    if (existsIdx >= 0) {
      this.state.savedNicknames.splice(existsIdx, 1);
      this.showToast("Removed from saved library.");
    } else {
      this.state.savedNicknames.push(item);
      // Also add to shortlist if not already present
      if (!this.state.shortlist.some(s => s.rendered === item.rendered)) {
        this.state.shortlist.push(item);
      }
      this.showToast("Saved to favorites!");
    }

    localStorage.setItem('ff_stylish_saved_nicknames', JSON.stringify(this.state.savedNicknames));
    localStorage.setItem('ff_stylish_shortlist', JSON.stringify(this.state.shortlist));
    this.updateBadges();
    this.renderNicknameGrid();
  },

  saveStyleTemplate(templateId) {
    const tpl = StylishEngine.getTemplateById(templateId);
    if (!this.state.savedStyles.some(s => s.id === tpl.id)) {
      this.state.savedStyles.push(tpl);
      localStorage.setItem('ff_stylish_saved_styles', JSON.stringify(this.state.savedStyles));
      this.updateBadges();
      this.showToast(`Saved style: ${tpl.prefix}{name}${tpl.suffix}`);
    }
  },

  renderSavedModal() {
    const contNames = document.getElementById('saved-nicknames-container');
    const contStyles = document.getElementById('saved-styles-container');
    document.getElementById('count-saved-names').textContent = this.state.savedNicknames.length;
    document.getElementById('count-saved-styles').textContent = this.state.savedStyles.length;

    if (this.state.savedNicknames.length === 0) {
      contNames.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 1.5rem;">No saved nicknames yet. Tap ♡ Save on any design to save it.</div>`;
    } else {
      contNames.innerHTML = this.state.savedNicknames.map((item, idx) => `
        <div class="saved-item-row">
          <div>
            <strong style="color: #fff; font-family: var(--font-display);">${item.rendered}</strong>
            <div style="font-size: 0.7rem; color: var(--text-muted);">${item.template.category} • ${item.baseName}</div>
          </div>
          <div style="display: flex; gap: 0.3rem;">
            <button class="btn-step" style="padding: 0.25rem 0.55rem; font-size: 0.72rem;" onclick="StylishApp.copyNickname('${item.rendered}')">Copy</button>
            <button class="btn-step" style="padding: 0.25rem 0.55rem; font-size: 0.72rem; color: #ff3366;" onclick="StylishApp.removeSavedName(${idx})">✕</button>
          </div>
        </div>
      `).join('');
    }

    if (this.state.savedStyles.length === 0) {
      contStyles.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 1.5rem;">No saved style templates yet. Lock a style to keep exploring it.</div>`;
    } else {
      contStyles.innerHTML = this.state.savedStyles.map((tpl, idx) => `
        <div class="saved-item-row">
          <div>
            <strong style="color: #ffaa00; font-family: var(--font-display);">${tpl.prefix}{name}${tpl.suffix}</strong>
            <div style="font-size: 0.7rem; color: var(--text-muted);">${tpl.name} • ${tpl.category}</div>
          </div>
          <div style="display: flex; gap: 0.3rem;">
            <button class="btn-step" style="padding: 0.25rem 0.55rem; font-size: 0.72rem;" onclick="StylishApp.applySavedStyle('${tpl.id}')">Apply</button>
            <button class="btn-step" style="padding: 0.25rem 0.55rem; font-size: 0.72rem; color: #ff3366;" onclick="StylishApp.removeSavedStyle(${idx})">✕</button>
          </div>
        </div>
      `).join('');
    }
  },

  removeSavedName(index) {
    this.state.savedNicknames.splice(index, 1);
    localStorage.setItem('ff_stylish_saved_nicknames', JSON.stringify(this.state.savedNicknames));
    this.updateBadges();
    this.renderSavedModal();
    this.renderNicknameGrid();
  },

  removeSavedStyle(index) {
    this.state.savedStyles.splice(index, 1);
    localStorage.setItem('ff_stylish_saved_styles', JSON.stringify(this.state.savedStyles));
    this.updateBadges();
    this.renderSavedModal();
  },

  applySavedStyle(templateId) {
    document.getElementById('saved-modal')?.classList.remove('open');
    this.lockStyle(templateId);
  },

  renderShortlistModal() {
    const cont = document.getElementById('shortlist-container');
    if (this.state.shortlist.length === 0) {
      cont.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 1.5rem;">Your shortlist is empty. Save nicknames to compare your finalists.</div>`;
      return;
    }

    cont.innerHTML = this.state.shortlist.map((item, idx) => `
      <div class="saved-item-row">
        <div>
          <strong style="color: #fff; font-family: var(--font-display);">${item.rendered}</strong>
          <div style="font-size: 0.7rem; color: var(--text-muted);">${item.baseName}</div>
        </div>
        <div style="display: flex; gap: 0.3rem;">
          <button class="btn-step" style="padding: 0.25rem 0.55rem; font-size: 0.72rem;" onclick="StylishApp.copyNickname('${item.rendered}')">Copy</button>
          <button class="btn-step" style="padding: 0.25rem 0.55rem; font-size: 0.72rem; color: #ff3366;" onclick="StylishApp.removeShortlist(${idx})">✕</button>
        </div>
      </div>
    `).join('');
  },

  removeShortlist(index) {
    this.state.shortlist.splice(index, 1);
    localStorage.setItem('ff_stylish_shortlist', JSON.stringify(this.state.shortlist));
    this.updateBadges();
    this.renderShortlistModal();
  },

  renderCompareModal() {
    const grid = document.getElementById('compare-grid');
    const base = this.state.lockedName || (this.state.activeItem ? this.state.activeItem.baseName : "Shadow");

    const clean = StylishEngine.renderStyle(base, StylishEngine.getTemplateById('clean-02'));
    const pro = StylishEngine.renderStyle(base, StylishEngine.getTemplateById('pro-01'));
    const royal = StylishEngine.renderStyle(base, StylishEngine.getTemplateById('royal-01'));
    const frame = StylishEngine.renderStyle(base, StylishEngine.getTemplateById('frame-01'));

    grid.innerHTML = `
      <div class="compare-card">
        <div>
          <div class="compare-card-title">1. CLEAN &amp; SIMPLE</div>
          <div class="compare-card-text">${clean}</div>
        </div>
        <button class="btn-copy-nickname" style="margin-bottom: 0;" onclick="StylishApp.copyNickname('${clean}')">Copy Clean</button>
      </div>

      <div class="compare-card">
        <div>
          <div class="compare-card-title">2. PRO TRIDENT</div>
          <div class="compare-card-text">${pro}</div>
        </div>
        <button class="btn-copy-nickname" style="margin-bottom: 0;" onclick="StylishApp.copyNickname('${pro}')">Copy Pro</button>
      </div>

      <div class="compare-card">
        <div>
          <div class="compare-card-title">3. ROYAL MONARCH</div>
          <div class="compare-card-text">${royal}</div>
        </div>
        <button class="btn-copy-nickname" style="margin-bottom: 0;" onclick="StylishApp.copyNickname('${royal}')">Copy Royal</button>
      </div>

      <div class="compare-card">
        <div>
          <div class="compare-card-title">4. SHIELDED FRAME</div>
          <div class="compare-card-text">${frame}</div>
        </div>
        <button class="btn-copy-nickname" style="margin-bottom: 0;" onclick="StylishApp.copyNickname('${frame}')">Copy Frame</button>
      </div>
    `;
  },

  updateBadges() {
    const savedBadge = document.getElementById('saved-count-badge');
    const shortlistBadge = document.getElementById('shortlist-count-badge');

    const totalSaved = this.state.savedNicknames.length + this.state.savedStyles.length;
    if (savedBadge) {
      savedBadge.textContent = totalSaved;
      savedBadge.style.display = totalSaved > 0 ? 'inline-block' : 'none';
    }

    const totalShortlist = this.state.shortlist.length;
    if (shortlistBadge) {
      shortlistBadge.textContent = totalShortlist;
      shortlistBadge.style.display = totalShortlist > 0 ? 'inline-block' : 'none';
    }
  },

  /* ===================================================================
     MODALS OVERLAY CLOSE LOGIC & FILTERS
     =================================================================== */
  initModalsAndDrawers() {
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay || e.target.classList.contains('modal-close-btn')) {
          overlay.classList.remove('open');
        }
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
      }
    });

    // Filters Modal Triggers
    const filterModal = document.getElementById('filter-modal');
    document.getElementById('btn-open-filter')?.addEventListener('click', () => {
      filterModal.classList.add('open');
    });

    filterModal?.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;

      const filterType = btn.dataset.filter;
      const val = btn.dataset.val;

      btn.parentElement.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      this.state[filterType] = val;
    });

    document.getElementById('btn-apply-filters')?.addEventListener('click', () => {
      filterModal.classList.remove('open');
      this.applyFilters(true);
    });

    document.getElementById('btn-reset-filters')?.addEventListener('click', () => {
      this.state.decorationLevel = 'all';
      this.state.structure = 'all';
      this.state.length = 'all';
      filterModal.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.val === 'all');
      });
      filterModal.classList.remove('open');
      this.applyFilters(true);
    });
  },

  /* ===================================================================
     AMBIENT PARTICLES BACKGROUND CANVAS
     =================================================================== */
  initAmbientParticles() {
    const canvas = document.getElementById('ambient-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    for (let i = 0; i < 28; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.8,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: -Math.random() * 0.5 - 0.2,
        opacity: Math.random() * 0.6 + 0.2,
        color: Math.random() > 0.4 ? '#ff5722' : '#ffaa00'
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      });

      requestAnimationFrame(render);
    };

    render();
  }
};

// Auto boot on DOM load
document.addEventListener('DOMContentLoaded', () => {
  StylishApp.init();
});
