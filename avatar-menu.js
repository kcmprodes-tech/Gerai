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
      <a class="avatar-profile-link" href="#profile">Profil <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m9.29 6.71 1.42-1.42L17.41 12l-6.7 6.71-1.42-1.42L14.59 12 9.29 6.71Z"/></svg></a>
    </div>
    <nav class="avatar-menu-list" aria-label="Menu akun">
      <a href="./purchase-history.html"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 5a7 7 0 1 1-6.32 4H8V7H3v5h2V9.62A5 5 0 1 0 12 7V5Z"/></svg><span>Pembelian</span><svg aria-hidden="true" viewBox="0 0 24 24"><path d="m9.29 6.71 1.42-1.42L17.41 12l-6.7 6.71-1.42-1.42L14.59 12 9.29 6.71Z"/></svg></a>
      <a href="#wishlist"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 20.35 10.55 19C5.4 14.2 2 11.04 2 7.15 2 4 4.42 1.55 7.5 1.55c1.74 0 3.41.81 4.5 2.09a5.93 5.93 0 0 1 4.5-2.09C19.58 1.55 22 4 22 7.15c0 3.89-3.4 7.05-8.55 11.86L12 20.35Z"/></svg><span>Wishlist</span><svg aria-hidden="true" viewBox="0 0 24 24"><path d="m9.29 6.71 1.42-1.42L17.41 12l-6.7 6.71-1.42-1.42L14.59 12 9.29 6.71Z"/></svg></a>
      <a href="#pengaturan"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.31.06-.63.06-.94s-.02-.63-.06-.94l2.03-1.58-1.92-3.32-2.39.96a7.03 7.03 0 0 0-1.63-.94L14.86 3h-3.72l-.37 3.18c-.58.23-1.13.54-1.63.94l-2.39-.96-1.92 3.32 2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58 1.92 3.32 2.39-.96c.5.4 1.05.71 1.63.94l.37 3.18h3.72l.37-3.18c.58-.23 1.13-.54 1.63-.94l2.39.96 1.92-3.32-2.03-1.58ZM12 15.5A3.5 3.5 0 1 1 12 8a3.5 3.5 0 0 1 0 7.5Z"/></svg><span>Pengaturan</span><svg aria-hidden="true" viewBox="0 0 24 24"><path d="m9.29 6.71 1.42-1.42L17.41 12l-6.7 6.71-1.42-1.42L14.59 12 9.29 6.71Z"/></svg></a>
    </nav>
  `;
  return menu;
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

  menu.addEventListener("click", (event) => event.stopPropagation());
  document.addEventListener("click", closeMenu);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

setupSharedAvatarMenu();
