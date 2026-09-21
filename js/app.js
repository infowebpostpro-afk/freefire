/**
 * Free Fire Nickname Studio - Core Application Logic
 * Interactive studio, real-time styling, editor, preview sandbox, comparison & symbols
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
  previewNickname: '亗𝐒𝐇𝐀𝐃𝐎𝐖亗',
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
  
  // Initial Generation
  handleGenerate();
});

/* ===================================================================
   STUDIO CORE & GENERATION ENGINE
   =================================================================== */

function initStudio() {
  const nameInput = document.getElementById('nickname-input');
  const clearBtn = document.getElementById('input-clear-btn');
  const generateBtn = document.getElementById('btn-generate-main');
  const generateMoreBtn = document.getElementById('btn-generate-more');
  const modeStyleBtn = document.getElementById('mode-style-btn');
  const modeRandomBtn = document.getElementById('mode-random-btn');

  // Input listener
  nameInput.addEventListener('input', (e) => {
    AppState.currentInput = e.target.value;
    clearBtn.style.display = e.target.value.length > 0 ? 'flex' : 'none';
    updateCharCounter(e.target.value);
    updateSmartSuggestions(e.target.value);
  });

  clearBtn.addEventListener('click', () => {
    nameInput.value = '';
    AppState.currentInput = '';
    clearBtn.style.display = 'none';
    updateCharCounter('');
    nameInput.focus();
  });

  generateBtn.addEventListener('click', () => {
    handleGenerate();
  });

  if (generateMoreBtn) {
    generateMoreBtn.addEventListener('click', () => {
      handleGenerateMore();
    });
  }

  // Mode switching
  modeStyleBtn.addEventListener('click', () => {
    AppState.mode = 'style';
    modeStyleBtn.classList.add('active');
    modeRandomBtn.classList.remove('active');
    nameInput.placeholder = 'Enter your name (e.g. Shadow, Hunter, King)...';
    nameInput.disabled = false;
    handleGenerate();
  });

  modeRandomBtn.addEventListener('click', () => {
    AppState.mode = 'random';
    modeRandomBtn.classList.add('active');
    modeStyleBtn.classList.remove('active');
    nameInput.placeholder = 'Generating creative game names...';
    handleGenerate();
  });
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
  
  // Accurate length taking graphemes into account
  const len = Array.from(text).length;
  countEl.textContent = `${len} / ${FF_RULES.recommendedMax}`;
  
  const percentage = Math.min(100, Math.round((len / FF_RULES.recommendedMax) * 100));
  barEl.style.width = `${percentage}%`;
  
  if (len <= 10) {
    barEl.className = 'char-progress-bar';
    badgeEl.className = 'char-status-badge';
    badgeEl.textContent = '✓ Recommended Limit';
  } else if (len <= FF_RULES.recommendedMax) {
    barEl.className = 'char-progress-bar near-limit';
    badgeEl.className = 'char-status-badge near-limit';
    badgeEl.textContent = '⚠ Near Limit';
  } else {
    barEl.className = 'char-progress-bar over-limit';
    badgeEl.className = 'char-status-badge over-limit';
    badgeEl.textContent = '✕ Too Long (Game may truncate)';
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
      document.getElementById('nickname-input').value = name;
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
  showToast(`⚡ Generated ${newItems.length} more stylish names!`);
}

function generateNicknameBatch(batchIdx) {
  const results = [];
  const baseName = AppState.mode === 'style' 
    ? (AppState.currentInput.trim() || 'Shadow') 
    : getRandomBaseName(AppState.category);

  const presets = STYLE_PRESETS[AppState.category] || STYLE_PRESETS.popular;
  
  // Filter or prioritize by selected intensity
  let selectedPresets = presets;
  if (AppState.intensity !== 'all') {
    selectedPresets = presets.filter(p => p.intensity === AppState.intensity);
    if (selectedPresets.length === 0) selectedPresets = presets;
  }

  // Generate 8-12 variations per batch
  const count = 9;
  for (let i = 0; i < count; i++) {
    const preset = selectedPresets[(i + batchIdx * 3) % selectedPresets.length];
    
    // Choose font
    const fontFn = FONT_MAPS[preset.font] || FONT_MAPS.bold;
    
    let variationName = baseName;
    // Add subtle variation on higher batch numbers or random mode
    if (AppState.mode === 'random' && i % 3 === 0) {
      const suffix = NAME_SUFFIXES[(i + batchIdx) % NAME_SUFFIXES.length];
      variationName = `${baseName}${suffix}`;
    }

    const styledName = `${preset.prefix}${fontFn(variationName)}${preset.suffix}`;
    
    // Character length check
    const charLength = Array.from(styledName).length;
    
    // Unicode safety score
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

  // Track in Recents
  if (results.length > 0) {
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
   RESULT CARD RENDERING & INTERACTIONS
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

  // Update live preview with first item if preview stage exists
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
          ${item.unicodeStatus}
        </span>
      </div>
      <div class="result-top-btns">
        <button class="btn-icon-top ${isFavorited ? 'favorited' : ''}" title="${isFavorited ? 'Remove Favorite' : 'Save Favorite'}" data-action="favorite">
          ${isFavorited ? '♥' : '♡'}
        </button>
      </div>
    </div>

    <div class="result-nickname-box" title="Click to copy">
      <div class="result-nickname-text">${escapeHtml(item.styledText)}</div>
    </div>

    <div class="result-card-actions">
      <button class="btn-copy-card" data-action="copy">
        <span class="copy-icon">📋</span>
        <span class="copy-label">Copy Nickname</span>
      </button>
      <div class="result-card-secondary-btns">
        <button class="btn-card-sub" data-action="remix" title="Remix this name">
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

  // Copy click
  const triggerCopy = () => {
    copyToClipboard(item.styledText);
    copyBtn.classList.add('copied');
    copyBtn.querySelector('.copy-label').textContent = '✓ Copied!';
    showToast(`✓ Copied "${item.styledText}" to clipboard!`, 'success');
    setTimeout(() => {
      copyBtn.classList.remove('copied');
      copyBtn.querySelector('.copy-label').textContent = 'Copy Nickname';
    }, 2000);
  };

  copyBtn.addEventListener('click', triggerCopy);
  nickBox.addEventListener('click', triggerCopy);

  // Favorite click
  favBtn.addEventListener('click', () => {
    toggleFavorite(item.styledText, favBtn);
  });

  // Remix click
  remixBtn.addEventListener('click', () => {
    handleRemix(item);
  });

  // Preview click
  previewBtn.addEventListener('click', () => {
    updatePreviewDisplay(item.styledText);
    const previewSection = document.getElementById('preview-sandbox');
    if (previewSection) {
      previewSection.scrollIntoView({ behavior: 'smooth' });
    }
    showToast(`Testing "${item.styledText}" in Game Preview`);
  });

  // Customize in Live Editor click
  customizeBtn.addEventListener('click', () => {
    openEditorWithItem(item);
  });

  return card;
}

function handleRemix(item) {
  // Extract base clean string
  const baseName = item.rawName || 'Shadow';
  AppState.currentInput = baseName;
  document.getElementById('nickname-input').value = baseName;
  updateCharCounter(baseName);
  
  // Randomize preset category or shuffle
  const categories = Object.keys(STYLE_PRESETS);
  AppState.category = categories[Math.floor(Math.random() * categories.length)];
  
  // Sync category pill
  document.querySelectorAll('.btn-category').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-category') === AppState.category);
  });

  handleGenerate();
  showToast(`↻ Remixed "${baseName}" with fresh gaming styles!`);
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

  // Live input sync
  const handleEditorChange = () => {
    AppState.editor.prefix = prefixInput.value;
    AppState.editor.name = nameInput.value;
    AppState.editor.suffix = suffixInput.value;
    AppState.editor.font = fontSelect.value;
    renderEditorPreview();
  };

  [prefixInput, nameInput, suffixInput].forEach(inp => {
    inp.addEventListener('input', handleEditorChange);
  });
  fontSelect.addEventListener('change', handleEditorChange);

  // Quick symbol bar inside editor
  const quickSymbols = ['亗', '꧁', '꧂', '༒', '☬', '★', '⚡', '👑', '☠', '⚔', '『', '』', '乂', '✦', '💎'];
  quickSymContainer.innerHTML = '';
  quickSymbols.forEach(sym => {
    const btn = document.createElement('button');
    btn.className = 'btn-quick-sym';
    btn.textContent = sym;
    btn.addEventListener('click', () => {
      // Append to whichever input had recent focus or default to suffix
      if (document.activeElement === prefixInput) {
        prefixInput.value += sym;
      } else if (document.activeElement === nameInput) {
        nameInput.value += sym;
      } else {
        suffixInput.value += sym;
      }
      handleEditorChange();
    });
    quickSymContainer.appendChild(btn);
  });

  copyFinalBtn.addEventListener('click', () => {
    const finalNick = getEditorFinalNickname();
    copyToClipboard(finalNick);
    showToast(`✓ Final Nickname "${finalNick}" Copied!`, 'success');
    addToRecents(finalNick);
  });
}

function openEditorWithItem(item) {
  const modal = document.getElementById('editor-modal');
  if (!modal) return;

  AppState.editor.prefix = item.prefix || '';
  AppState.editor.name = item.rawName || 'Shadow';
  AppState.editor.suffix = item.suffix || '';
  AppState.editor.font = item.font || 'bold';

  document.getElementById('editor-prefix').value = AppState.editor.prefix;
  document.getElementById('editor-name').value = AppState.editor.name;
  document.getElementById('editor-suffix').value = AppState.editor.suffix;
  document.getElementById('editor-font').value = AppState.editor.font;

  renderEditorPreview();
  openModal(modal);
}

function getEditorFinalNickname() {
  const fontFn = FONT_MAPS[AppState.editor.font] || FONT_MAPS.normal;
  const styledBase = fontFn(AppState.editor.name);
  return `${AppState.editor.prefix}${styledBase}${AppState.editor.suffix}`;
}

function renderEditorPreview() {
  const previewEl = document.getElementById('editor-preview-text');
  const badgeEl = document.getElementById('editor-char-status');
  if (!previewEl) return;

  const finalNick = getEditorFinalNickname();
  previewEl.textContent = finalNick || '(Empty)';

  const len = Array.from(finalNick).length;
  if (badgeEl) {
    if (len <= FF_RULES.recommendedMax) {
      badgeEl.className = 'result-badge badge-length-ok';
      badgeEl.textContent = `${len} / ${FF_RULES.recommendedMax} Chars (Optimal)`;
    } else {
      badgeEl.className = 'result-badge badge-length-warn';
      badgeEl.textContent = `${len} / ${FF_RULES.recommendedMax} Chars (Long)`;
    }
  }
}

/* ===================================================================
   SYMBOL LIBRARY & SEARCH
   =================================================================== */

function initSymbolsLibrary() {
  const grid = document.getElementById('symbols-grid');
  const searchInput = document.getElementById('symbol-search-input');
  const catContainer = document.getElementById('symbol-cat-pills');
  if (!grid || !catContainer) return;

  // Categories setup
  const cats = [
    { id: 'all', label: 'All Symbols' },
    { id: 'popular', label: '🔥 Popular' },
    { id: 'crown', label: '👑 Crowns' },
    { id: 'weapons', label: '⚔ Battle' },
    { id: 'skull', label: '💀 Skull / Dark' },
    { id: 'stars', label: '★ Stars' },
    { id: 'wings', label: '𓆩 Wings' },
    { id: 'brackets', label: '『 Brackets' },
    { id: 'japanese', label: '乂 Ninja / Asian' },
    { id: 'lightning', label: '⚡ Energy' },
    { id: 'hearts', label: '♡ Cute' },
    { id: 'decorative', label: '✿ Decorative' },
    { id: 'rare', label: '💎 Rare / Invisible' }
  ];

  catContainer.innerHTML = '';
  cats.forEach(c => {
    const pill = document.createElement('button');
    pill.className = `btn-sym-cat ${c.id === 'all' ? 'active' : ''}`;
    pill.textContent = c.label;
    pill.setAttribute('data-cat', c.id);
    pill.addEventListener('click', () => {
      catContainer.querySelectorAll('.btn-sym-cat').forEach(b => b.classList.remove('active'));
      pill.classList.add('active');
      filterSymbols();
    });
    catContainer.appendChild(pill);
  });

  searchInput.addEventListener('input', () => {
    filterSymbols();
  });

  function filterSymbols() {
    const q = searchInput.value.toLowerCase().trim();
    const activeCat = catContainer.querySelector('.btn-sym-cat.active')?.getAttribute('data-cat') || 'all';

    const filtered = SYMBOLS_DATABASE.filter(item => {
      const matchesCat = activeCat === 'all' || item.cat === activeCat || item.tags.includes(activeCat);
      const matchesQuery = !q || item.char.includes(q) || item.name.toLowerCase().includes(q) || item.tags.some(t => t.toLowerCase().includes(q));
      return matchesCat && matchesQuery;
    });

    renderSymbols(filtered);
  }

  function renderSymbols(items) {
    grid.innerHTML = '';
    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'symbol-card';
      card.title = `${item.name} (${item.cat})`;

      card.innerHTML = `
        <span class="symbol-card-char">${item.char}</span>
        <div class="symbol-card-actions">
          <button class="btn-sym-action" data-action="copy" title="Copy symbol">Copy</button>
          <button class="btn-sym-action" data-action="insert" title="Add to Nickname Input">+Add</button>
        </div>
      `;

      card.querySelector('[data-action="copy"]').addEventListener('click', (e) => {
        e.stopPropagation();
        copyToClipboard(item.char);
        showToast(`Copied symbol "${item.char}"!`, 'success');
      });

      card.querySelector('[data-action="insert"]').addEventListener('click', (e) => {
        e.stopPropagation();
        insertSymbolToActive(item.char);
      });

      card.addEventListener('click', () => {
        insertSymbolToActive(item.char);
      });

      grid.appendChild(card);
    });
  }

  // Initial render
  renderSymbols(SYMBOLS_DATABASE);
}

