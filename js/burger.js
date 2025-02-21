document.addEventListener('DOMContentLoaded', function () {
    const burgerMenu = document.getElementById('burger-menu');
    const headerSubmenu = document.getElementById('header-submenu');
    const closeSubmenu = document.getElementById('close-submenu');
    const headerOverlay = document.getElementById('header-overlay');
    const headerCol3 = document.querySelector('.header-col3');
    const logo = document.querySelector('.header-col1_clubs')
    const body = document.body;
    const html = document.documentElement;

    if (burgerMenu && headerSubmenu && closeSubmenu && headerOverlay && headerCol3) {
        burgerMenu.addEventListener('click', function () {
            headerSubmenu.classList.add('active');
            headerOverlay.classList.add('active');
            headerCol3.classList.add('blurred');
            body.classList.add('body-lock');
            html.classList.add('body-lock');
            logo?.classList.add('active');
        });

        function closeMenu() {
            headerSubmenu.classList.remove('active');
            setTimeout(function () {
                headerOverlay.classList.remove('active');
                body.classList.remove('body-lock');
                html.classList.remove('body-lock')
                headerCol3.classList.remove('blurred');
                logo?.classList.remove('active');
            }, 300);
        }

        closeSubmenu.addEventListener('click', closeMenu);

        headerOverlay.addEventListener('click', closeMenu);
    }
});