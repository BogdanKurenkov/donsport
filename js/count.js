import { CountUp } from 'countup.js';

document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.counter');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                initializeCountUp(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        if (isElementInViewport(counter)) {
            initializeCountUp(counter);
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
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function initializeCountUp(target) {
    if (!target || !(target instanceof HTMLElement)) {
        return;
    }

    const endValue = parseInt(target.getAttribute('data-target'), 10);

    if (isNaN(endValue)) {
        return;
    }

    const countUp = new CountUp(target, endValue, {
        startVal: 0,
        duration: 2,
        useEasing: true,
        useGrouping: false,
        separator: '',
        decimal: '.',
    });

    if (!countUp.error) {
        countUp.start();
    } else {
        console.error(`err: ${countUp.error}`);
    }
}