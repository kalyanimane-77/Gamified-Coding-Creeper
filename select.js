(function () {
  if (!window.LC || !LC.requireAuth()) return;
  var params = new URLSearchParams(window.location.search);
  var langId = params.get('lang') || 'python';
  var unlockedIndex = params.get('unlocked');

  function esc(s) { return (s + '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  var lang = (window.LC_CONTENT.languages || []).find(function (l) { return l.id === langId; });
  var langName = lang ? lang.name : langId;
  document.getElementById('select-lang-name').textContent = langName;

  var levelTabs = document.querySelectorAll('.level-tab');
  var topicListEl = document.getElementById('topic-list');
  var levelTitle = document.getElementById('level-title');
  var currentLevel = 'beginner';

  function renderTopics() {
    var items = getTopicsByLevel(langId, currentLevel);
    topicListEl.innerHTML = '';
    levelTitle.textContent = currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1) + ' topics';

    items.forEach(function (item) {
      var topic = item.topic;
      var index = item.index;
      var unlocked = LC.isTopicUnlocked(langId, index);
      var card = document.createElement('div');
      card.className = 'topic-row' + (unlocked ? '' : ' topic-row-locked');
      if (String(index) === unlockedIndex) card.classList.add('topic-row-just-unlocked');

      var lockHtml = unlocked
        ? '<span class="topic-status topic-unlocked" aria-label="Unlocked">✓</span>'
        : '<span class="topic-status topic-locked" aria-label="Locked">🔒</span>';

      var progress = LC.getUserProgress() || {};
      var tutDone = progress.completedTopics && progress.completedTopics[langId] && progress.completedTopics[langId].indexOf(index) !== -1;
      var quizDone = progress.completedQuizzes && progress.completedQuizzes[langId] && progress.completedQuizzes[langId].indexOf(index) !== -1;
      var chalDone = progress.completedChallenges && progress.completedChallenges[langId] && progress.completedChallenges[langId].indexOf(index) !== -1;

      var tutStatus = tutDone ? '✅' : '❌';
      var quizStatus = quizDone ? '✅' : (topic.quiz && topic.quiz.length ? '❌' : '➖');
      var chalStatus = chalDone ? '✅' : (topic.challenges && topic.challenges.length ? '❌' : '➖');

      var lockMsg = unlocked ? '' : '<p class="topic-lock-msg" style="font-size: 0.85rem; color: var(--neon-pink); margin-top: 0.5rem;">🔒 Complete ALL parts (Tutorial, Quiz, Challenges) of the previous level to unlock.</p>';

      var actionsHtml = unlocked
        ? '<div class="topic-actions">' +
            '<a href="topic.html?lang=' + encodeURIComponent(langId) + '&topicIndex=' + index + '" class="btn btn-dash">Tutorial ' + tutStatus + '</a>' +
            '<a href="quiz.html?lang=' + encodeURIComponent(langId) + '&topicIndex=' + index + '" class="btn btn-dash">Quiz ' + quizStatus + '</a>' +
            '<a href="challenges.html?lang=' + encodeURIComponent(langId) + '&topicIndex=' + index + '" class="btn btn-dash btn-dash-alt">Challenges ' + chalStatus + '</a>' +
            '<a href="flashcards.html?lang=' + encodeURIComponent(langId) + '&topicIndex=' + index + '" class="btn btn-dash btn-dash-alt">Flashcards</a>' +
          '</div>'
        : '<div class="topic-actions topic-actions-locked">' + lockMsg + '</div>';

      card.innerHTML =
        '<div class="topic-row-header">' +
          lockHtml +
          '<div class="topic-row-body">' +
            '<h3 class="topic-row-title">' + esc(topic.title) + '</h3>' +
            '<span class="topic-row-meta">' + (topic.quiz ? topic.quiz.length : 0) + ' questions · ' + (topic.flashcards ? topic.flashcards.length : 0) + ' cards · ' + (topic.challenges ? topic.challenges.length : 0) + ' challenges</span>' +
          '</div>' +
        '</div>' +
        actionsHtml;
      topicListEl.appendChild(card);
    });

    if (items.length === 0) {
      topicListEl.innerHTML = '<p class="no-topics">No topics for this level yet.</p>';
    }
  }

  levelTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      currentLevel = tab.getAttribute('data-level');
      levelTabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
      renderTopics();
    });
  });

  var overlay = document.getElementById('unlock-overlay');
  var unlockTopicName = document.getElementById('unlock-topic-name');
  var unlockedIdx = unlockedIndex !== null && unlockedIndex !== '' ? parseInt(unlockedIndex, 10) : NaN;
  var nextTopic = !isNaN(unlockedIdx) ? getTopicByIndex(langId, unlockedIdx) : null;
  if (nextTopic && overlay && unlockTopicName) {
    unlockTopicName.textContent = nextTopic.title;
    overlay.setAttribute('aria-hidden', 'false');
    overlay.classList.add('unlock-overlay-visible');
  }
  document.getElementById('unlock-dismiss').addEventListener('click', function () {
    if (overlay) {
      overlay.classList.remove('unlock-overlay-visible');
      overlay.setAttribute('aria-hidden', 'true');
    }
    if (unlockedIndex !== null && unlockedIndex !== '') {
      var cleanUrl = 'select.html?lang=' + encodeURIComponent(langId);
      window.history.replaceState({}, '', cleanUrl);
    }
  });

  document.getElementById('logout-btn').addEventListener('click', function () { LC.logout(); });

  renderTopics();
})();
