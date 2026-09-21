/**
 * Free Fire Nickname Studio - Core Application Logic
 * Instant real-time live styling, mobile-first touch optimization,
 * research-based Free Fire font engine, live preview sandbox, and quick-copy.
 */

// Application State
const AppState = {
  mode: 'style', // 'style' | 'random'
  currentInput: '',
  category: 'popular',
  intensity: 'pro', // 'clean' | 'pro' | 'extreme'
  results: [],
  batchIndex: 0,
  favorites: JSON.parse(localStorage.getItem('ff_favorites') || '[]'),
  recents: JSON.parse(localStorage.getItem('ff_recents') || '[]'),
  comparisonList: [],
  previewNickname: '亗 𝐒 𝐇 𝐀 𝐃 𝐎 𝐖 亗',
  editor: {
    prefix: '亗',
    name: 'Shadow',
    suffix: '亗',
    font: 'bold'
  }
};

// Character Length and Compatibility Rules
const FF_RULES = {
  recommendedMax: 12,
  hardMax: 14
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  initStudio();
  initCategoryPills();
  initIntensityButtons();
  initSymbolsLibrary();
  initPreviewSandbox();
  initLiveEditor();
  initComparisonTool();
  initFavoritesDrawer();
  initAmbientCanvas();
  initKeyboardShortcuts();
  
  // Initial Generation with default name
  handleGenerate();
});

/* ===================================================================
   STUDIO CORE & REAL-TIME LIVE GENERATION ENGINE
   =================================================================== */

let liveDebounceTimer = null;

function initStudio() {
  const nameInput = document.getElementById('nickname-input');
  const clearBtn = document.getElementById('input-clear-btn');
  const quickRandomBtn = document.getElementById('btn-quick-random');
  const modeStyleBtn = document.getElementById('mode-style-btn');
  const modeRandomBtn = document.getElementById('mode-random-btn');

  if (!nameInput) return;

  // Real-time live input listener: styles update immediately as the user types
  nameInput.addEventListener('input', (e) => {
    AppState.currentInput = e.target.value;
    if (clearBtn) {
      clearBtn.style.display = e.target.value.length > 0 ? 'flex' : 'none';
    }
    updateCharCounter(e.target.value);
    updateSmartSuggestions(e.target.value);

    // Instant real-time generation with lightweight 40ms debounce for silky-smooth typing
    clearTimeout(liveDebounceTimer);
    liveDebounceTimer = setTimeout(() => {
      handleGenerate();
    }, 40);
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      nameInput.value = '';
      AppState.currentInput = '';
      clearBtn.style.display = 'none';
      updateCharCounter('');
      nameInput.focus();
      handleGenerate();
      showToast('Cleared input. Showing trending names.');
    });
  }

  // Quick Random Idea Button
  if (quickRandomBtn) {
    quickRandomBtn.addEventListener('click', () => {
      rollRandomNameIdea();
    });
  }

  // Mode switching
  if (modeStyleBtn && modeRandomBtn) {
    modeStyleBtn.addEventListener('click', () => {
      AppState.mode = 'style';
      modeStyleBtn.classList.add('active');
      modeRandomBtn.classList.remove('active');
      nameInput.placeholder = 'Type your name (e.g. Shadow, Venom, Hunter)...';
      nameInput.focus();
      handleGenerate();
    });

    modeRandomBtn.addEventListener('click', () => {
      rollRandomNameIdea();
    });
  }
}

function rollRandomNameIdea() {
  const nameInput = document.getElementById('nickname-input');
  const clearBtn = document.getElementById('input-clear-btn');
  const randomName = getRandomBaseName(AppState.category);
  
  if (nameInput) {
    nameInput.value = randomName;
    AppState.currentInput = randomName;
    if (clearBtn) clearBtn.style.display = 'flex';
    updateCharCounter(randomName);
    updateSmartSuggestions(randomName);
  }
  
  handleGenerate();
  showToast(`🎲 Generated idea: "${randomName}"!`, 'info');
}

function initCategoryPills() {
  const container = document.getElementById('category-pills');
  if (!container) return;

  const buttons = container.querySelectorAll('.btn-category');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      AppState.category = btn.getAttribute('data-category');
      AppState.batchIndex = 0;
      handleGenerate();
      
      // Auto-scroll pill into view smoothly on mobile
      btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    });
  });
}

