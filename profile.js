(function () {
  if (!window.LC || !LC.requireAuth()) return;

  var BADGES = [
    { id: 'first-login', name: 'First Steps', minXp: 0 },
    { id: 'hundred', name: '100 XP', minXp: 100 },
    { id: 'five-hundred', name: '500 XP', minXp: 500 },
    { id: 'thousand', name: '1K XP', minXp: 1000 },
    { id: 'quiz-master', name: 'Quiz Master', minXp: 500 },
    { id: 'challenger', name: 'Challenger', minXp: 300 },
    { id: 'level-5', name: 'Level 5', minLevel: 5 },
    { id: 'level-10', name: 'Level 10', minLevel: 10 }
  ];

  var user = LC.getUser();
  var progress = LC.getUserProgress();
  var xp = (progress && progress.xp) || 0;
  var level = (progress && progress.level) || 1;
  var badges = (progress && progress.badges) || [];

  function unlockBadge(id) {
    if (badges.indexOf(id) === -1) {
      badges.push(id);
      if (progress) progress.badges = badges;
      LC.saveProgress(LC.getProgress());
    }
  }

  BADGES.forEach(function (b) {
    if (b.minXp !== undefined && xp >= b.minXp) unlockBadge(b.id);
    if (b.minLevel !== undefined && level >= b.minLevel) unlockBadge(b.id);
  });

  var initial = (user.displayName || user.email || 'U').charAt(0).toUpperCase();
  document.getElementById('avatar').textContent = initial;
  document.getElementById('profile-name').textContent = user.displayName || user.email || 'User';
  document.getElementById('profile-email').textContent = user.email || '';
  document.getElementById('profile-xp').textContent = xp;
  document.getElementById('profile-level').textContent = level;

  var levels = [0, 100, 250, 500, 1000, 2000, 3500, 5500, 8000, 12000];
  var lvl = Math.min(level, levels.length);
  var current = levels[lvl - 1];
  var next = levels[lvl] || levels[levels.length - 1] + 5000;
  var pct = level >= levels.length ? 100 : Math.round(((xp - current) / (next - current)) * 100);
  document.getElementById('profile-progress').style.width = pct + '%';

  var grid = document.getElementById('badges-grid');
  BADGES.forEach(function (b) {
    var el = document.createElement('div');
    var has = badges.indexOf(b.id) !== -1;
    el.className = 'badge-item ' + (has ? 'unlocked' : 'locked');
    
    // Choose icon based on ID for a richer look
    var icon = '🏆';
    if(b.id.includes('login')) icon = '👋';
    if(b.id.includes('hundred') || b.id.includes('thousand')) icon = '💎';
    if(b.id.includes('quiz')) icon = '🧠';
    if(b.id.includes('level')) icon = '⭐';
    if(b.id.includes('challenger')) icon = '⚔️';
    
    el.innerHTML = `
      <div class="badge-icon">${has ? icon : '🔒'}</div>
      <div class="badge-name">${b.name}</div>
      <div class="badge-desc">${has ? 'Unlocked!' : 'Keep learning'}</div>
    `;
    grid.appendChild(el);
  });

  document.getElementById('logout-btn').addEventListener('click', function () { LC.logout(); });

  window.addEventListener('LC_FirebaseSynced', function() {
    window.location.reload(); // Simplest way to refresh all profile data
  });
})();
