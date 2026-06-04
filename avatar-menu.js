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

function createAvatarMenu() {
  const menu = document.createElement("div");
  menu.className = "avatar-menu";
  menu.dataset.avatarMenu = "";
  menu.hidden = true;
  menu.innerHTML = `
    <div class="avatar-menu-profile">
      <span class="avatar-menu-initials">DM</span>
      <div>
        <strong>Ardi Suhanda</strong>
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
}

function setupSharedAvatarMenu() {
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
    window.location.reload();
  });
  document.addEventListener("click", closeMenu);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
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

setupSharedAvatarMenu();
setupAutoHideHeader();
