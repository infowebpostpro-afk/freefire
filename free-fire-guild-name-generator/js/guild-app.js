/**
 * Free Fire Guild Name Studio - Application Controller
 * Manages Guild Identity Workflow:
 * IDEA -> GUILD NAME -> MATCHING TAG -> STYLE -> MEMBER PREVIEW -> SHORTLIST -> COMPARE 3 -> COPY
 */

const GuildState = {
  themeWord: '',
  teamType: 'competitive',
  style: 'tactical',
  decoration: 'plain',
  sampleMember: 'Ghost',
  currentResults: [],
  comparisonList: [],
  shortlist: JSON.parse(localStorage.getItem('ff_guild_shortlist') || '[]'),
  selectedForSandbox: null,
  wordLock: {
    words: ['Shadow', 'Unit'],
    lockedIndex: 0
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initUIBindings();
  initComparisonBoard();
  initSquadSandbox();
  initShortlistDrawer();
  initWordLockWorkbench();
  initAmbientEmbers();

  // Initial auto-generation on load
  runGeneration(false);

  // Auto-load comparison list with first 3 items from shortlist if available, or first 3 generated
  updateComparisonUI();
});

/* ===================================================================
   1. UI CONTROLS & BINDINGS
   =================================================================== */

function initUIBindings() {
  const themeInput = document.getElementById('guild-keyword-input');
  const memberInput = document.getElementById('sample-member-input');
  const mainGenBtn = document.getElementById('btn-main-generate');
  const surpriseBtn = document.getElementById('btn-surprise-generate');
  const genMoreBtn = document.getElementById('btn-generate-more');
  const toggleShortlistBtn = document.getElementById('btn-toggle-shortlist');

  // Theme word input
  if (themeInput) {
    themeInput.addEventListener('input', (e) => {
      GuildState.themeWord = e.target.value.trim();
      updateLockWordFromInput(GuildState.themeWord);
    });

    themeInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        runGeneration(true);
      }
    });
  }

  // Sample member handle input
  if (memberInput) {
    memberInput.addEventListener('input', (e) => {
      GuildState.sampleMember = e.target.value.trim() || 'Ghost';
      refreshAllMemberPreviews();
      updateSquadRoster();
    });
  }

  // Guild Type pills
  document.querySelectorAll('.btn-team-type-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.btn-team-type-chip').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      GuildState.teamType = btn.getAttribute('data-type') || 'competitive';
    });
  });

  // Style pills
  document.querySelectorAll('.btn-style-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.btn-style-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      GuildState.style = btn.getAttribute('data-style') || 'tactical';
    });
  });

  // Decoration pills
  document.querySelectorAll('.btn-decor-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.btn-decor-chip').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      GuildState.decoration = btn.getAttribute('data-decor') || 'plain';
      // Re-apply decoration to existing results
      applyDecorationToCurrentResults();
    });
  });

  // Generate button
  if (mainGenBtn) {
    mainGenBtn.addEventListener('click', () => runGeneration(true));
  }

  // Surprise Me button
  if (surpriseBtn) {
    surpriseBtn.addEventListener('click', () => {
      triggerSurpriseMe();
    });
  }

  // Generate More button
  if (genMoreBtn) {
    genMoreBtn.addEventListener('click', () => appendMoreNames());
  }

  // Toggle Shortlist button in navbar
  if (toggleShortlistBtn) {
    toggleShortlistBtn.addEventListener('click', openShortlistDrawer);
  }

  updateShortlistBadge();
}

/* ===================================================================
   2. GENERATION RUNNER
   =================================================================== */

