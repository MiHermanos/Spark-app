/* ============================================================
   SPARK — App Logic
   ============================================================ */

'use strict';

// ============================================================
// DATA
// ============================================================

const PROFILES = [
  {
    id: 1, name: 'Emma', age: 24, city: 'Amsterdam',
    emoji: '👩', avatar: 'photos/profile_emma.jpg',
    bio: 'Dol op koffie, boeken en lange wandelingen door de grachtjes. Zin in een echt gesprek zonder filters? 😊',
    tags: ['Koffie ☕', 'Boeken 📚', 'Yoga 🧘', 'Festivals 🎵'],
    distance: '3 km', premium: false,
    photos: ['photos/profile_emma.jpg'],
    likedBack: true,
  },
  {
    id: 2, name: 'Lucas', age: 26, city: 'Utrecht',
    emoji: '👨', avatar: 'photos/profile_lucas.jpg',
    bio: 'Chef-kok in opleiding. Ik kook voor jou als je de was doet 😄. Altijd in voor een nieuw avontuur.',
    tags: ['Koken 🍳', 'Reizen ✈️', 'Klimmen 🧗', 'Film 🎬'],
    distance: '8 km', premium: true,
    photos: ['photos/profile_lucas.jpg'],
    likedBack: false,
  },
  {
    id: 3, name: 'Sofia', age: 22, city: 'Rotterdam',
    emoji: '👩‍🦱', avatar: 'photos/profile_sofia.jpg',
    bio: 'Studeert psychologie en vraagt me af waarom mensen zo ingewikkeld zijn 🤔. Wandelen in de natuur maakt alles beter.',
    tags: ['Natuur 🌿', 'Psych 🧠', 'Hardlopen 🏃', 'Art 🎨'],
    distance: '15 km', premium: false,
    photos: ['photos/profile_sofia.jpg'],
    likedBack: true,
  },
  {
    id: 4, name: 'James', age: 28, city: 'Den Haag',
    emoji: '🧔', avatar: 'photos/profile_james.jpg',
    bio: 'Architect overdag, muzikant in het weekend. Op zoek naar iemand om mee te lachen tot het te laat is.',
    tags: ['Muziek 🎸', 'Design 🏛️', 'Wijn 🍷', 'Fietsen 🚴'],
    distance: '22 km', premium: true,
    photos: ['photos/profile_james.jpg'],
    likedBack: false,
  },
  {
    id: 5, name: 'Mia', age: 25, city: 'Leiden',
    emoji: '👩‍🦰', avatar: 'photos/profile_mia.jpg',
    bio: 'Fotografe van echte momenten. Geen poses, geen filters — net als op deze app 📸. Koffie is mijn liefde.',
    tags: ['Fotografie 📷', 'Markt 🛒', 'Bloemen 🌸', 'Thrift 🛍️'],
    distance: '6 km', premium: false,
    photos: ['photos/profile_mia.jpg'],
    likedBack: false,
  },
  {
    id: 6, name: 'Alex', age: 23, city: 'Haarlem',
    emoji: '🧑‍🦰', avatar: 'photos/profile_alex.jpg',
    bio: 'Schrijver en dromer. Mijn ideale avond: een goed boek, warme thee en jij tegenover me.',
    tags: ['Schrijven ✍️', 'Boeken 📖', 'Thee 🍵', 'Muziek 🎶'],
    distance: '11 km', premium: false,
    photos: ['photos/profile_alex.jpg'],
    likedBack: true,
  },
];

const FEED_POSTS = [
  {
    id: 101, userId: 1, name: 'Emma', emoji: '👩', avatar: 'photos/profile_emma.jpg', premium: false,
    image: 'photos/profile_emma.jpg', imageEmoji: '🌅',
    caption: 'Zondag in het Vondelpark. Niks beters dan dit ☀️',
    likes: 47, liked: false, comments: [
      { name: 'Lucas', emoji: '👨', text: 'Prachtig! 😍', time: '2u' },
      { name: 'Sofia', emoji: '👩‍🦱', text: 'Ik wil ook!', time: '1u' },
    ],
    daysAgo: 2, matched: false, city: 'Amsterdam', age: 24,
  },
  {
    id: 102, userId: 4, name: 'James', emoji: '🧔', avatar: 'photos/profile_james.jpg', premium: true,
    image: 'photos/profile_james.jpg', imageEmoji: '🌆',
    caption: 'Rooftop sessie met de band. Donderdag = beste dag van de week 🎸',
    likes: 82, liked: false, comments: [
      { name: 'Mia', emoji: '👩‍🦰', text: 'Die band is echt goed!', time: '3u' },
      { name: 'Alex', emoji: '🧑‍🦰', text: 'Wanneer is het concert? 🎶', time: '30m' },
    ],
    daysAgo: 5, matched: false, city: 'Den Haag', age: 28,
  },
  {
    id: 103, userId: 3, name: 'Sofia', emoji: '👩‍🦱', avatar: 'photos/profile_sofia.jpg', premium: false,
    image: 'photos/profile_sofia.jpg', imageEmoji: '🌲',
    caption: 'Kilometer 15 van de trail run. Mijn benen haten me, mijn hoofd is dankbaar 🏃‍♀️',
    likes: 61, liked: false, comments: [
      { name: 'Emma', emoji: '👩', text: 'Held! 💪', time: '4u' },
    ],
    daysAgo: 3, matched: false, city: 'Rotterdam', age: 22,
  },
  {
    id: 104, userId: 2, name: 'Lucas', emoji: '👨', avatar: 'photos/profile_lucas.jpg', premium: true,
    image: 'photos/profile_lucas.jpg', imageEmoji: '☕',
    caption: 'Zondagmorgen pasta. Thuis koken is de beste therapie 🍝',
    likes: 93, liked: false, comments: [
      { name: 'James', emoji: '🧔', text: 'Dat ziet er heerlijk uit! 😋', time: '5u' },
      { name: 'Sofia', emoji: '👩‍🦱', text: 'Recept pls!', time: '2u' },
    ],
    daysAgo: 7, matched: false, city: 'Utrecht', age: 26,
  },
  {
    id: 105, userId: 5, name: 'Mia', emoji: '👩‍🦰', avatar: 'photos/profile_mia.jpg', premium: false,
    image: 'photos/profile_mia.jpg', imageEmoji: '🌺',
    caption: 'Zaterdagmorgen op de markt. Verse bloemen maken alles beter 🌸',
    likes: 54, liked: false, comments: [
      { name: 'Emma', emoji: '👩', text: 'Zo mooi!! 🌷', time: '6u' },
    ],
    daysAgo: 4, matched: false, city: 'Leiden', age: 25,
  },
  {
    id: 106, userId: 6, name: 'Alex', emoji: '🧑‍🦰', avatar: 'photos/profile_alex.jpg', premium: false,
    image: 'photos/profile_alex.jpg', imageEmoji: '📚',
    caption: 'Nieuwe aanwinst in mijn favoriete boekwinkel. Ik was er voor 20 minuten... 3 uur later 😅',
    likes: 38, liked: false, comments: [
      { name: 'Emma', emoji: '👩', text: 'Welk boek? 📖', time: '1u' },
      { name: 'Lucas', emoji: '👨', text: 'Typisch bookworm 😄', time: '30m' },
    ],
    daysAgo: 1, matched: false, city: 'Haarlem', age: 23,
  },
];