function insertSymbolToActive(symbol) {
  const mainInput = document.getElementById('nickname-input');
  if (mainInput) {
    mainInput.value += symbol;
    AppState.currentInput = mainInput.value;
    updateCharCounter(mainInput.value);
    showToast(`Added "${symbol}" to Nickname Input`);
    mainInput.focus();
  }
}

/* ===================================================================
   FREE FIRE STYLE PREVIEW SANDBOX
   =================================================================== */

function initPreviewSandbox() {
  const tabs = document.querySelectorAll('.btn-preview-tab');
  const stage = document.getElementById('preview-stage');
  if (!tabs.length || !stage) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const view = tab.getAttribute('data-view');
      renderPreviewView(view);
    });
  });

  // Render initial view
  renderPreviewView('profile');
}

function updatePreviewDisplay(nickname) {
  AppState.previewNickname = nickname;
  const activeTab = document.querySelector('.btn-preview-tab.active');
  const view = activeTab ? activeTab.getAttribute('data-view') : 'profile';
  renderPreviewView(view);
}

function renderPreviewView(view) {
  const stage = document.getElementById('preview-stage');
  if (!stage) return;

  const nick = AppState.previewNickname || '亗𝐒𝐇𝐀𝐃𝐎𝐖亗';

  if (view === 'profile') {
    stage.innerHTML = `
      <div class="mock-profile-card">
        <div class="mock-profile-header">
          <div class="mock-avatar-badge">🔥</div>
          <div class="mock-profile-info">
            <div class="mock-profile-name">${escapeHtml(nick)}</div>
            <div class="mock-profile-sub">
              <span class="mock-level-tag">LVL 75</span>
              <span>UID: 284918491</span>
              <span>👑 Grandmaster</span>
            </div>
          </div>
        </div>
        <div class="mock-profile-stats">
          <div class="mock-stat-item">
            <span class="mock-stat-val">68.4%</span>
            <span class="mock-stat-label">Headshot Rate</span>
          </div>
          <div class="mock-stat-item">
            <span class="mock-stat-val">4,892</span>
            <span class="mock-stat-label">Total Likes</span>
          </div>
          <div class="mock-stat-item">
            <span class="mock-stat-val">Master IV</span>
            <span class="mock-stat-label">Battle Royale</span>
          </div>
        </div>
      </div>
    `;
  } else if (view === 'killfeed') {
    stage.innerHTML = `
      <div class="mock-killfeed-view">
        <div class="mock-killfeed-item">
          <span class="killfeed-killer">${escapeHtml(nick)}</span>
          <span class="killfeed-weapon">⚔️ HEADSHOT [M1887]</span>
          <span class="killfeed-victim">EnemyPlayer_99</span>
        </div>
        <div class="mock-killfeed-item" style="animation-delay: 0.1s;">
          <span class="killfeed-killer">${escapeHtml(nick)}</span>
          <span class="killfeed-weapon">🎯 SNIPER [AWM]</span>
          <span class="killfeed-victim">ApexRusher</span>
        </div>
      </div>
    `;
  } else if (view === 'lobby') {
    stage.innerHTML = `
      <div class="mock-lobby-view">
        <div class="mock-character-podium">🥷</div>
        <div class="mock-lobby-name">${escapeHtml(nick)}</div>
        <span class="mock-lobby-status">READY FOR BATTLE</span>
      </div>
    `;
  }
}

