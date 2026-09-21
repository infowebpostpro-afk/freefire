/**
 * Free Fire Bio Studio - Application Controller
 * Handles Ready Bios search/filtering, One-tap copy, Custom Bio Studio,
 * Live simulated preview, raw code toggle, favorites, recents, and troubleshooter.
 */

const BioState = {
  activeMode: 'ready', // 'ready' | 'create'
  activeCategory: 'all',
  searchQuery: '',
  displayLimit: 18,
  creatorText: 'Silent in lobby. Loud in game.',
  creatorColor: '#FF5722',
  creatorColorCode: '[FF5722]',
  creatorStyleLevel: 'pro',
  creatorActivePersona: 'rusher',
  creatorFormatting: { bold: false, italic: false, underline: false, center: false },
  previewMode: 'visual', // 'visual' | 'raw'
  favorites: JSON.parse(localStorage.getItem('ff_bio_favs') || '[]'),
  recents: JSON.parse(localStorage.getItem('ff_bio_recents') || '[]')
};

document.addEventListener('DOMContentLoaded', () => {
  initModeSwitching();
  initSearchAndCategories();
  initSurpriseMe();
  initCreatorStudio();
  initTroubleshooter();
  initSavedAndRecents();
  initAmbientEmbers();
  initFAQAccordion();

  // Initial render
  renderReadyBios();
  updateCreatorPreview();
});

/* ===================================================================
   CLIPBOARD UTILITY
   =================================================================== */

function copyBioToClipboard(text, feedbackMsg, triggerBtn) {
  if (!text) return;

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      handleBioCopySuccess(text, feedbackMsg, triggerBtn);
    }).catch(() => {
      fallbackBioCopy(text, feedbackMsg, triggerBtn);
    });
  } else {
    fallbackBioCopy(text, feedbackMsg, triggerBtn);
  }
}

function fallbackBioCopy(text, feedbackMsg, triggerBtn) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    handleBioCopySuccess(text, feedbackMsg, triggerBtn);
  } catch (err) {
    showBioToast('Failed to copy. Please manually select and copy text.', 'error');
  }
  document.body.removeChild(textArea);
}

function handleBioCopySuccess(text, feedbackMsg, triggerBtn) {
  showBioToast(feedbackMsg || 'Bio copied! Paste it into your Free Fire profile signature.');
  saveToRecentBios(text);

  if (triggerBtn) {
    triggerBtn.classList.add('copied');
    const originalText = triggerBtn.getAttribute('data-orig') || triggerBtn.innerHTML;
    if (!triggerBtn.getAttribute('data-orig')) {
      triggerBtn.setAttribute('data-orig', originalText);
    }

    const spanText = triggerBtn.querySelector('.copy-label-text');
    if (spanText) {
      spanText.textContent = '✓ Copied!';
    } else {
      triggerBtn.innerHTML = '✓ Copied!';
    }

    setTimeout(() => {
      triggerBtn.classList.remove('copied');
      if (spanText) {
        spanText.textContent = triggerBtn.getAttribute('data-default-label') || 'Copy';
      } else {
        triggerBtn.innerHTML = triggerBtn.getAttribute('data-orig');
      }
    }, 1800);
  }
}

