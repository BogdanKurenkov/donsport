
document.addEventListener('DOMContentLoaded', () => {

    console.log(document.getElementById('phone-number'))

    const clipboard = new ClipboardJS('#phone-number', {
        text: function () {
            return document.getElementById('phone-number').textContent;
        }
    });

    clipboard.on('success', function (e) {
        e.clearSelection();

        Toastify({
            text: "Номер скопирован",
            duration: 2000,
            close: true,
            gravity: "bottom",
            position: "right",
            style: {
                background: "#E82525",
            },
        }).showToast();
    });

    clipboard.on('error', function (e) {
        console.error('Ошибка при копировании:', e);

        Toastify({
            text: "Не удалось скопировать номер",
            duration: 2000,
            close: true,
            gravity: "bottom",
            position: "right",
            style: {
                background: "#E82525",
            },
        }).showToast();
    });
})