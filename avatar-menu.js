function getAvatarStoredValue(key) {
  try {
    const localValue = localStorage.getItem(key);
    if (localValue !== null) return localValue;
  } catch {
    // Fall back to window.name for file:// contexts that block storage.
  }

  try {
    const tabState = JSON.parse(window.name || "{}");
    return tabState[key] ?? null;
  } catch {
    return null;
  }
}

function getAvatarEmail() {
  return getAvatarStoredValue("geraiLoginIdentity") || "ikhwanardhi@gmail.com";
}

function getAvatarDisplayName() {
  const identity = getAvatarEmail().trim();
  const localPart = identity.split("@")[0] || identity;
  return localPart
    .replace(/[._-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase()) || "Akun Gerai";
}

function getAvatarInitials() {
  return getAvatarDisplayName()
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase() || "AS";
}

function isAvatarLoggedIn() {
  return getAvatarStoredValue("geraiLoggedIn") === "true";
}

function createGuestActions() {
  const guestActions = document.createElement("div");
  guestActions.className = "auth-actions";
  guestActions.innerHTML = `
    <a class="btn ghost" href="./index.html#login">Masuk</a>
    <a class="btn primary" href="#register">Daftar</a>
    <a class="icon-button mobile-login-icon" href="./index.html#login" aria-label="Masuk akun"><i class="ph ph-user" aria-hidden="true"></i></a>
  `;
  return guestActions;
}

function createAvatarMenu() {
  const menu = document.createElement("div");
  menu.className = "avatar-menu";
  menu.dataset.avatarMenu = "";
  menu.hidden = true;
  menu.innerHTML = `
    <div class="avatar-menu-profile">
      <span class="avatar-menu-initials">${getAvatarInitials()}</span>
      <div>
        <strong data-avatar-name>${getAvatarDisplayName()}</strong>
        <p data-avatar-email>${getAvatarEmail()}</p>
      </div>
      <a class="avatar-profile-link" href="#profile">Profil<i class="ph ph-caret-right" aria-hidden="true"></i></a>
    </div>
    <nav class="avatar-menu-list" aria-label="Menu akun">
      <a href="./purchase-history.html"><i class="ph ph-arrow-counter-clockwise" aria-hidden="true"></i><span>Pembelian</span><i class="ph ph-caret-right" aria-hidden="true"></i></a>
      <a href="#wishlist"><i class="ph ph-heart" aria-hidden="true"></i><span>Wishlist</span><i class="ph ph-caret-right" aria-hidden="true"></i></a>
      <a href="#pengaturan"><i class="ph ph-gear-six" aria-hidden="true"></i><span>Pengaturan</span><i class="ph ph-caret-right" aria-hidden="true"></i></a>
      <button type="button" data-logout><i class="ph ph-sign-out" aria-hidden="true"></i><span>Logout</span><i class="ph ph-caret-right" aria-hidden="true"></i></button>
    </nav>
  `;
  return menu;
}

function syncAvatarMenuEmail(menu) {
  const email = menu.querySelector("[data-avatar-email]") || menu.querySelector(".avatar-menu-profile p");
  if (email) email.textContent = getAvatarEmail();
  const name = menu.querySelector("[data-avatar-name]") || menu.querySelector(".avatar-menu-profile strong");
  if (name) name.textContent = getAvatarDisplayName();
  const initials = menu.querySelector(".avatar-menu-initials");
  if (initials) initials.textContent = getAvatarInitials();
}

function syncSharedHeaderAuth() {
  const loggedIn = isAvatarLoggedIn();
  document.body.classList.toggle("auth-logged-in", loggedIn);
  document.body.classList.toggle("auth-logged-out", !loggedIn);

  document.querySelectorAll(".site-header .account-actions").forEach((accountActions) => {
    let authActions = accountActions.querySelector(".auth-actions");
    const avatarButton = accountActions.querySelector("[data-avatar-menu-trigger]");

    if (!authActions) {
      authActions = createGuestActions();
      if (avatarButton) accountActions.insertBefore(authActions, avatarButton);
      else accountActions.appendChild(authActions);
    }

    authActions.classList.toggle("hidden", loggedIn);
    if (avatarButton) {
      avatarButton.classList.toggle("hidden", !loggedIn);
      avatarButton.hidden = !loggedIn;
    }

    accountActions.querySelectorAll("[data-avatar-menu]").forEach((menu) => {
      syncAvatarMenuEmail(menu);
      if (!loggedIn) menu.hidden = true;
    });
  });

  document.querySelectorAll("[data-avatar-email]").forEach((email) => {
    email.textContent = getAvatarEmail();
  });
}

function clearLoginState() {
  try {
    localStorage.removeItem("geraiLoggedIn");
    localStorage.removeItem("geraiLoginIdentity");
  } catch {
    // Keep logout functional even when storage is unavailable.
  }

  try {
    const tabState = JSON.parse(window.name || "{}");
    delete tabState.geraiLoggedIn;
    delete tabState.geraiLoginIdentity;
    window.name = JSON.stringify(tabState);
  } catch {
    window.name = "{}";
  }

  window.dispatchEvent(new CustomEvent("gerai-auth-changed"));
}

function setupSharedAvatarMenu() {
  syncSharedHeaderAuth();

  const trigger = document.querySelector("[data-avatar-menu-trigger]");
  if (!trigger || trigger.dataset.avatarMenuReady === "true") return;

  const accountActions = trigger.closest(".account-actions") || trigger.parentElement;
  let menu = accountActions.querySelector("[data-avatar-menu]");
  if (!menu) {
    menu = createAvatarMenu();
    accountActions.appendChild(menu);
  }
  syncAvatarMenuEmail(menu);

  trigger.dataset.avatarMenuReady = "true";
  trigger.setAttribute("aria-expanded", "false");

  const closeMenu = () => {
    menu.hidden = true;
    trigger.setAttribute("aria-expanded", "false");
  };

  trigger.addEventListener("click", (event) => {
    event.stopPropagation();
    const willOpen = menu.hidden;
    syncAvatarMenuEmail(menu);
    menu.hidden = !willOpen;
    trigger.setAttribute("aria-expanded", String(willOpen));
  });

  menu.addEventListener("click", (event) => {
    const logoutButton = event.target.closest("[data-logout]");
    if (!logoutButton) {
      event.stopPropagation();
      return;
    }

    clearLoginState();
    window.location.hash = "";
    syncSharedHeaderAuth();
    closeMenu();
  });
  document.addEventListener("click", closeMenu);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

function setupSharedLogoutHandlers() {
  document.querySelectorAll("[data-logout]").forEach((logoutButton) => {
    if (logoutButton.dataset.sharedLogoutReady === "true") return;
    logoutButton.dataset.sharedLogoutReady = "true";
    logoutButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      clearLoginState();
      window.location.hash = "";
      syncSharedHeaderAuth();
    });
  });
}

