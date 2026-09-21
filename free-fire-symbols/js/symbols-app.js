/**
 * Free Fire Symbols Studio - Interactive Controller
 * Real-time search, category filtering, nickname builder with direct symbol insertion,
 * multi-select copy, pre-made frames, favorites & symbol inspector modal.
 */

const SymbolsState = {
  searchQuery: '',
  activeCategory: 'all',
  multiSelectMode: false,
  selectedSymbols: new Set(),
  builderText: '亗Shadow亗',
  baseName: 'Shadow',
  activeSymbol: '亗',
  position: 'both', // 'before', 'both', 'after'
  favorites: JSON.parse(localStorage.getItem('ff_symbol_favs') || '[]'),
  recents: JSON.parse(localStorage.getItem('ff_symbol_recents') || '[]')
};

const PAIRED_SYMBOLS = {
  '『': { left: '『', right: '』' },
  '』': { left: '『', right: '』' },
  '「': { left: '「', right: '」' },
  '」': { left: '「', right: '」' },
  '《': { left: '《', right: '》' },
  '》': { left: '《', right: '》' },
  '【': { left: '【', right: '】' },
  '】': { left: '【', right: '】' },
  '〔': { left: '〔', right: '〕' },
  '〕': { left: '〔', right: '〕' },
  '꧁': { left: '꧁', right: '꧂' },
  '꧂': { left: '꧁', right: '꧂' },
  '༺': { left: '༺', right: '༻' },
  '༻': { left: '༺', right: '༻' },
  '«': { left: '«', right: '»' },
  '»': { left: '«', right: '»' },
  '‹': { left: '‹', right: '›' },
  '›': { left: '‹', right: '›' },
  '𓊈': { left: '𓊈', right: '𓊉' },
  '𓊉': { left: '𓊈', right: '𓊉' },
  '❮': { left: '❮', right: '❯' },
  '❯': { left: '❮', right: '❯' },
  '⦅': { left: '⦅', right: '⦆' },
  '⦆': { left: '⦅', right: '⦆' }
};

const FF_LIMITS = {
  recommended: 12
};

document.addEventListener('DOMContentLoaded', () => {
  initNicknameBuilder();
  initSearchAndFilter();
  initMultiSelect();
  initPreMadeFrames();
  initSymbolInspector();
  initFavorites();
  initFAQAccordion();
  initAmbientEmbers();

  // Initial render
  renderSymbolsGrid();
});

/* ===================================================================
   SEARCH & CATEGORY FILTERING
   =================================================================== */

function initSearchAndFilter() {
  const searchInput = document.getElementById('symbol-search-input');
  const clearSearchBtn = document.getElementById('search-clear-btn');
  const catTabsContainer = document.getElementById('symbols-cat-scroll');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      SymbolsState.searchQuery = e.target.value.toLowerCase().trim();
      clearSearchBtn.style.display = e.target.value.length > 0 ? 'flex' : 'none';
      renderSymbolsGrid();
    });

    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      SymbolsState.searchQuery = '';
      clearSearchBtn.style.display = 'none';
      searchInput.focus();
      renderSymbolsGrid();
    });
  }

  if (catTabsContainer) {
    const tabs = catTabsContainer.querySelectorAll('.btn-sym-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        SymbolsState.activeCategory = tab.getAttribute('data-cat') || 'all';
        renderSymbolsGrid();
      });
    });
  }
}

function getFilteredSymbols() {
  const q = SymbolsState.searchQuery;
  const cat = SymbolsState.activeCategory;

  return SYMBOLS_DATA.filter(item => {
    // Category check
    const matchesCat = (cat === 'all') || (item.cat === cat);
    if (!matchesCat) return false;

    // Search query check (char, name, cat, keywords)
    if (!q) return true;
    if (item.char === q) return true;
    if (item.name.toLowerCase().includes(q)) return true;
    if (item.cat.toLowerCase().includes(q)) return true;
    if (item.keywords && item.keywords.some(k => k.toLowerCase().includes(q))) return true;

    return false;
  });
}

/* ===================================================================
   SYMBOL CARDS GRID RENDERING
   =================================================================== */

