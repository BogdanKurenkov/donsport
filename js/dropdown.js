document.addEventListener('DOMContentLoaded', () => {

  const datesDd = document.querySelectorAll('#dd-date');
  const today = new Date();

  const getDateAfterDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const days = ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"];

  const getDayOfWeek = (date) => {
    return days[date.getDay()];
  };

  const nextDay1 = getDateAfterDays(today, 1);
  const nextDay2 = getDateAfterDays(today, 2);
  const nextDay3 = getDateAfterDays(today, 3);
  const d = today.toLocaleDateString().split('.').slice(0, 2).join('.');
  const nd = nextDay1.toLocaleDateString().split('.').slice(0, 2).join('.');
  const nd2 = nextDay2.toLocaleDateString().split('.').slice(0, 2).join('.');
  const nd3 = nextDay3.toLocaleDateString().split('.').slice(0, 2).join('.');
  const insert = document.querySelectorAll('#insert');


  insert.forEach((item) => {
    item.textContent = `Сегодня, ${d}`
  })


  datesDd.forEach((dd) => {
    const dateItems = dd.querySelectorAll('.menu-item_date');

    dateItems.forEach((item, index) => {
      if (index === 0) {
        item.setAttribute("data-value", `Сегодня, ${d}`);
        item.querySelector('span').textContent = d
      }

      if (index === 1) {
        item.setAttribute("data-value", `Завтра, ${nd}`);
        item.querySelector('span').textContent = nd;
      }

      if (index === 2) {
        item.setAttribute('data-value', `${getDayOfWeek(nextDay2)}, ${nd2}`)
        item.querySelector('span').textContent = nd2;
      }
      if (index === 3) {
        item.setAttribute('data-value', `${getDayOfWeek(nextDay3)}, ${nd3}`)
        item.querySelector('span').textContent = nd3;
      }

    })

  })

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