/* =============================================
   SPARK APP — JAVASCRIPT
   ============================================= */

// ---- DATA ----
const PROFILES = [
  {
    id: 1, name: "Aria", age: 26, emoji: "👩‍🦰",
    location: "2.4 km away", bio: "Into hiking, good coffee, and terrible jokes.",
    color: "linear-gradient(135deg,#ff9a9e,#fad0c4)",
    daysSince: 3, likes: 142, views: 892
  },
  {
    id: 2, name: "Lena", age: 24, emoji: "🧑‍🎤",
    location: "1.1 km away", bio: "Photographer, vinyl collector & amateur chef.",
    color: "linear-gradient(135deg,#a18cd1,#fbc2eb)",
    daysSince: 7, likes: 210, views: 1104
  },
  {
    id: 3, name: "Jordan", age: 29, emoji: "🧑‍💻",
    location: "5.8 km away", bio: "Software engineer who builds apps by day, plays guitar by night.",
    color: "linear-gradient(135deg,#96fbc4,#f9f586)",
    daysSince: 14, likes: 87, views: 450
  },
  {
    id: 4, name: "Sofia", age: 23, emoji: "🏃‍♀️",
    location: "800 m away", bio: "Marathon runner. Yes, I wake up at 5am. No, I'm not sorry.",
    color: "linear-gradient(135deg,#f6d365,#fda085)",
    daysSince: 2, likes: 319, views: 1780
  },
  {
    id: 5, name: "Marco", age: 27, emoji: "🧑‍🍳",
    location: "3.2 km away", bio: "Professional chef who cooks for strangers on weekends. DM for dinner.",
    color: "linear-gradient(135deg,#84fab0,#8fd3f4)",
    daysSince: 21, likes: 176, views: 760
  },
  {
    id: 6, name: "Yuki", age: 25, emoji: "🎨",
    location: "4.6 km away", bio: "Illustrator & daydreamer. My plants have names.",
    color: "linear-gradient(135deg,#f093fb,#f5576c)",
    daysSince: 5, likes: 251, views: 1340
  },
  {
    id: 7, name: "Alex", age: 28, emoji: "🏄",
    location: "7.1 km away", bio: "Surfer, bookworm, recovering overthinker.",
    color: "linear-gradient(135deg,#4facfe,#00f2fe)",
    daysSince: 10, likes: 95, views: 530
  }
];

const FEED_POSTS = [
  {
    id: 1, userId: 2, username: "Lena K.", emoji: "🧑‍🎤",
    color: "linear-gradient(135deg,#a18cd1,#fbc2eb)",
    age: 24, location: "Copenhagen", daysSince: 7,
    caption: "Golden hour at the pier — just me and my camera 📷",
    likes: 34, feedColor: "linear-gradient(160deg,#a18cd1 0%,#fbc2eb 50%,#f6e2ff 100%)"
  },
  {
    id: 2, userId: 4, username: "Sofia M.", emoji: "🏃‍♀️",
    color: "linear-gradient(135deg,#f6d365,#fda085)",
    age: 23, location: "Berlin", daysSince: 2,
    caption: "Post-race glow ✨ 42km done. Time for pizza.",
    likes: 87, feedColor: "linear-gradient(160deg,#f6d365 0%,#fda085 60%,#ff9a5c 100%)"
  },
  {
    id: 3, userId: 6, username: "Yuki T.", emoji: "🎨",
    color: "linear-gradient(135deg,#f093fb,#f5576c)",
    age: 25, location: "Tokyo → Amsterdam", daysSince: 5,
    caption: "New studio vibes. Living in organised chaos 🌸",
    likes: 56, feedColor: "linear-gradient(160deg,#f093fb 0%,#f5576c 50%,#ff8fa3 100%)"
  },
  {
    id: 4, userId: 7, username: "Alex R.", emoji: "🏄",
    color: "linear-gradient(135deg,#4facfe,#00f2fe)",
    age: 28, location: "Barcelona", daysSince: 10,
    caption: "Caught an actual wave today. Progress! 🌊",
    likes: 29, feedColor: "linear-gradient(160deg,#4facfe 0%,#00f2fe 60%,#8efff1 100%)"
  },
  {
    id: 5, userId: 1, username: "Aria V.", emoji: "👩‍🦰",
    color: "linear-gradient(135deg,#ff9a9e,#fad0c4)",
    age: 26, location: "Paris", daysSince: 3,
    caption: "Found the most perfect little café. The croissants are life-changing 🥐",
    likes: 112, feedColor: "linear-gradient(160deg,#ff9a9e 0%,#fad0c4 60%,#ffe8e8 100%)"
  }
];

