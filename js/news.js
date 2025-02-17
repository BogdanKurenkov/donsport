import { Splide } from '@splidejs/splide';

document.addEventListener('DOMContentLoaded', () => {
    const splide1 = new Splide('#news-slider', {
        type: 'loop',
        perPage: 4,
        gap: 6,
        breakpoints: {
            768: {
                perPage: 2,
                padding: { left: '5%', right: '10%' },
            },
            480: {
                perPage: 1,
                padding: { left: '7%', right: '7%' },
            },
        },
        arrows: false,
        pagination: false,
    });


    splide1.mount();


})