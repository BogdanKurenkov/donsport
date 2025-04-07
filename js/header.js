let lastScrollPosition = 0;
const header = document.querySelector(".header");
const headerCol2 = document.querySelector(".header-col2");

function handleScroll() {
  const currentScrollPosition = window.scrollY;
  console.log(currentScrollPosition);
  if (currentScrollPosition > lastScrollPosition) {
    header.classList.add("hidden");
  } else {
    header.classList.remove("hidden");

    if (currentScrollPosition > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
  if (currentScrollPosition === 100) {
    header.classList.remove("scrolled");
  }
  lastScrollPosition = currentScrollPosition;
}

window.addEventListener("scroll", () => {
  requestAnimationFrame(handleScroll);
});