function initIntensityButtons() {
  const buttons = document.querySelectorAll('.btn-intensity');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      AppState.intensity = btn.getAttribute('data-intensity');
      AppState.batchIndex = 0;
      handleGenerate();
    });
  });
}

function updateCharCounter(text) {
  const countEl = document.getElementById('char-count');
  const barEl = document.getElementById('char-progress-bar');
  const badgeEl = document.getElementById('char-status-badge');
  
  if (!countEl || !barEl || !badgeEl) return;
  
  const len = Array.from(text).length;
  countEl.textContent = `${len} / ${FF_RULES.recommendedMax}`;
  
  const percentage = Math.min(100, Math.round((len / FF_RULES.recommendedMax) * 100));
  barEl.style.width = `${percentage}%`;
  
  if (len === 0) {
    barEl.className = 'char-progress-bar';
    badgeEl.className = 'char-status-badge';
    badgeEl.textContent = '✓ Ready to Type';
  } else if (len <= 10) {
    barEl.className = 'char-progress-bar';
    badgeEl.className = 'char-status-badge';
    badgeEl.textContent = '✓ Within Limit';
  } else if (len <= FF_RULES.recommendedMax) {
    barEl.className = 'char-progress-bar near-limit';
    badgeEl.className = 'char-status-badge near-limit';
    badgeEl.textContent = '⚠ Near Limit';
  } else {
    barEl.className = 'char-progress-bar over-limit';
    badgeEl.className = 'char-status-badge over-limit';
    badgeEl.textContent = '✕ Too Long for FF';
  }
}

function updateSmartSuggestions(text) {
  const box = document.getElementById('smart-suggestions-box');
  const tagsContainer = document.getElementById('smart-tags-list');
  if (!box || !tagsContainer) return;
  
  const raw = text.trim();
  if (!raw) {
    box.style.display = 'none';
    return;
  }
  
  const suggestions = generateSmartSuggestions(raw);
  box.style.display = 'flex';
  tagsContainer.innerHTML = '';
  
  const allSuggestions = [
    ...suggestions.competitive.slice(0, 2),
    ...suggestions.royal.slice(0, 2),
    ...suggestions.dark.slice(0, 2),
    ...suggestions.gaming.slice(0, 2)
  ];
  
  allSuggestions.forEach(name => {
    const chip = document.createElement('button');
    chip.className = 'smart-tag-chip';
    chip.textContent = name;
    chip.addEventListener('click', () => {
      const input = document.getElementById('nickname-input');
      input.value = name;
      AppState.currentInput = name;
      updateCharCounter(name);
      handleGenerate();
    });
    tagsContainer.appendChild(chip);
  });
}

function handleGenerate() {
  AppState.batchIndex = 0;
  const items = generateNicknameBatch(AppState.batchIndex);
  AppState.results = items;
  renderResultGrid(items, false);
}

function handleGenerateMore() {
  AppState.batchIndex += 1;
  const newItems = generateNicknameBatch(AppState.batchIndex);
  AppState.results = [...AppState.results, ...newItems];
  renderResultGrid(newItems, true);
  showToast(`⚡ Loaded ${newItems.length} more stylish variations!`);
}

