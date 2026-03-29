(function () {
  if (!window.LC || !LC.requireAuth()) return;
  var params = new URLSearchParams(window.location.search);
  var langId = params.get('lang') || 'python';
  var topicId = params.get('topic');
  var topicIndex = params.get('topicIndex');

  function esc(s) { return (s + '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  var picker = document.getElementById('quiz-picker');
  var area = document.getElementById('quiz-area');
  var result = document.getElementById('quiz-result');
  var topicList = document.getElementById('topic-list');

  var topics = getTopics(langId);
  var langName = (window.LC_CONTENT.languages.find(function (l) { return l.id === langId; }) || {}).name || langId;

  function renderPicker() {
    topicList.innerHTML = '';
    topics.forEach(function (t, i) {
      var li = document.createElement('div');
      li.className = 'card-item';
      li.innerHTML = '<h3>' + esc(t.title) + '</h3><span class="meta">' + esc(t.level) + ' · ' + (t.quiz ? t.quiz.length : 0) + ' questions</span><a href="topic.html?lang=' + encodeURIComponent(langId) + '&topicIndex=' + i + '" class="btn">Tutorial</a> <a href="quiz.html?lang=' + encodeURIComponent(langId) + '&topicIndex=' + i + '" class="btn">Start quiz</a>';
      topicList.appendChild(li);
    });
    if (topics.length === 0) {
      topicList.innerHTML = '<p>No topics for this language yet.</p>';
    }
    document.querySelector('h1').textContent = 'Quiz: ' + esc(langName);
  }

  var currentTopic = null;
  var currentQ = 0;
  var correctCount = 0;
  var answered = false;

  function showQuestion() {
    var qs = currentTopic.quiz;
    if (!qs || currentQ >= qs.length) {
      finishQuiz();
      return;
    }
    answered = false;
    var q = qs[currentQ];
    document.getElementById('q-num').textContent = currentQ + 1;
    document.getElementById('q-total').textContent = qs.length;
    document.getElementById('quiz-progress').style.width = ((currentQ / qs.length) * 100) + '%';
    document.getElementById('q-text').textContent = q.question;

    // Kids Mode: Show example if available
    var exampleArea = document.getElementById('q-example');
    if (!exampleArea) {
      exampleArea = document.createElement('div');
      exampleArea.id = 'q-example';
      exampleArea.className = 'quiz-example';
      document.getElementById('q-text').parentNode.insertBefore(exampleArea, document.getElementById('q-options'));
    }
    if (LC.isKidsMode() && q.example) {
      exampleArea.textContent = 'Example: ' + q.example;
      exampleArea.style.display = 'block';
    } else {
      exampleArea.style.display = 'none';
    }

    // Kids Mode: Clear hint
    var hintArea = document.getElementById('q-hint');
    if (!hintArea) {
      hintArea = document.createElement('div');
      hintArea.id = 'q-hint';
      hintArea.className = 'quiz-hint';
      document.getElementById('q-text').parentNode.insertBefore(hintArea, document.getElementById('q-options').nextSibling);
    }
    hintArea.style.display = 'none';
    hintArea.textContent = '';

    var opts = document.getElementById('q-options');
    opts.innerHTML = '';
    (q.options || []).forEach(function (opt, i) {
      var li = document.createElement('li');
      var label = document.createElement('label');
      var radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz-opt';
      radio.value = i;
      radio.addEventListener('change', function () { choose(i); });
      label.appendChild(radio);
      label.appendChild(document.createTextNode(' ' + opt));
      li.appendChild(label);
      opts.appendChild(li);
    });
    document.getElementById('quiz-next').style.display = 'none';
  }

  function choose(optionIndex) {
    var q = currentTopic.quiz[currentQ];
    var correct = q.correct === optionIndex;

    // Kids Mode: Feedback via Mascot
    if (LC.isKidsMode()) {
      if (!correct && !answered) {
        // WRONG: Kaliya (Angry)
        LC.mascot.say('Oops! Not quite. Try again! ' + (q.hint ? '\nHint: ' + q.hint : ''), 5000, 'angry');
        var labels = document.querySelectorAll('#q-options label');
        labels[optionIndex].classList.add('wrong');
        return;
      } else if (correct) {
        // CORRECT: Celebrate (Bheem/Cute)
        LC.mascot.celebrate();
      }
    } else {
        // Standard hint logic for non-kids mode (if any)
    }

    // Kids Mode: If wrong, show hint and allow retry (Legacy logic kept for structure but overridden above visually)
    if (LC.isKidsMode() && !correct && !answered) {
      var hintArea = document.getElementById('q-hint');
      if (hintArea && q.hint) {
        hintArea.textContent = 'Hint: ' + q.hint;
        hintArea.style.display = 'block';
      }
      var labels = document.querySelectorAll('#q-options label');
      labels[optionIndex].classList.add('wrong');
      return;
    }

    if (answered) return;
    answered = true;
    
    if (correct) correctCount++;
    var labels = document.querySelectorAll('#q-options label');
    labels.forEach(function (l, i) {
      l.classList.remove('correct', 'wrong');
      if (i === q.correct) l.classList.add('correct');
      else if (i === optionIndex && !correct) l.classList.add('wrong');
    });
    document.getElementById('quiz-next').style.display = 'inline-block';
  }

  var currentTopicIndex = null;

  function finishQuiz() {
    area.style.display = 'none';
    result.style.display = 'block';
    var total = currentTopic.quiz.length;
    document.getElementById('result-score').textContent = correctCount;
    document.getElementById('result-total').textContent = total;
    var xp = Math.max(10, Math.round((correctCount / total) * 30));
    LC.addXP(xp);
    document.getElementById('result-xp').textContent = xp;

    var nextIndex = (LC.getNextTopicIndex && currentTopicIndex !== null) ? LC.getNextTopicIndex(langId, currentTopicIndex) : null;
    var wasNextUnlocked = nextIndex !== null && LC.isTopicUnlocked(langId, nextIndex);
    if (currentTopicIndex !== null) LC.completeQuiz(langId, currentTopicIndex);
    var isNextUnlockedNow = nextIndex !== null && LC.isTopicUnlocked(langId, nextIndex);
    var justUnlocked = nextIndex !== null && !wasNextUnlocked && isNextUnlockedNow;

    if (justUnlocked) {
      document.getElementById('quiz-another').href = 'select.html?lang=' + encodeURIComponent(langId) + '&unlocked=' + nextIndex;
      document.getElementById('quiz-another').textContent = 'See next topic →';
    } else {
      document.getElementById('quiz-another').href = 'select.html?lang=' + encodeURIComponent(langId);
      document.getElementById('quiz-another').textContent = 'More topics';
    }
  }

  document.getElementById('quiz-next').addEventListener('click', function () {
    currentQ++;
    showQuestion();
  });

  document.getElementById('logout-btn').addEventListener('click', function () { LC.logout(); });

  if (topicIndex !== null && topicIndex !== '') {
    var idx = parseInt(topicIndex, 10);
    if (LC.isTopicUnlocked && !LC.isTopicUnlocked(langId, idx)) {
      window.location.href = 'select.html?lang=' + encodeURIComponent(langId);
      return;
    }
    currentTopicIndex = idx;
    currentTopic = getTopicByIndex(langId, idx);
    if (currentTopic && currentTopic.quiz && currentTopic.quiz.length > 0) {
      picker.style.display = 'none';
      area.style.display = 'block';
      currentQ = 0;
      correctCount = 0;
      showQuestion();
      return;
    }
  }
  if (topicId) {
    currentTopic = getTopic(langId, topicId);
    var list = getTopics(langId);
    for (var j = 0; j < list.length; j++) { if (list[j].id === topicId) { currentTopicIndex = j; break; } }
    if (currentTopic && currentTopic.quiz && currentTopic.quiz.length > 0) {
      picker.style.display = 'none';
      area.style.display = 'block';
      currentQ = 0;
      correctCount = 0;
      showQuestion();
      return;
    }
  }
  currentTopicIndex = null;
  renderPicker();
})();
