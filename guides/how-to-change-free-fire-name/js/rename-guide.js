/**
 * Free Fire Name Change Guide — Application Controller
 * Handles interactive Rename Preparation Checklist, localStorage persistence,
 * progress bar animations, FAQ accordion, and ambient background embers.
 */

document.addEventListener('DOMContentLoaded', () => {
  initChecklist();
  initFAQAccordion();
  initAmbientEmbers();
});

/* ===================================================================
   INTERACTIVE RENAME PREPARATION CHECKLIST
   =================================================================== */
function initChecklist() {
  const STORAGE_KEY = 'ff_rename_checklist';
  const checklistItems = document.querySelectorAll('.checklist-item');
  const progressBadge = document.getElementById('checklist-progress-badge');
  const progressBar = document.getElementById('checklist-progress-bar');
  const completionNote = document.getElementById('checklist-completion-note');
  const resetBtn = document.getElementById('btn-checklist-reset');

  if (!checklistItems.length) return;

  // 1. Load persisted state from localStorage
  let savedState = {};
  try {
    savedState = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch (e) {
    savedState = {};
  }

  // Apply saved state to UI
  checklistItems.forEach((item, index) => {
    const isChecked = Boolean(savedState[index]);
    if (isChecked) {
      item.classList.add('checked');
      const box = item.querySelector('.checklist-checkbox-box');
      if (box) box.textContent = '✓';
    }
  });

  updateProgress();

  // 2. Toggle item on click
  checklistItems.forEach((item, index) => {
    item.addEventListener('click', (e) => {
      // Avoid toggling if clicking directly on a tool link
      if (e.target.closest('.checklist-item-tool-link')) return;

      const currentlyChecked = item.classList.contains('checked');
      if (currentlyChecked) {
        item.classList.remove('checked');
        const box = item.querySelector('.checklist-checkbox-box');
        if (box) box.textContent = '';
        savedState[index] = false;
      } else {
        item.classList.add('checked');
        const box = item.querySelector('.checklist-checkbox-box');
        if (box) box.textContent = '✓';
        savedState[index] = true;
      }

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(savedState));
      } catch (err) {}

      updateProgress();
    });
  });

  // 3. Reset button
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      checklistItems.forEach(item => {
        item.classList.remove('checked');
        const box = item.querySelector('.checklist-checkbox-box');
        if (box) box.textContent = '';
      });
      savedState = {};
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (err) {}
      updateProgress();
    });
  }

  function updateProgress() {
    const checkedCount = document.querySelectorAll('.checklist-item.checked').length;
    const totalCount = checklistItems.length;
    const pct = Math.round((checkedCount / totalCount) * 100);

    if (progressBadge) {
      progressBadge.textContent = `${checkedCount} of ${totalCount}`;
      if (checkedCount === totalCount) {
        progressBadge.classList.add('completed');
      } else {
        progressBadge.classList.remove('completed');
      }
    }

    if (progressBar) {
      progressBar.style.width = `${pct}%`;
      if (checkedCount === totalCount) {
        progressBar.classList.add('completed');
      } else {
        progressBar.classList.remove('completed');
      }
    }

    if (completionNote) {
      if (checkedCount === totalCount) {
        completionNote.textContent = '✓ All set! You are fully prepared to confirm your rename in Free Fire.';
        completionNote.classList.add('ready');
      } else if (checkedCount === 0) {
        completionNote.textContent = 'Check off each task as you get ready to rename.';
        completionNote.classList.remove('ready');
      } else {
        completionNote.textContent = `${totalCount - checkedCount} item${totalCount - checkedCount > 1 ? 's' : ''} left before confirming in-game.`;
        completionNote.classList.remove('ready');
      }
    }
  }
}

/* ===================================================================
   FAQ ACCORDION
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
   AMBIENT EMBERS CANVAS BACKGROUND
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