function generateNicknameBatch(batchIdx) {
  const results = [];
  const rawInput = AppState.currentInput.trim();
  const baseName = rawInput.length > 0 ? rawInput : 'Shadow';

  const categoryPresets = STYLE_PRESETS[AppState.category] || STYLE_PRESETS.popular;
  
  // Filter by intensity if clean/extreme specified
  let selectedPresets = categoryPresets;
  if (AppState.intensity !== 'all') {
    selectedPresets = categoryPresets.filter(p => p.intensity === AppState.intensity);
    if (selectedPresets.length === 0) selectedPresets = categoryPresets;
  }

  // 1. First inject high-demand pure font representations on initial batch
  if (batchIdx === 0) {
    const coreFonts = [
      { name: 'Small Capitals', font: 'smallCaps', prefix: '', suffix: '', intensity: 'clean' },
      { name: 'Bold Sans-Serif', font: 'boldSans', prefix: '', suffix: '', intensity: 'clean' },
      { name: 'Gothic / Fraktur', font: 'gothic', prefix: '', suffix: '', intensity: 'clean' },
      { name: 'Double-Struck', font: 'doubleStruck', prefix: '', suffix: '', intensity: 'clean' },
      { name: 'Script Cursive', font: 'script', prefix: '', suffix: '', intensity: 'clean' },
      { name: 'Vaporwave Wide', font: 'fullwidth', prefix: '', suffix: '', intensity: 'clean' }
    ];

    coreFonts.forEach(cf => {
      const fn = FONT_MAPS[cf.font] || FONT_MAPS.normal;
      const styled = fn(baseName);
      results.push({
        id: 'font_' + cf.font + '_' + Math.random().toString(36).substr(2, 4),
        rawName: baseName,
        styledText: styled,
        prefix: '',
        suffix: '',
        font: cf.font,
        intensity: cf.intensity,
        desc: cf.name,
        length: Array.from(styled).length,
        unicodeStatus: 'Unicode Font',
        isLengthOk: Array.from(styled).length <= FF_RULES.recommendedMax
      });
    });
  }

  // 2. Generate Free Fire battle framed and decorated variations
  const count = 12;
  for (let i = 0; i < count; i++) {
    const preset = selectedPresets[(i + batchIdx * 4) % selectedPresets.length];
    const fontFn = FONT_MAPS[preset.font] || FONT_MAPS.bold;
    
    let variationName = baseName;
    if (AppState.mode === 'random' && i % 3 === 0) {
      const suffix = NAME_SUFFIXES[(i + batchIdx) % NAME_SUFFIXES.length];
      variationName = `${baseName}${suffix}`;
    }

    const styledName = `${preset.prefix}${fontFn(variationName)}${preset.suffix}`;
    const charLength = Array.from(styledName).length;
    const hasComplexUnicode = /[^\u0000-\u007F]/.test(styledName);
    const unicodeStatus = hasComplexUnicode ? 'Unicode Glyphs' : 'Standard';

    results.push({
      id: 'nick_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      rawName: baseName,
      styledText: styledName,
      prefix: preset.prefix,
      suffix: preset.suffix,
      font: preset.font,
      intensity: preset.intensity,
      desc: preset.desc,
      length: charLength,
      unicodeStatus: unicodeStatus,
      isLengthOk: charLength <= FF_RULES.recommendedMax
    });
  }

  // Save to Recents
  if (results.length > 0 && rawInput.length > 0) {
    addToRecents(results[0].styledText);
  }

  return results;
}

function getRandomBaseName(category) {
  const list = RANDOM_NAME_SEEDS[category] || RANDOM_NAME_SEEDS.popular;
  const rnd = list[Math.floor(Math.random() * list.length)];
  return rnd;
}

/* ===================================================================
   RESULT CARD RENDERING & MOBILE-FIRST INTERACTIONS
   =================================================================== */

function renderResultGrid(items, append = false) {
  const grid = document.getElementById('results-grid');
  if (!grid) return;

  if (!append) {
    grid.innerHTML = '';
  }

  items.forEach(item => {
    const card = createResultCard(item);
    grid.appendChild(card);
  });

  // Update live preview with first item
  if (!append && items.length > 0) {
    updatePreviewDisplay(items[0].styledText);
  }
}