const MATCHES = [
  { id: 1, name: "Aria", emoji: "👩‍🦰", color: "linear-gradient(135deg,#ff9a9e,#fad0c4)", lastMsg: "Haha that's so true! ☀️", time: "2m" },
  { id: 2, name: "Lena", emoji: "🧑‍🎤", color: "linear-gradient(135deg,#a18cd1,#fbc2eb)", lastMsg: "We should grab coffee sometime!", time: "1h" },
  { id: 3, name: "Sofia", emoji: "🏃‍♀️", color: "linear-gradient(135deg,#f6d365,#fda085)", lastMsg: null, time: "now" },
  { id: 4, name: "Jordan", emoji: "🧑‍💻", color: "linear-gradient(135deg,#96fbc4,#f9f586)", lastMsg: null, time: "3h" },
  { id: 5, name: "Marco", emoji: "🧑‍🍳", color: "linear-gradient(135deg,#84fab0,#8fd3f4)", lastMsg: "Great taste in music btw 🎵", time: "2d" }
];

const CHAT_HISTORIES = {
  1: [
    { text: "Oh wow, I literally do the same thing every Sunday 😄", sent: false, time: "2:14 PM" },
    { text: "Ha! Great minds 🙌 What else do you get up to?", sent: true, time: "2:15 PM" },
    { text: "Mostly hiking, and trying new coffee places. You?", sent: false, time: "2:16 PM" },
    { text: "Same honestly. There's a great trail near Vondelpark", sent: true, time: "2:18 PM" },
    { text: "Haha that's so true! ☀️", sent: false, time: "2:19 PM" }
  ],
  2: [
    { text: "Hey! Loved your latest photo — really cool lighting", sent: true, time: "11:02 AM" },
    { text: "Aw thanks! Totally accidental but I'll take it 😂", sent: false, time: "11:08 AM" },
    { text: "We should grab coffee sometime!", sent: false, time: "11:09 AM" }
  ],
  5: [
    { text: "Love your taste in music btw 🎵", sent: false, time: "Yesterday" }
  ]
};

// ---- STATE ----
let state = {
  currentUser: null,
  currentView: 'swipe',
  cards: [],
  cardIndex: 0,
  isPremium: false,
  weeklyPhotos: 1,
  chatPartner: null,
  likedFeedPosts: new Set(),
  hasCameraStream: false
};

let cameraStream = null;
let capturedPhotoData = null;
let currentMatch = null;

// ---- DRAGGING STATE ----
let drag = {
  active: false,
  card: null,
  startX: 0,
  startY: 0,
  currentX: 0,
  currentY: 0
};

// ==============================================
// INIT
// ==============================================
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.getElementById('splash-screen').classList.add('hidden');
    document.getElementById('auth-screen').classList.remove('hidden');
  }, 2200);
});

// ==============================================
// AUTH
// ==============================================
function showSignup() {
  document.getElementById('login-panel').classList.add('hidden');
  document.getElementById('signup-panel').classList.remove('hidden');
}
function showLogin() {
  document.getElementById('signup-panel').classList.add('hidden');
  document.getElementById('login-panel').classList.remove('hidden');
}

function doLogin() {
  const email = document.getElementById('login-email').value.trim();
  if (!email) { showToast("Please enter your email 📧"); return; }
  state.currentUser = {
    name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    email,
    emoji: "⚡",
    color: "var(--spark-gradient)"
  };
  initApp();
}

function doSignup() {
  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  if (!name || !email) { showToast("Please fill in all fields ✏️"); return; }
  state.currentUser = { name, email, emoji: "⚡", color: "var(--spark-gradient)" };
  initApp();
}