function showBioToast(msg, type = 'success') {
  let toast = document.getElementById('bio-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'bio-toast';
    toast.className = 'space-toast';
    document.body.appendChild(toast);
  }

  const icon = type === 'success' ? '✓' : 'ℹ';
  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <div>
      <div>${msg}</div>
      <div class="toast-sub">Ready to paste into Free Fire profile signature</div>
    </div>
  `;

  toast.classList.add('show');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

/* ===================================================================
   1. PRIMARY MODE SWITCHING (Ready Bios vs Create Your Own)
   =================================================================== */

function initModeSwitching() {
  const tabReady = document.getElementById('tab-mode-ready');
  const tabCreate = document.getElementById('tab-mode-create');
  const viewReady = document.getElementById('view-ready-bios');
  const viewCreate = document.getElementById('view-create-bio');

  function switchMode(mode) {
    BioState.activeMode = mode;
    if (mode === 'ready') {
      tabReady.classList.add('active');
      tabCreate.classList.remove('active');
      viewReady.style.display = 'block';
      viewCreate.style.display = 'none';
    } else {
      tabCreate.classList.add('active');
      tabReady.classList.remove('active');
      viewCreate.style.display = 'block';
      viewReady.style.display = 'none';
      updateCreatorPreview();
    }
  }

  if (tabReady) tabReady.addEventListener('click', () => switchMode('ready'));
  if (tabCreate) tabCreate.addEventListener('click', () => switchMode('create'));

  // Global switch function for "Customize" buttons
  window.switchToCreateModeWithText = function(text) {
    BioState.creatorText = text;
    const input = document.getElementById('creator-bio-input');
    if (input) input.value = text;
    switchMode('create');
    document.getElementById('view-create-bio').scrollIntoView({ behavior: 'smooth' });
    showBioToast(`Loaded bio into editor!`);
  };
}

/* ===================================================================
   2. READY BIOS SEARCH & CATEGORY FILTERING
   =================================================================== */

function initSearchAndCategories() {
  const searchInput = document.getElementById('bio-search-input');
  const clearSearchBtn = document.getElementById('bio-search-clear');
  const catScrollContainer = document.getElementById('bio-cat-chips-row');

  // Render category chips
  if (catScrollContainer) {
    catScrollContainer.innerHTML = `
      <button class="btn-bio-cat active" data-cat="all">
        <span>🔥</span> All Bios
      </button>
    `;

    BIO_CATEGORIES.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = 'btn-bio-cat';
      btn.setAttribute('data-cat', cat.id);
      btn.innerHTML = `<span>${cat.icon}</span> ${cat.label}`;
      btn.addEventListener('click', () => {
        document.querySelectorAll('.btn-bio-cat').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        BioState.activeCategory = cat.id;
        BioState.displayLimit = 18;
        renderReadyBios();
      });
      catScrollContainer.appendChild(btn);
    });

    catScrollContainer.querySelector('[data-cat="all"]').addEventListener('click', (e) => {
      document.querySelectorAll('.btn-bio-cat').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      BioState.activeCategory = 'all';
      BioState.displayLimit = 18;
      renderReadyBios();
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      BioState.searchQuery = e.target.value.toLowerCase().trim();
      clearSearchBtn.style.display = e.target.value.length > 0 ? 'flex' : 'none';
      BioState.displayLimit = 18;
      renderReadyBios();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      BioState.searchQuery = '';
      clearSearchBtn.style.display = 'none';
      searchInput.focus();
      BioState.displayLimit = 18;
      renderReadyBios();
    });
  }
}

function getFilteredBios() {
  let list = READY_BIOS;

  // Filter by category
  if (BioState.activeCategory !== 'all') {
    list = list.filter(b => b.category === BioState.activeCategory);
  }

  // Filter by search query
  if (BioState.searchQuery) {
    const q = BioState.searchQuery;
    list = list.filter(b => {
      return b.text.toLowerCase().includes(q) ||
             b.tags.some(tag => tag.toLowerCase().includes(q)) ||
             b.category.toLowerCase().includes(q);
    });
  }

  return list;
}

function renderReadyBios() {
  const container = document.getElementById('bio-cards-grid');
  const countBadge = document.getElementById('bio-results-count');
  const loadMoreBtn = document.getElementById('btn-load-more-bios');
  if (!container) return;

  const filtered = getFilteredBios();
  const visibleItems = filtered.slice(0, BioState.displayLimit);

  if (countBadge) {
    countBadge.textContent = `${filtered.length} bios available`;
  }

  if (visibleItems.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
        <div style="font-size: 2rem; margin-bottom: 0.5rem;">🔍</div>
        <h3 style="color: var(--text-high); font-family: var(--font-gaming);">No bios found matching "${BioState.searchQuery}"</h3>
        <p style="font-size: 0.88rem; margin-top: 0.25rem;">Try another search term or click "All Bios" to explore all categories.</p>
      </div>
    `;
    if (loadMoreBtn) loadMoreBtn.style.display = 'none';
    return;
  }

  container.innerHTML = '';
  visibleItems.forEach(bio => {
    const isFav = BioState.favorites.some(f => f.text === bio.text);
    const catObj = BIO_CATEGORIES.find(c => c.id === bio.category) || { label: 'Gaming', icon: '🎮' };

    const card = document.createElement('div');
    card.className = 'bio-card';
    card.setAttribute('data-bio-id', bio.id);

    card.innerHTML = `
      <div>
        <div class="bio-card-header">
          <span class="bio-cat-badge"><span>${catObj.icon}</span> ${catObj.label}</span>
          <button class="btn-bio-save ${isFav ? 'saved' : ''}" title="Save to favorites" aria-label="Save to favorites">
            ${isFav ? '♥' : '♡'}
          </button>
        </div>
        <div class="bio-text-content">${escapeHtml(bio.text)}</div>
      </div>
      <div>
        <button class="btn-bio-copy-card" aria-label="Copy bio">
          <span>📋</span> <span class="copy-label-text">Copy Bio</span>
        </button>
        <div class="bio-card-actions">
          <button class="btn-bio-action btn-action-customize" title="Edit in builder">
            <span>✎</span> Customize
          </button>
          <button class="btn-bio-action btn-action-remix" title="Cycle framing symbols">
            <span>⚡</span> Remix
          </button>
        </div>
      </div>
    `;

    // Copy action
    const copyBtn = card.querySelector('.btn-bio-copy-card');
    copyBtn.addEventListener('click', () => {
      // Use rawCode if available or text
      const toCopy = bio.rawCode || bio.text;
      copyBioToClipboard(toCopy, `Copied "${bio.text}"!`, copyBtn);
    });

    // Save/Favorite action
    const saveBtn = card.querySelector('.btn-bio-save');
    saveBtn.addEventListener('click', () => {
      toggleFavoriteBio(bio, saveBtn);
    });

    // Customize action
    const custBtn = card.querySelector('.btn-action-customize');
    custBtn.addEventListener('click', () => {
      window.switchToCreateModeWithText(bio.text);
    });

    // Remix action
    const remixBtn = card.querySelector('.btn-action-remix');
    remixBtn.addEventListener('click', () => {
      remixBioCard(card, bio);
    });

    container.appendChild(card);
  });

  // Load More button visibility
  if (loadMoreBtn) {
    if (filtered.length > BioState.displayLimit) {
      loadMoreBtn.style.display = 'inline-flex';
      loadMoreBtn.onclick = () => {
        BioState.displayLimit += 18;
        renderReadyBios();
      };
    } else {
      loadMoreBtn.style.display = 'none';
    }
  }
}

