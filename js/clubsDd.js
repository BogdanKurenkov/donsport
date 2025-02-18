document.addEventListener('DOMContentLoaded', () => {
    const mapClubs = document.querySelectorAll('.map-club');
    const clubPreviews = document.querySelectorAll('.club-preview');
    const dropdownContents = document.querySelectorAll('.dropdown-content_map');

    const closeAllDropdowns = () => {
        dropdownContents.forEach((dropdown) => {
            dropdown.classList.remove('active');
        });
        clubPreviews.forEach((preview) => {
            preview.classList.remove('club-preview_active');
        });
        mapClubs.forEach((club) => {
            club.classList.remove('active');
            club.querySelector('img').setAttribute('src', '/assets/svg/plus.svg')
        });
    };

    mapClubs.forEach((club) => {
        club.addEventListener('click', (event) => {
            const clubIndex = club.getAttribute('data-club-index');
            const dropdownContent = document.querySelector(`.dropdown-content_map[data-club-index="${clubIndex}"]`);
            const activePreview = document.querySelector(`.club-preview_${clubIndex}`);

            if (dropdownContent && dropdownContent.classList.contains('active')) {
                closeAllDropdowns();
            } else {
                closeAllDropdowns();

                if (dropdownContent) {
                    console.log(1)
                    dropdownContent.classList.add('active');
                }
                if (activePreview) {
                    console.log(2)
                    activePreview.classList.add('club-preview_active');
                }
                club.classList.add('active');
                club.querySelector('img').setAttribute('src', '/assets/svg/minus.svg')
                console.log(3)
            }
        });
    });

    clubPreviews.forEach((preview) => {
        preview.addEventListener('click', (event) => {
            const clubIndex = preview.classList[1].split('_')[1];
            const dropdownContent = document.querySelector(`.dropdown-content_map[data-club-index="${clubIndex}"]`);
            const activeClub = document.querySelector(`.map-club[data-club-index="${clubIndex}"]`);

            if (dropdownContent && dropdownContent.classList.contains('active')) {
                activeClub.querySelector('img').setAttribute('src', '/assets/svg/plus.svg')
                closeAllDropdowns();
            } else {
                closeAllDropdowns();

                if (dropdownContent) {
                    dropdownContent.classList.add('active');
                }
                if (activeClub) {
                    activeClub.classList.add('active');
                    activeClub.querySelector('img').setAttribute('src', '/assets/svg/minus.svg')
                }
                preview.classList.add('club-preview_active');
            }
        });
    });

    document.addEventListener('click', (event) => {
        if (
            !event.target.closest('.map-club') &&
            !event.target.closest('.dropdown-content_map') &&
            !event.target.closest('.club-preview')
        ) {
            closeAllDropdowns();
        }
    });
});