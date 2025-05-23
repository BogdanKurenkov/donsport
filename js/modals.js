document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;
  const body = document.body;
  const modals = document.querySelectorAll(".overlay");

  const triggerOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      toggleModal(e.currentTarget);
    }
  };

  const toggleModal = (modal) => {
    if (!modal) return;
    modal.classList.toggle("overlay_active");
    html.classList.toggle("body-lock");
    body.classList.toggle("body-lock");
  };

  const openModal = (e) => {
    const modalId = e.target.getAttribute("data-modal-id");
    const modal = document.getElementById(modalId);
    if (modal) {
      toggleModal(modal);
    }
  };

  modals.forEach((modal) => {
    const closeModal = modal.querySelector(".close-card");
    closeModal?.addEventListener("click", () => {
      toggleModal(modal);
    });

    modal.addEventListener("click", triggerOverlayClick);
  });

  const actionBtns = document.querySelectorAll("[data-modal-id]");
  actionBtns.forEach((button) => {
    button.addEventListener("click", openModal);
  });

  document.addEventListener("submit", function (event) {
    if (event.target.classList.contains("buy-card-form")) {
      event.preventDefault();

      const form = event.target;
      let hasError = false;

      const nameInputs = form.querySelectorAll('input[placeholder="Имя"]');
      nameInputs.forEach((nameInput) => {
        const name = nameInput.value.trim();
        if (!name) {
          if (
            !nameInput.nextElementSibling?.classList.contains("error-message")
          ) {
            showError(nameInput, "Укажите имя");
          }
          nameInput.classList.add("error");
          hasError = true;
        } else {
          nameInput.classList.remove("error");
        }
      });

      const phoneInputs = form.querySelectorAll('input[placeholder="Телефон"]');
      phoneInputs.forEach((phoneInput) => {
        const phone = phoneInput.value.trim();
        if (!phone || phone.length !== 21) {
          if (
            !phoneInput.nextElementSibling?.classList.contains("error-message")
          ) {
            showError(phoneInput, "Номер телефона +7 (xxx) xxx-xx-xx");
          }
          phoneInput.classList.add("error");
          hasError = true;
        } else {
          phoneInput.classList.remove("error");
        }
      });

      const amountInputs = form.querySelectorAll(
        'input[placeholder="Номинал"]'
      );
      amountInputs.forEach((amountInput) => {
        amountInput.addEventListener("input", (e) => {
          e.target.value = e.target.value.replace(/\D/g, "");
        });
        const amount = parseInt(amountInput.value.trim(), 10);
        if (isNaN(amount) || amount < 1000 || amount > 100000) {
          if (
            !amountInput.nextElementSibling?.classList.contains("error-message")
          ) {
            showError(amountInput, "Введите сумму от 1000 до 100000 рублей");
          }
          amountInput.classList.add("error");
          hasError = true;
        } else {
          amountInput.classList.remove("error");
        }
      });

      const emailInputs = form.querySelectorAll('input[placeholder="E-mail"]');
      emailInputs.forEach((emailInput) => {
        const email = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
          if (
            !emailInput.nextElementSibling?.classList.contains("error-message")
          ) {
            showError(emailInput, "Введите корректный E-mail");
          }
          emailInput.classList.add("error");
          hasError = true;
        } else {
          emailInput.classList.remove("error");
        }
      });

      if (hasError) return;

      let phoneCall = phoneInputs[0].value.replace(/[-+()\s]/g, "");
      let clubCall =
        form.querySelector(".menu-item.selected")?.getAttribute("data-value") ||
        "";

      const fields = [
        { name: "name", value: nameInputs[0].value },
        { name: "club", value: clubCall },
      ];

      function requestCallback(data) {
        console.log(data);

        const activeModal = document.querySelector(".overlay.overlay_active");
        if (activeModal) {
          toggleModal(activeModal);
        }

        const successModal = document.getElementById("success-modal");
        if (successModal) {
          const title = successModal.querySelector(".success-modal__title");
          const message = successModal.querySelector(".success-modal__text");

          if (data === false) {
            title.textContent = "Ошибка отправки формы!";
            message.textContent =
              "Попробуйте еще раз или свяжитесь с нами другим способом.";
          }

          toggleModal(successModal);

          const returnBtn = successModal.querySelector(".return-btn");
          if (returnBtn) {
            returnBtn.addEventListener(
              "click",
              () => {
                toggleModal(successModal);
              },
              { once: true }
            );
          }
        }
      }

      //Вызов второй модалки

      window.ctw.createRequest(
        "SIMPLE_FORM_4",
        phoneCall,
        fields,
        requestCallback
      );
    }
  });

  document.addEventListener("click", function (event) {
    const returnBtn = event.target.closest(".return-btn");
    if (returnBtn) {
      const successModal = document.getElementById("success-modal");
      if (successModal && successModal.classList.contains("overlay_active")) {
        toggleModal(successModal);
      }
    }
  });

  function showError(element, message) {
    const errorMessage = document.createElement("div");
    errorMessage.className = "error-message";
    errorMessage.innerHTML = `
          <p>${message}</p>
          <svg class="close-error" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4.5L4 12.5" stroke="#E82525" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M4 4.5L12 12.5" stroke="#E82525" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
      `;

    element.insertAdjacentElement("afterend", errorMessage);

    setTimeout(() => {
      errorMessage.classList.add("visible");
    }, 10);

    errorMessage
      .querySelector(".close-error")
      .addEventListener("click", function () {
        errorMessage.classList.remove("visible");
        setTimeout(() => {
          errorMessage.remove();
        }, 300);
        element.classList.remove("error");
      });
  }

  document.addEventListener("input", function (event) {
    const target = event.target;

    if (target.tagName === "INPUT") {
      const errorMessage = target.nextElementSibling;

      if (errorMessage && errorMessage.classList.contains("error-message")) {
        if (target.placeholder === "Телефон") {
          const phone = target.value.trim();
          if (phone.length === 21) {
            errorMessage.classList.remove("visible");
            setTimeout(() => {
              errorMessage.remove();
            }, 300);
            target.classList.remove("error");
          }
        } else {
          if (target.value.trim()) {
            errorMessage.classList.remove("visible");
            setTimeout(() => {
              errorMessage.remove();
            }, 300);
            target.classList.remove("error");
          }
        }
      }
    }
  });

  const phoneInputs = document.querySelectorAll("#input-phone");
  phoneInputs.forEach((input) => {
    IMask(input, {
      mask: "+{7}(000) 000 - 00 - 00",
    });
  });

  document.addEventListener("click", function (event) {
    if (event.target.closest(".dropdown-menu .menu-item")) {
      const menuItem = event.target.closest(".menu-item");
      const dropdownHeader = menuItem
        .closest(".dropdown-container")
        .querySelector(".dropdown-header");
      const selectedItem = dropdownHeader.querySelector(".selected-item");
      selectedItem.textContent = menuItem.getAttribute("data-value");

      const dropdownContainer = menuItem.closest(".dropdown-container");
      dropdownContainer.classList.remove("error");

      const errorMessage = dropdownContainer.nextElementSibling;
      if (errorMessage && errorMessage.classList.contains("error-message")) {
        errorMessage.classList.remove("visible");
        setTimeout(() => {
          errorMessage.remove();
        }, 300);
      }
    }
  });
});