function runGeneration(scrollToResults = false) {
  const themeInput = document.getElementById('guild-keyword-input');
  const kw = themeInput ? themeInput.value.trim() : '';

  const results = GuildEngine.generateBatch({
    count: 9,
    themeWord: kw,
    teamType: GuildState.teamType,
    style: GuildState.style,
    decoration: GuildState.decoration,
    sampleMember: GuildState.sampleMember
  });

  GuildState.currentResults = results;
  renderResults(results, false);

  if (results.length > 0) {
    selectForSandbox(results[0]);

    // If comparison list is empty, initialize with top 2 or 3 results
    if (GuildState.comparisonList.length === 0) {
      GuildState.comparisonList = results.slice(0, 3);
      updateComparisonUI();
    }
  }

  if (scrollToResults) {
    const resultsContainer = document.getElementById('guild-results-section');
    if (resultsContainer) {
      resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

function appendMoreNames() {
  const themeInput = document.getElementById('guild-keyword-input');
  const kw = themeInput ? themeInput.value.trim() : '';

  const more = GuildEngine.generateBatch({
    count: 6,
    themeWord: kw,
    teamType: GuildState.teamType,
    style: GuildState.style,
    decoration: GuildState.decoration,
    sampleMember: GuildState.sampleMember
  });

  GuildState.currentResults = GuildState.currentResults.concat(more);
  renderResults(more, true);
  showGuildToast('Added 6 more fresh guild identities!');
}

function triggerSurpriseMe() {
  const themes = ['Shadow', 'Nova', 'Frost', 'Raven', 'Blaze', 'Vanguard', 'Apex', 'Viper', 'Echo', 'Chaos'];
  const styles = ['tactical', 'aggressive', 'elite', 'minimal', 'aesthetic', 'funny'];
  const types = ['competitive', 'friends', 'esports', 'creator'];

  const randomTheme = themes[Math.floor(Math.random() * themes.length)];
  const randomStyle = styles[Math.floor(Math.random() * styles.length)];
  const randomType = types[Math.floor(Math.random() * types.length)];

  const themeInput = document.getElementById('guild-keyword-input');
  if (themeInput) themeInput.value = randomTheme;
  GuildState.themeWord = randomTheme;

  // Update Style pill
  GuildState.style = randomStyle;
  document.querySelectorAll('.btn-style-pill').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-style') === randomStyle);
  });

  // Update Type pill
  GuildState.teamType = randomType;
  document.querySelectorAll('.btn-team-type-chip').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-type') === randomType);
  });

  updateLockWordFromInput(randomTheme);
  runGeneration(true);
  showGuildToast(`Generated with vibe: ${randomStyle.toUpperCase()} • ${randomTheme}!`);
}

function applyDecorationToCurrentResults() {
  GuildState.currentResults.forEach(item => {
    item.decoration = GuildState.decoration;
    item.styledName = GuildEngine.applyDecoration(item.rawName, item.tag, GuildState.decoration);
    item.isPlain = GuildState.decoration === 'plain';
  });
  renderResults(GuildState.currentResults, false);
}

/* ===================================================================
   3. RESULT CARDS RENDERING (COMPLETE GUILD IDENTITY)
   =================================================================== */

function renderResults(list, append = false) {
  const container = document.getElementById('guild-results-grid');
  const countTitle = document.getElementById('results-count-title');
  if (!container) return;

  if (!append) container.innerHTML = '';

  if (countTitle) {
    countTitle.textContent = `${GuildState.currentResults.length} Guild Identities Ready`;
  }

  list.forEach(item => {
    const card = createResultCardElement(item);
    container.appendChild(card);
  });
}

