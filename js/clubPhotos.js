import { Splide } from "@splidejs/splide";

document.addEventListener("DOMContentLoaded", () => {
  const count = document.querySelector(".splide-arrow-wrap p");

  const splide2 = new Splide("#club-photos", {
    type: "loop",
    perPage: 3,
    perMove: 1,
    padding: { left: "0%", right: "3%" },
    gap: 40,
    breakpoints: {
      1440: {
        gap: 32,
      },
      768: {
        type: "loop",
        perPage: 1,
        gap: 6,
        padding: { left: "2.2%", right: "2.5%" },
        drag: true,
      },
    },
    arrows: false,
    pagination: false,
    drag: false,
  });

  splide2.on("mounted", () => {
    updateCount();
  });

  splide2.on("move", () => {
    updateCount();
  });

  splide2.mount();

  const prevButton = document.querySelector(".club-photos-arrow_prev");
  const nextButton = document.querySelector(".club-photos-arrow_next");

  if (prevButton && nextButton) {
    prevButton.addEventListener("click", () => splide2.go("<"));
    nextButton.addEventListener("click", () => splide2.go(">"));
  }

  function updateCount() {
    const realSlides = splide2.Components.Slides.get().filter(
      (slide) => !slide.isClone
    ).length;
    const realIndex = (splide2.index % realSlides) + 1;
    count.textContent = `0${realIndex} / 0${realSlides}`;
  }
});
