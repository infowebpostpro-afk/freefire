/**
 * Free Fire Name Checker & Unicode Inspector — Application Controller
 * Handles user input, live updates, copy actions, sample presets,
 * tab switching, toasts, and ambient background animation.
 */

document.addEventListener('DOMContentLoaded', () => {
  initCheckerApp();
  initAmbientEmbers();
  initFAQAccordion();
});

function initCheckerApp() {
  const inputEl = document.getElementById('checker-nickname-input');
  const clearBtn = document.getElementById('btn-input-clear');
  const pasteBtn = document.getElementById('btn-input-paste');
  const sampleChips = document.querySelectorAll('.btn-sample-chip');

  const copyOrigBtn = document.getElementById('btn-copy-original');
  const copySimpBtn = document.getElementById('btn-copy-simplified');

  const tabBtns = document.querySelectorAll('.btn-inspect-tab');
  const tabPanes = document.querySelectorAll('.tab-pane');

  if (!inputEl) return;

  // 1. Initial analysis run on default value
  runAnalysis(inputEl.value);

  // 2. Live input listener
  inputEl.addEventListener('input', (e) => {
    runAnalysis(e.target.value);
  });

  // 3. Clear button
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      inputEl.value = '';
      inputEl.focus();
      runAnalysis('');
    });
  }

  // 4. Paste button
  if (pasteBtn) {
    pasteBtn.addEventListener('click', async () => {
      if (navigator.clipboard && navigator.clipboard.readText) {
        try {
          const text = await navigator.clipboard.readText();
          if (text) {
            inputEl.value = text;
            runAnalysis(text);
            showToast('Nickname pasted from clipboard!');
          }
        } catch (err) {
          // Fallback focus
          inputEl.focus();
          showToast('Please press Ctrl+V to paste your nickname.', 'info');
        }
      } else {
        inputEl.focus();
        showToast('Please press Ctrl+V to paste your nickname.', 'info');
      }
    });
  }

  // 5. Sample preset chips
  sampleChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const sampleVal = chip.getAttribute('data-sample');
      if (sampleVal !== null) {
        inputEl.value = sampleVal;
        runAnalysis(sampleVal);
        inputEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        showToast(`Loaded sample: "${chip.querySelector('strong') ? chip.querySelector('strong').textContent : sampleVal}"`);
      }
    });
  });

  // 6. Copy Buttons
  if (copyOrigBtn) {
    copyOrigBtn.addEventListener('click', () => {
      const textToCopy = inputEl.value;
      if (!textToCopy) {
        showToast('Input is empty. Enter a nickname first.', 'warn');
        return;
      }
      copyToClipboard(textToCopy, 'Original nickname copied to clipboard!', copyOrigBtn);
    });
  }

  if (copySimpBtn) {
    copySimpBtn.addEventListener('click', () => {
      const simpTextEl = document.getElementById('sim-simplified-text');
      const textToCopy = simpTextEl ? simpTextEl.getAttribute('data-raw') || simpTextEl.textContent : '';
      if (!textToCopy) {
        showToast('No simplified version available.', 'warn');
        return;
      }
      copyToClipboard(textToCopy, 'Simplified nickname copied to clipboard!', copySimpBtn);
    });
  }

  // 7. Inspector Tab switching
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });
}

/**
 * Runs the analysis engine and updates all UI sections
 */
function runAnalysis(rawText) {
  const result = window.NameCheckerEngine.inspectNickname(rawText);

  // 1. Text Analysis Metrics
  const metricCp = document.getElementById('metric-code-points');
  const metricGc = document.getElementById('metric-graphemes');
  const metricUtf16 = document.getElementById('metric-utf16');
  const metricBytes = document.getElementById('metric-utf8-bytes');

  if (metricCp) metricCp.textContent = result.counts.codePoints;
  if (metricGc) metricGc.textContent = result.counts.graphemeClusters;
  if (metricUtf16) metricUtf16.textContent = result.counts.utf16CodeUnits;
  if (metricBytes) metricBytes.textContent = result.counts.utf8Bytes;

  // Community reference gauge
  const comRefBar = document.getElementById('community-ref-bar');
  const comRefCount = document.getElementById('community-ref-count');
  const comRefBadge = document.getElementById('community-ref-badge');

  if (comRefCount) {
    comRefCount.textContent = `${result.counts.codePoints} / 12`;
  }
  if (comRefBar) {
    const pct = Math.min(100, Math.round((result.counts.codePoints / 12) * 100));
    comRefBar.style.width = `${pct}%`;
    comRefBar.className = 'community-progress-bar';

    if (result.counts.codePoints > 12) {
      comRefBar.classList.add('status-warn');
      if (comRefBadge) {
        comRefBadge.textContent = 'Exceeds Community 12-Char Reference';
        comRefBadge.className = 'diag-badge diag-badge-warn';
      }
    } else if (result.counts.codePoints === 12) {
      comRefBar.classList.add('status-ok');
      if (comRefBadge) {
        comRefBadge.textContent = 'Exactly 12 Characters';
        comRefBadge.className = 'diag-badge diag-badge-ok';
      }
    } else {
      comRefBar.classList.add('status-ok');
      if (comRefBadge) {
        comRefBadge.textContent = 'Within Community Guideline';
        comRefBadge.className = 'diag-badge diag-badge-ok';
      }
    }
  }

  // 2. Potential Issues & Diagnostics
  renderDiagnostics(result);

  // 3. Simplified Alternative
  renderSimplification(result);

  // 4. Code-Point Breakdown Table
  renderCodePointTable(result.breakdown);

  // 5. Normalization Pane
  renderNormalization(result.normalization);

  // 6. Raw Escapes
  const rawHexEl = document.getElementById('raw-hex-text');
  const rawEscEl = document.getElementById('raw-escape-text');
  if (rawHexEl) rawHexEl.textContent = result.rawHex || '(empty)';
  if (rawEscEl) rawEscEl.textContent = result.rawEscape || '(empty)';
}

