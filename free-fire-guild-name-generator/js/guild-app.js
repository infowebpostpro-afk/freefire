/**
 * Free Fire Guild Name Studio - Application Controller
 * Handles 3 modes, interactive generation, smart tags, word lock,
 * squad preview sandbox, shortlist collaboration, comparison, and editor modal.
 */

const GuildState = {
  activeMode: 'quick', // 'quick' | 'custom' | 'tagname'
  currentVibe: 'mixed',
  currentLength: 'any',
  currentStyle: 'clean',
  currentResults: [],
  selectedForSandbox: null,
  playerIgn: 'Shadow',
  shortlist: JSON.parse(localStorage.getItem('ff_guild_shortlist') || '[]'),
  favorites: JSON.parse(localStorage.getItem('ff_guild_favs') || '[]'),
  recents: JSON.parse(localStorage.getItem('ff_guild_recents') || '[]'),
  comparisonList: [],
  wordLock: {
    active: false,
    words: ['Shadow', 'Legion'],
    lockedIndex: 0,
    vibe: 'dark'
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initModeSwitcher();
  initGeneratorControls();
  initVibeSelector();
  initSquadSandbox();
  initShortlistDrawer();
  initGuildEditor();
  initComparisonModal();
  initAmbientEmbers();

  // Initial auto-generation on page load for zero friction
  runGeneration(true);
});

/* ===================================================================
   CLIPBOARD & TOAST NOTIFICATION
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
  saveToRecents(text);

  if (triggerBtn) {
    triggerBtn.classList.add('copied');
    const orig = triggerBtn.getAttribute('data-orig') || triggerBtn.innerHTML;
    if (!triggerBtn.getAttribute('data-orig')) triggerBtn.setAttribute('data-orig', orig);

    const span = triggerBtn.querySelector('.btn-copy-label');
    if (span) {
      span.textContent = '✓ Copied!';
    } else {
      triggerBtn.innerHTML = '✓ Copied!';
    }

    setTimeout(() => {
      triggerBtn.classList.remove('copied');
      if (span) {
        span.textContent = triggerBtn.getAttribute('data-default') || 'Copy Name';
      } else {
        triggerBtn.innerHTML = triggerBtn.getAttribute('data-orig');
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
      <div class="toast-sub">Ready to paste into Free Fire guild profile</div>
    </div>
  `;

  toast.classList.add('show');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}

/* ===================================================================
   1. MODE SWITCHER (Quick, Custom, Tag+Name)
   =================================================================== */

function initModeSwitcher() {
  const modeBtns = document.querySelectorAll('.guild-mode-btn');
  const customFilters = document.getElementById('custom-filters-section');
  const tagLengthRow = document.getElementById('tag-length-row');

  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const mode = btn.getAttribute('data-mode');
      GuildState.activeMode = mode;

      if (mode === 'quick') {
        if (customFilters) customFilters.style.display = 'none';
        if (tagLengthRow) tagLengthRow.style.display = 'none';
      } else if (mode === 'custom') {
        if (customFilters) customFilters.style.display = 'grid';
        if (tagLengthRow) tagLengthRow.style.display = 'none';
      } else if (mode === 'tagname') {
        if (customFilters) customFilters.style.display = 'grid';
        if (tagLengthRow) tagLengthRow.style.display = 'block';
      }
    });
  });
}

/* ===================================================================
   2. GENERATOR CONTROLS & VIBE SELECTOR
   =================================================================== */

function initVibeSelector() {
  const container = document.getElementById('guild-vibes-grid');
  if (!container) return;

  container.innerHTML = '';
  GUILD_VIBES.forEach(v => {
    const btn = document.createElement('button');
    btn.className = `btn-vibe-pill ${v.id === GuildState.currentVibe ? 'active' : ''}`;
    btn.setAttribute('data-vibe', v.id);
    btn.innerHTML = `<span>${v.icon}</span> <span>${v.label}</span>`;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.btn-vibe-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      GuildState.currentVibe = v.id;
    });
    container.appendChild(btn);
  });
}

