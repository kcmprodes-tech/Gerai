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
        <p>dianmeidina@gmail.com</p>
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

function clearLoginState() {
  try {
    localStorage.removeItem("geraiLoggedIn");
  } catch {
    // Keep logout functional even when storage is unavailable.
  }

  try {
    const tabState = JSON.parse(window.name || "{}");
    delete tabState.geraiLoggedIn;
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

  trigger.dataset.avatarMenuReady = "true";
  trigger.setAttribute("aria-expanded", "false");

  const closeMenu = () => {
    menu.hidden = true;
    trigger.setAttribute("aria-expanded", "false");
  };

  trigger.addEventListener("click", (event) => {
    event.stopPropagation();
    const willOpen = menu.hidden;
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

setupSharedAvatarMenu();
