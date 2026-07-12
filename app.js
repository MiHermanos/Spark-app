/* ============================================================
   SPARK — App Logic v2 (Drag Physics, Lightbox, Watermarked Camera)
   ============================================================ */

// 1. STATE MANAGEMENT (State persistence in localStorage)
let state = {
  user: {
    name: "Emma",
    age: 24,
    city: "Amsterdam",
    email: "emma@spark.com",
    premium: false,
    photos: [], // Array of { id, url, timestamp }
    weeklyUploadCount: 0,
    lastUploadTime: null,
    trustScore: 4, // consistent posts tracker
    missedWeeks: 0
  },
  mockUsers: [
    {
      id: "james",
      name: "James",
      age: 26,
      city: "Amsterdam",
      bio: "Unfiltered coffee & unedited moments. Looking for someone genuine.",
      tags: ["Music", "Coffee", "Vinyl"],
      photo: "photos/profile_james.jpg",
      premium: true,
      trustScore: 5,
      missedWeeks: 0,
      photos: [
        { url: "photos/profile_james.jpg", timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000 },
        { url: "photos/profile_photos_grid_1783879993408.jpg", timestamp: Date.now() - 15 * 24 * 60 * 60 * 1000 }
      ]
    },
    {
      id: "sofia",
      name: "Sofia",
      age: 23,
      city: "Amsterdam",
      bio: "Just graduated! Out in the wild. Real captures only.",
      tags: ["Art", "Hiking", "Books"],
      photo: "photos/profile_sofia.jpg",
      premium: false,
      trustScore: 4,
      missedWeeks: 0,
      photos: [
        { url: "photos/profile_sofia.jpg", timestamp: Date.now() - 6 * 24 * 60 * 60 * 1000 }
      ]
    },
    {
      id: "lucas",
      name: "Lucas",
      age: 27,
      city: "Amsterdam",
      bio: "Exploring the streets of Amsterdam. Capture the moment.",
      tags: ["Photography", "Cycling", "Indie"],
      photo: "photos/profile_lucas.jpg",
      premium: false,
      trustScore: 2,
      missedWeeks: 1, // On break
      photos: [
        { url: "photos/profile_lucas.jpg", timestamp: Date.now() - 12 * 24 * 60 * 60 * 1000 }
      ]
    },
    {
      id: "mia",
      name: "Mia",
      age: 25,
      city: "Rotterdam",
      bio: "Design is life. Pure, unedited architectural wanders.",
      tags: ["Museums", "Design", "Foodie"],
      photo: "photos/profile_mia.jpg",
      premium: true,
      trustScore: 5,
      missedWeeks: 0,
      photos: [
        { url: "photos/profile_mia.jpg", timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000 }
      ]
    },
    {
      id: "alex",
      name: "Alex",
      age: 28,
      city: "Groningen",
      bio: "Living slow, enjoying fast. Unfiltered sunset enthusiast.",
      tags: ["Running", "Cooking", "Nature"],
      photo: "photos/profile_alex.jpg",
      premium: false,
      trustScore: 3,
      missedWeeks: 0,
      photos: [
        { url: "photos/profile_alex.jpg", timestamp: Date.now() - 9 * 24 * 60 * 60 * 1000 }
      ]
    }
  ],
  swipedList: {}, // userId -> 'like' | 'dislike' | 'superlike'
  matches: [], // Array of matched userIds
  chats: {
    // userId -> array of messages
    james: [
      { sender: 'other', text: "Hey Emma! Love your latest picture. Real vibe!", time: "10:32 AM" }
    ]
  },
  premiumSelectedPrice: 6.99,
  premiumSelectedPlan: "3 Months",
  currentActiveTab: "swipe"
};

// LocalStorage helpers
function saveToLocalStorage() {
  localStorage.setItem("spark_app_state", JSON.stringify(state));
}
function loadFromLocalStorage() {
  const stored = localStorage.getItem("spark_app_state");
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      // Clean merge: protect fresh mockUsers datasets while loading settings
      state.user = { ...state.user, ...parsed.user };
      state.swipedList = parsed.swipedList || {};
      state.matches = parsed.matches || [];
      state.chats = parsed.chats || {};
      state.premiumSelectedPrice = parsed.premiumSelectedPrice || 6.99;
      state.premiumSelectedPlan = parsed.premiumSelectedPlan || "3 Months";
    } catch (e) {
      console.error("Error parsing stored state", e);
    }
  }
}

// 2. LIFECYCLE & INITS
document.addEventListener("DOMContentLoaded", () => {
  loadFromLocalStorage();
  initApp();
  setupKeyboardControls();
});