const MATCHES = [
  { id: 1, name: 'Emma', emoji: '👩', avatar: 'photos/profile_emma.jpg', lastMsg: 'Hoi! Leuk dat we een match hebben 😊', time: '2m', unread: 2, online: true },
  { id: 3, name: 'Sofia', emoji: '👩‍🦱', avatar: 'photos/profile_sofia.jpg', lastMsg: 'Wanneer ga jij weer hardlopen?', time: '1u', unread: 1, online: true },
  { id: 6, name: 'Alex', emoji: '🧑‍🦰', avatar: 'photos/profile_alex.jpg', lastMsg: 'Heb je dat boek al gelezen?', time: '3u', unread: 0, online: false },
];

const CHAT_HISTORY = {
  1: [
    { sent: false, text: 'Hoi! Leuk dat we een match hebben 😊', time: '14:32' },
    { sent: true, text: 'Hii! Jij ook! Ik zag je foto in het park, zo leuk!', time: '14:33' },
    { sent: false, text: 'Dankjewel! Vondelpark is mijn favoriet ☀️', time: '14:35' },
    { sent: true, text: 'Ga jij daar vaker naartoe?', time: '14:36' },
    { sent: false, text: 'Bijna elk weekend! Jij ook?', time: '14:37' },
  ],
  3: [
    { sent: false, text: 'Hey! Jij was ook aan het hardlopen vandaag?', time: '11:00' },
    { sent: true, text: 'Nee haha, maar ik was wel op de fiets 😄', time: '11:05' },
    { sent: false, text: 'Wanneer ga jij weer hardlopen?', time: '11:10' },
  ],
  6: [
    { sent: false, text: 'Heb je dat boek al gelezen?', time: 'Gisteren' },
    { sent: true, text: 'Welk boek bedoel je?', time: 'Gisteren' },
  ],
};

// ============================================================
// STATE
// ============================================================

let state = {
  currentPage: 'splash',
  activeTab: 'swipe',
  user: null,
  swipeIndex: 0,
  isDragging: false,
  startX: 0, startY: 0,
  currentX: 0, currentY: 0,
  activeCard: null,
  swipedCards: [],
  currentCommentPostId: null,
  currentChatUserId: null,
  pendingMatchUser: null,
  cameraStream: null,
  cameraFacingMode: 'user',
  capturedPhoto: null,
  matchedUserIds: [1, 3, 6],
  filtersVisible: false,
  feedLikes: {},
  feedComments: {},
  chatMessages: JSON.parse(JSON.stringify(CHAT_HISTORY)),
};

// ============================================================
// NAVIGATION
// ============================================================

function showPage(page) {
  const pages = ['splash', 'login', 'register'];
  document.querySelectorAll('.splash-screen, .page').forEach(el => {
    el.classList.remove('active');
    el.style.display = '';
  });
  if (page === 'splash') {
    document.getElementById('splash-screen').classList.add('active');
  } else {
    const el = document.getElementById(`${page}-page`);
    if (el) el.style.display = 'flex';
  }
  state.currentPage = page;
}

function switchTab(tab) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  const tabEl = document.getElementById(`tab-${tab}`);
  if (tabEl) tabEl.classList.add('active');
  const navEl = document.getElementById(`nav-${tab}`);
  if (navEl) navEl.classList.add('active');
  state.activeTab = tab;
  if (tab === 'feed') renderFeed();
  if (tab === 'matches') renderMatches();
  if (tab === 'chat') renderChatList();
}

// ============================================================
// AUTH
// ============================================================

