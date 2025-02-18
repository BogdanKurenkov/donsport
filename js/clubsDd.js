document.addEventListener('DOMContentLoaded', () => {
    const mapClubs = document.querySelectorAll('.map-club');
    const clubPreviews = document.querySelectorAll('.club-preview');
    const dropdownContents = document.querySelectorAll('.dropdown-content_map');

    const closeAllDropdowns = () => {
        dropdownContents.forEach((dropdown) => {
            if (dropdown.classList.contains('active')) {
                dropdown.style.maxHeight = `${dropdown.scrollHeight}px`;
                setTimeout(() => {
                    dropdown.style.maxHeight = '0';
                }, 10);

                setTimeout(() => {
                    dropdown.classList.remove('active');
                    dropdown.style.transform = 'translateY(0)';
                }, 300);
            }
        });

        clubPreviews.forEach((preview) => {
            preview.classList.remove('club-preview_active');
        });

        mapClubs.forEach((club) => {
            club.classList.remove('active');
            club.querySelector('.plus').classList.remove('hidden')
            club.querySelector('.minus').classList.remove('active')
        });
    };

    const showDropdown = (dropdownContent, activePreview, club) => {
        closeAllDropdowns();

        if (dropdownContent) {
            dropdownContent.classList.add('active');

            dropdownContent.style.maxHeight = '0';
            setTimeout(() => {
                dropdownContent.style.maxHeight = `${dropdownContent.scrollHeight}px`;
            }, 10);

            const rect = dropdownContent.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            if (rect.bottom > viewportHeight) {
                dropdownContent.style.transform = 'translateY(-100%)';
            } else {
                dropdownContent.style.transform = 'translateY(0)';
            }
        }

        if (activePreview) {
            activePreview.classList.add('club-preview_active');
        }

        if (club) {
            club.classList.add('active');
            club.querySelector('.plus').classList.add('hidden')
            club.querySelector('.minus').classList.add('active')
        }
    };

    mapClubs.forEach((club) => {
        club.addEventListener('click', (event) => {
            const clubIndex = club.getAttribute('data-club-index');
            const dropdownContent = document.querySelector(`.dropdown-content_map[data-club-index="${clubIndex}"]`);
            const activePreview = document.querySelector(`.club-preview_${clubIndex}`);

            if (dropdownContent && dropdownContent.classList.contains('active')) {
                closeAllDropdowns();
            } else {
                showDropdown(dropdownContent, activePreview, club);
            }
        });
    });

    clubPreviews.forEach((preview) => {
        preview.addEventListener('click', (event) => {
            const clubIndex = preview.classList[1].split('_')[1];
            const dropdownContent = document.querySelector(`.dropdown-content_map[data-club-index="${clubIndex}"]`);
            const activeClub = document.querySelector(`.map-club[data-club-index="${clubIndex}"]`);

            if (dropdownContent && dropdownContent.classList.contains('active')) {
                closeAllDropdowns();
            } else {
                showDropdown(dropdownContent, null, activeClub);
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