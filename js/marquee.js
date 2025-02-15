document.addEventListener('DOMContentLoaded', () => {
    const marqueeContent = document.querySelector('.marquee-content');
    const cards = marqueeContent.innerHTML;
    marqueeContent.innerHTML += cards;
})