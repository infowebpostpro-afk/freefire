/**
 * Free Fire Invisible Space - Application Controller
 * Handles 1-tap copy, custom generator, cursor-aware builder, fictional previews,
 * character inspector, multiple character alternatives, troubleshooter, and recents.
 */

const AppState = {
  activeCharId: 'u3164',
  customCount: 3,
  builderText: 'DarkKing',
  builderHistory: [],
  showInvisiblePlaceholder: false,
  activePreviewTab: 'profile',
  recents: JSON.parse(localStorage.getItem('ff_invisible_recents') || '[]')
};

document.addEventListener('DOMContentLoaded', () => {
  initHeroQuickCopy();
  initCustomGenerator();
  initNicknameBuilder();
  initGamingPreviews();
  initCharacterInspector();
  initAlternativeCharacters();
  initTroubleshooter();
  initBlankNameSection();
  initReadyMadeExamples();
  initRecentNames();
  initMobileStickyBar();
  initAmbientEmbers();
  initFAQAccordion();
});

/* ===================================================================
   CLIPBOARD UTILITY
   =================================================================== */

function getActiveChar() {
  return INVISIBLE_CHARACTERS.find(c => c.id === AppState.activeCharId) || INVISIBLE_CHARACTERS[0];
}

function copyTextToClipboard(text, feedbackMsg, triggerBtn) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      handleCopySuccess(feedbackMsg, triggerBtn);
    }).catch(() => {
      fallbackExecCopy(text, feedbackMsg, triggerBtn);
    });
  } else {
    fallbackExecCopy(text, feedbackMsg, triggerBtn);
  }
}

function fallbackExecCopy(text, feedbackMsg, triggerBtn) {
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
    handleCopySuccess(feedbackMsg, triggerBtn);
  } catch (err) {
    showToast('Failed to copy. Please manually select and copy.', 'error');
  }
  document.body.removeChild(textArea);
}

function handleCopySuccess(feedbackMsg, triggerBtn) {
  showToast(feedbackMsg || 'Invisible space copied! Paste into Free Fire.');
  if (triggerBtn) {
    triggerBtn.classList.add('copied');
    const originalText = triggerBtn.getAttribute('data-original-text') || triggerBtn.innerHTML;
    if (!triggerBtn.getAttribute('data-original-text')) {
      triggerBtn.setAttribute('data-original-text', originalText);
    }
    
    // If it has a specific span for status
    const statusSpan = triggerBtn.querySelector('.copy-status-text');
    if (statusSpan) {
      statusSpan.textContent = '✓ Copied!';
    } else if (triggerBtn.childNodes.length === 1 || triggerBtn.classList.contains('btn-huge-copy')) {
      triggerBtn.innerHTML = '<span>✓</span> Copied!';
    }

    setTimeout(() => {
      triggerBtn.classList.remove('copied');
      if (statusSpan) {
        statusSpan.textContent = triggerBtn.getAttribute('data-default-label') || 'Copy';
      } else {
        triggerBtn.innerHTML = triggerBtn.getAttribute('data-original-text');
      }
    }, 1800);
  }
}