function createResultCard(item) {
  const card = document.createElement('div');
  card.className = 'result-card';
  card.id = `card-${item.id}`;

  const isFavorited = AppState.favorites.includes(item.styledText);

  card.innerHTML = `
    <div class="result-card-top">
      <div class="result-tags">
        <span class="result-badge ${item.isLengthOk ? 'badge-length-ok' : 'badge-length-warn'}">
          ${item.length} Chars ${item.isLengthOk ? '✓' : '⚠'}
        </span>
        <span class="result-badge ${item.unicodeStatus === 'Standard' ? 'badge-unicode-check' : 'badge-unicode-notice'}">
          ${item.desc || item.unicodeStatus}
        </span>
      </div>
      <div class="result-top-btns">
        <button class="btn-icon-top ${isFavorited ? 'favorited' : ''}" title="${isFavorited ? 'Remove Favorite' : 'Save Favorite'}" data-action="favorite" aria-label="Favorite">
          ${isFavorited ? '♥' : '♡'}
        </button>
      </div>
    </div>

    <div class="result-nickname-box" title="Tap to copy nickname instantly">
      <div class="result-nickname-text">${escapeHtml(item.styledText)}</div>
      <span class="tap-to-copy-hint">Tap to Copy 📋</span>
    </div>

    <div class="result-card-actions">
      <button class="btn-copy-card" data-action="copy" aria-label="Copy ${item.styledText}">
        <span class="copy-icon">📋</span>
        <span class="copy-label">Copy Nickname</span>
      </button>
      <div class="result-card-secondary-btns">
        <button class="btn-card-sub" data-action="remix" title="Remix this design">
          <span>↻</span> Remix
        </button>
        <button class="btn-card-sub" data-action="preview" title="Test in Game Preview">
          <span>👁</span> Preview
        </button>
        <button class="btn-card-sub" data-action="customize" title="Customize in Editor">
          <span>✎</span> Edit
        </button>
      </div>
    </div>
  `;

  // Attach Event Handlers
  const copyBtn = card.querySelector('[data-action="copy"]');
  const favBtn = card.querySelector('[data-action="favorite"]');
  const remixBtn = card.querySelector('[data-action="remix"]');
  const previewBtn = card.querySelector('[data-action="preview"]');
  const customizeBtn = card.querySelector('[data-action="customize"]');
  const nickBox = card.querySelector('.result-nickname-box');

  // One-Tap Copy with tactile mobile feedback
  const triggerCopy = () => {
    copyToClipboard(item.styledText);
    
    // Tactile haptic vibration on supported mobile devices
    if (navigator.vibrate) {
      try { navigator.vibrate(35); } catch (e) {}
    }

    card.classList.add('card-copied');
    copyBtn.classList.add('copied');
    copyBtn.querySelector('.copy-label').textContent = '✓ Copied!';
    showToast(`✓ Copied "${item.styledText}" to clipboard!`, 'success');
    
    setTimeout(() => {
      card.classList.remove('card-copied');
      copyBtn.classList.remove('copied');
      copyBtn.querySelector('.copy-label').textContent = 'Copy Nickname';
    }, 1800);
  };

  copyBtn.addEventListener('click', triggerCopy);
  nickBox.addEventListener('click', triggerCopy);

  favBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleFavorite(item.styledText, favBtn);
  });

  remixBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    handleRemix(item);
  });

  previewBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    updatePreviewDisplay(item.styledText);
    const previewSection = document.getElementById('preview-sandbox');
    if (previewSection) {
      previewSection.scrollIntoView({ behavior: 'smooth' });
    }
    showToast(`Testing "${item.styledText}" in Game Preview`);
  });

  customizeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    openEditorWithItem(item);
  });

  return card;
}

function handleRemix(item) {
  const baseName = item.rawName || 'Shadow';
  AppState.currentInput = baseName;
  const input = document.getElementById('nickname-input');
  if (input) input.value = baseName;
  updateCharCounter(baseName);
  
  const categories = Object.keys(STYLE_PRESETS);
  AppState.category = categories[Math.floor(Math.random() * categories.length)];
  
  document.querySelectorAll('.btn-category').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-category') === AppState.category);
  });

  handleGenerate();
  showToast(`↻ Remixed "${baseName}" with new styles!`);
}

/* ===================================================================
   LIVE NICKNAME EDITOR
   =================================================================== */

