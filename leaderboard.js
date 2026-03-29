(function () {
  if (!window.LC || !LC.requireAuth()) return;

  async function loadLeaderboard() {
    var users = {};
    var currentUser = LC.getUser();
    var combined = [];

    // Try to get users from Firebase for global leaderboard
    if (window.LC.firebase && window.LC.firebase.getAllUsers) {
      users = await window.LC.firebase.getAllUsers();
    } else {
      // Fallback to local users
      users = LC.getUsers();
    }

    Object.keys(users).forEach(function(key) {
      var u = users[key];
      // In Firebase, 'u' contains email, displayName, xp, level
      // In LocalStorage, it might just be the user object
      var email = u.email || key;
      var xp = u.xp || 0;
      var level = u.level || 1;
      var name = u.displayName || email.split('@')[0];
      
      var isYou = (currentUser && currentUser.email === email);
      combined.push({
        name: name,
        xp: xp,
        level: level,
        isYou: isYou
      });
    });

    combined.sort(function (a, b) { return b.xp - a.xp; });

    var tbody = document.getElementById('leaderboard-body');
    if (!tbody) return;
    tbody.innerHTML = '';
    
    // Calculate max XP for progress bar
    var myEntry = combined.find(function(r) { return r.isYou; });
    var myXp = myEntry ? myEntry.xp : 0;
    var maxXp = Math.max.apply(null, combined.map(function (r) { return r.xp; })) || 1;
    const progressEl = document.getElementById('your-progress');
    if (progressEl) progressEl.style.width = (myXp / maxXp * 100) + '%';

    combined.forEach(function (row, i) {
      var tr = document.createElement('tr');
      var rank = i + 1;
      var rankClass = rank <= 3 ? 'rank rank-' + rank : 'rank';
      tr.innerHTML = '<td class="' + rankClass + '">' + rank + '</td><td>' + (row.isYou ? '<strong>' + escapeHtml(row.name) + ' (you)</strong>' : escapeHtml(row.name)) + '</td><td>' + row.xp + '</td><td>' + row.level + '</td>';
      tbody.appendChild(tr);
    });
  }

  function escapeHtml(s) { return (s + '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  // Initial load
  loadLeaderboard();

  // If Firebase takes time to load, we might need to retry or wait for a signal
  if (window.LC && !window.LC.onFirebaseReady) {
    window.LC.onFirebaseReady = function() {
      loadLeaderboard();
    };
  }

  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function () { LC.logout(); });
  }
})();
