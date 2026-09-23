/**
 * Attitude Free Fire Nicknames — Application Controller
 * Manages vibe filtering, search, semantic remixing (More Like This),
 * multi-style customizer modal, favorites, and FAQ accordion.
 */

const AttitudeApp = {
  state: {
    activeVibe: 'all',
    searchQuery: '',
    visibleLimit: 12,
    remixTarget: null,
    favorites: JSON.parse(localStorage.getItem('ff_attitude_favs') || '[]'),
    customizingBaseName: 'DarkViper'
  },

  init() {
    this.initCanvasBackground();
    this.initVibeFilters();
    this.initSearch();
    this.initRemixBanner();
    this.initCustomizeModal();
    this.initFavoritesModal();
    this.initFaqAccordion();
    this.initActionButtons();
    this.render();
  },

  // 1. Subtle Ambient Canvas
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
    const count = Math.min(25, Math.floor(width / 45));

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.4 - 0.1,
        alpha: Math.random() * 0.35 + 0.1,
        color: Math.random() > 0.5 ? '#ff2a5f' : '#ffaa00'
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

  // 2. Vibe Filter Buttons
  initVibeFilters() {
    const vibeBtns = document.querySelectorAll('.vibe-chip');
    vibeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        vibeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.state.activeVibe = btn.dataset.vibe || 'all';
        this.state.remixTarget = null; // reset remix mode
        this.state.visibleLimit = 12;
        this.render();
      });
    });
  },

  // 3. Search & Seed Word Filter
  initSearch() {
    const input = document.getElementById('attitude-search-input');
    const clearBtn = document.getElementById('search-clear-btn');

    if (input) {
      input.addEventListener('input', (e) => {
        this.state.searchQuery = e.target.value.trim();
        this.state.remixTarget = null;
        this.state.visibleLimit = 12;
        this.render();
      });
    }

    if (clearBtn && input) {
      clearBtn.addEventListener('click', () => {
        input.value = '';
        this.state.searchQuery = '';
        this.state.visibleLimit = 12;
        this.render();
        input.focus();
      });
    }
  },

  // 4. Active Remix Status Banner
  initRemixBanner() {
    const clearRemixBtn = document.getElementById('btn-clear-remix');
    if (clearRemixBtn) {
      clearRemixBtn.addEventListener('click', () => {
        this.state.remixTarget = null;
        this.render();
      });
    }
  },

  // 5. Render Nickname Cards
  render() {
    const grid = document.getElementById('attitude-cards-grid');
    const countBadge = document.getElementById('results-count');
    const loadMoreBtn = document.getElementById('btn-load-more');
    const remixBanner = document.getElementById('remix-status-banner');
    const remixTargetLabel = document.getElementById('remix-target-name');

    if (!grid) return;

    let items = [];

    if (this.state.remixTarget) {
      // Remix Mode
      items = AttitudeEngine.remix(this.state.remixTarget);
      if (remixBanner && remixTargetLabel) {
        remixBanner.classList.add('show');
        remixTargetLabel.textContent = this.state.remixTarget.baseName;
      }
    } else {
      // Normal Filter Mode
      if (remixBanner) remixBanner.classList.remove('show');
      items = AttitudeEngine.filter(this.state.activeVibe, this.state.searchQuery);
    }

    if (countBadge) {
      countBadge.textContent = `${items.length} attitude nicknames`;
    }

    const visibleItems = items.slice(0, this.state.visibleLimit);

    if (loadMoreBtn) {
      loadMoreBtn.style.display = (this.state.visibleLimit >= items.length) ? 'none' : 'inline-flex';
    }

    if (visibleItems.length === 0) {
      grid.innerHTML = `
        <div class="empty-state-card">
          <p>No attitude nicknames found matching your criteria.</p>
          <button class="btn-reset-filters" id="btn-reset-attitude-filters">Reset Filters</button>
        </div>
      `;
      document.getElementById('btn-reset-attitude-filters')?.addEventListener('click', () => {
        this.state.activeVibe = 'all';
        this.state.searchQuery = '';
        this.state.remixTarget = null;
        const searchInput = document.getElementById('attitude-search-input');
        if (searchInput) searchInput.value = '';
        document.querySelectorAll('.vibe-chip').forEach(c => c.classList.toggle('active', c.dataset.vibe === 'all'));
        this.render();
      });
      return;
    }

    grid.innerHTML = visibleItems.map(item => {
      const isFav = this.state.favorites.some(f => f.baseName === item.baseName);

      return `
        <div class="attitude-card" data-id="${item.id}">
          <div class="attitude-card-header">
            <span class="attitude-dna-pill">${this.escapeHtml(item.dna)}</span>
            <button class="btn-fav-card ${isFav ? 'active' : ''}" data-name="${this.escapeHtml(item.baseName)}" data-dna="${this.escapeHtml(item.dna)}" title="Save to Favorites" aria-label="Save to Favorites">
              ${isFav ? '♥' : '♡'}
            </button>
          </div>

          <div class="attitude-card-body">
            <div class="attitude-card-name">${this.escapeHtml(item.baseName)}</div>
            <div class="attitude-card-meaning">${this.escapeHtml(item.meaning)}</div>
          </div>

          <div class="attitude-card-actions">
            <button class="btn-action-copy" data-copy="${this.escapeHtml(item.baseName)}" aria-label="Copy ${this.escapeHtml(item.baseName)}">
              <span>📋</span> Copy
            </button>
            <button class="btn-action-customize" data-name="${this.escapeHtml(item.baseName)}" aria-label="Customize ${this.escapeHtml(item.baseName)}">
              <span>🛠</span> Customize
            </button>
            <button class="btn-action-remix" data-id="${item.id}" aria-label="More Like This ${this.escapeHtml(item.baseName)}">
              <span>✨</span> More Like This
            </button>
          </div>
        </div>
      `;
    }).join('');

    this.attachCardEventListeners();
  },

  // 6. Attach Card Listeners (Copy, Customize, Remix, Favorites)
  attachCardEventListeners() {
    // Copy
    document.querySelectorAll('.btn-action-copy').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = btn.dataset.copy;
        this.copyToClipboard(text, btn);
      });
    });

    // Customize
    document.querySelectorAll('.btn-action-customize').forEach(btn => {
      btn.addEventListener('click', () => {
        const name = btn.dataset.name;
        this.openCustomizeModal(name);
      });
    });

    // More Like This (Remix)
    document.querySelectorAll('.btn-action-remix').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const item = ATTITUDE_DATABASE.find(d => d.id === id) || {
          id: id,
          baseName: btn.closest('.attitude-card')?.querySelector('.attitude-card-name')?.textContent || 'DarkViper',
          vibes: [this.state.activeVibe !== 'all' ? this.state.activeVibe : 'dark'],
          dna: 'Remix',
          prefix: '',
          suffix: ''
        };

        this.state.remixTarget = item;
        this.state.visibleLimit = 12;
        this.render();

        const grid = document.getElementById('attitude-cards-grid');
        grid?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        this.showToast(`Remixing ideas like "${item.baseName}"`);
      });
    });

    // Favorites
    document.querySelectorAll('.btn-fav-card').forEach(btn => {
      btn.addEventListener('click', () => {
        const name = btn.dataset.name;
        const dna = btn.dataset.dna;
        this.toggleFavorite(name, dna, btn);
      });
    });
  },

  // 7. Customize Modal
  initCustomizeModal() {
    const modal = document.getElementById('customize-modal');
    const closeBtns = modal?.querySelectorAll('.modal-close-btn, .modal-overlay-bg');
    const input = document.getElementById('cust-base-input');

    if (!modal) return;

    closeBtns?.forEach(b => b.addEventListener('click', () => {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
    }));

    if (input) {
      input.addEventListener('input', (e) => {
        this.state.customizingBaseName = e.target.value.trim() || 'DarkViper';
        this.renderCustomizeVariants();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
      }
    });
  },

  openCustomizeModal(baseName) {
    const modal = document.getElementById('customize-modal');
    const input = document.getElementById('cust-base-input');
    if (!modal) return;

    this.state.customizingBaseName = baseName || 'DarkViper';
    if (input) input.value = this.state.customizingBaseName;

    this.renderCustomizeVariants();
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  },

  renderCustomizeVariants() {
    const container = document.getElementById('customize-variants-list');
    if (!container) return;

    const variants = AttitudeEngine.customize(this.state.customizingBaseName);

    container.innerHTML = variants.map(v => {
      return `
        <div class="cust-variant-row">
          <div class="cust-variant-info">
            <span class="cust-variant-tag">${this.escapeHtml(v.tag)}</span>
            <div class="cust-variant-text">${this.escapeHtml(v.rendered)}</div>
            <div class="cust-variant-desc">${this.escapeHtml(v.desc)}</div>
          </div>
          <button class="btn-copy-variant" data-copy="${this.escapeHtml(v.rendered)}">
            <span>📋</span> Copy
          </button>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.btn-copy-variant').forEach(btn => {
      btn.addEventListener('click', () => {
        this.copyToClipboard(btn.dataset.copy, btn);
      });
    });
  },

  // 8. Favorites Modal
  initFavoritesModal() {
    const modal = document.getElementById('saved-modal');
    const openBtn = document.getElementById('btn-nav-saved');
    const closeBtns = modal?.querySelectorAll('.modal-close-btn, .modal-overlay-bg');

    if (!modal || !openBtn) return;

    this.updateSavedBadge();

    const openModal = () => {
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      this.renderSavedList();
    };

    const closeModal = () => {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
    };

    openBtn.addEventListener('click', openModal);
    closeBtns?.forEach(b => b.addEventListener('click', closeModal));
  },

  renderSavedList() {
    const container = document.getElementById('saved-list-container');
    const countSpan = document.getElementById('count-saved-names');
    if (!container) return;

    if (countSpan) countSpan.textContent = this.state.favorites.length;

    if (this.state.favorites.length === 0) {
      container.innerHTML = `
        <div class="empty-saved-message">
          <p>No saved attitude nicknames yet.</p>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.5rem;">
            Click the heart icon (♡) on any attitude nickname to save it here.
          </p>
        </div>
      `;
      return;
    }

    container.innerHTML = this.state.favorites.map((fav, index) => {
      return `
        <div class="saved-item-row">
          <div class="saved-item-text">${this.escapeHtml(fav.baseName)}</div>
          <div class="saved-item-actions">
            <button class="btn-copy-saved" data-copy="${this.escapeHtml(fav.baseName)}">Copy</button>
            <button class="btn-del-saved" data-idx="${index}">✕</button>
          </div>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.btn-copy-saved').forEach(b => {
      b.addEventListener('click', () => {
        this.copyToClipboard(b.dataset.copy, b);
      });
    });

    container.querySelectorAll('.btn-del-saved').forEach(b => {
      b.addEventListener('click', () => {
        const idx = parseInt(b.dataset.idx, 10);
        this.state.favorites.splice(idx, 1);
        localStorage.setItem('ff_attitude_favs', JSON.stringify(this.state.favorites));
        this.updateSavedBadge();
        this.renderSavedList();
        this.render();
      });
    });
  },

  toggleFavorite(baseName, dna, btnElement) {
    const idx = this.state.favorites.findIndex(f => f.baseName === baseName);
    if (idx >= 0) {
      this.state.favorites.splice(idx, 1);
      btnElement.classList.remove('active');
      btnElement.innerHTML = '♡';
      this.showToast(`Removed "${baseName}" from Saved`);
    } else {
      this.state.favorites.push({ baseName, dna, date: Date.now() });
      btnElement.classList.add('active');
      btnElement.innerHTML = '♥';
      this.showToast(`Saved "${baseName}" to Favorites!`);
    }
    localStorage.setItem('ff_attitude_favs', JSON.stringify(this.state.favorites));
    this.updateSavedBadge();
  },

  updateSavedBadge() {
    const badge = document.getElementById('saved-count-badge');
    if (!badge) return;
    const count = this.state.favorites.length;
    badge.textContent = count;
    badge.style.display = count > 0 ? 'inline-block' : 'none';
  },

  // 9. FAQ Accordion
  initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
      const questionBtn = item.querySelector('.faq-question');
      questionBtn?.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        faqItems.forEach(other => {
          other.classList.remove('open');
          other.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('open');
          questionBtn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  },

  initActionButtons() {
    // Shuffle button
    const shuffleBtn = document.getElementById('btn-shuffle');
    if (shuffleBtn) {
      shuffleBtn.addEventListener('click', () => {
        ATTITUDE_DATABASE.sort(() => Math.random() - 0.5);
        this.render();
        this.showToast(`Shuffled attitude nicknames`);
      });
    }

    // Load More button
    const loadMoreBtn = document.getElementById('btn-load-more');
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => {
        this.state.visibleLimit += 12;
        this.render();
      });
    }

    // Jump to tool CTA button
    document.querySelectorAll('.jump-to-tool-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const finder = document.getElementById('attitude-finder-section');
        finder?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  },

  copyToClipboard(text, btnElement) {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      if (btnElement) {
        const origHtml = btnElement.innerHTML;
        btnElement.classList.add('copied');
        btnElement.innerHTML = `<span>✓</span> Copied!`;
        setTimeout(() => {
          btnElement.classList.remove('copied');
          btnElement.innerHTML = origHtml;
        }, 1800);
      }
      this.showToast(`Copied: "${text}"`);
    }).catch(() => {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      this.showToast(`Copied: "${text}"`);
    });
  },

  showToast(message) {
    let toast = document.getElementById('attitude-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'attitude-toast';
      toast.className = 'attitude-toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<span>✓</span> <span>${message}</span>`;
    toast.classList.add('show');
    clearTimeout(this._toastTimeout);
    this._toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2400);
  },

  escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  AttitudeApp.init();
});