function doLogout() {
  state.currentUser = null;
  closeOverlay('profile-screen');
  document.getElementById('app').classList.add('hidden');
  document.getElementById('auth-screen').classList.remove('hidden');
  showToast("Signed out 👋");
}

// ==============================================
// APP INIT
// ==============================================
function initApp() {
  document.getElementById('auth-screen').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');

  // Set user avatar initials
  const mini = document.getElementById('user-avatar-mini');
  mini.textContent = state.currentUser.name.charAt(0).toUpperCase();

  // Build card stack
  state.cards = [...PROFILES];
  buildCardStack();

  // Build feed
  buildFeed();

  // Profile info
  document.getElementById('profile-name-age').textContent =
    `${state.currentUser.name}, 26`;

  buildProfileGrid();
  updateProfileStats();
  updateExpiryNotice();
}

// ==============================================
// VIEW SWITCHING
// ==============================================
function switchView(view) {
  state.currentView = view;
  document.getElementById('swipe-view').classList.toggle('hidden', view !== 'swipe');
  document.getElementById('feed-view').classList.toggle('hidden', view !== 'feed');
  document.getElementById('btn-swipe').classList.toggle('active', view === 'swipe');
  document.getElementById('btn-feed').classList.toggle('active', view === 'feed');
}

// ==============================================
// BOTTOM NAV
// ==============================================
function navTo(section) {
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(`nav-${section === 'home' ? 'home' : section}`).classList.add('active');

  if (section === 'home') { /* already on home */ return; }
  if (section === 'matches') {
    buildMatchesList();
    document.getElementById('matches-screen').classList.remove('hidden');
    document.getElementById('match-badge').classList.add('hidden');
  }
  if (section === 'chat') {
    buildMatchesList();
    document.getElementById('matches-screen').classList.remove('hidden');
  }
  if (section === 'profile') {
    buildProfileGrid();
    document.getElementById('profile-screen').classList.remove('hidden');
  }
}

function closeOverlay(id) {
  document.getElementById(id).classList.add('hidden');
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('nav-home').classList.add('active');
}

function showProfile() { navTo('profile'); }
function showNotifications() { showToast("⚡ 3 new sparks this week!"); }
function showPremium() {
  document.getElementById('premium-screen').classList.remove('hidden');
}

// ==============================================
// CARD STACK
// ==============================================
function buildCardStack() {
  const stack = document.getElementById('card-stack');
  stack.innerHTML = '';

  if (state.cardIndex >= state.cards.length) {
    document.getElementById('out-of-cards').classList.remove('hidden');
    return;
  }

  document.getElementById('out-of-cards').classList.add('hidden');

  // Show up to 3 cards
  const visible = state.cards.slice(state.cardIndex, state.cardIndex + 3).reverse();

  visible.forEach((profile, i) => {
    const card = createCard(profile);
    stack.appendChild(card);
  });

  // Add drag to top card
  const topCard = stack.lastElementChild;
  if (topCard) addDragListeners(topCard);
}

function createCard(profile) {
  const card = document.createElement('div');
  card.className = 'swipe-card';
  card.dataset.id = profile.id;

  const freshness = profile.daysSince === 1 ? "Posted today" :
    profile.daysSince < 7 ? `Posted ${profile.daysSince}d ago` : `Posted ${Math.ceil(profile.daysSince/7)}w ago`;

  card.innerHTML = `
    <div class="card-photo-placeholder" style="background:${profile.color}">
      <span style="font-size:96px">${profile.emoji}</span>
    </div>
    <div class="card-gradient"></div>
    <div class="card-info">
      <div class="card-name">${profile.name}<span class="card-age">${profile.age}</span></div>
      <div class="card-location">📍 ${profile.location}</div>
      <div class="card-bio">${profile.bio}</div>
      <div class="card-freshness"><div class="freshness-dot"></div>${freshness}</div>
    </div>
    <div class="card-like-indicator">LIKE</div>
    <div class="card-pass-indicator">NOPE</div>
    <div class="card-super-indicator">⚡ SUPER</div>
  `;
  return card;
}

