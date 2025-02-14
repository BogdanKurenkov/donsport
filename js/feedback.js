const splide = new Splide('.splide', {
    type: 'loop',
    perPage: 3,
    perMove: 1,
    gap: 8,
    padding: { left: '3.5%', right: '3.5%' },
    breakpoints: {
        768: {
            padding: { left: '4%', right: '15%' },
        },
        480: {
            perPage: 1,
            padding: { left: '10%', right: '10%' },
        },
    },
});

const bar = splide.root.querySelector('.my-carousel-progress-bar');

splide.on('mounted move', function () {
    const end = splide.Components.Controller.getEnd() + 1;
    const rate = Math.min((splide.index + 1) / end, 1);
    bar.style.width = String(100 * rate) + '%';
});

document.querySelector('.slider-prev').addEventListener('click', function () {
    splide.go('<');
});

document.querySelector('.slider-next').addEventListener('click', function () {
    splide.go('>');
});

splide.mount();