function remixBioCard(card, bio) {
  const textElem = card.querySelector('.bio-text-content');
  const frames = [
    ['⚡', '⚡'],
    ['亗', '亗'],
    ['♛', '♛'],
    ['★', '★'],
    ['☠', '☠'],
    ['❤️', '❤️'],
    ['꧁', '꧂']
  ];

  // Clean existing frames
  let raw = bio.text;
  frames.forEach(([l, r]) => {
    raw = raw.replaceAll(l, '').replaceAll(r, '').trim();
  });

  const nextFrame = frames[Math.floor(Math.random() * frames.length)];
  const remixed = `${nextFrame[0]} ${raw} ${nextFrame[1]}`;
  textElem.textContent = remixed;

  // Update copy handler to copy remixed text
  const copyBtn = card.querySelector('.btn-bio-copy-card');
  copyBtn.onclick = () => {
    copyBioToClipboard(remixed, `Copied remixed bio!`, copyBtn);
  };

  showBioToast(`Remixed: ${remixed}`);
}

/* ===================================================================
   3. "SURPRISE ME" RANDOM PICKER
   =================================================================== */

function initSurpriseMe() {
  const surpriseBtn = document.getElementById('btn-surprise-me');
  if (!surpriseBtn) return;

  surpriseBtn.addEventListener('click', () => {
    const bios = READY_BIOS;
    const randomBio = bios[Math.floor(Math.random() * bios.length)];
    BioState.activeCategory = 'all';
    BioState.searchQuery = '';
    const searchInput = document.getElementById('bio-search-input');
    if (searchInput) searchInput.value = '';

    renderReadyBios();

    const targetCard = document.querySelector(`[data-bio-id="${randomBio.id}"]`);
    if (targetCard) {
      targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      targetCard.style.outline = '2px solid #ffaa00';
      targetCard.style.boxShadow = '0 0 25px rgba(255, 170, 0, 0.6)';
      setTimeout(() => {
        targetCard.style.outline = '';
        targetCard.style.boxShadow = '';
      }, 2500);
    }

    showBioToast(`🎲 Surprise bio: "${randomBio.text}"`);
  });
}

