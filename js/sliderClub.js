gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function () {
  let sections = gsap.utils.toArray(".club-slider-wrapper");
  let currentIndex = 0;
  let isAnimating = false;
  let sliderSection = document.getElementById("slider-section");
  let observerActive = false;
  let lastScrollY = window.scrollY;

  function showSlide(index) {
    if (isAnimating || index < 0 || index >= sections.length) return;
    isAnimating = true;

    gsap.killTweensOf(sections[currentIndex]);
    gsap.killTweensOf(sections[index]);

    gsap.to(sections[currentIndex], {
      opacity: 0,
      pointerEvents: "none",
      duration: 1,
    });

    gsap.to(sections[index], {
      opacity: 1,
      pointerEvents: "auto",
      duration: 1,
    });

    let leftPanel = sections[index].querySelector(".club-slider-left");
    let rightPanel = sections[index].querySelector(".club-slider-right");

    gsap.fromTo(
      leftPanel,
      { y: "100%" },
      { y: "0%", duration: 1.5, ease: "power2.out" }
    );
    gsap.fromTo(
      rightPanel,
      { y: "-100%" },
      { y: "0%", duration: 1.5, ease: "power2.out" }
    );

    currentIndex = index;
    setTimeout(() => (isAnimating = false), 1500);
  }

  showSlide(0);

  function handleScroll(event) {
    if (!observerActive || isAnimating) {
      event.preventDefault();
      return;
    }

    let direction = event.deltaY > 0 ? "down" : "up";

    if (direction === "down" && currentIndex < sections.length - 1) {
      showSlide(currentIndex + 1);
      event.preventDefault();
    } else if (direction === "up" && currentIndex > 0) {
      showSlide(currentIndex - 1);
      event.preventDefault();
    }
  }

  let handleScrollBound = handleScroll.bind(this);

  let observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          observerActive = true;
          document.addEventListener("wheel", handleScrollBound, {
            passive: false,
          });

          let scrollDirection = window.scrollY > lastScrollY ? "down" : "up";
          lastScrollY = window.scrollY;

          if (scrollDirection === "down") {
            sliderSection.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          } else {
            sliderSection.scrollIntoView({ behavior: "smooth", block: "end" });
          }
        } else {
          observerActive = false;
          document.removeEventListener("wheel", handleScrollBound);
        }
      });
    },
    { threshold: 0.5 }
  );

  if (sliderSection) {
    observer.observe(sliderSection);
  } else {
    console.error("sliderSection не найден!");
  }
});
