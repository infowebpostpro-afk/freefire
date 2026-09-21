/**
 * Free Fire Boys Nickname Browser - Application Controller
 * Handles browse-first discovery, instant search, vibe & playstyle filtering,
 * card rendering, one-tap copy, favorites, shortlist, simulated preview sandbox,
 * lightweight customizer, comparison, pick-for-me, roulette, and ambient particles.
 */

const BoysApp = {
  state: {
    activeCategory: 'popular',
    activeVibe: 'all',
    activePlaystyle: 'all',
    activeLength: 'any',
    activeWordCount: 'any',
    searchQuery: '',
    sortMode: 'recommended',
    visibleCount: 24,
    currentResults: [],
    
    // Persistent Storage
    saved: JSON.parse(localStorage.getItem('ff_boys_saved') || '[]'),
    shortlist: JSON.parse(localStorage.getItem('ff_boys_shortlist') || '[]'),
    recents: JSON.parse(localStorage.getItem('ff_boys_recents') || '[]'),
    copied: JSON.parse(localStorage.getItem('ff_boys_copied') || '[]'),
    
    // Active Modal Context
    activeNameObj: null,
    previewStyleLevel: 'pro', // 'clean' | 'pro' | 'extreme'
    previewContextTab: 'profile', // 'profile' | 'killfeed' | 'lobby'
    
    // Customizer State
    customizerBase: '',
    customizerLeft: '亗',
    customizerRight: '亗',
    customizerStyle: 'pro',
    
    // Comparison State
    comparisonList: []
  },

  init() {
    this.initAmbientEmbers();
    this.initCategoryNav();
    this.initVibeCards();
    this.initSearch();
    this.initActionButtons();
    this.initSidebarFilters();
    this.initModalsAndDrawers();
    this.initMobileBottomNav();
    this.updateBadges();

    // Zero-friction initial render
    this.applyFilters(true);
  },

  /* ===================================================================
     SEARCH & FILTERING
     =================================================================== */

  applyFilters(resetPagination = true) {
    if (resetPagination) {
      this.state.visibleCount = 24;
    }

    this.state.currentResults = BoysEngine.filterNames({
      query: this.state.searchQuery,
      category: this.state.activeCategory,
      vibe: this.state.activeVibe,
      playstyle: this.state.activePlaystyle,
      length: this.state.activeLength,
      wordCount: this.state.activeWordCount,
      sort: this.state.sortMode
    });

    this.renderActiveFilterChips();
    this.renderNicknameGrid();
  },

  renderNicknameGrid() {
    const grid = document.getElementById('nickname-grid');
    const loadMoreBtn = document.getElementById('btn-load-more');
    const countDisplay = document.getElementById('results-count');
    if (!grid) return;

    const visibleItems = this.state.currentResults.slice(0, this.state.visibleCount);
    const total = this.state.currentResults.length;

    if (total === 0) {
      grid.innerHTML = `
        <div class="no-results-box" style="grid-column: 1 / -1;">
          <div class="no-results-icon">🔍</div>
          <h3 class="no-results-title">No matching nicknames found</h3>
          <p class="no-results-text">
            No exact results for your active filters. Try clearing your search or explore a different vibe.
          </p>
          <div class="no-results-actions">
            <button class="btn-tool-action btn-accent" id="btn-reset-filters">Clear All Filters</button>
            <a href="../?seed=${encodeURIComponent(this.state.searchQuery || 'Shadow')}" class="btn-tool-action">
              Style My Own Name →
            </a>
          </div>
        </div>
      `;
      const resetBtn = document.getElementById('btn-reset-filters');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => this.resetAllFilters());
      }
      if (loadMoreBtn) loadMoreBtn.style.display = 'none';
      if (countDisplay) countDisplay.textContent = 'Showing 0 nicknames';
      return;
    }

    let html = '';
    visibleItems.forEach(item => {
      const isSaved = this.state.saved.some(s => s.id === item.id);
      const isShortlisted = this.state.shortlist.some(s => s.id === item.id);
      
      // Pro styled representation for cards
      const styledDisplay = STYLE_RULES.pro(item.baseName);

      html += `
        <article class="nickname-card" data-id="${item.id}" data-basename="${this.escapeHtml(item.baseName)}">
          <div class="card-top-meta">
            <div class="card-tags">
              <span class="tag-pill">${item.categories[0] || 'pro'}</span>
              <span class="tag-pill">${item.lengthProfile}</span>
              <span class="tag-pill">${item.wordCount === 1 ? '1-Word' : '2-Words'}</span>
            </div>
            <div class="card-quick-actions">
              <button class="btn-card-icon btn-card-fav ${isSaved ? 'active' : ''}" 
                title="${isSaved ? 'Remove from Saved' : 'Save to Favorites'}" 
                aria-label="Save nickname" data-id="${item.id}">
                ${isSaved ? '♥' : '♡'}
              </button>
              <button class="btn-card-icon btn-card-shortlist ${isShortlisted ? 'active' : ''}" 
                title="${isShortlisted ? 'In Shortlist' : 'Add to Shortlist'}" 
                aria-label="Add to shortlist" data-id="${item.id}">
                ${isShortlisted ? '★' : '☆'}
              </button>
            </div>
          </div>

          <div class="card-name-wrap" title="Tap to preview or copy" data-id="${item.id}">
            <div class="card-nickname-text">${this.escapeHtml(styledDisplay)}</div>
          </div>

          <button class="btn-card-copy" data-copy="${this.escapeHtml(styledDisplay)}" aria-label="Copy nickname">
            <span>📋</span> Copy Name
          </button>

          <div class="card-bottom-actions">
            <button class="btn-card-subaction btn-preview-trigger" data-id="${item.id}">
              <span>👁</span> Preview
            </button>
            <button class="btn-card-subaction btn-customize-trigger" data-id="${item.id}">
              <span>✎</span> Customize
            </button>
            <button class="btn-card-subaction btn-more-trigger" data-id="${item.id}">
              <span>⚡</span> More Like This
            </button>
          </div>
        </article>
      `;
    });

    grid.innerHTML = html;

    // Attach card event listeners
    this.attachCardEventListeners(grid);

    // Update pagination controls
    if (loadMoreBtn) {
      if (this.state.visibleCount >= total) {
        loadMoreBtn.style.display = 'none';
      } else {
        loadMoreBtn.style.display = 'inline-flex';
        loadMoreBtn.innerHTML = `<span>⚡</span> Load More Names (${total - this.state.visibleCount} remaining)`;
      }
    }

    if (countDisplay) {
      countDisplay.textContent = `Showing ${Math.min(this.state.visibleCount, total)} of ${total} nicknames`;
    }
  },

  attachCardEventListeners(grid) {
    // Copy buttons
    grid.querySelectorAll('.btn-card-copy').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const text = btn.dataset.copy;
        this.copyText(text, btn);
      });
    });

    // Tap nickname name directly to copy & preview
    grid.querySelectorAll('.card-name-wrap').forEach(wrap => {
      wrap.addEventListener('click', () => {
        const id = wrap.dataset.id;
        const item = BOYS_DATABASE.find(n => n.id === id);
        if (item) {
          const styled = STYLE_RULES.pro(item.baseName);
          this.copyText(styled, null, false);
          this.openPreviewModal(item);
        }
      });
    });

    // Favorite buttons
    grid.querySelectorAll('.btn-card-fav').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        this.toggleSave(id);
      });
    });

    // Shortlist buttons
    grid.querySelectorAll('.btn-card-shortlist').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        this.toggleShortlist(id);
      });
    });

    // Preview buttons
    grid.querySelectorAll('.btn-preview-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        const item = BOYS_DATABASE.find(n => n.id === id);
        if (item) this.openPreviewModal(item);
      });
    });

    // Customize buttons
    grid.querySelectorAll('.btn-customize-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        const item = BOYS_DATABASE.find(n => n.id === id);
        if (item) this.openCustomizeModal(item);
      });
    });

    // "More Like This" buttons
    grid.querySelectorAll('.btn-more-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        this.triggerMoreLikeThis(id);
      });
    });
  },

  /* ===================================================================
     CATEGORY & VIBE CONTROLS
     =================================================================== */

  initCategoryNav() {
    const container = document.getElementById('category-scroll-nav');
    if (!container) return;

    let html = `
      <button class="category-chip-btn ${this.state.activeCategory === 'all' ? 'active' : ''}" data-cat="all">
        <span>🔥</span> All Categories
      </button>
    `;

    BOYS_CATEGORIES.forEach(cat => {
      const isActive = this.state.activeCategory === cat.id;
      html += `
        <button class="category-chip-btn ${isActive ? 'active' : ''}" data-cat="${cat.id}">
          <span>${cat.icon}</span> ${cat.label}
        </button>
      `;
    });

    container.innerHTML = html;

    container.querySelectorAll('.category-chip-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        container.querySelectorAll('.category-chip-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.state.activeCategory = btn.dataset.cat;
        this.applyFilters(true);
      });
    });
  },

  initVibeCards() {
    const grid = document.getElementById('vibe-cards-grid');
    if (!grid) return;

    let html = '';
    BOYS_VIBES.forEach(vibe => {
      const isActive = this.state.activeVibe === vibe.id;
      html += `
        <div class="vibe-item-card ${isActive ? 'active' : ''}" data-vibe="${vibe.id}">
          <div class="vibe-icon">${vibe.icon}</div>
          <div class="vibe-label">${vibe.label}</div>
          <div class="vibe-tagline">${vibe.tagLine}</div>
        </div>
      `;
    });

    grid.innerHTML = html;

    grid.querySelectorAll('.vibe-item-card').forEach(card => {
      card.addEventListener('click', () => {
        const v = card.dataset.vibe;
        if (this.state.activeVibe === v) {
          this.state.activeVibe = 'all';
          card.classList.remove('active');
        } else {
          grid.querySelectorAll('.vibe-item-card').forEach(c => c.classList.remove('active'));
          card.classList.add('active');
          this.state.activeVibe = v;
        }
        this.applyFilters(true);
      });
    });
  },

  /* ===================================================================
     SEARCH & SUGGESTIONS
     =================================================================== */

  initSearch() {
    const searchInput = document.getElementById('boys-search-input');
    const clearBtn = document.getElementById('search-clear-btn');
    const dropdown = document.getElementById('search-suggestions');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
      this.state.searchQuery = e.target.value.trim();
      if (clearBtn) clearBtn.style.display = this.state.searchQuery ? 'block' : 'none';
      this.applyFilters(true);
    });

    searchInput.addEventListener('focus', () => {
      if (!this.state.searchQuery && dropdown) {
        dropdown.style.display = 'block';
      }
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.boys-search-section') && dropdown) {
        dropdown.style.display = 'none';
      }
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        this.state.searchQuery = '';
        clearBtn.style.display = 'none';
        this.applyFilters(true);
        searchInput.focus();
      });
    }

    if (dropdown) {
      dropdown.querySelectorAll('.search-tag-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          const text = chip.dataset.tag;
          searchInput.value = text;
          this.state.searchQuery = text;
          if (clearBtn) clearBtn.style.display = 'block';
          dropdown.style.display = 'none';
          this.applyFilters(true);
        });
      });
    }
  },

  /* ===================================================================
     ACTION BUTTONS (Shuffle, Surprise, Pick For Me, Random Slot, Sort)
     =================================================================== */

  initActionButtons() {
    // Shuffle: preserves active filters
    const btnShuffle = document.getElementById('btn-action-shuffle');
    if (btnShuffle) {
      btnShuffle.addEventListener('click', () => {
        this.state.currentResults = BoysEngine.shuffle(this.state.currentResults);
        this.renderNicknameGrid();
        this.showToast('🔀 Nicknames shuffled');
      });
    }

    // Surprise Me: random varied sample
    const btnSurprise = document.getElementById('btn-action-surprise');
    if (btnSurprise) {
      btnSurprise.addEventListener('click', () => {
        this.state.activeCategory = 'all';
        this.state.activeVibe = 'all';
        this.state.activePlaystyle = 'all';
        this.state.searchQuery = '';
        const searchInput = document.getElementById('boys-search-input');
        if (searchInput) searchInput.value = '';
        this.state.currentResults = BoysEngine.surpriseMe(16);
        this.renderActiveFilterChips();
        this.renderNicknameGrid();
        this.showToast('🎲 Here is a fresh surprise selection!');
      });
    }

    // Pick For Me Modal Trigger
    const btnPickForMe = document.getElementById('btn-action-pick-for-me');
    if (btnPickForMe) {
      btnPickForMe.addEventListener('click', () => this.openPickForMeModal());
    }

    // Random Roulette Modal Trigger
    const btnRandomSlot = document.getElementById('btn-action-random-slot');
    if (btnRandomSlot) {
      btnRandomSlot.addEventListener('click', () => this.openRouletteModal());
    }

    // Sorting dropdown
    const sortSelect = document.getElementById('boys-sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.state.sortMode = e.target.value;
        this.applyFilters(false);
      });
    }

    // "Load More" button
    const btnLoadMore = document.getElementById('btn-load-more');
    if (btnLoadMore) {
      btnLoadMore.addEventListener('click', () => {
        this.state.visibleCount += 24;
        this.renderNicknameGrid();
      });
    }
  },

  /* ===================================================================
     ACTIVE FILTER CHIPS & RESET
     =================================================================== */

  renderActiveFilterChips() {
    const container = document.getElementById('active-filters-container');
    if (!container) return;

    const chips = [];

    if (this.state.searchQuery) {
      chips.push({ label: `"${this.state.searchQuery}"`, type: 'search' });
    }
    if (this.state.activeCategory !== 'all') {
      const cat = BOYS_CATEGORIES.find(c => c.id === this.state.activeCategory);
      chips.push({ label: cat ? cat.label : this.state.activeCategory, type: 'category' });
    }
    if (this.state.activeVibe !== 'all') {
      chips.push({ label: `Vibe: ${this.state.activeVibe}`, type: 'vibe' });
    }
    if (this.state.activePlaystyle !== 'all') {
      chips.push({ label: `Playstyle: ${this.state.activePlaystyle}`, type: 'playstyle' });
    }
    if (this.state.activeLength !== 'any') {
      chips.push({ label: `Length: ${this.state.activeLength}`, type: 'length' });
    }
    if (this.state.activeWordCount !== 'any') {
      chips.push({ label: `${this.state.activeWordCount}-Word`, type: 'wordCount' });
    }

    if (chips.length === 0) {
      container.innerHTML = '';
      container.style.display = 'none';
      return;
    }

    container.style.display = 'flex';
    let html = '';
    chips.forEach(c => {
      html += `
        <span class="active-filter-chip">
          <span>${c.label}</span>
          <button class="chip-remove-btn" data-type="${c.type}" aria-label="Remove filter">✕</button>
        </span>
      `;
    });

    html += `<button class="btn-clear-all-filters" id="btn-clear-all-chips">Clear All</button>`;
    container.innerHTML = html;

    container.querySelectorAll('.chip-remove-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const type = btn.dataset.type;
        if (type === 'search') {
          this.state.searchQuery = '';
          const sInput = document.getElementById('boys-search-input');
          if (sInput) sInput.value = '';
        } else if (type === 'category') {
          this.state.activeCategory = 'all';
          this.syncCategoryNavUi();
        } else if (type === 'vibe') {
          this.state.activeVibe = 'all';
          this.syncVibeCardsUi();
        } else if (type === 'playstyle') {
          this.state.activePlaystyle = 'all';
          this.syncSidebarUi();
        } else if (type === 'length') {
          this.state.activeLength = 'any';
          this.syncSidebarUi();
        } else if (type === 'wordCount') {
          this.state.activeWordCount = 'any';
          this.syncSidebarUi();
        }
        this.applyFilters(true);
      });
    });

    const clearAllBtn = document.getElementById('btn-clear-all-chips');
    if (clearAllBtn) {
      clearAllBtn.addEventListener('click', () => this.resetAllFilters());
    }
  },

  resetAllFilters() {
    this.state.searchQuery = '';
    this.state.activeCategory = 'all';
    this.state.activeVibe = 'all';
    this.state.activePlaystyle = 'all';
    this.state.activeLength = 'any';
    this.state.activeWordCount = 'any';
    const sInput = document.getElementById('boys-search-input');
    if (sInput) sInput.value = '';
    this.syncCategoryNavUi();
    this.syncVibeCardsUi();
    this.syncSidebarUi();
    this.applyFilters(true);
    this.showToast('All filters cleared');
  },

  syncCategoryNavUi() {
    const container = document.getElementById('category-scroll-nav');
    if (!container) return;
    container.querySelectorAll('.category-chip-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.cat === this.state.activeCategory);
    });
  },

  syncVibeCardsUi() {
    const grid = document.getElementById('vibe-cards-grid');
    if (!grid) return;
    grid.querySelectorAll('.vibe-item-card').forEach(c => {
      c.classList.toggle('active', c.dataset.vibe === this.state.activeVibe);
    });
  },

  syncSidebarUi() {
    document.querySelectorAll('.sidebar-filter-btn').forEach(btn => {
      const type = btn.dataset.filterType;
      const val = btn.dataset.filterVal;
      if (type === 'playstyle') btn.classList.toggle('active', this.state.activePlaystyle === val);
      if (type === 'length') btn.classList.toggle('active', this.state.activeLength === val);
      if (type === 'wordCount') btn.classList.toggle('active', this.state.activeWordCount === val);
    });
  },

  /* ===================================================================
     SIDEBAR FILTERS
     =================================================================== */

  initSidebarFilters() {
    document.querySelectorAll('.sidebar-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const type = btn.dataset.filterType;
        const val = btn.dataset.filterVal;

        if (type === 'playstyle') {
          this.state.activePlaystyle = (this.state.activePlaystyle === val) ? 'all' : val;
        } else if (type === 'length') {
          this.state.activeLength = (this.state.activeLength === val) ? 'any' : val;
        } else if (type === 'wordCount') {
          this.state.activeWordCount = (this.state.activeWordCount === val) ? 'any' : val;
        }

        this.syncSidebarUi();
        this.applyFilters(true);
      });
    });
  },

  /* ===================================================================
     SEMANTIC "MORE LIKE THIS" (Sections 21 & 22)
     =================================================================== */

  triggerMoreLikeThis(id) {
    const related = BoysEngine.getMoreLikeThis(id, 8);
    const target = BOYS_DATABASE.find(n => n.id === id);
    if (!target) return;

    if (related.length === 0) {
      this.showToast('No additional related names found.');
      return;
    }

    // Set results directly to target + related cluster
    this.state.currentResults = [target, ...related];
    this.state.visibleCount = 24;
    this.renderActiveFilterChips();
    this.renderNicknameGrid();
    
    // Smooth scroll up to results grid
    const grid = document.getElementById('nickname-grid');
    if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });

    this.showToast(`Showing names like "${target.baseName}"`);
  },

  /* ===================================================================
     SIMULATED GAME PREVIEW MODAL (Sections 35, 36, 37, 38, 39, 40)
     =================================================================== */

  openPreviewModal(item) {
    this.state.activeNameObj = item;
    this.state.previewStyleLevel = 'pro';
    this.state.previewContextTab = 'profile';

    const modal = document.getElementById('preview-modal');
    if (!modal) return;

    this.updatePreviewModalContent();
    modal.classList.add('active');

    // Add to recents
    this.addToRecents(item);
  },

  updatePreviewModalContent() {
    const item = this.state.activeNameObj;
    if (!item) return;

    const ign = this.getStyledNameForLevel(item.baseName, this.state.previewStyleLevel);

    // Update Profile Tab
    const profileIgn = document.getElementById('sim-profile-ign');
    if (profileIgn) profileIgn.textContent = ign;

    // Update Killfeed Tab
    const killIgn = document.getElementById('sim-killfeed-killer');
    if (killIgn) killIgn.textContent = ign;

    // Update Squad Tab
    const squadLead = document.getElementById('sim-squad-leader');
    if (squadLead) squadLead.textContent = ign;

    // Style level indicator buttons
    document.querySelectorAll('.preview-style-level-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.level === this.state.previewStyleLevel);
    });

    // Remix preview chips
    const remixContainer = document.getElementById('preview-remixes-container');
    if (remixContainer) {
      const remixes = generateRemixes(item.baseName);
      let html = '';
      remixes.forEach(r => {
        html += `<button class="btn-segmented-chip btn-preview-remix" data-remix="${this.escapeHtml(r)}">${this.escapeHtml(r)}</button>`;
      });
      remixContainer.innerHTML = html;
      remixContainer.querySelectorAll('.btn-preview-remix').forEach(rBtn => {
        rBtn.addEventListener('click', () => {
          this.copyText(rBtn.dataset.remix);
        });
      });
    }
  },

  getStyledNameForLevel(baseName, level) {
    switch (level) {
      case 'clean': return STYLE_RULES.clean(baseName);
      case 'extreme': return STYLE_RULES.extreme(baseName);
      case 'royal': return STYLE_RULES.royal(baseName);
      case 'pro':
      default: return STYLE_RULES.pro(baseName);
    }
  },

  /* ===================================================================
     LIGHTWEIGHT CUSTOMIZER MODAL (Sections 24, 25, 26, 27, 41, 42)
     =================================================================== */

  openCustomizeModal(item) {
    this.state.activeNameObj = item;
    this.state.customizerBase = item.baseName;
    this.state.customizerLeft = '亗';
    this.state.customizerRight = '亗';
    this.state.customizerStyle = 'pro';

    const modal = document.getElementById('customizer-modal');
    const input = document.getElementById('customizer-base-input');
    if (!modal || !input) return;

    input.value = item.baseName;
    this.updateCustomizerPreview();
    modal.classList.add('active');
  },

  updateCustomizerPreview() {
    const input = document.getElementById('customizer-base-input');
    const previewBox = document.getElementById('customizer-live-preview');
    const counter = document.getElementById('customizer-char-count');
    const alertBox = document.getElementById('customizer-special-alert');
    if (!input || !previewBox) return;

    const base = input.value.trim() || 'Name';
    const left = this.state.customizerLeft;
    const right = this.state.customizerRight;
    const full = `${left ? left + ' ' : ''}${base}${right ? ' ' + right : ''}`;

    previewBox.textContent = full;

    if (counter) {
      counter.textContent = `${full.length} characters`;
    }

    if (alertBox) {
      const hasUnicode = BoysEngine.hasSpecialCharacters(full);
      alertBox.style.display = hasUnicode ? 'block' : 'none';
    }
  },

  /* ===================================================================
     SAVED / FAVORITES & SHORTLIST (Sections 28, 29, 30, 60, 61)
     =================================================================== */

  toggleSave(id) {
    const item = BOYS_DATABASE.find(n => n.id === id);
    if (!item) return;

    const index = this.state.saved.findIndex(s => s.id === id);
    if (index > -1) {
      this.state.saved.splice(index, 1);
      this.showToast(`Removed "${item.baseName}" from Saved`);
    } else {
      this.state.saved.push(item);
      this.showToast(`Saved "${item.baseName}" to Favorites`);
    }

    localStorage.setItem('ff_boys_saved', JSON.stringify(this.state.saved));
    this.updateBadges();
    this.renderNicknameGrid();
    this.renderSavedDrawer();
  },

  toggleShortlist(id) {
    const item = BOYS_DATABASE.find(n => n.id === id);
    if (!item) return;

    const index = this.state.shortlist.findIndex(s => s.id === id);
    if (index > -1) {
      this.state.shortlist.splice(index, 1);
      this.showToast(`Removed "${item.baseName}" from Shortlist`);
    } else {
      this.state.shortlist.push(item);
      this.showToast(`Added "${item.baseName}" to Shortlist`);
    }

    localStorage.setItem('ff_boys_shortlist', JSON.stringify(this.state.shortlist));
    this.updateBadges();
    this.renderNicknameGrid();
    this.renderShortlistDrawer();
  },

  renderSavedDrawer() {
    const body = document.getElementById('saved-drawer-body');
    if (!body) return;

    if (this.state.saved.length === 0) {
      body.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">♡</div>
          <h4 style="color: #fff; font-family: var(--font-gaming); margin-bottom: 0.35rem;">No saved names yet</h4>
          <p style="font-size: 0.85rem;">Tap ♡ on any nickname card to save it for later.</p>
        </div>
      `;
      return;
    }

    let html = '';
    this.state.saved.forEach(item => {
      const styled = STYLE_RULES.pro(item.baseName);
      html += `
        <div class="drawer-item">
          <div>
            <div class="drawer-item-name">${this.escapeHtml(styled)}</div>
            <div style="font-size: 0.72rem; color: var(--text-muted);">${item.categories[0]} • ${item.lengthProfile}</div>
          </div>
          <div class="drawer-item-actions">
            <button class="btn-tool-action btn-copy-saved" data-copy="${this.escapeHtml(styled)}" title="Copy">📋</button>
            <button class="btn-card-icon btn-remove-saved" data-id="${item.id}" title="Remove">✕</button>
          </div>
        </div>
      `;
    });

    body.innerHTML = html;

    body.querySelectorAll('.btn-copy-saved').forEach(b => {
      b.addEventListener('click', () => this.copyText(b.dataset.copy));
    });

    body.querySelectorAll('.btn-remove-saved').forEach(b => {
      b.addEventListener('click', () => this.toggleSave(b.dataset.id));
    });
  },

  renderShortlistDrawer() {
    const body = document.getElementById('shortlist-drawer-body');
    if (!body) return;

    if (this.state.shortlist.length === 0) {
      body.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">★</div>
          <h4 style="color: #fff; font-family: var(--font-gaming); margin-bottom: 0.35rem;">Shortlist is empty</h4>
          <p style="font-size: 0.85rem;">Add names you're deciding between, compare them, or share with your squad.</p>
        </div>
      `;
      return;
    }

    let html = '';
    this.state.shortlist.forEach((item, idx) => {
      const styled = STYLE_RULES.pro(item.baseName);
      html += `
        <div class="drawer-item">
          <div>
            <div class="drawer-item-name">${idx + 1}. ${this.escapeHtml(styled)}</div>
            <div style="font-size: 0.72rem; color: var(--text-muted);">${item.categories[0]} • ${item.playstyles[0] || 'tactical'}</div>
          </div>
          <div class="drawer-item-actions">
            <button class="btn-tool-action btn-copy-shortlist-single" data-copy="${this.escapeHtml(styled)}" title="Copy">📋</button>
            <button class="btn-card-icon btn-remove-shortlist" data-id="${item.id}" title="Remove">✕</button>
          </div>
        </div>
      `;
    });

    body.innerHTML = html;

    body.querySelectorAll('.btn-copy-shortlist-single').forEach(b => {
      b.addEventListener('click', () => this.copyText(b.dataset.copy));
    });

    body.querySelectorAll('.btn-remove-shortlist').forEach(b => {
      b.addEventListener('click', () => this.toggleShortlist(b.dataset.id));
    });
  },

  updateBadges() {
    const favCount = this.state.saved.length;
    const shortCount = this.state.shortlist.length;

    // Header badges
    const favBadge = document.getElementById('fav-count-badge');
    if (favBadge) {
      favBadge.textContent = favCount;
      favBadge.style.display = favCount > 0 ? 'inline-block' : 'none';
    }

    const shortBadge = document.getElementById('shortlist-count-badge');
    if (shortBadge) {
      shortBadge.textContent = shortCount;
      shortBadge.style.display = shortCount > 0 ? 'inline-block' : 'none';
    }

    // Mobile bottom bar badges
    const mFavBadge = document.getElementById('mob-fav-badge');
    if (mFavBadge) {
      mFavBadge.textContent = favCount;
      mFavBadge.style.display = favCount > 0 ? 'inline-block' : 'none';
    }

    const mShortBadge = document.getElementById('mob-short-badge');
    if (mShortBadge) {
      mShortBadge.textContent = shortCount;
      mShortBadge.style.display = shortCount > 0 ? 'inline-block' : 'none';
    }
  },

  addToRecents(item) {
    const filtered = this.state.recents.filter(r => r.id !== item.id);
    filtered.unshift(item);
    this.state.recents = filtered.slice(0, 10);
    localStorage.setItem('ff_boys_recents', JSON.stringify(this.state.recents));
  },

  /* ===================================================================
     COMPARISON MODAL (Section 29)
     =================================================================== */

  openComparisonModal() {
    const modal = document.getElementById('comparison-modal');
    const tableBody = document.getElementById('comparison-cards-grid');
    if (!modal || !tableBody) return;

    const candidates = this.state.shortlist.slice(0, 3);
    if (candidates.length < 2) {
      this.showToast('Add at least 2 names to your Shortlist to compare them.');
      return;
    }

    let html = '';
    candidates.forEach(item => {
      const styled = STYLE_RULES.pro(item.baseName);
      html += `
        <div class="nickname-card" style="margin-bottom: 0;">
          <div class="card-nickname-text" style="font-size: 1.3rem; margin-bottom: 0.5rem;">
            ${this.escapeHtml(styled)}
          </div>
          <div style="font-size: 0.82rem; margin-bottom: 0.35rem;">
            <strong>Category:</strong> ${item.categories.join(', ')}
          </div>
          <div style="font-size: 0.82rem; margin-bottom: 0.35rem;">
            <strong>Length:</strong> ${item.baseName.length} chars (${item.lengthProfile})
          </div>
          <div style="font-size: 0.82rem; margin-bottom: 0.35rem;">
            <strong>Playstyle:</strong> ${item.playstyles.join(', ')}
          </div>
          <div style="font-size: 0.82rem; margin-bottom: 0.75rem;">
            <strong>Word Count:</strong> ${item.wordCount === 1 ? 'One Word' : 'Two Words'}
          </div>
          <button class="btn-card-copy" data-copy="${this.escapeHtml(styled)}">
            <span>📋</span> Copy
          </button>
        </div>
      `;
    });

    tableBody.innerHTML = html;
    tableBody.querySelectorAll('.btn-card-copy').forEach(b => {
      b.addEventListener('click', () => this.copyText(b.dataset.copy));
    });

    modal.classList.add('active');
  },

  /* ===================================================================
     "PICK FOR ME" 2-QUESTION MODAL (Section 33)
     =================================================================== */

  openPickForMeModal() {
    const modal = document.getElementById('pick-for-me-modal');
    if (!modal) return;
    modal.classList.add('active');
  },

  executePickForMe() {
    const ps = document.querySelector('.btn-pick-ps.active')?.dataset.ps || 'rusher';
    const vibe = document.querySelector('.btn-pick-vibe.active')?.dataset.vibe || 'pro';

    const results = BoysEngine.pickForMe(ps, vibe, 8);
    this.state.currentResults = results;
    this.state.visibleCount = 24;

    const modal = document.getElementById('pick-for-me-modal');
    if (modal) modal.classList.remove('active');

    this.renderActiveFilterChips();
    this.renderNicknameGrid();

    const grid = document.getElementById('nickname-grid');
    if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });

    this.showToast('🎯 Curated 8 names matching your playstyle!');
  },

  /* ===================================================================
     RANDOM ROULETTE REEL (Section 62)
     =================================================================== */

  openRouletteModal() {
    const modal = document.getElementById('roulette-modal');
    const display = document.getElementById('roulette-display-text');
    const spinBtn = document.getElementById('btn-spin-again');
    if (!modal || !display) return;

    modal.classList.add('active');
    this.spinRoulette(display, spinBtn);
  },

  spinRoulette(display, spinBtn) {
    if (spinBtn) spinBtn.disabled = true;

    const candidates = BoysEngine.shuffle(BOYS_DATABASE);
    let index = 0;
    let iterations = 0;
    const maxIterations = 8;
    const intervalTime = 65;

    const timer = setInterval(() => {
      const item = candidates[index % candidates.length];
      display.textContent = STYLE_RULES.pro(item.baseName);
      display.style.transform = 'scale(0.95)';
      setTimeout(() => { display.style.transform = 'scale(1)'; }, 30);
      index++;
      iterations++;

      if (iterations >= maxIterations) {
        clearInterval(timer);
        const winner = candidates[index % candidates.length];
        const winnerStyled = STYLE_RULES.pro(winner.baseName);
        display.textContent = winnerStyled;
        display.dataset.winner = winnerStyled;
        if (spinBtn) spinBtn.disabled = false;
      }
    }, intervalTime);
  },

  /* ===================================================================
     MODAL CONTROLS & EVENT WIRING
     =================================================================== */

  initModalsAndDrawers() {
    // Close on overlay click or close button
    document.querySelectorAll('.modal-close-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.boys-modal-overlay, .boys-drawer-overlay').forEach(el => {
          el.classList.remove('active');
        });
      });
    });

    document.querySelectorAll('.boys-modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.classList.remove('active');
      });
    });

    const drawerOverlay = document.getElementById('boys-drawer-overlay');
    if (drawerOverlay) {
      drawerOverlay.addEventListener('click', (e) => {
        if (e.target === drawerOverlay) drawerOverlay.classList.remove('active');
      });
    }

    // Header Drawer Toggles
    const btnNavFav = document.getElementById('btn-nav-favorites');
    if (btnNavFav) {
      btnNavFav.addEventListener('click', () => {
        this.renderSavedDrawer();
        this.openDrawer('saved');
      });
    }

    const btnNavShort = document.getElementById('btn-nav-shortlist');
    if (btnNavShort) {
      btnNavShort.addEventListener('click', () => {
        this.renderShortlistDrawer();
        this.openDrawer('shortlist');
      });
    }

    // Preview Modal Events
    this.initPreviewModalEvents();

    // Customizer Modal Events
    this.initCustomizerEvents();

    // Pick For Me Modal Events
    this.initPickForMeEvents();

    // Roulette Spin Again
    const btnSpin = document.getElementById('btn-spin-again');
    if (btnSpin) {
      btnSpin.addEventListener('click', () => {
        const display = document.getElementById('roulette-display-text');
        if (display) this.spinRoulette(display, btnSpin);
      });
    }

    const btnCopyRoulette = document.getElementById('btn-copy-roulette');
    if (btnCopyRoulette) {
      btnCopyRoulette.addEventListener('click', () => {
        const display = document.getElementById('roulette-display-text');
        if (display && display.dataset.winner) {
          this.copyText(display.dataset.winner);
        }
      });
    }

    // Shortlist Drawer Footer Actions (Copy All, Share, Compare)
    const btnCopyShortlistAll = document.getElementById('btn-copy-shortlist-all');
    if (btnCopyShortlistAll) {
      btnCopyShortlistAll.addEventListener('click', () => {
        if (this.state.shortlist.length === 0) return;
        const text = this.state.shortlist.map((item, i) => `${i + 1}. ${STYLE_RULES.pro(item.baseName)}`).join('\n');
        this.copyText(text, null, true, 'Shortlist copied to clipboard!');
      });
    }

    const btnShareShortlist = document.getElementById('btn-share-shortlist');
    if (btnShareShortlist) {
      btnShareShortlist.addEventListener('click', () => {
        if (this.state.shortlist.length === 0) return;
        const text = `Help me choose my Free Fire nickname:\n` + 
          this.state.shortlist.map((item, i) => `${i + 1}. ${STYLE_RULES.pro(item.baseName)}`).join('\n');
        if (navigator.share) {
          navigator.share({ title: 'My Free Fire Nickname Shortlist', text }).catch(() => {});
        } else {
          this.copyText(text, null, true, 'Shortlist copied for sharing!');
        }
      });
    }

    const btnCompareShortlist = document.getElementById('btn-compare-shortlist');
    if (btnCompareShortlist) {
      btnCompareShortlist.addEventListener('click', () => {
        this.openComparisonModal();
      });
    }
  },

  openDrawer(type) {
    const overlay = document.getElementById('boys-drawer-overlay');
    const savedPanel = document.getElementById('saved-drawer-panel');
    const shortPanel = document.getElementById('shortlist-drawer-panel');
    if (!overlay) return;

    if (type === 'saved') {
      if (savedPanel) savedPanel.style.display = 'flex';
      if (shortPanel) shortPanel.style.display = 'none';
    } else {
      if (savedPanel) savedPanel.style.display = 'none';
      if (shortPanel) shortPanel.style.display = 'flex';
    }

    overlay.classList.add('active');
  },

  initPreviewModalEvents() {
    // Context tabs (Profile, Killfeed, Lobby)
    document.querySelectorAll('.preview-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.preview-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tab = btn.dataset.tab;
        
        document.getElementById('sim-profile-view').style.display = tab === 'profile' ? 'block' : 'none';
        document.getElementById('sim-killfeed-view').style.display = tab === 'killfeed' ? 'block' : 'none';
        document.getElementById('sim-lobby-view').style.display = tab === 'lobby' ? 'block' : 'none';
      });
    });

    // Style level switcher (Clean, Pro, Extreme)
    document.querySelectorAll('.preview-style-level-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.state.previewStyleLevel = btn.dataset.level;
        this.updatePreviewModalContent();
      });
    });

    // "Make It Cleaner" button (Extreme -> Pro -> Clean)
    const btnCleaner = document.getElementById('btn-make-cleaner');
    if (btnCleaner) {
      btnCleaner.addEventListener('click', () => {
        if (this.state.previewStyleLevel === 'extreme') this.state.previewStyleLevel = 'pro';
        else if (this.state.previewStyleLevel === 'pro') this.state.previewStyleLevel = 'clean';
        this.updatePreviewModalContent();
      });
    }

    // "Add Style" button (Clean -> Pro -> Extreme)
    const btnBolder = document.getElementById('btn-add-style');
    if (btnBolder) {
      btnBolder.addEventListener('click', () => {
        if (this.state.previewStyleLevel === 'clean') this.state.previewStyleLevel = 'pro';
        else if (this.state.previewStyleLevel === 'pro') this.state.previewStyleLevel = 'extreme';
        this.updatePreviewModalContent();
      });
    }

    // Copy selected button
    const btnCopySelected = document.getElementById('btn-preview-copy-selected');
    if (btnCopySelected) {
      btnCopySelected.addEventListener('click', () => {
        if (this.state.activeNameObj) {
          const ign = this.getStyledNameForLevel(this.state.activeNameObj.baseName, this.state.previewStyleLevel);
          this.copyText(ign);
        }
      });
    }
  },

  initCustomizerEvents() {
    const input = document.getElementById('customizer-base-input');
    if (input) {
      input.addEventListener('input', () => this.updateCustomizerPreview());
    }

    // Frame preset buttons
    document.querySelectorAll('.btn-frame-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.btn-frame-preset').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const frameId = btn.dataset.frame;
        this.applyCustomizerFrame(frameId);
      });
    });

    // Symbol mini-picker
    const symbolsWrap = document.getElementById('customizer-symbols-wrap');
    if (symbolsWrap) {
      let html = '';
      POPULAR_SYMBOLS.forEach(sym => {
        html += `<button class="symbol-btn" data-sym="${sym}">${sym}</button>`;
      });
      symbolsWrap.innerHTML = html;

      symbolsWrap.querySelectorAll('.symbol-btn').forEach(sBtn => {
        sBtn.addEventListener('click', () => {
          const sym = sBtn.dataset.sym;
          this.state.customizerLeft = sym;
          this.state.customizerRight = sym;
          this.updateCustomizerPreview();
        });
      });
    }

    // Copy customized nickname
    const btnCopyCustom = document.getElementById('btn-customizer-copy');
    if (btnCopyCustom) {
      btnCopyCustom.addEventListener('click', () => {
        const previewBox = document.getElementById('customizer-live-preview');
        if (previewBox) {
          this.copyText(previewBox.textContent.trim());
        }
      });
    }
  },

  applyCustomizerFrame(frameId) {
    switch (frameId) {
      case 'pro_crown':
        this.state.customizerLeft = '亗';
        this.state.customizerRight = '亗';
        break;
      case 'cross':
        this.state.customizerLeft = '乂';
        this.state.customizerRight = '乂';
        break;
      case 'star':
        this.state.customizerLeft = '★';
        this.state.customizerRight = '★';
        break;
      case 'royal':
        this.state.customizerLeft = '♛';
        this.state.customizerRight = '♛';
        break;
      case 'brackets':
        this.state.customizerLeft = '『';
        this.state.customizerRight = '』';
        break;
      case 'flourish':
        this.state.customizerLeft = '꧁';
        this.state.customizerRight = '꧂';
        break;
      case 'slash':
        this.state.customizerLeft = '〆';
        this.state.customizerRight = '〆';
        break;
      case 'wings':
        this.state.customizerLeft = '彡';
        this.state.customizerRight = '彡';
        break;
      case 'none':
      default:
        this.state.customizerLeft = '';
        this.state.customizerRight = '';
        break;
    }
    this.updateCustomizerPreview();
  },

  initPickForMeEvents() {
    // Playstyle choices
    document.querySelectorAll('.btn-pick-ps').forEach(b => {
      b.addEventListener('click', () => {
        document.querySelectorAll('.btn-pick-ps').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
      });
    });

    // Vibe choices
    document.querySelectorAll('.btn-pick-vibe').forEach(b => {
      b.addEventListener('click', () => {
        document.querySelectorAll('.btn-pick-vibe').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
      });
    });

    const submitBtn = document.getElementById('btn-submit-pick-for-me');
    if (submitBtn) {
      submitBtn.addEventListener('click', () => this.executePickForMe());
    }
  },

  /* ===================================================================
     MOBILE BOTTOM NAVIGATION (Section 64)
     =================================================================== */

  initMobileBottomNav() {
    const btnBrowse = document.getElementById('mob-nav-browse');
    if (btnBrowse) {
      btnBrowse.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    const btnSearch = document.getElementById('mob-nav-search');
    if (btnSearch) {
      btnSearch.addEventListener('click', () => {
        const input = document.getElementById('boys-search-input');
        if (input) {
          input.scrollIntoView({ behavior: 'smooth', block: 'center' });
          input.focus();
        }
      });
    }

    const btnSaved = document.getElementById('mob-nav-saved');
    if (btnSaved) {
      btnSaved.addEventListener('click', () => {
        this.renderSavedDrawer();
        this.openDrawer('saved');
      });
    }

    const btnShort = document.getElementById('mob-nav-shortlist');
    if (btnShort) {
      btnShort.addEventListener('click', () => {
        this.renderShortlistDrawer();
        this.openDrawer('shortlist');
      });
    }

    const btnFilters = document.getElementById('mob-nav-filters');
    if (btnFilters) {
      btnFilters.addEventListener('click', () => {
        const sidebar = document.querySelector('.explorer-sidebar');
        if (sidebar) {
          sidebar.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }
  },

  /* ===================================================================
     CLIPBOARD COPY & TOAST
     =================================================================== */

  copyText(text, triggerBtn = null, showFullToast = true, customMsg = '') {
    if (!text) return;

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        this.onCopySuccess(text, triggerBtn, showFullToast, customMsg);
      }).catch(() => {
        this.fallbackCopy(text, triggerBtn, showFullToast, customMsg);
      });
    } else {
      this.fallbackCopy(text, triggerBtn, showFullToast, customMsg);
    }
  },

  fallbackCopy(text, triggerBtn, showFullToast, customMsg) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-999999px';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try {
      document.execCommand('copy');
      this.onCopySuccess(text, triggerBtn, showFullToast, customMsg);
    } catch (e) {
      this.showToast('Could not copy automatically. Please copy manually.');
    }
    document.body.removeChild(ta);
  },

  onCopySuccess(text, triggerBtn, showFullToast, customMsg) {
    // Record to recently copied
    const filtered = this.state.copied.filter(c => c !== text);
    filtered.unshift(text);
    this.state.copied = filtered.slice(0, 8);
    localStorage.setItem('ff_boys_copied', JSON.stringify(this.state.copied));

    // Button visual feedback
    if (triggerBtn) {
      const originalText = triggerBtn.innerHTML;
      triggerBtn.classList.add('copied');
      triggerBtn.innerHTML = '<span>✓</span> Copied!';
      setTimeout(() => {
        triggerBtn.classList.remove('copied');
        triggerBtn.innerHTML = originalText;
      }, 1500);
    }

    if (showFullToast) {
      this.showToast(customMsg || `Copied: "${text}"`);
    }
  },

  showToast(msg) {
    const toast = document.getElementById('boys-toast');
    if (!toast) return;

    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2200);
  },

  /* ===================================================================
     AMBIENT PARTICLES BACKGROUND
     =================================================================== */

  initAmbientEmbers() {
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
    const count = Math.min(28, Math.floor(width / 45));

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.8,
        speedY: Math.random() * 0.35 + 0.15,
        speedX: (Math.random() - 0.5) * 0.25,
        opacity: Math.random() * 0.45 + 0.2,
        color: Math.random() > 0.4 ? '#ff5722' : '#ffaa00'
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.y -= p.speedY;
        p.x += p.speedX;
        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      requestAnimationFrame(animate);
    }
    animate();
  },

  escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, m => {
      switch (m) {
        case '&': return '&amp;';
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '"': return '&quot;';
        case "'": return '&#039;';
        default: return m;
      }
    });
  }
};

// Bootstrap application once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  BoysApp.init();
});
