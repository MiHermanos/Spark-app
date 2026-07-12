/* =============================================
   SPARK APP — JAVASCRIPT v2
   ============================================= */

// ---- DATA ----
const PROFILES = [
  { id: 1, name: "Aria", age: 26, emoji: "👩‍🦰", location: "2.4 km away", bio: "Into hiking, good coffee, and terrible jokes.", color: "linear-gradient(135deg,#ff9a9e,#fad0c4)", daysSince: 3, likes: 142, views: 892 },
  { id: 2, name: "Lena", age: 24, emoji: "🧑‍🎤", location: "1.1 km away", bio: "Photographer, vinyl collector & amateur chef.", color: "linear-gradient(135deg,#a18cd1,#fbc2eb)", daysSince: 7, likes: 210, views: 1104 },
  { id: 3, name: "Jordan", age: 29, emoji: "🧑‍💻", location: "5.8 km away", bio: "Software engineer who builds apps by day, plays guitar by night.", color: "linear-gradient(135deg,#96fbc4,#f9f586)", daysSince: 14, likes: 87, views: 450 },
  { id: 4, name: "Sofia", age: 23, emoji: "🏃‍♀️", location: "800 m away", bio: "Marathon runner. Yes, I wake up at 5am. No, I'm not sorry.", color: "linear-gradient(135deg,#f6d365,#fda085)", daysSince: 2, likes: 319, views: 1780 },
  { id: 5, name: "Marco", age: 27, emoji: "🧑‍🍳", location: "3.2 km away", bio: "Professional chef who cooks for strangers on weekends. DM for dinner.", color: "linear-gradient(135deg,#84fab0,#8fd3f4)", daysSince: 21, likes: 176, views: 760 },
  { id: 6, name: "Yuki", age: 25, emoji: "🎨", location: "4.6 km away", bio: "Illustrator & daydreamer. My plants have names.", color: "linear-gradient(135deg,#f093fb,#f5576c)", daysSince: 5, likes: 251, views: 1340 },
  { id: 7, name: "Alex", age: 28, emoji: "🏄", location: "7.1 km away", bio: "Surfer, bookworm, recovering overthinker.", color: "linear-gradient(135deg,#4facfe,#00f2fe)", daysSince: 10, likes: 95, views: 530 }
];

const FEED_POSTS = [
  { id: 1, userId: 2, name: "Lena", age: 24, location: "Copenhagen", emoji: "🧑‍🎤", color: "linear-gradient(135deg,#a18cd1,#fbc2eb)", daysSince: 7, caption: "Golden hour at the pier — just me and my camera 📷", likes: 34, comments: [
    { user: "Sofia", emoji: "🏃‍♀️", text: "Stunning shot! 😍", time: "2h" },
    { user: "Marco", emoji: "🧑‍🍳", text: "Copenhagen looks amazing", time: "1h" }
  ]},
  { id: 2, userId: 4, name: "Sofia", age: 23, location: "Berlin", emoji: "🏃‍♀️", color: "linear-gradient(135deg,#f6d365,#fda085)", daysSince: 2, caption: "Post-race glow ✨ 42km done. Time for pizza.", likes: 87, comments: [
    { user: "Aria", emoji: "👩‍🦰", text: "Okay this is goals 🔥", time: "4h" },
    { user: "Yuki", emoji: "🎨", text: "You're incredible!!", time: "3h" },
    { user: "Jordan", emoji: "🧑‍💻", text: "42km?! 😮 respect", time: "2h" }
  ]},
  { id: 3, userId: 6, name: "Yuki", age: 25, location: "Tokyo → Amsterdam", emoji: "🎨", color: "linear-gradient(135deg,#f093fb,#f5576c)", daysSince: 5, caption: "New studio vibes. Living in organised chaos 🌸", likes: 56, comments: [
    { user: "Lena", emoji: "🧑‍🎤", text: "Love the aesthetic!", time: "5h" }
  ]},
  { id: 4, userId: 7, name: "Alex", age: 28, location: "Barcelona", emoji: "🏄", color: "linear-gradient(135deg,#4facfe,#00f2fe)", daysSince: 10, caption: "Caught an actual wave today. Progress! 🌊", likes: 29, comments: [
    { user: "Marco", emoji: "🧑‍🍳", text: "Look at you go! 🏄‍♂️", time: "8h" }
  ]},
  { id: 5, userId: 1, name: "Aria", age: 26, location: "Paris", emoji: "👩‍🦰", color: "linear-gradient(135deg,#ff9a9e,#fad0c4)", daysSince: 3, caption: "Found the most perfect little café. The croissants are life-changing 🥐", likes: 112, comments: [
    { user: "Sofia", emoji: "🏃‍♀️", text: "Which café?! I need this 😭", time: "1h" },
    { user: "Alex", emoji: "🏄", text: "Paris is calling me fr", time: "30m" }
  ]}
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
  5: [{ text: "Love your taste in music btw 🎵", sent: false, time: "Yesterday" }]
};

