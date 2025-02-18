document.addEventListener('DOMContentLoaded', () => {
    const html = document.documentElement;
    const body = document.body;
    const modals = document.querySelectorAll('.overlay');

    const triggerOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            toggleModal(e.currentTarget)
        }
    }

    const toggleModal = (modal) => {
        if (!modal) return
        modal.classList.toggle('overlay_active');
        html.classList.toggle('body-lock');
        body.classList.toggle('body-lock');
    };

    const openModal = (e) => {
        const modalId = e.target.getAttribute('data-modal-id');
        const modal = document.getElementById(modalId);
        if (modal) {
            toggleModal(modal)
        }
    }

    modals.forEach((modal) => {
        const closeModal = modal.querySelector('.close-card');
        closeModal?.addEventListener('click', () => {
            toggleModal(modal)
        })
        modal.addEventListener('click', triggerOverlayClick)
    })

    const actionBtns = document.querySelectorAll('[data-modal-id]');
    actionBtns.forEach(button => {
        button.addEventListener('click', openModal);
    });


    document.addEventListener('submit', function (event) {
        if (event.target.classList.contains('buy-card-form')) {
            event.preventDefault();

            const form = event.target;
            let hasError = false;

            const nameInput = form.querySelector('input[placeholder="Имя"]');
            const name = nameInput.value.trim();
            if (!name) {
                if (!nameInput.nextElementSibling?.classList.contains('error-message')) {
                    showError(nameInput, 'Укажите имя');
                }
                nameInput.classList.add('error');
                hasError = true;
            } else {
                nameInput.classList.remove('error');
            }

            const phoneInput = form.querySelector('input[placeholder="Телефон"]');
            const phone = phoneInput.value.trim();
            if (!phone) {
                if (!phoneInput.nextElementSibling?.classList.contains('error-message')) {
                    showError(phoneInput, 'Укажите телефон');
                }
                phoneInput.classList.add('error');
                hasError = true;
            } else {
                phoneInput.classList.remove('error');
            }

            const dateDropdown = form.querySelector('.dropdown-container .selected-item');
            const selectedDate = dateDropdown.textContent.trim();
            if (!selectedDate) {
                const dropdownContainer = dateDropdown.closest('.dropdown-container');
                if (!dropdownContainer.nextElementSibling?.classList.contains('error-message')) {
                    showError(dropdownContainer, 'Выберите дату');
                }
                dropdownContainer.classList.add('error');
                hasError = true;
            } else {
                dropdownContainer?.classList.remove('error');
            }

            const timeDropdown = form.querySelectorAll('.dropdown-container .selected-item')[1];
            const selectedTime = timeDropdown.textContent.trim();
            if (!selectedTime) {
                const dropdownContainer = timeDropdown.closest('.dropdown-container');
                if (!dropdownContainer.nextElementSibling?.classList.contains('error-message')) {
                    showError(dropdownContainer, 'Выберите время');
                }
                dropdownContainer.classList.add('error');
                hasError = true;
            } else {
                dropdownContainer.classList.remove('error');
            }

            if (hasError) return;

            const formData = {
                name: name,
                phone: phone,
                date: selectedDate,
                time: selectedTime
            };

            console.log('Данные формы:', formData);
        }
    });

    function showError(element, message) {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.innerHTML = `
        <span>${message}</span>
        <img class="close-error" alt="close" src="/assets/svg/close-error.svg" />
    `;

        element.insertAdjacentElement('afterend', errorMessage);

        setTimeout(() => {
            errorMessage.classList.add('visible');
        }, 10);

        errorMessage.querySelector('.close-error').addEventListener('click', function () {
            errorMessage.classList.remove('visible');
            setTimeout(() => {
                errorMessage.remove();
            }, 300);
            element.classList.remove('error');
        });
    }

    document.addEventListener('input', function (event) {
        const target = event.target;

        if (target.tagName === 'INPUT') {
            const errorMessage = target.nextElementSibling;

            if (errorMessage && errorMessage.classList.contains('error-message')) {
                if (target.value.trim()) {
                    errorMessage.classList.remove('visible');
                    setTimeout(() => {
                        errorMessage.remove();
                    }, 300);
                    target.classList.remove('error');
                }
            }
        }
    });

    document.addEventListener('click', function (event) {
        if (event.target.closest('.dropdown-menu .menu-item')) {
            const menuItem = event.target.closest('.menu-item');
            const dropdownHeader = menuItem.closest('.dropdown-container').querySelector('.dropdown-header');
            const selectedItem = dropdownHeader.querySelector('.selected-item');
            selectedItem.textContent = menuItem.getAttribute('data-value');

            const dropdownContainer = menuItem.closest('.dropdown-container');
            dropdownContainer.classList.remove('error');

            const errorMessage = dropdownContainer.nextElementSibling;
            if (errorMessage && errorMessage.classList.contains('error-message')) {
                errorMessage.classList.remove('visible');
                setTimeout(() => {
                    errorMessage.remove();
                }, 300);
            }
        }
    });

});