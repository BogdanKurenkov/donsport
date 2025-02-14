document.addEventListener("DOMContentLoaded", function () {
    const swiper = new Swiper(".mySwiper", {
        loop: true,
        autoplay: { delay: 9800, disableOnInteraction: false },
        on: {
            slideChangeTransitionStart: function () {
                updateActiveTab(this.realIndex);
            },
        },
        allowTouchMove: false,
    });

    const tabs = document.querySelectorAll(".tab");

    let lastActiveIndex = 0;
    let isAutoplayStopped = false;

    function updateActiveTab(index) {
        tabs.forEach((tab, i) => {
            tab.classList.remove("active", "animating");
            if (i === index) {
                tab.classList.add("active");
                setTimeout(() => {
                    tab.classList.add("animating");
                }, 10);
            }
        });
    }

    tabs.forEach((button, i) => {
        button.addEventListener("click", () => {
            swiper.slideToLoop(i);
            lastActiveIndex = i;
        });
    });

    updateActiveTab(0);

    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === 'visible') {
            if (isAutoplayStopped) {
                swiper.slideToLoop(lastActiveIndex);
                swiper.autoplay.start();
                isAutoplayStopped = false;
                updateActiveTab(lastActiveIndex);
            }
        } else {
            swiper.autoplay.stop();
            isAutoplayStopped = true;
        }
    });
});
