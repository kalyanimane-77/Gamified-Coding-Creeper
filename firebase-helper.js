import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getDatabase, ref, update, get, child } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

// 1. Initialize Firebase with the provided config
const firebaseConfig = {
  databaseURL: "https://gamified-coding-creeper-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

window.LC = window.LC || {};
window.LC.firebase = {};

// Helper to make email safe for Firebase keys
function safeKey(email) {
  return email.replace(/\./g, ',');
}

// 2. Save complete user progress object
window.LC.firebase.saveProgress = function(email, data) {
  if (!email || !data) return;
  const progressData = {
    xp: data.xp || 0,
    level: data.level || 1,
    streak: data.streak || 0,
    completedTopics: data.completedTopics || {},
    completedQuizzes: data.completedQuizzes || {},
    completedChallenges: data.completedChallenges || {},
    badges: data.badges || [],
    quests: data.quests || [],
    lastSeen: Date.now(),
    kidsMode: typeof data.kidsMode !== 'undefined' ? data.kidsMode : false
  };
  
  // Save to both 'users' and update 'user_registry' for leaderboard
  update(ref(db, 'users/' + safeKey(email)), progressData);
  
  // Also update XP/Level in user_registry for easy leaderboard access
  update(ref(db, 'user_registry/' + safeKey(email)), {
    xp: progressData.xp,
    level: progressData.level
  });
};

// Save a new user's basic info to registry
window.LC.firebase.saveUser = function(userObj) {
  if (!userObj || !userObj.email) return;
  const key = safeKey(userObj.email);
  update(ref(db, 'user_registry/' + key), {
    email: userObj.email,
    displayName: userObj.displayName || userObj.email.split('@')[0],
    password: userObj.password, // Storing password in RTDB (not ideal but consistent with current approach)
    xp: 0,
    level: 1,
    createdAt: Date.now()
  });
};

// Fetch all registered users for leaderboard
window.LC.firebase.getAllUsers = async function() {
  try {
    const snapshot = await get(child(ref(db), 'user_registry'));
    if (snapshot.exists()) {
      return snapshot.val();
    }
  } catch (e) {
    console.error('Firebase getAllUsers error:', e);
  }
  return {};
};

// 3. Save kids mode settings
window.LC.firebase.saveKidsMode = function(email, isKidsMode) {
  if (!email) return;
  update(ref(db, 'users/' + safeKey(email)), {
    kidsMode: isKidsMode
  });
};

// 4. Read data back on page load
window.LC.firebase.readData = async function(email) {
  if (!email) return null;
  try {
    const snapshot = await get(child(ref(db), 'users/' + safeKey(email)));
    if (snapshot.exists()) {
      const val = snapshot.val();
      console.log('Firebase data loaded:', val);
      return val;
    }
  } catch (e) {
    console.error('Firebase read error:', e);
  }
  return null;
};

// 5. Sync from remote (helper for script.js)
window.LC.firebase.syncFromRemote = async function(email) {
  if (!email) return;
  const data = await window.LC.firebase.readData(email);
  if (data) {
    const p = window.LC.getProgress();
    p[email] = {
      ...p[email],
      ...data
    };
    window.LC.saveProgress(p);
    if (typeof data.kidsMode !== 'undefined') {
      window.LC.setKidsMode(data.kidsMode);
    }
    return data;
  }
  return null;
};

console.log('Firebase initialized');
if (window.LC && window.LC.onFirebaseReady) {
    window.LC.onFirebaseReady();
}
