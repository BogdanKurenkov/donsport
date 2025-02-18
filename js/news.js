import { Splide } from '@splidejs/splide';

document.addEventListener('DOMContentLoaded', () => {
    const splide1 = new Splide('#news-slider', {
        type: 'loop',
        perPage: 4,
        gap: 6,
        breakpoints: {
            1024: {
                perPage: 2,
                padding: { left: '5%', right: '10%' },
            },
            580: {
                perPage: 1,
                padding: { left: '7%', right: '7%' },
            },
        },
        arrows: false,
        pagination: false,
    });


    splide1.mount();


})