function createResultCardElement(item) {
  const card = document.createElement('div');
  card.className = 'guild-result-card';
  card.id = `card_${item.id}`;

  const isShortlisted = GuildState.shortlist.some(s => s.name === item.name);
  const isCompared = GuildState.comparisonList.some(c => c.name === item.name);

  // Active displayed name depends on selected decoration
  const displayName = item.styledName || item.name;
  const charLength = Array.from(displayName).length;
  const isDecorated = item.decoration !== 'plain';

  // Derivation text
  const derivText = `Theme: ${item.style.toUpperCase()} • Core: ${item.derivation.core || 'Elite'} • Tag: ${item.tag}`;

  card.innerHTML = `
    <!-- Top Identity Header -->
    <div class="card-identity-top">
      <div>
        <div class="guild-name-heading" id="heading_${item.id}">${escapeHtml(displayName)}</div>
        <div class="card-char-counter">
          <span class="char-count-pill">${charLength} Chars</span>
          <span class="char-status-badge ${isDecorated ? 'status-styled' : 'status-plain'}">
            ${isDecorated ? 'Decorated (Test in game)' : 'Plain Text'}
          </span>
        </div>
      </div>
      <button class="guild-tag-badge" id="tag_btn_${item.id}" title="Click to cycle alternate tag suggestions">
        [ <span class="tag-text">${item.tag}</span> ]
      </button>
    </div>

    <!-- Identity Specification Breakdown -->
    <div class="identity-specs-box">
      <div class="spec-row">
        <span class="spec-label">Tag:</span>
        <span class="spec-value tag-highlight">[ ${item.tag} ]</span>
        <button class="btn-micro-copy" data-copy="${item.tag}" title="Copy Tag only">Copy</button>
      </div>
      <div class="spec-row">
        <span class="spec-label">Preview:</span>
        <span class="spec-value member-preview-text" id="prev_${item.id}">[${item.tag}] ${escapeHtml(GuildState.sampleMember)}</span>
        <button class="btn-micro-copy" data-copy="[${item.tag}] ${GuildState.sampleMember}" title="Copy Member Format">Copy</button>
      </div>
      <div class="spec-row">
        <span class="spec-label">Styled:</span>
        <span class="spec-value styled-option-text">${escapeHtml(item.styledOption)}</span>
        <button class="btn-micro-copy" data-copy="${escapeHtml(item.styledOption)}" title="Copy Styled Option">Copy</button>
      </div>
      <div class="spec-row">
        <span class="spec-label">Fallback:</span>
        <span class="spec-value fallback-text">${escapeHtml(item.plainFallback)}</span>
        <button class="btn-micro-copy" data-copy="${escapeHtml(item.plainFallback)}" title="Copy Plain Fallback">Copy</button>
      </div>
    </div>

    <!-- Semantic Derivation Badge -->
    <div class="card-derivation-bar">
      <span>${derivText}</span>
    </div>

    <!-- Actions Row -->
    <div class="card-actions-wrapper">
      <button class="btn-guild-copy-main" aria-label="Copy guild name">
        <span>📋</span> <span class="btn-copy-label">Copy Guild Name</span>
      </button>

      <div class="guild-card-actions-row">
        <button class="btn-card-icon-action btn-act-shortlist ${isShortlisted ? 'shortlisted' : ''}" title="Save to Favorites Shortlist">
          <span class="action-icon">${isShortlisted ? '★' : '☆'}</span> Save
        </button>
        <button class="btn-card-icon-action btn-act-compare ${isCompared ? 'compared' : ''}" title="Add to 3-Name Comparison Board">
          <span class="action-icon">⚖</span> Compare
        </button>
        <button class="btn-card-icon-action btn-act-regen" title="Regenerate this specific card only">
          <span class="action-icon">↻</span> Spin
        </button>
        <button class="btn-card-icon-action btn-act-lock" title="Send to Word Lock Studio">
          <span class="action-icon">🔒</span> Lock
        </button>
      </div>
    </div>
  `;

  // Click card body to preview in Squad Sandbox
  card.addEventListener('click', (e) => {
    if (!e.target.closest('button')) {
      selectForSandbox(item);
    }
  });

  // Primary Copy Button
  const copyBtn = card.querySelector('.btn-guild-copy-main');
  copyBtn.addEventListener('click', () => {
    copyToClipboard(displayName, `Copied "${displayName}"!`, copyBtn);
  });

  // Micro Copy Buttons (Tag, Member preview, Styled, Plain fallback)
  card.querySelectorAll('.btn-micro-copy').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const val = btn.getAttribute('data-copy');
      copyToClipboard(val, `Copied: ${val}`, btn);
    });
  });

  // Tag Badge: click to cycle through alternate tags
  const tagBadge = card.querySelector('.guild-tag-badge');
  tagBadge.addEventListener('click', (e) => {
    e.stopPropagation();
    cycleTagVariant(item, card);
  });

  // Save / Shortlist Button
  const slBtn = card.querySelector('.btn-act-shortlist');
  slBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleShortlist(item, slBtn);
  });

  // Compare Button
  const cmpBtn = card.querySelector('.btn-act-compare');
  cmpBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleComparison(item, cmpBtn);
  });

  // Single Card Regenerate
  const regenBtn = card.querySelector('.btn-act-regen');
  regenBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    regenerateSingleCard(item, card);
  });

  // Word Lock Workbench Button
  const lockBtn = card.querySelector('.btn-act-lock');
  lockBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    sendToWordLockWorkbench(item);
  });

  return card;
}

