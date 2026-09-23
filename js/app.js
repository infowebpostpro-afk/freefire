/**
 * Free Fire Nickname Studio - Mobile-First Core Application Logic
 * Fast, two-mode nickname utility:
 * Mode 1: Find Nicknames (Ready-made discovery, keyword search, categories, 1-tap copy, surprise me)
 * Mode 2: Style My Name (Real-time live styling, category filters, collapsible customize options)
 */

// Application State
const AppState = {
  activeMode: 'find', // 'find' | 'style'
  
  // Mode 1 State
  findCategory: 'all',
  findQuery: '',
  findLimit: 20,
  findResults: [],
  
  // Mode 2 State
  styleInput: '',
  styleCategory: 'all',
  styleLimit: 24,
  styleResults: [],
  customPrefix: '',
  customSuffix: '',

  // User Data
  favorites: JSON.parse(localStorage.getItem('ff_favorites') || '[]')
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  initModeTabs();
  initFindMode();
  initStyleMode();
  initCustomizationOptions();
  initFavoritesDrawer();
  initAmbientCanvas();
  initKeyboardShortcuts();
  updateFavoritesBadge();

  // Mode 1 loads ready-made results immediately (Never an empty screen!)
  renderFindNicknames();
});

/* ===================================================================
   TWO-OPTION MODE SWITCHER
   =================================================================== */

function initModeTabs() {
  const tabFind = document.getElementById('tab-find-names');
  const tabStyle = document.getElementById('tab-style-name');
  const panelFind = document.getElementById('panel-find-names');
  const panelStyle = document.getElementById('panel-style-name');
  const styleInput = document.getElementById('style-name-input');

  if (!tabFind || !tabStyle || !panelFind || !panelStyle) return;

  function switchMode(mode) {
    AppState.activeMode = mode;

    if (mode === 'find') {
      tabFind.classList.add('active');
      tabFind.setAttribute('aria-selected', 'true');
      tabStyle.classList.remove('active');
      tabStyle.setAttribute('aria-selected', 'false');

      panelFind.style.display = 'block';
      panelFind.classList.add('active');
      panelStyle.style.display = 'none';
      panelStyle.classList.remove('active');
    } else {
      tabStyle.classList.add('active');
      tabStyle.setAttribute('aria-selected', 'true');
      tabFind.classList.remove('active');
      tabFind.setAttribute('aria-selected', 'false');

      panelStyle.style.display = 'block';
      panelStyle.classList.add('active');
      panelFind.style.display = 'none';
      panelFind.classList.remove('active');

      // Autofocus text input in Style My Name
      if (styleInput) {
        styleInput.focus();
      }
    }
  }

  tabFind.addEventListener('click', () => switchMode('find'));
  tabStyle.addEventListener('click', () => switchMode('style'));
}

/* ===================================================================
   MODE 1: FIND NICKNAMES
   =================================================================== */

