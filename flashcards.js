(function () {
  if (!window.LC || !LC.requireAuth()) return;
  var params = new URLSearchParams(window.location.search);
  var langId = params.get('lang') || 'python';
  var topicIndex = params.get('topicIndex');

  function esc(s) { return (s + '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  var picker = document.getElementById('flash-picker');
  var area = document.getElementById('flash-area');
  var topicList = document.getElementById('topic-list');
  var cards = [];
  var currentIndex = 0;

  var topics = getTopics(langId);
  var langName = (window.LC_CONTENT.languages.find(function (l) { return l.id === langId; }) || {}).name || langId;

  function renderPicker() {
    topicList.innerHTML = '';
    topics.forEach(function (t, i) {
      var count = (t.flashcards || []).length;
      var li = document.createElement('div');
      li.className = 'card-item';
      li.innerHTML = '<h3>' + esc(t.title) + '</h3><span class="meta">' + esc(t.level) + ' · ' + count + ' cards</span><a href="topic.html?lang=' + encodeURIComponent(langId) + '&topicIndex=' + i + '" class="btn">Tutorial</a> <a href="flashcards.html?lang=' + encodeURIComponent(langId) + '&topicIndex=' + i + '" class="btn">Study</a>';
      topicList.appendChild(li);
    });
    document.querySelector('#flash-picker h1').textContent = 'Flashcards: ' + esc(langName);
  }

  function showCard() {
    if (cards.length === 0) return;
    var c = cards[currentIndex];
    var cardEl = document.getElementById('flashcard');
    cardEl.classList.remove('flipped');
    document.getElementById('card-term').textContent = c.term;
    document.getElementById('card-def').textContent = c.definition;
    document.getElementById('card-example').textContent = c.example || '';
    document.querySelector('.flashcard .back').style.display = 'none';
    document.querySelector('.flashcard .front').style.display = 'block';
    document.getElementById('card-num').textContent = currentIndex + 1;
    document.getElementById('card-total').textContent = cards.length;
  }

  document.getElementById('flashcard').addEventListener('click', function () {
    var card = document.getElementById('flashcard');
    var front = card.querySelector('.front');
    var back = card.querySelector('.back');
    if (card.classList.contains('flipped')) {
      card.classList.remove('flipped');
      front.style.display = 'block';
      back.style.display = 'none';
    } else {
      card.classList.add('flipped');
      front.style.display = 'none';
      back.style.display = 'block';
    }
  });

  document.getElementById('flash-prev').addEventListener('click', function () {
    if (currentIndex > 0) {
      currentIndex--;
      showCard();
    }
  });
  document.getElementById('flash-next').addEventListener('click', function () {
    if (currentIndex < cards.length - 1) {
      currentIndex++;
      showCard();
    }
  });

  document.getElementById('logout-btn').addEventListener('click', function () { LC.logout(); });

  if (topicIndex !== null && topicIndex !== '') {
    var idx = parseInt(topicIndex, 10);
    if (LC.isTopicUnlocked && !LC.isTopicUnlocked(langId, idx)) {
      window.location.href = 'select.html?lang=' + encodeURIComponent(langId);
      return;
    }
    var topic = getTopicByIndex(langId, idx);
    if (topic && topic.flashcards && topic.flashcards.length > 0) {
      cards = topic.flashcards.slice();
      currentIndex = 0;
      picker.style.display = 'none';
      area.style.display = 'block';
      showCard();
      return;
    }
  }
  renderPicker();
})();