// ==============================================
// DRAG / SWIPE
// ==============================================
function addDragListeners(card) {
  card.addEventListener('mousedown', startDrag);
  card.addEventListener('touchstart', startDrag, { passive: true });
}

function startDrag(e) {
  const stack = document.getElementById('card-stack');
  drag.card = stack.lastElementChild;
  if (!drag.card) return;

  drag.active = true;
  drag.startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
  drag.startY = e.type === 'mousedown' ? e.clientY : e.touches[0].clientY;

  document.addEventListener('mousemove', onDrag);
  document.addEventListener('mouseup', endDrag);
  document.addEventListener('touchmove', onDrag, { passive: true });
  document.addEventListener('touchend', endDrag);
}

function onDrag(e) {
  if (!drag.active || !drag.card) return;
  const clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
  const clientY = e.type === 'mousemove' ? e.clientY : e.touches[0].clientY;

  drag.currentX = clientX - drag.startX;
  drag.currentY = clientY - drag.startY;

  const rotate = drag.currentX * 0.08;
  drag.card.style.transform = `translate(${drag.currentX}px, ${drag.currentY}px) rotate(${rotate}deg)`;
  drag.card.style.transition = 'none';

  // Show indicators
  const likeInd = drag.card.querySelector('.card-like-indicator');
  const passInd = drag.card.querySelector('.card-pass-indicator');
  const superInd = drag.card.querySelector('.card-super-indicator');

  const threshold = 60;
  if (drag.currentX > threshold) {
    likeInd.style.opacity = Math.min((drag.currentX - threshold) / 80, 1);
    passInd.style.opacity = 0; superInd.style.opacity = 0;
  } else if (drag.currentX < -threshold) {
    passInd.style.opacity = Math.min((-drag.currentX - threshold) / 80, 1);
    likeInd.style.opacity = 0; superInd.style.opacity = 0;
  } else if (drag.currentY < -threshold) {
    superInd.style.opacity = Math.min((-drag.currentY - threshold) / 80, 1);
    likeInd.style.opacity = 0; passInd.style.opacity = 0;
  } else {
    likeInd.style.opacity = passInd.style.opacity = superInd.style.opacity = 0;
  }
}

function endDrag(e) {
  if (!drag.active || !drag.card) return;
  drag.active = false;

  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('mouseup', endDrag);
  document.removeEventListener('touchmove', onDrag);
  document.removeEventListener('touchend', endDrag);

  const threshold = 100;
  const superThreshold = 80;

  if (drag.currentX > threshold) {
    animateCardOut(drag.card, 'right');
  } else if (drag.currentX < -threshold) {
    animateCardOut(drag.card, 'left');
  } else if (drag.currentY < -superThreshold) {
    animateCardOut(drag.card, 'up');
  } else {
    // Snap back
    drag.card.style.transition = 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)';
    drag.card.style.transform = '';
    drag.card.querySelectorAll('.card-like-indicator,.card-pass-indicator,.card-super-indicator').forEach(el => el.style.opacity = 0);
  }

  drag.card = null;
  drag.currentX = 0;
  drag.currentY = 0;
}

function animateCardOut(card, direction) {
  const windowW = window.innerWidth;
  let tx = 0, ty = 0, rot = 0;

  if (direction === 'right') { tx = windowW + 100; rot = 20; }
  else if (direction === 'left') { tx = -(windowW + 100); rot = -20; }
  else if (direction === 'up') { ty = -(window.innerHeight + 100); }

  card.style.transition = 'transform 0.45s ease-in, opacity 0.45s ease-in';
  card.style.transform = `translate(${tx}px, ${ty}px) rotate(${rot}deg)`;
  card.style.opacity = '0';

  const profile = state.cards[state.cardIndex];
  state.cardIndex++;

  setTimeout(() => {
    card.remove();
    buildCardStack();
  }, 450);

  if (direction === 'right') handleLike(profile);
  else if (direction === 'up') handleSuperSpark(profile);
  else handlePass(profile);
}

