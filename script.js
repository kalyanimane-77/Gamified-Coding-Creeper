/* ============================================
   Gamified Coding Creeper — Auth & App logic
   ============================================ */

var LC = window.LC || {};

LC.AUTH_KEY = 'language_creeper_user';
LC.USERS_KEY = 'language_creeper_users';
LC.PROGRESS_KEY = 'language_creeper_progress';
LC.KIDS_MODE_KEY = 'language_creeper_kids_mode';

LC.getUser = function () {
  try {
    var raw = localStorage.getItem(LC.AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
};

LC.setUser = function (user) {
  if (user) {
    localStorage.setItem(LC.AUTH_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(LC.AUTH_KEY);
  }
};

LC.getUsers = function () {
  try {
    var raw = localStorage.getItem(LC.USERS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
};

LC.saveUsers = function (users) {
  localStorage.setItem(LC.USERS_KEY, JSON.stringify(users));
};

LC.logout = function () {
  LC.setUser(null);
  window.location.href = 'index.html';
};

LC.requireAuth = function () {
  if (!LC.getUser()) {
    window.location.href = 'index.html';
    return false;
  }
  return true;
};

LC.getProgress = function () {
  try {
    var raw = localStorage.getItem(LC.PROGRESS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
};

LC.saveProgress = function (progress) {
  localStorage.setItem(LC.PROGRESS_KEY, JSON.stringify(progress));
  
  // Automatically sync current user's progress to Firebase
  var user = LC.getUser();
  if (user && progress[user.email] && LC.firebase && LC.firebase.saveProgress) {
    LC.firebase.saveProgress(user.email, progress[user.email]);
  }
};

LC.addXP = function (amount) {
  var user = LC.getUser();
  if (!user) return 0;
  
  // Call getUserProgress first to ensure today's streak/quests are initialized
  var progressData = LC.getUserProgress(); 
  
  var progress = LC.getProgress();
  var uid = user.email;
  
  progress[uid].xp = (progress[uid].xp || 0) + amount;
  
  // Update XP quest
  if (progress[uid].quests) {
    var xpQuest = progress[uid].quests.find(q => q.id === 'q_xp');
    if (xpQuest && !xpQuest.done) {
        xpQuest.progress += amount;
        if (xpQuest.progress >= xpQuest.target) xpQuest.done = true;
    }
  }

  var levels = [0, 100, 250, 500, 1000, 2000, 3500, 5500, 8000, 12000];
  for (var i = levels.length - 1; i >= 0; i--) {
    if (progress[uid].xp >= levels[i]) {
      progress[uid].level = i + 1;
      break;
    }
  }
  LC.saveProgress(progress);
  return progress[uid].xp;
};

LC.getUserProgress = function () {
  var user = LC.getUser();
  if (!user) return null;
  var progress = LC.getProgress();
  var uid = user.email;
  var base = { 
    xp: 0, 
    level: 1, 
    badges: [], 
    completedTopics: {}, 
    completedQuizzes: {}, 
    completedChallenges: {},
    streak: 0,
    lastLogin: null,
    quests: [
      { id: 'q_xp', desc: 'Earn 50 XP today', target: 50, progress: 0, done: false },
      { id: 'q_quiz', desc: 'Complete 1 Quiz', target: 1, progress: 0, done: false },
      { id: 'q_chal', desc: 'Beat 1 Challenge', target: 1, progress: 0, done: false }
    ]
  };
  var p = progress[uid] || base;
  if (!p.completedQuizzes) p.completedQuizzes = {};
  if (typeof p.streak === 'undefined') p.streak = base.streak;
  if (!p.quests) p.quests = base.quests;

  // Daily Streak Check
  var today = new Date().toDateString();
  if (p.lastLogin !== today) {
    if (p.lastLogin) {
      var yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      if (p.lastLogin === yesterday.toDateString()) {
        p.streak++;
      } else {
        p.streak = 1;
      }
    } else {
      p.streak = 1;
    }
    p.lastLogin = today;
    // Reset quests daily
    p.quests = base.quests.map(q => ({...q})); 
    progress[uid] = p;
    LC.saveProgress(progress);
  }

  return p;
};

LC.isTopicUnlocked = function (langId, topicIndex) {
  if (topicIndex === 0) return true;
  var p = LC.getUserProgress();
  if (!p) return false;
  
  var list = window.LC_CONTENT && window.LC_CONTENT.topics[langId];
  if (!list) return false;

  var currentTopic = list[topicIndex];
  var diff = currentTopic.level || 'beginner';

  // Level Gating check
  if (diff === 'intermediate') {
    // Check if ALL beginner topics are fully complete
    var allBeginnerDone = list.filter(t => (t.level || 'beginner') === 'beginner').every(t => LC.isTopicFullyCompleted(langId, list.indexOf(t)));
    if (!allBeginnerDone) return false;
  } else if (diff === 'advanced') {
    // Check if ALL intermediate topics are fully complete
    var allInterDone = list.filter(t => t.level === 'intermediate').every(t => LC.isTopicFullyCompleted(langId, list.indexOf(t)));
    if (!allInterDone) return false;
  }

  // Linear check: previous topic must be FULLY completed
  return LC.isTopicFullyCompleted(langId, topicIndex - 1);
};

LC.isTopicFullyCompleted = function(langId, topicIndex) {
  var p = LC.getUserProgress();
  if (!p) return false;

  var list = window.LC_CONTENT && window.LC_CONTENT.topics[langId];
  if (!list) return false;
  var topic = list[topicIndex];

  // 1. Check Tutorial
  var hasTutorial = p.completedTopics && p.completedTopics[langId] && p.completedTopics[langId].indexOf(topicIndex) !== -1;
  
  // 2. Check Quiz (if it exists)
  var requiresQuiz = topic.quiz && topic.quiz.length > 0;
  var hasQuiz = !requiresQuiz || (p.completedQuizzes && p.completedQuizzes[langId] && p.completedQuizzes[langId].indexOf(topicIndex) !== -1);
  
  // 3. Check Challenges (if they exist)
  var requiresChallenge = topic.challenges && topic.challenges.length > 0;
  var hasChallenge = !requiresChallenge || (p.completedChallenges && p.completedChallenges[langId] && p.completedChallenges[langId].indexOf(topicIndex) !== -1);

  // Fallback for transition: if they just completed the quiz in the old system, let's count it to not break saves entirely,
  // but moving forward we enforce all 3.
  var oldSystemCompleted = (p.completedQuizzes && p.completedQuizzes[langId] && p.completedQuizzes[langId].indexOf(topicIndex) !== -1);
  return (hasTutorial && hasQuiz && hasChallenge) || oldSystemCompleted;
};

LC.completeQuiz = function (langId, topicIndex) {
  var user = LC.getUser();
  if (!user) return;
  var progress = LC.getProgress();
  var uid = user.email;
  if (!progress[uid]) progress[uid] = { xp: 0, level: 1, badges: [], completedTopics: {}, completedQuizzes: {}, completedChallenges: {} };
  if (!progress[uid].completedQuizzes) progress[uid].completedQuizzes = {};
  if (!progress[uid].completedQuizzes[langId]) progress[uid].completedQuizzes[langId] = [];
  if (progress[uid].completedQuizzes[langId].indexOf(topicIndex) === -1) {
    progress[uid].completedQuizzes[langId].push(topicIndex);
  }
  // Update Quiz Quest
  if (progress[uid].quests) {
    var qQuest = progress[uid].quests.find(q => q.id === 'q_quiz');
    if (qQuest && !qQuest.done) {
        qQuest.progress += 1;
        if (qQuest.progress >= qQuest.target) qQuest.done = true;
    }
  }
  LC.saveProgress(progress);
};

LC.completeTutorial = function (langId, topicIndex) {
  var user = LC.getUser();
  if (!user) return;
  var progress = LC.getProgress();
  var uid = user.email;
  if (!progress[uid]) progress[uid] = { xp: 0, level: 1, badges: [], completedTopics: {}, completedQuizzes: {}, completedChallenges: {} };
  if (!progress[uid].completedTopics) progress[uid].completedTopics = {};
  if (!progress[uid].completedTopics[langId]) progress[uid].completedTopics[langId] = [];
  if (progress[uid].completedTopics[langId].indexOf(topicIndex) === -1) {
    progress[uid].completedTopics[langId].push(topicIndex);
  }
  LC.saveProgress(progress);
};

LC.completeChallenge = function (langId, topicIndex) {
  var user = LC.getUser();
  if (!user) return;
  var progress = LC.getProgress();
  var uid = user.email;
  if (!progress[uid]) progress[uid] = { xp: 0, level: 1, badges: [], completedTopics: {}, completedQuizzes: {}, completedChallenges: {} };
  if (!progress[uid].completedChallenges) progress[uid].completedChallenges = {};
  if (!progress[uid].completedChallenges[langId]) progress[uid].completedChallenges[langId] = [];
  if (progress[uid].completedChallenges[langId].indexOf(topicIndex) === -1) {
    progress[uid].completedChallenges[langId].push(topicIndex);
  }
  LC.saveProgress(progress);
};

LC.getNextTopicIndex = function (langId, topicIndex) {
  var list = window.LC_CONTENT && window.LC_CONTENT.topics[langId];
  if (!list) return null;
  return topicIndex + 1 < list.length ? topicIndex + 1 : null;
};

LC.isKidsMode = function () {
  return localStorage.getItem(LC.KIDS_MODE_KEY) === 'true';
};

LC.setKidsMode = function (on) {
  localStorage.setItem(LC.KIDS_MODE_KEY, on ? 'true' : 'false');
  if (on) document.body.classList.add('kids-mode');
  else document.body.classList.remove('kids-mode');
  
  // Sync to Firebase
  var user = LC.getUser();
  if (user && LC.firebase && LC.firebase.saveKidsMode) {
    LC.firebase.saveKidsMode(user.email, on);
  }
};

// Load Firebase Helper
(function loadFirebase() {
  var script = document.createElement('script');
  script.type = 'module';
  script.src = 'firebase-helper.js';
  script.onload = function() {
    console.log('script.js: firebase-helper.js loaded');
    // Attempt to sync on load if logged in
    var user = LC.getUser();
    if (user && LC.firebase && LC.firebase.syncFromRemote) {
      LC.firebase.syncFromRemote(user.email).then(function() {
          // Dispatch a custom event when sync is complete
          window.dispatchEvent(new CustomEvent('LC_FirebaseSynced'));
      });
    }
  };
  document.head.appendChild(script);
})();

// Apply kids mode class on load
if (LC.isKidsMode()) {
  document.body.classList.add('kids-mode');
}

/* ---------- Mascot & Kids Mode Helpers ---------- */
LC.mascot = {
  el: null,
  bubble: null,
  charEl: null,
  currentMood: 'playful',
  
  characters: {
    playful: { emoji: '👦', name: 'Raju', color: '#e67e22' }, // Raju-style playful
    brave: { emoji: '🏋️‍♂️', name: 'Bheem', color: '#e74c3c' },   // Bheem vibe
    cute: { emoji: '👧', name: 'Chutki', color: '#9b59b6' },  // Chutki vibe
    angry: { emoji: '👺', name: 'Kaliya', color: '#2c3e50' }  // Kaliya vibe
  },

  init: function() {
    if (document.getElementById('mascot-container')) return;
    
    var container = document.createElement('div');
    container.id = 'mascot-container';
    container.className = 'mascot-container';
    
    var bubble = document.createElement('div');
    bubble.className = 'mascot-bubble';
    bubble.id = 'mascot-bubble';
    bubble.textContent = 'Hi! I\'m Raju, your coding buddy!';
    bubble.style.display = 'none'; // Hidden initially
    
    var char = document.createElement('div');
    char.className = 'mascot-character';
    char.id = 'mascot-char';
    char.textContent = this.characters.playful.emoji; 
    char.onclick = function() { LC.mascot.sayRandom(); };
    
    container.appendChild(bubble);
    container.appendChild(char);
    document.body.appendChild(container);
    
    this.el = container;
    this.bubble = bubble;
    this.charEl = char;
    
    // Auto-greet if in kids mode
    if (LC.isKidsMode()) {
      setTimeout(function() { LC.mascot.say('Welcome back, friend! Ready to code?'); }, 1000);
    }
  },

  setMood: function(mood) {
    if (!this.characters[mood]) return;
    this.currentMood = mood;
    if (this.charEl) {
        this.charEl.textContent = this.characters[mood].emoji;
        // Optional: Change bubble border color?
        if (this.bubble) {
            this.bubble.style.borderColor = this.characters[mood].color;
        }
    }
  },
  
  say: function(text, duration, mood) {
    if (!this.bubble) this.init();
    
    if (mood) this.setMood(mood);
    else this.setMood('playful'); // Default back to playful/neutral if not specified? Or keep current? Let's default to playful for general messages.

    this.bubble.textContent = text;
    this.bubble.style.display = 'block';
    this.bubble.style.animation = 'none';
    this.bubble.offsetHeight; /* trigger reflow */
    this.bubble.style.animation = 'popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    
    if (duration) {
      setTimeout(function() {
        LC.mascot.bubble.style.display = 'none';
      }, duration);
    }
  },
  
  sayRandom: function() {
    var msgs = [
      { text: 'You are doing great! ⭐', mood: 'cute' },
      { text: 'Coding is like magic! ✨', mood: 'playful' },
      { text: 'Keep going! 🚀', mood: 'brave' },
      { text: 'I love Python! 🐍', mood: 'playful' },
      { text: 'Focus! You can do it!', mood: 'brave' }
    ];
    var item = msgs[Math.floor(Math.random() * msgs.length)];
    this.say(item.text, 3000, item.mood);
  },
  
  celebrate: function() {
    this.setMood('brave'); // Bheem celebrates!
    // Confetti effect
    for (var i = 0; i < 30; i++) {
      var c = document.createElement('div');
      c.className = 'confetti-piece';
      c.style.left = Math.random() * 100 + 'vw';
      c.style.backgroundColor = ['#ff0', '#f00', '#0f0', '#00f', '#f0f'][Math.floor(Math.random() * 5)];
      c.style.animationDuration = (Math.random() * 2 + 1) + 's';
      document.body.appendChild(c);
      setTimeout(function(el) { el.remove(); }, 3000, c);
    }
    this.say('Yay! Awesome job! 🎉', 3000, 'cute'); // Chutki congratulates too? Or stick to one. Let's use Cute for the message.
  }
};

// Initialize mascot on load
document.addEventListener('DOMContentLoaded', function() {
  LC.mascot.init();
});

/* ---------- Auth page ---------- */
(function initAuth() {
  var signinForm = document.getElementById('signin-form');
  var signupForm = document.getElementById('signup-form');
  var signinError = document.getElementById('signin-error');
  var signupError = document.getElementById('signup-error');
  var tabs = document.querySelectorAll('.auth-tab');
  var sections = document.querySelectorAll('.auth-section');

  if (!signinForm) return;

  // Wait for Firebase to load user registry
  var usersLoaded = false;
  
  // Expose a function that firebase-helper can call once ready
  var oldReady = window.LC.onFirebaseReady;
  window.LC.onFirebaseReady = async function() {
      if (oldReady) oldReady();
      console.log('script.js: onFirebaseReady called');
      var statusEl = document.getElementById('firebase-status');
      if (statusEl) {
          statusEl.textContent = 'Database connected ✅';
          statusEl.style.color = 'var(--neon-purple)';
      }
      
      if (LC.firebase && LC.firebase.getAllUsers) {
          try {
              var remoteUsers = await LC.firebase.getAllUsers();
              if (remoteUsers) {
                  var localUsers = LC.getUsers();
                  // Merge remote users into local storage
                  Object.keys(remoteUsers).forEach(k => {
                      const user = remoteUsers[k];
                      if (user && user.email) {
                        localUsers[user.email] = user;
                      }
                  });
                  LC.saveUsers(localUsers);
                  console.log('script.js: Local registry updated from Firebase');
              }
          } catch (e) {
              console.error('script.js: Error fetching users on ready:', e);
              if (statusEl) {
                  statusEl.textContent = 'Database connection issue ⚠️';
                  statusEl.style.color = 'var(--error-red)';
              }
          }
      }
      usersLoaded = true;
  };

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var t = tab.getAttribute('data-tab');
      tabs.forEach(function (x) { x.classList.remove('active'); });
      sections.forEach(function (s) {
        s.classList.toggle('active', s.id === t + '-section');
      });
      tab.classList.add('active');
      signinError.textContent = '';
      signupError.textContent = '';
    });
  });

  signinForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    signinError.textContent = 'Connecting to server...';
    signinError.style.color = 'var(--neon-purple)';
    
    var email = (document.getElementById('signin-email') || {}).value.trim();
    var password = (document.getElementById('signin-password') || {}).value;
    
    // Ensure Firebase is ready or try to wait a bit
    if (!LC.firebase || !LC.firebase.ready) {
      console.log('script.js: Firebase not ready yet, waiting...');
      let retries = 0;
      while ((!LC.firebase || !LC.firebase.ready) && retries < 10) {
        await new Promise(r => setTimeout(r, 500));
        retries++;
      }
    }

    if (!LC.firebase || !LC.firebase.ready) {
      signinError.textContent = 'Server connection timeout. Please check your internet and try again.';
      signinError.style.color = 'var(--error-red)';
      return;
    }

    signinError.textContent = 'Verifying credentials...';
    
    // Try to get user from local first
    var users = LC.getUsers();
    var stored = users[email];
    
    // If not in local or local doesn't have the user, fetch fresh from Firebase
    try {
      const allUsers = await LC.firebase.getAllUsers();
      const userKey = Object.keys(allUsers).find(k => allUsers[k].email === email);
      if (userKey) {
        stored = allUsers[userKey];
        // Update local storage with fresh data
        users[email] = stored;
        LC.saveUsers(users);
      }
    } catch (e) {
      console.error('script.js: Firebase fetch error during signin:', e);
      // Fallback to local 'stored' if it exists
    }

    if (!stored || stored.password !== password) {
      signinError.textContent = 'Invalid email or password.';
      signinError.style.color = 'var(--error-red)';
      return;
    }
    
    signinError.textContent = 'Syncing your progress...';
    LC.setUser({ email: email, displayName: stored.displayName });

    // Sync from Firebase on login
    try {
      if (LC.firebase && LC.firebase.syncFromRemote) {
        await LC.firebase.syncFromRemote(email);
      }
    } catch (e) {
      console.error('script.js: Progress sync error:', e);
    }
    
    signinError.textContent = 'Redirecting...';
    window.location.href = 'dashboard.html';
  });

  signupForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    signupError.textContent = 'Connecting to server...';
    signupError.style.color = 'var(--neon-purple)';

    var email = (document.getElementById('signup-email') || {}).value.trim();
    var password = (document.getElementById('signup-password') || {}).value;
    var displayName = (document.getElementById('signup-display') || {}).value.trim();
    
    if (password.length < 6) {
      signupError.textContent = 'Password must be at least 6 characters.';
      signupError.style.color = 'var(--error-red)';
      return;
    }

    // Ensure Firebase is ready
    if (!LC.firebase || !LC.firebase.ready) {
      let retries = 0;
      while ((!LC.firebase || !LC.firebase.ready) && retries < 10) {
        await new Promise(r => setTimeout(r, 500));
        retries++;
      }
    }

    if (!LC.firebase || !LC.firebase.ready) {
      signupError.textContent = 'Server connection error. Please try again.';
      signupError.style.color = 'var(--error-red)';
      return;
    }

    signupError.textContent = 'Checking availability...';

    // Check if user already exists in Firebase
    try {
      const allUsers = await LC.firebase.getAllUsers();
      const userKey = Object.keys(allUsers).find(k => allUsers[k].email === email);
      if (userKey) {
        signupError.textContent = 'An account with this email already exists.';
        signupError.style.color = 'var(--error-red)';
        return;
      }
    } catch (e) {
      console.error('script.js: Signup existence check failed:', e);
      // If we can't check, we might risk overwriting, but it's better to show an error
      signupError.textContent = 'Unable to verify account availability. Try again later.';
      signupError.style.color = 'var(--error-red)';
      return;
    }

    signupError.textContent = 'Creating account...';
    var newUser = { email: email, password: password, displayName: displayName || email.split('@')[0] };
    
    try {
      // Sync to Firebase first to ensure we have a record
      if (LC.firebase && LC.firebase.saveUser) {
        await LC.firebase.saveUser(newUser);
        await LC.firebase.saveProgress(email, { xp: 0, level: 1 });
      }

      // Save locally after successful Firebase save
      var users = LC.getUsers();
      users[email] = newUser;
      LC.saveUsers(users);
      LC.setUser({ email: email, displayName: newUser.displayName });

      signupError.textContent = 'Success! Redirecting...';
      window.location.href = 'dashboard.html';
    } catch (e) {
      console.error('script.js: Signup error:', e);
      signupError.textContent = 'Error creating account. Please try again.';
      signupError.style.color = 'var(--error-red)';
    }
  });
})();

/* ---------- Protected pages: redirect if not logged in ---------- */
(function checkProtected() {
  var path = (window.location.pathname || '').split('/').pop() || '';
  var protectedPages = ['dashboard.html', 'select.html', 'quiz.html', 'flashcards.html', 'challenges.html', 'leaderboard.html', 'profile.html', 'topic.html'];
  if (protectedPages.indexOf(path) !== -1 && !LC.getUser()) {
    window.location.href = 'index.html';
  }
})();
