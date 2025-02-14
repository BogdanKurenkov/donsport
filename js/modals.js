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
        const closeModal = modal.querySelector('#modal-close');
        closeModal?.addEventListener('click', () => {
            toggleModal(modal)
        })
        modal.addEventListener('click', triggerOverlayClick)
    })

    const actionBtns = document.querySelectorAll('[data-modal-id]');
    actionBtns.forEach(button => {
        button.addEventListener('click', openModal);
    });

});