/* ===================================================================
   NICKNAME COMPARISON TOOL
   =================================================================== */

function initComparisonTool() {
  const modal = document.getElementById('comparison-modal');
  const closeBtn = document.getElementById('btn-close-comparison');
  if (!modal) return;

  closeBtn.addEventListener('click', () => {
    closeModal(modal);
  });
}

function openComparisonModal(namesToCompare) {
  const modal = document.getElementById('comparison-modal');
  const grid = document.getElementById('comparison-grid');
  if (!modal || !grid) return;

  grid.innerHTML = '';
  namesToCompare.slice(0, 4).forEach(nick => {
    const card = document.createElement('div');
    card.className = 'compare-card';

    const len = Array.from(nick).length;
    const isStandard = !/[^\u0000-\u007F]/.test(nick);
    const hasSymbols = /[亗꧁꧂༒☬★⚡👑☠⚔『』乂✦💎]/.test(nick);

    const readability = !hasSymbols ? 'High (Standard text)' : 'Stylized (Ornamental)';
    const decoration = hasSymbols ? 'Extensive / Battle Ready' : 'Clean / Minimal';
    const compatWarning = isStandard ? 'Universal Display' : 'Device/Font Dependent';

    card.innerHTML = `
      <div class="compare-card-title">${escapeHtml(nick)}</div>
      <ul class="compare-metric-list">
        <li class="compare-metric-item">
          <span>Length:</span>
          <span>${len} / ${FF_RULES.recommendedMax} Chars</span>
        </li>
        <li class="compare-metric-item">
          <span>Readability:</span>
          <span>${readability}</span>
        </li>
        <li class="compare-metric-item">
          <span>Decoration:</span>
          <span>${decoration}</span>
        </li>
        <li class="compare-metric-item">
          <span>Font Compatibility:</span>
          <span>${compatWarning}</span>
        </li>
      </ul>
      <button class="btn btn-primary" style="width: 100%; font-size: 0.85rem;" data-action="copy-compare">
        Copy This Name
      </button>
    `;

    card.querySelector('[data-action="copy-compare"]').addEventListener('click', () => {
      copyToClipboard(nick);
      showToast(`✓ Copied "${nick}"!`, 'success');
    });

    grid.appendChild(card);
  });

  openModal(modal);
}

