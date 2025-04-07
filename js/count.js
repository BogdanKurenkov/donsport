document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startCountUp(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => {
    if (isElementInViewport(counter)) {
      startCountUp(counter);
    } else {
      observer.observe(counter);
    }
  });
});

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function startCountUp(element) {
  const endValue = parseInt(element.getAttribute("data-target"), 10);
  const suffix = element.getAttribute("data-suffix") || "";
  if (isNaN(endValue)) return;

  let startValue = 0;
  const duration = 2000;
  const frameRate = 60;
  const totalFrames = (duration / 1000) * frameRate;
  const increment = endValue / totalFrames;
  let currentFrame = 0;

  function updateCounter() {
    if (currentFrame < totalFrames) {
      startValue += increment;
      element.innerHTML = `${Math.floor(
        startValue
      )} <span class="counter-suffix">${suffix}</span>`;
      currentFrame++;
      requestAnimationFrame(updateCounter);
    } else {
      element.innerHTML = `${endValue} <span class="counter-suffix">${suffix}</span>`;
    }
  }

  requestAnimationFrame(updateCounter);
}
