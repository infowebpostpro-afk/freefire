/**
 * Free Fire Name Ideas — Main Application Controller
 * Manages Vibe Filters, Seed Personalization, Name DNA,
 * Signature "More Like This", Word Locking (🔒), Finalists Shortlist Tray,
 * One-Tap Copy, Undo History, and Cross-Tool Styling Handoff.
 */

const IdeasApp = {
  state: {
    vibe: 'all',
    length: 'any',
    seed: '',
    lockedPart: null,
    lockPosition: 'prefix', // 'prefix' | 'suffix'
    activeRemix: null, // target name for "More Like This"
    visibleLimit: 18,
    finalists: JSON.parse(localStorage.getItem('ff_name_ideas_finalists') || '[]'),
    history: [], // For undo functionality
    currentResults: []
  },

  init() {
    this.initCanvasBackground();
    this.initVibeFilters();
    this.initLengthFilters();
    this.initSeedInput();
    this.initSurpriseMe();
    this.initWordLocking();
    this.initFinalistsTray();
    this.initFaqAccordion();
    this.initActionListeners();
    this.refreshData();
  },

  // 1. Subtle Ambient Particle Background
  initCanvasBackground() {
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
    const particleCount = Math.min(24, Math.floor(width / 50));

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -Math.random() * 0.35 - 0.1,
        alpha: Math.random() * 0.35 + 0.1,
        color: Math.random() > 0.5 ? '#ff5722' : '#ffaa00'
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });
      requestAnimationFrame(animate);
    }
    animate();
  },

  // 2. Vibe Filter Chips
  initVibeFilters() {
    const container = document.getElementById('vibe-chips-row');
    if (!container) return;

    container.addEventListener('click', (e) => {
      const chip = e.target.closest('.vibe-chip');
      if (!chip) return;

      const vibe = chip.dataset.vibe;
      if (this.state.vibe === vibe && !this.state.activeRemix) return;

      this.saveHistory();
      this.state.vibe = vibe;
      this.state.activeRemix = null; // Exit remix mode on explicit vibe change
      this.state.visibleLimit = 18;

      // Update active UI classes
      container.querySelectorAll('.vibe-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      this.refreshData();
    });
  },

  // 3. Length Filter Selector
  initLengthFilters() {
    const lengthGroup = document.getElementById('length-filter-group');
    if (!lengthGroup) return;

    lengthGroup.addEventListener('click', (e) => {
      const btn = e.target.closest('.length-btn');
      if (!btn) return;

      const len = btn.dataset.length;
      if (this.state.length === len) return;

      this.saveHistory();
      this.state.length = len;
      this.state.visibleLimit = 18;

      lengthGroup.querySelectorAll('.length-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      this.refreshData();
    });
  },

  // 4. Seed Word Input
  initSeedInput() {
    const input = document.getElementById('ideas-seed-input');
    const clearBtn = document.getElementById('seed-clear-btn');
    const findBtn = document.getElementById('btn-find-ideas');

    if (input) {
      let debounceTimer = null;
      input.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          this.state.seed = e.target.value.trim();
          this.state.activeRemix = null;
          this.state.visibleLimit = 18;
          this.refreshData();
        }, 250);
      });

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.state.seed = input.value.trim();
          this.state.activeRemix = null;
          this.refreshData();
        }
      });
    }

    if (clearBtn && input) {
      clearBtn.addEventListener('click', () => {
        input.value = '';
        input.focus();
        this.state.seed = '';
        this.refreshData();
      });
    }

    if (findBtn && input) {
      findBtn.addEventListener('click', () => {
        this.state.seed = input.value.trim();
        this.state.activeRemix = null;
        this.refreshData();
        const resultsEl = document.getElementById('ideas-results-section');
        if (resultsEl) {
          resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }
  },

  // 5. "Surprise Me" Discovery Action
  initSurpriseMe() {
    const surpriseBtn = document.getElementById('btn-surprise-me');
    if (!surpriseBtn) return;

    surpriseBtn.addEventListener('click', () => {
      this.saveHistory();
      const surpriseItem = IdeasEngine.surpriseMe();
      if (!surpriseItem) return;

      this.showToast(`✨ Surprise discovery: ${surpriseItem.baseName}`);
      this.state.activeRemix = surpriseItem.baseName;
      this.state.vibe = surpriseItem.vibes[0] || 'all';
      this.syncVibeChips();
      this.refreshData();

      const resultsEl = document.getElementById('ideas-results-section');
      if (resultsEl) {
        resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  },

  // 6. Word Locking Feature (🔒)
  initWordLocking() {
    const lockBar = document.getElementById('word-lock-bar');
    const unlockBtn = document.getElementById('btn-unlock-word');

    if (unlockBtn) {
      unlockBtn.addEventListener('click', () => {
        this.state.lockedPart = null;
        this.refreshData();
        this.showToast("Word lock released.");
      });
    }

    // Modal / Prompt for locking
    const lockModal = document.getElementById('lock-modal');
    const lockForm = document.getElementById('lock-form');
    const lockWordInput = document.getElementById('lock-word-input');

    if (lockForm && lockWordInput) {
      lockForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const word = lockWordInput.value.trim();
        if (word) {
          const position = document.querySelector('input[name="lock-pos"]:checked')?.value || 'prefix';
          this.setWordLock(word, position);
          if (lockModal) lockModal.classList.remove('is-open');
        }
      });
    }
  },

  setWordLock(word, position = 'prefix') {
    this.saveHistory();
    this.state.lockedPart = word;
    this.state.lockPosition = position;
    this.state.activeRemix = null;
    this.state.visibleLimit = 18;
    this.refreshData();
    this.showToast(`🔒 Locked "${word}" as ${position}. Generating combinations...`);
  },

  // 7. Finalists Tray & Shortlist Modal
  initFinalistsTray() {
    const dockBtn = document.getElementById('finalists-dock-btn');
    const headerSavedBtn = document.getElementById('btn-nav-saved');
    const modal = document.getElementById('finalists-modal');
    const closeBtns = modal ? modal.querySelectorAll('.modal-close-btn, .modal-overlay-bg') : [];

    const openModal = () => {
      this.renderFinalistsList();
      if (modal) {
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
      }
    };

    const closeModal = () => {
      if (modal) {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
      }
    };

    if (dockBtn) dockBtn.addEventListener('click', openModal);
    if (headerSavedBtn) headerSavedBtn.addEventListener('click', openModal);
    closeBtns.forEach(btn => btn.addEventListener('click', closeModal));

    // Clear all finalists button
    const clearAllBtn = document.getElementById('btn-clear-finalists');
    if (clearAllBtn) {
      clearAllBtn.addEventListener('click', () => {
        if (confirm("Remove all saved candidates from your finalists shortlist?")) {
          this.state.finalists = [];
          this.saveFinalists();
          this.renderFinalistsList();
          this.renderCards();
          this.updateFinalistsBadges();
          this.showToast("Finalists shortlist cleared.");
        }
      });
    }
  },

  // 8. FAQ Accordion
  initFaqAccordion() {
    const faqContainer = document.querySelector('.ideas-faq-list');
    if (!faqContainer) return;

    faqContainer.addEventListener('click', (e) => {
      const qBtn = e.target.closest('.faq-question');
      if (!qBtn) return;

      const item = qBtn.closest('.faq-item');
      const isExpanded = qBtn.getAttribute('aria-expanded') === 'true';

      // Toggle state
      qBtn.setAttribute('aria-expanded', String(!isExpanded));
      item.classList.toggle('is-open', !isExpanded);
    });
  },

  // 9. Card Actions & Controls
  initActionListeners() {
    const cardsGrid = document.getElementById('ideas-cards-grid');
    if (cardsGrid) {
      cardsGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.idea-card');
        if (!card) return;
        const name = card.dataset.name;

        // Copy button
        const copyBtn = e.target.closest('.btn-card-copy');
        if (copyBtn) {
          e.stopPropagation();
          this.copyToClipboard(name);
          return;
        }

        // Save / Finalist button
        const saveBtn = e.target.closest('.btn-card-save');
        if (saveBtn) {
          e.stopPropagation();
          this.toggleFinalist(name, card.dataset.dna);
          return;
        }

        // More Like This button
        const mltBtn = e.target.closest('.btn-card-more');
        if (mltBtn) {
          e.stopPropagation();
          this.triggerMoreLikeThis(name);
          return;
        }

        // Lock button
        const lockBtn = e.target.closest('.btn-card-lock');
        if (lockBtn) {
          e.stopPropagation();
          this.openQuickLock(name);
          return;
        }
      });
    }

    // Load more button
    const loadMoreBtn = document.getElementById('btn-load-more');
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => {
        this.state.visibleLimit += 18;
        this.renderCards();
      });
    }

    // Reset remix button
    const clearRemixBtn = document.getElementById('btn-clear-remix');
    if (clearRemixBtn) {
      clearRemixBtn.addEventListener('click', () => {
        this.state.activeRemix = null;
        this.refreshData();
      });
    }

    // Undo button
    const undoBtn = document.getElementById('btn-undo-action');
    if (undoBtn) {
      undoBtn.addEventListener('click', () => {
        this.undo();
      });
    }

    // Jump to tool buttons
    document.querySelectorAll('.jump-to-tool-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const toolEl = document.getElementById('ideas-finder-section');
        if (toolEl) {
          toolEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  },

  // Save history state before changing
  saveHistory() {
    this.state.history.push({
      vibe: this.state.vibe,
      length: this.state.length,
      seed: this.state.seed,
      lockedPart: this.state.lockedPart,
      lockPosition: this.state.lockPosition,
      activeRemix: this.state.activeRemix
    });
    if (this.state.history.length > 10) this.state.history.shift();
    this.updateUndoButton();
  },

  undo() {
    if (this.state.history.length === 0) return;
    const prev = this.state.history.pop();
    this.state.vibe = prev.vibe;
    this.state.length = prev.length;
    this.state.seed = prev.seed;
    this.state.lockedPart = prev.lockedPart;
    this.state.lockPosition = prev.lockPosition;
    this.state.activeRemix = prev.activeRemix;

    // Sync input UI
    const seedInput = document.getElementById('ideas-seed-input');
    if (seedInput) seedInput.value = this.state.seed;

    this.syncVibeChips();
    this.syncLengthButtons();
    this.refreshData();
    this.updateUndoButton();
    this.showToast("Previous search state restored.");
  },

  updateUndoButton() {
    const undoBtn = document.getElementById('btn-undo-action');
    if (undoBtn) {
      undoBtn.disabled = this.state.history.length === 0;
      undoBtn.style.opacity = this.state.history.length === 0 ? '0.4' : '1';
    }
  },

  syncVibeChips() {
    const container = document.getElementById('vibe-chips-row');
    if (!container) return;
    container.querySelectorAll('.vibe-chip').forEach(c => {
      c.classList.toggle('active', c.dataset.vibe === this.state.vibe);
    });
  },

  syncLengthButtons() {
    const group = document.getElementById('length-filter-group');
    if (!group) return;
    group.querySelectorAll('.length-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.length === this.state.length);
    });
  },

  // Refresh data based on current state
  refreshData() {
    if (this.state.activeRemix) {
      this.state.currentResults = IdeasEngine.moreLikeThis(this.state.activeRemix);
    } else {
      this.state.currentResults = IdeasEngine.filterAndGenerate({
        vibe: this.state.vibe,
        length: this.state.length,
        seed: this.state.seed,
        lockedPart: this.state.lockedPart,
        lockPosition: this.state.lockPosition
      });
    }

    this.updateBanners();
    this.renderCards();
    this.updateFinalistsBadges();
  },

  // Update status banners (Remix banner, Lock banner)
  updateBanners() {
    // Remix banner
    const remixBanner = document.getElementById('remix-status-banner');
    const remixTargetName = document.getElementById('remix-target-name');
    if (remixBanner && remixTargetName) {
      if (this.state.activeRemix) {
        remixTargetName.textContent = this.state.activeRemix;
        remixBanner.style.display = 'flex';
      } else {
        remixBanner.style.display = 'none';
      }
    }

    // Lock banner
    const lockBanner = document.getElementById('word-lock-bar');
    const lockedWordEl = document.getElementById('locked-word-label');
    if (lockBanner && lockedWordEl) {
      if (this.state.lockedPart) {
        lockedWordEl.textContent = `🔒 Locked: [${this.state.lockedPart}] (${this.state.lockPosition})`;
        lockBanner.style.display = 'flex';
      } else {
        lockBanner.style.display = 'none';
      }
    }

    // Results count
    const countEl = document.getElementById('results-count');
    if (countEl) {
      const total = this.state.currentResults.length;
      if (this.state.activeRemix) {
        countEl.textContent = `${total} similar ideas found`;
      } else if (this.state.lockedPart) {
        countEl.textContent = `${total} locked variations`;
      } else if (this.state.seed) {
        countEl.textContent = `${total} personalized ideas for "${this.state.seed}"`;
      } else {
        countEl.textContent = `${total} Free Fire name ideas`;
      }
    }
  },

  // Render cards grid
  renderCards() {
    const grid = document.getElementById('ideas-cards-grid');
    const loadMoreBtn = document.getElementById('btn-load-more');
    if (!grid) return;

    const visibleItems = this.state.currentResults.slice(0, this.state.visibleLimit);

    if (visibleItems.length === 0) {
      grid.innerHTML = `
        <div class="empty-state-card">
          <span class="empty-icon">🔍</span>
          <h4>No matching name ideas found</h4>
          <p>Try switching the vibe filter, loosening length restrictions, or clearing your custom seed word.</p>
          <button class="btn-clear-search-empty" onclick="IdeasApp.resetFilters()">Reset All Filters</button>
        </div>
      `;
      if (loadMoreBtn) loadMoreBtn.style.display = 'none';
      return;
    }

    const savedNames = new Set(this.state.finalists.map(f => f.name));

    grid.innerHTML = visibleItems.map(item => {
      const isSaved = savedNames.has(item.baseName);
      const dna = item.dna || IdeasEngine.buildNameDNA(item.baseName, item.vibes);
      const lengthClass = item.length === 'short' ? 'pill-len-short' : 'pill-len-med';

      return `
        <div class="idea-card ${isSaved ? 'is-saved' : ''}" data-name="${item.baseName}" data-dna="${dna}">
          <div class="idea-card-header">
            <span class="card-dna-pill ${lengthClass}">
              ${dna}
            </span>
            <button class="btn-card-save ${isSaved ? 'active' : ''}" 
                    title="${isSaved ? 'Remove from finalists' : 'Save to finalists'}" 
                    aria-label="${isSaved ? 'Remove from finalists' : 'Save to finalists'}">
              <span>${isSaved ? '♥' : '♡'}</span>
            </button>
          </div>

          <div class="idea-name-display">
            <span class="name-text">${item.baseName}</span>
          </div>

          ${item.concept ? `<p class="idea-concept-hint">${item.concept}</p>` : ''}

          <div class="idea-card-actions">
            <button class="btn-card-copy" title="Copy base name" aria-label="Copy ${item.baseName}">
              <span>📋</span> Copy
            </button>
            <button class="btn-card-more" title="Find names like ${item.baseName}">
              More like this →
            </button>
            <button class="btn-card-lock" title="Lock a part of this name">
              🔒
            </button>
          </div>
        </div>
      `;
    }).join('');

    if (loadMoreBtn) {
      loadMoreBtn.style.display = (this.state.visibleLimit < this.state.currentResults.length) ? 'inline-block' : 'none';
    }
  },

  // Trigger Signature Feature: More Like This
  triggerMoreLikeThis(targetName) {
    this.saveHistory();
    this.state.activeRemix = targetName;
    this.state.lockedPart = null;
    this.state.visibleLimit = 18;
    this.refreshData();

    this.showToast(`✨ Exploring ideas similar to: ${targetName}`);

    const resultsEl = document.getElementById('ideas-results-section');
    if (resultsEl) {
      resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  },

  // Open Quick Lock action
  openQuickLock(name) {
    // Attempt to split name into prefix & suffix
    const parts = name.match(/[A-Z][a-z0-9]*/g) || [name];
    if (parts.length >= 2) {
      const pfx = parts[0];
      const sfx = parts.slice(1).join('');
      const choice = confirm(`Lock "${pfx}" to explore variations?\n\nOK: Lock "${pfx}" (Prefix)\nCancel: Lock "${sfx}" (Suffix)`);
      if (choice) {
        this.setWordLock(pfx, 'prefix');
      } else {
        this.setWordLock(sfx, 'suffix');
      }
    } else {
      this.setWordLock(name, 'prefix');
    }
  },

  // Toggle finalist in shortlist
  toggleFinalist(name, dna = "") {
    const idx = this.state.finalists.findIndex(f => f.name === name);
    if (idx >= 0) {
      this.state.finalists.splice(idx, 1);
      this.showToast(`Removed "${name}" from finalists`);
    } else {
      this.state.finalists.push({
        name,
        dna: dna || "Saved Candidate",
        timestamp: Date.now()
      });
      this.showToast(`⭐ Saved "${name}" to finalists!`);
      this.triggerDockPulse();
    }

    this.saveFinalists();
    this.renderCards();
    this.updateFinalistsBadges();
  },

  saveFinalists() {
    localStorage.setItem('ff_name_ideas_finalists', JSON.stringify(this.state.finalists));
  },

  triggerDockPulse() {
    const dockBtn = document.getElementById('finalists-dock-btn');
    if (dockBtn) {
      dockBtn.classList.add('dock-pulse');
      setTimeout(() => dockBtn.classList.remove('dock-pulse'), 800);
    }
  },

  updateFinalistsBadges() {
    const count = this.state.finalists.length;
    
    // Header badge
    const headerBadge = document.getElementById('saved-count-badge');
    if (headerBadge) {
      headerBadge.textContent = count;
      headerBadge.style.display = count > 0 ? 'inline-block' : 'none';
    }

    // Dock counter
    const dockCounter = document.getElementById('finalists-dock-count');
    const dockWrap = document.getElementById('finalists-dock-wrap');
    if (dockCounter) {
      dockCounter.textContent = count;
    }
    if (dockWrap) {
      dockWrap.style.display = count > 0 ? 'block' : 'none';
    }

    // Modal count label
    const modalCount = document.getElementById('count-finalists');
    if (modalCount) {
      modalCount.textContent = count;
    }
  },

  // Render Finalists drawer list
  renderFinalistsList() {
    const listEl = document.getElementById('finalists-list-container');
    if (!listEl) return;

    if (this.state.finalists.length === 0) {
      listEl.innerHTML = `
        <div class="empty-finalists-state">
          <span>♡</span>
          <h5>No finalists shortlisted yet</h5>
          <p>Click the <strong>♡ Save</strong> button on any name card to compare your top candidates here before choosing your final Free Fire identity.</p>
        </div>
      `;
      return;
    }

    listEl.innerHTML = this.state.finalists.map((item, idx) => {
      const cleanName = encodeURIComponent(item.name);
      return `
        <div class="finalist-item-row" data-name="${item.name}">
          <div class="finalist-left-info">
            <span class="finalist-number">#${idx + 1}</span>
            <div class="finalist-name-cluster">
              <span class="finalist-name-text">${item.name}</span>
              <span class="finalist-dna-text">${item.dna || 'Saved Candidate'}</span>
            </div>
          </div>

          <div class="finalist-actions-cluster">
            <button class="btn-finalist-copy" onclick="IdeasApp.copyToClipboard('${item.name}')" title="Copy base name">
              Copy
            </button>
            <a href="../stylish-free-fire-nicknames/?name=${cleanName}" class="btn-finalist-style" title="Send to stylish tool">
              Style Name →
            </a>
            <button class="btn-finalist-more" onclick="IdeasApp.exploreFinalistSimilar('${item.name}')" title="Explore similar">
              Similar
            </button>
            <button class="btn-finalist-remove" onclick="IdeasApp.removeFinalist('${item.name}')" title="Remove candidate">
              ✕
            </button>
          </div>
        </div>
      `;
    }).join('');
  },

  exploreFinalistSimilar(name) {
    const modal = document.getElementById('finalists-modal');
    if (modal) modal.classList.remove('is-open');
    this.triggerMoreLikeThis(name);
  },

  removeFinalist(name) {
    this.toggleFinalist(name);
    this.renderFinalistsList();
  },

  // Copy to clipboard with toast
  copyToClipboard(text) {
    if (!text) return;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        this.showToast(`✓ Copied "${text}" to clipboard!`);
      }).catch(() => {
        this.fallbackCopy(text);
      });
    } else {
      this.fallbackCopy(text);
    }
  },

  fallbackCopy(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.top = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      this.showToast(`✓ Copied "${text}" to clipboard!`);
    } catch (err) {
      this.showToast(`Error copying to clipboard`);
    }
    document.body.removeChild(textArea);
  },

  // Toast notification system
  showToast(msg) {
    const toast = document.getElementById('ideas-toast');
    const toastMsg = document.getElementById('toast-message');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = msg;
    toast.classList.add('show');

    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2400);
  },

  // Reset all filters
  resetFilters() {
    this.saveHistory();
    this.state.vibe = 'all';
    this.state.length = 'any';
    this.state.seed = '';
    this.state.lockedPart = null;
    this.state.activeRemix = null;
    this.state.visibleLimit = 18;

    const seedInput = document.getElementById('ideas-seed-input');
    if (seedInput) seedInput.value = '';

    this.syncVibeChips();
    this.syncLengthButtons();
    this.refreshData();
    this.showToast("All filters reset.");
  }
};

// Auto initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  IdeasApp.init();
});