/* ===================================================================
   4. CREATE YOUR OWN BIO STUDIO CONTROLLER
   =================================================================== */

function initCreatorStudio() {
  const input = document.getElementById('creator-bio-input');
  const visibleLenDisplay = document.getElementById('creator-visible-length');
  const codeLenDisplay = document.getElementById('creator-code-length');
  const lengthPill = document.getElementById('creator-length-badge');
  const personaRow = document.getElementById('persona-vibes-row');
  const quickColorsContainer = document.getElementById('quick-colors-grid');
  const customColorPicker = document.getElementById('custom-color-picker');
  const customHexText = document.getElementById('custom-hex-text');
  const colorPresetsRow = document.getElementById('color-presets-row');
  const symbolsContainer = document.getElementById('compact-symbols-container');
  const starterSelect = document.getElementById('starter-template-select');
  const btnInsertInvis = document.getElementById('btn-creator-invis-space');
  const btnCopyStyled = document.getElementById('btn-creator-copy-styled');
  const btnCopyPlain = document.getElementById('btn-creator-copy-plain');
  const toggleVisual = document.getElementById('btn-toggle-visual');
  const toggleRaw = document.getElementById('btn-toggle-raw');

  // Render Personas
  if (personaRow) {
    personaRow.innerHTML = '';
    PERSONA_VIBES.forEach(persona => {
      const btn = document.createElement('button');
      btn.className = `btn-persona-card ${persona.id === BioState.creatorActivePersona ? 'active' : ''}`;
      btn.innerHTML = `
        <div class="persona-icon">${persona.icon}</div>
        <div class="persona-name">${persona.name}</div>
      `;
      btn.addEventListener('click', () => {
        document.querySelectorAll('.btn-persona-card').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        applyPersonaVibe(persona);
      });
      personaRow.appendChild(btn);
    });
  }

  // Render Quick Colors
  if (quickColorsContainer) {
    quickColorsContainer.innerHTML = '';
    QUICK_COLORS.forEach(c => {
      const btn = document.createElement('button');
      btn.className = `color-swatch-btn ${c.hex.toLowerCase() === BioState.creatorColor.toLowerCase() ? 'active' : ''}`;
      btn.style.backgroundColor = c.hex;
      btn.setAttribute('title', `${c.name} (${c.code})`);
      btn.addEventListener('click', () => {
        document.querySelectorAll('.color-swatch-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        BioState.creatorColor = c.hex;
        BioState.creatorColorCode = c.code;
        if (customColorPicker) customColorPicker.value = c.hex;
        if (customHexText) customHexText.textContent = c.hex;
        updateCreatorPreview();
      });
      quickColorsContainer.appendChild(btn);
    });
  }

  if (customColorPicker) {
    customColorPicker.addEventListener('input', (e) => {
      const hex = e.target.value.toUpperCase();
      BioState.creatorColor = hex;
      BioState.creatorColorCode = `[${hex.replace('#', '')}]`;
      if (customHexText) customHexText.textContent = hex;
      document.querySelectorAll('.color-swatch-btn').forEach(b => b.classList.remove('active'));
      updateCreatorPreview();
    });
  }

  // Render Multi-color Presets
  if (colorPresetsRow) {
    colorPresetsRow.innerHTML = '';
    COLOR_PRESETS.forEach(preset => {
      const btn = document.createElement('button');
      btn.className = 'btn-preset-gradient';
      btn.innerHTML = `
        <span class="gradient-dot" style="background: linear-gradient(135deg, ${preset.colors[0]}, ${preset.colors[1]});"></span>
        <span>${preset.name}</span>
      `;
      btn.addEventListener('click', () => {
        applyColorPreset(preset);
      });
      colorPresetsRow.appendChild(btn);
    });
  }

  // Render Compact Symbols
  if (symbolsContainer) {
    symbolsContainer.innerHTML = '';
    COMPACT_SYMBOLS.forEach(sym => {
      const btn = document.createElement('button');
      btn.className = 'btn-compact-symbol';
      btn.textContent = sym;
      btn.addEventListener('click', () => {
        insertAtCursor(sym);
      });
      symbolsContainer.appendChild(btn);
    });
  }

  // Starter Templates Selector
  if (starterSelect) {
    starterSelect.innerHTML = '<option value="">Select a starter template...</option>';
    STARTER_TEMPLATES.forEach(tmpl => {
      const opt = document.createElement('option');
      opt.value = tmpl.text;
      opt.textContent = `${tmpl.label}: ${tmpl.text}`;
      starterSelect.appendChild(opt);
    });

    starterSelect.addEventListener('change', (e) => {
      if (e.target.value) {
        input.value = e.target.value;
        BioState.creatorText = e.target.value;
        updateCreatorPreview();
      }
    });
  }

  // Style Level Buttons
  document.querySelectorAll('.btn-style-level').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.btn-style-level').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      BioState.creatorStyleLevel = btn.getAttribute('data-level');
      updateCreatorPreview();
    });
  });

  // Formatting BBCode buttons
  document.querySelectorAll('.btn-bio-format').forEach(btn => {
    btn.addEventListener('click', () => {
      const tag = btn.getAttribute('data-tag');
      btn.classList.toggle('active');
      BioState.creatorFormatting[tag] = btn.classList.contains('active');
      updateCreatorPreview();
    });
  });

  // Text Input Event
  if (input) {
    input.value = BioState.creatorText;
    input.addEventListener('input', (e) => {
      BioState.creatorText = e.target.value;
      updateCreatorPreview();
    });
  }

  // Insert Invisible Space
  if (btnInsertInvis) {
    btnInsertInvis.addEventListener('click', () => {
      insertAtCursor('\u3164');
      showBioToast('Inserted invisible space character at cursor!');
    });
  }

  // Visual / Raw Code Toggle
  if (toggleVisual && toggleRaw) {
    toggleVisual.addEventListener('click', () => {
      toggleVisual.classList.add('active');
      toggleRaw.classList.remove('active');
      BioState.previewMode = 'visual';
      togglePreviewDisplay();
    });

    toggleRaw.addEventListener('click', () => {
      toggleRaw.classList.add('active');
      toggleVisual.classList.remove('active');
      BioState.previewMode = 'raw';
      togglePreviewDisplay();
    });
  }

  // Copy Styled Code Action
  if (btnCopyStyled) {
    btnCopyStyled.addEventListener('click', () => {
      const rawCode = generateRawBioCode();
      copyBioToClipboard(rawCode, 'Styled Free Fire bio code copied!', btnCopyStyled);
    });
  }

  // Copy Plain Text Fallback Action
  if (btnCopyPlain) {
    btnCopyPlain.addEventListener('click', () => {
      const plainText = getStyledPlainText();
      copyBioToClipboard(plainText, 'Clean plain text copied (no code tags)!', btnCopyPlain);
    });
  }
}

