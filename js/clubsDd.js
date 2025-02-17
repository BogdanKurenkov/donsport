document.addEventListener('DOMContentLoaded', () => {
    const mapClubs = document.querySelectorAll('.map-club');
    const clubPreviews = document.querySelectorAll('.club-preview');

    mapClubs.forEach((club) => {
        club.addEventListener('click', (event) => {
            // Получаем индекс текущего клуба
            const clubIndex = club.getAttribute('data-club-index');

            // Находим соответствующий выпадающий блок
            const dropdownContent = document.querySelector(`.dropdown-content_map[data-club-index="${clubIndex}"]`);
            const activePreview = document.querySelector(`.club-preview_${clubIndex}`);

            if (dropdownContent.classList.contains('active')) {
                // Если выпадающий блок уже открыт, закрываем его
                dropdownContent.classList.remove('active');
                if (activePreview) {
                    activePreview.classList.remove('club-preview_active');
                }
            } else {
                // Скрываем все выпадающие блоки
                document.querySelectorAll('.dropdown-content_map').forEach((dropdown) => {
                    dropdown.classList.remove('active');
                });

                // Убираем класс .club-preview_active у всех превью
                clubPreviews.forEach((preview) => {
                    preview.classList.remove('club-preview_active');
                });

                // Показываем выбранный выпадающий блок
                if (dropdownContent) {
                    dropdownContent.classList.add('active');
                }

                // Добавляем класс .club-preview_active соответствующему превью
                if (activePreview) {
                    activePreview.classList.add('club-preview_active');
                }
            }
        });
    });

    // Закрытие выпадающего блока при клике вне его
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