window.onload = function () {
    const elements = document.querySelectorAll('.page-title span');

    elements.forEach(element => {
        element.classList.add('active'); 
    });
};