function setupAutoHideHeader() {
  const header = document.querySelector(".site-header");
  if (!header || header.dataset.autoHideReady === "true") return;

  header.dataset.autoHideReady = "true";
  let lastScrollY = window.scrollY;
  let ticking = false;

  const updateHeader = () => {
    const currentScrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
    const isScrollingDown = currentScrollY > lastScrollY;
    const delta = Math.abs(currentScrollY - lastScrollY);

    if (currentScrollY <= 8) {
      header.classList.remove("header-hidden");
    } else if (delta > 2) {
      if (isScrollingDown) {
        header.classList.add("header-hidden");
      } else {
        header.classList.remove("header-hidden");
      }
    }

    lastScrollY = Math.max(currentScrollY, 0);
    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateHeader);
    },
    { passive: true }
  );

  window.addEventListener("focus", () => {
    lastScrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
    header.classList.remove("header-hidden");
  });
}

window.syncGeraiAuthHeader = syncSharedHeaderAuth;
window.clearGeraiLoginState = clearLoginState;
window.addEventListener("gerai-auth-changed", syncSharedHeaderAuth);
window.addEventListener("storage", (event) => {
  if (event.key === "geraiLoggedIn" || event.key === "geraiLoginIdentity") syncSharedHeaderAuth();
});

setupSharedAvatarMenu();
setupSharedLogoutHandlers();
setupAutoHideHeader();