function renderSymbolsGrid() {
  const grid = document.getElementById('symbols-gallery-grid');
  const counterEl = document.getElementById('symbol-counter-badge');
  if (!grid) return;

  const items = getFilteredSymbols();

  // Update counter with exact count
  if (counterEl) {
    if (SymbolsState.searchQuery || SymbolsState.activeCategory !== 'all') {
      counterEl.textContent = `${items.length} of ${SYMBOLS_DATA.length} Symbols`;
    } else {
      counterEl.textContent = `${SYMBOLS_DATA.length}+ Verified Symbols`;
    }
  }

  // Handle No Results State
  if (items.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3.5rem 1rem; background: var(--bg-card); border-radius: var(--radius-md); border: 1px dashed var(--border-subtle);">
        <p style="font-size: 2.5rem; margin-bottom: 0.5rem;">🔍</p>
        <h3 style="font-family: var(--font-gaming); color: #fff; font-size: 1.3rem; margin-bottom: 0.5rem;">No Symbols Found</h3>
        <p style="color: var(--text-med); font-size: 0.95rem; margin-bottom: 1.25rem;">
          No symbols matched "<strong>${escapeHtml(SymbolsState.searchQuery)}</strong>". Try searching for 
          <button class="btn-text-link" onclick="quickSearch('crown')">crown</button>, 
          <button class="btn-text-link" onclick="quickSearch('star')">star</button>, 
          <button class="btn-text-link" onclick="quickSearch('wing')">wing</button>, or 
          <button class="btn-text-link" onclick="quickSearch('swords')">swords</button>.
        </p>
        <button class="btn btn-secondary" onclick="resetSearchAndFilters()">
          Browse All Symbols
        </button>
      </div>
    `;
    return;
  }

  grid.innerHTML = '';
  items.forEach(item => {
    const card = createSymbolCard(item);
    grid.appendChild(card);
  });
}

function createSymbolCard(item) {
  const card = document.createElement('div');
  card.className = `symbol-item-card ${SymbolsState.selectedSymbols.has(item.char) ? 'selected' : ''}`;
  card.setAttribute('data-char', item.char);
  card.setAttribute('role', 'article');
  card.setAttribute('aria-label', `${item.name} symbol`);

  const isFavorited = SymbolsState.favorites.includes(item.char);

  card.innerHTML = `
    <input type="checkbox" class="card-select-checkbox" ${SymbolsState.selectedSymbols.has(item.char) ? 'checked' : ''} aria-label="Select ${item.char}">
    <div class="card-top-status">
      <span>${item.unicode}</span>
      <button class="card-fav-btn ${isFavorited ? 'favorited' : ''}" title="${isFavorited ? 'Remove Favorite' : 'Save Favorite'}" data-action="fav">
        ${isFavorited ? '♥' : '♡'}
      </button>
    </div>
    <div class="symbol-large-glyph" title="Click for details">${escapeHtml(item.char)}</div>
    <div class="symbol-caption-name" title="${escapeHtml(item.name)}">${escapeHtml(item.name)}</div>
    <div class="symbol-card-button-row">
      <button class="btn-card-copy" data-action="copy" title="Copy symbol to clipboard">Copy</button>
      <button class="btn-card-add" data-action="add" title="Add to nickname builder">+ Add</button>
    </div>
  `;

  // Checkbox listener
  const checkbox = card.querySelector('.card-select-checkbox');
  checkbox.addEventListener('change', (e) => {
    e.stopPropagation();
    toggleSelectSymbol(item.char, card);
  });

  // Favorite button
  const favBtn = card.querySelector('[data-action="fav"]');
  favBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleFavoriteSymbol(item.char, favBtn);
  });

  // Copy button
  const copyBtn = card.querySelector('[data-action="copy"]');
  copyBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    copySingleSymbol(item.char, copyBtn);
  });

  // + Add to Name button
  const addBtn = card.querySelector('[data-action="add"]');
  addBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    insertSymbolIntoBuilder(item.char);
  });

  // Clicking card body opens inspector modal (unless in multi-select mode)
  card.addEventListener('click', (e) => {
    if (SymbolsState.multiSelectMode) {
      toggleSelectSymbol(item.char, card);
    } else {
      openSymbolInspector(item);
    }
  });

  return card;
}

function quickSearch(keyword) {
  const input = document.getElementById('symbol-search-input');
  if (input) {
    input.value = keyword;
    SymbolsState.searchQuery = keyword.toLowerCase();
    renderSymbolsGrid();
  }
}

function resetSearchAndFilters() {
  const input = document.getElementById('symbol-search-input');
  if (input) input.value = '';
  SymbolsState.searchQuery = '';
  SymbolsState.activeCategory = 'all';

  document.querySelectorAll('.btn-sym-tab').forEach(tab => {
    tab.classList.toggle('active', tab.getAttribute('data-cat') === 'all');
  });

  renderSymbolsGrid();
}

/* ===================================================================
   NICKNAME BUILDER WITH BEFORE / AFTER / BOTH POSITION CONTROLS
   =================================================================== */

function initNicknameBuilder() {
  const input = document.getElementById('builder-nickname-input');
  const previewEl = document.getElementById('builder-live-preview');
  const copyBtn = document.getElementById('btn-builder-copy');
  const copySymBtn = document.getElementById('btn-builder-copy-sym');
  const saveFavBtn = document.getElementById('btn-builder-save-fav');
  const clearBtn = document.getElementById('btn-builder-clear');
  const quickBar = document.getElementById('builder-quick-chips');
  const posButtons = document.querySelectorAll('.btn-pos-toggle');

  if (!input) return;

  // Setup position buttons
  posButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      posButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      SymbolsState.position = btn.getAttribute('data-pos') || 'both';
      applySymbolToBuilder(SymbolsState.activeSymbol);
    });
  });

  // Base name input listener
  input.addEventListener('input', (e) => {
    SymbolsState.baseName = e.target.value;
    applySymbolToBuilder(SymbolsState.activeSymbol);
  });

  // Copy Full Nickname
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const text = previewEl ? previewEl.textContent.trim() : input.value.trim();
      if (!text) {
        showToast('Please enter or build a name first!', 'info');
        input.focus();
        return;
      }
      copyToClipboard(text);
      copyBtn.classList.add('copied');
      copyBtn.innerHTML = '<span>✓</span> Copied Name!';
      showToast(`✓ Copied "${text}" to clipboard!`, 'success');
      addToRecents(text);
      setTimeout(() => {
        copyBtn.classList.remove('copied');
        copyBtn.innerHTML = '<span>📋</span> Copy Name';
      }, 2000);
    });
  }

  // Copy Active Symbol Only
  if (copySymBtn) {
    copySymBtn.addEventListener('click', () => {
      const sym = SymbolsState.activeSymbol || '亗';
      copyToClipboard(sym);
      copySymBtn.innerHTML = `<span>✓</span> Copied "${sym}"!`;
      showToast(`✓ Copied "${sym}" to clipboard!`, 'success');
      addToRecents(sym);
      setTimeout(() => {
        copySymBtn.innerHTML = '<span>★</span> Copy Symbol';
      }, 1800);
    });
  }

  // Save to Favorites
  if (saveFavBtn) {
    saveFavBtn.addEventListener('click', () => {
      const sym = SymbolsState.activeSymbol || '亗';
      toggleFavoriteSymbol(sym);
      saveFavBtn.innerHTML = '<span>♥</span> Saved!';
      setTimeout(() => {
        saveFavBtn.innerHTML = '<span>♥</span> Save';
      }, 1800);
    });
  }

  // Reset / Clear
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      input.value = 'Shadow';
      SymbolsState.baseName = 'Shadow';
      SymbolsState.activeSymbol = '亗';
      SymbolsState.position = 'both';
      posButtons.forEach(b => b.classList.toggle('active', b.getAttribute('data-pos') === 'both'));
      applySymbolToBuilder('亗');
      input.focus();
    });
  }

  // Quick chips insertion
  const defaultChips = ['亗', '꧁', '꧂', '★', '⚡', '👑', '☠', '⚔', '『', '』', '乂', '✦', '💎'];
  if (quickBar) {
    quickBar.innerHTML = '';
    defaultChips.forEach(char => {
      const chip = document.createElement('button');
      chip.className = 'btn-quick-chip';
      chip.textContent = char;
      chip.title = `Use ${char}`;
      chip.addEventListener('click', () => {
        insertSymbolIntoBuilder(char);
      });
      quickBar.appendChild(chip);
    });
  }

  // Initial render
  applySymbolToBuilder(SymbolsState.activeSymbol);
  updateSimilarSymbolsBar(SymbolsState.activeSymbol);
}

function applySymbolToBuilder(char) {
  SymbolsState.activeSymbol = char;
  const base = SymbolsState.baseName !== undefined ? SymbolsState.baseName : 'Shadow';
  const pos = SymbolsState.position || 'both';
  const previewEl = document.getElementById('builder-live-preview');
  let result = base;

  if (pos === 'before') {
    result = `${char}${base}`;
  } else if (pos === 'after') {
    result = `${base}${char}`;
  } else {
    // Both sides: check for paired symbols
    if (PAIRED_SYMBOLS[char]) {
      const pair = PAIRED_SYMBOLS[char];
      result = `${pair.left}${base}${pair.right}`;
    } else {
      result = `${char}${base}${char}`;
    }
  }

  SymbolsState.builderText = result;
  if (previewEl) previewEl.textContent = result;
  updateBuilderCounter(result);
  updateSimilarSymbolsBar(char);
}

function insertSymbolIntoBuilder(char) {
  applySymbolToBuilder(char);
  showToast(`Applied "${char}" to nickname!`, 'info');
  addToRecents(char);
}

function updateSimilarSymbolsBar(char) {
  const container = document.getElementById('builder-similar-chips');
  if (!container) return;

  const currentItem = SYMBOLS_DATA.find(s => s.char === char);
  const targetCat = currentItem ? currentItem.cat : 'popular';

  // Find symbols from same category or fallback to popular
  let similar = SYMBOLS_DATA.filter(s => s.char !== char && s.cat === targetCat);
  if (similar.length < 5) {
    const popularFallback = SYMBOLS_DATA.filter(s => s.char !== char && s.cat === 'popular');
    similar = [...similar, ...popularFallback];
  }

  container.innerHTML = '';
  similar.slice(0, 6).forEach(sim => {
    const chip = document.createElement('button');
    chip.className = 'btn-similar-chip';
    chip.textContent = sim.char;
    chip.title = `${sim.name} (${sim.unicode})`;
    chip.addEventListener('click', () => {
      insertSymbolIntoBuilder(sim.char);
    });
    container.appendChild(chip);
  });
}

function updateBuilderCounter(text) {
  const counterEl = document.getElementById('builder-char-count');
  const badgeEl = document.getElementById('builder-status-badge');
  if (!counterEl || !badgeEl) return;

  const len = Array.from(text).length;
  counterEl.textContent = `${len} / ${FF_LIMITS.recommended} Chars`;

  if (len === 0) {
    badgeEl.className = 'char-status-badge';
    badgeEl.textContent = 'Ready for symbols';
  } else if (len <= 10) {
    badgeEl.className = 'char-status-badge';
    badgeEl.textContent = '✓ Recommended Limit';
  } else if (len <= FF_LIMITS.recommended) {
    badgeEl.className = 'char-status-badge near-limit';
    badgeEl.textContent = '⚠ Near Limit';
  } else {
    badgeEl.className = 'char-status-badge over-limit';
    badgeEl.textContent = '✕ Too Long (May truncate)';
  }
}

/* ===================================================================
   ONE-CLICK COPY & RECENT LOGIC
   =================================================================== */

function copySingleSymbol(char, btnEl) {
  copyToClipboard(char);
  addToRecents(char);

  if (btnEl) {
    btnEl.classList.add('copied');
    btnEl.textContent = '✓ Copied!';
    setTimeout(() => {
      btnEl.classList.remove('copied');
      btnEl.textContent = 'Copy';
    }, 1500);
  }

  showToast(`✓ Copied "${char}" to clipboard!`, 'success');
}

function addToRecents(symbolOrName) {
  if (!symbolOrName) return;
  SymbolsState.recents = SymbolsState.recents.filter(x => x !== symbolOrName);
  SymbolsState.recents.unshift(symbolOrName);
  if (SymbolsState.recents.length > 20) {
    SymbolsState.recents.pop();
  }
  localStorage.setItem('ff_symbol_recents', JSON.stringify(SymbolsState.recents));
}

/* ===================================================================
   MULTI-SELECT & COPY SELECTED
   =================================================================== */

function initMultiSelect() {
  const toggleBtn = document.getElementById('btn-toggle-multiselect');
  const floatingBar = document.getElementById('floating-multiselect-bar');
  const countText = document.getElementById('multiselect-count');
  const copySelectedBtn = document.getElementById('btn-copy-selected');
  const clearSelectedBtn = document.getElementById('btn-clear-selected');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      SymbolsState.multiSelectMode = !SymbolsState.multiSelectMode;
      toggleBtn.classList.toggle('active', SymbolsState.multiSelectMode);
      document.body.classList.toggle('multiselect-active', SymbolsState.multiSelectMode);

      if (!SymbolsState.multiSelectMode) {
        SymbolsState.selectedSymbols.clear();
        updateMultiSelectUI();
      } else {
        showToast('Multi-Select Active: Click cards to select multiple symbols');
      }
      renderSymbolsGrid();
    });
  }

  if (copySelectedBtn) {
    copySelectedBtn.addEventListener('click', () => {
      if (SymbolsState.selectedSymbols.size === 0) return;
      const combined = Array.from(SymbolsState.selectedSymbols).join('');
      copyToClipboard(combined);
      showToast(`✓ Copied ${SymbolsState.selectedSymbols.size} symbols ("${combined}")!`, 'success');
      addToRecents(combined);
    });
  }

  if (clearSelectedBtn) {
    clearSelectedBtn.addEventListener('click', () => {
      SymbolsState.selectedSymbols.clear();
      updateMultiSelectUI();
      renderSymbolsGrid();
    });
  }
}

function toggleSelectSymbol(char, cardEl) {
  if (SymbolsState.selectedSymbols.has(char)) {
    SymbolsState.selectedSymbols.delete(char);
    if (cardEl) {
      cardEl.classList.remove('selected');
      const cb = cardEl.querySelector('.card-select-checkbox');
      if (cb) cb.checked = false;
    }
  } else {
    SymbolsState.selectedSymbols.add(char);
    if (cardEl) {
      cardEl.classList.add('selected');
      const cb = cardEl.querySelector('.card-select-checkbox');
      if (cb) cb.checked = true;
    }
  }
  updateMultiSelectUI();
}

function updateMultiSelectUI() {
  const floatingBar = document.getElementById('floating-multiselect-bar');
  const countText = document.getElementById('multiselect-count');
  const count = SymbolsState.selectedSymbols.size;

  if (countText) {
    countText.textContent = `${count} Selected`;
  }

  if (floatingBar) {
    floatingBar.classList.toggle('visible', count > 0 && SymbolsState.multiSelectMode);
  }
}

/* ===================================================================
   PRE-MADE FRAMES & COMBINATIONS
   =================================================================== */

function initPreMadeFrames() {
  const framesGrid = document.getElementById('frames-grid');
  const combosGrid = document.getElementById('combinations-grid');

  if (framesGrid) {
    framesGrid.innerHTML = '';
    PREMADE_FRAMES.forEach(frame => {
      const card = document.createElement('div');
      card.className = 'frame-item-card';

      // Use builder text as preview base
      const previewText = `${frame.prefix}${SymbolsState.builderText || 'Shadow'}${frame.suffix}`;

      card.innerHTML = `
        <div class="frame-name-tag">${escapeHtml(frame.name)}</div>
        <div class="frame-preview-text" title="Click to copy">${escapeHtml(previewText)}</div>
        <div class="frame-card-actions">
          <button class="btn btn-primary" style="font-size: 0.8rem; padding: 0.4rem;" data-action="copy-frame">Copy Frame</button>
          <button class="btn btn-secondary" style="font-size: 0.8rem; padding: 0.4rem;" data-action="edit-frame">Edit in Builder</button>
        </div>
      `;

      card.querySelector('[data-action="copy-frame"]').addEventListener('click', () => {
        copyToClipboard(previewText);
        showToast(`✓ Copied "${previewText}"!`, 'success');
        addToRecents(previewText);
      });

      card.querySelector('[data-action="edit-frame"]').addEventListener('click', () => {
        const input = document.getElementById('builder-nickname-input');
        if (input) {
          input.value = previewText;
          SymbolsState.builderText = previewText;
          updateBuilderCounter(previewText);
          input.scrollIntoView({ behavior: 'smooth', block: 'center' });
          input.focus();
          showToast(`Loaded "${previewText}" into Nickname Builder`);
        }
      });

      framesGrid.appendChild(card);
    });
  }

  if (combosGrid) {
    combosGrid.innerHTML = '';
    POPULAR_COMBINATIONS.forEach(combo => {
      const card = document.createElement('div');
      card.className = 'combo-card';

      card.innerHTML = `
        <div class="combo-glyph">${escapeHtml(combo.val)}</div>
        <div class="combo-title">${escapeHtml(combo.name)}</div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.35rem;">
          <button class="btn btn-primary" style="font-size: 0.78rem; padding: 0.35rem 0.2rem;" data-action="copy-combo">Copy</button>
          <button class="btn btn-secondary" style="font-size: 0.78rem; padding: 0.35rem 0.2rem;" data-action="add-combo">+ Add</button>
        </div>
      `;

      card.querySelector('[data-action="copy-combo"]').addEventListener('click', () => {
        copyToClipboard(combo.val);
        showToast(`✓ Copied combo "${combo.val}"!`, 'success');
        addToRecents(combo.val);
      });

      card.querySelector('[data-action="add-combo"]').addEventListener('click', () => {
        insertSymbolIntoBuilder(combo.val);
      });

      combosGrid.appendChild(card);
    });
  }
}

/* ===================================================================
   SYMBOL DETAIL INSPECTOR MODAL
   =================================================================== */

function initSymbolInspector() {
  const modal = document.getElementById('symbol-inspector-modal');
  const closeBtn = document.getElementById('btn-close-inspector');

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
}

function openSymbolInspector(item) {
  const modal = document.getElementById('symbol-inspector-modal');
  if (!modal) return;

  const glyphEl = document.getElementById('inspector-glyph');
  const nameEl = document.getElementById('inspector-name');
  const unicodeEl = document.getElementById('inspector-unicode');
  const catEl = document.getElementById('inspector-category');
  const statusEl = document.getElementById('inspector-status');
  const notesEl = document.getElementById('inspector-notes');
  const contextEl = document.getElementById('inspector-context-text');
  const copyBtn = document.getElementById('btn-inspector-copy');
  const addBtn = document.getElementById('btn-inspector-add');

  glyphEl.textContent = item.char;
  nameEl.textContent = item.name;
  unicodeEl.textContent = item.unicode;
  catEl.textContent = item.cat.toUpperCase();
  statusEl.textContent = item.status === 'common' ? '✓ Common / Widely Compatible' : (item.status === 'special' ? '★ Special Ornament' : '⚠ Rendering Check');
  notesEl.textContent = item.notes || 'Observed to work in standard game versions.';

  // Sample contextual preview
  const sampleName = `${item.char} ${SymbolsState.builderText || 'Shadow'} ${item.char}`;
  contextEl.textContent = sampleName;

  copyBtn.onclick = () => {
    copyToClipboard(item.char);
    showToast(`✓ Copied "${item.char}"!`, 'success');
  };

  // Similar alternatives inside modal
  const similarContainer = document.getElementById('inspector-similar-chips');
  if (similarContainer) {
    similarContainer.innerHTML = '';
    let similar = SYMBOLS_DATA.filter(s => s.char !== item.char && s.cat === item.cat);
    if (similar.length < 5) {
      const fallback = SYMBOLS_DATA.filter(s => s.char !== item.char && s.cat === 'popular');
      similar = [...similar, ...fallback];
    }
    similar.slice(0, 7).forEach(sim => {
      const chip = document.createElement('button');
      chip.className = 'btn-similar-chip';
      chip.textContent = sim.char;
      chip.title = `${sim.name} (${sim.unicode})`;
      chip.onclick = () => {
        openSymbolInspector(sim);
      };
      similarContainer.appendChild(chip);
    });
  }

  addBtn.onclick = () => {
    insertSymbolIntoBuilder(item.char);
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/* ===================================================================
   FAVORITES
   =================================================================== */

function initFavorites() {
  const favBtn = document.getElementById('btn-nav-symbol-favs');
  const modal = document.getElementById('symbol-favorites-modal');
  const closeBtn = document.getElementById('btn-close-symbol-favs');

  if (favBtn && modal) {
    favBtn.addEventListener('click', () => {
      renderFavoritesList();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
}

function toggleFavoriteSymbol(char, btnEl) {
  const idx = SymbolsState.favorites.indexOf(char);
  if (idx > -1) {
    SymbolsState.favorites.splice(idx, 1);
    if (btnEl) {
      btnEl.classList.remove('favorited');
      btnEl.textContent = '♡';
    }
    showToast(`Removed "${char}" from favorites`);
  } else {
    SymbolsState.favorites.push(char);
    if (btnEl) {
      btnEl.classList.add('favorited');
      btnEl.textContent = '♥';
    }
    showToast(`♥ Saved "${char}" to Favorites!`, 'success');
  }

  localStorage.setItem('ff_symbol_favs', JSON.stringify(SymbolsState.favorites));
  updateFavoritesCountBadge();
}

function updateFavoritesCountBadge() {
  const badge = document.getElementById('symbol-fav-count-badge');
  if (badge) {
    badge.textContent = SymbolsState.favorites.length;
    badge.style.display = SymbolsState.favorites.length > 0 ? 'inline-block' : 'none';
  }
}

function renderFavoritesList() {
  const list = document.getElementById('symbol-favorites-list');
  if (!list) return;

  if (SymbolsState.favorites.length === 0) {
    list.innerHTML = `
      <div style="text-align: center; padding: 2.5rem 1rem; color: var(--text-muted);">
        <p style="font-size: 2.5rem; margin-bottom: 0.5rem;">♡</p>
        <p style="font-size: 1.1rem; color: #fff; margin-bottom: 0.5rem;">No Favorite Symbols Saved Yet</p>
        <p style="font-size: 0.85rem;">Click the heart icon on any symbol card to store it here.</p>
      </div>
    `;
    return;
  }

  list.innerHTML = '';
  SymbolsState.favorites.forEach(char => {
    const row = document.createElement('div');
    row.style.cssText = `
      display: flex; align-items: center; justify-content: space-between; 
      padding: 0.75rem 1rem; background: var(--bg-card); border: 1px solid var(--border-subtle); 
      border-radius: var(--radius-md); margin-bottom: 0.6rem;
    `;
    row.innerHTML = `
      <span style="font-size: 1.75rem; color: #fff; line-height: 1;">${escapeHtml(char)}</span>
      <div style="display: flex; gap: 0.4rem;">
        <button class="btn btn-primary" style="padding: 0.35rem 0.75rem; font-size: 0.75rem;" data-action="copy">Copy</button>
        <button class="btn btn-secondary" style="padding: 0.35rem 0.75rem; font-size: 0.75rem;" data-action="add">+ Add</button>
        <button class="btn btn-secondary" style="padding: 0.35rem 0.55rem; font-size: 0.75rem;" data-action="del" title="Delete">✕</button>
      </div>
    `;

    row.querySelector('[data-action="copy"]').addEventListener('click', () => {
      copyToClipboard(char);
      showToast(`✓ Copied "${char}"!`, 'success');
    });

    row.querySelector('[data-action="add"]').addEventListener('click', () => {
      insertSymbolIntoBuilder(char);
    });

    row.querySelector('[data-action="del"]').addEventListener('click', () => {
      toggleFavoriteSymbol(char, null);
      renderFavoritesList();
      renderSymbolsGrid();
    });

    list.appendChild(row);
  });
}

/* ===================================================================
   FAQ ACCORDION & AMBIENT CANVAS
   =================================================================== */

function initFAQAccordion() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      item.classList.toggle('active');
    });
  });
}

function initAmbientEmbers() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const particles = [];
  const count = Math.min(35, Math.floor(window.innerWidth / 35));

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.8 + 0.6,
      speedY: -(Math.random() * 0.7 + 0.25),
      speedX: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.65 + 0.2,
      fadeRate: Math.random() * 0.004 + 0.002,
      color: Math.random() > 0.5 ? '255, 87, 34' : '255, 170, 0'
    });
  }

  function loop() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.y += p.speedY;
      p.x += p.speedX;
      p.alpha -= p.fadeRate;

      if (p.alpha <= 0 || p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
        p.alpha = Math.random() * 0.65 + 0.2;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = `rgba(${p.color}, 0.75)`;
      ctx.fill();
    });

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
}

/* ===================================================================
   UTILITIES
   =================================================================== */

function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).catch(() => {
      fallbackCopyText(text);
    });
  } else {
    fallbackCopyText(text);
  }
}

function fallbackCopyText(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.top = '0';
  textarea.style.left = '0';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  try {
    document.execCommand('copy');
  } catch (err) {
    console.error('Fallback copy error:', err);
  }
  document.body.removeChild(textarea);
}

function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type === 'success' ? 'toast-success' : ''}`;
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.25s ease';
    setTimeout(() => toast.remove(), 250);
  }, 2400);
}

function escapeHtml(string) {
  const div = document.createElement('div');
  div.textContent = string;
  return div.innerHTML;
}