function initGeneratorControls() {
  const mainBtn = document.getElementById('btn-main-generate');
  const surpriseBtn = document.getElementById('btn-surprise-generate');
  const genMoreBtn = document.getElementById('btn-generate-more');
  const keywordInput = document.getElementById('guild-keyword-input');

  // Length Segmented Chips
  document.querySelectorAll('.btn-len-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.btn-len-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      GuildState.currentLength = chip.getAttribute('data-len');
    });
  });

  // Style Segmented Chips
  document.querySelectorAll('.btn-style-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.btn-style-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      GuildState.currentStyle = chip.getAttribute('data-style');
    });
  });

  if (mainBtn) {
    mainBtn.addEventListener('click', () => runGeneration(false));
  }

  if (keywordInput) {
    keywordInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') runGeneration(false);
    });
  }

  if (surpriseBtn) {
    surpriseBtn.addEventListener('click', () => {
      GuildState.currentVibe = 'mixed';
      GuildState.currentStyle = 'pro';
      document.querySelectorAll('.btn-vibe-pill').forEach(b => {
        if (b.getAttribute('data-vibe') === 'mixed') b.classList.add('active');
        else b.classList.remove('active');
      });
      if (keywordInput) keywordInput.value = '';
      runGeneration(false);
      showGuildToast('🎲 Generated random high-energy guild identities!');
    });
  }

  if (genMoreBtn) {
    genMoreBtn.addEventListener('click', () => {
      appendMoreNames();
    });
  }
}