function insertAtCursor(text) {
  const input = document.getElementById('creator-bio-input');
  if (!input) return;

  const start = input.selectionStart ?? input.value.length;
  const end = input.selectionEnd ?? input.value.length;
  const current = input.value;

  const updated = current.substring(0, start) + text + current.substring(end);
  input.value = updated;
  BioState.creatorText = updated;

  const newPos = start + text.length;
  input.focus();
  input.setSelectionRange(newPos, newPos);
  updateCreatorPreview();
}

function applyPersonaVibe(persona) {
  BioState.creatorActivePersona = persona.id;
  const randTmpl = persona.templates[Math.floor(Math.random() * persona.templates.length)];
  const personalized = randTmpl.replace('{NAME}', 'Player');

  const input = document.getElementById('creator-bio-input');
  if (input) {
    input.value = personalized;
    BioState.creatorText = personalized;
  }

  // Set persona color preset
  const preset = COLOR_PRESETS.find(p => p.id === persona.colorPreset);
  if (preset) {
    applyColorPreset(preset);
  } else {
    updateCreatorPreview();
  }

  showBioToast(`Applied "${persona.name}" persona & template!`);
}

function applyColorPreset(preset) {
  BioState.creatorColor = preset.colors[0];
  const hexNoHash = preset.colors[0].replace('#', '');
  BioState.creatorColorCode = `[${hexNoHash}]`;

  const customPicker = document.getElementById('custom-color-picker');
  const customHex = document.getElementById('custom-hex-text');
  if (customPicker) customPicker.value = preset.colors[0];
  if (customHex) customHex.textContent = preset.colors[0];

  updateCreatorPreview();
  showBioToast(`Applied "${preset.name}" color preset!`);
}

