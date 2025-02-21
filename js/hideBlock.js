window.addEventListener('scroll', () => {
    const textBlock = document.querySelector('.page-info_bg');
    const textContent = textBlock.querySelector('.page-info');
    const banner = document.querySelector('.clubs-banner');
    const scrollY = window.scrollY;
    const maxScroll = 300;

    const translateYContent = Math.min(scrollY, maxScroll) * 0.9;
    const scale = 1 - (scrollY / maxScroll) * 0.2;
    const opacity = 1 - (scrollY / maxScroll);
    textContent.style.transform = `scale(${scale}) translateY(${translateYContent}px)`;
    textContent.style.opacity = opacity;

    const translateYBanner = Math.min(scrollY, maxScroll) * 0.7;
    banner.style.marginTop = `-${translateYBanner}px`;
});