function runGeneration(isInitial = false) {
  const keywordInput = document.getElementById('guild-keyword-input');
  const kw = keywordInput ? keywordInput.value.trim() : '';
  const keywords = kw ? [kw] : [];

  const results = GuildEngine.generateBatch({
    count: 9,
    keywords: keywords,
    vibe: GuildState.currentVibe,
    length: GuildState.currentLength,
    style: GuildState.currentStyle
  });

  GuildState.currentResults = results;
  renderResults(results, false);

  if (results.length > 0 && !GuildState.selectedForSandbox) {
    selectForSandbox(results[0]);
  }

  if (!isInitial) {
    const resultsContainer = document.getElementById('guild-results-section');
    if (resultsContainer) {
      resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

function appendMoreNames() {
  const keywordInput = document.getElementById('guild-keyword-input');
  const kw = keywordInput ? keywordInput.value.trim() : '';
  const keywords = kw ? [kw] : [];

  const more = GuildEngine.generateBatch({
    count: 6,
    keywords: keywords,
    vibe: GuildState.currentVibe,
    length: GuildState.currentLength,
    style: GuildState.currentStyle
  });

  GuildState.currentResults = GuildState.currentResults.concat(more);
  renderResults(more, true);
  showGuildToast('Added 6 more fresh guild names!');
}

/* ===================================================================
   3. RESULTS RENDERING & RESULT CARD ACTIONS
   =================================================================== */

function renderResults(list, append = false) {
  const container = document.getElementById('guild-results-grid');
  const countTitle = document.getElementById('results-count-title');
  if (!container) return;

  if (!append) container.innerHTML = '';

  if (countTitle) {
    countTitle.textContent = `${GuildState.currentResults.length} Guild Ideas Ready`;
  }

  list.forEach(item => {
    const card = document.createElement('div');
    card.className = 'guild-result-card';
    card.id = `card_${item.id}`;

    const isFav = GuildState.favorites.some(f => f.name === item.name);
    const isShortlisted = GuildState.shortlist.some(s => s.name === item.name);

    card.innerHTML = `
      <div>
        <div class="guild-card-top">
          <div class="guild-name-heading">${escapeHtml(item.name)}</div>
          <button class="guild-tag-badge" title="Click to cycle smart tags">
            [ <span class="tag-text">${item.selectedTag}</span> ]
          </button>
        </div>
        <div class="guild-attributes-line">
          ${item.vibe.toUpperCase()} &bull; ${item.lengthProfile} &bull; ${item.style.toUpperCase()}
        </div>
      </div>
      <div>
        <button class="btn-guild-copy-main" aria-label="Copy guild name">
          <span>📋</span> <span class="btn-copy-label">Copy Name</span>
        </button>
        <div class="guild-card-actions-row">
          <button class="btn-card-icon-action btn-act-fav ${isFav ? 'favorited' : ''}" title="Save to Favorites">
            ${isFav ? '♥' : '♡'}
          </button>
          <button class="btn-card-icon-action btn-act-shortlist ${isShortlisted ? 'shortlisted' : ''}" title="Add to Squad Shortlist">
            ★ List
          </button>
          <button class="btn-card-icon-action btn-act-edit" title="Customize in Editor">
            ✎ Edit
          </button>
          <button class="btn-card-icon-action btn-act-remix" title="Generate variations">
            ↻ Remix
          </button>
          <button class="btn-card-icon-action btn-act-lock" title="Lock words workbench">
            🔒 Lock
          </button>
        </div>
      </div>
    `;

    // Click card to preview in Squad Sandbox
    card.addEventListener('click', (e) => {
      if (!e.target.closest('button')) {
        selectForSandbox(item);
      }
    });

    // Copy Name Button
    const copyBtn = card.querySelector('.btn-guild-copy-main');
    copyBtn.addEventListener('click', () => {
      copyToClipboard(item.name, `Copied "${item.name}"!`, copyBtn);
    });

    // Tag Badge click: cycle tag variants
    const tagBadge = card.querySelector('.guild-tag-badge');
    tagBadge.addEventListener('click', () => {
      cycleTagVariant(item, card);
    });

    // Favorite Button
    const favBtn = card.querySelector('.btn-act-fav');
    favBtn.addEventListener('click', () => {
      toggleFavorite(item, favBtn);
    });

    // Shortlist Button
    const slBtn = card.querySelector('.btn-act-shortlist');
    slBtn.addEventListener('click', () => {
      toggleShortlist(item, slBtn);
    });

    // Edit Button
    const editBtn = card.querySelector('.btn-act-edit');
    editBtn.addEventListener('click', () => {
      openGuildEditor(item);
    });

    // Remix Button
    const remixBtn = card.querySelector('.btn-act-remix');
    remixBtn.addEventListener('click', () => {
      runRemix(item);
    });

    // Lock Button
    const lockBtn = card.querySelector('.btn-act-lock');
    lockBtn.addEventListener('click', () => {
      openWordLockWorkbench(item);
    });

    container.appendChild(card);
  });
}

function cycleTagVariant(item, card) {
  const tags = item.tagSuggestions;
  if (!tags || tags.length <= 1) return;

  const curIdx = tags.indexOf(item.selectedTag);
  const nextIdx = (curIdx + 1) % tags.length;
  item.selectedTag = tags[nextIdx];

  const tagText = card.querySelector('.tag-text');
  if (tagText) tagText.textContent = item.selectedTag;

  // If currently active in sandbox, update sandbox too
  if (GuildState.selectedForSandbox && GuildState.selectedForSandbox.id === item.id) {
    selectForSandbox(item);
  }

  showGuildToast(`Switched tag to [${item.selectedTag}]`);
}

/* ===================================================================
   4. FICTIONAL SQUAD & IDENTITY PREVIEW SANDBOX
   =================================================================== */

function initSquadSandbox() {
  const ignInput = document.getElementById('sandbox-player-ign');
  if (ignInput) {
    ignInput.value = GuildState.playerIgn;
    ignInput.addEventListener('input', (e) => {
      GuildState.playerIgn = e.target.value.trim() || 'Player';
      updateSquadRoster();
    });
  }
}

function selectForSandbox(guildItem) {
  GuildState.selectedForSandbox = guildItem;

  const nameElem = document.getElementById('sandbox-guild-name');
  const tagElem = document.getElementById('sandbox-tag-pill');
  const vibeElem = document.getElementById('sandbox-vibe-pill');

  if (nameElem) nameElem.textContent = guildItem.name;
  if (tagElem) tagElem.textContent = `[ ${guildItem.selectedTag} ]`;
  if (vibeElem) vibeElem.textContent = guildItem.vibe.toUpperCase();

  updateSquadRoster();
}

function updateSquadRoster() {
  if (!GuildState.selectedForSandbox) return;
  const tag = GuildState.selectedForSandbox.selectedTag;

  const p1 = document.getElementById('roster-ign-1');
  const p2 = document.getElementById('roster-ign-2');
  const p3 = document.getElementById('roster-ign-3');
  const p4 = document.getElementById('roster-ign-4');

  if (p1) p1.textContent = `[${tag}] ${GuildState.playerIgn.toUpperCase()}`;
  if (p2) p2.textContent = `[${tag}] GHOST`;
  if (p3) p3.textContent = `[${tag}] VIPER`;
  if (p4) p4.textContent = `[${tag}] HUNTER`;
}

/* ===================================================================
   5. WORD LOCK WORKBENCH
   =================================================================== */

function openWordLockWorkbench(item) {
  const bench = document.getElementById('word-lock-workbench');
  if (!bench) return;

  const words = item.words || item.rawName.split(' ');
  if (words.length < 2) {
    showGuildToast('Word lock requires a two-word guild name.');
    return;
  }

  GuildState.wordLock = {
    active: true,
    words: [words[0], words[1]],
    lockedIndex: 0,
    vibe: item.vibe,
    currentGuild: item
  };

  renderWordLockUI();
  bench.style.display = 'block';
  bench.scrollIntoView({ behavior: 'smooth', block: 'center' });
  showGuildToast('Word Lock Workbench active! Lock a word and regenerate the other.');
}

function renderWordLockUI() {
  const w1Elem = document.getElementById('lock-word-0-text');
  const w2Elem = document.getElementById('lock-word-1-text');
  const c1 = document.getElementById('lock-card-0');
  const c2 = document.getElementById('lock-card-1');
  const lockBtn1 = document.getElementById('btn-lock-toggle-0');
  const lockBtn2 = document.getElementById('btn-lock-toggle-1');

  if (w1Elem) w1Elem.textContent = GuildState.wordLock.words[0];
  if (w2Elem) w2Elem.textContent = GuildState.wordLock.words[1];

  if (c1 && c2) {
    if (GuildState.wordLock.lockedIndex === 0) {
      c1.classList.add('locked');
      c2.classList.remove('locked');
      if (lockBtn1) lockBtn1.textContent = '🔒 Locked';
      if (lockBtn2) lockBtn2.textContent = '↻ Dynamic';
    } else {
      c2.classList.add('locked');
      c1.classList.remove('locked');
      if (lockBtn2) lockBtn2.textContent = '🔒 Locked';
      if (lockBtn1) lockBtn1.textContent = '↻ Dynamic';
    }
  }

  const regenBtn = document.getElementById('btn-regen-unlocked');
  if (regenBtn) {
    regenBtn.onclick = () => {
      const updated = GuildEngine.regenerateLocked(
        GuildState.wordLock.words,
        GuildState.wordLock.lockedIndex,
        GuildState.wordLock.vibe
      );
      GuildState.wordLock.words = updated.words;
      renderWordLockUI();

      // Add to results
      const newGuild = {
        id: 'locked_' + Math.random().toString(36).substring(2, 9),
        name: updated.name,
        rawName: updated.rawName,
        words: updated.words,
        tagSuggestions: updated.tagSuggestions,
        selectedTag: updated.selectedTag,
        vibe: GuildState.wordLock.vibe,
        style: 'clean',
        lengthProfile: 'Medium',
        isFavorite: false,
        isShortlisted: false
      };

      GuildState.currentResults.unshift(newGuild);
      renderResults([newGuild], true);
      selectForSandbox(newGuild);
      showGuildToast(`Generated "${newGuild.name}" [${newGuild.selectedTag}]`);
    };
  }

  // Toggle handlers
  if (lockBtn1) {
    lockBtn1.onclick = () => {
      GuildState.wordLock.lockedIndex = 0;
      renderWordLockUI();
    };
  }
  if (lockBtn2) {
    lockBtn2.onclick = () => {
      GuildState.wordLock.lockedIndex = 1;
      renderWordLockUI();
    };
  }
}

/* ===================================================================
   6. REMIX & "MORE LIKE THIS"
   =================================================================== */

function runRemix(item) {
  const remixed = GuildEngine.remixGuild(item);
  if (remixed.length === 0) return;

  GuildState.currentResults = remixed.concat(GuildState.currentResults);
  renderResults(GuildState.currentResults, false);
  selectForSandbox(remixed[0]);

  const resultsContainer = document.getElementById('guild-results-section');
  if (resultsContainer) resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });

  showGuildToast(`Remixed variations for "${item.words[0]}"!`);
}

/* ===================================================================
   7. SHORTLIST DRAWER & SQUAD SHARING
   =================================================================== */

function initShortlistDrawer() {
  const toggleBtn = document.getElementById('btn-toggle-shortlist');
  const closeBtn = document.getElementById('btn-close-shortlist');
  const drawer = document.getElementById('shortlist-drawer');
  const copyShortlistBtn = document.getElementById('btn-copy-shortlist');
  const shareShortlistBtn = document.getElementById('btn-share-shortlist');

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      drawer.classList.toggle('open');
      renderShortlistItems();
    });
  }

  if (closeBtn && drawer) {
    closeBtn.addEventListener('click', () => {
      drawer.classList.remove('open');
    });
  }

  if (copyShortlistBtn) {
    copyShortlistBtn.addEventListener('click', () => {
      const text = buildShortlistShareText();
      copyToClipboard(text, 'Guild shortlist copied to clipboard!');
    });
  }

  if (shareShortlistBtn) {
    shareShortlistBtn.addEventListener('click', () => {
      const text = buildShortlistShareText();
      if (navigator.share) {
        navigator.share({
          title: 'Free Fire Guild Ideas',
          text: text
        }).catch(() => {});
      } else {
        copyToClipboard(text, 'Shortlist copied! Paste into WhatsApp or Discord.');
      }
    });
  }

  updateShortlistBadge();
}