function initApp() {
  // Sync inputs with user state
  document.getElementById("settings-city").value = state.user.city;
  document.getElementById("own-location-display").innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
    ${state.user.city}
  `;
  document.getElementById("swipe-location-label").textContent = state.user.city;

  updateOwnProfileView();
  renderSwipeStack();
  renderFeed();
  renderMatchesAndChats();
}

// Show specific authentication or main pages
function showPage(pageId) {
  document.querySelectorAll(".page, .splash-screen").forEach(p => p.classList.remove("active-page", "active"));
  if (pageId === "splash") {
    document.getElementById("splash-screen").classList.add("active");
  } else if (pageId === "login") {
    document.getElementById("login-page").classList.add("active-page");
  } else if (pageId === "register") {
    document.getElementById("register-page").classList.add("active-page");
  } else if (pageId === "app") {
    document.getElementById("app").classList.remove("hidden");
    switchTab("swipe");
  }
}

function doLogin() {
  const email = document.getElementById("login-email").value.trim();
  const pass = document.getElementById("login-pass").value.trim();
  if (!email || !pass) {
    showToast("Please enter email and password");
    return;
  }
  showToast("Logged in successfully!");
  showPage("app");
}

function doRegister() {
  const name = document.getElementById("reg-name").value.trim();
  const age = parseInt(document.getElementById("reg-age").value.trim());
  const city = document.getElementById("reg-city").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const pass = document.getElementById("reg-pass").value.trim();

  if (!name || !age || !city || !email || !pass) {
    showToast("All fields are required");
    return;
  }
  if (age < 18) {
    showToast("You must be 18+ to join Spark");
    return;
  }

  // Update user state
  state.user.name = name;
  state.user.age = age;
  state.user.city = city;
  state.user.email = email;
  state.user.photos = [];
  state.user.weeklyUploadCount = 0;
  state.user.lastUploadTime = null;
  state.user.premium = false;

  saveToLocalStorage();
  initApp();
  showToast("Welcome to Spark!");
  showPage("app");
}

function logout() {
  localStorage.removeItem("spark_app_state");
  location.reload();
}

// Tab Switching
function switchTab(tabId) {
  state.currentActiveTab = tabId;
  document.querySelectorAll(".tab-content").forEach(t => t.classList.remove("active"));
  document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));

  document.getElementById(`tab-${tabId}`).classList.add("active");
  document.getElementById(`nav-${tabId}`).classList.add("active");

  if (tabId === "swipe") renderSwipeStack();
  if (tabId === "feed") renderFeed();
  if (tabId === "matches" || tabId === "chat") renderMatchesAndChats();
  if (tabId === "profile") updateOwnProfileView();
}

// 3. DRAG PHYSICS SWIPE IMPLEMENTATION
let dragStartX = 0;
let dragStartY = 0;
let dragMoveX = 0;
let dragMoveY = 0;
let isDragging = false;
let activeCardElement = null;

function setupSwipeGestures(cardEl) {
  cardEl.addEventListener("mousedown", dragStart);
  cardEl.addEventListener("touchstart", dragStart, { passive: true });

  function dragStart(e) {
    if (e.target.closest("button") || e.target.closest(".card-tag")) return; // Don't drag on buttons or tags
    isDragging = true;
    activeCardElement = cardEl;
    cardEl.classList.add("dragging");

    const clientX = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === "touchstart" ? e.touches[0].clientY : e.clientY;

    dragStartX = clientX;
    dragStartY = clientY;

    document.addEventListener("mousemove", dragMove);
    document.addEventListener("touchmove", dragMove, { passive: false });
    document.addEventListener("mouseup", dragEnd);
    document.addEventListener("touchend", dragEnd);
  }

  function dragMove(e) {
    if (!isDragging || activeCardElement !== cardEl) return;
    if (e.type === "touchmove") e.preventDefault(); // Prevents page scrolling while dragging card

    const clientX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === "touchmove" ? e.touches[0].clientY : e.clientY;

    dragMoveX = clientX - dragStartX;
    dragMoveY = clientY - dragStartY;

    // Physics calculations
    const rot = dragMoveX * 0.08; // slightly rotate as you drag left/right
    cardEl.style.transform = `translate(${dragMoveX}px, ${dragMoveY}px) rotate(${rot}deg)`;

    // Visual indicators (Stamps) opacity changes based on distance
    const stampLike = cardEl.querySelector(".stamp-like");
    const stampNope = cardEl.querySelector(".stamp-nope");
    const stampSuper = cardEl.querySelector(".stamp-super");

    if (dragMoveX > 40) {
      stampLike.style.opacity = Math.min(1, (dragMoveX - 40) / 100);
      stampNope.style.opacity = 0;
      stampSuper.style.opacity = 0;
    } else if (dragMoveX < -40) {
      stampNope.style.opacity = Math.min(1, (-dragMoveX - 40) / 100);
      stampLike.style.opacity = 0;
      stampSuper.style.opacity = 0;
    } else if (dragMoveY < -40) {
      stampSuper.style.opacity = Math.min(1, (-dragMoveY - 40) / 100);
      stampLike.style.opacity = 0;
      stampNope.style.opacity = 0;
    } else {
      stampLike.style.opacity = 0;
      stampNope.style.opacity = 0;
      stampSuper.style.opacity = 0;
    }
  }

  function dragEnd() {
    if (!isDragging) return;
    isDragging = false;
    cardEl.classList.remove("dragging");

    document.removeEventListener("mousemove", dragMove);
    document.removeEventListener("touchmove", dragMove);
    document.removeEventListener("mouseup", dragEnd);
    document.removeEventListener("touchend", dragEnd);

    const swipeThreshold = 120;

    if (dragMoveX > swipeThreshold) {
      // Like
      completeSwipe(cardEl, "right");
    } else if (dragMoveX < -swipeThreshold) {
      // Nope
      completeSwipe(cardEl, "left");
    } else if (dragMoveY < -swipeThreshold) {
      // Superlike
      completeSwipe(cardEl, "up");
    } else {
      // Reset card position
      cardEl.style.transform = "";
      cardEl.querySelectorAll(".stamp").forEach(s => s.style.opacity = 0);
    }
    dragMoveX = 0;
    dragMoveY = 0;
  }
}

function completeSwipe(cardEl, direction) {
  const userId = cardEl.dataset.userid;
  
  if (direction === "right") {
    cardEl.style.transform = `translate(600px, ${dragMoveY}px) rotate(45deg)`;
    handleSwipeAction(userId, "like");
  } else if (direction === "left") {
    cardEl.style.transform = `translate(-600px, ${dragMoveY}px) rotate(-45deg)`;
    handleSwipeAction(userId, "dislike");
  } else if (direction === "up") {
    cardEl.style.transform = `translate(${dragMoveX}px, -800px) rotate(0deg)`;
    handleSwipeAction(userId, "superlike");
  }

  setTimeout(() => {
    cardEl.remove();
    renderSwipeStack(); // Keep stack rendering healthy
  }, 300);
}

// Swipe programmatic actions (Buttons fallback)
function swipeCard(direction) {
  const stack = document.getElementById("cards-stack");
  const card = stack.querySelector(".swipe-card");
  if (!card) return;

  const stamp = card.querySelector(direction === "right" ? ".stamp-like" : direction === "left" ? ".stamp-nope" : ".stamp-super");
  if (stamp) stamp.style.opacity = 1;

  if (direction === "right") {
    card.style.transform = "translate(600px, 0) rotate(45deg)";
    setTimeout(() => {
      handleSwipeAction(card.dataset.userid, "like");
      card.remove();
      renderSwipeStack();
    }, 250);
  } else if (direction === "left") {
    card.style.transform = "translate(-600px, 0) rotate(-45deg)";
    setTimeout(() => {
      handleSwipeAction(card.dataset.userid, "dislike");
      card.remove();
      renderSwipeStack();
    }, 250);
  } else if (direction === "up") {
    card.style.transform = "translate(0, -800px) rotate(0)";
    setTimeout(() => {
      handleSwipeAction(card.dataset.userid, "superlike");
      card.remove();
      renderSwipeStack();
    }, 250);
  }
}

// Rewind action
function rewindCard() {
  const swipedEntries = Object.entries(state.swipedList);
  if (swipedEntries.length === 0) {
    showToast("Nothing to rewind!");
    return;
  }

  if (!state.user.premium) {
    showPremium();
    showToast("Rewind is a Premium feature");
    return;
  }

  const lastEntry = swipedEntries[swipedEntries.length - 1];
  const lastUserId = lastEntry[0];
  delete state.swipedList[lastUserId];

  // Remove matching history if matched
  state.matches = state.matches.filter(m => m !== lastUserId);

  saveToLocalStorage();
  renderSwipeStack();
  showToast("Rewound last action!");
}

// Keyboards arrow key listener
function setupKeyboardControls() {
  document.addEventListener("keydown", (e) => {
    if (state.currentActiveTab !== "swipe") return;
    if (document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA") return;

    if (e.key === "ArrowLeft") {
      swipeCard("left");
    } else if (e.key === "ArrowRight") {
      swipeCard("right");
    } else if (e.key === "ArrowUp") {
      swipeCard("up");
    }
  });
}

// Handle Swipe logic calculations & match discovery
function handleSwipeAction(userId, action) {
  state.swipedList[userId] = action;

  if (action === "like" || action === "superlike") {
    // Simulated Match chance: 50% for James/Sofia/Mia/Lucas/Alex if you like them
    const matched = Math.random() > 0.4;
    if (matched) {
      state.matches.push(userId);
      if (!state.chats[userId]) state.chats[userId] = [];
      
      // Auto welcome message from match
      const mUser = state.mockUsers.find(u => u.id === userId);
      state.chats[userId].push({
        sender: "other",
        text: `Hey! Thanks for the spark. How are you?`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });

      setTimeout(() => {
        triggerMatchCelebration(userId);
      }, 500);
    }
  }

  saveToLocalStorage();
}

// 4. RENDER SWIPE DISCOVER STACK (Filters by city & age)
function renderSwipeStack() {
  const stackContainer = document.getElementById("cards-stack");
  stackContainer.innerHTML = "";

  const ageMin = parseInt(document.getElementById("age-min").value);
  const ageMax = parseInt(document.getElementById("age-max").value);

  // Filter users by: 1) location matching user's current city, 2) age range, 3) not already swiped
  const filtered = state.mockUsers.filter(u => {
    const isSwiped = state.swipedList[u.id] !== undefined;
    const sameCity = u.city.trim().toLowerCase() === state.user.city.trim().toLowerCase();
    const ageOk = u.age >= ageMin && u.age <= ageMax;
    return !isSwiped && sameCity && ageOk;
  });

  if (filtered.length === 0) {
    stackContainer.innerHTML = `
      <div class="no-more-cards">
        <h3>That's everyone!</h3>
        <p>There are no more active users around ${state.user.city} matching your filters. Try expanding your age filters or updating your city in profile settings.</p>
        <button class="refresh-cards-btn" onclick="resetSwipes()">Search Again</button>
      </div>
    `;
    return;
  }

  filtered.forEach((user, index) => {
    // Render up to top 3 cards in stack for performance
    if (index >= 3) return;

    const card = document.createElement("div");
    card.className = "swipe-card";
    card.dataset.userid = user.id;
    card.style.zIndex = 10 - index;

    // Verification tags
    let trustTag = "";
    if (user.trustScore >= 4) {
      trustTag = `<span class="trust-score-badge">Verified Real ✓</span>`;
    } else if (user.missedWeeks > 0) {
      trustTag = `<span class="break-badge">on break</span>`;
    }

    // Photo expiry logic tags
    const mainPhoto = user.photos[0] || { url: user.photo, timestamp: Date.now() };
    const daysLeft = Math.max(1, Math.ceil((30 * 24 * 60 * 60 * 1000 - (Date.now() - mainPhoto.timestamp)) / (24 * 60 * 60 * 1000)));

    card.innerHTML = `
      <img src="${mainPhoto.url}" class="card-photo" alt="${user.name}" onclick="openLightbox('${mainPhoto.url}')" onerror="this.src='photos/profile_photos_grid_1783879993408.jpg'" />
      <div class="card-photo-age">${daysLeft}d left</div>
      <div class="card-gradient"></div>
      <div class="card-info">
        <div style="display:flex; align-items:center; gap:8px;">
          <h2 class="card-name">${user.name}, ${user.age}</h2>
          ${trustTag}
        </div>
        <div class="card-details">
          <div class="card-detail-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="13" height="13"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span>${user.city}</span>
          </div>
          <div class="card-detail-item">
            <span>${user.bio}</span>
          </div>
        </div>
        <div class="card-tags">
          ${user.tags.map(t => `<span class="card-tag">${t}</span>`).join("")}
        </div>
      </div>
      <div class="stamp stamp-like">LIKE</div>
      <div class="stamp stamp-nope">NOPE</div>
      <div class="stamp stamp-super">SUPER</div>
    `;

    stackContainer.appendChild(card);
    setupSwipeGestures(card);
  });
}

function resetSwipes() {
  state.swipedList = {};
  saveToLocalStorage();
  renderSwipeStack();
  showToast("Discover stack refreshed!");
}

// 5. RENDER INSTAGRAM-LIKE FEED TAB
function renderFeed() {
  const container = document.getElementById("feed-container");
  container.innerHTML = "";

  // Combine user photos and mock user photos in a timeline
  const feedItems = [];

  // Add mock users' latest photos
  state.mockUsers.forEach(u => {
    u.photos.forEach(p => {
      feedItems.push({
        userId: u.id,
        userName: u.name,
        userAvatar: u.photo,
        premium: u.premium,
        trustScore: u.trustScore,
        missedWeeks: u.missedWeeks,
        photoUrl: p.url,
        timestamp: p.timestamp,
        likesCount: Math.floor(Math.random() * 50) + 10,
        comments: [
          { name: "Sofia", text: "Love this real vibe!" },
          { name: "Lucas", text: "Nice spot!" }
        ],
        liked: false
      });
    });
  });

  // Add current user's live captures
  state.user.photos.forEach(p => {
    feedItems.push({
      userId: "me",
      userName: `${state.user.name} (You)`,
      userAvatar: state.user.photos[0] ? state.user.photos[0].url : "photos/profile_emma.jpg",
      premium: state.user.premium,
      trustScore: state.user.trustScore,
      missedWeeks: state.user.missedWeeks,
      photoUrl: p.url,
      timestamp: p.timestamp,
      likesCount: 0,
      comments: [],
      liked: false
    });
  });

  // Sort by newest first
  feedItems.sort((a,b) => b.timestamp - a.timestamp);

  if (feedItems.length === 0) {
    container.innerHTML = `<div class="no-photos-msg"><p>No photos posted recently.</p></div>`;
    return;
  }

  feedItems.forEach((post, index) => {
    const postEl = document.createElement("div");
    postEl.className = "feed-post";

    const daysLeft = Math.max(1, Math.ceil((30 * 24 * 60 * 60 * 1000 - (Date.now() - post.timestamp)) / (24 * 60 * 60 * 1000)));

    let trustBadge = "";
    if (post.trustScore >= 4) {
      trustBadge = `<span class="trust-score-badge">Verified Real ✓</span>`;
    } else if (post.missedWeeks > 0) {
      trustBadge = `<span class="break-badge">on break</span>`;
    }

    // Match helper action configuration
    let matchButtonHTML = "";
    if (post.userId !== "me") {
      const isMatched = state.matches.includes(post.userId);
      const btnText = isMatched ? "Message" : "Match";
      const btnClass = isMatched ? "post-match-btn matched" : "post-match-btn";
      matchButtonHTML = `<button class="${btnClass}" onclick="handleFeedMatch(this, '${post.userId}')">${btnText}</button>`;
    }

    const premiumStar = post.premium ? `<span class="premium-star">✦</span>` : "";

    postEl.innerHTML = `
      <div class="post-header">
        <div class="post-user" onclick="${post.userId !== 'me' ? `openUserProfile('${post.userId}')` : `switchTab('profile')`}">
          <img src="${post.userAvatar}" class="post-avatar" alt="${post.userName}" onerror="this.src='photos/profile_photos_grid_1783879993408.jpg'" />
          <div class="post-user-info">
            <span class="post-username">${post.userName} ${premiumStar}</span>
            <span class="post-meta">${daysLeft}d left · ${trustBadge}</span>
          </div>
        </div>
      </div>
      <div class="post-image-wrap" onclick="openLightbox('${post.photoUrl}')">
        <img src="${post.photoUrl}" class="post-image" alt="Post photo" onerror="this.src='photos/profile_photos_grid_1783879993408.jpg'" />
        <span class="photo-expiry-tag">${daysLeft}d left</span>
        <span class="post-authentic-tag">🚫 Unedited · Live</span>
      </div>
      <div class="post-actions">
        <button class="post-action-btn ${post.liked ? 'liked' : ''}" onclick="toggleLikePost(this, ${index})">
          <svg viewBox="0 0 24 24" fill="${post.liked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          <span>Like</span>
        </button>
        <button class="post-action-btn" onclick="openComments('${post.userId}')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          <span>Comment</span>
        </button>
        ${matchButtonHTML}
      </div>
      <div class="post-likes">${post.likesCount} likes</div>
      <div class="post-caption"><strong>${post.userName}</strong> captured live moment. Real is beautiful!</div>
      <div class="post-comments-preview" onclick="openComments('${post.userId}')">
        View all ${post.comments.length} comments
      </div>
    `;

    container.appendChild(postEl);
  });
}

function toggleLikePost(btn, index) {
  btn.classList.toggle("liked");
  const svg = btn.querySelector("svg");
  const isLiked = btn.classList.contains("liked");
  svg.setAttribute("fill", isLiked ? "currentColor" : "none");
  const likesDiv = btn.closest(".feed-post").querySelector(".post-likes");
  let currentLikes = parseInt(likesDiv.textContent);
  likesDiv.textContent = `${isLiked ? currentLikes + 1 : currentLikes - 1} likes`;
}

// Feed direct Match shortcut handler
function handleFeedMatch(btn, userId) {
  if (state.matches.includes(userId)) {
    // Open message chat directly
    openChatWindow(userId);
    return;
  }

  btn.classList.add("pop-anim");
  setTimeout(() => {
    btn.classList.remove("pop-anim");
    // Complete match flow
    state.matches.push(userId);
    state.swipedList[userId] = "like";
    if (!state.chats[userId]) state.chats[userId] = [];
    state.chats[userId].push({
      sender: "other",
      text: "Hey there! I saw you liked my feed post. Let's chat!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    btn.textContent = "Message";
    btn.classList.add("matched");

    saveToLocalStorage();
    triggerMatchCelebration(userId);
  }, 400);
}

// 6. RENDER MATCHES & CHATS SYSTEM
function renderMatchesAndChats() {
  const newRow = document.getElementById("new-matches-row");
  const matchesList = document.getElementById("matches-list");
  const chatList = document.getElementById("chat-list");

  newRow.innerHTML = "";
  matchesList.innerHTML = "";
  chatList.innerHTML = "";

  if (state.matches.length === 0) {
    const fallbackHTML = `<div class="no-photos-msg" style="padding:10px 0;"><p>No matches yet. Keep swiping!</p></div>`;
    newRow.innerHTML = fallbackHTML;
    matchesList.innerHTML = fallbackHTML;
    chatList.innerHTML = fallbackHTML;
    return;
  }

  state.matches.forEach(mId => {
    const user = state.mockUsers.find(u => u.id === mId);
    if (!user) return;

    // Render in new match slider row
    const item = document.createElement("div");
    item.className = "new-match-item";
    item.onclick = () => openChatWindow(user.id);
    item.innerHTML = `
      <div class="new-match-avatar-wrap">
        <img src="${user.photo}" class="new-match-avatar" alt="${user.name}" onerror="this.src='photos/profile_photos_grid_1783879993408.jpg'" />
        <div class="new-match-online"></div>
      </div>
      <span class="new-match-name">${user.name}</span>
    `;
    newRow.appendChild(item);

    // Render in all matches list view
    const mItem = document.createElement("div");
    mItem.className = "match-item";
    mItem.onclick = () => openUserProfile(user.id);
    mItem.innerHTML = `
      <img src="${user.photo}" class="match-item-avatar" alt="${user.name}" onerror="this.src='photos/profile_photos_grid_1783879993408.jpg'" />
      <div class="match-item-info">
        <span class="match-item-name">${user.name}, ${user.age}</span>
        <p class="match-item-msg">${user.bio}</p>
      </div>
      <button class="post-match-btn matched" onclick="event.stopPropagation(); openChatWindow('${user.id}')">Chat</button>
    `;
    matchesList.appendChild(mItem);

    // Render in Messages tab list
    const chatMsg = state.chats[user.id] || [];
    const lastMsg = chatMsg[chatMsg.length - 1] || { text: "Matched recently. Say hello!", time: "" };

    const cItem = document.createElement("div");
    cItem.className = "chat-item";
    cItem.onclick = () => openChatWindow(user.id);
    cItem.innerHTML = `
      <div class="chat-avatar">
        <img src="${user.photo}" alt="${user.name}" onerror="this.src='photos/profile_photos_grid_1783879993408.jpg'" />
        <div class="chat-online"></div>
      </div>
      <div class="chat-info">
        <span class="chat-name">${user.name}</span>
        <p class="chat-preview">${lastMsg.text}</p>
      </div>
      <div class="chat-meta">
        <span class="chat-time">${lastMsg.time}</span>
        ${chatMsg.length > 0 && lastMsg.sender === 'other' ? `<span class="chat-unread">1</span>` : ''}
      </div>
    `;
    chatList.appendChild(cItem);
  });
}

// 7. USER PROFILE DETAILS (Other user details modal feed)
function openUserProfile(userId) {
  const user = state.mockUsers.find(u => u.id === userId);
  if (!user) return;

  const overlay = document.getElementById("user-profile-overlay");
  const content = document.getElementById("user-profile-content");

  const isMatched = state.matches.includes(user.id);
  const matchBtnHTML = isMatched 
    ? `<button class="upo-chat-btn" onclick="openChatWindow('${user.id}')">Send Message</button>`
    : `<button class="upo-match-btn" onclick="handleFeedMatch(this, '${user.id}')">Match</button>`;

  let trustScoreBadge = "";
  if (user.trustScore >= 4) {
    trustScoreBadge = `<span class="trust-badge">Verified Real ✓</span>`;
  } else if (user.missedWeeks > 0) {
    trustBadge = `<span class="break-badge">on break</span>`;
  }

  content.innerHTML = `
    <div class="upo-top-bar">
      <button class="back-btn-icon" onclick="closeOverlay('user-profile-overlay')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="20" height="20"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <div class="upo-user-quick">
        <img src="${user.photo}" class="upo-avatar-sm" alt="${user.name}" onerror="this.src='photos/profile_photos_grid_1783879993408.jpg'" />
        <div>
          <span class="upo-name-sm">${user.name}, ${user.age}</span>
          <p class="upo-details-sm">${user.city}</p>
        </div>
      </div>
    </div>
    <div class="upo-scroll">
      <div class="upo-profile-info">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
          <h2 style="font-size:24px; font-weight:800;">${user.name}, ${user.age}</h2>
          ${trustScoreBadge}
        </div>
        <p class="upo-bio">${user.bio}</p>
        <div class="upo-tags">
          ${user.tags.map(t => `<span class="upo-tag">${t}</span>`).join("")}
        </div>
        <div class="upo-stats">
          <div class="upo-stat"><span class="upo-stat-num">${user.photos.length}</span><span class="upo-stat-label">Photos</span></div>
          <div class="upo-stat"><span class="upo-stat-num">${user.trustScore * 20}%</span><span class="upo-stat-label">Trust score</span></div>
        </div>
      </div>
      <div class="upo-divider"></div>
      <h3 class="upo-feed-label">${user.name}'s Live Photos</h3>
      <div style="padding:0 16px 24px 16px;">
        <div class="own-photos-grid">
          ${user.photos.map(p => {
            const left = Math.max(1, Math.ceil((30 * 24 * 60 * 60 * 1000 - (Date.now() - p.timestamp)) / (24 * 60 * 60 * 1000)));
            return `
              <div class="own-photo-item" onclick="openLightbox('${p.url}')">
                <img src="${p.url}" alt="Profile photo" onerror="this.src='photos/profile_photos_grid_1783879993408.jpg'" />
                <span class="own-photo-expiry">${left}d left</span>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    </div>
    <div class="upo-match-bar">
      ${matchBtnHTML}
    </div>
  `;

  overlay.classList.remove("hidden");
}

// 8. UPDATE OWN PROFILE (Quota, Countdown, Slots Visualizer)
function updateOwnProfileView() {
  document.getElementById("own-name").textContent = `${state.user.name}, ${state.user.age}`;
  
  // Set avatar to the latest captured photo if exists
  const avatarImg = document.getElementById("own-avatar");
  if (state.user.photos.length > 0) {
    avatarImg.src = state.user.photos[0].url;
  } else {
    avatarImg.src = "photos/profile_emma.jpg"; // Default
  }

  // Populate Instagram-like stats
  document.getElementById("stat-posts-count").textContent = state.user.photos.length;
  document.getElementById("stat-trust-score").textContent = `${state.user.trustScore * 20}%`;
  document.getElementById("stat-matches-count").textContent = state.matches.length;

  // Verification score badge
  const trustBadge = document.getElementById("own-trust-badge");
  if (state.user.trustScore >= 4) {
    trustBadge.classList.remove("hidden");
  } else {
    trustBadge.classList.add("hidden");
  }

  // Premium status label syncing
  const badgeEl = document.getElementById("own-badge");
  if (state.user.premium) {
    badgeEl.textContent = "PREMIUM";
    badgeEl.className = "avatar-badge premium";
  } else {
    badgeEl.textContent = "FREE";
    badgeEl.className = "avatar-badge free";
  }

  // Quota & Countdown calculations
  const maxWeekly = state.user.premium ? 2 : 1;
  document.getElementById("quota-label").textContent = `Photos this week (Premium value: 2/wk)`;
  document.getElementById("quota-count").textContent = `${state.user.weeklyUploadCount} / ${maxWeekly}`;
  
  const fillWidth = (state.user.weeklyUploadCount / maxWeekly) * 100;
  document.getElementById("quota-fill").style.width = `${fillWidth}%`;

  const countdownEl = document.getElementById("quota-countdown");
  if (state.user.weeklyUploadCount >= maxWeekly) {
    // Show countdown to next slot release (simulate next week start e.g. 3 days)
    countdownEl.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      <span>Next photo slot in 3 days</span>
    `;
  } else {
    countdownEl.textContent = "";
  }

  // Render Outlined Slots Visualizer (Premium value demonstration)
  const slotsContainer = document.getElementById("slots-visualizer");
  slotsContainer.innerHTML = "";

  for (let i = 0; i < 3; i++) {
    const slot = document.createElement("div");
    if (i === 0) {
      // First slot - always free
      if (state.user.photos.length > 0) {
        slot.className = "slot-outline filled";
        slot.innerHTML = `<img src="${state.user.photos[0].url}" alt="Slot photo" />`;
      } else {
        slot.className = "slot-outline";
        slot.innerHTML = `<span>Free Slot</span>`;
      }
    } else {
      // Slot 2 and 3 - Premium slots
      if (state.user.premium) {
        const photoIndex = i;
        if (state.user.photos[photoIndex]) {
          slot.className = "slot-outline filled";
          slot.innerHTML = `<img src="${state.user.photos[photoIndex].url}" alt="Slot photo" />`;
        } else {
          slot.className = "slot-outline";
          slot.innerHTML = `<span>Weekly Slot</span><span class="slot-badge">Premium</span>`;
        }
      } else {
        slot.className = "slot-outline locked";
        slot.onclick = showPremium;
        slot.innerHTML = `
          <span class="slot-locked-icon">🔒</span>
          <span>Locked</span>
        `;
      }
    }
    slotsContainer.appendChild(slot);
  }

  // Render photos grid under "Your Photos"
  const grid = document.getElementById("own-photos-grid");
  if (state.user.photos.length === 0) {
    grid.innerHTML = `
      <div class="no-photos-msg">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="40" height="40"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
        <p>No photos yet</p>
        <small>Take your first live photo — no filters!</small>
      </div>
    `;
  } else {
    grid.innerHTML = state.user.photos.map(p => {
      const daysLeft = Math.max(1, Math.ceil((30 * 24 * 60 * 60 * 1000 - (Date.now() - p.timestamp)) / (24 * 60 * 60 * 1000)));
      return `
        <div class="own-photo-item" onclick="openLightbox('${p.url}')">
          <img src="${p.url}" alt="Your photo" />
          <div class="own-photo-expiry">${daysLeft}d left</div>
        </div>
      `;
    }).join("");
  }
}

// 9. LIGHTBOX PHOTO VIEWER ZOOM OVERLAY (Keyboard Esc & click outside support)
function openLightbox(photoUrl) {
  const modal = document.getElementById("lightbox-modal");
  const img = document.getElementById("lightbox-img");
  img.src = photoUrl;
  modal.classList.remove("hidden");

  // Add event listener for Escape key
  document.addEventListener("keydown", handleLightboxEsc);
}

function closeLightbox() {
  const modal = document.getElementById("lightbox-modal");
  modal.classList.add("hidden");
  document.removeEventListener("keydown", handleLightboxEsc);
}

function handleLightboxEsc(e) {
  if (e.key === "Escape") {
    closeLightbox();
  }
}

function handleLightboxClick(e) {
  // If clicked directly on the overlay background (not the image container or close btn)
  if (e.target.id === "lightbox-modal") {
    closeLightbox();
  }
}

// 10. REAL CAMERA LIVE PHOTO CAPTURE & WATERMARK
let cameraStream = null;
let currentFacingMode = "user";

function openCamera() {
  const maxWeekly = state.user.premium ? 2 : 1;
  if (state.user.weeklyUploadCount >= maxWeekly) {
    if (state.user.premium) {
      showToast(`Weekly quota reached (${maxWeekly}/${maxWeekly}) for Premium. Wait for next week's slots!`);
    } else {
      showToast(`Weekly quota reached (${maxWeekly}/${maxWeekly}). Upgrade to Premium to post 2 photos!`);
      showPremium();
    }
    return;
  }

  // Ensure camera-container is visible and preview is hidden
  document.querySelector(".camera-container").classList.remove("hidden");
  document.getElementById("photo-preview").classList.add("hidden");

  const overlay = document.getElementById("camera-overlay");
  overlay.classList.remove("hidden");

  const video = document.getElementById("camera-video");

  // Access user camera stream (Enforce in-app camera only, no gallery/upload fallback)
  navigator.mediaDevices.getUserMedia({
    video: { facingMode: currentFacingMode },
    audio: false
  }).then(stream => {
    cameraStream = stream;
    video.srcObject = stream;
  }).catch(err => {
    console.error("Camera access error:", err);
    showToast("Could not access camera. Simulating virtual viewfinder.");
    // Fallback virtual viewfinder simulation
    simulateVirtualCamera();
  });
}

function switchCamera() {
  stopCameraStream();
  currentFacingMode = currentFacingMode === "user" ? "environment" : "user";
  
  const video = document.getElementById("camera-video");
  const canv = document.getElementById("virtual-cam-canvas");
  if (canv) canv.style.display = "none";
  video.style.display = "block";

  navigator.mediaDevices.getUserMedia({
    video: { facingMode: currentFacingMode },
    audio: false
  }).then(stream => {
    cameraStream = stream;
    video.srcObject = stream;
    showToast(`Switched to ${currentFacingMode === "user" ? "front" : "rear"} camera`);
  }).catch(err => {
    console.error("Camera switch error:", err);
    showToast("Simulating camera switch.");
    simulateVirtualCamera();
  });
}

function simulateVirtualCamera() {
  const video = document.getElementById("camera-video");
  video.style.display = "none";
  const finder = document.getElementById("camera-viewfinder");
  
  // Add temporary canvas placeholder showing nice moving gradient
  let canv = document.getElementById("virtual-cam-canvas");
  if (!canv) {
    canv = document.createElement("canvas");
    canv.id = "virtual-cam-canvas";
    canv.style.width = "100%";
    canv.style.height = "100%";
    canv.style.objectFit = "cover";
    finder.appendChild(canv);
  }
  canv.style.display = "block";
  const ctx = canv.getContext("2d");

  let phase = 0;
  window.virtualCamInterval = setInterval(() => {
    phase += 0.05;
    const g = ctx.createRadialGradient(canv.width/2, canv.height/2, 10, canv.width/2, canv.height/2, canv.height);
    g.addColorStop(0, `hsl(${(phase * 20) % 360}, 70%, 40%)`);
    g.addColorStop(1, '#05050f');
    ctx.fillStyle = g;
    ctx.fillRect(0,0, canv.width, canv.height);

    ctx.fillStyle = "#fff";
    ctx.font = "14px Outfit";
    ctx.textAlign = "center";
    ctx.fillText("Simulating camera feed...", canv.width/2, canv.height/2);
  }, 50);
}

function closeCamera() {
  stopCameraStream();
  document.getElementById("camera-overlay").classList.add("hidden");
  document.getElementById("photo-preview").classList.add("hidden");
}

function stopCameraStream() {
  if (cameraStream) {
    cameraStream.getTracks().forEach(track => track.stop());
    cameraStream = null;
  }
  if (window.virtualCamInterval) {
    clearInterval(window.virtualCamInterval);
    const canv = document.getElementById("virtual-cam-canvas");
    if (canv) canv.style.display = "none";
  }
}

function capturePhoto() {
  const video = document.getElementById("camera-video");
  const canvas = document.getElementById("photo-canvas");
  const ctx = canvas.getContext("2d");

  // Determine source size
  let w = video.videoWidth || 640;
  let h = video.videoHeight || 800;
  canvas.width = w;
  canvas.height = h;

  // Capture frame
  const vCanv = document.getElementById("virtual-cam-canvas");
  if (vCanv && vCanv.style.display !== "none") {
    ctx.drawImage(vCanv, 0, 0, w, h);
  } else {
    ctx.drawImage(video, 0, 0, w, h);
  }

  // Draw Watermark on Canvas: "Live · No Filters"
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.fillRect(w - 180, h - 50, 160, 36);

  ctx.strokeStyle = "rgba(233, 30, 140, 0.7)";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(w - 180, h - 50, 160, 36);

  ctx.fillStyle = "#e91e8c";
  ctx.font = "bold 13px 'Outfit', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Live ✦ No Filters", w - 100, h - 32);

  // Show preview
  const dataUrl = canvas.toDataURL("image/jpeg");
  const previewImg = document.getElementById("preview-img");
  previewImg.src = dataUrl;

  document.getElementById("photo-preview").classList.remove("hidden");
  document.querySelector(".camera-container").classList.add("hidden");
  stopCameraStream();
}

function retakePhoto() {
  document.getElementById("photo-preview").classList.add("hidden");
  document.querySelector(".camera-container").classList.remove("hidden");
  openCamera();
}

function postPhoto() {
  const previewImg = document.getElementById("preview-img");
  const url = previewImg.src;

  state.user.photos.unshift({
    id: Date.now(),
    url: url,
    timestamp: Date.now()
  });

  state.user.weeklyUploadCount++;
  state.user.lastUploadTime = Date.now();
  state.user.trustScore = Math.min(5, state.user.trustScore + 1); // Increments trust score on healthy upload

  saveToLocalStorage();
  updateOwnProfileView();
  closeCamera();
  showToast("Photo posted successfully to Feed & Profile!");
  renderFeed();
}

// 11. CHATS & MESSAGES WINDOW WINDOW
let activeChatUserId = null;

function openChatWindow(userId) {
  const user = state.mockUsers.find(u => u.id === userId);
  if (!user) return;

  activeChatUserId = userId;
  const overlay = document.getElementById("chat-window-overlay");
  const headerInfo = document.getElementById("chat-header-info");

  headerInfo.innerHTML = `
    <span class="name">${user.name}</span>
  `;

  renderChatMessages();
  overlay.classList.remove("hidden");

  // Mark all unread as read
  saveToLocalStorage();
}

function renderChatMessages() {
  const container = document.getElementById("chat-messages");
  container.innerHTML = "";

  const messages = state.chats[activeChatUserId] || [];
  messages.forEach(m => {
    const bubble = document.createElement("div");
    bubble.className = `msg ${m.sender === 'me' ? 'sent' : 'received'}`;
    bubble.innerHTML = `
      <div class="msg-bubble">
        <p>${m.text}</p>
        <div class="msg-time">${m.time}</div>
      </div>
    `;
    container.appendChild(bubble);
  });

  container.scrollTop = container.scrollHeight;
}

function sendMessage() {
  const input = document.getElementById("chat-input");
  const text = input.value.trim();
  if (!text) return;

  if (!state.chats[activeChatUserId]) {
    state.chats[activeChatUserId] = [];
  }

  const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  state.chats[activeChatUserId].push({
    sender: "me",
    text: text,
    time: timeStr
  });

  input.value = "";
  renderChatMessages();
  saveToLocalStorage();

  // Simulated auto-response from user after 1.5 seconds
  setTimeout(() => {
    if (activeChatUserId) {
      state.chats[activeChatUserId].push({
        sender: "other",
        text: `Hey Emma! That's awesome. Let's meet up sometime soon.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      if (document.getElementById("chat-window-overlay").classList.contains("hidden") === false) {
        renderChatMessages();
      }
      saveToLocalStorage();
    }
  }, 1500);
}

// 12. MATCH CELEBRATION OVERLAY
function triggerMatchCelebration(userId) {
  const user = state.mockUsers.find(u => u.id === userId);
  if (!user) return;

  const overlay = document.getElementById("match-overlay");
  document.getElementById("match-other-avatar").src = user.photo;
  
  // Update own avatar in celebration overlay
  const ownAvatar = document.getElementById("match-own-avatar");
  if (state.user.photos.length > 0) {
    ownAvatar.src = state.user.photos[0].url;
  } else {
    ownAvatar.src = "photos/profile_emma.jpg";
  }

  overlay.classList.remove("hidden");
  createCelebrationFireworks();
}

function closeMatch() {
  document.getElementById("match-overlay").classList.add("hidden");
  switchTab("matches");
}

function openMatchChat() {
  document.getElementById("match-overlay").classList.add("hidden");
  openChatWindow(state.matches[state.matches.length - 1]);
}

function createCelebrationFireworks() {
  const container = document.getElementById("match-fireworks");
  container.innerHTML = "";

  for (let i = 0; i < 24; i++) {
    const f = document.createElement("div");
    f.className = "firework";
    f.style.background = `hsl(${Math.random() * 360}, 100%, 60%)`;
    f.style.top = "50%";
    f.style.left = "50%";

    const tx = (Math.random() - 0.5) * 300;
    const ty = (Math.random() - 0.5) * 300;

    f.style.setProperty("--tx", `${tx}px`);
    f.style.setProperty("--ty", `${ty}px`);
    container.appendChild(f);
  }
}

// 13. COMMENTS & FEED SYSTEM
let activeCommentPostId = null;

function openComments(userId) {
  activeCommentPostId = userId;
  const overlay = document.getElementById("comments-overlay");
  overlay.classList.remove("hidden");

  renderCommentsList();
}

function renderCommentsList() {
  const list = document.getElementById("comments-list");
  list.innerHTML = "";

  // Render mock comments
  const defaultComments = [
    { name: "Sofia", text: "Truly beautiful unedited shot!" },
    { name: "Lucas", text: "Wow, clean lighting!" }
  ];

  defaultComments.forEach(c => {
    const item = document.createElement("div");
    item.className = "comment-item";
    item.innerHTML = `
      <div class="comment-avatar">${c.name[0]}</div>
      <div class="comment-body">
        <span class="comment-name">${c.name}</span>
        <p class="comment-text">${c.text}</p>
        <span class="comment-time">2h ago</span>
      </div>
    `;
    list.appendChild(item);
  });
}

function postComment() {
  const input = document.getElementById("comment-input");
  const text = input.value.trim();
  if (!text) return;

  const list = document.getElementById("comments-list");
  const item = document.createElement("div");
  item.className = "comment-item";
  item.innerHTML = `
    <div class="comment-avatar">${state.user.name[0]}</div>
    <div class="comment-body">
      <span class="comment-name">${state.user.name} (You)</span>
      <p class="comment-text">${text}</p>
      <span class="comment-time">Just now</span>
    </div>
  `;
  list.appendChild(item);
  input.value = "";
  list.scrollTop = list.scrollHeight;
}

// 14. SETTINGS & PREMIUM SELECTIONS
function showSettings() {
  document.getElementById("settings-city").value = state.user.city;
  document.getElementById("settings-overlay").classList.remove("hidden");
}

function saveSettings() {
  const city = document.getElementById("settings-city").value.trim();
  if (!city) {
    showToast("Please enter a valid city");
    return;
  }
  state.user.city = city;
  document.getElementById("own-location-display").innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
    ${city}
  `;
  document.getElementById("swipe-location-label").textContent = city;

  saveToLocalStorage();
  closeOverlay("settings-overlay");
  showToast("Settings saved!");
  renderSwipeStack(); // Re-render discover cards filtered by new city
}

function showPremium() {
  document.getElementById("premium-overlay").classList.remove("hidden");
}

function selectPlan(card, price, duration) {
  document.querySelectorAll(".plan-card").forEach(c => c.classList.remove("selected"));
  card.classList.add("selected");
  state.premiumSelectedPrice = price;
  state.premiumSelectedPlan = duration;
  document.getElementById("premium-cta-btn").textContent = `Upgrade Now — €${price}/mo`;
}

function upgradePremium() {
  state.user.premium = true;
  saveToLocalStorage();
  closeOverlay("premium-overlay");
  updateOwnProfileView();
  showToast(`Successfully upgraded to Spark Premium (${state.premiumSelectedPlan})!`);
}

function toggleFilters() {
  const panel = document.getElementById("filter-panel");
  panel.classList.toggle("hidden");
  if (panel.classList.contains("hidden")) {
    // Re-render swipe card filters on apply close
    renderSwipeStack();
  }
}

function closeOverlay(id) {
  document.getElementById(id).classList.add("hidden");
  if (id === "chat-window-overlay") {
    activeChatUserId = null;
    renderMatchesAndChats(); // Sync messages tab preview
  }
}

// Global Toast notification system
function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => {
    t.classList.remove("show");
  }, 2200);
}
