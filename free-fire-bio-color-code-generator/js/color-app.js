/**
 * Free Fire Bio Color Studio — Application Controller
 * Handles Multi-part segment editing, visual/HEX color picking,
 * candidate-format switching, simulated profile preview,
 * contrast warnings, side-by-side format inspector, and clipboard copy.
 */

const ColorStudioApp = {
  state: {
    parts: [
      { id: "p1", text: "ONE TAP ", hex: "#FF0000" },
      { id: "p2", text: "| NO FEAR", hex: "#FFD700" }
    ],
    activeFormat: "standard",
    activeTab: "preview", // 'preview' | 'inspector'
    savedCreations: JSON.parse(localStorage.getItem('ff_bio_color_creations') || '[]')
  },

  init() {
    this.initCanvasBackground();
    this.initPresets();
    this.initFormatSwitcher();
    this.initSegmentActions();
    this.initViewTabs();
    this.initClipboardButtons();
    this.initFaqAccordion();
    this.render();
  },

  // 1. Ambient Particle Background
  initCanvasBackground() {
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
    const particleCount = Math.min(24, Math.floor(width / 50));

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -Math.random() * 0.35 - 0.1,
        alpha: Math.random() * 0.35 + 0.1,
        color: Math.random() > 0.5 ? '#ff5722' : '#ffaa00'
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });
      requestAnimationFrame(animate);
    }
    animate();
  },

  // 2. Starter Preset Templates
  initPresets() {
    const presetsRow = document.getElementById('starter-presets-row');
    if (!presetsRow) return;

    presetsRow.innerHTML = BIO_STARTER_PRESETS.map(preset => {
      return `
        <button class="btn-preset-pill" data-id="${preset.id}" title="${preset.desc}">
          <span class="preset-pill-title">${preset.title}</span>
          <div class="preset-dots-wrap">
            ${preset.parts.map(p => `<span class="preset-dot" style="background-color: ${p.hex};"></span>`).join('')}
          </div>
        </button>
      `;
    }).join('');

    presetsRow.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-preset-pill');
      if (!btn) return;
      const pid = btn.dataset.id;
      const found = BIO_STARTER_PRESETS.find(p => p.id === pid);
      if (found) {
        this.state.parts = found.parts.map((p, i) => ({
          id: `p_${Date.now()}_${i}`,
          text: p.text,
          hex: p.hex
        }));
        this.render();
        this.showToast(`Loaded preset: "${found.title}"`);
      }
    });
  },

  // 3. Candidate Format Switcher
  initFormatSwitcher() {
    const container = document.getElementById('format-selector-row');
    if (!container) return;

    container.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-format-choice');
      if (!btn) return;
      const formatId = btn.dataset.format;
      if (this.state.activeFormat === formatId) return;

      this.state.activeFormat = formatId;
      container.querySelectorAll('.btn-format-choice').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      this.render();
      this.showToast(`Switched candidate syntax to ${btn.dataset.formatLabel || formatId}`);
    });
  },

  // 4. Multi-Part Segment Editor
  initSegmentActions() {
    const segmentsContainer = document.getElementById('segments-editor-list');
    const addPartBtn = document.getElementById('btn-add-part');
    const resetBtn = document.getElementById('btn-reset-studio');

    // Add new segment
    if (addPartBtn) {
      addPartBtn.addEventListener('click', () => {
        if (this.state.parts.length >= 4) {
          this.showToast("Maximum 4 colored segments supported for bio readability.");
          return;
        }

        const newId = `p_${Date.now()}`;
        const defaultColors = ["#FF0000", "#FFD700", "#00E5FF", "#00FF00"];
        const nextHex = defaultColors[this.state.parts.length] || "#FFFFFF";

        this.state.parts.push({
          id: newId,
          text: "NEW PART",
          hex: nextHex
        });

        this.render();
        this.showToast("Added new colored part.");
      });
    }

    // Reset studio
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.state.parts = [
          { id: "p1", text: "ONE TAP ", hex: "#FF0000" },
          { id: "p2", text: "| NO FEAR", hex: "#FFD700" }
        ];
        this.state.activeFormat = "standard";
        this.render();
        this.showToast("Reset studio to default setup.");
      });
    }

    // Event delegation on segments editor
    if (segmentsContainer) {
      // Text inputs
      segmentsContainer.addEventListener('input', (e) => {
        const textInput = e.target.closest('.segment-text-input');
        if (textInput) {
          const index = parseInt(textInput.dataset.index, 10);
          if (this.state.parts[index]) {
            this.state.parts[index].text = textInput.value;
            this.updateOutputAndPreviewOnly();
          }
          return;
        }

        const hexTextInput = e.target.closest('.segment-hex-text');
        if (hexTextInput) {
          const index = parseInt(hexTextInput.dataset.index, 10);
          const clean = hexTextInput.value.trim();
          if (clean.length >= 6) {
            const sanitized = ColorEngine.sanitizeHex(clean);
            if (this.state.parts[index]) {
              this.state.parts[index].hex = sanitized;
              // Sync color picker
              const colorPicker = segmentsContainer.querySelector(`.segment-color-picker[data-index="${index}"]`);
              if (colorPicker) colorPicker.value = sanitized;
              this.updateOutputAndPreviewOnly();
            }
          }
        }
      });

      // Color pickers (change event)
      segmentsContainer.addEventListener('change', (e) => {
        const colorPicker = e.target.closest('.segment-color-picker');
        if (colorPicker) {
          const index = parseInt(colorPicker.dataset.index, 10);
          const sanitized = ColorEngine.sanitizeHex(colorPicker.value);
          if (this.state.parts[index]) {
            this.state.parts[index].hex = sanitized;
            // Sync text hex input
            const hexTextInput = segmentsContainer.querySelector(`.segment-hex-text[data-index="${index}"]`);
            if (hexTextInput) hexTextInput.value = sanitized;
            this.updateOutputAndPreviewOnly();
          }
        }
      });

      // Swatch clicks & Reordering
      segmentsContainer.addEventListener('click', (e) => {
        // Quick swatch click
        const swatchBtn = e.target.closest('.btn-mini-swatch');
        if (swatchBtn) {
          const index = parseInt(swatchBtn.dataset.index, 10);
          const hex = swatchBtn.dataset.hex;
          if (this.state.parts[index]) {
            this.state.parts[index].hex = hex;
            this.render();
          }
          return;
        }

        // Move Up
        const moveUpBtn = e.target.closest('.btn-part-up');
        if (moveUpBtn) {
          const index = parseInt(moveUpBtn.dataset.index, 10);
          if (index > 0) {
            const temp = this.state.parts[index];
            this.state.parts[index] = this.state.parts[index - 1];
            this.state.parts[index - 1] = temp;
            this.render();
          }
          return;
        }

        // Move Down
        const moveDownBtn = e.target.closest('.btn-part-down');
        if (moveDownBtn) {
          const index = parseInt(moveDownBtn.dataset.index, 10);
          if (index < this.state.parts.length - 1) {
            const temp = this.state.parts[index];
            this.state.parts[index] = this.state.parts[index + 1];
            this.state.parts[index + 1] = temp;
            this.render();
          }
          return;
        }

        // Duplicate
        const dupBtn = e.target.closest('.btn-part-duplicate');
        if (dupBtn) {
          const index = parseInt(dupBtn.dataset.index, 10);
          if (this.state.parts.length >= 4) {
            this.showToast("Maximum 4 colored segments supported.");
            return;
          }
          const target = this.state.parts[index];
          this.state.parts.splice(index + 1, 0, {
            id: `p_${Date.now()}`,
            text: target.text,
            hex: target.hex
          });
          this.render();
          this.showToast("Duplicated colored part.");
          return;
        }

        // Delete Part
        const delBtn = e.target.closest('.btn-part-delete');
        if (delBtn) {
          const index = parseInt(delBtn.dataset.index, 10);
          if (this.state.parts.length <= 1) {
            this.showToast("A signature needs at least 1 text part.");
            return;
          }
          this.state.parts.splice(index, 1);
          this.render();
          this.showToast("Removed colored part.");
          return;
        }
      });
    }
  },

  // 5. View Mode Switcher (Simulated Profile Preview vs Code Inspector)
  initViewTabs() {
    const tabPreview = document.getElementById('tab-view-preview');
    const tabInspector = document.getElementById('tab-view-inspector');
    const panelPreview = document.getElementById('panel-simulated-preview');
    const panelInspector = document.getElementById('panel-format-inspector');

    if (tabPreview && tabInspector && panelPreview && panelInspector) {
      tabPreview.addEventListener('click', () => {
        this.state.activeTab = 'preview';
        tabPreview.classList.add('active');
        tabInspector.classList.remove('active');
        panelPreview.style.display = 'block';
        panelInspector.style.display = 'none';
      });

      tabInspector.addEventListener('click', () => {
        this.state.activeTab = 'inspector';
        tabInspector.classList.add('active');
        tabPreview.classList.remove('active');
        panelPreview.style.display = 'none';
        panelInspector.style.display = 'block';
        this.renderFormatInspector();
      });
    }
  },

  // 6. Clipboard Actions
  initClipboardButtons() {
    const copyCodeBtn = document.getElementById('btn-copy-candidate-code');
    const copyPlainBtn = document.getElementById('btn-copy-plain-fallback');

    if (copyCodeBtn) {
      copyCodeBtn.addEventListener('click', () => {
        const code = ColorEngine.generateCandidateCode(this.state.parts, this.state.activeFormat);
        if (!code) {
          this.showToast("Enter text to copy code.");
          return;
        }
        this.copyToClipboard(code, "Candidate code");
      });
    }

    if (copyPlainBtn) {
      copyPlainBtn.addEventListener('click', () => {
        const plain = ColorEngine.generatePlainText(this.state.parts);
        if (!plain) {
          this.showToast("Enter text to copy fallback.");
          return;
        }
        this.copyToClipboard(plain, "Plain-text fallback");
      });
    }

    // Delegation for inspector copy buttons
    const inspectorPanel = document.getElementById('panel-format-inspector');
    if (inspectorPanel) {
      inspectorPanel.addEventListener('click', (e) => {
        const copyInspBtn = e.target.closest('.btn-copy-inspector-format');
        if (copyInspBtn) {
          const code = copyInspBtn.dataset.code;
          this.copyToClipboard(code, copyInspBtn.dataset.label || "Candidate code");
        }
      });
    }
  },

  // 7. FAQ Accordion
  initFaqAccordion() {
    const faqContainer = document.querySelector('.color-faq-list');
    if (!faqContainer) return;

    faqContainer.addEventListener('click', (e) => {
      const qBtn = e.target.closest('.faq-question');
      if (!qBtn) return;

      const item = qBtn.closest('.faq-item');
      const isExpanded = qBtn.getAttribute('aria-expanded') === 'true';

      qBtn.setAttribute('aria-expanded', String(!isExpanded));
      item.classList.toggle('is-open', !isExpanded);
    });
  },

  // Full Re-render of segments & output
  render() {
    this.renderSegmentsEditor();
    this.updateOutputAndPreviewOnly();
    if (this.state.activeTab === 'inspector') {
      this.renderFormatInspector();
    }
  },

  // Render segments editor cards
  renderSegmentsEditor() {
    const container = document.getElementById('segments-editor-list');
    const addPartBtn = document.getElementById('btn-add-part');
    if (!container) return;

    if (addPartBtn) {
      addPartBtn.disabled = this.state.parts.length >= 4;
      addPartBtn.style.opacity = this.state.parts.length >= 4 ? '0.5' : '1';
    }

    const popularSwatches = ["#FF0000", "#FFD700", "#00E5FF", "#00FF00", "#B388FF", "#FFFFFF", "#FF2A5F"];

    container.innerHTML = this.state.parts.map((part, index) => {
      const hex = ColorEngine.sanitizeHex(part.hex);
      const isFirst = index === 0;
      const isLast = index === this.state.parts.length - 1;

      return `
        <div class="segment-row-card" data-index="${index}">
          <div class="segment-card-header">
            <div class="segment-label-cluster">
              <span class="segment-num-badge">Part ${index + 1}</span>
              <span class="segment-swatch-preview" style="background-color: ${hex};"></span>
            </div>

            <div class="segment-order-controls">
              <button class="btn-part-order btn-part-up" data-index="${index}" title="Move up" ${isFirst ? 'disabled' : ''}>↑</button>
              <button class="btn-part-order btn-part-down" data-index="${index}" title="Move down" ${isLast ? 'disabled' : ''}>↓</button>
              <button class="btn-part-order btn-part-duplicate" data-index="${index}" title="Duplicate this part">⎘</button>
              <button class="btn-part-order btn-part-delete" data-index="${index}" title="Remove this part">✕</button>
            </div>
          </div>

          <div class="segment-inputs-grid">
            <div class="segment-text-field-wrap">
              <input 
                type="text" 
                class="segment-text-input" 
                data-index="${index}" 
                value="${this.escapeHtml(part.text)}" 
                placeholder="Text for Part ${index + 1}..."
                maxlength="60"
              >
            </div>

            <div class="segment-color-cluster">
              <div class="color-picker-input-wrap">
                <input 
                  type="color" 
                  class="segment-color-picker" 
                  data-index="${index}" 
                  value="${hex}" 
                  title="Pick a color"
                >
                <input 
                  type="text" 
                  class="segment-hex-text" 
                  data-index="${index}" 
                  value="${hex}" 
                  maxlength="7" 
                  placeholder="#FFFFFF"
                >
              </div>

              <div class="mini-swatches-row">
                ${popularSwatches.map(s => `
                  <button 
                    type="button" 
                    class="btn-mini-swatch ${s === hex ? 'active' : ''}" 
                    data-index="${index}" 
                    data-hex="${s}" 
                    style="background-color: ${s};" 
                    title="Select ${s}"
                  ></button>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  },

  // Fast update for preview, code box, lengths, and contrast warnings
  updateOutputAndPreviewOnly() {
    // 1. Generate code and fallback
    const candidateCode = ColorEngine.generateCandidateCode(this.state.parts, this.state.activeFormat);
    const plainFallback = ColorEngine.generatePlainText(this.state.parts);
    const lengths = ColorEngine.analyzeLengths(this.state.parts, this.state.activeFormat);

    // 2. Update Code Output Display
    const codeDisplay = document.getElementById('candidate-code-display');
    const plainDisplay = document.getElementById('plain-fallback-display');
    if (codeDisplay) {
      codeDisplay.value = candidateCode || "[No text entered yet]";
    }
    if (plainDisplay) {
      plainDisplay.value = plainFallback || "[No text entered yet]";
    }

    // 3. Update Length Stats
    const rawLenEl = document.getElementById('stat-raw-length');
    const visLenEl = document.getElementById('stat-vis-length');
    const overheadEl = document.getElementById('stat-overhead-length');
    if (rawLenEl) rawLenEl.textContent = `${lengths.rawLength} chars`;
    if (visLenEl) visLenEl.textContent = `${lengths.visibleLength} chars`;
    if (overheadEl) overheadEl.textContent = `+${lengths.overhead} markup chars`;

    // 4. Update Simulated Profile Signature Box
    const sigContainer = document.getElementById('simulated-signature-content');
    if (sigContainer) {
      const isBold = this.state.activeFormat === 'bold' || this.state.activeFormat === 'center_bold';
      const isCentered = this.state.activeFormat === 'center_bold';

      if (this.state.parts.length === 0 || !plainFallback.trim()) {
        sigContainer.innerHTML = `<span class="empty-sig-placeholder">Enter your signature text above to preview colors...</span>`;
      } else {
        const spansHtml = this.state.parts.map(p => {
          const hex = ColorEngine.sanitizeHex(p.hex);
          return `<span style="color: ${hex};">${this.escapeHtml(p.text)}</span>`;
        }).join('');

        sigContainer.innerHTML = `
          <div class="sig-rendered-text ${isBold ? 'sig-bold' : ''} ${isCentered ? 'sig-centered' : ''}">
            ${spansHtml}
          </div>
        `;
      }
    }

    // 5. Evaluate Contrast Warnings
    const contrastNotice = document.getElementById('contrast-warning-banner');
    if (contrastNotice) {
      const warnings = [];
      this.state.parts.forEach((p, idx) => {
        const evalRes = ColorEngine.evaluateContrast(p.hex);
        if (evalRes.isLowContrast) {
          warnings.push(`Part ${idx + 1} (${p.hex})`);
        }
      });

      if (warnings.length > 0) {
        contrastNotice.style.display = 'flex';
        contrastNotice.innerHTML = `
          <span>⚠️ <strong>Contrast Notice:</strong> ${warnings.join(', ')} has low luminance against dark backgrounds and may be difficult to read in-game.</span>
        `;
      } else {
        contrastNotice.style.display = 'none';
      }
    }

    // 6. Save current state
    this.saveCurrentDraft();
  },

  // Render Side-by-Side Candidate Format Inspector
  renderFormatInspector() {
    const listEl = document.getElementById('inspector-formats-list');
    if (!listEl) return;

    const allFormats = ColorEngine.generateAllFormats(this.state.parts);

    listEl.innerHTML = allFormats.map(fmt => {
      const isActive = fmt.id === this.state.activeFormat;
      return `
        <div class="format-compare-card ${isActive ? 'is-active-format' : ''}">
          <div class="format-compare-header">
            <div class="format-title-cluster">
              <span class="format-name-badge">${fmt.shortLabel}</span>
              <strong class="format-full-name">${fmt.name}</strong>
              ${isActive ? '<span class="format-current-tag">Active Selection</span>' : ''}
            </div>
            <span class="format-length-counter">${fmt.rawLength} raw chars</span>
          </div>

          <p class="format-desc-text">${fmt.desc}</p>

          <div class="format-code-preview-box">
            <code>${this.escapeHtml(fmt.code || '[Empty]')}</code>
            <button 
              class="btn-copy-inspector-format" 
              data-code="${this.escapeHtml(fmt.code)}" 
              data-label="${fmt.shortLabel}"
              title="Copy this candidate format"
            >
              📋 Copy
            </button>
          </div>
        </div>
      `;
    }).join('');
  },

  // Local storage auto-save
  saveCurrentDraft() {
    try {
      localStorage.setItem('ff_bio_color_last_draft', JSON.stringify({
        parts: this.state.parts,
        format: this.state.activeFormat
      }));
    } catch (e) {}
  },

  // Copy to clipboard with toast
  copyToClipboard(text, label = "Code") {
    if (!text) return;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        this.showToast(`✓ ${label} copied to clipboard!`);
      }).catch(() => {
        this.fallbackCopy(text, label);
      });
    } else {
      this.fallbackCopy(text, label);
    }
  },

  fallbackCopy(text, label) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.top = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      this.showToast(`✓ ${label} copied to clipboard!`);
    } catch (err) {
      this.showToast(`Unable to copy to clipboard`);
    }
    document.body.removeChild(textArea);
  },

  // Toast notification system
  showToast(msg) {
    const toast = document.getElementById('color-toast');
    const toastMsg = document.getElementById('toast-message');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = msg;
    toast.classList.add('show');

    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2400);
  },

  escapeHtml(str) {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
};

// Auto initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  ColorStudioApp.init();
});
