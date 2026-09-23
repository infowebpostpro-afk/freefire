/**
 * Free Fire Nickname Transformation Application
 * Instant live name-to-styles generator with progressive levels, category filters,
 * 1-tap copy, 'Try Simpler' fallback, symbol drawer, and favorites.
 */

const StylishApp = {
  state: {
    baseName: 'Sajid',
    activeLevel: 'all', // 'all' | 'simple' | 'balanced' | 'decorated'
    activeCategory: 'all', // 'all' | 'gaming' | 'smallcaps' | 'bold' | 'gothic' | 'royal' | 'symbols'
    visibleLimit: 12,
    favorites: JSON.parse(localStorage.getItem('ff_stylish_favs') || '[]'),
    isSymbolDrawerOpen: false
  },

  init() {
    this.initCanvasBackground();
    this.initInputListeners();
    this.initFilterListeners();
    this.initSymbolDrawer();
    this.initFaqAccordion();
    this.initSavedModal();
    this.initActionButtons();
    this.render();
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
    const particleCount = Math.min(25, Math.floor(width / 45));

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.4 - 0.1,
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

  // 2. Name Input Listeners (Instant typing feedback)
  initInputListeners() {
    const input = document.getElementById('stylish-name-input');
    const clearBtn = document.getElementById('name-clear-btn');
    const randomBtn = document.getElementById('btn-random-name-input');

    if (input) {
      // Set initial value
      input.value = this.state.baseName;

      input.addEventListener('input', (e) => {
        this.state.baseName = e.target.value.trim() || 'Sajid';
        this.updateCharAdvisory();
        this.render();
      });
    }

    if (clearBtn && input) {
      clearBtn.addEventListener('click', () => {
        input.value = '';
        input.focus();
        this.state.baseName = 'Sajid';
        this.updateCharAdvisory();
        this.render();
      });
    }

    if (randomBtn && input) {
      const sampleNames = ['Shadow', 'Vortex', 'Sajid', 'Ghost', 'Nova', 'Viper', 'Rogue', 'Falcon', 'Titan', 'Alex', 'Blaze', 'Cipher'];
      randomBtn.addEventListener('click', () => {
        const next = sampleNames[Math.floor(Math.random() * sampleNames.length)];
        input.value = next;
        this.state.baseName = next;
        this.updateCharAdvisory();
        this.render();
      });
    }

    this.updateCharAdvisory();
  },

  updateCharAdvisory() {
    const advisory = document.getElementById('char-advisory-text');
    if (!advisory) return;
    const len = Array.from(this.state.baseName).length;
    advisory.textContent = `Base length: ${len} chars. Confirm final appearance & acceptance inside Free Fire.`;
  },

  // 3. Filter Listeners: Level & Category Chips
  initFilterListeners() {
    // Style Level buttons (Simple | Balanced | Decorated | All)
    const levelBtns = document.querySelectorAll('.level-btn');
    levelBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        levelBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.state.activeLevel = btn.dataset.level || 'all';
        this.state.visibleLimit = 12; // reset pagination
        this.render();
      });
    });

    // Style Category chips (All | Gaming | Small Caps | Bold | Gothic | Royal | Symbols)
    const catChips = document.querySelectorAll('.category-chip');
    catChips.forEach(chip => {
      chip.addEventListener('click', () => {
        catChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.state.activeCategory = chip.dataset.category || 'all';
        this.state.visibleLimit = 12;
        this.render();
      });
    });

    // "Show More Styles" progressive button
    const loadMoreBtn = document.getElementById('btn-load-more');
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => {
        this.state.visibleLimit += 12;
        this.render();
      });
    }
  },

  // 4. Symbol Drawer (+ Add Symbols collapsed by default)
  initSymbolDrawer() {
    const toggleBtn = document.getElementById('btn-toggle-symbols');
    const drawer = document.getElementById('symbols-drawer');
    const symbolPalette = document.getElementById('symbol-palette');
    const input = document.getElementById('stylish-name-input');

    if (!toggleBtn || !drawer) return;

    toggleBtn.addEventListener('click', () => {
      this.state.isSymbolDrawerOpen = !this.state.isSymbolDrawerOpen;
      drawer.classList.toggle('open', this.state.isSymbolDrawerOpen);
      toggleBtn.classList.toggle('active', this.state.isSymbolDrawerOpen);
      toggleBtn.innerHTML = this.state.isSymbolDrawerOpen 
        ? '<span>✕ Close Symbols</span>' 
        : '<span>+ Add Symbols</span>';
    });

    if (symbolPalette && input) {
      const symbols = [
        { label: '亗 Trident', val: '亗' },
        { label: '乂 Cross', val: '乂' },
        { label: '★ Star', val: '★' },
        { label: '♛ Crown', val: '♛' },
        { label: '♚ King', val: '♚' },
        { label: '☠ Skull', val: '☠' },
        { label: '⚡ Bolt', val: '⚡' },
        { label: '〆 Slash', val: '〆' },
        { label: '彡 Dash', val: '彡' },
        { label: '『 』 Brackets', left: '『', right: '』' },
        { label: '【 】 Box', left: '【', right: '】' },
        { label: '꧁ ꧂ Wings', left: '꧁', right: '꧂' },
        { label: '༺ ༻ Royal', left: '༺', right: '༻' },
        { label: '✦ Sparkle', val: '✦' },
        { label: '♡ Heart', val: '♡' },
        { label: '☬ Mandala', val: '☬' },
        { label: '• Dot', val: '•' }
      ];

      symbolPalette.innerHTML = symbols.map(s => {
        return `<button class="palette-chip" data-left="${s.left || ''}" data-right="${s.right || ''}" data-val="${s.val || ''}">
          ${s.label}
        </button>`;
      }).join('');

      symbolPalette.addEventListener('click', (e) => {
        const chip = e.target.closest('.palette-chip');
        if (!chip) return;

        const val = chip.dataset.val;
        const left = chip.dataset.left;
        const right = chip.dataset.right;

        let current = input.value.trim() || 'Sajid';

        if (left && right) {
          // Wrap
          current = `${left}${current}${right}`;
        } else if (val) {
          // Append or surround
          current = `${val}${current}${val}`;
        }

        input.value = current;
        this.state.baseName = current;
        this.updateCharAdvisory();
        this.render();
        this.showToast(`Applied ${chip.textContent.trim()} to name`);
      });
    }
  },

  // 5. Render Main Results Grid
  render() {
    const grid = document.getElementById('nickname-results-grid');
    const countBadge = document.getElementById('results-count');
    const loadMoreBtn = document.getElementById('btn-load-more');
    if (!grid) return;

    const allMatches = StylishEngine.generate(
      this.state.baseName,
      this.state.activeLevel,
      this.state.activeCategory
    );

    if (countBadge) {
      countBadge.textContent = `${allMatches.length} styles generated`;
    }

    const visibleItems = allMatches.slice(0, this.state.visibleLimit);

    if (loadMoreBtn) {
      loadMoreBtn.style.display = (this.state.visibleLimit >= allMatches.length) ? 'none' : 'inline-flex';
    }

    if (visibleItems.length === 0) {
      grid.innerHTML = `
        <div class="empty-state-card">
          <p>No styles found for the selected level and category.</p>
          <button class="btn-reset-filters" id="btn-reset-empty-filters">Reset Filters</button>
        </div>
      `;
      document.getElementById('btn-reset-empty-filters')?.addEventListener('click', () => {
        this.state.activeLevel = 'all';
        this.state.activeCategory = 'all';
        document.querySelectorAll('.level-btn').forEach(b => b.classList.toggle('active', b.dataset.level === 'all'));
        document.querySelectorAll('.category-chip').forEach(c => c.classList.toggle('active', c.dataset.category === 'all'));
        this.render();
      });
      return;
    }

    grid.innerHTML = visibleItems.map(item => {
      const isFav = this.state.favorites.some(f => f.rendered === item.rendered);
      const isDecoratedOrBalanced = item.level === 'decorated' || item.level === 'balanced';

      return `
        <div class="style-card" data-id="${item.id}" data-level="${item.level}">
          <div class="style-card-header">
            <span class="style-badge-tag ${item.level}">
              ${item.label} · ${this.capitalize(item.level)}
            </span>
            <button class="btn-fav-card ${isFav ? 'active' : ''}" data-rendered="${this.escapeHtml(item.rendered)}" data-label="${item.label}" title="Save to Favorites" aria-label="Save to Favorites">
              ${isFav ? '♥' : '♡'}
            </button>
          </div>

          <div class="style-card-body">
            <div class="result-rendered-text" id="styled-text-${item.id}">${this.escapeHtml(item.rendered)}</div>
            <div class="style-card-desc">${item.desc}</div>
          </div>

          <div class="style-card-actions">
            <button class="btn-copy-card" data-copy="${this.escapeHtml(item.rendered)}" aria-label="Copy ${this.escapeHtml(item.rendered)}">
              <span>📋</span> Copy
            </button>
            ${isDecoratedOrBalanced ? `
              <button class="btn-simpler-card" data-simpler-text="${this.escapeHtml(item.simplerRendered)}" data-target-id="${item.id}" title="Reduce decoration to simpler version">
                <span>🧹</span> Try Simpler
              </button>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');

    this.attachCardActionListeners();
  },

  // 6. Action Listeners on Cards (Copy, Try Simpler, Favorites)
  attachCardActionListeners() {
    // Copy button
    document.querySelectorAll('.btn-copy-card').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const text = btn.dataset.copy;
        this.copyToClipboard(text, btn);
      });
    });

    // Try Simpler button
    document.querySelectorAll('.btn-simpler-card').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const simplerText = btn.dataset.simplerText;
        const targetId = btn.dataset.targetId;
        const textEl = document.getElementById(`styled-text-${targetId}`);

        if (textEl) {
          textEl.textContent = simplerText;
          textEl.classList.add('pulse-highlight');
          setTimeout(() => textEl.classList.remove('pulse-highlight'), 600);
        }

        // Also update copy button data-copy on this card
        const card = btn.closest('.style-card');
        const copyBtn = card?.querySelector('.btn-copy-card');
        if (copyBtn) {
          copyBtn.dataset.copy = simplerText;
        }

        // Show instant option to copy simpler
        this.showToast(`Simplified to: ${simplerText}`);
      });
    });

    // Favorite heart button
    document.querySelectorAll('.btn-fav-card').forEach(btn => {
      btn.addEventListener('click', () => {
        const rendered = btn.dataset.rendered;
        const label = btn.dataset.label;
        this.toggleFavorite(rendered, label, btn);
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
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      this.showToast(`Copied: "${text}"`);
    });
  },

  toggleFavorite(rendered, label, btnElement) {
    const idx = this.state.favorites.findIndex(f => f.rendered === rendered);
    if (idx >= 0) {
      this.state.favorites.splice(idx, 1);
      btnElement.classList.remove('active');
      btnElement.innerHTML = '♡';
      this.showToast(`Removed from Saved`);
    } else {
      this.state.favorites.push({ rendered, label, date: Date.now() });
      btnElement.classList.add('active');
      btnElement.innerHTML = '♥';
      this.showToast(`Saved to Favorites!`);
    }
    localStorage.setItem('ff_stylish_favs', JSON.stringify(this.state.favorites));
    this.updateSavedBadge();
  },

  updateSavedBadge() {
    const badge = document.getElementById('saved-count-badge');
    if (!badge) return;
    const count = this.state.favorites.length;
    badge.textContent = count;
    badge.style.display = count > 0 ? 'inline-block' : 'none';
  },

  // 7. Saved Favorites Modal
  initSavedModal() {
    const modal = document.getElementById('saved-modal');
    const openBtn = document.getElementById('btn-nav-saved');
    const closeBtns = modal?.querySelectorAll('.modal-close-btn, .modal-overlay-bg');
    const container = document.getElementById('saved-nicknames-container');

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

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeModal();
      }
    });
  },

  renderSavedList() {
    const container = document.getElementById('saved-nicknames-container');
    const countSpan = document.getElementById('count-saved-names');
    if (!container) return;

    if (countSpan) countSpan.textContent = this.state.favorites.length;

    if (this.state.favorites.length === 0) {
      container.innerHTML = `
        <div class="empty-saved-message">
          <p>No saved nicknames yet.</p>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.5rem;">
            Click the heart icon (♡) on any styled nickname to save it here.
          </p>
        </div>
      `;
      return;
    }

    container.innerHTML = this.state.favorites.map((fav, index) => {
      return `
        <div class="saved-item-row">
          <div class="saved-item-text">${this.escapeHtml(fav.rendered)}</div>
          <div class="saved-item-actions">
            <button class="btn-copy-saved" data-copy="${this.escapeHtml(fav.rendered)}">Copy</button>
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
        localStorage.setItem('ff_stylish_favs', JSON.stringify(this.state.favorites));
        this.updateSavedBadge();
        this.renderSavedList();
        this.render(); // update card hearts
      });
    });
  },

  // 8. FAQ Accordion
  initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
      const questionBtn = item.querySelector('.faq-question');
      questionBtn?.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        // Close others for clean single-view
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
    // Quick Simpler jump helper in article or footer if present
    document.querySelectorAll('.jump-to-tool-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const input = document.getElementById('stylish-name-input');
        input?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        input?.focus();
      });
    });
  },

  // 9. Toast Notification
  showToast(message) {
    let toast = document.getElementById('stylish-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'stylish-toast';
      toast.className = 'stylish-toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<span>✓</span> <span>${message}</span>`;
    toast.classList.add('show');
    clearTimeout(this._toastTimeout);
    this._toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2400);
  },

  capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
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
  StylishApp.init();
});