function initLiveEditor() {
  const modal = document.getElementById('editor-modal');
  const closeBtn = document.getElementById('btn-close-editor');
  const prefixInput = document.getElementById('editor-prefix');
  const nameInput = document.getElementById('editor-name');
  const suffixInput = document.getElementById('editor-suffix');
  const fontSelect = document.getElementById('editor-font');
  const copyFinalBtn = document.getElementById('btn-copy-editor-final');
  const quickSymContainer = document.getElementById('editor-quick-symbols');

  if (!modal) return;

  closeBtn.addEventListener('click', () => {
    closeModal(modal);
  });

  const handleEditorChange = () => {
    AppState.editor.prefix = prefixInput.value;
    AppState.editor.name = nameInput.value;
    AppState.editor.suffix = suffixInput.value;
    AppState.editor.font = fontSelect.value;
    renderEditorPreview();
  };

  prefixInput.addEventListener('input', handleEditorChange);
  nameInput.addEventListener('input', handleEditorChange);
  suffixInput.addEventListener('input', handleEditorChange);
  fontSelect.addEventListener('change', handleEditorChange);

  // Quick symbol injector chips
  if (quickSymContainer) {
    const quickSymbols = ['亗', '꧁', '꧂', '༒', '☬', '★', '⚡', 'メ', '『', '』', '☠', '👑', '✦'];
    quickSymContainer.innerHTML = '';
    quickSymbols.forEach(sym => {
      const chip = document.createElement('button');
      chip.className = 'editor-sym-chip';
      chip.textContent = sym;
      chip.addEventListener('click', () => {
        prefixInput.value = sym;
        suffixInput.value = sym;
        handleEditorChange();
      });
      quickSymContainer.appendChild(chip);
    });
  }

  if (copyFinalBtn) {
    copyFinalBtn.addEventListener('click', () => {
      const finalStr = getEditorResultString();
      copyToClipboard(finalStr);
      showToast(`✓ Copied custom nickname "${finalStr}"!`, 'success');
      closeModal(modal);
    });
  }
}

function openEditorWithItem(item) {
  const modal = document.getElementById('editor-modal');
  if (!modal) return;

  document.getElementById('editor-prefix').value = item.prefix || '';
  document.getElementById('editor-name').value = item.rawName || 'Shadow';
  document.getElementById('editor-suffix').value = item.suffix || '';
  document.getElementById('editor-font').value = item.font || 'bold';

  AppState.editor = {
    prefix: item.prefix || '',
    name: item.rawName || 'Shadow',
    suffix: item.suffix || '',
    font: item.font || 'bold'
  };

  renderEditorPreview();
  openModal(modal);
}

function getEditorResultString() {
  const fontFn = FONT_MAPS[AppState.editor.font] || FONT_MAPS.bold;
  const styledBase = fontFn(AppState.editor.name);
  return `${AppState.editor.prefix}${styledBase}${AppState.editor.suffix}`;
}

function renderEditorPreview() {
  const previewBox = document.getElementById('editor-preview-text');
  const charCounter = document.getElementById('editor-char-counter');
  if (!previewBox) return;

  const result = getEditorResultString();
  previewBox.textContent = result;

  const len = Array.from(result).length;
  if (charCounter) {
    charCounter.textContent = `${len} / ${FF_RULES.recommendedMax} Chars`;
    charCounter.className = len <= FF_RULES.recommendedMax ? 'editor-counter-ok' : 'editor-counter-warn';
  }
}

/* ===================================================================
   GAME PREVIEW SANDBOX
   =================================================================== */

function initPreviewSandbox() {
  const tabs = document.querySelectorAll('.btn-preview-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const view = tab.getAttribute('data-view');
      renderPreviewSandbox(view);
    });
  });

  renderPreviewSandbox('profile');
}

function updatePreviewDisplay(nickname) {
  AppState.previewNickname = nickname;
  const activeTab = document.querySelector('.btn-preview-tab.active');
  const view = activeTab ? activeTab.getAttribute('data-view') : 'profile';
  renderPreviewSandbox(view);
}