/**
 * Render Diagnostics list
 */
function renderDiagnostics(result) {
  const invisibleItem = document.getElementById('diag-invisible-item');
  const combiningItem = document.getElementById('diag-combining-item');
  const styledItem = document.getElementById('diag-styled-item');
  const ornamentsItem = document.getElementById('diag-ornaments-item');
  const cleanState = document.getElementById('diag-clean-state');

  const { invisibleList, combiningList, styledList, ornamentList, totalIssues } = result.diagnostics;

  if (result.isEmpty) {
    if (invisibleItem) invisibleItem.style.display = 'none';
    if (combiningItem) combiningItem.style.display = 'none';
    if (styledItem) styledItem.style.display = 'none';
    if (ornamentsItem) ornamentsItem.style.display = 'none';
    if (cleanState) {
      cleanState.style.display = 'flex';
      cleanState.querySelector('.diag-desc').textContent = 'Enter a nickname above to inspect its characters, hidden spaces, and formatting.';
    }
    return;
  }

  // Invisible Characters
  if (invisibleItem) {
    if (invisibleList.length > 0) {
      invisibleItem.style.display = 'flex';
      invisibleItem.classList.add('diag-alert');
      const badge = invisibleItem.querySelector('.diag-badge');
      if (badge) badge.textContent = `${invisibleList.length} Found`;
      const pillsContainer = invisibleItem.querySelector('.diag-chars-found');
      if (pillsContainer) {
        pillsContainer.innerHTML = invisibleList.map(item => `
          <span class="found-char-pill" title="${item.name}">${item.hex} (${item.name})</span>
        `).join('');
      }
    } else {
      invisibleItem.style.display = 'none';
    }
  }

  // Combining Marks
  if (combiningItem) {
    if (combiningList.length > 0) {
      combiningItem.style.display = 'flex';
      combiningItem.classList.add('diag-alert');
      const badge = combiningItem.querySelector('.diag-badge');
      if (badge) badge.textContent = `${combiningList.length} Found`;
      const pillsContainer = combiningItem.querySelector('.diag-chars-found');
      if (pillsContainer) {
        pillsContainer.innerHTML = combiningList.map(item => `
          <span class="found-char-pill">${item.hex} (Pos #${item.index})</span>
        `).join('');
      }
    } else {
      combiningItem.style.display = 'none';
    }
  }

  // Mathematical Styled
  if (styledItem) {
    if (styledList.length > 0) {
      styledItem.style.display = 'flex';
      styledItem.classList.add('diag-alert');
      const badge = styledItem.querySelector('.diag-badge');
      if (badge) badge.textContent = `${styledList.length} Found`;
    } else {
      styledItem.style.display = 'none';
    }
  }

  // Ornaments
  if (ornamentsItem) {
    if (ornamentList.length > 0) {
      ornamentsItem.style.display = 'flex';
      const badge = ornamentsItem.querySelector('.diag-badge');
      if (badge) badge.textContent = `${ornamentList.length} Found`;
    } else {
      ornamentsItem.style.display = 'none';
    }
  }

  // Clean State (if zero issues)
  if (cleanState) {
    if (totalIssues === 0 && ornamentList.length === 0) {
      cleanState.style.display = 'flex';
      cleanState.querySelector('.diag-desc').textContent = 'No hidden spaces, nonstandard combining marks, or styled mathematical letters detected. This name uses standard characters.';
    } else {
      cleanState.style.display = 'none';
    }
  }
}

/**
 * Render Simplified Fallback
 */