function refreshAllMemberPreviews() {
  GuildState.currentResults.forEach(item => {
    const card = document.getElementById(`card_${item.id}`);
    if (card) {
      const prevElem = card.querySelector('.member-preview-text');
      const copyBtn = card.querySelectorAll('.btn-micro-copy')[1];
      const memberText = `[${item.tag}] ${GuildState.sampleMember}`;
      if (prevElem) prevElem.textContent = memberText;
      if (copyBtn) copyBtn.setAttribute('data-copy', memberText);
    }
  });
}

function cycleTagVariant(item, card) {
  const tags = item.tagSuggestions;
  if (!tags || tags.length <= 1) return;

  const curIdx = tags.indexOf(item.tag);
  const nextIdx = (curIdx + 1) % tags.length;
  item.tag = tags[nextIdx];

  // Re-generate styled & preview
  item.styledName = GuildEngine.applyDecoration(item.rawName, item.tag, item.decoration);
  item.lightOption = GuildEngine.applyDecoration(item.rawName, item.tag, 'light');
  item.styledOption = GuildEngine.applyDecoration(item.rawName, item.tag, 'styled');
  item.memberPreview = `[${item.tag}] ${GuildState.sampleMember}`;

  // Update card DOM
  const tagText = card.querySelector('.tag-text');
  if (tagText) tagText.textContent = item.tag;

  const tagHighlight = card.querySelector('.tag-highlight');
  if (tagHighlight) tagHighlight.textContent = `[ ${item.tag} ]`;

  const prevText = card.querySelector('.member-preview-text');
  if (prevText) prevText.textContent = item.memberPreview;

  const styledText = card.querySelector('.styled-option-text');
  if (styledText) styledText.textContent = item.styledOption;

  const heading = card.querySelector('.guild-name-heading');
  if (heading && item.decoration !== 'plain') heading.textContent = item.styledName;

  // If in sandbox, update
  if (GuildState.selectedForSandbox && GuildState.selectedForSandbox.id === item.id) {
    selectForSandbox(item);
  }

  showGuildToast(`Switched tag to [${item.tag}]`);
}

function regenerateSingleCard(oldItem, cardElement) {
  const newItem = GuildEngine.generateSingle({
    themeWord: GuildState.themeWord,
    teamType: GuildState.teamType,
    style: GuildState.style,
    decoration: GuildState.decoration,
    sampleMember: GuildState.sampleMember
  });

  if (!newItem) return;

  // Replace in array
  const idx = GuildState.currentResults.findIndex(x => x.id === oldItem.id);
  if (idx !== -1) {
    GuildState.currentResults[idx] = newItem;
  }

  // Replace DOM card
  const newCard = createResultCardElement(newItem);
  cardElement.parentNode.replaceChild(newCard, cardElement);

  // Subtle highlight animation
  newCard.classList.add('card-refreshed');
  setTimeout(() => newCard.classList.remove('card-refreshed'), 600);

  showGuildToast(`Generated new identity: "${newItem.rawName}"`);
}

/* ===================================================================
   4. 3-CANDIDATE COMPARISON BOARD (SECTION 19)
   =================================================================== */

function initComparisonBoard() {
  const clearBtn = document.getElementById('btn-clear-comparison');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      GuildState.comparisonList = [];
      updateComparisonUI();
      showGuildToast('Comparison board cleared.');
    });
  }
}

function toggleComparison(item, btn) {
  const existingIdx = GuildState.comparisonList.findIndex(c => c.name === item.name);

  if (existingIdx !== -1) {
    GuildState.comparisonList.splice(existingIdx, 1);
    if (btn) btn.classList.remove('compared');
    showGuildToast(`Removed "${item.rawName}" from comparison.`);
  } else {
    if (GuildState.comparisonList.length >= 3) {
      showGuildToast('Comparison board has 3 finalists. Removing oldest candidate to make room.');
      GuildState.comparisonList.shift();
    }
    GuildState.comparisonList.push(item);
    if (btn) btn.classList.add('compared');
    showGuildToast(`Added "${item.rawName}" to comparison board.`);
  }

  updateComparisonUI();
}

