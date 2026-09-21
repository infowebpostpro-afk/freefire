document.addEventListener('DOMContentLoaded', function() {
  const state = {
    category: 'all',
    search: '',
    favorites: JSON.parse(localStorage.getItem('ff_cool_favs') || '[]')
  };

  const grid = document.getElementById('cool-nickname-grid');
  const searchInput = document.getElementById('cool-search-input');
  const filterChips = document.querySelectorAll('.cool-filter-chip');
  const toast = document.getElementById('cool-toast');

  function render() {
    let filtered = COOL_NICKNAMES_DATA.filter(item => {
      const matchCat = state.category === 'all' || item.category === state.category;
      const matchSearch = !state.search || 
        item.name.toLowerCase().includes(state.search.toLowerCase()) || 
        item.plain.toLowerCase().includes(state.search.toLowerCase()) ||
        item.category.toLowerCase().includes(state.search.toLowerCase());
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">No cool nicknames found matching your filter. Try another keyword!</div>';
      return;
    }

    grid.innerHTML = filtered.map(item => {
      const isFav = state.favorites.includes(item.id);
      return `
        <div class="cool-card">
          <div class="cool-card-top">
            <span class="cool-tag">${item.category}</span>
            <span style="font-size: 0.72rem; color: var(--text-muted);">${item.plain.length} Chars</span>
          </div>
          <div class="cool-name-display">${item.name}</div>
          <div class="cool-card-actions">
            <button class="btn-cool-copy" data-name="${item.name.replace(/"/g, '&quot;')}">
              <span>📋</span> Copy
            </button>
            <button class="btn-cool-fav ${isFav ? 'active' : ''}" data-id="${item.id}" aria-label="Favorite">
              <span>${isFav ? '♥' : '♡'}</span>
            </button>
          </div>
        </div>
      `;
    }).join('');

    // Attach button listeners
    grid.querySelectorAll('.btn-cool-copy').forEach(btn => {
      btn.addEventListener('click', function() {
        const text = this.getAttribute('data-name');
        navigator.clipboard.writeText(text).then(() => {
          this.classList.add('copied');
          this.innerHTML = '<span>✓</span> Copied!';
          showToast(`Copied "${text}" to clipboard!`);
          setTimeout(() => {
            this.classList.remove('copied');
            this.innerHTML = '<span>📋</span> Copy';
          }, 1800);
        });
      });
    });

    grid.querySelectorAll('.btn-cool-fav').forEach(btn => {
      btn.addEventListener('click', function() {
        const id = this.getAttribute('data-id');
        const idx = state.favorites.indexOf(id);
        if (idx > -1) {
          state.favorites.splice(idx, 1);
        } else {
          state.favorites.push(id);
        }
        localStorage.setItem('ff_cool_favs', JSON.stringify(state.favorites));
        render();
      });
    });
  }

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2200);
  }

  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      state.search = e.target.value.trim();
      render();
    });
  }

  filterChips.forEach(chip => {
    chip.addEventListener('click', function() {
      filterChips.forEach(c => c.classList.remove('active'));
      this.classList.add('active');
      state.category = this.getAttribute('data-category');
      render();
    });
  });

  render();
});