function swipeCard(direction) {
  const stack = document.getElementById('card-stack');
  const topCard = stack.lastElementChild;
  if (!topCard || topCard.id === 'out-of-cards') return;

  // Animate button
  const btnMap = { right: 'btn-like', left: 'btn-pass', up: 'btn-super' };
  const btn = document.getElementById(btnMap[direction]);
  if (btn) {
    btn.style.transform = 'scale(0.85)';
    setTimeout(() => btn.style.transform = '', 200);
  }

  animateCardOut(topCard, direction);
}

function handleLike(profile) {
  // Random match ~40%
  if (Math.random() < 0.4) {
    setTimeout(() => triggerMatch(profile), 200);
  }
}

function handleSuperSpark(profile) {
  showToast(`⚡ Super Spark sent to ${profile.name}!`);
  setTimeout(() => triggerMatch(profile), 600);
}

function handlePass(profile) {
  // Silent pass
}

function reloadCards() {
  state.cardIndex = 0;
  buildCardStack();
}

// ==============================================
// MATCH
// ==============================================
function triggerMatch(profile) {
  currentMatch = profile;
  document.getElementById('match-name-display').textContent = profile.name;

  const avatarYou = document.getElementById('match-avatar-you');
  const avatarThem = document.getElementById('match-avatar-them');

  avatarYou.textContent = state.currentUser.name.charAt(0).toUpperCase();
  avatarThem.textContent = profile.emoji;
  avatarThem.style.background = profile.color;

  launchParticles();
  document.getElementById('match-overlay').classList.remove('hidden');
}

function closeMatchOverlay() {
  document.getElementById('match-overlay').classList.add('hidden');
  stopParticles();
  currentMatch = null;
}

function launchParticles() {
  const container = document.getElementById('match-particles');
  container.innerHTML = '';
  const colors = ['#ff6b35','#e91e8c','#ffb347','#ff6b9d','#fff'];

  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'match-particle';
    const size = Math.random() * 10 + 4;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const delay = Math.random() * 2;
    const duration = Math.random() * 3 + 2;
    const left = Math.random() * 100;

    p.style.cssText = `
      width:${size}px; height:${size}px;
      background:${color};
      left:${left}%;
      animation-duration:${duration}s;
      animation-delay:${delay}s;
      opacity:0;
    `;
    container.appendChild(p);
  }
}

function stopParticles() {
  document.getElementById('match-particles').innerHTML = '';
}

// ==============================================
// FEED
// ==============================================
function buildFeed() {
  const container = document.getElementById('feed-container');
  container.innerHTML = '';

  FEED_POSTS.forEach(post => {
    const el = createFeedPost(post);
    container.appendChild(el);
  });
}

function createFeedPost(post) {
  const article = document.createElement('article');
  article.className = 'feed-post';
  article.dataset.id = post.id;

  const timeAgo = post.daysSince < 2 ? `${post.daysSince * 24}h ago` : `${post.daysSince}d ago`;
  const freshLabel = post.daysSince <= 7 ? "Fresh ✓" : `${post.daysSince}d old`;

  article.innerHTML = `
    <div class="feed-post-header">
      <div class="feed-avatar" style="background:${post.color}">
        ${post.emoji}
      </div>
      <div class="feed-user-info">
        <div class="feed-username">${post.username}</div>
        <div class="feed-meta">${post.age} • ${post.location} • ${timeAgo}</div>
      </div>
      <div class="feed-fresh-badge">
        <span style="width:6px;height:6px;border-radius:50%;background:#4ade80;display:inline-block;"></span>
        ${freshLabel}
      </div>
    </div>
    <div class="feed-photo-wrap">
      <div class="feed-photo-placeholder" style="background:${post.feedColor}">
        <span>${post.emoji}</span>
      </div>
    </div>
    <div class="feed-actions-bar">
      <button class="feed-action-like" id="like-${post.id}" onclick="toggleFeedLike(${post.id})">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
        <span id="like-count-${post.id}">${post.likes}</span>
      </button>
      <button class="feed-spark-btn" id="spark-btn-${post.id}" onclick="feedSpark(${post.id}, '${post.username.split(' ')[0]}')">
        <svg width="14" height="14" viewBox="0 0 72 72" fill="none">
          <polygon points="42,4 28,34 38,34 30,68 52,30 40,30" fill="white"/>
        </svg>
        Spark
      </button>
    </div>
    <div class="feed-caption">
      <strong>${post.username.split(' ')[0]}</strong>${post.caption}
    </div>
  `;
  return article;
}