function updateComparisonUI() {
  const container = document.getElementById('comparison-board-container');
  if (!container) return;

  const list = GuildState.comparisonList;

  if (list.length === 0) {
    container.innerHTML = `
      <div class="comparison-empty-state">
        <div style="font-size: 2.2rem; margin-bottom: 0.5rem;">⚖️</div>
        <h4 style="font-family: var(--font-gaming); color: #fff; margin-bottom: 0.35rem;">Your Comparison Board Is Empty</h4>
        <p style="font-size: 0.88rem; color: var(--text-muted); max-width: 480px; margin: 0 auto 1.25rem;">
          Click the <strong>⚖ Compare</strong> button on any 2 or 3 generated guild cards above to compare their core name, tag, member look, and fallback side-by-side.
        </p>
      </div>
    `;
    return;
  }

  let html = `
    <div class="comparison-table-wrapper">
      <table class="comparison-identity-table">
        <thead>
          <tr>
            <th class="comp-col-attr">Attribute</th>
            ${list.map((item, idx) => `
              <th class="comp-col-item">
                <div class="comp-header-title">Candidate ${idx + 1}</div>
                <div class="comp-name-caps">${escapeHtml(item.rawName)}</div>
                <button class="btn-comp-remove" onclick="removeComparisonItem(${idx})" title="Remove candidate">✕</button>
              </th>
            `).join('')}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="attr-label">Guild Name</td>
            ${list.map(item => `<td class="attr-val-name">${escapeHtml(item.rawName)}</td>`).join('')}
          </tr>
          <tr>
            <td class="attr-label">Matching Tag</td>
            ${list.map(item => `<td class="attr-val-tag"><span class="comp-tag-pill">[ ${item.tag} ]</span></td>`).join('')}
          </tr>
          <tr>
            <td class="attr-label">Style / Vibe</td>
            ${list.map(item => `<td class="attr-val-vibe">${item.style.toUpperCase()}</td>`).join('')}
          </tr>
          <tr>
            <td class="attr-label">Member Look</td>
            ${list.map(item => `<td class="attr-val-member">[${item.tag}] ${escapeHtml(GuildState.sampleMember)}</td>`).join('')}
          </tr>
          <tr>
            <td class="attr-label">Plain Fallback</td>
            ${list.map(item => `<td class="attr-val-fallback"><code>${escapeHtml(item.plainFallback)}</code></td>`).join('')}
          </tr>
          <tr>
            <td class="attr-label">Char Count</td>
            ${list.map(item => `<td>${Array.from(item.rawName).length} chars</td>`).join('')}
          </tr>
          <tr>
            <td class="attr-label">Action</td>
            ${list.map(item => `
              <td>
                <button class="btn-comp-copy" onclick="copyToClipboard('${escapeHtml(item.rawName)}', 'Copied final choice: ${escapeHtml(item.rawName)}', this)">
                  📋 Copy Choice
                </button>
              </td>
            `).join('')}
          </tr>
        </tbody>
      </table>
    </div>
  `;

  container.innerHTML = html;

  // Sync card buttons state
  document.querySelectorAll('.btn-act-compare').forEach(b => {
    const card = b.closest('.guild-result-card');
    if (!card) return;
    const nameElem = card.querySelector('.guild-name-heading');
    if (!nameElem) return;
    const isComp = list.some(c => c.rawName.toLowerCase() === nameElem.textContent.toLowerCase() || c.name.toLowerCase() === nameElem.textContent.toLowerCase());
    b.classList.toggle('compared', isComp);
  });
}

window.removeComparisonItem = function(idx) {
  if (GuildState.comparisonList[idx]) {
    const item = GuildState.comparisonList[idx];
    GuildState.comparisonList.splice(idx, 1);
    updateComparisonUI();
    showGuildToast(`Removed "${item.rawName}" from comparison.`);
  }
};

/* ===================================================================
   5. WORD LOCK STUDIO (LOCK ONE WORD & REGENERATE THE OTHER)
   =================================================================== */

