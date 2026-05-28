const filterButtons = Array.from(document.querySelectorAll("[data-history-filter]"));
const historyCards = Array.from(document.querySelectorAll("[data-history-status]"));

function setHistoryFilter(filter) {
  filterButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.historyFilter === filter);
  });

  historyCards.forEach((card) => {
    const shouldShow = filter === "all" || card.dataset.historyStatus === filter;
    card.hidden = !shouldShow;
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => setHistoryFilter(button.dataset.historyFilter));
});