function toggleFeedLike(id) {
  const post = FEED_POSTS.find(p => p.id === id);
  const btn = document.getElementById(`like-${id}`);
  const count = document.getElementById(`like-count-${id}`);

  if (state.likedFeedPosts.has(id)) {
    state.likedFeedPosts.delete(id);
    post.likes--;
    btn.classList.remove('liked');
    btn.querySelector('svg').style.fill = 'none';
  } else {
    state.likedFeedPosts.add(id);
    post.likes++;
    btn.classList.add('liked');
    btn.querySelector('svg').style.fill = '#ff6b9d';
    // Heart pop animation
    btn.querySelector('svg').style.transform = 'scale(1.4)';
    setTimeout(() => btn.querySelector('svg').style.transform = '', 300);
  }
  count.textContent = post.likes;
}

function feedSpark(postId, name) {
  const btn = document.getElementById(`spark-btn-${postId}`);
  const post = FEED_POSTS.find(p => p.id === postId);

  btn.disabled = true;
  btn.innerHTML = `⚡ Sparked!`;
  btn.style.opacity = '0.7';

  showToast(`⚡ Spark sent to ${name}!`);

  // Maybe match
  if (Math.random() < 0.5) {
    const profile = PROFILES.find(p => p.id === post.userId);
    if (profile) {
      setTimeout(() => triggerMatch(profile), 800);
    }
  }
}

// ==============================================
// CAMERA / PHOTO POST
// ==============================================
async function openCamera() {
  const maxPhotos = state.isPremium ? 2 : 1;
  if (state.weeklyPhotos >= maxPhotos) {
    showToast(`You've used your ${maxPhotos} photo${maxPhotos > 1 ? 's' : ''} this week 📷`);
    if (!state.isPremium) {
      setTimeout(() => document.getElementById('premium-screen').classList.remove('hidden'), 1000);
    }
    return;
  }

  document.getElementById('camera-overlay').classList.remove('hidden');
  document.getElementById('weekly-count').textContent = `${state.weeklyPhotos}/${maxPhotos} used`;

  try {
    cameraStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
      audio: false
    });
    const video = document.getElementById('camera-video');
    video.srcObject = cameraStream;
    state.hasCameraStream = true;
  } catch (err) {
    showToast("Camera access denied 📷 Please allow camera in settings");
    // Show demo mode
    const viewfinder = document.querySelector('.camera-viewfinder');
    viewfinder.style.background = 'linear-gradient(135deg,#1a1a2e,#16213e)';
  }
}

function closeCamera() {
  if (cameraStream) {
    cameraStream.getTracks().forEach(t => t.stop());
    cameraStream = null;
  }
  capturedPhotoData = null;
  document.getElementById('camera-overlay').classList.add('hidden');
  document.getElementById('photo-preview').classList.add('hidden');
  document.getElementById('camera-video').classList.remove('hidden');
  document.querySelector('.camera-shutter').classList.remove('hidden');
  document.querySelector('.camera-rules').classList.remove('hidden');
}

function takePhoto() {
  const video = document.getElementById('camera-video');
  const canvas = document.getElementById('camera-canvas');

  if (state.hasCameraStream) {
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    canvas.getContext('2d').drawImage(video, 0, 0);
    capturedPhotoData = canvas.toDataURL('image/jpeg', 0.85);
  } else {
    // Demo: generate a colorful placeholder
    capturedPhotoData = 'demo';
  }

  // Show preview
  const preview = document.getElementById('photo-preview');
  const previewImg = document.getElementById('preview-img');

  if (capturedPhotoData !== 'demo') {
    previewImg.src = capturedPhotoData;
  } else {
    preview.style.background = 'linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)';
    previewImg.style.display = 'none';
  }

  preview.classList.remove('hidden');
  document.querySelector('.camera-shutter').classList.add('hidden');
  document.querySelector('.camera-rules').classList.add('hidden');
  document.getElementById('camera-video').classList.add('hidden');
}

