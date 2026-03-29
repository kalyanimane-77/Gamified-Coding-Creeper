(function () {
  if (!window.LC || !LC.requireAuth()) return;
  var params = new URLSearchParams(window.location.search);
  var langId = params.get('lang') || 'python';
  var topicIndex = params.get('topicIndex');

  function esc(s) { return (s + '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  var idx = topicIndex !== null && topicIndex !== '' ? parseInt(topicIndex, 10) : -1;
  if (idx >= 0 && LC.isTopicUnlocked && !LC.isTopicUnlocked(langId, idx)) {
    window.location.href = 'select.html?lang=' + encodeURIComponent(langId);
    return;
  }
  var topic = idx >= 0 ? getTopicByIndex(langId, idx) : null;
  var container = document.getElementById('topic-content');
  if (!topic || !topic.tutorial) {
    container.innerHTML = '<p>Topic not found.</p>';
    return;
  }

  var kidsMode = LC.isKidsMode();
  var explanation = kidsMode && topic.tutorial.kidsExplanation ? topic.tutorial.kidsExplanation : topic.tutorial.explanation;
  var example = topic.tutorial.example || '';

  // Kids Mode: Use Mascot for explanation
  if (kidsMode) {
      // Delay slightly to ensure mascot is loaded
      setTimeout(function() {
          LC.mascot.say(explanation);
      }, 500);
  }

  container.innerHTML = '<h1>' + esc(topic.title) + '</h1>' +
    '<div class="tutorial-content">' +
    (kidsMode ? 
        // Kids layout: Focus on concept, hide wall of text (mascot says it), show example clearly
        '<div class="kids-concept-card">' +
        '<h3>Learn this!</h3>' +
        '<p class="kids-text">' + esc(explanation) + '</p>' +
        (example ? '<div class="kids-example"><h4>Example:</h4><pre>' + esc(example) + '</pre></div>' : '') +
        '</div>'
    : 
        // Standard layout
        '<p>' + esc(explanation) + '</p>' +
        (example ? '<pre class="example-block">' + esc(example) + '</pre>' : '')
    ) +
    '</div>';

  document.getElementById('link-quiz').href = 'quiz.html?lang=' + encodeURIComponent(langId) + '&topicIndex=' + topicIndex;
  document.getElementById('link-flashcards').href = 'flashcards.html?lang=' + encodeURIComponent(langId) + '&topicIndex=' + topicIndex;
  document.getElementById('link-challenges').href = 'challenges.html?lang=' + encodeURIComponent(langId) + '&topicIndex=' + topicIndex;

  if (idx >= 0) {
      LC.completeTutorial(langId, idx);
  }

  document.getElementById('logout-btn').addEventListener('click', function () { LC.logout(); });
})();