// ---- APP STATE ----
let state = {
  currentUser: null,
  currentView: 'swipe',
  cards: [],
  cardIndex: 0,
  isPremium: false,
  weeklyPhotos: 1,
  chatPartner: null,
  likedFeedPosts: new Set(),
  currentCommentPostId: null,
  viewingProfile: null
};

let cameraStream = null;
let capturedPhotoData = null;
let currentMatch = null;

// =============================================
// DRAG STATE — improved touch swipe
// =============================================
const drag = {
  active: false,
  card: null,
  startX: 0,
  startY: 0,
  lastX: 0,
  lastY: 0,
  velX: 0,
  velY: 0,
  currentX: 0,
  currentY: 0,
  rafId: null
};

// =============================================
// INIT
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.getElementById('splash-screen').classList.add('hidden');
    document.getElementById('auth-screen').classList.remove('hidden');
  }, 2200);
});

// =============================================
// AUTH
// =============================================
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
  state.currentUser = { name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()), email, emoji: "⚡" };
  initApp();
}
function doSignup() {
  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  if (!name || !email) { showToast("Please fill in all fields ✏️"); return; }
  state.currentUser = { name, email, emoji: "⚡" };
  initApp();
}
function doLogout() {
  state.currentUser = null;
  closeOverlay('profile-screen');
  document.getElementById('app').classList.add('hidden');
  document.getElementById('auth-screen').classList.remove('hidden');
  showToast("Signed out 👋");
}

// =============================================
// APP INIT
// =============================================
function initApp() {
  document.getElementById('auth-screen').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
  document.getElementById('user-avatar-mini').textContent = state.currentUser.name.charAt(0).toUpperCase();
  state.cards = [...PROFILES];
  buildCardStack();
  buildFeed();
  document.getElementById('profile-name-age').textContent = `${state.currentUser.name}, 26`;
  buildProfileGrid();
  updateProfileStats();
  updateExpiryNotice();
  const avatar = document.getElementById('comment-author-avatar');
  if (avatar) avatar.textContent = state.currentUser.name.charAt(0).toUpperCase();
}

// =============================================
// VIEW SWITCHING
// =============================================
function switchView(view) {
  state.currentView = view;
  document.getElementById('swipe-view').classList.toggle('hidden', view !== 'swipe');
  document.getElementById('feed-view').classList.toggle('hidden', view !== 'feed');
  document.getElementById('btn-swipe').classList.toggle('active', view === 'swipe');
  document.getElementById('btn-feed').classList.toggle('active', view === 'feed');
}

