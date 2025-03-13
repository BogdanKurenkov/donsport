const year2003Desktop = document.querySelector(
  ".history-right-date__desktop .box-upper-date-prev"
);
const year2025Desktop = document.querySelector(
  ".history-right-date__desktop .box-upper-date-now"
);
const year2003Mobile = document.querySelector(
  ".history-right-date__mobile .box-upper-date-prev"
);
const year2025Mobile = document.querySelector(
  ".history-right-date__mobile .box-upper-date-now"
);

const textBlock = document.querySelector(".history-right__box-lower__text");
const imageBlock = document.querySelector(".history-left img");

const historyContent = {
  2003: {
    text: 'В 2003 году фитнес-клуб "ДОНСПОРТ" был основан как небольшое пространство, где энтузиасты спорта могли тренироваться и заниматься фитнесом. С акцентом на индивидуальный подход и дружелюбную атмосферу, клуб быстро завоевал популярность среди местных жителей. Предлагая разнообразные тренировки, включая групповые занятия и персональные тренировки, "Донспорт" стал важной частью сообщества, привлекая людей с разными уровнями подготовки',
    img: "/assets/img/history-card.png",
  },
  2025: {
    text: 'К 2025 году "ДОНСПОРТ" преобразился в современный фитнес-центр, который включает в себя не только тренажерный зал, но и зоны для функциональных тренировок, студии для групповых занятий, а также wellness-зоны для отдыха и восстановления. Клуб активно использует технологии, предлагая клиентам приложения для отслеживания прогресса и виртуальные тренировки. Сообщество вокруг "Донспорт" стало еще более крепким, так как клуб организует различные мероприятия и соревнования, поддерживая дух единства и мотивации среди своих участников',
    img: "/assets/img/history-card-2025.png",
  },
};

function updateHistory(year) {
  textBlock.textContent = historyContent[year].text;
  imageBlock.src = historyContent[year].img;

  year2003Desktop.classList.remove("active-year");
  year2025Desktop.classList.remove("active-year");
  year2003Mobile.classList.remove("active-year");
  year2025Mobile.classList.remove("active-year");

  if (year === "2003") {
    year2003Desktop.classList.add("active-year");
    year2003Mobile.classList.add("active-year");
  } else {
    year2025Desktop.classList.add("active-year");
    year2025Mobile.classList.add("active-year");
  }
}

year2003Desktop.addEventListener("click", () => updateHistory("2003"));
year2003Mobile.addEventListener("click", () => updateHistory("2003"));
year2025Desktop.addEventListener("click", () => updateHistory("2025"));
year2025Mobile.addEventListener("click", () => updateHistory("2025"));