function toggleShortlist(item, btn) {
  const index = GuildState.shortlist.findIndex(s => s.name === item.name);
  if (index > -1) {
    GuildState.shortlist.splice(index, 1);
    if (btn) btn.classList.remove('shortlisted');
    showGuildToast('Removed from shortlist.');
  } else {
    GuildState.shortlist.push(item);
    if (btn) btn.classList.add('shortlisted');
    showGuildToast(`Added "${item.name}" to squad shortlist!`);
  }

  localStorage.setItem('ff_guild_shortlist', JSON.stringify(GuildState.shortlist));
  updateShortlistBadge();
}

function updateShortlistBadge() {
  const badge = document.getElementById('shortlist-count-badge');
  if (!badge) return;
  const count = GuildState.shortlist.length;
  badge.textContent = count;
  badge.style.display = count > 0 ? 'inline-flex' : 'none';
}

function renderShortlistItems() {
  const list = document.getElementById('shortlist-items-container');
  if (!list) return;

  if (GuildState.shortlist.length === 0) {
    list.innerHTML = `
      <div style="text-align: center; padding: 2rem 1rem; color: var(--text-muted);">
        No guild names shortlisted yet. Click <strong>★ List</strong> on any card to save options for your squad!
      </div>
    `;
    return;
  }

  list.innerHTML = '';
  GuildState.shortlist.forEach((item, index) => {
    const row = document.createElement('div');
    row.className = 'shortlist-entry-row';
    row.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <span style="font-family: var(--font-gaming); color: #ffaa00; font-weight: 700;">#${index + 1}</span>
        <div>
          <span style="font-family: var(--font-gaming); font-weight: 700; color: #fff;">${escapeHtml(item.name)}</span>
          <span style="font-size: 0.75rem; color: #ffaa00; margin-left: 0.35rem;">[${item.selectedTag}]</span>
        </div>
      </div>
      <div style="display: flex; gap: 0.35rem;">
        <button class="btn btn-secondary btn-copy-entry" style="height: 32px; padding: 0 8px; font-size: 0.75rem;">
          📋 Copy
        </button>
        <button class="btn btn-secondary btn-remove-entry" style="height: 32px; padding: 0 8px; font-size: 0.75rem; color: #ff1744;">
          ✕
        </button>
      </div>
    `;

    row.querySelector('.btn-copy-entry').addEventListener('click', () => {
      copyToClipboard(`${item.name} | ${item.selectedTag}`, `Copied "${item.name}"!`);
    });

    row.querySelector('.btn-remove-entry').addEventListener('click', () => {
      toggleShortlist(item);
      renderShortlistItems();
      renderResults(GuildState.currentResults, false);
    });

    list.appendChild(row);
  });
}

function buildShortlistShareText() {
  if (GuildState.shortlist.length === 0) return 'No guild names shortlisted.';
  let out = '🔥 Free Fire Guild Name Candidates:\n';
  GuildState.shortlist.forEach((item, i) => {
    out += `${i + 1}. ${item.name} [Tag: ${item.selectedTag}]\n`;
  });
  out += '\nWhich one should we choose for our squad?';
  return out;
}

/* ===================================================================
   8. FAVORITES & RECENTS
   =================================================================== */

function toggleFavorite(item, btn) {
  const index = GuildState.favorites.findIndex(f => f.name === item.name);
  if (index > -1) {
    GuildState.favorites.splice(index, 1);
    if (btn) {
      btn.classList.remove('favorited');
      btn.textContent = '♡';
    }
    showGuildToast('Removed from favorites.');
  } else {
    GuildState.favorites.push(item);
    if (btn) {
      btn.classList.add('favorited');
      btn.textContent = '♥';
    }
    showGuildToast(`Favorited "${item.name}"!`);
  }
  localStorage.setItem('ff_guild_favs', JSON.stringify(GuildState.favorites));
}

function saveToRecents(text) {
  if (!text) return;
  GuildState.recents = GuildState.recents.filter(r => r !== text);
  GuildState.recents.unshift(text);
  if (GuildState.recents.length > 20) GuildState.recents.pop();
  localStorage.setItem('ff_guild_recents', JSON.stringify(GuildState.recents));
}

/* ===================================================================
   9. GUILD NAME EDITOR MODAL
   =================================================================== */

function initGuildEditor() {
  const modal = document.getElementById('guild-editor-modal');
  const closeBtn = document.getElementById('btn-close-editor');
  const nameInput = document.getElementById('editor-guild-name');
  const tagInput = document.getElementById('editor-guild-tag');
  const copyBtn = document.getElementById('btn-editor-copy');
  const symbolsContainer = document.getElementById('editor-symbols-container');

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.classList.remove('open'));
  }

  // Symbol buttons
  const SYMBOLS = ['亗', '★', '♛', '乂', '〆', '彡', '⚡', '☠', '꧁', '꧂'];
  if (symbolsContainer) {
    symbolsContainer.innerHTML = '';
    SYMBOLS.forEach(sym => {
      const btn = document.createElement('button');
      btn.className = 'btn-compact-symbol';
      btn.textContent = sym;
      btn.addEventListener('click', () => {
        insertAtCursor(nameInput, sym);
        updateEditorPreview();
      });
      symbolsContainer.appendChild(btn);
    });
  }

  if (nameInput) {
    nameInput.addEventListener('input', updateEditorPreview);
  }
  if (tagInput) {
    tagInput.addEventListener('input', updateEditorPreview);
  }

  // Style buttons in editor
  document.querySelectorAll('.btn-editor-style').forEach(b => {
    b.addEventListener('click', () => {
      document.querySelectorAll('.btn-editor-style').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      const st = b.getAttribute('data-style');
      applyEditorStyle(st);
    });
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const name = nameInput.value.trim();
      const tag = tagInput.value.trim();
      const textToCopy = tag ? `${name} | ${tag}` : name;
      copyToClipboard(textToCopy, 'Customized guild identity copied!', copyBtn);
    });
  }
}

function openGuildEditor(item) {
  const modal = document.getElementById('guild-editor-modal');
  const nameInput = document.getElementById('editor-guild-name');
  const tagInput = document.getElementById('editor-guild-tag');
  if (!modal || !nameInput) return;

  nameInput.value = item.rawName || item.name;
  if (tagInput) tagInput.value = item.selectedTag || '';

  updateEditorPreview();
  modal.classList.add('open');
}

function updateEditorPreview() {
  const nameInput = document.getElementById('editor-guild-name');
  const tagInput = document.getElementById('editor-guild-tag');
  const previewName = document.getElementById('editor-preview-name');
  const previewTag = document.getElementById('editor-preview-tag');
  const charCount = document.getElementById('editor-char-count');

  const val = nameInput ? nameInput.value.trim() : '';
  const tag = tagInput ? tagInput.value.trim() : '';

  if (previewName) previewName.textContent = val || 'GUILD NAME';
  if (previewTag) previewTag.textContent = tag ? `[ ${tag} ]` : '';
  if (charCount) charCount.textContent = `${Array.from(val).length} Chars`;
}

function applyEditorStyle(style) {
  const nameInput = document.getElementById('editor-guild-name');
  if (!nameInput) return;

  const raw = GuildEngine.simplifyStyle(nameInput.value);
  nameInput.value = GuildEngine.applyStyle(raw, style);
  updateEditorPreview();
}

function insertAtCursor(input, text) {
  if (!input) return;
  const start = input.selectionStart ?? input.value.length;
  const end = input.selectionEnd ?? input.value.length;
  const val = input.value;

  input.value = val.substring(0, start) + text + val.substring(end);
  const pos = start + text.length;
  input.focus();
  input.setSelectionRange(pos, pos);
}

/* ===================================================================
   10. NAME COMPARISON MODAL
   =================================================================== */

function initComparisonModal() {
  const modal = document.getElementById('comparison-modal');
  const closeBtn = document.getElementById('btn-close-comparison');
  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.classList.remove('open'));
  }
}

window.openComparison = function() {
  const modal = document.getElementById('comparison-modal');
  const tableBody = document.getElementById('comparison-table-body');
  if (!modal || !tableBody) return;

  const itemsToCompare = GuildState.shortlist.slice(0, 3);
  if (itemsToCompare.length < 2) {
    showGuildToast('Add at least 2 guild names to your shortlist to compare.');
    return;
  }

  let html = `
    <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem; text-align: left;">
      <thead>
        <tr style="border-bottom: 2px solid var(--border-subtle); color: var(--text-muted); font-family: var(--font-gaming);">
          <th style="padding: 0.75rem 0.5rem;">Attribute</th>
          ${itemsToCompare.map(item => `<th style="padding: 0.75rem 0.5rem; color: #ffaa00;">${escapeHtml(item.name)}</th>`).join('')}
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom: 1px solid var(--border-subtle);">
          <td style="padding: 0.75rem 0.5rem; color: var(--text-muted); font-weight: 700;">Tag</td>
          ${itemsToCompare.map(item => `<td style="padding: 0.75rem 0.5rem; font-family: var(--font-gaming); color: #fff; font-weight: 800;">[ ${item.selectedTag} ]</td>`).join('')}
        </tr>
        <tr style="border-bottom: 1px solid var(--border-subtle);">
          <td style="padding: 0.75rem 0.5rem; color: var(--text-muted); font-weight: 700;">Vibe</td>
          ${itemsToCompare.map(item => `<td style="padding: 0.75rem 0.5rem; text-transform: uppercase;">${item.vibe}</td>`).join('')}
        </tr>
        <tr style="border-bottom: 1px solid var(--border-subtle);">
          <td style="padding: 0.75rem 0.5rem; color: var(--text-muted); font-weight: 700;">Length</td>
          ${itemsToCompare.map(item => `<td style="padding: 0.75rem 0.5rem;">${item.lengthProfile} (${Array.from(item.name).length} chars)</td>`).join('')}
        </tr>
        <tr style="border-bottom: 1px solid var(--border-subtle);">
          <td style="padding: 0.75rem 0.5rem; color: var(--text-muted); font-weight: 700;">Squad Look</td>
          ${itemsToCompare.map(item => `<td style="padding: 0.75rem 0.5rem; font-family: var(--font-gaming); color: #ffaa00;">[${item.selectedTag}] Player</td>`).join('')}
        </tr>
      </tbody>
    </table>
  `;

  tableBody.innerHTML = html;
  modal.classList.add('open');
};

/* ===================================================================
   11. AMBIENT PARTICLES & UTILITIES
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