function navTo(section) {
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  const btn = document.getElementById(`nav-${section === 'home' ? 'home' : section}`);
  if (btn) btn.classList.add('active');
  if (section === 'home') return;
  if (section === 'matches' || section === 'chat') {
    buildMatchesList();
    document.getElementById('matches-screen').classList.remove('hidden');
    document.getElementById('match-badge').classList.add('hidden');
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
function showPremium() { document.getElementById('premium-screen').classList.remove('hidden'); }

// =============================================
// CARD STACK
// =============================================
function buildCardStack() {
  const stack = document.getElementById('card-stack');
  stack.innerHTML = '';
  if (state.cardIndex >= state.cards.length) {
    document.getElementById('out-of-cards').classList.remove('hidden');
    return;
  }
  document.getElementById('out-of-cards').classList.add('hidden');
  const visible = state.cards.slice(state.cardIndex, state.cardIndex + 3).reverse();
  visible.forEach(profile => stack.appendChild(createCard(profile)));
  const topCard = stack.lastElementChild;
  if (topCard) initCardDrag(topCard);
}

function createCard(profile) {
  const card = document.createElement('div');
  card.className = 'swipe-card';
  card.dataset.id = profile.id;
  const freshness = profile.daysSince === 1 ? "Posted today" : profile.daysSince < 7 ? `Posted ${profile.daysSince}d ago` : `Posted ${Math.ceil(profile.daysSince/7)}w ago`;
  card.innerHTML = `
    <div class="card-photo-placeholder" style="background:${profile.color}">
      <span style="font-size:100px">${profile.emoji}</span>
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

// =============================================
// IMPROVED TOUCH / DRAG SWIPE
// =============================================
function initCardDrag(card) {
  // Touch events
  card.addEventListener('touchstart', onDragStart, { passive: true });
  card.addEventListener('touchmove', onDragMove, { passive: false });
  card.addEventListener('touchend', onDragEnd, { passive: true });
  // Mouse events (desktop)
  card.addEventListener('mousedown', onDragStart);
}

function getClientXY(e) {
  if (e.touches && e.touches.length > 0) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
  if (e.changedTouches && e.changedTouches.length > 0) return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
  return { x: e.clientX, y: e.clientY };
}

function onDragStart(e) {
  if (drag.active) return;
  const stack = document.getElementById('card-stack');
  drag.card = stack.lastElementChild;
  if (!drag.card || drag.card.id === 'out-of-cards') return;

  const { x, y } = getClientXY(e);
  drag.active = true;
  drag.startX = x;
  drag.startY = y;
  drag.lastX = x;
  drag.lastY = y;
  drag.currentX = 0;
  drag.currentY = 0;
  drag.velX = 0;
  drag.velY = 0;
  drag.card.style.transition = 'none';

  document.addEventListener('mousemove', onDragMove);
  document.addEventListener('mouseup', onDragEnd);
}

function onDragMove(e) {
  if (!drag.active || !drag.card) return;
  if (e.cancelable) e.preventDefault(); // prevent scroll during swipe

  const { x, y } = getClientXY(e);
  drag.velX = x - drag.lastX;
  drag.velY = y - drag.lastY;
  drag.lastX = x;
  drag.lastY = y;
  drag.currentX = x - drag.startX;
  drag.currentY = y - drag.startY;

  if (drag.rafId) cancelAnimationFrame(drag.rafId);
  drag.rafId = requestAnimationFrame(updateCardPosition);
}

function updateCardPosition() {
  if (!drag.card) return;
  const rotate = drag.currentX * 0.06;
  drag.card.style.transform = `translate(${drag.currentX}px, ${drag.currentY}px) rotate(${rotate}deg)`;

  const likeInd = drag.card.querySelector('.card-like-indicator');
  const passInd = drag.card.querySelector('.card-pass-indicator');
  const superInd = drag.card.querySelector('.card-super-indicator');
  const threshold = 50;

  if (drag.currentX > threshold) {
    likeInd.style.opacity = Math.min((drag.currentX - threshold) / 60, 1);
    passInd.style.opacity = 0; superInd.style.opacity = 0;
  } else if (drag.currentX < -threshold) {
    passInd.style.opacity = Math.min((-drag.currentX - threshold) / 60, 1);
    likeInd.style.opacity = 0; superInd.style.opacity = 0;
  } else if (drag.currentY < -threshold) {
    superInd.style.opacity = Math.min((-drag.currentY - threshold) / 60, 1);
    likeInd.style.opacity = 0; passInd.style.opacity = 0;
  } else {
    likeInd.style.opacity = passInd.style.opacity = superInd.style.opacity = 0;
  }
}

function onDragEnd(e) {
  if (!drag.active || !drag.card) return;
  drag.active = false;
  if (drag.rafId) { cancelAnimationFrame(drag.rafId); drag.rafId = null; }

  document.removeEventListener('mousemove', onDragMove);
  document.removeEventListener('mouseup', onDragEnd);

  // Use both position AND velocity to determine swipe
  const POSITION_THRESHOLD = 100;
  const VELOCITY_THRESHOLD = 5;

  const isRight = drag.currentX > POSITION_THRESHOLD || (drag.velX > VELOCITY_THRESHOLD && drag.currentX > 40);
  const isLeft  = drag.currentX < -POSITION_THRESHOLD || (drag.velX < -VELOCITY_THRESHOLD && drag.currentX < -40);
  const isUp    = drag.currentY < -80 && Math.abs(drag.currentX) < 60;

  if (isRight) {
    animateCardOut(drag.card, 'right');
  } else if (isLeft) {
    animateCardOut(drag.card, 'left');
  } else if (isUp) {
    animateCardOut(drag.card, 'up');
  } else {
    // Snap back with spring
    drag.card.style.transition = 'transform 0.45s cubic-bezier(0.34,1.56,0.64,1)';
    drag.card.style.transform = '';
    drag.card.querySelectorAll('.card-like-indicator,.card-pass-indicator,.card-super-indicator').forEach(el => el.style.opacity = 0);
  }

  drag.card = null;
  drag.currentX = 0;
  drag.currentY = 0;
}

function animateCardOut(card, direction) {
  const W = window.innerWidth + 200;
  const H = window.innerHeight + 200;
  let tx = 0, ty = 0, rot = 0;

  if (direction === 'right') { tx = W; rot = 25; }
  else if (direction === 'left') { tx = -W; rot = -25; }
  else if (direction === 'up') { ty = -H; }

  card.style.transition = 'transform 0.4s ease-in, opacity 0.35s ease-in';
  card.style.transform = `translate(${tx}px, ${ty}px) rotate(${rot}deg)`;
  card.style.opacity = '0';

  const profile = state.cards[state.cardIndex];
  state.cardIndex++;

  setTimeout(() => { card.remove(); buildCardStack(); }, 420);

  if (direction === 'right') handleLike(profile);
  else if (direction === 'up') handleSuperSpark(profile);
}

function swipeCard(direction) {
  const stack = document.getElementById('card-stack');
  const topCard = stack.lastElementChild;
  if (!topCard || topCard.id === 'out-of-cards') return;
  const btnMap = { right: 'btn-like', left: 'btn-pass', up: 'btn-super' };
  const btn = document.getElementById(btnMap[direction]);
  if (btn) { btn.style.transform = 'scale(0.85)'; setTimeout(() => btn.style.transform = '', 200); }
  animateCardOut(topCard, direction);
}

function handleLike(profile) {
  if (Math.random() < 0.45) setTimeout(() => triggerMatch(profile), 200);
}
function handleSuperSpark(profile) {
  showToast(`⚡ Super Spark sent to ${profile.name}!`);
  setTimeout(() => triggerMatch(profile), 600);
}
function reloadCards() { state.cardIndex = 0; buildCardStack(); }

// =============================================
// MATCH
// =============================================
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
  for (let i = 0; i < 32; i++) {
    const p = document.createElement('div');
    p.className = 'match-particle';
    const size = Math.random() * 10 + 4;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const delay = Math.random() * 2;
    const duration = Math.random() * 3 + 2;
    p.style.cssText = `width:${size}px;height:${size}px;background:${color};left:${Math.random()*100}%;animation-duration:${duration}s;animation-delay:${delay}s;opacity:0;`;
    container.appendChild(p);
  }
}
function stopParticles() { document.getElementById('match-particles').innerHTML = ''; }

// =============================================
// TIKTOK-STYLE FEED
// =============================================
function buildFeed() {
  const container = document.getElementById('feed-container');
  container.innerHTML = '';

  // Scroll dots
  const dotsEl = document.createElement('div');
  dotsEl.className = 'feed-scroll-indicator';
  FEED_POSTS.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = `scroll-dot${i === 0 ? ' active' : ''}`;
    dotsEl.appendChild(dot);
  });
  container.appendChild(dotsEl);

  FEED_POSTS.forEach((post, idx) => {
    container.appendChild(createFeedPost(post, idx));
  });

  // Update dots on scroll
  container.addEventListener('scroll', () => {
    const postHeight = container.clientHeight;
    const scrollTop = container.scrollTop;
    const currentIdx = Math.round(scrollTop / postHeight);
    dotsEl.querySelectorAll('.scroll-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIdx);
    });
  }, { passive: true });
}

function createFeedPost(post, idx) {
  const el = document.createElement('div');
  el.className = 'feed-post';

  const timeAgo = post.daysSince < 2 ? `${post.daysSince * 24}h ago` : `${post.daysSince}d ago`;
  const freshLabel = post.daysSince <= 7 ? "Fresh ✓" : `${post.daysSince}d old`;

  el.innerHTML = `
    <!-- Full screen photo -->
    <div class="feed-photo-area">
      <div class="feed-photo-bg" style="background:${post.color}">
        <span style="font-size:130px">${post.emoji}</span>
      </div>
    </div>
    <div class="feed-gradient-top"></div>
    <div class="feed-gradient-bottom"></div>

    <!-- Right-side action buttons -->
    <div class="feed-side-actions">
      <button class="feed-side-btn" id="feed-like-btn-${post.id}" onclick="toggleFeedLike(${post.id})">
        <div class="feed-side-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </div>
        <span id="feed-like-count-${post.id}">${post.likes}</span>
      </button>

      <button class="feed-side-btn" onclick="openComments(${post.id})">
        <div class="feed-side-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        </div>
        <span id="feed-comment-count-${post.id}">${post.comments.length}</span>
      </button>

      <button class="feed-side-btn" id="feed-spark-side-${post.id}" onclick="feedSpark(${post.id}, '${post.name}')">
        <div class="feed-spark-side">
          <svg width="18" height="18" viewBox="0 0 72 72" fill="none">
            <polygon points="42,4 28,34 38,34 30,68 52,30 40,30" fill="white"/>
          </svg>
        </div>
        <span>Spark</span>
      </button>
    </div>

    <!-- Bottom info -->
    <div class="feed-bottom-info">
      <div class="feed-profile-row" onclick="openUserProfile(${post.userId})">
        <div class="feed-avatar-wrap">
          <div class="feed-avatar" style="background:${post.color}">${post.emoji}</div>
        </div>
        <div>
          <div class="feed-username">${post.name}, ${post.age}</div>
          <div class="feed-fresh-tag">
            <span style="width:5px;height:5px;border-radius:50%;background:#4ade80;display:inline-block"></span>
            ${freshLabel}
          </div>
        </div>
      </div>
      <div class="feed-caption">${post.caption}</div>
    </div>
  `;
  return el;
}

function toggleFeedLike(id) {
  const post = FEED_POSTS.find(p => p.id === id);
  const btn = document.getElementById(`feed-like-btn-${id}`);
  const count = document.getElementById(`feed-like-count-${id}`);
  const icon = btn.querySelector('svg');

  if (state.likedFeedPosts.has(id)) {
    state.likedFeedPosts.delete(id);
    post.likes--;
    btn.classList.remove('liked');
    icon.style.fill = 'none';
    icon.style.stroke = 'white';
  } else {
    state.likedFeedPosts.add(id);
    post.likes++;
    btn.classList.add('liked');
    icon.style.fill = '#ff6b9d';
    icon.style.stroke = '#ff6b9d';
    // Pop animation
    btn.querySelector('.feed-side-icon').classList.remove('heart-pop');
    void btn.querySelector('.feed-side-icon').offsetWidth; // reflow
    btn.querySelector('.feed-side-icon').classList.add('heart-pop');
  }
  count.textContent = post.likes;
}

function feedSpark(postId, name) {
  const btn = document.getElementById(`feed-spark-side-${postId}`);
  const post = FEED_POSTS.find(p => p.id === postId);
  btn.querySelector('span').textContent = '✓';
  btn.style.opacity = '0.7';

  showToast(`⚡ Spark sent to ${name}!`);

  if (Math.random() < 0.5) {
    const profile = PROFILES.find(p => p.id === post.userId);
    if (profile) setTimeout(() => triggerMatch(profile), 900);
  }
}

// =============================================
// USER PROFILE OVERLAY (from feed)
// =============================================
function openUserProfile(userId) {
  const profile = PROFILES.find(p => p.id === userId);
  if (!profile) return;
  state.viewingProfile = profile;

  const overlay = document.getElementById('user-profile-overlay');
  const hero = document.getElementById('upo-hero');

  // Set hero background
  hero.style.background = profile.color;
  // Clear previous bg child if any
  let oldBg = hero.querySelector('.upo-hero-bg');
  if (oldBg) oldBg.remove();
  const bg = document.createElement('div');
  bg.className = 'upo-hero-bg';
  bg.innerHTML = `<span style="font-size:130px">${profile.emoji}</span>`;
  hero.insertBefore(bg, hero.querySelector('.upo-hero-gradient'));

  // Info
  document.getElementById('upo-name-age').textContent = `${profile.name}, ${profile.age}`;
  document.getElementById('upo-location').innerHTML = `📍 ${profile.location}`;
  document.getElementById('upo-bio').textContent = profile.bio;
  const freshEl = document.getElementById('upo-freshness').querySelector('span');
  freshEl.textContent = profile.daysSince < 2 ? "Posted today" : profile.daysSince < 7 ? `Posted ${profile.daysSince}d ago` : `Posted ${Math.ceil(profile.daysSince/7)}w ago`;

  // Reset buttons
  const sparkBtn = document.getElementById('upo-spark-btn');
  const msgBtn = document.getElementById('upo-message-btn');
  sparkBtn.disabled = false;
  sparkBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 72 72" fill="none"><polygon points="42,4 28,34 38,34 30,68 52,30 40,30" fill="white"/></svg> Spark`;
  msgBtn.style.display = 'flex';

  // Check if already a match (can message)
  const isMatch = MATCHES.some(m => m.id === profile.id);
  if (!isMatch) {
    msgBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> Message`;
    msgBtn.style.opacity = '0.4';
    msgBtn.title = 'Match first to message';
  } else {
    msgBtn.style.opacity = '1';
    msgBtn.title = '';
  }

  // Photos scroll
  const photoCount = Math.floor(Math.random() * 2) + 1; // 1-2 photos
  document.getElementById('upo-photo-count').textContent = `(${photoCount} photo${photoCount > 1 ? 's' : ''})`;
  const photosScroll = document.getElementById('upo-photos-scroll');
  photosScroll.innerHTML = '';
  const daysAgo = [profile.daysSince, profile.daysSince + 7].slice(0, photoCount);
  daysAgo.forEach((d, i) => {
    const thumb = document.createElement('div');
    thumb.className = 'upo-photo-thumb';
    const tint = i === 0 ? profile.color : profile.color.replace('135deg', '160deg');
    thumb.innerHTML = `
      <div class="upo-photo-inner" style="background:${tint}">
        ${i === 0 ? profile.emoji : '🌟'}
      </div>
      <div class="upo-photo-expiry">${d}d ago</div>
    `;
    photosScroll.appendChild(thumb);
  });

  // About section
  const about = document.getElementById('upo-about-section');
  about.innerHTML = `
    <div class="upo-about-item"><span class="upo-about-icon">📍</span><span>${profile.location}</span></div>
    <div class="upo-about-item"><span class="upo-about-icon">📷</span><span>Last photo: ${profile.daysSince}d ago — active poster</span></div>
    <div class="upo-about-item"><span class="upo-about-icon">❤️</span><span>${profile.likes} likes this month</span></div>
    <div class="upo-about-item"><span class="upo-about-icon">👁️</span><span>${profile.views.toLocaleString()} profile views</span></div>
  `;

  overlay.classList.remove('hidden');
}

function closeUserProfile() {
  document.getElementById('user-profile-overlay').classList.add('hidden');
  state.viewingProfile = null;
}

function upoPass() {
  const profile = state.viewingProfile;
  closeUserProfile();
  showToast(`Passed on ${profile ? profile.name : 'this profile'}`);
}

function upoSpark() {
  const profile = state.viewingProfile;
  if (!profile) return;
  const btn = document.getElementById('upo-spark-btn');
  btn.disabled = true;
  btn.textContent = '⚡ Sparked!';
  showToast(`⚡ Spark sent to ${profile.name}!`);
  if (Math.random() < 0.55) {
    setTimeout(() => { closeUserProfile(); triggerMatch(profile); }, 700);
  }
}

function upoMessage() {
  const profile = state.viewingProfile;
  if (!profile) return;
  const isMatch = MATCHES.some(m => m.id === profile.id);
  if (!isMatch) { showToast("Match with them first to send a message ⚡"); return; }
  closeUserProfile();
  openChat(profile);
}

// =============================================
// COMMENTS
// =============================================
function openComments(postId) {
  const post = FEED_POSTS.find(p => p.id === postId);
  if (!post) return;
  state.currentCommentPostId = postId;

  document.getElementById('comments-title').textContent = `${post.comments.length} comment${post.comments.length !== 1 ? 's' : ''}`;

  const list = document.getElementById('comments-list');
  list.innerHTML = '';
  post.comments.forEach(c => appendComment(list, c.user, c.emoji, c.text, c.time));

  document.getElementById('comments-drawer').classList.remove('hidden');
  document.getElementById('drawer-backdrop').classList.remove('hidden');
  // Focus input after animation
  setTimeout(() => document.getElementById('comment-input').focus(), 350);
}

function appendComment(list, user, emoji, text, time) {
  const item = document.createElement('div');
  item.className = 'comment-item';
  const colors = { "Aria":"linear-gradient(135deg,#ff9a9e,#fad0c4)", "Lena":"linear-gradient(135deg,#a18cd1,#fbc2eb)", "Sofia":"linear-gradient(135deg,#f6d365,#fda085)", "Marco":"linear-gradient(135deg,#84fab0,#8fd3f4)", "Yuki":"linear-gradient(135deg,#f093fb,#f5576c)", "Jordan":"linear-gradient(135deg,#96fbc4,#f9f586)", "Alex":"linear-gradient(135deg,#4facfe,#00f2fe)" };
  const bg = colors[user] || 'var(--spark-gradient)';
  item.innerHTML = `
    <div class="comment-avatar" style="background:${bg}">${emoji || user.charAt(0)}</div>
    <div class="comment-body">
      <div class="comment-author">${user}</div>
      <div class="comment-text">${text}</div>
      <div class="comment-time">${time}</div>
    </div>
  `;
  list.appendChild(item);
  list.scrollTop = list.scrollHeight;
}

function closeComments() {
  document.getElementById('comments-drawer').classList.add('hidden');
  document.getElementById('drawer-backdrop').classList.add('hidden');
  state.currentCommentPostId = null;
}

function submitComment() {
  const input = document.getElementById('comment-input');
  const text = input.value.trim();
  if (!text || !state.currentCommentPostId) return;

  const post = FEED_POSTS.find(p => p.id === state.currentCommentPostId);
  if (!post) return;

  const newComment = { user: state.currentUser.name, emoji: '⚡', text, time: 'now' };
  post.comments.push(newComment);

  const list = document.getElementById('comments-list');
  appendComment(list, newComment.user, newComment.emoji, text, 'now');

  // Update count on post
  const countEl = document.getElementById(`feed-comment-count-${state.currentCommentPostId}`);
  if (countEl) countEl.textContent = post.comments.length;
  document.getElementById('comments-title').textContent = `${post.comments.length} comment${post.comments.length !== 1 ? 's' : ''}`;

  input.value = '';
}
function handleCommentKey(e) { if (e.key === 'Enter') submitComment(); }

// =============================================
// CAMERA
// =============================================
async function openCamera() {
  const maxPhotos = state.isPremium ? 2 : 1;
  if (state.weeklyPhotos >= maxPhotos) {
    showToast(`You've used your ${maxPhotos} photo${maxPhotos > 1 ? 's' : ''} this week 📷`);
    if (!state.isPremium) setTimeout(() => document.getElementById('premium-screen').classList.remove('hidden'), 1000);
    return;
  }
  document.getElementById('camera-overlay').classList.remove('hidden');
  document.getElementById('weekly-count').textContent = `${state.weeklyPhotos}/${maxPhotos} used`;
  try {
    cameraStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } }, audio: false });
    document.getElementById('camera-video').srcObject = cameraStream;
    state.hasCameraStream = true;
  } catch (err) {
    showToast("Camera access denied 📷");
    document.querySelector('.camera-viewfinder').style.background = 'linear-gradient(135deg,#1a1a2e,#16213e)';
  }
}

