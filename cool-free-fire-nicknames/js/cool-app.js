/**
 * Cool Free Fire Nicknames - Application Logic
 * Dual-Workflow Discovery + Fast Copy + Inline Customizer + "Make It Cooler" Generator
 */

document.addEventListener('DOMContentLoaded', function() {
  // Application State
  const state = {
    category: 'all',
    search: '',
    isSurpriseMode: false,
    surprisePool: []
  };

  // Customizer State
  const customizerState = {
    baseText: '',
    fontKey: 'none',
    frameId: 'none',
    cleanFallback: ''
  };

  // DOM Elements
  const grid = document.getElementById('cool-nickname-grid');
  const searchInput = document.getElementById('cool-search-input');
  const searchClearBtn = document.getElementById('cool-search-clear');
  const filterChips = document.querySelectorAll('.cool-filter-chip');
  const surpriseBtn = document.getElementById('btn-cool-surprise');
  const toast = document.getElementById('cool-toast');

  // "Make It Cooler" Elements
  const ownInput = document.getElementById('cool-own-input');
  const ownSubmitBtn = document.getElementById('btn-cool-own-submit');
  const ownResults = document.getElementById('cool-own-results');
  const ownClearBtn = document.getElementById('btn-cool-own-clear');

  // Customizer Modal Elements
  const modal = document.getElementById('cool-customizer-modal');
  const modalCloseBtn = document.getElementById('cool-modal-close');
  const modalPreview = document.getElementById('cool-modal-preview');
  const modalWordInput = document.getElementById('cool-modal-word-input');
  const modalCharCount = document.getElementById('cool-modal-char-count');
  const modalFramesList = document.getElementById('cool-modal-frames-list');
  const modalFontsList = document.getElementById('cool-modal-fonts-list');
  const modalCopyBtn = document.getElementById('btn-modal-copy');
  const modalCopyCleanBtn = document.getElementById('btn-modal-copy-clean');

  // --- Copy Functionality ---
  function copyTextToClipboard(text, triggerBtn, successLabel) {
    if (!text) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        handleCopySuccess(triggerBtn, text, successLabel);
      }).catch(() => {
        fallbackCopy(text, triggerBtn, successLabel);
      });
    } else {
      fallbackCopy(text, triggerBtn, successLabel);
    }
  }

  function fallbackCopy(text, triggerBtn, successLabel) {
    const temp = document.createElement('textarea');
    temp.value = text;
    temp.style.position = 'fixed';
    temp.style.opacity = '0';
    document.body.appendChild(temp);
    temp.select();
    try {
      document.execCommand('copy');
      handleCopySuccess(triggerBtn, text, successLabel);
    } catch (e) {
      showToast('Please copy manually: ' + text);
    }
    document.body.removeChild(temp);
  }

  function handleCopySuccess(btn, text, successLabel) {
    if (btn) {
      const originalHtml = btn.innerHTML;
      btn.classList.add('copied');
      btn.innerHTML = `<span>✓</span> ${successLabel || 'Copied!'}`;
      setTimeout(() => {
        btn.classList.remove('copied');
        btn.innerHTML = originalHtml;
      }, 1800);
    }
    showToast(`Copied "${text}" to clipboard!`);
  }

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2400);
  }

  // --- Render Ready-Made Nicknames Grid ---
  function renderGrid() {
    if (!grid) return;

    let dataset = COOL_NICKNAMES_DATA;

    if (state.isSurpriseMode && state.surprisePool.length > 0) {
      dataset = state.surprisePool;
    } else {
      dataset = COOL_NICKNAMES_DATA.filter(item => {
        const matchCat = state.category === 'all' || item.category === state.category;
        const q = state.search.toLowerCase();
        const matchSearch = !q || 
          item.name.toLowerCase().includes(q) || 
          item.plain.toLowerCase().includes(q) ||
          item.vibe.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q);
        return matchCat && matchSearch;
      });
    }

    if (dataset.length === 0) {
      grid.innerHTML = `
        <div class="cool-no-results">
          <p>No cool nicknames found matching "${escapeHtml(state.search)}".</p>
          <button type="button" class="btn-cool-reset-filter" id="btn-cool-reset-filter">Reset Filters</button>
        </div>
      `;
      const resetBtn = document.getElementById('btn-cool-reset-filter');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          state.search = '';
          state.category = 'all';
          state.isSurpriseMode = false;
          if (searchInput) searchInput.value = '';
          filterChips.forEach(c => {
            c.classList.toggle('active', c.getAttribute('data-category') === 'all');
          });
          renderGrid();
        });
      }
      return;
    }

    grid.innerHTML = dataset.map(item => {
      const escapedName = escapeHtml(item.name);
      const escapedPlain = escapeHtml(item.plain);
      const vibeLabel = escapeHtml(item.vibe || 'Cool');

      return `
        <div class="cool-card">
          <div class="cool-card-top">
            <span class="cool-card-vibe">${vibeLabel}</span>
            <span class="cool-card-complexity">${escapeHtml(item.complexity || 'Decorated')}</span>
          </div>
          <div class="cool-card-name" title="${escapedName}">${escapedName}</div>
          <div class="cool-card-actions">
            <button type="button" class="btn-cool-card-copy" data-copy="${escapedName}" aria-label="Copy ${escapedName}">
              <svg class="btn-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
              <span>COPY</span>
            </button>
            <button type="button" class="btn-cool-card-custom" data-plain="${escapedPlain}" data-name="${escapedName}" aria-label="Customize ${escapedName}">
              <svg class="btn-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
              <span>CUSTOMIZE</span>
            </button>
          </div>
        </div>
      `;
    }).join('');

    // Attach card action handlers
    grid.querySelectorAll('.btn-cool-card-copy').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const copyText = this.getAttribute('data-copy');
        copyTextToClipboard(copyText, this, 'COPIED!');
      });
    });

    grid.querySelectorAll('.btn-cool-card-custom').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const plain = this.getAttribute('data-plain') || 'Vortex';
        openCustomizer(plain);
      });
    });
  }

  // --- Category Chips ---
  filterChips.forEach(chip => {
    chip.addEventListener('click', function() {
      filterChips.forEach(c => c.classList.remove('active'));
      this.classList.add('active');
      state.category = this.getAttribute('data-category') || 'all';
      state.isSurpriseMode = false;
      renderGrid();
    });
  });

  // --- Search Input ---
  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      state.search = e.target.value.trim();
      state.isSurpriseMode = false;
      if (searchClearBtn) {
        searchClearBtn.classList.toggle('visible', state.search.length > 0);
      }
      renderGrid();
    });
  }

  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', function() {
      if (searchInput) searchInput.value = '';
      state.search = '';
      searchClearBtn.classList.remove('visible');
      state.isSurpriseMode = false;
      renderGrid();
      if (searchInput) searchInput.focus();
    });
  }

  // --- Surprise Me Button ---
  if (surpriseBtn) {
    surpriseBtn.addEventListener('click', function() {
      // Pick 12 random items from dataset
      const shuffled = [...COOL_NICKNAMES_DATA].sort(() => 0.5 - Math.random());
      state.surprisePool = shuffled.slice(0, 12);
      state.isSurpriseMode = true;
      filterChips.forEach(c => c.classList.remove('active'));
      renderGrid();
      showToast('🎲 Generated 12 fresh cool nickname ideas!');
    });
  }

  // --- "Already Have a Name? Make It Cooler" Section ---
  function handleMakeCooler() {
    if (!ownInput || !ownResults) return;
    const rawWord = ownInput.value.trim();
    if (!rawWord) {
      showToast('Please enter a word or handle first!');
      ownInput.focus();
      return;
    }

    const variants = generateCoolVariants(rawWord);
    ownResults.innerHTML = `
      <div class="cool-own-results-header">
        <span class="cool-own-results-title">Styled Variations for "<strong>${escapeHtml(rawWord)}</strong>"</span>
        <span class="cool-own-results-count">${variants.length} variations</span>
      </div>
      <div class="cool-grid cool-grid-compact">
        ${variants.map(item => `
          <div class="cool-card">
            <div class="cool-card-top">
              <span class="cool-card-vibe">${escapeHtml(item.vibe)}</span>
              <span class="cool-card-complexity">${escapeHtml(item.complexity)}</span>
            </div>
            <div class="cool-card-name" title="${escapeHtml(item.name)}">${escapeHtml(item.name)}</div>
            <div class="cool-card-actions">
              <button type="button" class="btn-cool-card-copy" data-copy="${escapeHtml(item.name)}" aria-label="Copy ${escapeHtml(item.name)}">
                <svg class="btn-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                <span>COPY</span>
              </button>
              <button type="button" class="btn-cool-card-custom" data-plain="${escapeHtml(item.plain)}" data-name="${escapeHtml(item.name)}" aria-label="Customize ${escapeHtml(item.name)}">
                <svg class="btn-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                <span>CUSTOMIZE</span>
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    // Wire up results listeners
    ownResults.querySelectorAll('.btn-cool-card-copy').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const copyText = this.getAttribute('data-copy');
        copyTextToClipboard(copyText, this, 'COPIED!');
      });
    });

    ownResults.querySelectorAll('.btn-cool-card-custom').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const plain = this.getAttribute('data-plain') || rawWord;
        openCustomizer(plain);
      });
    });

    if (ownClearBtn) {
      ownClearBtn.style.display = 'inline-flex';
    }

    // Smooth scroll down to results if needed
    ownResults.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  if (ownSubmitBtn) {
    ownSubmitBtn.addEventListener('click', handleMakeCooler);
  }

  if (ownInput) {
    ownInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleMakeCooler();
      }
    });
  }

  if (ownClearBtn) {
    ownClearBtn.addEventListener('click', function() {
      if (ownInput) ownInput.value = '';
      if (ownResults) ownResults.innerHTML = '';
      ownClearBtn.style.display = 'none';
      if (ownInput) ownInput.focus();
    });
  }

  // --- Inline Customizer Drawer / Modal ---
  function openCustomizer(initialWord) {
    if (!modal) return;
    const cleanWord = initialWord ? initialWord.replace(/[^\w]/gi, '') || initialWord : 'Vortex';
    customizerState.baseText = cleanWord;
    customizerState.cleanFallback = cleanWord;
    customizerState.fontKey = 'none';
    customizerState.frameId = 'none';

    if (modalWordInput) {
      modalWordInput.value = cleanWord;
    }

    renderCustomizerFrames();
    renderCustomizerFonts();
    updateCustomizerPreview();

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCustomizer() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function renderCustomizerFrames() {
    if (!modalFramesList) return;
    modalFramesList.innerHTML = COOL_CUSTOM_FRAMES.map(f => {
      const isSelected = customizerState.frameId === f.id;
      const previewTag = f.left || f.right ? `${f.left}•${f.right}` : 'None';
      return `
        <button type="button" class="cool-picker-chip ${isSelected ? 'active' : ''}" data-frame="${f.id}">
          ${escapeHtml(previewTag)}
        </button>
      `;
    }).join('');

    modalFramesList.querySelectorAll('.cool-picker-chip').forEach(chip => {
      chip.addEventListener('click', function() {
        modalFramesList.querySelectorAll('.cool-picker-chip').forEach(c => c.classList.remove('active'));
        this.classList.add('active');
        customizerState.frameId = this.getAttribute('data-frame');
        updateCustomizerPreview();
      });
    });
  }

  function renderCustomizerFonts() {
    if (!modalFontsList) return;
    modalFontsList.innerHTML = COOL_FONT_PRESETS.map(font => {
      const isSelected = customizerState.fontKey === font.id;
      const sampleText = transformTextWithFont('Vex', font.id);
      return `
        <button type="button" class="cool-picker-chip ${isSelected ? 'active' : ''}" data-font="${font.id}">
          <span class="cool-chip-sample">${escapeHtml(sampleText)}</span>
          <span class="cool-chip-label">${escapeHtml(font.name)}</span>
        </button>
      `;
    }).join('');

    modalFontsList.querySelectorAll('.cool-picker-chip').forEach(chip => {
      chip.addEventListener('click', function() {
        modalFontsList.querySelectorAll('.cool-picker-chip').forEach(c => c.classList.remove('active'));
        this.classList.add('active');
        customizerState.fontKey = this.getAttribute('data-font');
        updateCustomizerPreview();
      });
    });
  }

  function updateCustomizerPreview() {
    const rawWord = (modalWordInput ? modalWordInput.value.trim() : customizerState.baseText) || 'Vortex';
    customizerState.baseText = rawWord;
    customizerState.cleanFallback = rawWord.replace(/[^\w]/gi, '') || rawWord;

    // Apply font
    let styledWord = transformTextWithFont(rawWord, customizerState.fontKey);

    // Apply frame
    const frameObj = COOL_CUSTOM_FRAMES.find(f => f.id === customizerState.frameId) || COOL_CUSTOM_FRAMES[0];
    const finalResult = `${frameObj.left}${styledWord}${frameObj.right}`;

    if (modalPreview) {
      modalPreview.textContent = finalResult;
    }

    if (modalCharCount) {
      const len = [...finalResult].length; // accurately count unicode code points
      modalCharCount.textContent = `${len} glyphs`;
    }
  }

  // Modal event bindings
  if (modalWordInput) {
    modalWordInput.addEventListener('input', updateCustomizerPreview);
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeCustomizer);
  }

  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal || e.target.classList.contains('cool-modal-backdrop')) {
        closeCustomizer();
      }
    });
  }

  // Escape key closes modal
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeCustomizer();
    }
  });

  if (modalCopyBtn) {
    modalCopyBtn.addEventListener('click', function() {
      const currentVal = modalPreview ? modalPreview.textContent : '';
      copyTextToClipboard(currentVal, this, 'COPIED!');
    });
  }

  if (modalCopyCleanBtn) {
    modalCopyCleanBtn.addEventListener('click', function() {
      const cleanVal = customizerState.cleanFallback;
      copyTextToClipboard(cleanVal, this, 'COPIED CLEAN!');
    });
  }

  // Utility to escape HTML
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // --- FAQ Accordion Interactivity ---
  const faqItems = document.querySelectorAll('.cool-faq-item');
  if (faqItems.length > 0) {
    faqItems[0].classList.add('active');
  }
  faqItems.forEach(item => {
    item.addEventListener('click', function() {
      this.classList.toggle('active');
    });
  });

  // --- Interactive Click-to-Copy for Pill Tags & Styled Cells in Article ---
  document.querySelectorAll('.cool-pill-item, .styled-cell').forEach(pill => {
    pill.setAttribute('title', 'Click to copy');
    pill.addEventListener('click', function() {
      const cleanText = this.textContent.trim().replace(/^📋\s*/, '');
      copyTextToClipboard(cleanText, this, 'COPIED!');
    });
  });

  // Initial Grid Render
  renderGrid();
});