function initWordLockWorkbench() {
  const lockBtn0 = document.getElementById('btn-lock-toggle-0');
  const lockBtn1 = document.getElementById('btn-lock-toggle-1');
  const regenUnlockedBtn = document.getElementById('btn-regen-unlocked');

  if (lockBtn0) {
    lockBtn0.addEventListener('click', () => {
      GuildState.wordLock.lockedIndex = 0;
      updateWordLockUI();
    });
  }

  if (lockBtn1) {
    lockBtn1.addEventListener('click', () => {
      GuildState.wordLock.lockedIndex = 1;
      updateWordLockUI();
    });
  }

  if (regenUnlockedBtn) {
    regenUnlockedBtn.addEventListener('click', () => {
      const regenerated = GuildEngine.regenerateLocked(
        GuildState.wordLock.words,
        GuildState.wordLock.lockedIndex,
        GuildState.style,
        GuildState.teamType
      );

      GuildState.wordLock.words = regenerated.words;
      updateWordLockUI();

      // Also generate a full card identity around it
      const newIdentity = GuildEngine.generateSingle({
        themeWord: regenerated.words[GuildState.wordLock.lockedIndex],
        teamType: GuildState.teamType,
        style: GuildState.style,
        decoration: GuildState.decoration,
        sampleMember: GuildState.sampleMember
      });

      if (newIdentity) {
        GuildState.currentResults.unshift(newIdentity);
        renderResults(GuildState.currentResults, false);
        selectForSandbox(newIdentity);
        showGuildToast(`Locked '${regenerated.words[GuildState.wordLock.lockedIndex]}' -> Created "${newIdentity.rawName}"`);
      }
    });
  }
}

function updateLockWordFromInput(seedWord) {
  if (!seedWord) return;
  GuildState.wordLock.words[0] = seedWord;
  updateWordLockUI();
}

function updateWordLockUI() {
  const w0Text = document.getElementById('lock-word-0-text');
  const w1Text = document.getElementById('lock-word-1-text');
  const card0 = document.getElementById('lock-card-0');
  const card1 = document.getElementById('lock-card-1');
  const btn0 = document.getElementById('btn-lock-toggle-0');
  const btn1 = document.getElementById('btn-lock-toggle-1');

  if (w0Text) w0Text.textContent = (GuildState.wordLock.words[0] || 'SHADOW').toUpperCase();
  if (w1Text) w1Text.textContent = (GuildState.wordLock.words[1] || 'LEGION').toUpperCase();

  const is0Locked = GuildState.wordLock.lockedIndex === 0;

  if (card0) card0.classList.toggle('locked', is0Locked);
  if (card1) card1.classList.toggle('locked', !is0Locked);

  if (btn0) {
    btn0.textContent = is0Locked ? '🔒 Locked' : '↻ Dynamic';
    btn0.classList.toggle('active', is0Locked);
  }

  if (btn1) {
    btn1.textContent = !is0Locked ? '🔒 Locked' : '↻ Dynamic';
    btn1.classList.toggle('active', !is0Locked);
  }
}

function sendToWordLockWorkbench(item) {
  const workbench = document.getElementById('word-lock-workbench');
  if (!workbench) return;

  workbench.style.display = 'block';
  GuildState.wordLock.words = item.words.length >= 2 ? [...item.words] : [item.rawName, 'Unit'];
  GuildState.wordLock.lockedIndex = 0;
  updateWordLockUI();

  workbench.scrollIntoView({ behavior: 'smooth', block: 'center' });
  showGuildToast(`Loaded "${item.rawName}" into Word Lock Studio.`);
}

/* ===================================================================
   6. FICTIONAL SQUAD PREVIEW SANDBOX
   =================================================================== */

function initSquadSandbox() {
  const ignInput = document.getElementById('sandbox-player-ign');
  if (ignInput) {
    ignInput.value = GuildState.sampleMember;
    ignInput.addEventListener('input', (e) => {
      GuildState.sampleMember = e.target.value.trim() || 'Ghost';
      const sampleInput = document.getElementById('sample-member-input');
      if (sampleInput) sampleInput.value = GuildState.sampleMember;
      refreshAllMemberPreviews();
      updateSquadRoster();
    });
  }
}

