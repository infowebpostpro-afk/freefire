/**
 * FreeFireNicknamePro.com — Unified Header & Navigation Controller
 * Handles accessible dropdowns, mobile hamburger drawer, and accordion logic.
 */
document.addEventListener('DOMContentLoaded', function() {
  const dropdownBtn = document.getElementById('btn-nicknames-dropdown');
  const dropdownItem = dropdownBtn ? dropdownBtn.closest('.nav-item-dropdown') : null;
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const navLinks = document.getElementById('main-nav-links');

  // 1. Nicknames Dropdown / Accordion Toggle
  if (dropdownBtn && dropdownItem) {
    dropdownBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const isExpanded = dropdownBtn.getAttribute('aria-expanded') === 'true';
      const newState = !isExpanded;

      dropdownBtn.setAttribute('aria-expanded', String(newState));
      if (newState) {
        dropdownItem.classList.add('is-open');
      } else {
        dropdownItem.classList.remove('is-open');
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && dropdownItem.classList.contains('is-open')) {
        dropdownBtn.setAttribute('aria-expanded', 'false');
        dropdownItem.classList.remove('is-open');
        dropdownBtn.focus();
      }
    });

    // Close on click outside (Desktop)
    document.addEventListener('click', function(e) {
      if (!dropdownItem.contains(e.target) && dropdownItem.classList.contains('is-open')) {
        dropdownBtn.setAttribute('aria-expanded', 'false');
        dropdownItem.classList.remove('is-open');
      }
    });
  }

  // 2. Mobile Menu Hamburger Toggle
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', function() {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      const newState = !isExpanded;

      mobileToggle.setAttribute('aria-expanded', String(newState));
      if (newState) {
        navLinks.classList.add('is-open');
        mobileToggle.classList.add('active');
        document.body.classList.add('mobile-nav-active');
      } else {
        navLinks.classList.remove('is-open');
        mobileToggle.classList.remove('active');
        document.body.classList.remove('mobile-nav-active');
      }
    });
  }
});