function renderSimplification(result) {
  const origTextEl = document.getElementById('sim-original-text');
  const origStatsEl = document.getElementById('sim-original-stats');
  const simpTextEl = document.getElementById('sim-simplified-text');
  const simpStatsEl = document.getElementById('sim-simplified-stats');
  const diffNoteEl = document.getElementById('sim-diff-note');

  if (origTextEl) {
    origTextEl.textContent = result.original || '(no input)';
  }
  if (origStatsEl) {
    origStatsEl.innerHTML = `
      <span>Code points: <strong class="sim-stat-val">${result.counts.codePoints}</strong></span>
      <span>Graphemes: <strong class="sim-stat-val">${result.counts.graphemeClusters}</strong></span>
    `;
  }

  const simplified = result.simplified;
  if (simpTextEl) {
    simpTextEl.textContent = simplified.text || '(no input)';
    simpTextEl.setAttribute('data-raw', simplified.text);
  }
  if (simpStatsEl) {
    simpStatsEl.innerHTML = `
      <span>Code points: <strong class="sim-stat-val">${simplified.codePoints}</strong></span>
      <span>Graphemes: <strong class="sim-stat-val">${window.NameCheckerEngine.countGraphemeClusters(simplified.text)}</strong></span>
    `;
  }
  if (diffNoteEl) {
    if (simplified.changes && simplified.changes.length > 0) {
      diffNoteEl.innerHTML = `<strong>Changes applied:</strong> ${simplified.changes.join(' • ')}`;
    } else {
      diffNoteEl.innerHTML = '<strong>Status:</strong> Name is already in simple format.';
    }
  }
}

/**
 * Render Code-Point Table
 */
function renderCodePointTable(breakdown) {
  const tbody = document.getElementById('code-points-table-body');
  if (!tbody) return;

  if (!breakdown || breakdown.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; color: var(--text-muted); padding: 1.5rem;">
          No characters entered yet. Paste or type a nickname above to inspect code points.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = breakdown.map(item => {
    let glyphClass = 'glyph-badge';
    if (item.isInvisible) glyphClass += ' glyph-invisible';
    if (item.isCombining) glyphClass += ' glyph-combining';

    return `
      <tr>
        <td style="font-weight: 700; color: var(--text-muted);">#${item.position}</td>
        <td>
          <span class="${glyphClass}">${escapeHtml(item.glyphDisplay)}</span>
        </td>
        <td>
          <span class="code-hex">${item.hex}</span>
        </td>
        <td style="font-weight: 600; color: #ffffff;">${escapeHtml(item.label)}</td>
        <td style="color: var(--text-med);">${escapeHtml(item.block)}</td>
        <td>
          <span class="code-category-pill">${escapeHtml(item.category)}</span>
        </td>
      </tr>
    `;
  }).join('');
}

/**
 * Render Normalization Form Details
 */
function renderNormalization(norm) {
  const nfcEl = document.getElementById('norm-nfc-text');
  const nfdEl = document.getElementById('norm-nfd-text');
  const nfkcEl = document.getElementById('norm-nfkc-text');
  const nfkdEl = document.getElementById('norm-nfkd-text');
  const alertEl = document.getElementById('norm-alert-note');

  if (nfcEl) nfcEl.textContent = norm.nfc || '(empty)';
  if (nfdEl) nfdEl.textContent = norm.nfd || '(empty)';
  if (nfkcEl) nfkcEl.textContent = norm.nfkc || '(empty)';
  if (nfkdEl) nfkdEl.textContent = norm.nfkd || '(empty)';

  if (alertEl) {
    if (norm.hasNormalizedDifferences) {
      alertEl.innerHTML = `
        <strong>⚠️ Normalization Difference Detected:</strong> 
        NFKC/NFKD transforms styled mathematical or compatibility characters into canonical base letters. Gaming databases that enforce Unicode normalization may store or compare your nickname under its decomposed form.
      `;
      alertEl.style.display = 'block';
    } else {
      alertEl.innerHTML = `
        <strong>✓ Canonical Integrity:</strong> 
        This nickname produces identical results across standard NFC and NFKC forms.
      `;
      alertEl.style.display = 'block';
    }
  }
}

/**
 * Clipboard Copy with Animated Feedback
 */
function copyToClipboard(text, successMsg, triggerBtn) {
  if (!text) return;

  const handleSuccess = () => {
    showToast(successMsg || 'Copied to clipboard!');
    if (triggerBtn) {
      triggerBtn.classList.add('copied');
      const originalHtml = triggerBtn.getAttribute('data-original-html') || triggerBtn.innerHTML;
      if (!triggerBtn.getAttribute('data-original-html')) {
        triggerBtn.setAttribute('data-original-html', originalHtml);
      }
      triggerBtn.innerHTML = '<span>✓</span> Copied!';
      setTimeout(() => {
        triggerBtn.classList.remove('copied');
        triggerBtn.innerHTML = triggerBtn.getAttribute('data-original-html');
      }, 1600);
    }
  };

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(handleSuccess).catch(() => {
      fallbackCopy(text, handleSuccess);
    });
  } else {
    fallbackCopy(text, handleSuccess);
  }
}

function fallbackCopy(text, onSuccess) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.left = '-9999px';
  ta.style.top = '-9999px';
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try {
    document.execCommand('copy');
    onSuccess();
  } catch (e) {
    showToast('Failed to copy automatically. Please select text manually.', 'warn');
  }
  document.body.removeChild(ta);
}

/**
 * Toast Notification Helper
 */
function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type === 'success' ? 'toast-success' : ''}`;
  toast.innerHTML = `
    <span>${type === 'success' ? '✓' : 'ℹ'}</span>
    <span>${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.25s ease';
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 250);
  }, 2400);
}

/**
 * FAQ Accordion Handler
 */
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

/**
 * Ambient Embers Canvas Background
 */
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

/**
 * HTML Escaping helper
 */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