/* ===================================================================
   FAVORITES & HISTORY STORAGE
   =================================================================== */

function initFavoritesDrawer() {
  const navFavBtn = document.getElementById('btn-nav-favorites');
  const modal = document.getElementById('favorites-modal');
  const closeBtn = document.getElementById('btn-close-favorites');

  if (navFavBtn && modal) {
    navFavBtn.addEventListener('click', () => {
      renderFavoritesModal();
      openModal(modal);
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      closeModal(modal);
    });
  }
}

function toggleFavorite(styledName, buttonEl) {
  const idx = AppState.favorites.indexOf(styledName);
  if (idx > -1) {
    AppState.favorites.splice(idx, 1);
    if (buttonEl) {
      buttonEl.classList.remove('favorited');
      buttonEl.textContent = '♡';
      buttonEl.title = 'Save Favorite';
    }
    showToast(`Removed from favorites`);
  } else {
    AppState.favorites.push(styledName);
    if (buttonEl) {
      buttonEl.classList.add('favorited');
      buttonEl.textContent = '♥';
      buttonEl.title = 'Remove Favorite';
    }
    showToast(`♥ Saved "${styledName}" to Favorites!`, 'success');
  }

  localStorage.setItem('ff_favorites', JSON.stringify(AppState.favorites));
  updateFavoritesCountBadge();
}

