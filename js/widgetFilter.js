document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".widget-filter-btn");

  const dataIdMap = {
    "Алые Паруса": 1,
    Атмосфера: 4,
    "Юго-Западная": 8,
    Хамовники: 2,
    Бирюзова: 5,
    Атлант: 3,
  };

  function updateWidget(button) {
    const newDataId = dataIdMap[button.textContent.trim()];

    let currentScript = document.getElementById("fitnesskit_lesson");
    if (!currentScript) {
      console.error("Script tag not found");
      return;
    }

    currentScript.setAttribute("data-id", newDataId);
    console.log(`data-id изменён на: ${newDataId}`);

    buttons.forEach((btn) => btn.classList.remove("widget-filter-btn--active"));
    button.classList.add("widget-filter-btn--active");

    const newScript = document.createElement("script");
    newScript.id = "fitnesskit_lesson";
    newScript.setAttribute("data-id", newDataId);
    newScript.setAttribute("data-server", "donsport");
    newScript.src =
      "https://donsport.fitnesskit-admin.ru/widget/mount/widget-lesson.js";
    newScript.async = true;

    currentScript.parentNode.replaceChild(newScript, currentScript);
  }

  buttons.forEach((button) => {
    if (dataIdMap[button.textContent.trim()] === 1) {
      button.classList.add("widget-filter-btn--active");
    }
    button.addEventListener("click", function () {
      updateWidget(button);
    });
  });
});