function renderPreviewSandbox(view) {
  const stage = document.getElementById('preview-stage');
  if (!stage) return;

  const nick = AppState.previewNickname || '亗𝐒𝐇𝐀𝐃𝐎𝐖亗';

  if (view === 'profile') {
    stage.innerHTML = `
      <div class="mock-profile-card">
        <div class="mock-profile-banner">
          <div class="mock-badge-rank">GRANDMASTER</div>
          <div class="mock-level-badge">LV. 78</div>
        </div>
        <div class="mock-profile-body">
          <div class="mock-avatar">🔥</div>
          <div class="mock-user-info">
            <div class="mock-nickname">${escapeHtml(nick)}</div>
            <div class="mock-uid">UID: 9842107412</div>
            <div class="mock-guild">GUILD: APEX LEGENDS [Lv.6]</div>
          </div>
        </div>
      </div>
    `;
  } else if (view === 'killfeed') {
    stage.innerHTML = `
      <div class="mock-killfeed-stage">
        <div class="mock-killfeed-row">
          <span class="kill-actor">${escapeHtml(nick)}</span>
          <span class="kill-weapon">︻╦╤─</span>
          <span class="kill-victim">Enemy_Hunter</span>
          <span class="kill-headshot">HEADSHOT!</span>
        </div>
        <div class="mock-killfeed-row secondary">
          <span class="kill-actor">Viper_99</span>
          <span class="kill-weapon">💥</span>
          <span class="kill-victim">Ghost_Rider</span>
        </div>
      </div>
    `;
  } else if (view === 'lobby') {
    stage.innerHTML = `
      <div class="mock-lobby-podium">
        <div class="mock-podium-pedestal">
          <div class="mock-character-silhouette">⚔️</div>
          <div class="mock-player-plate">
            <div class="plate-name">${escapeHtml(nick)}</div>
            <div class="plate-sub">SEASON 34 MVP &bull; HEROIC V</div>
          </div>
        </div>
      </div>
    `;
  }
}

/* ===================================================================
   SYMBOL LIBRARY
   =================================================================== */

function initSymbolsLibrary() {
  const pillsContainer = document.getElementById('symbol-cat-pills');
  const symbolsGrid = document.getElementById('symbols-grid');
  const searchInput = document.getElementById('symbol-search-input');

  if (!symbolsGrid) return;

  const categories = [
    { id: 'all', label: 'All Symbols' },
    { id: 'popular', label: '🔥 Popular' },
    { id: 'crown', label: '👑 Crowns' },
    { id: 'weapons', label: '⚔ Weapons' },
    { id: 'skull', label: '💀 Skull' },
    { id: 'wings', label: '𓆩 Wings' },
    { id: 'japanese', label: 'メ Japanese' },
    { id: 'stars', label: '★ Stars' },
    { id: 'brackets', label: '『』 Brackets' },
    { id: 'lightning', label: '⚡ Energy' }
  ];

  if (pillsContainer) {
    pillsContainer.innerHTML = '';
    categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = `btn-sym-cat ${cat.id === 'all' ? 'active' : ''}`;
      btn.textContent = cat.label;
      btn.setAttribute('data-cat', cat.id);
      btn.addEventListener('click', () => {
        pillsContainer.querySelectorAll('.btn-sym-cat').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterSymbols();
      });
      pillsContainer.appendChild(btn);
    });
  }

  function renderSymbols(symbols) {
    symbolsGrid.innerHTML = '';
    symbols.forEach(sym => {
      const item = document.createElement('button');
      item.className = 'symbol-grid-item';
      item.title = `Click to copy ${sym.name}`;
      item.setAttribute('aria-label', `Copy symbol ${sym.char}`);
      item.innerHTML = `
        <span class="sym-char">${sym.char}</span>
        <span class="sym-name-hint">${sym.name}</span>
      `;
      item.addEventListener('click', () => {
        copyToClipboard(sym.char);
        if (navigator.vibrate) try { navigator.vibrate(25); } catch (e) {}
        item.classList.add('copied');
        showToast(`✓ Copied symbol "${sym.char}" to clipboard!`);
        setTimeout(() => item.classList.remove('copied'), 1500);
      });
      symbolsGrid.appendChild(item);
    });
  }

  function filterSymbols() {
    const activeBtn = pillsContainer ? pillsContainer.querySelector('.btn-sym-cat.active') : null;
    const cat = activeBtn ? activeBtn.getAttribute('data-cat') : 'all';
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    let filtered = SYMBOLS_DATABASE;

    if (cat !== 'all') {
      filtered = filtered.filter(s => s.cat === cat || s.tags.includes(cat));
    }

    if (query) {
      filtered = filtered.filter(s => 
        s.name.toLowerCase().includes(query) || 
        s.char.includes(query) || 
        s.tags.some(t => t.toLowerCase().includes(query))
      );
    }

    renderSymbols(filtered);
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterSymbols);
  }

  filterSymbols();
}