function updateFavoritesCountBadge() {
  const badge = document.getElementById('fav-count-badge');
  if (badge) {
    badge.textContent = AppState.favorites.length;
    badge.style.display = AppState.favorites.length > 0 ? 'inline-block' : 'none';
  }
}

function addToRecents(styledName) {
  if (!styledName) return;
  // Unique only
  AppState.recents = AppState.recents.filter(n => n !== styledName);
  AppState.recents.unshift(styledName);
  if (AppState.recents.length > 15) {
    AppState.recents.pop();
  }
  localStorage.setItem('ff_recents', JSON.stringify(AppState.recents));
}

function renderFavoritesModal() {
  const listEl = document.getElementById('favorites-list');
  if (!listEl) return;

  if (AppState.favorites.length === 0) {
    listEl.innerHTML = `
      <div style="text-align: center; padding: 2.5rem 1rem; color: var(--text-muted);">
        <p style="font-size: 2.5rem; margin-bottom: 0.5rem;">♡</p>
        <p style="font-size: 1.1rem; color: var(--text-high); margin-bottom: 0.5rem;">No saved favorites yet.</p>
        <p style="font-size: 0.9rem;">Click the heart icon on any nickname card to save it here.</p>
      </div>
    `;
    return;
  }

  listEl.innerHTML = '';
  AppState.favorites.forEach(name => {
    const row = document.createElement('div');
    row.style.cssText = `
      display: flex; align-items: center; justify-content: space-between; 
      padding: 0.85rem 1rem; background: var(--bg-card); border: 1px solid var(--border-subtle); 
      border-radius: var(--radius-md); margin-bottom: 0.75rem;
    `;
    row.innerHTML = `
      <span style="font-family: var(--font-gaming); font-size: 1.15rem; color: #fff;">${escapeHtml(name)}</span>
      <div style="display: flex; gap: 0.5rem;">
        <button class="btn btn-primary" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;" data-action="copy-fav">Copy</button>
        <button class="btn btn-secondary" style="padding: 0.4rem 0.6rem; font-size: 0.8rem;" data-action="delete-fav" title="Delete">✕</button>
      </div>
    `;

    row.querySelector('[data-action="copy-fav"]').addEventListener('click', () => {
      copyToClipboard(name);
      showToast(`✓ Copied "${name}"!`, 'success');
    });

    row.querySelector('[data-action="delete-fav"]').addEventListener('click', () => {
      toggleFavorite(name, null);
      renderFavoritesModal();
    });

    listEl.appendChild(row);
  });
}