function retakePhoto() {
  capturedPhotoData = null;
  document.getElementById('photo-preview').classList.add('hidden');
  document.getElementById('camera-video').classList.remove('hidden');
  document.querySelector('.camera-shutter').classList.remove('hidden');
  document.querySelector('.camera-rules').classList.remove('hidden');
  document.getElementById('preview-img').style.display = '';
}

function postPhoto() {
  state.weeklyPhotos++;
  closeCamera();
  buildProfileGrid();
  showToast("⚡ Your Spark is live for 30 days!");
  updateExpiryNotice();
}

// ==============================================
// CHAT
// ==============================================
function openChat(profile) {
  if (!profile) return;
  closeMatchOverlay();
  state.chatPartner = profile;

  // Set up chat header
  const avatar = document.getElementById('chat-partner-avatar');
  const nameEl = document.getElementById('chat-partner-name');
  avatar.textContent = profile.emoji;
  avatar.style.background = profile.color;
  nameEl.textContent = profile.name;

  // Load messages
  buildChatMessages(profile.id);

  document.getElementById('chat-screen').classList.remove('hidden');
  setTimeout(() => {
    const msgs = document.getElementById('chat-messages');
    msgs.scrollTop = msgs.scrollHeight;
  }, 100);
}

function closeChat() {
  document.getElementById('chat-screen').classList.add('hidden');
  state.chatPartner = null;
}

function buildChatMessages(partnerId) {
  const container = document.getElementById('chat-messages');
  container.innerHTML = '';
  const msgs = CHAT_HISTORIES[partnerId] || [];

  msgs.forEach(msg => {
    addMsgBubble(container, msg.text, msg.sent, msg.time);
  });
}

function addMsgBubble(container, text, sent, time) {
  const wrap = document.createElement('div');
  wrap.style.display = 'flex';
  wrap.style.flexDirection = 'column';
  wrap.style.alignItems = sent ? 'flex-end' : 'flex-start';

  const bubble = document.createElement('div');
  bubble.className = `msg-bubble ${sent ? 'sent' : 'received'}`;
  bubble.textContent = text;

  const timeEl = document.createElement('div');
  timeEl.className = 'msg-time';
  timeEl.textContent = time || formatTime(new Date());

  wrap.appendChild(bubble);
  wrap.appendChild(timeEl);
  container.appendChild(wrap);
}

function sendMessage() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text || !state.chatPartner) return;

  const container = document.getElementById('chat-messages');
  addMsgBubble(container, text, true, formatTime(new Date()));

  input.value = '';
  container.scrollTop = container.scrollHeight;

  // Auto-reply after delay
  const replies = [
    "Haha love that! 😄",
    "That's so cool!",
    "Tell me more ✨",
    "Ha! Same 🙈",
    "Okay we definitely need to meet up",
    "You're funny 😂",
    "Wait really?! 😮"
  ];

  setTimeout(() => {
    const reply = replies[Math.floor(Math.random() * replies.length)];
    addMsgBubble(container, reply, false, formatTime(new Date()));
    container.scrollTop = container.scrollHeight;
  }, 1200 + Math.random() * 800);
}

function handleChatKey(e) {
  if (e.key === 'Enter') sendMessage();
}

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// ==============================================
// MATCHES LIST
// ==============================================
function buildMatchesList() {
  const newList = document.getElementById('matches-new-list');
  const chatList = document.getElementById('matches-chat-list');
  newList.innerHTML = '';
  chatList.innerHTML = '';

  MATCHES.forEach(match => {
    if (!match.lastMsg) {
      // New match (no messages yet)
      const item = document.createElement('div');
      item.className = 'new-match-item';
      item.onclick = () => { openChat(match); document.getElementById('matches-screen').classList.add('hidden'); };
      item.innerHTML = `
        <div class="new-match-avatar" style="background:${match.color}">
          ${match.emoji}
          <div class="new-match-spark">⚡</div>
        </div>
        <span class="new-match-name">${match.name}</span>
      `;
      newList.appendChild(item);
    } else {
      // Existing chat
      const item = document.createElement('div');
      item.className = 'chat-list-item';
      item.onclick = () => { openChat(match); document.getElementById('matches-screen').classList.add('hidden'); };
      item.innerHTML = `
        <div class="chat-list-avatar" style="background:${match.color}">${match.emoji}</div>
        <div class="chat-list-info">
          <div class="chat-list-name">${match.name}</div>
          <div class="chat-list-preview">${match.lastMsg}</div>
        </div>
        <span class="chat-list-time">${match.time}</span>
      `;
      chatList.appendChild(item);
    }
  });
}