/* ===================================================================
   FAVORITES & SHORTLIST MANAGEMENT
   =================================================================== */

function toggleFavorite(text, btn) {
  const idx = AppState.favorites.indexOf(text);
  if (idx === -1) {
    AppState.favorites.push(text);
    if (btn) {
      btn.classList.add('favorited');
      btn.textContent = '♥';
    }
    showToast(`♥ Saved "${text}" to your favorites!`);
  } else {
    AppState.favorites.splice(idx, 1);
    if (btn) {
      btn.classList.remove('favorited');
      btn.textContent = '♡';
    }
    showToast(`Removed "${text}" from favorites.`);
  }

  localStorage.setItem('ff_favorites', JSON.stringify(AppState.favorites));
  updateFavoritesBadge();
}

function updateFavoritesBadge() {
  const badge = document.getElementById('fav-count-badge');
  if (!badge) return;
  const count = AppState.favorites.length;
  badge.textContent = count;
  badge.style.display = count > 0 ? 'inline-block' : 'none';
}

function initFavoritesDrawer() {
  const navFavBtn = document.getElementById('btn-nav-favorites');
  const modal = document.getElementById('favorites-modal');
  const closeBtn = document.getElementById('btn-close-favorites');
  const listContainer = document.getElementById('favorites-list-container');
  const clearAllBtn = document.getElementById('btn-clear-favorites');

  updateFavoritesBadge();

  if (!modal || !navFavBtn) return;

  navFavBtn.addEventListener('click', () => {
    renderFavoritesList();
    openModal(modal);
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => closeModal(modal));
  }

  if (clearAllBtn) {
    clearAllBtn.addEventListener('click', () => {
      AppState.favorites = [];
      localStorage.removeItem('ff_favorites');
      updateFavoritesBadge();
      renderFavoritesList();
      showToast('All saved favorites cleared.');
    });
  }

  function renderFavoritesList() {
    if (!listContainer) return;
    listContainer.innerHTML = '';

    if (AppState.favorites.length === 0) {
      listContainer.innerHTML = `
        <div class="empty-fav-message">
          <span style="font-size: 2.2rem; display: block; margin-bottom: 0.5rem;">♡</span>
          <p>You haven't saved any nicknames yet.</p>
          <small style="color: var(--text-muted);">Tap the heart icon on any generated nickname to save it here.</small>
        </div>
      `;
      return;
    }

    AppState.favorites.forEach((name, index) => {
      const row = document.createElement('div');
      row.className = 'fav-row-item';
      row.innerHTML = `
        <span class="fav-item-text">${escapeHtml(name)}</span>
        <div class="fav-item-actions">
          <button class="btn btn-secondary btn-sm" data-action="copy">Copy</button>
          <button class="btn-fav-remove" data-action="delete" title="Remove">✕</button>
        </div>
      `;

      row.querySelector('[data-action="copy"]').addEventListener('click', () => {
        copyToClipboard(name);
        showToast(`✓ Copied "${name}"!`, 'success');
      });

      row.querySelector('[data-action="delete"]').addEventListener('click', () => {
        toggleFavorite(name);
        renderFavoritesList();
      });

      listContainer.appendChild(row);
    });
  }
}

function addToRecents(text) {
  if (!text) return;
  AppState.recents = AppState.recents.filter(item => item !== text);
  AppState.recents.unshift(text);
  if (AppState.recents.length > 15) AppState.recents.pop();
  localStorage.setItem('ff_recents', JSON.stringify(AppState.recents));
}

/* ===================================================================
   MODAL & COMPARISON UTILITIES
   =================================================================== */

function initComparisonTool() {
  const modal = document.getElementById('comparison-modal');
  const closeBtn = document.getElementById('btn-close-comparison');
  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => closeModal(modal));
  }
}

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
  }, 2400);
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
  const particleCount = Math.min(30, Math.floor(width / 35));

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.8,
      speedY: Math.random() * 0.45 + 0.2,
      speedX: (Math.random() - 0.5) * 0.35,
      opacity: Math.random() * 0.6 + 0.2,
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
}

function initKeyboardShortcuts() {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(m => closeModal(m));
    }
  });
}