function doLogin() {
  const email = document.getElementById('login-email').value.trim();
  const pass = document.getElementById('login-pass').value;
  if (!email || !pass) { showToast('❌ Vul alle velden in'); return; }
  state.user = { name: 'Emma', age: 24, email, premium: false };
  enterApp();
}

function doRegister() {
  const name = document.getElementById('reg-name').value.trim();
  const age  = document.getElementById('reg-age').value;
  const email= document.getElementById('reg-email').value.trim();
  const pass = document.getElementById('reg-pass').value;
  if (!name || !age || !email || !pass) { showToast('❌ Vul alle velden in'); return; }
  if (parseInt(age) < 18) { showToast('❌ Je moet 18+ zijn'); return; }
  state.user = { name, age: parseInt(age), email, premium: false };
  enterApp();
}

function enterApp() {
  document.querySelectorAll('.splash-screen, .page').forEach(el => {
    el.classList.remove('active');
    el.style.display = 'none';
  });
  document.getElementById('app').classList.remove('hidden');
  document.getElementById('own-name').textContent = `${state.user.name}, ${state.user.age}`;
  initSwipeCards();
  showToast(`✦ Welkom, ${state.user.name}!`);
}

function logout() {
  state.user = null;
  document.getElementById('app').classList.add('hidden');
  showPage('splash');
  showToast('Tot ziens! 👋');
}

// ============================================================
// SWIPE
// ============================================================

function getSwipeProfiles() {
  return PROFILES.slice(state.swipeIndex);
}

function initSwipeCards() {
  const stack = document.getElementById('cards-stack');
  stack.innerHTML = '';
  const profiles = getSwipeProfiles();
  if (profiles.length === 0) {
    renderNoMoreCards();
    return;
  }
  const toRender = profiles.slice(0, 3);
  for (let i = toRender.length - 1; i >= 0; i--) {
    const card = createSwipeCard(toRender[i], i);
    stack.appendChild(card);
  }
  setupCardDrag();
}

function createSwipeCard(profile, index) {
  const div = document.createElement('div');
  div.className = 'swipe-card';
  div.dataset.profileId = profile.id;

  const bgColors = ['linear-gradient(135deg,#e91e8c,#7c3aed)','linear-gradient(135deg,#ff6b35,#e91e8c)','linear-gradient(135deg,#7c3aed,#4f46e5)','linear-gradient(135deg,#0ea5e9,#7c3aed)','linear-gradient(135deg,#f59e0b,#e91e8c)','linear-gradient(135deg,#10b981,#0ea5e9)'];
  const bg = bgColors[profile.id % bgColors.length];

  div.innerHTML = `
    <img class="card-photo" src="${profile.avatar}" alt="${profile.name}" 
      onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
    <div class="card-photo-fallback" style="background:${bg};display:none;">
      <span style="font-size:100px">${profile.emoji}</span>
    </div>
    <div class="card-gradient"></div>
    <div class="card-photo-age">${profile.age} · ${profile.city}</div>
    <div class="card-info">
      <div class="card-name">${profile.name} ${profile.premium ? '<span style="font-size:14px;color:var(--purple-l)">⚡</span>' : ''}</div>
      <div class="card-details">
        <div class="card-detail-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>${profile.distance} weg</div>
        ${state.matchedUserIds.includes(profile.id) ? '<div class="card-detail-item" style="color:#4cfe8a">✓ Match!</div>' : ''}
      </div>
      <div class="card-tags">
        ${profile.tags.slice(0,3).map(t=>`<span class="card-tag">${t}</span>`).join('')}
      </div>
    </div>
    <div class="stamp stamp-like">LIKE</div>
    <div class="stamp stamp-nope">NOPE</div>
    <div class="stamp stamp-super">SUPER</div>
  `;

  // Tap to open profile
  div.addEventListener('click', (e) => {
    if (!state.isDragging) openUserProfile(profile.id);
  });

  return div;
}

function renderNoMoreCards() {
  const stack = document.getElementById('cards-stack');
  stack.innerHTML = `
    <div class="no-more-cards">
      <div style="font-size:64px">✦</div>
      <h3>Je hebt iedereen gezien!</h3>
      <p>Kom later terug voor nieuwe profielen in jouw buurt</p>
      <button class="refresh-cards-btn" onclick="resetCards()">Opnieuw bekijken</button>
    </div>
  `;
}

function resetCards() {
  state.swipeIndex = 0;
  state.swipedCards = [];
  initSwipeCards();
}

function getTopCard() {
  const stack = document.getElementById('cards-stack');
  return stack.querySelector('.swipe-card:last-child');
}