function getStyledPlainText() {
  let text = BioState.creatorText.trim() || 'Player';
  if (BioState.creatorStyleLevel === 'pro') {
    text = `⚡ ${text} ⚡`;
  } else if (BioState.creatorStyleLevel === 'extreme') {
    text = `亗 ⚡ ${text} ⚡ 亗`;
  }
  return text;
}

function generateRawBioCode() {
  const plainText = getStyledPlainText();
  let code = '';

  // Formatting tags
  if (BioState.creatorFormatting.bold) code += '[b]';
  if (BioState.creatorFormatting.italic) code += '[i]';
  if (BioState.creatorFormatting.underline) code += '[u]';
  if (BioState.creatorFormatting.center) code += '[c]';

  // Primary color tag
  const hexNoHash = BioState.creatorColor.replace('#', '').toUpperCase();
  code += `[${hexNoHash}]` + plainText;

  return code;
}

function updateCreatorPreview() {
  const rawCode = generateRawBioCode();
  const plainText = getStyledPlainText();

  // Update signature previews
  const visualDisplay = document.getElementById('profile-rendered-signature');
  const rawDisplay = document.getElementById('profile-raw-signature');

  if (visualDisplay) {
    visualDisplay.style.color = BioState.creatorColor;
    visualDisplay.style.fontWeight = BioState.creatorFormatting.bold ? '900' : '700';
    visualDisplay.style.fontStyle = BioState.creatorFormatting.italic ? 'italic' : 'normal';
    visualDisplay.style.textDecoration = BioState.creatorFormatting.underline ? 'underline' : 'none';
    visualDisplay.style.textAlign = BioState.creatorFormatting.center ? 'center' : 'left';
    visualDisplay.textContent = plainText;
  }

  if (rawDisplay) {
    rawDisplay.textContent = rawCode;
  }

  // Update counters
  const visibleLen = Array.from(plainText).length;
  const codeLen = Array.from(rawCode).length;

  const visDisplay = document.getElementById('creator-visible-length');
  const codeDisplay = document.getElementById('creator-code-length');
  const badge = document.getElementById('creator-length-badge');

  if (visDisplay) visDisplay.textContent = visibleLen;
  if (codeDisplay) codeDisplay.textContent = codeLen;

  if (badge) {
    badge.className = 'length-badge-pill';
    if (codeLen <= 40) {
      badge.textContent = '✓ Recommended';
      badge.classList.add('ok');
    } else if (codeLen <= 60) {
      badge.textContent = 'Moderate Length';
      badge.classList.add('warn');
    } else {
      badge.textContent = '⚠ May Exceed Limit';
      badge.classList.add('danger');
    }
  }

  togglePreviewDisplay();
}

