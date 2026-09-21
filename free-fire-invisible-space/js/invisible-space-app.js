/**
 * Free Fire Invisible Space - Application Controller
 * Handles 1-tap copy, multi-character Unicode switching (U+3164, U+00A0, U+2800, U+FFA0),
 * two-word builder, cursor-aware builder, live gaming previews, paste-back Unicode detector,
 * transparent compatibility matrix, and troubleshooter decision tree.
 */

const AppState = {
  activeCharId: 'u3164',
  customCount: 3,
  twoWordGapQty: 1,
  builderText: 'DarkKing',
  builderHistory: [],
  showInvisiblePlaceholder: false,
  activePreviewTab: 'profile',
  recents: JSON.parse(localStorage.getItem('ff_invisible_recents') || '[]')
};

document.addEventListener('DOMContentLoaded', () => {
  initHeroQuickCopy();
  initHeroCharSelector();
  initTwoWordBuilder();
  initCustomGenerator();
  initNicknameBuilder();
  initGamingPreviews();
  initCharacterInspector();
  initAlternativeCharacters();
  initCompatibilityMatrix();
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
    const originalHtml = triggerBtn.getAttribute('data-original-html') || triggerBtn.innerHTML;
    if (!triggerBtn.getAttribute('data-original-html')) {
      triggerBtn.setAttribute('data-original-html', originalHtml);
    }
    
    const statusSpan = triggerBtn.querySelector('.copy-status-text');
    if (statusSpan) {
      statusSpan.textContent = '✓ Copied!';
    } else {
      triggerBtn.innerHTML = '<span>✓</span> Copied!';
    }

    setTimeout(() => {
      triggerBtn.classList.remove('copied');
      if (statusSpan) {
        statusSpan.textContent = triggerBtn.getAttribute('data-default-label') || 'COPY INVISIBLE SPACE';
      } else {
        triggerBtn.innerHTML = triggerBtn.getAttribute('data-original-html');
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
   1. HERO QUICK COPY & CHARACTER SELECTOR
   =================================================================== */

function initHeroCharSelector() {
  const heroOptBtns = document.querySelectorAll('.btn-hero-char-opt');
  heroOptBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const charId = btn.getAttribute('data-char-id');
      if (charId) {
        setActiveCharacter(charId);
      }
    });
  });

  const nextAltBtn = document.getElementById('btn-hero-try-next');
  if (nextAltBtn) {
    nextAltBtn.addEventListener('click', () => {
      cycleToNextCharacter();
    });
  }
}

function cycleToNextCharacter() {
  const currentIndex = INVISIBLE_CHARACTERS.findIndex(c => c.id === AppState.activeCharId);
  const nextIndex = (currentIndex + 1) % INVISIBLE_CHARACTERS.length;
  const nextChar = INVISIBLE_CHARACTERS[nextIndex];
  setActiveCharacter(nextChar.id);
  copyTextToClipboard(nextChar.char, `Switched to ${nextChar.name} (${nextChar.code}) and copied!`);
}

function initHeroQuickCopy() {
  const mainCopyBtn = document.getElementById('btn-hero-copy');
  const visualizerBox = document.getElementById('visualizer-box');
  const preset1Btn = document.getElementById('btn-preset-1');
  const preset2Btn = document.getElementById('btn-preset-2');
  const preset3Btn = document.getElementById('btn-preset-3');

  function copySingleSpace(btn) {
    const charObj = getActiveChar();
    copyTextToClipboard(charObj.char, `1 Invisible Space (${charObj.code}) copied!`, btn);
  }

  if (mainCopyBtn) {
    mainCopyBtn.addEventListener('click', () => copySingleSpace(mainCopyBtn));
  }

  if (visualizerBox) {
    visualizerBox.addEventListener('click', () => copySingleSpace(mainCopyBtn));
  }

  if (preset1Btn) {
    preset1Btn.addEventListener('click', () => {
      const charObj = getActiveChar();
      copyTextToClipboard(charObj.char, `1 Invisible Space (${charObj.code}) copied!`, preset1Btn);
    });
  }

  if (preset2Btn) {
    preset2Btn.addEventListener('click', () => {
      const charObj = getActiveChar();
      const char = charObj.char.repeat(2);
      copyTextToClipboard(char, `2 Invisible Spaces (${charObj.code}) copied!`, preset2Btn);
    });
  }

  if (preset3Btn) {
    preset3Btn.addEventListener('click', () => {
      const charObj = getActiveChar();
      const char = charObj.char.repeat(3);
      copyTextToClipboard(char, `3 Invisible Spaces (${charObj.code}) copied!`, preset3Btn);
    });
  }
}

function setActiveCharacter(charId) {
  AppState.activeCharId = charId;
  const activeObj = getActiveChar();

  // Update Hero Selector Buttons
  document.querySelectorAll('.btn-hero-char-opt').forEach(btn => {
    if (btn.getAttribute('data-char-id') === charId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Update Hero Badges & Labels
  const heroBadge = document.getElementById('hero-active-code-badge');
  if (heroBadge) {
    heroBadge.textContent = `${activeObj.code} (${activeObj.name})`;
  }

  const heroBtnLabel = document.getElementById('hero-btn-char-name');
  if (heroBtnLabel) {
    heroBtnLabel.textContent = `(${activeObj.code})`;
  }

  // Update Visualizer Token Label
  const visualToken = document.getElementById('hero-visual-token-text');
  if (visualToken) {
    visualToken.textContent = `[• ${activeObj.code} •]`;
  }

  // Update Character Alternative Cards in Section 5
  document.querySelectorAll('.character-card').forEach(c => c.classList.remove('active'));
  const activeCard = document.getElementById(`char-card-${charId}`);
  if (activeCard) activeCard.classList.add('active');

  document.querySelectorAll('.btn-use-as-default').forEach(btn => {
    if (btn.getAttribute('data-char-id') === charId) {
      btn.textContent = '✓ Active in Tool';
      btn.style.color = 'var(--neon-green)';
    } else {
      btn.textContent = 'Use in Tool';
      btn.style.color = 'var(--text-med)';
    }
  });

  // Update Two-Word Builder
  updateTwoWordBuilder();

  // Update Custom Generator
  const customCountBtn = document.getElementById('btn-copy-custom-spaces');
  if (customCountBtn) {
    const label = customCountBtn.querySelector('.custom-char-code-label');
    if (label) label.textContent = `(${activeObj.code})`;
  }

  showToast(`Active Character: ${activeObj.name} (${activeObj.code})`);
}

/* ===================================================================
   2. TWO-WORD NICKNAME SPACING BUILDER
   =================================================================== */

function initTwoWordBuilder() {
  const firstInput = document.getElementById('two-word-first');
  const secondInput = document.getElementById('two-word-second');
  const gapBtns = document.querySelectorAll('.btn-gap-qty');
  const copyBtn = document.getElementById('btn-copy-two-word');
  const resetBtn = document.getElementById('btn-reset-two-word');

  if (firstInput) {
    firstInput.addEventListener('input', updateTwoWordBuilder);
  }
  if (secondInput) {
    secondInput.addEventListener('input', updateTwoWordBuilder);
  }

  gapBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      gapBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      AppState.twoWordGapQty = parseInt(btn.getAttribute('data-gap') || '1', 10);
      updateTwoWordBuilder();
    });
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const outputDisplay = document.getElementById('two-word-output');
      const raw = outputDisplay ? outputDisplay.getAttribute('data-raw') : '';
      if (!raw) {
        showToast('Please enter words first.', 'error');
        return;
      }
      copyTextToClipboard(raw, 'Spaced nickname copied to clipboard!', copyBtn);
      saveToRecentNames(raw);
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (firstInput) firstInput.value = 'DARK';
      if (secondInput) secondInput.value = 'KING';
      AppState.twoWordGapQty = 1;
      gapBtns.forEach((b, idx) => {
        if (idx === 0) b.classList.add('active');
        else b.classList.remove('active');
      });
      updateTwoWordBuilder();
      showToast('Reset builder to default.');
    });
  }

  updateTwoWordBuilder();
}

