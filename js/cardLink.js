document.addEventListener("DOMContentLoaded", function () {
  document.body.addEventListener("click", function (e) {
    const card = e.target.closest(".clickable-card-href");
    if (card && card.dataset.href) {
      window.location.href = card.dataset.href;
    }
  });
});