function selectForSandbox(item) {
  GuildState.selectedForSandbox = item;

  const nameElem = document.getElementById('sandbox-guild-name');
  const tagElem = document.getElementById('sandbox-tag-pill');
  const vibeElem = document.getElementById('sandbox-vibe-pill');

  if (nameElem) nameElem.textContent = item.rawName.toUpperCase();
  if (tagElem) tagElem.textContent = `[ ${item.tag} ]`;
  if (vibeElem) vibeElem.textContent = item.style.toUpperCase();

  updateSquadRoster();
}

function updateSquadRoster() {
  if (!GuildState.selectedForSandbox) return;
  const tag = GuildState.selectedForSandbox.tag;
  const leaderIgn = GuildState.sampleMember;

  const p1 = document.getElementById('roster-ign-1');
  const p2 = document.getElementById('roster-ign-2');
  const p3 = document.getElementById('roster-ign-3');
  const p4 = document.getElementById('roster-ign-4');

  if (p1) p1.textContent = `[${tag}] ${leaderIgn.toUpperCase()}`;
  if (p2) p2.textContent = `[${tag}] LUNA`;
  if (p3) p3.textContent = `[${tag}] VEX`;
  if (p4) p4.textContent = `[${tag}] NEO`;
}

/* ===================================================================
   7. SHORTLIST DRAWER & COLLABORATION
   =================================================================== */

function initShortlistDrawer() {
  const closeBtn = document.getElementById('btn-close-shortlist');
  const copyShortlistBtn = document.getElementById('btn-copy-shortlist');
  const shareBtn = document.getElementById('btn-share-shortlist');

  if (closeBtn) {
    closeBtn.addEventListener('click', closeShortlistDrawer);
  }

  if (copyShortlistBtn) {
    copyShortlistBtn.addEventListener('click', () => {
      if (GuildState.shortlist.length === 0) {
        showGuildToast('Shortlist is empty!');
        return;
      }
      const text = GuildState.shortlist.map((item, idx) => 
        `${idx + 1}. ${item.name} | Tag: [${item.tag}] | Member: [${item.tag}] ${GuildState.sampleMember}`
      ).join('\n');

      copyToClipboard(text, 'Copied full shortlist to clipboard!');
    });
  }

  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      if (GuildState.shortlist.length === 0) {
        showGuildToast('Add guild names to your shortlist before sharing!');
        return;
      }
      const text = "🔥 Check out these Free Fire Guild Names we're considering:\n\n" + 
        GuildState.shortlist.map(s => `• ${s.name} [${s.tag}]`).join('\n') + 
        `\n\nGenerated via Free Fire Nickname Studio`;

      if (navigator.share) {
        navigator.share({ title: 'Free Fire Guild Name Candidates', text: text })
          .catch(() => copyToClipboard(text, 'Share text copied!'));
      } else {
        copyToClipboard(text, 'Shortlist share text copied to clipboard!');
      }
    });
  }
}

function openShortlistDrawer() {
  const drawer = document.getElementById('shortlist-drawer');
  if (drawer) {
    renderShortlistItems();
    drawer.classList.add('open');
  }
}

function closeShortlistDrawer() {
  const drawer = document.getElementById('shortlist-drawer');
  if (drawer) drawer.classList.remove('open');
}

function toggleShortlist(item, btn) {
  const idx = GuildState.shortlist.findIndex(s => s.name === item.name);

  if (idx !== -1) {
    GuildState.shortlist.splice(idx, 1);
    if (btn) {
      btn.classList.remove('shortlisted');
      btn.innerHTML = '<span class="action-icon">☆</span> Save';
    }
    showGuildToast(`Removed "${item.rawName}" from shortlist.`);
  } else {
    GuildState.shortlist.push(item);
    if (btn) {
      btn.classList.add('shortlisted');
      btn.innerHTML = '<span class="action-icon">★</span> Saved';
    }
    showGuildToast(`Saved "${item.rawName}" to shortlist!`);
  }

  localStorage.setItem('ff_guild_shortlist', JSON.stringify(GuildState.shortlist));
  updateShortlistBadge();
}

function updateShortlistBadge() {
  const badge = document.getElementById('shortlist-count-badge');
  if (badge) {
    const count = GuildState.shortlist.length;
    badge.textContent = count;
    badge.style.display = count > 0 ? 'inline-block' : 'none';
  }
}