function updateTwoWordBuilder() {
  const firstInput = document.getElementById('two-word-first');
  const secondInput = document.getElementById('two-word-second');
  const outputDisplay = document.getElementById('two-word-output');
  if (!outputDisplay) return;

  const first = firstInput ? firstInput.value : 'DARK';
  const second = secondInput ? secondInput.value : 'KING';
  const char = getActiveChar().char;
  const gapString = char.repeat(AppState.twoWordGapQty);

  const rawNickname = first + gapString + second;
  outputDisplay.setAttribute('data-raw', rawNickname);

  if (AppState.showInvisiblePlaceholder) {
    outputDisplay.textContent = `${first}[• ${'░'.repeat(AppState.twoWordGapQty)} •]${second}`;
  } else {
    outputDisplay.textContent = `${first}${gapString}${second}`;
  }
}

/* ===================================================================
   3. CUSTOM SPACE GENERATOR
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
      const label = copyCustomBtn.querySelector('.custom-count-label');
      if (label) label.textContent = AppState.customCount;
    }
    if (customPreviewTokens) {
      const active = getActiveChar();
      customPreviewTokens.textContent = `[• ${active.code} × ${AppState.customCount} •]`;
    }

    chips.forEach(chip => {
      const val = parseInt(chip.getAttribute('data-qty'), 10);
      if (val === AppState.customCount) {
        chip.classList.add('active');
      } else {
        chip.classList.remove('active');
      }
    });

    if (stepperMinus) stepperMinus.disabled = AppState.customCount <= 1;
    if (stepperPlus) stepperPlus.disabled = AppState.customCount >= 20;
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
      const activeObj = getActiveChar();
      const char = activeObj.char.repeat(AppState.customCount);
      copyTextToClipboard(char, `${AppState.customCount} Invisible Spaces (${activeObj.code}) copied!`, copyCustomBtn);
    });
  }

  updateDisplay();
}

/* ===================================================================
   4. NICKNAME BUILDER & CURSOR-AWARE CONTROLS
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
    if (!input) return;
    AppState.builderHistory.push(input.value);
    if (AppState.builderHistory.length > 25) {
      AppState.builderHistory.shift();
    }
    if (btnUndo) btnUndo.disabled = AppState.builderHistory.length === 0;
  }

  function updateLengthAndPreviews() {
    if (!input) return;
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
        statusBadge.textContent = '✓ Within 12-Char Limit';
        statusBadge.classList.add('ok');
      } else {
        statusBadge.textContent = '⚠ Exceeds 12 Chars';
        statusBadge.classList.add('danger');
      }
    }

    renderAllPreviews();
  }

  function insertAtPosition(posType, count = 1) {
    if (!input) return;
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

  if (btnInsertStart) btnInsertStart.addEventListener('click', () => insertAtPosition('start', 1));
  if (btnInsertCursor) btnInsertCursor.addEventListener('click', () => insertAtPosition('cursor', 1));
  if (btnInsertEnd) btnInsertEnd.addEventListener('click', () => insertAtPosition('end', 1));
  if (btnAdd1Space) btnAdd1Space.addEventListener('click', () => insertAtPosition('cursor', 1));
  if (btnAdd2Spaces) btnAdd2Spaces.addEventListener('click', () => insertAtPosition('cursor', 2));

  if (btnUndo) {
    btnUndo.addEventListener('click', () => {
      if (AppState.builderHistory.length > 0) {
        const prev = AppState.builderHistory.pop();
        if (input) input.value = prev;
        btnUndo.disabled = AppState.builderHistory.length === 0;
        updateLengthAndPreviews();
      }
    });
  }

  if (btnClear) {
    btnClear.addEventListener('click', () => {
      if (input && input.value.length > 0) {
        saveHistory();
        input.value = '';
        updateLengthAndPreviews();
        input.focus();
      }
    });
  }

  if (btnCopyNickname) {
    btnCopyNickname.addEventListener('click', () => {
      if (!input) return;
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
      updateTwoWordBuilder();
    });
  }

  updateLengthAndPreviews();
}

/* ===================================================================
   5. LIVE FICTIONAL GAMING PREVIEWS
   =================================================================== */