function togglePreviewDisplay() {
  const visualDisplay = document.getElementById('profile-rendered-signature');
  const rawDisplay = document.getElementById('profile-raw-signature');
  if (!visualDisplay || !rawDisplay) return;

  if (BioState.previewMode === 'raw') {
    visualDisplay.style.display = 'none';
    rawDisplay.style.display = 'block';
  } else {
    visualDisplay.style.display = 'block';
    rawDisplay.style.display = 'none';
  }
}

/* ===================================================================
   5. SAVED (FAVORITES) & RECENTLY COPIED SHELF
   =================================================================== */

function toggleFavoriteBio(bio, btn) {
  const index = BioState.favorites.findIndex(f => f.text === bio.text);
  if (index > -1) {
    BioState.favorites.splice(index, 1);
    if (btn) {
      btn.classList.remove('saved');
      btn.textContent = '♡';
    }
    showBioToast('Removed from favorites.');
  } else {
    BioState.favorites.push(bio);
    if (btn) {
      btn.classList.add('saved');
      btn.textContent = '♥';
    }
    showBioToast('Saved to your favorites!');
  }
  localStorage.setItem('ff_bio_favs', JSON.stringify(BioState.favorites));
  renderSavedShelf();
}

function saveToRecentBios(text) {
  if (!text || text.trim().length === 0) return;
  BioState.recents = BioState.recents.filter(item => item !== text);
  BioState.recents.unshift(text);
  if (BioState.recents.length > 10) BioState.recents.pop();
  localStorage.setItem('ff_bio_recents', JSON.stringify(BioState.recents));
  renderRecentShelf();
}

function initSavedAndRecents() {
  renderSavedShelf();
  renderRecentShelf();
}

function renderSavedShelf() {
  const shelf = document.getElementById('shelf-saved-bios');
  const list = document.getElementById('shelf-saved-list');
  if (!shelf || !list) return;

  if (BioState.favorites.length === 0) {
    shelf.style.display = 'none';
    return;
  }

  shelf.style.display = 'block';
  list.innerHTML = '';

  BioState.favorites.forEach(bio => {
    const chip = document.createElement('div');
    chip.className = 'shelf-bio-chip';
    chip.innerHTML = `
      <span>♥</span>
      <span>${escapeHtml(bio.text.length > 25 ? bio.text.substring(0, 25) + '…' : bio.text)}</span>
      <span class="chip-del" title="Remove from favorites">✕</span>
    `;

    chip.addEventListener('click', (e) => {
      if (!e.target.classList.contains('chip-del')) {
        copyBioToClipboard(bio.rawCode || bio.text, `Copied saved bio!`);
      }
    });

    chip.querySelector('.chip-del').addEventListener('click', (e) => {
      e.stopPropagation();
      toggleFavoriteBio(bio);
      renderReadyBios(); // Update hearts in grid
    });

    list.appendChild(chip);
  });
}

function renderRecentShelf() {
  const shelf = document.getElementById('shelf-recent-bios');
  const list = document.getElementById('shelf-recent-list');
  if (!shelf || !list) return;

  if (BioState.recents.length === 0) {
    shelf.style.display = 'none';
    return;
  }

  shelf.style.display = 'block';
  list.innerHTML = '';

  BioState.recents.forEach(text => {
    const chip = document.createElement('div');
    chip.className = 'shelf-bio-chip';
    chip.innerHTML = `
      <span>📋</span>
      <span>${escapeHtml(text.length > 25 ? text.substring(0, 25) + '…' : text)}</span>
    `;

    chip.addEventListener('click', () => {
      copyBioToClipboard(text, 'Copied recent bio!');
    });

    list.appendChild(chip);
  });
}

/* ===================================================================
   6. INTERACTIVE TROUBLESHOOTER
   =================================================================== */