function renderShortlistItems() {
  const container = document.getElementById('shortlist-items-container');
  if (!container) return;

  if (GuildState.shortlist.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 2.5rem 1rem; color: var(--text-muted);">
        <div style="font-size: 2rem; margin-bottom: 0.5rem;">★</div>
        <p style="font-size: 0.9rem;">Your squad shortlist is currently empty.</p>
        <p style="font-size: 0.8rem; margin-top: 0.25rem;">Click the <strong>☆ Save</strong> button on any guild card above to collect candidates here.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = GuildState.shortlist.map((item, idx) => `
    <div class="shortlist-item-row">
      <div>
        <div style="font-family: var(--font-gaming); font-size: 1.05rem; font-weight: 800; color: #fff;">
          ${escapeHtml(item.name)}
        </div>
        <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 2px;">
          Tag: <span style="color: #ffaa00; font-weight: 700;">[ ${item.tag} ]</span> &bull; 
          Member: <span style="color: #fff;">[${item.tag}] ${escapeHtml(GuildState.sampleMember)}</span>
        </div>
      </div>
      <div style="display: flex; gap: 0.35rem;">
        <button class="btn-micro-copy" onclick="copyToClipboard('${escapeHtml(item.name)}', 'Copied guild name', this)">Copy</button>
        <button class="btn-micro-copy" style="color: #ff5252;" onclick="removeShortlistItem(${idx})">✕</button>
      </div>
    </div>
  `).join('');
}

window.removeShortlistItem = function(idx) {
  if (GuildState.shortlist[idx]) {
    const item = GuildState.shortlist[idx];
    GuildState.shortlist.splice(idx, 1);
    localStorage.setItem('ff_guild_shortlist', JSON.stringify(GuildState.shortlist));
    updateShortlistBadge();
    renderShortlistItems();
    showGuildToast(`Removed "${item.rawName}" from shortlist.`);
  }
};

/* ===================================================================
   8. CLIPBOARD & TOAST NOTIFICATION
   =================================================================== */

function copyToClipboard(text, feedbackMsg, triggerBtn) {
  if (!text) return;

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      handleCopyDone(text, feedbackMsg, triggerBtn);
    }).catch(() => {
      fallbackExecCopy(text, feedbackMsg, triggerBtn);
    });
  } else {
    fallbackExecCopy(text, feedbackMsg, triggerBtn);
  }
}

function fallbackExecCopy(text, feedbackMsg, triggerBtn) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.left = '-999999px';
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try {
    document.execCommand('copy');
    handleCopyDone(text, feedbackMsg, triggerBtn);
  } catch (e) {
    showGuildToast('Failed to copy. Please copy manually.', 'error');
  }
  document.body.removeChild(ta);
}

function handleCopyDone(text, feedbackMsg, triggerBtn) {
  showGuildToast(feedbackMsg || `Copied "${text}"!`);

  if (triggerBtn) {
    triggerBtn.classList.add('copied');
    const labelSpan = triggerBtn.querySelector('.btn-copy-label');
    const originalText = labelSpan ? labelSpan.textContent : triggerBtn.textContent;

    if (labelSpan) {
      labelSpan.textContent = '✓ Copied!';
    } else {
      triggerBtn.textContent = '✓ Copied!';
    }

    setTimeout(() => {
      triggerBtn.classList.remove('copied');
      if (labelSpan) {
        labelSpan.textContent = originalText;
      } else {
        triggerBtn.textContent = originalText;
      }
    }, 1800);
  }
}

function showGuildToast(msg, type = 'success') {
  let toast = document.getElementById('guild-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'guild-toast';
    toast.className = 'space-toast';
    document.body.appendChild(toast);
  }

  const icon = type === 'success' ? '✓' : 'ℹ';
  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <div>
      <div>${msg}</div>
      <div class="toast-sub">Ready to test or paste in Free Fire</div>
    </div>
  `;

  toast.classList.add('show');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
}

/* ===================================================================
   9. AMBIENT EMBERS PARTICLES
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
      ctx.shadowBlur = 10;
      ctx.shadowColor = p.color;
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