function formatPreviewString(rawText) {
  if (!rawText) return 'Player';
  if (!AppState.showInvisiblePlaceholder) return rawText;

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

  const profileName = document.getElementById('preview-profile-name');
  if (profileName) profileName.textContent = previewText;

  const lobbyName = document.getElementById('preview-lobby-name');
  if (lobbyName) lobbyName.textContent = previewText;

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
   6. PASTE-BACK UNICODE DETECTOR (CLIPBOARD TESTER)
   =================================================================== */

function initCharacterInspector() {
  const input = document.getElementById('inspector-input');
  const totalDisplay = document.getElementById('inspector-total-chars');
  const invisibleDisplay = document.getElementById('inspector-invisible-chars');
  const visibleDisplay = document.getElementById('inspector-visible-chars');
  const statusDisplay = document.getElementById('inspector-status-text');
  const detectedList = document.getElementById('inspector-detected-list');
  const clearBtn = document.getElementById('btn-clear-inspector');
  const stepCopyBtn = document.getElementById('btn-inspector-step-copy');

  if (stepCopyBtn) {
    stepCopyBtn.addEventListener('click', () => {
      const active = getActiveChar();
      copyTextToClipboard(active.char, `Step 1 complete! ${active.name} (${active.code}) copied. Now paste in Step 2.`, stepCopyBtn);
    });
  }

  function analyzeText(text) {
    if (!text) {
      if (totalDisplay) totalDisplay.textContent = '0';
      if (invisibleDisplay) invisibleDisplay.textContent = '0';
      if (visibleDisplay) visibleDisplay.textContent = '0';
      if (statusDisplay) {
        statusDisplay.textContent = 'Waiting for paste';
        statusDisplay.style.color = 'var(--text-muted)';
      }
      if (detectedList) {
        detectedList.innerHTML = '<span style="color: var(--text-muted);">Paste copied text above to detect hidden characters.</span>';
      }
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
        statusDisplay.textContent = '✓ Invisible Confirmed';
        statusDisplay.style.color = 'var(--neon-green)';
      } else {
        statusDisplay.textContent = 'No Invisible Found';
        statusDisplay.style.color = '#ff4444';
      }
    }

    if (detectedList) {
      if (invisibleCount === 0) {
        detectedList.innerHTML = '<span style="color: var(--neon-amber);">Only standard visible characters detected. No invisible Unicode filler characters present.</span>';
      } else {
        let pills = '';
        detectedInvisibles.forEach((count, code) => {
          const info = INVISIBLE_REGEX_CHARS.find(i => i.code === code);
          const cat = info && info.category ? ` &bull; ${info.category}` : '';
          pills += `
            <div style="background: rgba(255, 87, 34, 0.12); border: 1px solid rgba(255, 87, 34, 0.4); border-radius: 6px; padding: 0.4rem 0.75rem; margin-bottom: 0.35rem; display: flex; align-items: center; justify-content: space-between;">
              <div>
                <strong style="color: #ffaa00; font-family: monospace;">${code}</strong> 
                <span style="color: #fff; margin-left: 0.4rem;">${info ? info.name : 'Unknown'}</span>
                <span style="color: var(--text-muted); font-size: 0.72rem; margin-left: 0.3rem;">${cat}</span>
              </div>
              <span style="background: rgba(255, 170, 0, 0.2); color: #ffaa00; font-weight: 700; padding: 1px 8px; border-radius: 99px; font-size: 0.75rem;">Count: ${count}</span>
            </div>
          `;
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

  // Initial demonstration
  if (input) {
    input.value = 'DARK\u3164KING';
    analyzeText(input.value);
  }
}

/* ===================================================================
   7. MULTIPLE CHARACTER OPTIONS & FALLBACK CARDS
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
        <div class="char-name">${item.optionLetter}: ${item.name}</div>
        <p class="char-desc">${item.description}</p>
        <div style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 0.45rem;">
          <strong>Category:</strong> ${item.category} &bull; <strong>Width:</strong> ${item.displayWidth}
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
          ${item.id === AppState.activeCharId ? '✓ Active in Tool' : 'Use in Tool'}
        </button>
      </div>
    `;

    const copyBtn = card.querySelector('.btn-copy-char-card');
    copyBtn.addEventListener('click', () => {
      copyTextToClipboard(item.char, `${item.name} (${item.code}) copied!`, copyBtn);
    });

    const useBtn = card.querySelector('.btn-use-as-default');
    useBtn.addEventListener('click', () => {
      setActiveCharacter(item.id);
    });

    container.appendChild(card);
  });
}

/* ===================================================================
   8. COMPATIBILITY MATRIX TABLE
   =================================================================== */

function initCompatibilityMatrix() {
  const tbody = document.getElementById('compat-matrix-body');
  if (!tbody || typeof COMPATIBILITY_MATRIX === 'undefined') return;

  tbody.innerHTML = '';
  COMPATIBILITY_MATRIX.forEach(row => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${row.character}</strong></td>
      <td><code>${row.code}</code></td>
      <td>${row.category}</td>
      <td>${row.apparentWidth}</td>
      <td><span class="${row.statusBadge}">${row.currentStatus}</span></td>
      <td style="font-size: 0.8rem;">${row.recommendation}</td>
    `;
    tbody.appendChild(tr);
  });
}

/* ===================================================================
   9. "SPACE NOT WORKING?" TROUBLESHOOTER
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

    <div class="trouble-list-title">Recommended Action:</div>
    <ul class="trouble-steps-list">
      ${solutionsListHtml}
    </ul>

    <div class="trouble-action-row">
      <button id="btn-trouble-quick-copy" class="btn-trouble-recovery">
        <span>🔄</span> Switch to ${recChar.name} (${recChar.code}) &amp; Copy
      </button>
      <span style="font-size: 0.78rem; color: var(--text-muted);">
        Switch active character in tool and verify in your Free Fire rename field.
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
   10. BLANK-LOOKING NAME & SPACED NAME MODE
   =================================================================== */

function initBlankNameSection() {
  const btnGenBlank = document.getElementById('btn-gen-blank-name');
  const spacedInput = document.getElementById('spaced-name-input');
  const spacedOutput = document.getElementById('spaced-name-output');
  const btnCopySpaced = document.getElementById('btn-copy-spaced');

  if (btnGenBlank) {
    btnGenBlank.addEventListener('click', () => {
      const char = getActiveChar().char;
      const blankString = char.repeat(3);
      copyTextToClipboard(blankString, `Blank-looking name copied (3 × ${getActiveChar().code})!`, btnGenBlank);
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
        copyTextToClipboard(spacedOutput.value, 'Spaced nickname copied to clipboard!', btnCopySpaced);
        saveToRecentNames(spacedOutput.value);
      } else {
        showToast('Enter words above first.', 'error');
      }
    });
  }
}

/* ===================================================================
   11. READY-MADE EXAMPLES
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
   12. RECENT NAMES SHELF (LOCALSTORAGE)
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
   13. MOBILE STICKY BOTTOM BAR
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
      const active = getActiveChar();
      copyTextToClipboard(active.char, `Invisible space (${active.code}) copied!`, stickyCopyBtn);
    });
  }
}

/* ===================================================================
   14. FAQ ACCORDION
   =================================================================== */

function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        faqItems.forEach(i => i.classList.remove('open'));
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    }
  });
}

/* ===================================================================
   15. AMBIENT EMBERS CANVAS BACKGROUND
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