function closeCamera() {
  if (cameraStream) { cameraStream.getTracks().forEach(t => t.stop()); cameraStream = null; }
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
  if (state.hasCameraStream && video.videoWidth) {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    capturedPhotoData = canvas.toDataURL('image/jpeg', 0.85);
  } else {
    capturedPhotoData = 'demo';
  }
  const preview = document.getElementById('photo-preview');
  const previewImg = document.getElementById('preview-img');
  if (capturedPhotoData !== 'demo') {
    previewImg.src = capturedPhotoData;
    previewImg.style.display = '';
  } else {
    preview.style.background = 'linear-gradient(135deg,#1a1a2e,#0f3460)';
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

// =============================================
// CHAT
// =============================================
function openChat(profile) {
  if (!profile) return;
  closeMatchOverlay();
  state.chatPartner = profile;
  const avatar = document.getElementById('chat-partner-avatar');
  avatar.textContent = profile.emoji;
  avatar.style.background = profile.color;
  document.getElementById('chat-partner-name').textContent = profile.name;
  buildChatMessages(profile.id);
  document.getElementById('chat-screen').classList.remove('hidden');
  setTimeout(() => { const msgs = document.getElementById('chat-messages'); msgs.scrollTop = msgs.scrollHeight; }, 100);
}

function closeChat() {
  document.getElementById('chat-screen').classList.add('hidden');
  state.chatPartner = null;
}

function buildChatMessages(partnerId) {
  const container = document.getElementById('chat-messages');
  container.innerHTML = '';
  (CHAT_HISTORIES[partnerId] || []).forEach(msg => addMsgBubble(container, msg.text, msg.sent, msg.time));
}

function addMsgBubble(container, text, sent, time) {
  const wrap = document.createElement('div');
  wrap.style.cssText = `display:flex;flex-direction:column;align-items:${sent ? 'flex-end' : 'flex-start'}`;
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
  const replies = ["Haha love that! 😄","That's so cool!","Tell me more ✨","Ha! Same 🙈","We definitely need to meet up","You're funny 😂","Wait really?! 😮","I was just thinking the same thing!"];
  setTimeout(() => {
    addMsgBubble(container, replies[Math.floor(Math.random() * replies.length)], false, formatTime(new Date()));
    container.scrollTop = container.scrollHeight;
  }, 1000 + Math.random() * 800);
}
function handleChatKey(e) { if (e.key === 'Enter') sendMessage(); }
function formatTime(date) { return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); }

// =============================================
// MATCHES LIST
// =============================================
function buildMatchesList() {
  const newList = document.getElementById('matches-new-list');
  const chatList = document.getElementById('matches-chat-list');
  newList.innerHTML = '';
  chatList.innerHTML = '';
  MATCHES.forEach(match => {
    if (!match.lastMsg) {
      const item = document.createElement('div');
      item.className = 'new-match-item';
      item.onclick = () => { openChat(match); document.getElementById('matches-screen').classList.add('hidden'); };
      item.innerHTML = `<div class="new-match-avatar" style="background:${match.color}">${match.emoji}<div class="new-match-spark">⚡</div></div><span class="new-match-name">${match.name}</span>`;
      newList.appendChild(item);
    } else {
      const item = document.createElement('div');
      item.className = 'chat-list-item';
      item.onclick = () => { openChat(match); document.getElementById('matches-screen').classList.add('hidden'); };
      item.innerHTML = `<div class="chat-list-avatar" style="background:${match.color}">${match.emoji}</div><div class="chat-list-info"><div class="chat-list-name">${match.name}</div><div class="chat-list-preview">${match.lastMsg}</div></div><span class="chat-list-time">${match.time}</span>`;
      chatList.appendChild(item);
    }
  });
}

// =============================================
// PROFILE
// =============================================
function buildProfileGrid() {
  const grid = document.getElementById('profile-photo-grid');
  grid.innerHTML = '';
  const maxSlots = 6;
  if (state.weeklyPhotos > 0) {
    const tile = document.createElement('div');
    tile.className = 'profile-photo-tile';
    tile.style.gridColumn = 'span 2';
    tile.style.gridRow = 'span 2';
    tile.innerHTML = `<div style="background:var(--spark-gradient);width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:72px">⚡</div><div class="expiry-label">Expires in 30d</div>`;
    grid.appendChild(tile);
  }
  if (state.isPremium && state.weeklyPhotos > 1) {
    const tile = document.createElement('div');
    tile.className = 'profile-photo-tile';
    tile.innerHTML = `<div style="background:linear-gradient(135deg,#667eea,#764ba2);width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:42px">🌙</div><div class="expiry-label">Expires in 23d</div>`;
    grid.appendChild(tile);
  }
  const filled = state.weeklyPhotos > 0 ? (state.isPremium && state.weeklyPhotos > 1 ? 5 : 4) : 0;
  for (let i = 0; i < Math.min(maxSlots - filled, 4); i++) {
    const tile = document.createElement('div');
    tile.className = 'profile-photo-tile';
    tile.onclick = () => openCamera();
    tile.innerHTML = `<div class="add-photo-placeholder"><div class="add-icon">+</div><span>Post</span></div>`;
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
  notice.textContent = remaining <= 0 ? `⏳ Next free post available in 4 days` : `📷 ${remaining} photo post${remaining > 1 ? 's' : ''} remaining this week`;
  notice.style.display = 'flex';
}

// =============================================
// PREMIUM
// =============================================
function subscribePremium(plan) {
  state.isPremium = true;
  document.getElementById('premium-tag').textContent = 'PREMIUM';
  document.getElementById('premium-tag').style.background = 'linear-gradient(135deg,#ffb347,#ff6b35)';
  closeOverlay('premium-screen');
  showToast("⚡ Welcome to Spark Premium!");
  buildProfileGrid();
  updateExpiryNotice();
}

// =============================================
// TOAST
// =============================================
let toastTimeout;
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.remove('hidden');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.add('hidden'), 3000);
}

// =============================================
// KEYBOARD
// =============================================
document.addEventListener('keydown', (e) => {
  if (state.currentView !== 'swipe') return;
  if (e.key === 'ArrowRight') swipeCard('right');
  else if (e.key === 'ArrowLeft') swipeCard('left');
  else if (e.key === 'ArrowUp') swipeCard('up');
});