/* ===================================================================
   AMBIENT BACKGROUND CANVAS (Embers / Floating Sparks)
   =================================================================== */

function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Check reduced motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const particleCount = Math.min(45, Math.floor(window.innerWidth / 30));
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.75,
      speedY: -(Math.random() * 0.8 + 0.3),
      speedX: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.7 + 0.2,
      fadeRate: Math.random() * 0.005 + 0.002,
      color: Math.random() > 0.4 ? '255, 87, 34' : '255, 170, 0'
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.y += p.speedY;
      p.x += p.speedX;
      p.alpha -= p.fadeRate;

      if (p.alpha <= 0 || p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
        p.alpha = Math.random() * 0.7 + 0.2;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
      ctx.shadowBlur = 10;
      ctx.shadowColor = `rgba(${p.color}, 0.8)`;
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

/* ===================================================================
   KEYBOARD SHORTCUTS & MODAL HELPERS
   =================================================================== */

function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // Enter on main input generates
    if (e.key === 'Enter' && document.activeElement === document.getElementById('nickname-input')) {
      e.preventDefault();
      handleGenerate();
    }
    // Ctrl/Cmd + Enter generates more
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleGenerateMore();
    }
    // Escape closes modals
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(m => closeModal(m));
    }
  });

  // Modal click outside to close
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal(overlay);
      }
    });
  });

  // FAQ Accordion
  document.querySelectorAll('.faq-item').forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      item.classList.toggle('active');
    });
  });
}

function openModal(modalEl) {
  modalEl.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(modalEl) {
  modalEl.classList.remove('active');
  document.body.style.overflow = '';
}

/* ===================================================================
   UTILITY FUNCTIONS
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
  }, 2600);
}

function escapeHtml(string) {
  const div = document.createElement('div');
  div.textContent = string;
  return div.innerHTML;
}
