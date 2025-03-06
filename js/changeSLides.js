document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".mySwiper", {
    loop: true,
    autoplay: { delay: 10000, disableOnInteraction: false },
    on: {
      slideChangeTransitionStart: function () {
        updateActiveTab(this.realIndex);
        updateMobilePagination(this.realIndex);
      },
    },
    allowTouchMove: false,
  });

  const tabs = document.querySelectorAll(".tab");
  const fitnessNext = document.querySelector(".fitness-next");
  const fitnessPrev = document.querySelector(".fitness-prev");
  const globalMobilePagination = document.querySelector(
    ".global-slider-pagination p"
  );
  let lastActiveIndex = 0;
  let isAutoplayStopped = false;

  function updateActiveTab(index) {
    tabs.forEach((tab, i) => {
      tab.classList.remove("active", "animating");
      if (i === index) {
        tab.classList.add("active");
        if (!isAutoplayStopped) {
          setTimeout(() => {
            tab.classList.add("animating");
          }, 10);
        }
      }
    });
  }

  function updateMobilePagination(index) {
    const totalSlides = swiper.slides.length;

    if (globalMobilePagination) {
      globalMobilePagination.textContent = `${String(index + 1).padStart(
        2,
        "0"
      )} / ${String(totalSlides).padStart(2, "0")}`;
    }
  }

  if (fitnessNext) {
    fitnessNext.addEventListener("click", () => {
      handleUserInteraction();
      swiper.slideNext();
    });
  }

  if (fitnessPrev) {
    fitnessPrev.addEventListener("click", () => {
      handleUserInteraction();
      swiper.slidePrev();
    });
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      handleUserInteraction();
      swiper.slideToLoop(index);

      updateActiveTab(index);
      updateMobilePagination(index);
    });
  });

  function handleUserInteraction() {
    if (!isAutoplayStopped) {
      swiper.autoplay.stop();
      isAutoplayStopped = true;

      tabs.forEach((tab) => {
        tab.classList.remove("animating");
      });
    }
  }

  function resumeAutoplay() {
    if (isAutoplayStopped) {
      swiper.autoplay.start();
      isAutoplayStopped = false;

      const activeTabIndex = swiper.realIndex;
      updateActiveTab(activeTabIndex);
    }
  }

  updateMobilePagination(0);
  updateActiveTab(0);

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      resumeAutoplay();
    } else {
      handleUserInteraction();
    }
  });

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      setTimeout(resumeAutoplay, 10);
    });
  });

  if (fitnessNext || fitnessPrev) {
    [fitnessNext, fitnessPrev].forEach((button) => {
      button.addEventListener("click", () => {
        setTimeout(resumeAutoplay, 10);
      });
    });
  }
});
