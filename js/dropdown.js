document.addEventListener('DOMContentLoaded', () => {

  // const datesDd = document.querySelectorAll('#dd-date');

  // datesDd.forEach((dateItem) => {
  //   const span = dateItem.querySelectorAll('span');
  //   console.log(span)
  // })

  document.addEventListener('click', (event) => {
    const dropdownHeader = event.target.closest('.dropdown-header[data-dropdown]');
    if (!dropdownHeader) return;

    const dropdownContainer = dropdownHeader.parentElement;
    const dropdownMenu = dropdownContainer.querySelector('.dropdown-menu');
    const arrowIcon = dropdownHeader.querySelector('.arrow-icon');

    if (dropdownMenu.classList.contains('show')) {
      dropdownMenu.classList.remove('show');
      arrowIcon.style.transform = 'rotate(0deg)';
    } else {
      closeAllDropdowns(dropdownContainer);

      dropdownMenu.classList.add('show');
      arrowIcon.style.transform = 'rotate(180deg)';
    }
  });

  document.addEventListener('click', (event) => {
    const menuItem = event.target.closest('.menu-item');
    if (!menuItem) return;

    const dropdownMenu = menuItem.closest('.dropdown-menu');
    const dropdownHeader = dropdownMenu.previousElementSibling;
    const selectedItemText = dropdownHeader.querySelector('.selected-item');
    const arrowIcon = dropdownHeader.querySelector('.arrow-icon');

    const selectedValue = menuItem.getAttribute('data-value');
    selectedItemText.textContent = selectedValue;

    dropdownMenu.querySelectorAll('.menu-item').forEach(el => el.classList.remove('selected'));
    menuItem.classList.add('selected');

    dropdownMenu.classList.remove('show');
    arrowIcon.style.transform = 'rotate(0deg)';
  });

  function closeAllDropdowns(excludeContainer) {
    document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
      if (menu.parentElement !== excludeContainer) {
        menu.classList.remove('show');
        const arrowIcon = menu.previousElementSibling.querySelector('.arrow-icon');
        arrowIcon.style.transform = 'rotate(0deg)';
      }
    });
  }
});