function initFindMode() {
  const searchInput = document.getElementById('find-search-input');
  const clearBtn = document.getElementById('find-clear-btn');
  const catChips = document.querySelectorAll('[data-find-cat]');
  const showMoreBtn = document.getElementById('btn-find-show-more');
  const surpriseBtn = document.getElementById('btn-find-surprise');

  // Keyword Search Input with lightweight debounce
  let searchDebounce = null;
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      AppState.findQuery = e.target.value.trim().toLowerCase();
      AppState.findLimit = 20;

      if (clearBtn) {
        clearBtn.style.display = e.target.value.length > 0 ? 'flex' : 'none';
      }

      clearTimeout(searchDebounce);
      searchDebounce = setTimeout(() => {
        renderFindNicknames();
      }, 50);
    });
  }

  if (clearBtn && searchInput) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      AppState.findQuery = '';
      AppState.findLimit = 20;
      clearBtn.style.display = 'none';
      searchInput.focus();
      renderFindNicknames();
    });
  }

  // Category Filter Chips
  catChips.forEach(chip => {
    chip.addEventListener('click', () => {
      catChips.forEach(c => {
        c.classList.remove('active');
        c.setAttribute('aria-selected', 'false');
      });
      chip.classList.add('active');
      chip.setAttribute('aria-selected', 'true');
      AppState.findCategory = chip.getAttribute('data-find-cat') || 'all';
      AppState.findLimit = 20;
      renderFindNicknames();

      // Smooth horizontal scroll for mobile chips row
      chip.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    });
  });

  // Event Delegation for 1-Tap Copy & Save (Works on Prerendered & Dynamic Rows)
  const findList = document.getElementById('find-results-list');
  if (findList) {
    findList.addEventListener('click', (e) => {
      const copyBtn = e.target.closest('.btn-copy-action');
      const nickText = e.target.closest('.nick-text');
      const favBtn = e.target.closest('.btn-fav-action');
      const row = e.target.closest('.nick-row');
      if (!row) return;

      const name = row.getAttribute('data-name') || row.querySelector('.nick-text')?.textContent.trim();
      if (!name) return;

      if (copyBtn || nickText) {
        e.stopPropagation();
        copyNicknameAction(name, row, copyBtn || row.querySelector('.btn-copy-action'));
      } else if (favBtn) {
        e.stopPropagation();
        toggleFavorite(name, favBtn);
      }
    });
  }

  // Show More Names Button
  if (showMoreBtn) {
    showMoreBtn.addEventListener('click', () => {
      AppState.findLimit += 20;
      renderFindNicknames(true);
    });
  }

  // Surprise Me Button: Shuffles and surfaces random names
  if (surpriseBtn) {
    surpriseBtn.addEventListener('click', () => {
      const allNames = typeof READY_MADE_NICKNAMES !== 'undefined' ? READY_MADE_NICKNAMES : [];
      if (allNames.length === 0) return;

      // Randomly pick 18 names
      const shuffled = [...allNames].sort(() => 0.5 - Math.random()).slice(0, 18);
      AppState.findResults = shuffled;

      const listContainer = document.getElementById('find-results-list');
      if (listContainer) {
        listContainer.innerHTML = '';
        shuffled.forEach(item => {
          listContainer.appendChild(createNicknameRow(item.name));
        });
      }

      showToast('🎲 Surfaced fresh nickname ideas!', 'info');

      // Scroll to tool top smoothly
      const toolSection = document.getElementById('nickname-tool');
      if (toolSection) {
        toolSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }
}

function renderFindNicknames(isAppend = false) {
  const listContainer = document.getElementById('find-results-list');
  const showMoreBtn = document.getElementById('btn-find-show-more');
  if (!listContainer) return;

  const allNames = typeof READY_MADE_NICKNAMES !== 'undefined' ? READY_MADE_NICKNAMES : [];
  
  // If initial load with default state and prerendered rows exist, preserve DOM for zero CLS!
  if (!isAppend && AppState.findCategory === 'all' && !AppState.findQuery && listContainer.children.length >= 20) {
    syncListFavorites(listContainer);
    if (showMoreBtn) showMoreBtn.style.display = 'inline-flex';
    return;
  }

  // Filter by category
  let filtered = allNames;
  if (AppState.findCategory !== 'all') {
    filtered = allNames.filter(item => item.cat === AppState.findCategory);
  }

  // Filter by search query
  if (AppState.findQuery) {
    const q = AppState.findQuery;
    filtered = filtered.filter(item => item.name.toLowerCase().includes(q) || (item.cat && item.cat.includes(q)));
  }

  AppState.findResults = filtered;

  if (filtered.length === 0) {
    listContainer.innerHTML = `
      <div class="empty-results-box">
        <p>No nicknames found matching "<strong>${escapeHtml(AppState.findQuery)}</strong>".</p>
        <button type="button" class="btn-action-secondary" onclick="document.getElementById('find-clear-btn').click();">Clear Search</button>
      </div>
    `;
    if (showMoreBtn) showMoreBtn.style.display = 'none';
    return;
  }

  const visibleItems = filtered.slice(0, AppState.findLimit);

  if (!isAppend) {
    listContainer.innerHTML = '';
    visibleItems.forEach(item => {
      listContainer.appendChild(createNicknameRow(item.name));
    });
  } else {
    // Append only newly revealed items
    const currentCount = listContainer.children.length;
    const nextBatch = filtered.slice(currentCount, AppState.findLimit);
    nextBatch.forEach(item => {
      listContainer.appendChild(createNicknameRow(item.name));
    });
  }

  // Toggle Show More Names visibility
  if (showMoreBtn) {
    showMoreBtn.style.display = filtered.length > AppState.findLimit ? 'inline-flex' : 'none';
  }
}

/* ===================================================================
   MODE 2: STYLE MY NAME
   =================================================================== */

function initStyleMode() {
  const nameInput = document.getElementById('style-name-input');
  const clearBtn = document.getElementById('style-clear-btn');
  const quickSamples = document.querySelectorAll('[data-sample]');
  const styleChips = document.querySelectorAll('[data-style-cat]');
  const showMoreBtn = document.getElementById('btn-style-show-more');

  let styleDebounce = null;
  if (nameInput) {
    nameInput.addEventListener('input', (e) => {
      AppState.styleInput = e.target.value.trim();
      AppState.styleLimit = 24;

      if (clearBtn) {
        clearBtn.style.display = e.target.value.length > 0 ? 'flex' : 'none';
      }

      clearTimeout(styleDebounce);
      styleDebounce = setTimeout(() => {
        handleStyleGeneration();
      }, 40);
    });
  }

  if (clearBtn && nameInput) {
    clearBtn.addEventListener('click', () => {
      nameInput.value = '';
      AppState.styleInput = '';
      clearBtn.style.display = 'none';
      nameInput.focus();
      handleStyleGeneration();
    });
  }

  // Quick Samples Click Handlers
  quickSamples.forEach(btn => {
    btn.addEventListener('click', () => {
      const sample = btn.getAttribute('data-sample') || 'Ghost';
      if (nameInput) {
        nameInput.value = sample;
        AppState.styleInput = sample;
        if (clearBtn) clearBtn.style.display = 'flex';
        nameInput.focus();
        handleStyleGeneration();
      }
    });
  });

  // Style Category Chips (All, Clean, Symbols, Fancy, Bold)
  styleChips.forEach(chip => {
    chip.addEventListener('click', () => {
      styleChips.forEach(c => {
        c.classList.remove('active');
        c.setAttribute('aria-selected', 'false');
      });
      chip.classList.add('active');
      chip.setAttribute('aria-selected', 'true');
      AppState.styleCategory = chip.getAttribute('data-style-cat') || 'all';
      AppState.styleLimit = 24;
      handleStyleGeneration();

      chip.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    });
  });

  // Event Delegation for Style Results 1-Tap Copy & Save
  const styleList = document.getElementById('style-results-list');
  if (styleList) {
    styleList.addEventListener('click', (e) => {
      const copyBtn = e.target.closest('.btn-copy-action');
      const nickText = e.target.closest('.nick-text');
      const favBtn = e.target.closest('.btn-fav-action');
      const row = e.target.closest('.nick-row');
      if (!row) return;

      const name = row.getAttribute('data-name') || row.querySelector('.nick-text')?.textContent.trim();
      if (!name) return;

      if (copyBtn || nickText) {
        e.stopPropagation();
        copyNicknameAction(name, row, copyBtn || row.querySelector('.btn-copy-action'));
      } else if (favBtn) {
        e.stopPropagation();
        toggleFavorite(name, favBtn);
      }
    });
  }

  // Show More Styles Button
  if (showMoreBtn) {
    showMoreBtn.addEventListener('click', () => {
      AppState.styleLimit += 24;
      renderStyleNicknames(true);
    });
  }
}

function handleStyleGeneration() {
  const emptyState = document.getElementById('style-empty-state');
  const filterBar = document.getElementById('style-filter-bar');
  const resultsList = document.getElementById('style-results-list');
  const errorState = document.getElementById('style-error-state');
  const moreActions = document.getElementById('style-more-actions');

  const rawName = AppState.styleInput;

  // Empty state: show prompt & example
  if (!rawName) {
    if (emptyState) emptyState.style.display = 'block';
    if (filterBar) filterBar.style.display = 'none';
    if (resultsList) {
      resultsList.style.display = 'none';
      resultsList.innerHTML = '';
    }
    if (errorState) errorState.style.display = 'none';
    if (moreActions) moreActions.style.display = 'none';
    return;
  }

  // Hide empty state & show filter bar
  if (emptyState) emptyState.style.display = 'none';
  if (filterBar) filterBar.style.display = 'flex';

  // Generate styles using site's real transformation library
  const styles = generateAllStyles(rawName);

  if (styles.length === 0) {
    if (errorState) errorState.style.display = 'block';
    if (resultsList) resultsList.style.display = 'none';
    if (moreActions) moreActions.style.display = 'none';
    return;
  }

  if (errorState) errorState.style.display = 'none';
  AppState.styleResults = styles;
  renderStyleNicknames(false);
}

function generateAllStyles(rawName) {
  const list = [];
  const fm = typeof FONT_MAPS !== 'undefined' ? FONT_MAPS : {};
  const prefix = AppState.customPrefix;
  const suffix = AppState.customSuffix;

  // Helper to add a style entry
  function add(name, cat) {
    if (!name) return;
    const full = `${prefix}${name}${suffix}`;
    // Deduplicate
    if (!list.some(item => item.name === full)) {
      list.push({ name: full, cat });
    }
  }

  const upper = rawName.toUpperCase();

  // 1. CLEAN STYLES
  if (fm.smallCaps) add(fm.smallCaps(rawName), 'clean');
  if (fm.boldSans) add(fm.boldSans(rawName), 'clean');
  if (fm.monospace) add(fm.monospace(rawName), 'clean');
  if (fm.fullwidth) add(fm.fullwidth(upper), 'clean');
  if (fm.spaced) add(fm.spaced(upper), 'clean');
  add(`『${rawName}』`, 'clean');
  add(`【${rawName}】`, 'clean');
  add(`« ${rawName} »`, 'clean');
  add(`[ ${upper} ]`, 'clean');

  // 2. SIGNATURE SYMBOL STYLES
  add(`亗 ${upper} 亗`, 'symbols');
  add(`꧁${upper}꧂`, 'symbols');
  add(`꧁༒${upper}༒꧂`, 'symbols');
  add(`★${fm.smallCaps ? fm.smallCaps(rawName) : rawName}★`, 'symbols');
  add(`『${upper}』`, 'symbols');
  add(`⚡ ${upper} ⚡`, 'symbols');
  add(`👑 ${upper} 👑`, 'symbols');
  add(`メ ${fm.spaced ? fm.spaced(upper) : upper} メ`, 'symbols');
  add(`乂 ${upper} 乂`, 'symbols');
  add(`𓊈 ${upper} 𓊉`, 'symbols');
  add(`𓆩 ${rawName} 𓆪`, 'symbols');
  add(`亗『${rawName}』亗`, 'symbols');
  add(`★彡[ ${upper} ]彡★`, 'symbols');
  add(`×͜× ${fm.smallCaps ? fm.smallCaps(rawName) : rawName}`, 'symbols');
  add(`☠ ${upper} ☠`, 'symbols');
  add(`💎 ${upper} 💎`, 'symbols');
  add(`✦ ${rawName} ✦`, 'symbols');
  add(`亗ㅤ${upper}ㅤ亗`, 'symbols'); // Invisible Hangul filler
  add(`꧁༺${upper}༻꧂`, 'symbols');
  add(`☬ ${upper} ☬`, 'symbols');
  add(`🎯 ${upper} 🎯`, 'symbols');
  add(`« ${upper} » 亗`, 'symbols');
  add(`亗 ${rawName} ⚡`, 'symbols');

  // 3. FANCY / UNICODE TYPOGRAPHY STYLES
  if (fm.script) add(fm.script(rawName), 'fancy');
  if (fm.gothic) add(fm.gothic(rawName), 'fancy');
  if (fm.doubleStruck) add(fm.doubleStruck(rawName), 'fancy');
  if (fm.bubbles) add(fm.bubbles(rawName), 'fancy');
  if (fm.bubblesBlack) add(fm.bubblesBlack(rawName), 'fancy');
  if (fm.superscript) add(fm.superscript(rawName), 'fancy');
  if (fm.squares) add(fm.squares(upper), 'fancy');
  if (fm.lightFraktur) add(fm.lightFraktur(rawName), 'fancy');
  if (fm.italic) add(fm.italic(rawName), 'fancy');
  if (fm.gothic) add(`꧁${fm.gothic(rawName)}꧂`, 'fancy');
  if (fm.script) add(`♡ ${fm.script(rawName)} ♡`, 'fancy');
  if (fm.doubleStruck) add(`✦ ${fm.doubleStruck(rawName)} ✦`, 'fancy');

  // 4. BOLD & COMPETITIVE STYLES
  if (fm.bold) add(fm.bold(rawName), 'bold');
  if (fm.boldSans) add(fm.boldSans(upper), 'bold');
  if (fm.boldItalic) add(fm.boldItalic(rawName), 'bold');
  add(`【PRO】${upper}`, 'bold');
  add(`OPㅤ${fm.boldSans ? fm.boldSans(rawName) : upper}`, 'bold');
  add(`B2K⚡${upper}`, 'bold');
  add(`亗 ${fm.boldSans ? fm.boldSans(upper) : upper} 亗`, 'bold');
  add(`i am | ${upper}`, 'bold');
  add(`777ㅤ${upper} 亗`, 'bold');
  add(`4Kㅤ${upper}`, 'bold');
  add(`亗『PRO』${upper}亗`, 'bold');

  // Apply category filtering
  if (AppState.styleCategory !== 'all') {
    return list.filter(item => item.cat === AppState.styleCategory);
  }

  return list;
}

function renderStyleNicknames(isAppend = false) {
  const resultsList = document.getElementById('style-results-list');
  const moreActions = document.getElementById('style-more-actions');
  const showMoreBtn = document.getElementById('btn-style-show-more');

  if (!resultsList) return;

  const items = AppState.styleResults;
  resultsList.style.display = 'grid';

  const visibleItems = items.slice(0, AppState.styleLimit);

  if (!isAppend) {
    resultsList.innerHTML = '';
    visibleItems.forEach(item => {
      resultsList.appendChild(createNicknameRow(item.name));
    });
  } else {
    const currentCount = resultsList.children.length;
    const nextBatch = items.slice(currentCount, AppState.styleLimit);
    nextBatch.forEach(item => {
      resultsList.appendChild(createNicknameRow(item.name));
    });
  }

  if (moreActions && showMoreBtn) {
    const hasMore = items.length > AppState.styleLimit;
    moreActions.style.display = hasMore ? 'flex' : 'none';
    showMoreBtn.style.display = hasMore ? 'inline-flex' : 'none';
  }
}

/* ===================================================================
   ADVANCED CUSTOMIZATION (MORE OPTIONS ACCORDION)
   =================================================================== */

function initCustomizationOptions() {
  const prefixInput = document.getElementById('custom-prefix');
  const suffixInput = document.getElementById('custom-suffix');
  const symChips = document.querySelectorAll('.btn-sym-chip');

  if (prefixInput) {
    prefixInput.addEventListener('input', (e) => {
      AppState.customPrefix = e.target.value;
      if (AppState.styleInput) handleStyleGeneration();
    });
  }

  if (suffixInput) {
    suffixInput.addEventListener('input', (e) => {
      AppState.customSuffix = e.target.value;
      if (AppState.styleInput) handleStyleGeneration();
    });
  }

  // Symbol quick inserters into prefix/suffix
  symChips.forEach(btn => {
    btn.addEventListener('click', () => {
      const sym = btn.getAttribute('data-sym') || '';
      if (!sym) return;

      // If prefix input is focused or empty, append to prefix, otherwise suffix
      if (prefixInput && (document.activeElement === prefixInput || !prefixInput.value)) {
        prefixInput.value += sym;
        AppState.customPrefix = prefixInput.value;
      } else if (suffixInput) {
        suffixInput.value += sym;
        AppState.customSuffix = suffixInput.value;
      }

      if (AppState.styleInput) {
        handleStyleGeneration();
      }
      showToast(`Inserted symbol "${sym}" into decoration`);
    });
  });
}

/* ===================================================================
   ROW CREATION & 1-TAP COPY INTERACTION
   =================================================================== */

function copyNicknameAction(name, row, copyBtn) {
  copyToClipboard(name);

  // Tactile haptic feedback on supported mobile devices
  if (navigator.vibrate) {
    try { navigator.vibrate(35); } catch (err) {}
  }

  if (row) row.classList.add('row-copied');
  if (copyBtn) {
    copyBtn.classList.add('copied');
    const label = copyBtn.querySelector('.copy-label');
    if (label) label.textContent = '✓ Copied';
  }

  showToast(`✓ Copied "${name}" to clipboard!`, 'success');

  setTimeout(() => {
    if (row) row.classList.remove('row-copied');
    if (copyBtn) {
      copyBtn.classList.remove('copied');
      const label = copyBtn.querySelector('.copy-label');
      if (label) label.textContent = 'Copy';
    }
  }, 1600);
}

function syncListFavorites(container) {
  if (!container) return;
  const rows = container.querySelectorAll('.nick-row');
  rows.forEach(row => {
    const name = row.getAttribute('data-name');
    if (!name) return;
    const isFav = AppState.favorites.includes(name);
    const favBtn = row.querySelector('.btn-fav-action');
    if (favBtn) {
      favBtn.classList.toggle('favorited', isFav);
      favBtn.title = isFav ? 'Remove from saved' : 'Save to favorites';
      const icon = favBtn.querySelector('.fav-icon');
      if (icon) icon.textContent = isFav ? '♥' : '♡';
    }
  });
}

function createNicknameRow(name) {
  const row = document.createElement('div');
  row.className = 'nick-row';
  row.setAttribute('data-name', name);

  const isFavorited = AppState.favorites.includes(name);

  row.innerHTML = `
    <div class="nick-text" title="Tap to copy">${escapeHtml(name)}</div>
    <div class="nick-actions">
      <button type="button" class="btn-copy-action" aria-label="Copy ${escapeHtml(name)}">
        <span class="copy-label">Copy</span>
      </button>
      <button type="button" class="btn-fav-action ${isFavorited ? 'favorited' : ''}" aria-label="Save ${escapeHtml(name)}" title="${isFavorited ? 'Remove from saved' : 'Save to favorites'}">
        <span class="fav-icon">${isFavorited ? '♥' : '♡'}</span>
      </button>
    </div>
  `;

  return row;
}

/* ===================================================================
   FAVORITES MANAGEMENT
   =================================================================== */

function toggleFavorite(name, btnEl = null) {
  const index = AppState.favorites.indexOf(name);
  let isSaved = false;

  if (index === -1) {
    AppState.favorites.push(name);
    isSaved = true;
    showToast(`♥ Saved "${name}" to favorites!`);
  } else {
    AppState.favorites.splice(index, 1);
    isSaved = false;
    showToast(`Removed "${name}" from favorites.`);
  }

  localStorage.setItem('ff_favorites', JSON.stringify(AppState.favorites));
  updateFavoritesBadge();

  if (btnEl) {
    btnEl.classList.toggle('favorited', isSaved);
    const icon = btnEl.querySelector('.fav-icon');
    if (icon) icon.textContent = isSaved ? '♥' : '♡';
  }

  // Update all instances of this name on screen
  document.querySelectorAll(`.nick-row[data-name="${CSS.escape(name)}"] .btn-fav-action`).forEach(b => {
    b.classList.toggle('favorited', isSaved);
    const icon = b.querySelector('.fav-icon');
    if (icon) icon.textContent = isSaved ? '♥' : '♡';
  });

  renderFavoritesModalList();
}

function updateFavoritesBadge() {
  const badge = document.getElementById('fav-count-badge');
  if (!badge) return;

  const count = AppState.favorites.length;
  badge.textContent = count;
  badge.style.display = count > 0 ? 'inline-block' : 'none';
}

function initFavoritesDrawer() {
  const openBtn = document.getElementById('btn-nav-favorites');
  const modal = document.getElementById('favorites-modal');
  const closeBtn = document.getElementById('btn-close-favorites');

  if (openBtn && modal) {
    openBtn.addEventListener('click', () => {
      renderFavoritesModalList();
      openModal(modal);
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => closeModal(modal));
  }
}

function renderFavoritesModalList() {
  const container = document.getElementById('favorites-list');
  if (!container) return;

  if (AppState.favorites.length === 0) {
    container.innerHTML = `
      <div class="empty-fav-message">
        <span style="font-size: 2rem; display: block; margin-bottom: 0.5rem;">♡</span>
        <p>You haven't saved any nicknames yet.</p>
        <small style="color: var(--text-muted);">Tap the heart icon on any nickname to save it here for later.</small>
      </div>
    `;
    return;
  }

  container.innerHTML = '';
  AppState.favorites.forEach(name => {
    const item = document.createElement('div');
    item.className = 'fav-row-item';
    item.innerHTML = `
      <span class="fav-item-text">${escapeHtml(name)}</span>
      <div class="fav-item-actions">
        <button type="button" class="btn btn-secondary btn-sm" data-action="copy">Copy</button>
        <button type="button" class="btn-fav-remove" data-action="delete" title="Remove">✕</button>
      </div>
    `;

    item.querySelector('[data-action="copy"]').addEventListener('click', () => {
      copyToClipboard(name);
      showToast(`✓ Copied "${name}"!`, 'success');
    });

    item.querySelector('[data-action="delete"]').addEventListener('click', () => {
      toggleFavorite(name);
    });

    container.appendChild(item);
  });
}

/* ===================================================================
   MODAL & CLIPBOARD UTILITIES
   =================================================================== */

function openModal(modalEl) {
  if (!modalEl) return;
  modalEl.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(modalEl) {
  if (!modalEl) return;
  modalEl.classList.remove('active');
  document.body.style.overflow = '';
}

function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).catch(() => {
      fallbackCopy(text);
    });
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const el = document.createElement('textarea');
  el.value = text;
  el.style.position = 'fixed';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.focus();
  el.select();
  try {
    document.execCommand('copy');
  } catch (err) {}
  document.body.removeChild(el);
}

function showToast(message, type = 'default') {
  let toast = document.getElementById('studio-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'studio-toast';
    toast.className = 'studio-toast';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.className = `studio-toast show ${type}`;

  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2200);
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

/* ===================================================================
   AMBIENT EMBERS CANVAS ANIMATION
   =================================================================== */

function initAmbientCanvas() {
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
  const particleCount = Math.min(24, Math.floor(width / 40));

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.8,
      speedY: Math.random() * 0.4 + 0.15,
      speedX: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.55 + 0.2,
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
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

function initKeyboardShortcuts() {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(m => closeModal(m));
    }
  });
}
