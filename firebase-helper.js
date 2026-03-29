import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getDatabase, ref, update, get, child } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

// 1. Initialize Firebase with the provided config
const firebaseConfig = {
  databaseURL: "https://gamified-coding-creeper-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

window.LC = window.LC || {};
window.LC.firebase = {
  ready: false
};

// Helper to make email safe for Firebase keys
function safeKey(email) {
  if (!email) return '';
  return email.replace(/\./g, ',');
}

// 2. Save complete user progress object
window.LC.firebase.saveProgress = async function(email, data) {
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
  
  try {
    // Save to both 'users' and update 'user_registry' for leaderboard
    await update(ref(db, 'users/' + safeKey(email)), progressData);
    
    // Also update XP/Level in user_registry for easy leaderboard access
    await update(ref(db, 'user_registry/' + safeKey(email)), {
      xp: progressData.xp,
      level: progressData.level
    });
    console.log('Firebase: Progress saved for', email);
  } catch (e) {
    console.error('Firebase saveProgress error:', e);
  }
};

// Save a new user's basic info to registry
window.LC.firebase.saveUser = async function(userObj) {
  if (!userObj || !userObj.email) return;
  const key = safeKey(userObj.email);
  try {
    await update(ref(db, 'user_registry/' + key), {
      email: userObj.email,
      displayName: userObj.displayName || userObj.email.split('@')[0],
      password: userObj.password, // Storing password in RTDB (not ideal but consistent with current approach)
      xp: 0,
      level: 1,
      createdAt: Date.now()
    });
    console.log('Firebase: User saved to registry:', userObj.email);
  } catch (e) {
    console.error('Firebase saveUser error:', e);
  }
};

// Fetch all registered users for leaderboard
window.LC.firebase.getAllUsers = async function() {
  try {
    console.log('Firebase: Fetching all users...');
    const snapshot = await get(child(ref(db), 'user_registry'));
    if (snapshot.exists()) {
      const users = snapshot.val();
      console.log('Firebase: Loaded', Object.keys(users).length, 'users');
      return users;
    }
    console.log('Firebase: No users found in registry.');
  } catch (e) {
    console.error('Firebase getAllUsers error:', e);
  }
  return {};
};

// 3. Save kids mode settings
window.LC.firebase.saveKidsMode = async function(email, isKidsMode) {
  if (!email) return;
  try {
    await update(ref(db, 'users/' + safeKey(email)), {
      kidsMode: isKidsMode
    });
  } catch (e) {
    console.error('Firebase saveKidsMode error:', e);
  }
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
    console.error('Firebase readData error:', e);
  }
  return null;
};

// 5. Sync from remote (helper for script.js)
window.LC.firebase.syncFromRemote = async function(email) {
  if (!email) return;
  try {
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
  } catch (e) {
    console.error('Firebase syncFromRemote error:', e);
  }
  return null;
};

window.LC.firebase.ready = true;
console.log('Firebase helper initialized and ready');
if (window.LC && window.LC.onFirebaseReady) {
    window.LC.onFirebaseReady();
}
