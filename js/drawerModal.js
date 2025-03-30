document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.querySelector(".drawer-overlay");
  const resetBtn = document.querySelector(".reset-btn");
  const applyBtn = document.querySelector(".apply-btn");

  document.querySelectorAll(".drawer-menu-item").forEach((item) => {
    item.addEventListener("click", function () {
      const submenu = item.nextElementSibling;
      submenu.classList.toggle("active");
      item.classList.toggle("active");
    });
  });

  document.querySelectorAll("[data-drawer]").forEach((button) => {
    button.addEventListener("click", function () {
      const drawer = document.getElementById(button.dataset.drawer);
      if (drawer) {
        drawer.classList.add("open");
        overlay.classList.add("active");
        document.body.classList.add("body-lock-drawer");
      }
    });
  });

  document.querySelectorAll(".close-drawer").forEach((button) => {
    button.addEventListener("click", function () {
      button.closest(".drawer").classList.remove("open");
      overlay.classList.remove("active");
      document.body.classList.remove("body-lock-drawer");
    });
  });

  overlay.addEventListener("click", function () {
    document
      .querySelectorAll(".drawer")
      .forEach((drawer) => drawer.classList.remove("open"));
    overlay.classList.remove("active");
    document.body.classList.remove("body-lock-drawer");
  });

  resetBtn.addEventListener("click", function () {
    document
      .querySelectorAll(".checkbox-label input")
      .forEach((cb) => (cb.checked = false));
  });

  applyBtn.addEventListener("click", function () {
    document.querySelector(".drawer.open")?.classList.remove("open");
    overlay.classList.remove("active");
    document.body.classList.remove("body-lock-drawer");
  });
});
