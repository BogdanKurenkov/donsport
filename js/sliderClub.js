document.addEventListener("DOMContentLoaded", function () {
  // Убедимся, что клубный слайдер и контейнер слайдов существуют
  const clubSlider = document.getElementById("club-slider");
  const swiperContainer = document.querySelector(".custom-swiper-container");

  if (!clubSlider || !swiperContainer) {
    console.error("Секция или контейнер слайдера не найдены.");
    return;
  }

  let isInSlider = false; // Для проверки нахождения в секции слайдера
  let isScrolling = false; // Защита от быстрого скроллинга

  let swiper; // Для хранения объекта Swiper

  // Инициализация Swiper только после того как все изображения и элементы загружены
  function initSwiper() {
    if (swiper) return; // Если уже инициализирован, не инициализировать повторно

    // Убедимся, что слайды существуют внутри контейнера
    const slides = swiperContainer.querySelectorAll(".custom-swiper-slide");
    if (slides.length === 0) {
      console.error("Нет слайдов в контейнере.");
      return;
    }

    swiper = new Swiper(swiperContainer, {
      direction: "vertical",
      loop: false,
      slidesPerView: 1,
      spaceBetween: 0,
      mousewheel: false, // Отключаем встроенный скролл Swiper
      speed: 800,
      allowTouchMove: false,
      containerClass: "custom-swiper-container", // Класс для контейнера
      slideClass: "custom-swiper-slide", // Класс для слайда
      wrapperClass: "custom-swiper-wrapper", // Класс для обертки слайдов
    });
  }

  // Инициализация слайдера после загрузки всех ресурсов
  window.onload = function () {
    initSwiper();
  };

  // Функция проверки, попали ли мы в секцию слайдера
  function checkSliderPosition() {
    const scrollTop = window.scrollY + window.innerHeight / 2;

    if (
      scrollTop >= clubSlider.offsetTop &&
      scrollTop <= clubSlider.offsetTop + clubSlider.offsetHeight
    ) {
      if (!isInSlider) {
        isInSlider = true;
        document.body.style.overflow = "hidden"; // Блокируем прокрутку страницы
      }
    } else {
      if (isInSlider) {
        isInSlider = false;
        document.body.style.overflow = "auto"; // Включаем прокрутку страницы
      }
    }
  }

  // Функция обработки прокрутки
  function handleScroll(event) {
    if (isScrolling) return;
    isScrolling = true;

    if (isInSlider) {
      event.preventDefault(); // Блокируем обычный скролл страницы

      if (event.deltaY > 0) {
        swiper.slideNext(); // Скроллим вперед (вниз)
      } else if (event.deltaY < 0) {
        swiper.slidePrev(); // Скроллим назад (вверх)
      }
    }

    setTimeout(() => {
      isScrolling = false;
    }, 800);
  }

  // Обработчик события прокрутки
  document.addEventListener("wheel", handleScroll, { passive: false });

  // Проверяем, в какой части страницы находится пользователь
  window.addEventListener("scroll", checkSliderPosition);

  // Обновляем положение слайдера при изменении размера окна
  window.addEventListener("resize", () => {
    checkSliderPosition();
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const clubSlider = document.getElementById("club-slider");
  let isInSlider = false;

  // Обработчик, который проверяет, в секции ли мы
  const checkSliderPosition = () => {
    const rect = clubSlider.getBoundingClientRect();
    isInSlider = rect.top >= 0 && rect.bottom <= window.innerHeight;
  };

  // Инициализация Swiper
  const swiper = new Swiper(".custom-swiper-container", {
    direction: "vertical",
    loop: false,
    slidesPerView: 1,
    spaceBetween: 0,
    mousewheel: true,
    speed: 800,
    allowTouchMove: false,
    containerClass: "custom-swiper-container",
    slideClass: "custom-swiper-slide",
    wrapperClass: "custom-swiper-wrapper",
    on: {
      slideChange: function () {
        console.log("Слайд изменен. Текущий индекс: " + this.realIndex);
      },
    },
  });

  // Обработчик колесика мыши
  let isScrolling = false;
  clubSlider.addEventListener("wheel", (event) => {
    checkSliderPosition(); // Проверяем, находимся ли мы в секции слайдера

    if (!isInSlider) return; // Если не находимся в секции слайдера, не прокручиваем

    if (isScrolling) return;
    isScrolling = true;

    if (event.deltaY > 0) {
      swiper.slideNext();
    } else if (event.deltaY < 0) {
      swiper.slidePrev();
    }

    setTimeout(() => {
      isScrolling = false;
    }, 800);
  });
});