function showToast(msg, type = 'success') {
  let toast = document.getElementById('space-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'space-toast';
    toast.className = 'space-toast';
    document.body.appendChild(toast);
  }

  const icon = type === 'success' ? '✓' : 'ℹ';
  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <div>
      <div>${msg}</div>
      <div class="toast-sub">Ready to paste into Free Fire nickname field</div>
    </div>
  `;

  toast.classList.add('show');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

/* ===================================================================
   1. LEVEL 1: QUICK COPY HERO
   =================================================================== */

function initHeroQuickCopy() {
  const mainCopyBtn = document.getElementById('btn-hero-copy');
  const visualizerBox = document.getElementById('visualizer-box');
  const preset1Btn = document.getElementById('btn-preset-1');
  const preset2Btn = document.getElementById('btn-preset-2');
  const preset3Btn = document.getElementById('btn-preset-3');

  function copySingleSpace(btn) {
    const char = getActiveChar().char;
    copyTextToClipboard(char, '1 Invisible Space copied!', btn);
  }

  if (mainCopyBtn) {
    mainCopyBtn.addEventListener('click', () => copySingleSpace(mainCopyBtn));
  }

  if (visualizerBox) {
    visualizerBox.addEventListener('click', () => copySingleSpace(mainCopyBtn));
  }

  if (preset1Btn) {
    preset1Btn.addEventListener('click', () => {
      const char = getActiveChar().char;
      copyTextToClipboard(char, '1 Invisible Space copied!', preset1Btn);
    });
  }

  if (preset2Btn) {
    preset2Btn.addEventListener('click', () => {
      const char = getActiveChar().char.repeat(2);
      copyTextToClipboard(char, '2 Invisible Spaces copied!', preset2Btn);
    });
  }

  if (preset3Btn) {
    preset3Btn.addEventListener('click', () => {
      const char = getActiveChar().char.repeat(3);
      copyTextToClipboard(char, '3 Invisible Spaces copied!', preset3Btn);
    });
  }
}

/* ===================================================================
   2. LEVEL 2: CUSTOM SPACE GENERATOR
   =================================================================== */

function initCustomGenerator() {
  const stepperMinus = document.getElementById('btn-stepper-minus');
  const stepperPlus = document.getElementById('btn-stepper-plus');
  const stepperVal = document.getElementById('stepper-count-val');
  const copyCustomBtn = document.getElementById('btn-copy-custom-spaces');
  const customPreviewTokens = document.getElementById('custom-preview-tokens');
  const chips = document.querySelectorAll('.btn-chip-qty');

  function updateDisplay() {
    if (stepperVal) stepperVal.textContent = AppState.customCount;
    if (copyCustomBtn) {
      copyCustomBtn.querySelector('.custom-count-label').textContent = AppState.customCount;
    }
    if (customPreviewTokens) {
      customPreviewTokens.textContent = `[invisible × ${AppState.customCount}]`;
    }

    // Update chips active state
    chips.forEach(chip => {
      const val = parseInt(chip.getAttribute('data-qty'), 10);
      if (val === AppState.customCount) {
        chip.classList.add('active');
      } else {
        chip.classList.remove('active');
      }
    });

    if (stepperMinus) {
      stepperMinus.disabled = AppState.customCount <= 1;
    }
    if (stepperPlus) {
      stepperPlus.disabled = AppState.customCount >= 20;
    }
  }

  if (stepperMinus) {
    stepperMinus.addEventListener('click', () => {
      if (AppState.customCount > 1) {
        AppState.customCount--;
        updateDisplay();
      }
    });
  }

  if (stepperPlus) {
    stepperPlus.addEventListener('click', () => {
      if (AppState.customCount < 20) {
        AppState.customCount++;
        updateDisplay();
      }
    });
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const qty = parseInt(chip.getAttribute('data-qty'), 10);
      if (!isNaN(qty)) {
        AppState.customCount = qty;
        updateDisplay();
      }
    });
  });

  if (copyCustomBtn) {
    copyCustomBtn.addEventListener('click', () => {
      const char = getActiveChar().char.repeat(AppState.customCount);
      copyTextToClipboard(char, `${AppState.customCount} Invisible Spaces copied!`, copyCustomBtn);
    });
  }

  updateDisplay();
}

/* ===================================================================
   3. LEVEL 3: NICKNAME BUILDER & CURSOR-AWARE CONTROLS
   =================================================================== */

function initNicknameBuilder() {
  const input = document.getElementById('builder-nickname-input');
  const charCountDisplay = document.getElementById('builder-char-count');
  const statusBadge = document.getElementById('builder-status-badge');
  const btnInsertStart = document.getElementById('btn-insert-start');
  const btnInsertCursor = document.getElementById('btn-insert-cursor');
  const btnInsertEnd = document.getElementById('btn-insert-end');
  const btnAdd1Space = document.getElementById('btn-add-1-space');
  const btnAdd2Spaces = document.getElementById('btn-add-2-spaces');
  const btnCopyNickname = document.getElementById('btn-copy-nickname');
  const btnUndo = document.getElementById('btn-builder-undo');
  const btnClear = document.getElementById('btn-builder-clear');
  const toggleShowInvisible = document.getElementById('toggle-show-invisible');

  function saveHistory() {
    AppState.builderHistory.push(input.value);
    if (AppState.builderHistory.length > 25) {
      AppState.builderHistory.shift();
    }
    if (btnUndo) btnUndo.disabled = AppState.builderHistory.length === 0;
  }

  function updateLengthAndPreviews() {
    const val = input.value;
    AppState.builderText = val;
    const len = Array.from(val).length;

    if (charCountDisplay) {
      charCountDisplay.textContent = `${len} / 12 Chars`;
    }

    if (statusBadge) {
      statusBadge.className = 'builder-char-badge';
      if (len === 0) {
        statusBadge.textContent = 'Empty Name';
        statusBadge.classList.add('warn');
      } else if (len <= 12) {
        statusBadge.textContent = '✓ Recommended Limit';
        statusBadge.classList.add('ok');
      } else {
        statusBadge.textContent = '⚠ Exceeds 12 Chars';
        statusBadge.classList.add('danger');
      }
    }

    renderAllPreviews();
  }

  function insertAtPosition(posType, count = 1) {
    saveHistory();
    const char = getActiveChar().char.repeat(count);
    const text = input.value;
    let start = input.selectionStart ?? text.length;
    let end = input.selectionEnd ?? text.length;

    let newText = '';
    let newCursorPos = start;

    if (posType === 'start') {
      newText = char + text;
      newCursorPos = char.length;
    } else if (posType === 'end') {
      newText = text + char;
      newCursorPos = newText.length;
    } else {
      // cursor
      newText = text.substring(0, start) + char + text.substring(end);
      newCursorPos = start + char.length;
    }

    input.value = newText;
    input.focus();
    input.setSelectionRange(newCursorPos, newCursorPos);
    updateLengthAndPreviews();
  }

  if (input) {
    input.value = AppState.builderText;
    input.addEventListener('input', () => {
      saveHistory();
      updateLengthAndPreviews();
    });
  }

  if (btnInsertStart) {
    btnInsertStart.addEventListener('click', () => insertAtPosition('start', 1));
  }

  if (btnInsertCursor) {
    btnInsertCursor.addEventListener('click', () => insertAtPosition('cursor', 1));
  }

  if (btnInsertEnd) {
    btnInsertEnd.addEventListener('click', () => insertAtPosition('end', 1));
  }

  if (btnAdd1Space) {
    btnAdd1Space.addEventListener('click', () => insertAtPosition('cursor', 1));
  }

  if (btnAdd2Spaces) {
    btnAdd2Spaces.addEventListener('click', () => insertAtPosition('cursor', 2));
  }

  if (btnUndo) {
    btnUndo.addEventListener('click', () => {
      if (AppState.builderHistory.length > 0) {
        const prev = AppState.builderHistory.pop();
        input.value = prev;
        btnUndo.disabled = AppState.builderHistory.length === 0;
        updateLengthAndPreviews();
      }
    });
  }

  if (btnClear) {
    btnClear.addEventListener('click', () => {
      if (input.value.length > 0) {
        saveHistory();
        input.value = '';
        updateLengthAndPreviews();
        input.focus();
      }
    });
  }

  if (btnCopyNickname) {
    btnCopyNickname.addEventListener('click', () => {
      const textToCopy = input.value;
      if (!textToCopy) {
        showToast('Type a nickname first before copying.', 'error');
        return;
      }
      copyTextToClipboard(textToCopy, 'Nickname copied to clipboard!', btnCopyNickname);
      saveToRecentNames(textToCopy);
    });
  }

  if (toggleShowInvisible) {
    toggleShowInvisible.addEventListener('change', (e) => {
      AppState.showInvisiblePlaceholder = e.target.checked;
      renderAllPreviews();
    });
  }

  updateLengthAndPreviews();
}

/* ===================================================================
   4. LIVE FICTIONAL GAMING PREVIEWS
   =================================================================== */

function formatPreviewString(rawText) {
  if (!rawText) return 'Player';
  if (!AppState.showInvisiblePlaceholder) return rawText;

  // Replace all invisible chars with visible representation
  let formatted = '';
  for (const char of rawText) {
    const isSpecialInvisible = INVISIBLE_REGEX_CHARS.some(item => item.char === char);
    if (isSpecialInvisible) {
      formatted += '░';
    } else {
      formatted += char;
    }
  }
  return formatted;
}

function renderAllPreviews() {
  const previewText = formatPreviewString(AppState.builderText);

  // Profile display
  const profileName = document.getElementById('preview-profile-name');
  if (profileName) profileName.textContent = previewText;

  // Lobby display
  const lobbyName = document.getElementById('preview-lobby-name');
  if (lobbyName) lobbyName.textContent = previewText;

  // Killfeed display
  const killfeedName = document.getElementById('preview-killfeed-name');
  if (killfeedName) killfeedName.textContent = previewText;
}

function initGamingPreviews() {
  const tabBtns = document.querySelectorAll('.gaming-tab-btn');
  const profileView = document.getElementById('preview-view-profile');
  const lobbyView = document.getElementById('preview-view-lobby');
  const killfeedView = document.getElementById('preview-view-killfeed');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetTab = btn.getAttribute('data-tab');
      AppState.activePreviewTab = targetTab;

      if (profileView) profileView.style.display = targetTab === 'profile' ? 'flex' : 'none';
      if (lobbyView) lobbyView.style.display = targetTab === 'lobby' ? 'grid' : 'none';
      if (killfeedView) killfeedView.style.display = targetTab === 'killfeed' ? 'flex' : 'none';
    });
  });
}

/* ===================================================================
   5. LEVEL 4: CHARACTER INSPECTOR
   =================================================================== */

function initCharacterInspector() {
  const input = document.getElementById('inspector-input');
  const totalDisplay = document.getElementById('inspector-total-chars');
  const invisibleDisplay = document.getElementById('inspector-invisible-chars');
  const visibleDisplay = document.getElementById('inspector-visible-chars');
  const statusDisplay = document.getElementById('inspector-status-text');
  const detectedList = document.getElementById('inspector-detected-list');
  const clearBtn = document.getElementById('btn-clear-inspector');

  function analyzeText(text) {
    if (!text) {
      if (totalDisplay) totalDisplay.textContent = '0';
      if (invisibleDisplay) invisibleDisplay.textContent = '0';
      if (visibleDisplay) visibleDisplay.textContent = '0';
      if (statusDisplay) statusDisplay.textContent = 'Waiting for input';
      if (detectedList) detectedList.innerHTML = '<span style="color: var(--text-muted);">Paste or type text above to test clipboard characters.</span>';
      return;
    }

    const chars = Array.from(text);
    let invisibleCount = 0;
    let visibleCount = 0;
    const detectedInvisibles = new Map();

    chars.forEach(char => {
      const match = INVISIBLE_REGEX_CHARS.find(item => item.char === char);
      if (match) {
        invisibleCount++;
        detectedInvisibles.set(match.code, (detectedInvisibles.get(match.code) || 0) + 1);
      } else {
        visibleCount++;
      }
    });

    if (totalDisplay) totalDisplay.textContent = chars.length;
    if (invisibleDisplay) invisibleDisplay.textContent = invisibleCount;
    if (visibleDisplay) visibleDisplay.textContent = visibleCount;

    if (statusDisplay) {
      if (invisibleCount > 0) {
        statusDisplay.textContent = '✓ Invisible Detected';
        statusDisplay.style.color = 'var(--neon-green)';
      } else {
        statusDisplay.textContent = 'No Invisible Found';
        statusDisplay.style.color = 'var(--text-muted)';
      }
    }

    if (detectedList) {
      if (invisibleCount === 0) {
        detectedList.innerHTML = '<span style="color: var(--neon-amber);">Only visible characters detected. No invisible spaces present.</span>';
      } else {
        let pills = '';
        detectedInvisibles.forEach((count, code) => {
          const info = INVISIBLE_REGEX_CHARS.find(i => i.code === code);
          pills += `<span class="char-codepoint" style="margin-right: 0.5rem; display: inline-block; margin-bottom: 0.25rem;">${code} (${info ? info.name : 'Unknown'}) × ${count}</span>`;
        });
        detectedList.innerHTML = pills;
      }
    }
  }

  if (input) {
    input.addEventListener('input', (e) => analyzeText(e.target.value));
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (input) {
        input.value = '';
        analyzeText('');
        input.focus();
      }
    });
  }

  // Pre-fill with a sample string showing invisible chars
  if (input) {
    input.value = 'Dark\u3164King';
    analyzeText(input.value);
  }
}

/* ===================================================================
   6. LEVEL 5: MULTIPLE CHARACTER OPTIONS & FALLBACK
   =================================================================== */

function initAlternativeCharacters() {
  const container = document.getElementById('characters-grid');
  if (!container) return;

  container.innerHTML = '';
  INVISIBLE_CHARACTERS.forEach(item => {
    const card = document.createElement('div');
    card.className = `character-card ${item.id === AppState.activeCharId ? 'active' : ''}`;
    card.id = `char-card-${item.id}`;

    card.innerHTML = `
      <div>
        <div class="char-card-header">
          <span class="char-codepoint">${item.code}</span>
          <span class="char-badge-status ${item.statusClass}">${item.status}</span>
        </div>
        <div class="char-name">${item.name}</div>
        <p class="char-desc">${item.description}</p>
        <div style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 0.45rem;">
          <strong>Width:</strong> ${item.displayWidth}
        </div>
        <div style="font-size: 0.75rem; color: var(--text-muted); font-style: italic;">
          ${item.technicalNotes}
        </div>
      </div>
      <div class="char-card-footer">
        <button class="btn-copy-char-card" data-char-id="${item.id}">
          <span>📋</span> Copy
        </button>
        <button class="btn-use-as-default" data-char-id="${item.id}">
          ${item.id === AppState.activeCharId ? '✓ Active' : 'Use in Tool'}
        </button>
      </div>
    `;

    // Bind copy button
    const copyBtn = card.querySelector('.btn-copy-char-card');
    copyBtn.addEventListener('click', () => {
      copyTextToClipboard(item.char, `${item.name} (${item.code}) copied!`, copyBtn);
    });

    // Bind switch active button
    const useBtn = card.querySelector('.btn-use-as-default');
    useBtn.addEventListener('click', () => {
      setActiveCharacter(item.id);
    });

    container.appendChild(card);
  });
}

function setActiveCharacter(charId) {
  AppState.activeCharId = charId;
  const activeObj = getActiveChar();

  // Update cards styling
  document.querySelectorAll('.character-card').forEach(c => c.classList.remove('active'));
  const activeCard = document.getElementById(`char-card-${charId}`);
  if (activeCard) activeCard.classList.add('active');

  document.querySelectorAll('.btn-use-as-default').forEach(btn => {
    if (btn.getAttribute('data-char-id') === charId) {
      btn.textContent = '✓ Active';
      btn.style.color = 'var(--neon-green)';
    } else {
      btn.textContent = 'Use in Tool';
      btn.style.color = 'var(--text-med)';
    }
  });

  // Update Hero visualizer token label
  const heroCodeBadge = document.getElementById('hero-active-code-badge');
  if (heroCodeBadge) {
    heroCodeBadge.textContent = `${activeObj.code} (${activeObj.name})`;
  }

  showToast(`Switched active invisible space to ${activeObj.name} (${activeObj.code})`);
}

/* ===================================================================
   7. LEVEL 6: "SPACE NOT WORKING?" TROUBLESHOOTER
   =================================================================== */

function initTroubleshooter() {
  const chipsContainer = document.getElementById('trouble-chips-container');
  const solutionContainer = document.getElementById('trouble-solution-container');
  if (!chipsContainer || !solutionContainer) return;

  chipsContainer.innerHTML = '';
  TROUBLESHOOTING_GUIDES.forEach((guide, index) => {
    const chip = document.createElement('button');
    chip.className = `btn-trouble-chip ${index === 0 ? 'active' : ''}`;
    chip.innerHTML = `<span>${guide.icon}</span> <span>${guide.title}</span>`;
    chip.addEventListener('click', () => {
      document.querySelectorAll('.btn-trouble-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      renderTroubleSolution(guide);
    });
    chipsContainer.appendChild(chip);
  });

  // Render initial guide
  if (TROUBLESHOOTING_GUIDES.length > 0) {
    renderTroubleSolution(TROUBLESHOOTING_GUIDES[0]);
  }
}

function renderTroubleSolution(guide) {
  const solutionContainer = document.getElementById('trouble-solution-container');
  if (!solutionContainer) return;

  const recChar = INVISIBLE_CHARACTERS.find(c => c.id === guide.recommendedCharId) || INVISIBLE_CHARACTERS[1];

  let causesListHtml = '';
  guide.causes.forEach(cause => {
    causesListHtml += `<li>${cause}</li>`;
  });

  let solutionsListHtml = '';
  guide.solutions.forEach(sol => {
    solutionsListHtml += `<li>${sol}</li>`;
  });

  solutionContainer.innerHTML = `
    <div class="trouble-solution-header">
      <span>${guide.icon}</span>
      <span>${guide.title}</span>
    </div>
    <p class="trouble-solution-summary">${guide.summary}</p>

    <div class="trouble-list-title">Possible Causes:</div>
    <ul class="trouble-steps-list">
      ${causesListHtml}
    </ul>

    <div class="trouble-list-title">Recommended Solution:</div>
    <ul class="trouble-steps-list">
      ${solutionsListHtml}
    </ul>

    <div class="trouble-action-row">
      <button id="btn-trouble-quick-copy" class="btn-trouble-recovery">
        <span>🔄</span> Switch to ${recChar.name} (${recChar.code}) &amp; Copy
      </button>
      <span style="font-size: 0.78rem; color: var(--text-muted);">
        Tested alternative character to bypass filter restrictions.
      </span>
    </div>
  `;

  const quickCopyBtn = document.getElementById('btn-trouble-quick-copy');
  if (quickCopyBtn) {
    quickCopyBtn.addEventListener('click', () => {
      setActiveCharacter(recChar.id);
      copyTextToClipboard(recChar.char, `Switched & copied ${recChar.name} (${recChar.code})!`, quickCopyBtn);
    });
  }
}

/* ===================================================================
   8. LEVEL 7: BLANK-LOOKING NAME & SPACED NAME MODE
   =================================================================== */

function initBlankNameSection() {
  const btnGenBlank = document.getElementById('btn-gen-blank-name');
  const btnSpacedConvert = document.getElementById('btn-spaced-convert');
  const spacedInput = document.getElementById('spaced-name-input');
  const spacedOutput = document.getElementById('spaced-name-output');
  const btnCopySpaced = document.getElementById('btn-copy-spaced');

  if (btnGenBlank) {
    btnGenBlank.addEventListener('click', () => {
      // Free Fire blank names traditionally use 3 Hangul Fillers
      const blankString = '\u3164\u3164\u3164';
      copyTextToClipboard(blankString, 'Blank-looking name copied (3 invisible spaces)!', btnGenBlank);
    });
  }

  function convertSpaced() {
    if (!spacedInput || !spacedOutput) return;
    const raw = spacedInput.value.trim();
    if (!raw) {
      spacedOutput.value = '';
      return;
    }
    const char = getActiveChar().char;
    // Replace standard spaces with 2 invisible spaces
    const spaced = raw.split(/\s+/).join(char + char);
    spacedOutput.value = spaced;
  }

  if (spacedInput) {
    spacedInput.addEventListener('input', convertSpaced);
    convertSpaced();
  }

  if (btnCopySpaced) {
    btnCopySpaced.addEventListener('click', () => {
      if (spacedOutput && spacedOutput.value) {
        copyTextToClipboard(spacedOutput.value, 'Spaced name copied to clipboard!', btnCopySpaced);
        saveToRecentNames(spacedOutput.value);
      } else {
        showToast('Enter words above first.', 'error');
      }
    });
  }
}

/* ===================================================================
   9. READY-MADE EXAMPLES
   =================================================================== */

function initReadyMadeExamples() {
  const container = document.getElementById('examples-grid');
  if (!container) return;

  container.innerHTML = '';
  READY_MADE_EXAMPLES.forEach(item => {
    const card = document.createElement('div');
    card.className = 'example-card';

    card.innerHTML = `
      <div>
        <div class="example-name-text">${item.name}</div>
        <div class="example-tag">${item.tag}</div>
      </div>
      <div class="example-btn-row">
        <button class="btn-example-copy" title="Copy nickname to clipboard">
          Copy
        </button>
        <button class="btn-example-edit" title="Load into builder to customize">
          Edit
        </button>
      </div>
    `;

    const copyBtn = card.querySelector('.btn-example-copy');
    copyBtn.addEventListener('click', () => {
      copyTextToClipboard(item.raw, `Copied "${item.name}"!`, copyBtn);
      saveToRecentNames(item.raw);
    });

    const editBtn = card.querySelector('.btn-example-edit');
    editBtn.addEventListener('click', () => {
      const builderInput = document.getElementById('builder-nickname-input');
      if (builderInput) {
        builderInput.value = item.raw;
        builderInput.dispatchEvent(new Event('input'));
        builderInput.focus();
        document.getElementById('nickname-builder').scrollIntoView({ behavior: 'smooth' });
        showToast(`Loaded "${item.name}" into Nickname Builder!`);
      }
    });

    container.appendChild(card);
  });
}

/* ===================================================================
   10. RECENT NAMES SHELF (LOCALSTORAGE)
   =================================================================== */

function saveToRecentNames(name) {
  if (!name || name.trim().length === 0) return;
  AppState.recents = AppState.recents.filter(item => item !== name);
  AppState.recents.unshift(name);
  if (AppState.recents.length > 10) {
    AppState.recents.pop();
  }
  localStorage.setItem('ff_invisible_recents', JSON.stringify(AppState.recents));
  renderRecentNames();
}

function initRecentNames() {
  renderRecentNames();
}

function renderRecentNames() {
  const shelf = document.getElementById('recent-names-shelf');
  const list = document.getElementById('recent-shelf-list');
  if (!shelf || !list) return;

  if (AppState.recents.length === 0) {
    shelf.style.display = 'none';
    return;
  }

  shelf.style.display = 'block';
  list.innerHTML = '';

  AppState.recents.forEach(name => {
    const chip = document.createElement('div');
    chip.className = 'recent-name-chip';

    // Format display for chip
    let display = formatPreviewString(name);
    if (display.length > 15) display = display.substring(0, 15) + '…';

    chip.innerHTML = `
      <span>${display}</span>
      <span class="recent-copy-trigger" title="Copy to clipboard">📋</span>
    `;

    chip.querySelector('.recent-copy-trigger').addEventListener('click', (e) => {
      e.stopPropagation();
      copyTextToClipboard(name, 'Recent name copied!');
    });

    chip.addEventListener('click', () => {
      const builderInput = document.getElementById('builder-nickname-input');
      if (builderInput) {
        builderInput.value = name;
        builderInput.dispatchEvent(new Event('input'));
        document.getElementById('nickname-builder').scrollIntoView({ behavior: 'smooth' });
      }
    });

    list.appendChild(chip);
  });
}

/* ===================================================================
   11. MOBILE STICKY BOTTOM BAR
   =================================================================== */

function initMobileStickyBar() {
  const stickyBar = document.getElementById('mobile-sticky-bar');
  const heroCopyBtn = document.getElementById('btn-hero-copy');
  const stickyCopyBtn = document.getElementById('btn-sticky-copy');

  if (!stickyBar || !heroCopyBtn) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        stickyBar.classList.add('visible');
      } else {
        stickyBar.classList.remove('visible');
      }
    });
  }, { threshold: 0.1 });

  observer.observe(heroCopyBtn);

  if (stickyCopyBtn) {
    stickyCopyBtn.addEventListener('click', () => {
      const char = getActiveChar().char;
      copyTextToClipboard(char, 'Invisible space copied!', stickyCopyBtn);
    });
  }
}

/* ===================================================================
   12. FAQ ACCORDION
   =================================================================== */

function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        // Close other items
        faqItems.forEach(i => i.classList.remove('open'));
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    }
  });
}

/* ===================================================================
   13. AMBIENT EMBERS CANVAS BACKGROUND
   =================================================================== */

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
  const particleCount = Math.min(35, Math.floor(width / 35));

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