// ==============================================
// PROFILE
// ==============================================
function buildProfileGrid() {
  const grid = document.getElementById('profile-photo-grid');
  grid.innerHTML = '';

  const maxSlots = 6;
  const hasPhotos = state.weeklyPhotos > 0;

  if (hasPhotos) {
    // Main photo slot
    const tile = document.createElement('div');
    tile.className = 'profile-photo-tile';
    tile.style.gridColumn = 'span 2';
    tile.style.gridRow = 'span 2';
    tile.innerHTML = `
      <div class="feed-photo-placeholder" style="background:var(--spark-gradient);width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:72px">
        ⚡
      </div>
      <div class="expiry-label">Expires in ${30 - (state.weeklyPhotos > 1 ? 7 : 0)}d</div>
    `;
    grid.appendChild(tile);
  }

  if (state.isPremium && state.weeklyPhotos > 1) {
    const tile = document.createElement('div');
    tile.className = 'profile-photo-tile';
    tile.innerHTML = `
      <div style="background:linear-gradient(135deg,#667eea,#764ba2);width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:42px">🌙</div>
      <div class="expiry-label">Expires in 23d</div>
    `;
    grid.appendChild(tile);
  }

  // Empty slots
  const filled = hasPhotos ? (state.isPremium && state.weeklyPhotos > 1 ? 5 : 4) : 0;
  const empty = Math.max(0, maxSlots - filled);

  for (let i = 0; i < Math.min(empty, 4); i++) {
    const tile = document.createElement('div');
    tile.className = 'profile-photo-tile';
    tile.onclick = () => openCamera();
    tile.innerHTML = `
      <div class="add-photo-placeholder">
        <div class="add-icon">+</div>
        <span>Post</span>
      </div>
    `;
    grid.appendChild(tile);
  }
}

function updateProfileStats() {
  document.getElementById('stat-likes').textContent = '284';
  document.getElementById('stat-sparks').textContent = '12';
  document.getElementById('stat-views').textContent = '1.4k';
}

function updateExpiryNotice() {
  const notice = document.getElementById('photo-expiry-notice');
  const maxPhotos = state.isPremium ? 2 : 1;
  const remaining = maxPhotos - state.weeklyPhotos;

  if (remaining <= 0) {
    notice.textContent = `⏳ Next free post available in 4 days`;
  } else {
    notice.textContent = `📷 ${remaining} photo post${remaining > 1 ? 's' : ''} remaining this week`;
  }
  notice.style.display = notice.textContent ? 'flex' : 'none';
}

// ==============================================
// PREMIUM
// ==============================================
function subscribePremium(plan) {
  state.isPremium = true;
  document.getElementById('premium-tag').textContent = 'PREMIUM';
  document.getElementById('premium-tag').style.background = 'linear-gradient(135deg,#ffb347,#ff6b35)';
  closeOverlay('premium-screen');
  showToast("⚡ Welcome to Spark Premium!");
  buildProfileGrid();
  updateExpiryNotice();
}

// ==============================================
// TOAST
// ==============================================
let toastTimeout;
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.remove('hidden');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.add('hidden'), 3000);
}

// ==============================================
// KEYBOARD
// ==============================================
document.addEventListener('keydown', (e) => {
  if (state.currentView !== 'swipe') return;
  if (e.key === 'ArrowRight') swipeCard('right');
  else if (e.key === 'ArrowLeft') swipeCard('left');
  else if (e.key === 'ArrowUp') swipeCard('up');
});