function setupCardDrag() {
  const card = getTopCard();
  if (!card) return;

  let startX, startY, currentX = 0, currentY = 0;
  let isDragging = false;
  let animating = false;

  function onStart(e) {
    if (animating) return;
    isDragging = true;
    state.isDragging = false;
    const point = e.touches ? e.touches[0] : e;
    startX = point.clientX;
    startY = point.clientY;
    card.style.transition = 'none';
  }

  function onMove(e) {
    if (!isDragging) return;
    e.preventDefault();
    const point = e.touches ? e.touches[0] : e;
    currentX = point.clientX - startX;
    currentY = point.clientY - startY;
    if (Math.abs(currentX) > 5 || Math.abs(currentY) > 5) state.isDragging = true;

    const rotate = currentX * 0.08;
    const scale = 1 - Math.min(Math.abs(currentX) / 1000, 0.05);
    card.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${rotate}deg) scale(${scale})`;

    // Stamp visibility
    const likeStamp  = card.querySelector('.stamp-like');
    const nopeStamp  = card.querySelector('.stamp-nope');
    const superStamp = card.querySelector('.stamp-super');
    const ratio = currentX / 120;
    const yRatio = currentY / -80;

    if (currentY < -60 && Math.abs(currentX) < 60) {
      superStamp.style.opacity = Math.min(yRatio, 1);
      likeStamp.style.opacity  = 0;
      nopeStamp.style.opacity  = 0;
    } else if (currentX > 0) {
      likeStamp.style.opacity  = Math.min(ratio, 1);
      nopeStamp.style.opacity  = 0;
      superStamp.style.opacity = 0;
    } else {
      nopeStamp.style.opacity  = Math.min(-ratio, 1);
      likeStamp.style.opacity  = 0;
      superStamp.style.opacity = 0;
    }

    // Stack cards
    const stack = document.getElementById('cards-stack');
    const cards = stack.querySelectorAll('.swipe-card');
    const progress = Math.min(Math.abs(currentX) / 150, 1);
    cards.forEach((c, i) => {
      if (c === card) return;
      const baseScale = 1 - (cards.length - 1 - i) * 0.05;
      const baseY = (cards.length - 1 - i) * 12;
      const newScale = baseScale + (1 - baseScale) * progress;
      const newY = baseY - baseY * progress;
      c.style.transform = `scale(${newScale}) translateY(${newY}px)`;
      c.style.transition = 'none';
    });
  }

  function onEnd(e) {
    if (!isDragging) return;
    isDragging = false;
    const threshold = 100;
    const swipeUp = currentY < -80 && Math.abs(currentX) < 80;

    if (swipeUp) {
      triggerSwipe('up', card, currentX, currentY);
    } else if (currentX > threshold) {
      triggerSwipe('right', card, currentX, currentY);
    } else if (currentX < -threshold) {
      triggerSwipe('left', card, currentX, currentY);
    } else {
      card.style.transition = 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)';
      card.style.transform = '';
      card.querySelectorAll('.stamp').forEach(s => s.style.opacity = 0);
      const stack = document.getElementById('cards-stack');
      stack.querySelectorAll('.swipe-card').forEach((c, i) => {
        if (c === card) return;
        c.style.transition = 'transform 0.4s ease';
        c.style.transform = '';
      });
    }
    currentX = 0; currentY = 0;
  }

  card.addEventListener('mousedown', onStart);
  card.addEventListener('touchstart', onStart, { passive: false });
  window.addEventListener('mousemove', onMove);
  window.addEventListener('touchmove', onMove, { passive: false });
  window.addEventListener('mouseup', onEnd);
  window.addEventListener('touchend', onEnd);
}

function triggerSwipe(direction, card, fromX, fromY) {
  if (!card) card = getTopCard();
  if (!card) return;

  const profileId = parseInt(card.dataset.profileId);
  const profile = PROFILES.find(p => p.id === profileId);
  state.swipedCards.push({ profileId, direction });

  let tx = 0, ty = 0, rotate = 0;
  if (direction === 'right') { tx = window.innerWidth + 200; rotate = 30; }
  else if (direction === 'left') { tx = -window.innerWidth - 200; rotate = -30; }
  else if (direction === 'up')  { tx = (fromX || 0); ty = -window.innerHeight - 200; rotate = 0; }

  card.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease';
  card.style.transform = `translate(${tx}px, ${ty}px) rotate(${rotate}deg)`;
  card.style.opacity = '0';

  if (direction === 'right' && profile) {
    if (profile.likedBack || state.matchedUserIds.includes(profileId)) {
      setTimeout(() => showMatchOverlay(profile), 400);
    } else {
      showToast(`💜 Je liket ${profile.name}!`);
    }
  } else if (direction === 'left') {
    showToast(`✕ Overgeslagen`);
  } else if (direction === 'up') {
    showToast(`⭐ Super Like gestuurd!`);
    if (profile) setTimeout(() => showMatchOverlay(profile), 400);
  }

  setTimeout(() => {
    card.remove();
    state.swipeIndex++;
    const stack = document.getElementById('cards-stack');
    // Reset remaining cards' transitions
    stack.querySelectorAll('.swipe-card').forEach((c, idx) => {
      c.style.transition = 'transform 0.3s ease';
      c.style.transform = '';
    });
    // Load next card if available
    const nextProfile = PROFILES[state.swipeIndex + 2];
    if (nextProfile) {
      const newCard = createSwipeCard(nextProfile, 0);
      stack.insertBefore(newCard, stack.firstChild);
    }
    if (stack.querySelectorAll('.swipe-card').length === 0) {
      renderNoMoreCards();
    } else {
      setupCardDrag();
    }
  }, 500);
}

function swipeCard(direction) {
  const card = getTopCard();
  if (!card) return;
  let fromX = 0, fromY = 0;
  if (direction === 'right') fromX = 100;
  if (direction === 'left') fromX = -100;
  if (direction === 'up') fromY = -100;
  triggerSwipe(direction, card, fromX, fromY);
}

function rewindCard() {
  if (state.swipedCards.length === 0) { showToast('❌ Niets om terug te spoelen'); return; }
  if (!state.user?.premium) { showPremium(); return; }
  showToast('↩️ Teruggespoeld!');
}

// ============================================================
// MATCH OVERLAY
// ============================================================

function showMatchOverlay(profile) {
  state.pendingMatchUser = profile;
  const overlay = document.getElementById('match-overlay');
  const img = document.getElementById('match-other-avatar');
  img.src = profile.avatar;
  img.onerror = () => { img.style.display='none'; };
  overlay.classList.remove('hidden');
  createFireworks();
  if (!state.matchedUserIds.includes(profile.id)) {
    state.matchedUserIds.push(profile.id);
  }
}

function closeMatch() {
  document.getElementById('match-overlay').classList.add('hidden');
  state.pendingMatchUser = null;
}

function openMatchChat() {
  closeMatch();
  if (state.pendingMatchUser) {
    openChat(state.pendingMatchUser.id);
  }
}

function createFireworks() {
  const container = document.getElementById('match-fireworks');
  container.innerHTML = '';
  const colors = ['#e91e8c','#7c3aed','#ff6b35','#4fc3f7','#4cfe8a','#f59e0b'];
  for (let i = 0; i < 40; i++) {
    const fw = document.createElement('div');
    fw.className = 'firework';
    const x = (Math.random() - 0.5) * window.innerWidth * 1.5;
    const y = (Math.random() - 0.5) * window.innerHeight * 1.5;
    fw.style.cssText = `
      left: 50%; top: 50%;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      --tx: ${x}px; --ty: ${y}px;
      animation-delay: ${Math.random() * 0.5}s;
      width: ${Math.random() * 8 + 4}px;
      height: ${Math.random() * 8 + 4}px;
    `;
    container.appendChild(fw);
  }
}

// ============================================================
// FEED
// ============================================================

function renderFeed() {
  const container = document.getElementById('feed-container');
  container.innerHTML = '';
  FEED_POSTS.forEach(post => {
    const el = createFeedPost(post);
    container.appendChild(el);
  });
}

function createFeedPost(post) {
  const daysLeft = 30 - post.daysAgo;
  const expiryPct = (daysLeft / 30) * 100;
  const isMatched = state.matchedUserIds.includes(post.userId);
  const likeCount = (state.feedLikes[post.id] ?? post.likes);
  const liked = post.liked;
  const commentCount = post.comments.length + (state.feedComments[post.id]?.length || 0);

  const div = document.createElement('div');
  div.className = 'feed-post';
  div.dataset.postId = post.id;

  div.innerHTML = `
    <div class="post-header">
      <div class="post-user" onclick="openUserProfile(${post.userId})">
        <img class="post-avatar" src="${post.avatar}" alt="${post.name}" 
          onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
        <div class="post-avatar-fallback" style="display:none; background:var(--surface2)">${post.emoji}</div>
        <div class="post-user-info">
          <span class="post-username">${post.name}, ${post.age} ${post.premium ? '<span class="premium-star">⚡</span>' : ''}</span>
          <span class="post-meta">📍 ${post.city} · ${post.daysAgo === 0 ? 'Vandaag' : post.daysAgo + 'd geleden'} · Nog ${daysLeft}d zichtbaar</span>
        </div>
      </div>
      <button class="post-more-btn">⋯</button>
    </div>
    <div class="post-image-wrap" ondblclick="toggleLike(${post.id}, this)">
      <img class="post-image" src="${post.image}" alt="Post foto"
        onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
      <div class="post-image-fallback" style="display:none; background: var(--surface2); font-size: 120px">${post.imageEmoji}</div>
      <div class="post-authentic-tag">🚫 Onbewerkt</div>
      <div class="post-expiry-bar">
        <div class="post-expiry-fill" style="width:${expiryPct}%"></div>
      </div>
    </div>
    <div class="post-actions">
      <button class="post-action-btn ${liked ? 'liked' : ''}" id="like-btn-${post.id}" onclick="toggleLike(${post.id}, this)">
        <svg viewBox="0 0 24 24" ${liked ? 'fill="currentColor"' : 'fill="none" stroke="currentColor" stroke-width="2.5"'}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        <span id="like-count-${post.id}">${likeCount}</span>
      </button>
      <button class="post-action-btn" onclick="openComments(${post.id})">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        <span>${commentCount}</span>
      </button>
      <button class="post-action-btn" onclick="sharePost(${post.id})">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
      </button>
      <button class="post-match-btn ${isMatched ? 'matched' : ''}" id="match-btn-${post.id}" onclick="feedMatch(${post.userId}, ${post.id})">
        ${isMatched ? '✓ Match' : '♡ Match'}
      </button>
    </div>
    <div class="post-likes" id="post-likes-${post.id}">${likeCount} likes</div>
    <div class="post-caption"><strong>${post.name}</strong> ${post.caption}</div>
    <div class="post-comments-preview" onclick="openComments(${post.id})">Bekijk alle ${commentCount} reacties</div>
  `;

  return div;
}

function toggleLike(postId, el) {
  const post = FEED_POSTS.find(p => p.id === postId);
  if (!post) return;
  post.liked = !post.liked;
  const delta = post.liked ? 1 : -1;
  state.feedLikes[postId] = (state.feedLikes[postId] ?? post.likes) + delta;
  post.likes = state.feedLikes[postId];

  // Update button
  const btn = document.getElementById(`like-btn-${postId}`);
  const countEl = document.getElementById(`like-count-${postId}`);
  const likesEl = document.getElementById(`post-likes-${postId}`);
  if (btn) {
    btn.classList.toggle('liked', post.liked);
    const svg = btn.querySelector('svg');
    if (svg) {
      svg.setAttribute('fill', post.liked ? 'currentColor' : 'none');
      if (!post.liked) { svg.setAttribute('stroke', 'currentColor'); svg.setAttribute('stroke-width', '2.5'); }
    }
    // Heart animation
    btn.style.transform = 'scale(1.3)';
    setTimeout(() => { btn.style.transform = ''; }, 200);
  }
  if (countEl) countEl.textContent = post.likes;
  if (likesEl) likesEl.textContent = `${post.likes} likes`;
  if (post.liked) showToast('❤️ Liked!');
}

function feedMatch(userId, postId) {
  const profile = PROFILES.find(p => p.id === userId);
  if (!profile) return;
  const btn = document.getElementById(`match-btn-${postId}`);
  if (state.matchedUserIds.includes(userId)) {
    showToast(`✓ Al een match met ${profile.name}!`);
    return;
  }
  state.matchedUserIds.push(userId);
  if (btn) { btn.textContent = '✓ Match'; btn.classList.add('matched'); }
  setTimeout(() => showMatchOverlay(profile), 200);
}

function sharePost(postId) {
  showToast('🔗 Link gekopieerd!');
}

// ============================================================
// COMMENTS
// ============================================================

function openComments(postId) {
  state.currentCommentPostId = postId;
  const post = FEED_POSTS.find(p => p.id === postId);
  const extraComments = state.feedComments[postId] || [];
  const allComments = [...post.comments, ...extraComments];

  const list = document.getElementById('comments-list');
  list.innerHTML = allComments.map(c => `
    <div class="comment-item">
      <div class="comment-avatar" style="background:var(--surface2)">${c.emoji || '👤'}</div>
      <div class="comment-body">
        <div class="comment-name">${c.name}</div>
        <div class="comment-text">${c.text}</div>
        <div class="comment-time">${c.time}</div>
      </div>
    </div>
  `).join('');

  document.getElementById('comments-overlay').classList.remove('hidden');
}

function postComment() {
  const input = document.getElementById('comment-input');
  const text = input.value.trim();
  if (!text || !state.currentCommentPostId) return;
  const comment = { name: state.user?.name || 'Jij', emoji: '👤', text, time: 'nu' };
  if (!state.feedComments[state.currentCommentPostId]) {
    state.feedComments[state.currentCommentPostId] = [];
  }
  state.feedComments[state.currentCommentPostId].push(comment);

  const list = document.getElementById('comments-list');
  const el = document.createElement('div');
  el.className = 'comment-item';
  el.innerHTML = `
    <div class="comment-avatar" style="background:var(--grad1)">👤</div>
    <div class="comment-body">
      <div class="comment-name">${comment.name}</div>
      <div class="comment-text">${comment.text}</div>
      <div class="comment-time">nu</div>
    </div>
  `;
  list.appendChild(el);
  list.scrollTop = list.scrollHeight;
  input.value = '';
  showToast('💬 Reactie geplaatst!');
}

// ============================================================
// USER PROFILE OVERLAY
// ============================================================

function openUserProfile(userId) {
  const profile = PROFILES.find(p => p.id === userId);
  if (!profile) return;
  const isMatched = state.matchedUserIds.includes(userId);
  const bgColors = ['linear-gradient(135deg,#e91e8c,#7c3aed)','linear-gradient(135deg,#ff6b35,#e91e8c)','linear-gradient(135deg,#7c3aed,#4f46e5)','linear-gradient(135deg,#0ea5e9,#7c3aed)','linear-gradient(135deg,#f59e0b,#e91e8c)','linear-gradient(135deg,#10b981,#0ea5e9)'];
  const bg = bgColors[profile.id % bgColors.length];

  const content = document.getElementById('user-profile-content');
  content.innerHTML = `
    <div class="upo-photo-wrap">
      <img class="upo-photo" src="${profile.avatar}" alt="${profile.name}"
        onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
      <div class="upo-photo-fallback" style="background:${bg};display:none;">${profile.emoji}</div>
    </div>
    <div class="upo-header">
      <img class="upo-avatar" src="${profile.avatar}" alt="${profile.name}"
        onerror="this.src=''; this.style.background='${bg}';" />
      <div class="upo-info">
        <div class="upo-name">${profile.name}, ${profile.age} ${profile.premium ? '⚡' : ''}</div>
        <div class="upo-details">📍 ${profile.city} · ${profile.distance} weg</div>
      </div>
    </div>
    <p class="upo-bio">${profile.bio}</p>
    <div class="upo-tags">
      ${profile.tags.map(t=>`<span class="upo-tag">${t}</span>`).join('')}
    </div>
    ${profile.photos.length > 0 ? `
    <h4 style="font-size:13px;color:var(--text-s);text-transform:uppercase;letter-spacing:1px;margin-bottom:8px">Foto's (${profile.photos.length})</h4>
    <div class="upo-photos-grid">
      ${profile.photos.map((p,i)=>`
        <div class="upo-photo-item" style="background:${bg}">
          <img src="${p}" alt="Foto" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"/>
          <div class="upo-photo-fallback2" style="display:none">${profile.emoji}</div>
        </div>
      `).join('')}
    </div>
    ` : ''}
    <div style="height:16px"></div>
    ${isMatched ? `
      <div class="upo-matched-msg">✓ Jullie zijn een match! Je kunt nu chatten.</div>
      <div style="height:12px"></div>
      <div class="upo-actions">
        <button class="upo-like-btn" onclick="openChat(${userId}); closeOverlay('user-profile-overlay')">
          💬 Stuur bericht
        </button>
      </div>
    ` : `
      <div class="upo-actions">
        <button class="upo-like-btn" onclick="matchFromProfile(${userId})">
          ❤️ Match
        </button>
        <button class="upo-dislike-btn" onclick="closeOverlay('user-profile-overlay')">
          ✕
        </button>
      </div>
    `}
  `;

  document.getElementById('user-profile-overlay').classList.remove('hidden');
}

function matchFromProfile(userId) {
  const profile = PROFILES.find(p => p.id === userId);
  if (!profile) return;
  closeOverlay('user-profile-overlay');
  state.matchedUserIds.push(userId);
  setTimeout(() => showMatchOverlay(profile), 300);
}

// ============================================================
// MATCHES TAB
// ============================================================

function renderMatches() {
  renderNewMatches();
  renderMatchList();
}

function renderNewMatches() {
  const row = document.getElementById('new-matches-row');
  const matchedProfiles = PROFILES.filter(p => state.matchedUserIds.includes(p.id));
  row.innerHTML = matchedProfiles.map(p => `
    <div class="new-match-item" onclick="openChat(${p.id})">
      <div class="new-match-avatar-wrap">
        <img class="new-match-avatar" src="${p.avatar}" alt="${p.name}"
          onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
        <div class="new-match-avatar-fallback" style="display:none;background:var(--surface2)">${p.emoji}</div>
        <div class="new-match-online"></div>
      </div>
      <span class="new-match-name">${p.name}</span>
    </div>
  `).join('');
}

function renderMatchList() {
  const list = document.getElementById('matches-list');
  const matchedProfiles = PROFILES.filter(p => state.matchedUserIds.includes(p.id));
  list.innerHTML = matchedProfiles.map(p => {
    const match = MATCHES.find(m => m.id === p.id);
    return `
      <div class="match-item" onclick="openChat(${p.id})">
        <img class="match-item-avatar" src="${p.avatar}" alt="${p.name}"
          onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
        <div class="match-item-avatar-fallback" style="display:none;background:var(--surface2)">${p.emoji}</div>
        <div class="match-item-info">
          <div class="match-item-name">${p.name}</div>
          <div class="match-item-msg">${match?.lastMsg || 'Zeg hoi! 👋'}</div>
        </div>
        <div class="match-item-time">${match?.time || 'nu'}</div>
      </div>
    `;
  }).join('');
}

// ============================================================
// CHAT
// ============================================================

function renderChatList() {
  const list = document.getElementById('chat-list');
  const matchedProfiles = PROFILES.filter(p => state.matchedUserIds.includes(p.id));
  list.innerHTML = matchedProfiles.map(p => {
    const match = MATCHES.find(m => m.id === p.id);
    const msgs = state.chatMessages[p.id] || [];
    const lastMsg = msgs.length > 0 ? msgs[msgs.length-1].text : 'Zeg hoi! 👋';
    const unread = match?.unread || 0;
    return `
      <div class="chat-item" onclick="openChat(${p.id})">
        <div class="chat-avatar" style="position:relative">
          <img src="${p.avatar}" alt="${p.name}" onerror="this.style.display='none'; this.parentElement.querySelector('.chat-avatar-fallback').style.display='flex';" />
          <div class="chat-avatar-fallback" style="display:none;background:var(--surface2)">${p.emoji}</div>
          <div class="chat-online"></div>
        </div>
        <div class="chat-info">
          <div class="chat-name">${p.name}</div>
          <div class="chat-preview">${lastMsg}</div>
        </div>
        <div class="chat-meta">
          <span class="chat-time">${match?.time || 'nu'}</span>
          ${unread > 0 ? `<span class="chat-unread">${unread}</span>` : ''}
        </div>
      </div>
    `;
  }).join('');
}

function openChat(userId) {
  const profile = PROFILES.find(p => p.id === userId);
  if (!profile) return;
  state.currentChatUserId = userId;

  const header = document.getElementById('chat-header-info');
  header.innerHTML = `
    <div class="name">${profile.name}, ${profile.age}</div>
  `;

  const messages = state.chatMessages[userId] || [];
  const msgContainer = document.getElementById('chat-messages');
  msgContainer.innerHTML = messages.map(m => `
    <div class="msg ${m.sent ? 'sent' : 'received'}">
      <div>
        <div class="msg-bubble">${m.text}</div>
        <div class="msg-time">${m.time}</div>
      </div>
    </div>
  `).join('');
  msgContainer.scrollTop = msgContainer.scrollHeight;

  // Clear unread
  const match = MATCHES.find(m => m.id === userId);
  if (match) match.unread = 0;
  updateChatBadge();

  document.getElementById('chat-window-overlay').classList.remove('hidden');
}

function sendMessage() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text || !state.currentChatUserId) return;

  const msg = { sent: true, text, time: new Date().toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' }) };
  if (!state.chatMessages[state.currentChatUserId]) {
    state.chatMessages[state.currentChatUserId] = [];
  }
  state.chatMessages[state.currentChatUserId].push(msg);

  const container = document.getElementById('chat-messages');
  const el = document.createElement('div');
  el.className = 'msg sent';
  el.innerHTML = `<div><div class="msg-bubble">${text}</div><div class="msg-time">${msg.time}</div></div>`;
  container.appendChild(el);
  container.scrollTop = container.scrollHeight;
  input.value = '';

  // Simulated reply
  const profile = PROFILES.find(p => p.id === state.currentChatUserId);
  const replies = [
    'Haha dat is zo leuk! 😄', 'Echt? Dat wist ik niet!', 'We moeten zeker afspreken 😊',
    '❤️', 'Dat klinkt geweldig!', 'Hoe laat dan?', 'Ik ook! 🎉',
  ];
  setTimeout(() => {
    const reply = { sent: false, text: replies[Math.floor(Math.random() * replies.length)], time: new Date().toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' }) };
    state.chatMessages[state.currentChatUserId].push(reply);
    const replyEl = document.createElement('div');
    replyEl.className = 'msg received';
    replyEl.innerHTML = `<div><div class="msg-bubble">${reply.text}</div><div class="msg-time">${reply.time}</div></div>`;
    container.appendChild(replyEl);
    container.scrollTop = container.scrollHeight;
  }, 1000 + Math.random() * 1500);
}

function updateChatBadge() {
  const totalUnread = MATCHES.reduce((sum, m) => sum + (m.unread || 0), 0);
  const badge = document.getElementById('chat-badge');
  if (badge) {
    badge.textContent = totalUnread;
    badge.style.display = totalUnread > 0 ? 'flex' : 'none';
  }
}

// ============================================================
// CAMERA
// ============================================================

function openCamera() {
  document.getElementById('camera-overlay').classList.remove('hidden');
  document.getElementById('camera-viewfinder').style.display = 'block';
  document.getElementById('photo-preview').classList.add('hidden');
  startCamera();
}

async function startCamera() {
  try {
    if (state.cameraStream) {
      state.cameraStream.getTracks().forEach(t => t.stop());
    }
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: state.cameraFacingMode, width: { ideal: 1280 }, height: { ideal: 720 } },
      audio: false
    });
    state.cameraStream = stream;
    const video = document.getElementById('camera-video');
    video.srcObject = stream;
  } catch (err) {
    showToast('📷 Camera niet beschikbaar — gebruik een echt apparaat');
    closeCamera();
  }
}

function switchCamera() {
  state.cameraFacingMode = state.cameraFacingMode === 'user' ? 'environment' : 'user';
  startCamera();
}

function capturePhoto() {
  const video = document.getElementById('camera-video');
  const canvas = document.getElementById('photo-canvas');
  canvas.width = video.videoWidth || 640;
  canvas.height = video.videoHeight || 480;
  const ctx = canvas.getContext('2d');
  if (state.cameraFacingMode === 'user') {
    ctx.scale(-1, 1);
    ctx.drawImage(video, -canvas.width, 0);
  } else {
    ctx.drawImage(video, 0, 0);
  }
  state.capturedPhoto = canvas.toDataURL('image/jpeg', 0.9);

  document.getElementById('camera-viewfinder').style.display = 'none';
  const preview = document.getElementById('photo-preview');
  preview.classList.remove('hidden');
  document.getElementById('preview-img').src = state.capturedPhoto;

  // Flash effect
  const flash = document.createElement('div');
  flash.style.cssText = 'position:fixed;inset:0;background:#fff;z-index:9999;pointer-events:none;animation:flashOut 0.3s ease forwards;';
  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), 300);
}

function retakePhoto() {
  state.capturedPhoto = null;
  document.getElementById('camera-viewfinder').style.display = 'block';
  document.getElementById('photo-preview').classList.add('hidden');
  startCamera();
}

function postPhoto() {
  closeCamera();
  showToast('✦ Foto geplaatst! Zichtbaar voor 1 maand.');
  // Update quota UI
  const fill = document.querySelector('.quota-fill');
  const count = document.querySelector('.quota-count');
  if (fill) fill.style.width = '100%';
  if (count) count.textContent = '1 / 1';
}

function closeCamera() {
  if (state.cameraStream) {
    state.cameraStream.getTracks().forEach(t => t.stop());
    state.cameraStream = null;
  }
  document.getElementById('camera-overlay').classList.add('hidden');
}

// ============================================================
// OVERLAYS
// ============================================================

function closeOverlay(id) {
  document.getElementById(id).classList.add('hidden');
  if (id === 'camera-overlay') closeCamera();
}

function showPremium() {
  document.getElementById('premium-overlay').classList.remove('hidden');
}

function upgradePremium() {
  showToast('⚡ Premium geactiveerd! (demo)');
  state.user.premium = true;
  closeOverlay('premium-overlay');
  const badge = document.querySelector('.avatar-badge');
  if (badge) { badge.textContent = 'PREMIUM ⚡'; badge.classList.add('premium'); }
  const count = document.querySelector('.quota-count');
  if (count) count.textContent = '0 / 2';
}

// Premium plan selection
document.querySelectorAll('.plan-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.plan-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
  });
});

// ============================================================
// FILTER PANEL
// ============================================================

function toggleFilters() {
  state.filtersVisible = !state.filtersVisible;
  const panel = document.getElementById('filter-panel');
  panel.classList.toggle('hidden', !state.filtersVisible);
}

// ============================================================
// TOAST
// ============================================================

let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2500);
}

// ============================================================
// FLASH KEYFRAME
// ============================================================

const flashStyle = document.createElement('style');
flashStyle.textContent = `@keyframes flashOut { from { opacity:1; } to { opacity:0; } }`;
document.head.appendChild(flashStyle);

// ============================================================
// CLOSE OVERLAY ON BACKDROP CLICK
// ============================================================

document.querySelectorAll('.overlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeOverlay(overlay.id);
    }
  });
});

// ============================================================
// INIT
// ============================================================

showPage('splash');
updateChatBadge();
