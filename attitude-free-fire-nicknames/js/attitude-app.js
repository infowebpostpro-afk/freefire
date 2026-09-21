/**
 * Attitude Free Fire Nicknames — Application Controller
 * Manages persona discovery, dual persona mixing, persona locking,
 * discovery trail, simulated gaming preview, 2-step quiz, and shortlist.
 */

const AttitudeApp = {
  state: {
    activePersonas: [], // Up to 2 personas
    lockedPersona: null,
    searchQuery: '',
    length: 'all',
    wordCount: 'all',
    appearance: 'all',
    visibleCount: 24,
    currentResults: [],

    // Persistent storage
    saved: JSON.parse(localStorage.getItem('ff_attitude_saved') || '[]'),
    shortlist: JSON.parse(localStorage.getItem('ff_attitude_shortlist') || '[]'),
    recents: JSON.parse(localStorage.getItem('ff_attitude_recents') || '[]'),

    // Discovery Trail (Breadcrumb navigation)
    discoveryTrail: [],

    // Active inspection context
    activeItem: null,
    activeStyle: 'clean',

    // Quiz State
    quizFeel: null,
    quizLook: null
  },

  init() {
    this.initAmbientParticles();
    this.initPersonaCarousel();
    this.initCombos();
    this.initSearch();
    this.initActionButtons();
    this.initModals();
    this.initCuratedCollections();
    this.initCustomize();
    this.updateBadges();

    // Instant zero-friction render
    this.applyFilters(true);
  },

  /* ===================================================================
     PERSONA SELECTION & DUAL MIXING
     =================================================================== */
  initPersonaCarousel() {
    const container = document.getElementById('persona-carousel');
    if (!container) return;

    let html = '';
    ATTITUDE_PERSONAS.forEach(p => {
      html += `
        <button class="persona-chip" data-persona="${p.id}">
          <span>${p.icon}</span> ${p.name}
        </button>
      `;
    });

    container.innerHTML = html;

    container.addEventListener('click', (e) => {
      const chip = e.target.closest('.persona-chip');
      if (!chip) return;

      const personaId = chip.dataset.persona;
      this.togglePersona(personaId);
    });
  },

  togglePersona(personaId) {
    if (this.state.lockedPersona) {
      this.unlockPersona();
    }

    const idx = this.state.activePersonas.indexOf(personaId);
    if (idx >= 0) {
      this.state.activePersonas.splice(idx, 1);
    } else {
      if (this.state.activePersonas.length >= 2) {
        // Replace oldest
        this.state.activePersonas.shift();
      }
      this.state.activePersonas.push(personaId);
    }

    this.syncPersonaUI();
    this.applyFilters(true);
  },

  syncPersonaUI() {
    const chips = document.querySelectorAll('.persona-chip');
    chips.forEach(c => {
      const pId = c.dataset.persona;
      c.classList.toggle('active', this.state.activePersonas.includes(pId));
    });

    const statusLabel = document.getElementById('persona-mix-status');
    if (statusLabel) {
      if (this.state.activePersonas.length === 2) {
        const p1 = AttitudeEngine.getPersonaById(this.state.activePersonas[0]);
        const p2 = AttitudeEngine.getPersonaById(this.state.activePersonas[1]);
        statusLabel.textContent = `Mixed: ${p1.name} + ${p2.name}`;
      } else if (this.state.activePersonas.length === 1) {
        const p1 = AttitudeEngine.getPersonaById(this.state.activePersonas[0]);
        statusLabel.textContent = `Active: ${p1.name} (Select 1 more to mix)`;
      } else {
        statusLabel.textContent = "Tap up to 2 to mix";
      }
    }
  },

  initCombos() {
    document.querySelectorAll('.combo-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        const comboStr = btn.dataset.combo;
        if (!comboStr) return;

        if (this.state.lockedPersona) {
          this.unlockPersona();
        }

        this.state.activePersonas = comboStr.split(',');
        this.syncPersonaUI();
        this.applyFilters(true);
        this.showToast(`Applied combo: ${btn.textContent}`);
      });
    });
  },

  /* ===================================================================
     PERSONA LOCK MECHANISM
     =================================================================== */
  lockPersona(personaId) {
    this.state.lockedPersona = personaId;
    this.state.activePersonas = [personaId];
    this.syncPersonaUI();

    const banner = document.getElementById('persona-lock-banner');
    const label = document.getElementById('lock-persona-label');
    const unlockBtn = document.getElementById('btn-unlock-persona');
    const personaObj = AttitudeEngine.getPersonaById(personaId);

    if (banner && label) {
      banner.classList.add('active');
      label.textContent = `${personaObj.icon} ${personaObj.name}`;
    }

    if (unlockBtn) {
      unlockBtn.onclick = () => this.unlockPersona();
    }

    this.applyFilters(true);
    this.showToast(`🔒 Persona locked: ${personaObj.name}`);
  },

  unlockPersona() {
    this.state.lockedPersona = null;
    document.getElementById('persona-lock-banner')?.classList.remove('active');
    this.applyFilters(true);
    this.showToast("Persona unlocked. Browsing all attitudes.");
  },

  /* ===================================================================
     SEARCH & QUICK SUGGESTIONS
     =================================================================== */
  initSearch() {
    const input = document.getElementById('attitude-search-input');
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
      if (!e.target.closest('.attitude-search-section')) {
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
     FILTERING & RENDERING
     =================================================================== */
  applyFilters(resetPagination = true) {
    if (resetPagination) {
      this.state.visibleCount = 24;
    }

    this.state.currentResults = AttitudeEngine.filterNames({
      personas: this.state.activePersonas,
      lockedPersona: this.state.lockedPersona,
      query: this.state.searchQuery,
      length: this.state.length,
      wordCount: this.state.wordCount,
      appearance: this.state.appearance
    });

    this.renderActiveFilterChips();
    this.renderNicknameGrid();
  },

  renderActiveFilterChips() {
    const row = document.getElementById('active-filters-row');
    if (!row) return;

    let html = '';

    if (this.state.activePersonas.length > 0 && !this.state.lockedPersona) {
      this.state.activePersonas.forEach(pId => {
        const pObj = AttitudeEngine.getPersonaById(pId);
        html += `
          <div class="active-filter-pill">
            <span>${pObj.icon} ${pObj.name}</span>
            <button data-remove-persona="${pId}">✕</button>
          </div>
        `;
      });
    }

    if (this.state.length !== 'all') {
      html += `
        <div class="active-filter-pill">
          <span>Length: ${this.state.length}</span>
          <button data-clear="length">✕</button>
        </div>
      `;
    }

    if (this.state.wordCount !== 'all') {
      html += `
        <div class="active-filter-pill">
          <span>Words: ${this.state.wordCount}</span>
          <button data-clear="wordCount">✕</button>
        </div>
      `;
    }

    if (this.state.appearance !== 'all') {
      html += `
        <div class="active-filter-pill">
          <span>Style: ${this.state.appearance}</span>
          <button data-clear="appearance">✕</button>
        </div>
      `;
    }

    row.innerHTML = html;

    row.addEventListener('click', (e) => {
      const personaBtn = e.target.closest('[data-remove-persona]');
      if (personaBtn) {
        this.togglePersona(personaBtn.dataset.removePersona);
        return;
      }

      const clearBtn = e.target.closest('[data-clear]');
      if (clearBtn) {
        const key = clearBtn.dataset.clear;
        this.state[key] = 'all';
        this.applyFilters(true);
      }
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
          <h3 class="empty-title">No matching attitude names found</h3>
          <p class="empty-text">Try clearing search, resetting persona mixes, or exploring a curated collection below.</p>
          <button class="btn-step" id="btn-empty-reset" style="display: inline-flex; margin: 0 auto;">
            Reset All Filters
          </button>
        </div>
      `;
      document.getElementById('btn-empty-reset')?.addEventListener('click', () => {
        this.state.activePersonas = [];
        this.state.lockedPersona = null;
        this.state.searchQuery = '';
        this.state.length = 'all';
        this.state.wordCount = 'all';
        this.state.appearance = 'all';
        const searchInput = document.getElementById('attitude-search-input');
        if (searchInput) searchInput.value = '';
        this.syncPersonaUI();
        this.applyFilters(true);
      });
      return;
    }

    let html = '';
    visible.forEach((item, index) => {
      const isSaved = this.state.saved.some(s => s.id === item.id);
      const personaTags = item.personas.map(p => {
        const pObj = AttitudeEngine.getPersonaById(p);
        return `<span class="card-persona-tag">${pObj.name}</span>`;
      }).join('');

      html += `
        <article class="attitude-card" data-index="${index}">
          <div class="card-persona-tags-row">
            ${personaTags}
            <span class="card-spec-tag">• ${item.lengthProfile.toUpperCase()}</span>
          </div>

          <div class="card-nickname-display" id="card-name-${index}">
            ${item.rendered}
          </div>

          <button class="btn-copy-name" data-action="copy" data-index="${index}">
            <span>📋</span> Copy Name
          </button>

          <div class="card-secondary-actions">
            <button class="card-action-btn ${isSaved ? 'active' : ''}" data-action="save" data-index="${index}" title="Save to Favorites">
              <span>${isSaved ? '♥' : '♡'}</span> Save
            </button>
            <button class="card-action-btn" data-action="similar" data-index="${index}" title="Discover Similar Names">
              <span>↻</span> Similar
            </button>
            <button class="card-action-btn" data-action="preview" data-index="${index}" title="Inspect Gaming Context">
              <span>👁</span> Preview
            </button>
            <button class="card-action-btn" data-action="style" data-index="${index}" title="Style Finishing">
              <span>✨</span> Style
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
     CARD ACTIONS & DISCOVERY TRAIL
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
        this.toggleSaveName(item);
      } else if (action === 'similar' && item) {
        this.pushDiscoveryTrail(item);
        this.exploreSimilarNames(item);
      } else if (action === 'preview' && item) {
        this.openPreviewModal(item);
      } else if (action === 'style' && item) {
        this.openPreviewModal(item, true); // scroll to style buttons
      }
    });

    loadMoreBtn?.addEventListener('click', () => {
      this.state.visibleCount += 24;
      this.renderNicknameGrid();
    });

    // Trail Back button
    document.getElementById('btn-trail-back')?.addEventListener('click', () => {
      this.popDiscoveryTrail();
    });

    // Control bar triggers
    document.getElementById('btn-shuffle')?.addEventListener('click', () => {
      this.shuffleResults();
    });

    document.getElementById('btn-pick-for-me')?.addEventListener('click', () => {
      this.openPickForMeModal();
    });

    document.getElementById('btn-open-quiz')?.addEventListener('click', () => {
      this.openQuizModal();
    });
  },

  pushDiscoveryTrail(item) {
    if (!this.state.discoveryTrail.some(t => t.id === item.id)) {
      this.state.discoveryTrail.push(item);
      this.renderDiscoveryTrail();
    }
  },

  popDiscoveryTrail() {
    if (this.state.discoveryTrail.length > 1) {
      this.state.discoveryTrail.pop(); // Remove current
      const previous = this.state.discoveryTrail[this.state.discoveryTrail.length - 1];
      this.renderDiscoveryTrail();
      this.exploreSimilarNames(previous, false);
    } else {
      this.state.discoveryTrail = [];
      document.getElementById('discovery-trail-bar')?.classList.remove('active');
      this.applyFilters(true);
    }
  },

  renderDiscoveryTrail() {
    const bar = document.getElementById('discovery-trail-bar');
    const container = document.getElementById('trail-crumbs-container');
    if (!bar || !container) return;

    if (this.state.discoveryTrail.length === 0) {
      bar.classList.remove('active');
      return;
    }

    bar.classList.add('active');
    container.innerHTML = this.state.discoveryTrail.map((t, idx) => {
      const isLast = idx === this.state.discoveryTrail.length - 1;
      return `
        <span class="trail-crumb-item ${isLast ? 'current' : ''}" onclick="AttitudeApp.jumpToTrail(${idx})">${t.baseName}</span>
        ${!isLast ? '<span class="trail-arrow">→</span>' : ''}
      `;
    }).join('');
  },

  jumpToTrail(index) {
    this.state.discoveryTrail = this.state.discoveryTrail.slice(0, index + 1);
    const target = this.state.discoveryTrail[index];
    this.renderDiscoveryTrail();
    this.exploreSimilarNames(target, false);
  },

  exploreSimilarNames(item, shouldScroll = true) {
    const similar = AttitudeEngine.getMoreLikeThis(item.id);
    this.state.currentResults = similar.map(s => ({
      ...s,
      rendered: s.baseName,
      appearance: 'clean',
      stats: AttitudeEngine.calculateStats(s.baseName, s.baseName)
    }));

    this.renderNicknameGrid();
    this.showToast(`Showing names similar to ${item.baseName}`);
    if (shouldScroll) {
      document.getElementById('nickname-grid')?.scrollIntoView({ behavior: 'smooth' });
    }
  },

  shuffleResults() {
    this.state.currentResults.sort(() => 0.5 - Math.random());
    this.renderNicknameGrid();
    this.showToast("Shuffled results.");
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

    this.showToast("Nickname copied.");
    this.addToRecents(text);
  },

  showToast(message) {
    const toast = document.getElementById('attitude-toast');
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
    this.state.recents = [text, ...this.state.recents.filter(r => r !== text)].slice(0, 30);
    localStorage.setItem('ff_attitude_recents', JSON.stringify(this.state.recents));
  },

  /* ===================================================================
     QUICK VIEW / SIMULATED GAMING PREVIEW
     =================================================================== */
  openPreviewModal(item, scrollToStyle = false) {
    this.state.activeItem = item;
    this.state.activeStyle = 'clean';
    const modal = document.getElementById('preview-modal');
    if (!modal) return;

    this.updatePreviewDisplay();

    // Similar vs Opposite setup
    this.renderSimilarOppositeTabs(item);

    // Style switcher button clicks
    const styleButtons = modal.querySelectorAll('.style-switch-btn');
    styleButtons.forEach(btn => {
      btn.onclick = () => {
        styleButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.state.activeStyle = btn.dataset.style;
        this.updatePreviewDisplay();
      };
    });

    // Step Cleaner / Bolder
    document.getElementById('btn-step-cleaner').onclick = () => {
      const current = document.getElementById('modal-player-nickname').textContent;
      const cleaned = AttitudeEngine.stepCleaner(current, this.state.activeItem.baseName);
      this.setModalRendered(cleaned);
      this.showToast("Simplified appearance.");
    };

    document.getElementById('btn-step-bolder').onclick = () => {
      const current = document.getElementById('modal-player-nickname').textContent;
      const bolder = AttitudeEngine.stepBolder(current, this.state.activeItem.baseName);
      this.setModalRendered(bolder);
      this.showToast("Increased attitude bolding.");
    };

    // Context tabs (Profile, Squad, Match Feed)
    const contextTabs = modal.querySelectorAll('.preview-tab-btn');
    contextTabs.forEach(btn => {
      btn.onclick = () => {
        contextTabs.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const targetTab = btn.dataset.tab;
        document.getElementById('context-profile').style.display = targetTab === 'profile' ? 'block' : 'none';
        document.getElementById('context-squad').style.display = targetTab === 'squad' ? 'block' : 'none';
        document.getElementById('context-feed').style.display = targetTab === 'feed' ? 'flex' : 'none';
      };
    });

    // Lock Persona from modal
    document.getElementById('btn-modal-lock-persona').onclick = () => {
      modal.classList.remove('open');
      this.lockPersona(this.state.activeItem.personas[0]);
    };

    // Same Attitude from modal
    document.getElementById('btn-modal-same-attitude').onclick = () => {
      modal.classList.remove('open');
      const same = AttitudeEngine.getSameAttitude(this.state.activeItem.id);
      this.state.currentResults = same.map(s => ({
        ...s,
        rendered: s.baseName,
        appearance: 'clean',
        stats: AttitudeEngine.calculateStats(s.baseName, s.baseName)
      }));
      this.renderNicknameGrid();
      this.showToast(`Browsing other ${this.state.activeItem.personas[0]} names`);
    };

    // Copy actions in modal
    document.getElementById('btn-modal-copy-styled').onclick = () => {
      const current = document.getElementById('modal-player-nickname').textContent;
      this.copyNickname(current);
    };

    document.getElementById('btn-modal-copy-clean').onclick = () => {
      this.copyNickname(this.state.activeItem.baseName);
    };

    modal.classList.add('open');

    if (scrollToStyle) {
      setTimeout(() => {
        modal.querySelector('.style-switcher-row')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  },

  updatePreviewDisplay() {
    const styled = AttitudeEngine.applyStyle(this.state.activeItem.baseName, this.state.activeStyle);
    this.setModalRendered(styled);
  },

  setModalRendered(styledText) {
    document.getElementById('modal-player-nickname').textContent = styledText;
    document.getElementById('squad-slot-selected').textContent = styledText;
    document.getElementById('feed-killer-name').textContent = styledText;

    // Readability scale
    document.getElementById('read-small').textContent = styledText;
    document.getElementById('read-norm').textContent = styledText;
    document.getElementById('read-large').textContent = styledText;

    const personasStr = this.state.activeItem.personas.map(p => AttitudeEngine.getPersonaById(p).name).join(' • ');
    document.getElementById('modal-player-persona-sub').textContent = `${personasStr} • Attitude Identity`;
  },

  renderSimilarOppositeTabs(item) {
    const { similar, opposite } = AttitudeEngine.getSimilarAndOpposite(item.id);
    const container = document.getElementById('sim-opp-list');
    const tabSim = document.getElementById('tab-btn-similar');
    const tabOpp = document.getElementById('tab-btn-opposite');

    const renderList = (items) => {
      container.innerHTML = items.map(s => `
        <div class="sim-item-row">
          <div>
            <strong style="color: #fff; font-family: var(--font-display);">${s.baseName}</strong>
            <span style="font-size: 0.72rem; color: var(--text-muted); margin-left: 0.5rem;">${s.personas.join(', ')}</span>
          </div>
          <button class="btn-step" style="padding: 0.2rem 0.6rem; font-size: 0.74rem;" onclick="AttitudeApp.copyNickname('${s.baseName}')">Copy</button>
        </div>
      `).join('');
    };

    renderList(similar);

    tabSim.onclick = () => {
      tabSim.classList.add('active');
      tabOpp.classList.remove('active');
      renderList(similar);
    };

    tabOpp.onclick = () => {
      tabOpp.classList.add('active');
      tabSim.classList.remove('active');
      renderList(opposite);
    };
  },

  /* ===================================================================
     2-STEP PICK MY ATTITUDE QUIZ
     =================================================================== */
  openQuizModal() {
    const modal = document.getElementById('quiz-modal');
    if (!modal) return;

    this.state.quizFeel = null;
    this.state.quizLook = null;

    document.getElementById('quiz-step-1').style.display = 'block';
    document.getElementById('quiz-step-2').style.display = 'none';
    document.getElementById('quiz-results').style.display = 'none';

    modal.querySelectorAll('[data-feel]').forEach(btn => {
      btn.onclick = () => {
        this.state.quizFeel = btn.dataset.feel;
        document.getElementById('quiz-step-1').style.display = 'none';
        document.getElementById('quiz-step-2').style.display = 'block';
      };
    });

    modal.querySelectorAll('[data-look]').forEach(btn => {
      btn.onclick = () => {
        this.state.quizLook = btn.dataset.look;
        document.getElementById('quiz-step-2').style.display = 'none';
        this.renderQuizResults();
      };
    });

    document.getElementById('btn-quiz-restart').onclick = () => {
      this.openQuizModal();
    };

    modal.classList.add('open');
  },

  renderQuizResults() {
    const resultsCont = document.getElementById('quiz-results');
    const matchesList = document.getElementById('quiz-matches-list');
    resultsCont.style.display = 'block';

    const picks = AttitudeEngine.quizPick(this.state.quizFeel, this.state.quizLook);
    matchesList.innerHTML = picks.map(p => `
      <div class="sim-item-row">
        <div>
          <strong style="color: #fff; font-family: var(--font-display); font-size: 1.05rem;">${p.rendered}</strong>
          <div style="font-size: 0.72rem; color: #ffaa00;">${p.personas.join(' • ')}</div>
        </div>
        <div style="display: flex; gap: 0.35rem;">
          <button class="btn-step" style="padding: 0.25rem 0.65rem; font-size: 0.74rem;" onclick="AttitudeApp.copyNickname('${p.rendered}')">Copy</button>
          <button class="btn-step" style="padding: 0.25rem 0.65rem; font-size: 0.74rem;" onclick="AttitudeApp.toggleSaveName(AttitudeEngine.getNameItem('${p.id}'))">Save</button>
        </div>
      </div>
    `).join('');
  },

  /* ===================================================================
     PICK FOR ME RANDOMIZER
     =================================================================== */
  openPickForMeModal() {
    const modal = document.getElementById('pick-modal');
    if (!modal) return;

    const displayPick = () => {
      const pick = AttitudeEngine.pickForMe(this.state.activePersonas);
      this.currentPick = pick;
      document.getElementById('pick-nickname-display').textContent = pick.rendered;
      document.getElementById('pick-persona-sub').textContent = pick.personas.map(p => AttitudeEngine.getPersonaById(p).name).join(' • ');
    };

    displayPick();

    document.getElementById('btn-pick-keep').onclick = () => {
      if (this.currentPick) {
        this.addToShortlist(this.currentPick);
        modal.classList.remove('open');
      }
    };

    document.getElementById('btn-pick-copy').onclick = () => {
      if (this.currentPick) {
        this.copyNickname(this.currentPick.rendered);
      }
    };

    document.getElementById('btn-pick-again').onclick = () => {
      displayPick();
    };

    modal.classList.add('open');
  },

  /* ===================================================================
     FAVORITES & SHORTLIST
     =================================================================== */
  toggleSaveName(item) {
    const existsIdx = this.state.saved.findIndex(s => s.id === item.id);
    if (existsIdx >= 0) {
      this.state.saved.splice(existsIdx, 1);
      this.showToast("Removed from saved library.");
    } else {
      this.state.saved.push(item);
      this.addToShortlist(item, false);
      this.showToast("Saved to favorites!");
    }

    localStorage.setItem('ff_attitude_saved', JSON.stringify(this.state.saved));
    this.updateBadges();
    this.renderNicknameGrid();
  },

  addToShortlist(item, showNotification = true) {
    if (!this.state.shortlist.some(s => s.id === item.id)) {
      this.state.shortlist.push(item);
      localStorage.setItem('ff_attitude_shortlist', JSON.stringify(this.state.shortlist));
      this.updateBadges();
      if (showNotification) {
        this.showToast("Added to shortlist!");
      }
    }
  },

  renderSavedDrawer() {
    const container = document.getElementById('saved-list-container');
    if (!container) return;

    if (this.state.saved.length === 0) {
      container.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 2rem;">No saved nicknames yet. Tap ♡ Save on any name to bookmark it.</div>`;
      return;
    }

    container.innerHTML = this.state.saved.map((item, idx) => `
      <div class="sim-item-row">
        <div>
          <strong style="color: #fff; font-family: var(--font-display); font-size: 1.05rem;">${item.baseName}</strong>
          <div style="font-size: 0.72rem; color: var(--text-muted);">${item.personas.join(' • ')}</div>
        </div>
        <div style="display: flex; gap: 0.35rem;">
          <button class="btn-step" style="padding: 0.25rem 0.6rem; font-size: 0.74rem;" onclick="AttitudeApp.copyNickname('${item.baseName}')">Copy</button>
          <button class="btn-step" style="padding: 0.25rem 0.6rem; font-size: 0.74rem; color: #ff2a5f;" onclick="AttitudeApp.removeSaved(${idx})">✕</button>
        </div>
      </div>
    `).join('');
  },

  removeSaved(index) {
    this.state.saved.splice(index, 1);
    localStorage.setItem('ff_attitude_saved', JSON.stringify(this.state.saved));
    this.updateBadges();
    this.renderSavedDrawer();
    this.renderNicknameGrid();
  },

  renderShortlistModal() {
    const container = document.getElementById('shortlist-container');
    const compareView = document.getElementById('shortlist-compare-view');
    if (!container) return;

    compareView.style.display = 'none';

    if (this.state.shortlist.length === 0) {
      container.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 2rem;">Your shortlist is empty. Save or "Keep" names to compare finalists.</div>`;
      return;
    }

    container.innerHTML = this.state.shortlist.map((item, idx) => `
      <div class="sim-item-row">
        <div>
          <strong style="color: #fff; font-family: var(--font-display); font-size: 1.05rem;">${item.baseName}</strong>
          <div style="font-size: 0.72rem; color: #ffaa00;">${item.personas.join(' • ')}</div>
        </div>
        <div style="display: flex; gap: 0.35rem;">
          <button class="btn-step" style="padding: 0.25rem 0.6rem; font-size: 0.74rem;" onclick="AttitudeApp.copyNickname('${item.baseName}')">Copy</button>
          <button class="btn-step" style="padding: 0.25rem 0.6rem; font-size: 0.74rem; color: #ff2a5f;" onclick="AttitudeApp.removeShortlist(${idx})">✕</button>
        </div>
      </div>
    `).join('');
  },

  removeShortlist(index) {
    this.state.shortlist.splice(index, 1);
    localStorage.setItem('ff_attitude_shortlist', JSON.stringify(this.state.shortlist));
    this.updateBadges();
    this.renderShortlistModal();
  },

  renderCompareView() {
    const compareView = document.getElementById('shortlist-compare-view');
    const grid = document.getElementById('compare-grid');
    if (!compareView || !grid) return;

    if (this.state.shortlist.length === 0) return;

    compareView.style.display = 'block';
    const items = this.state.shortlist.slice(0, 4);

    grid.innerHTML = items.map(item => `
      <div class="compare-card">
        <div>
          <div class="compare-card-title">${item.baseName}</div>
          <div class="compare-card-meta">
            <div><strong>Persona:</strong> ${item.personas.join(' / ')}</div>
            <div><strong>Length:</strong> ${item.lengthProfile}</div>
            <div><strong>Concepts:</strong> ${item.concepts.slice(0, 2).join(', ')}</div>
          </div>
        </div>
        <button class="btn-copy-name" style="margin-bottom: 0;" onclick="AttitudeApp.copyNickname('${item.baseName}')">
          Copy Name
        </button>
      </div>
    `).join('');
  },

  updateBadges() {
    const savedBadge = document.getElementById('saved-count-badge');
    const shortlistBadge = document.getElementById('shortlist-count-badge');

    if (savedBadge) {
      savedBadge.textContent = this.state.saved.length;
      savedBadge.style.display = this.state.saved.length > 0 ? 'inline-block' : 'none';
    }

    if (shortlistBadge) {
      shortlistBadge.textContent = this.state.shortlist.length;
      shortlistBadge.style.display = this.state.shortlist.length > 0 ? 'inline-block' : 'none';
    }
  },

  /* ===================================================================
     CUSTOMIZE FINISHING MODAL
     =================================================================== */
  initCustomize() {
    const modal = document.getElementById('customize-modal');
    const triggerBtn = document.getElementById('btn-open-customize');
    const baseInput = document.getElementById('cust-base-input');
    const previewText = document.getElementById('cust-preview-text');
    let currentStyle = 'pro';

    const updateCust = () => {
      const base = baseInput.value.trim() || "Rogue";
      previewText.textContent = AttitudeEngine.applyStyle(base, currentStyle);
    };

    triggerBtn?.addEventListener('click', () => {
      if (this.state.activeItem) {
        baseInput.value = this.state.activeItem.baseName;
      }
      updateCust();
      modal.classList.add('open');
    });

    baseInput?.addEventListener('input', updateCust);

    modal?.querySelectorAll('.cust-style-btn').forEach(btn => {
      btn.onclick = () => {
        modal.querySelectorAll('.cust-style-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentStyle = btn.dataset.style;
        updateCust();
      };
    });

    document.getElementById('btn-cust-copy')?.addEventListener('click', () => {
      this.copyNickname(previewText.textContent);
    });
  },

  /* ===================================================================
     CURATED COLLECTIONS SECTION
     =================================================================== */
  initCuratedCollections() {
    const container = document.getElementById('collections-grid');
    if (!container) return;

    container.innerHTML = CURATED_COLLECTIONS.map(col => `
      <div class="collection-card" data-persona="${col.persona}">
        <div>
          <div class="col-card-header">
            <div class="col-card-title">
              <span>${col.icon}</span> ${col.title}
            </div>
            <span class="col-card-badge">${col.badge}</span>
          </div>
          <div class="col-card-names">
            ${col.names.join(' • ')}
          </div>
        </div>
        <div class="col-card-footer">
          Explore Pack →
        </div>
      </div>
    `).join('');

    container.addEventListener('click', (e) => {
      const card = e.target.closest('.collection-card');
      if (!card) return;

      const personaId = card.dataset.persona;
      this.state.activePersonas = [personaId];
      this.syncPersonaUI();
      this.applyFilters(true);
      document.getElementById('nickname-grid')?.scrollIntoView({ behavior: 'smooth' });
    });
  },

  /* ===================================================================
     MODALS SETUP & EVENTS
     =================================================================== */
  initModals() {
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

    // Nav Saved button
    document.getElementById('btn-nav-saved')?.addEventListener('click', () => {
      this.renderSavedDrawer();
      document.getElementById('saved-modal')?.classList.add('open');
    });

    // Nav Shortlist button
    document.getElementById('btn-nav-shortlist')?.addEventListener('click', () => {
      this.renderShortlistModal();
      document.getElementById('shortlist-modal')?.classList.add('open');
    });

    // Shortlist actions
    document.getElementById('btn-shortlist-compare')?.addEventListener('click', () => {
      this.renderCompareView();
    });

    document.getElementById('btn-shortlist-copy-all')?.addEventListener('click', () => {
      if (this.state.shortlist.length === 0) return;
      const text = this.state.shortlist.map(s => s.baseName).join('\n');
      this.copyNickname(text);
    });

    document.getElementById('btn-shortlist-share')?.addEventListener('click', () => {
      if (this.state.shortlist.length === 0) return;
      const text = "Help me choose my Free Fire nickname:\n\n" + 
        this.state.shortlist.map((s, i) => `${i + 1}. ${s.baseName}`).join('\n');

      if (navigator.share) {
        navigator.share({ title: 'Free Fire Nickname Shortlist', text: text });
      } else {
        this.copyNickname(text);
        this.showToast("Shortlist copied for sharing.");
      }
    });

    // Filters modal
    const filterModal = document.getElementById('filter-modal');
    document.getElementById('btn-open-filter')?.addEventListener('click', () => {
      filterModal?.classList.add('open');
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
      filterModal?.classList.remove('open');
      this.applyFilters(true);
    });

    document.getElementById('btn-reset-filters')?.addEventListener('click', () => {
      this.state.length = 'all';
      this.state.wordCount = 'all';
      this.state.appearance = 'all';
      filterModal?.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.val === 'all');
      });
      filterModal?.classList.remove('open');
      this.applyFilters(true);
    });
  },

  /* ===================================================================
     AMBIENT PARTICLES BACKGROUND
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
    for (let i = 0; i < 26; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.8,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: -Math.random() * 0.4 - 0.2,
        opacity: Math.random() * 0.5 + 0.2,
        color: Math.random() > 0.4 ? '#ff5722' : '#ff2a5f'
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

// Boot on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  AttitudeApp.init();
});
