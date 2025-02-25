gsap.registerPlugin(ScrollTrigger);
document.addEventListener("DOMContentLoaded", function () {
  let sections = gsap.utils.toArray(".club-slider-wrapper");
  let currentIndex = 0;
  let isAnimating = false;
  let sliderSection = document.getElementById("slider-section");
  let allowScroll = true;

  function isElementInViewport(el) {
    let rect = el.getBoundingClientRect();
    let windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    return rect.top <= windowHeight && rect.bottom >= windowHeight;
  }

  function showSlide(index, direction) {
    if (isAnimating || index < 0 || index >= sections.length) return;
    isAnimating = true;

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

    if (direction === "down") {
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
    } else {
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
    }

    currentIndex = index;
    setTimeout(() => (isAnimating = false), 1500);
  }

  showSlide(0, "down");

  document.addEventListener(
    "wheel",
    function (event) {
      if (!isElementInViewport(sliderSection)) return;
      if (isAnimating) {
        event.preventDefault();
        return;
      }

      if (event.deltaY > 0 && currentIndex < sections.length - 1) {
        showSlide(currentIndex + 1, "down");
        event.preventDefault();
      } else if (event.deltaY < 0 && currentIndex > 0) {
        showSlide(currentIndex - 1, "up");
        event.preventDefault();
      }
    },
    { passive: false }
  );
});