function initTroubleshooter() {
  const chipsContainer = document.getElementById('bio-trouble-chips-container');
  const solutionContainer = document.getElementById('bio-trouble-solution-container');
  if (!chipsContainer || !solutionContainer) return;

  chipsContainer.innerHTML = '';
  TROUBLESHOOTING_BIO_GUIDES.forEach((guide, index) => {
    const chip = document.createElement('button');
    chip.className = `btn-bio-trouble ${index === 0 ? 'active' : ''}`;
    chip.innerHTML = `<span>${guide.icon}</span> <span>${guide.title}</span>`;
    chip.addEventListener('click', () => {
      document.querySelectorAll('.btn-bio-trouble').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      renderBioTroubleSolution(guide);
    });
    chipsContainer.appendChild(chip);
  });

  if (TROUBLESHOOTING_BIO_GUIDES.length > 0) {
    renderBioTroubleSolution(TROUBLESHOOTING_BIO_GUIDES[0]);
  }
}

function renderBioTroubleSolution(guide) {
  const solutionContainer = document.getElementById('bio-trouble-solution-container');
  if (!solutionContainer) return;

  let causesHtml = '';
  guide.causes.forEach(cause => {
    causesHtml += `<li>${cause}</li>`;
  });

  let solutionsHtml = '';
  guide.solutions.forEach(sol => {
    solutionsHtml += `<li>${sol}</li>`;
  });

  solutionContainer.innerHTML = `
    <div style="font-family: var(--font-gaming); font-size: 1.15rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.45rem;">
      <span>${guide.icon}</span> <span>${guide.title}</span>
    </div>
    <p style="font-size: 0.88rem; color: var(--text-med); margin-bottom: 0.85rem;">${guide.summary}</p>

    <div style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); margin-bottom: 0.35rem; font-weight: 700;">
      Possible Causes:
    </div>
    <ul style="padding-left: 1.25rem; font-size: 0.85rem; color: var(--text-high); line-height: 1.6; margin-bottom: 1rem;">
      ${causesHtml}
    </ul>

    <div style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); margin-bottom: 0.35rem; font-weight: 700;">
      Recommended Solution:
    </div>
    <ul style="padding-left: 1.25rem; font-size: 0.85rem; color: var(--text-high); line-height: 1.6; margin-bottom: 1.25rem;">
      ${solutionsHtml}
    </ul>

    <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; padding-top: 0.75rem; border-top: 1px solid var(--border-subtle);">
      <button id="btn-trouble-copy-plain" class="btn btn-secondary" style="height: 40px; font-size: 0.82rem;">
        <span>📄</span> Copy Clean Plain Text (Safe Fallback)
      </button>
      <button id="btn-trouble-goto-creator" class="btn btn-primary" style="height: 40px; font-size: 0.82rem;">
        <span>✎</span> Open Studio to Shorten
      </button>
    </div>
  `;

  const copyPlainBtn = document.getElementById('btn-trouble-copy-plain');
  if (copyPlainBtn) {
    copyPlainBtn.addEventListener('click', () => {
      const plain = getStyledPlainText();
      copyBioToClipboard(plain, 'Clean plain text copied!', copyPlainBtn);
    });
  }

  const gotoCreatorBtn = document.getElementById('btn-trouble-goto-creator');
  if (gotoCreatorBtn) {
    gotoCreatorBtn.addEventListener('click', () => {
      const tabCreate = document.getElementById('tab-mode-create');
      if (tabCreate) tabCreate.click();
      document.getElementById('view-create-bio').scrollIntoView({ behavior: 'smooth' });
    });
  }
}

/* ===================================================================
   7. UTILITIES: ESCAPE HTML, ACCORDION, PARTICLES
   =================================================================== */

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, (m) => {
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

function initFAQAccordion() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-question');
    if (btn) {
      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    }
  });
}

function initAmbientEmbers() {
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
  const count = Math.min(30, Math.floor(width / 40));

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.8,
      speedY: Math.random() * 0.4 + 0.2,
      speedX: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.2,
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
