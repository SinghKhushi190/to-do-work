 let activeFilter = 'all';
  const total = 14;

  function toggleLearned(btn) {
    const card = btn.closest('.card');
    card.classList.toggle('learned');
    btn.textContent = card.classList.contains('learned') ? '✓ Learned!' : '✓ Mark Learned';
    updateProgress();
  }

  function updateProgress() {
    const learned = document.querySelectorAll('.card.learned:not(.hidden)').length;
    const all = document.querySelectorAll('.card:not(.hidden)').length;
    const pct = all > 0 ? (document.querySelectorAll('.card.learned').length / total * 100) : 0;
    document.getElementById('progressFill').style.width = pct + '%';
    document.getElementById('progressLabel').textContent =
      document.querySelectorAll('.card.learned').length + ' / ' + total + ' learned';
  }

  function setFilter(cat, btn) {
    activeFilter = cat;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterCards();
  }

  function filterCards() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    document.querySelectorAll('.card').forEach(card => {
      const topic = card.dataset.topic || '';
      const cat = card.dataset.cat || '';
      const text = card.innerText.toLowerCase();
      const catMatch = activeFilter === 'all' || cat === activeFilter;
      const searchMatch = !query || text.includes(query) || topic.includes(query);
      card.classList.toggle('hidden', !(catMatch && searchMatch));
    });

    // Show no results message
    const visible = document.querySelectorAll('.card:not(.hidden)').length;
    let noRes = document.querySelector('.no-results');
    if (visible === 0) {
      if (!noRes) {
        noRes = document.createElement('div');
        noRes.className = 'no-results';
        noRes.textContent = 'No topics match your search.';
        document.getElementById('cardGrid').appendChild(noRes);
      }
    } else if (noRes) {
      noRes.remove();
    }
  }