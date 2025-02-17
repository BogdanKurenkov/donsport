document.addEventListener('DOMContentLoaded', () => {
    const mapClubs = document.querySelectorAll('.map-club');
    const clubPreviews = document.querySelectorAll('.club-preview');

    mapClubs.forEach((club) => {
        club.addEventListener('click', (event) => {
            const clubIndex = club.getAttribute('data-club-index');
            const dropdownContent = document.querySelector(`.dropdown-content_map[data-club-index="${clubIndex}"]`);
            const activePreview = document.querySelector(`.club-preview_${clubIndex}`);

            if (dropdownContent.classList.contains('active')) {
                dropdownContent.classList.remove('active');
                if (activePreview) {
                    activePreview.classList.remove('club-preview_active');
                }
            } else {
                document.querySelectorAll('.dropdown-content_map').forEach((dropdown) => {
                    dropdown.classList.remove('active');
                });

                clubPreviews.forEach((preview) => {
                    preview.classList.remove('club-preview_active');
                });

                if (dropdownContent) {
                    dropdownContent.classList.add('active');
                }

                if (activePreview) {
                    activePreview.classList.add('club-preview_active');
                }
            }
        });
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.map-club') && !event.target.closest('.dropdown-content_map')) {
            document.querySelectorAll('.dropdown-content_map').forEach((dropdown) => {
                dropdown.classList.remove('active');
            });
            clubPreviews.forEach((preview) => {
                preview.classList.remove('club-preview_active');
            });
        }
    });
});