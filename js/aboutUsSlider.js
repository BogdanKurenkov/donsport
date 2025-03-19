import { Splide } from "@splidejs/splide";

const splide = new Splide("#aboutUsSlider", {
  type: "loop",
  perPage: 1,
  gap: "16px",
  focus: "center",
  arrows: false,
  pagination: false,
  trimSpace: false,
  breakpoints: {
    1024: {
      perPage: 1,
      gap: "16px",
    },
  },
});

splide.mount();

const nextBtns = document.querySelectorAll(".about-us-next");
const prevBtns = document.querySelectorAll(".about-us-prev");

nextBtns.forEach((btn) => btn.addEventListener("click", () => splide.go(">")));
prevBtns.forEach((btn) => btn.addEventListener("click", () => splide.go("<")));

const allPaginations = document.querySelectorAll(".about-us-pagination h4");
splide.on("move", (newIndex) => {
  const roundedIndex = Math.round(newIndex);
  allPaginations.forEach((el, i) => {
    el.textContent = `${String(roundedIndex + 1).padStart(2, "0")} / 05`;
  });
});
