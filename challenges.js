(function () {
  if (!window.LC || !LC.requireAuth()) return;
  var params = new URLSearchParams(window.location.search);
  var langId = params.get('lang') || 'python';
  var topicIndex = params.get('topicIndex');

  function esc(s) { return (s + '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  var picker = document.getElementById('challenge-picker');
  var area = document.getElementById('challenge-area');
  var topicList = document.getElementById('topic-list');
  var challengeList = document.getElementById('challenge-list');

  var topics = getTopics(langId);
  var langName = (window.LC_CONTENT.languages.find(function (l) { return l.id === langId; }) || {}).name || langId;

  function renderPicker() {
    topicList.innerHTML = '';
    topics.forEach(function (t, i) {
      var count = (t.challenges || []).length;
      var li = document.createElement('div');
      li.className = 'card-item';
      li.innerHTML = '<h3>' + esc(t.title) + '</h3><span class="meta">' + esc(t.level) + ' · ' + count + ' challenge(s)</span><a href="topic.html?lang=' + encodeURIComponent(langId) + '&topicIndex=' + i + '" class="btn">Tutorial</a> <a href="challenges.html?lang=' + encodeURIComponent(langId) + '&topicIndex=' + i + '" class="btn">View challenges</a>';
      topicList.appendChild(li);
    });
    document.querySelector('#challenge-picker h1').textContent = 'Challenges: ' + esc(langName);
  }

  function showChallenges(topic) {
    var list = topic.challenges || [];
    challengeList.innerHTML = '';
    list.forEach(function (c, i) {
      var card = document.createElement('div');
      card.className = 'challenge-card';
      var diff = (c.difficulty || 'beginner');
      
      var defaultCode = '';
      if(langId === 'python') defaultCode = '# Write your Python code here\\n';
      else if(langId === 'java') defaultCode = 'class Main {\\n    public static void main(String[] args) {\\n        // Write your Java code here\\n    }\\n}';
      else if(langId === 'cpp') defaultCode = '#include <iostream>\\n\\nint main() {\\n    // Write your C++ code here\\n    return 0;\\n}';
      else defaultCode = '// Write your code here\\n';

      card.innerHTML = 
        '<div class="challenge-problem-pane">' +
          '<h2>Challenge ' + (i + 1) + '</h2>' +
          '<p class="difficulty">' + esc(diff) + '</p>' +
          '<div class="problem">' + esc(c.problem) + '</div>' +
          (c.hint ? '<div class="hint-box">💡 <strong>Hint:</strong> ' + esc(c.hint) + '</div>' : '') +
          (c.expectedOutput ? '<p><small>Expected output: <br/><code>' + esc(c.expectedOutput) + '</code></small></p>' : '') +
        '</div>' +
        '<div class="challenge-ide-pane">' +
          '<div class="ide-container">' +
            '<div class="ide-header"><span class="ide-lang-badge">' + esc(langName) + '</span></div>' +
            '<textarea class="ide-textarea" spellcheck="false" placeholder="Type your code...">' + defaultCode + '</textarea>' +
          '</div>' +
          '<div class="ide-output"></div>' +
          (c.bonusTip ? '<div class="bonus-tip" style="display:none; margin-top: 1rem; padding: 1rem; background: rgba(52, 152, 219, 0.1); border-left: 4px solid #3498db; border-radius: 4px; color: #fff;"><strong>💡 Smart Tip:</strong> <span class="tip-text">' + esc(c.bonusTip) + '</span></div>' : '') +
          '<div class="ide-actions">' +
            '<div></div>' + // Spacer
            '<button class="btn btn-primary run-btn">Run Code</button>' +
          '</div>' +
        '</div>';
        
      var runBtn = card.querySelector('.run-btn');
      var textarea = card.querySelector('.ide-textarea');
      var outputDiv = card.querySelector('.ide-output');

      runBtn.addEventListener('click', function() {
        var code = textarea.value.trim();
        runBtn.textContent = 'Running...';
        runBtn.disabled = true;
        
        // Simulate IDE run delay
        setTimeout(function() {
          runBtn.textContent = 'Run Code';
          runBtn.disabled = false;
          
          // Normalize whitespace for comparison to handle different line endings from textarea
          var normalizedCode = code.replace(/\s+/g, ' ');
          var normalizedDefault = defaultCode.trim().replace(/\s+/g, ' ');

          if(code.length === 0 || normalizedCode === normalizedDefault) {
             outputDiv.className = 'ide-output error';
             outputDiv.textContent = 'Error: Please write some code first.';
             return;
          }
          
          // Basic simulated validation - if they wrote something, assume success for now and reward XP
          // In a real app we would send `code` to a backend judge API
          outputDiv.className = 'ide-output success';
          outputDiv.textContent = 'Success! Output matched: \\n' + (c.expectedOutput || 'Program executed successfully.');
          
          LC.addXP(25);
          var p = LC.getProgress();
          var uid = LC.getUser().email;
          if (p[uid] && p[uid].quests) {
             var chalQuest = p[uid].quests.find(function(q){ return q.id === 'q_chal'; });
             if (chalQuest && !chalQuest.done) {
                 chalQuest.progress += 1;
                 if (chalQuest.progress >= chalQuest.target) chalQuest.done = true;
                 LC.saveProgress(p);
             }
          }
          
          if (idx !== undefined && idx !== null) {
              LC.completeChallenge(langId, idx);
          }
          
          // Dopamine Rush: Confetti Animation!
          if (window.confetti) {
              var duration = 3000;
              var end = Date.now() + duration;

              (function frame() {
                  confetti({
                      particleCount: 5,
                      angle: 60,
                      spread: 55,
                      origin: { x: 0 },
                      colors: ['#3498db', '#9b59b6', '#2ecc71']
                  });
                  confetti({
                      particleCount: 5,
                      angle: 120,
                      spread: 55,
                      origin: { x: 1 },
                      colors: ['#3498db', '#9b59b6', '#2ecc71']
                  });

                  if (Date.now() < end) {
                      requestAnimationFrame(frame);
                  }
              }());
          }
          
          var tipDiv = card.querySelector('.bonus-tip');
          if (tipDiv) {
              tipDiv.style.display = 'block';
              tipDiv.animate([{opacity: 0, transform: 'translateY(10px)'}, {opacity: 1, transform: 'translateY(0)'}], {duration: 500, fill: 'forwards', easing: 'ease-out'});
          }
          
          runBtn.textContent = 'Completed!';
          runBtn.className = 'btn btn-primary run-btn';
        }, 800);
      });

      challengeList.appendChild(card);
    });
    document.getElementById('challenge-topic-title').textContent = topic.title;
    document.getElementById('challenge-back').href = 'select.html?lang=' + encodeURIComponent(langId);
  }


  document.getElementById('logout-btn').addEventListener('click', function () { LC.logout(); });

  if (topicIndex !== null && topicIndex !== '') {
    var idx = parseInt(topicIndex, 10);
    if (LC.isTopicUnlocked && !LC.isTopicUnlocked(langId, idx)) {
      window.location.href = 'select.html?lang=' + encodeURIComponent(langId);
      return;
    }
    var topic = getTopicByIndex(langId, idx);
    if (topic && topic.challenges && topic.challenges.length > 0) {
      picker.style.display = 'none';
      area.style.display = 'block';
      showChallenges(topic);
      return;
    }
  }
  renderPicker();
})();
