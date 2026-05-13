document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // MENU MOBILE
  // =========================

  const menuBtn =
  document.getElementById("menuBtn");

  const mobileMenu =
  document.getElementById("mobileMenu");

  if(menuBtn && mobileMenu){

    menuBtn.addEventListener("click", () => {

      mobileMenu.classList.toggle("active");

    });

  }

  // =========================
  // CONTADORES
  // =========================

  const counters =
  document.querySelectorAll(".counter");

  counters.forEach(counter => {

    const target =
    Number(counter.dataset.target);

    const suffix =
    counter.dataset.suffix || "";

    const format =
    counter.dataset.format || "";

    let current = 0;

    const increment =
    target / 100;

    const updateCounter = () => {

      current += increment;

      if(current < target){

        if(format === "k"){

          counter.innerText =
          "+" +
          (current / 1000).toFixed(1) +
          "K";

        } else {

          counter.innerText =
          Math.floor(current) + suffix;

        }

        requestAnimationFrame(updateCounter);

      } else {

        if(format === "k"){

          counter.innerText = "+5K";

        } else {

          counter.innerText =
          target + suffix;

        }

      }

    };

    updateCounter();

  });

  // =========================
  // FORM
  // =========================

  const form =
  document.getElementById("contactForm");

  const formMessage =
  document.getElementById("formMessage");

  const nameInput =
  document.getElementById("name");

  const emailInput =
  document.getElementById("email");

  const serviceInput =
  document.getElementById("service");

  const messageInput =
  document.getElementById("message");

  // =========================
  // EMAIL
  // =========================

  function validateEmail(email){

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  }

  // =========================
  // ERROR
  // =========================

  function showError(input, message){

    const error =
    input.parentElement.querySelector(".error");

    error.textContent = message;

    input.style.borderColor = "crimson";

  }

  function clearError(input){

    const error =
    input.parentElement.querySelector(".error");

    error.textContent = "";

    input.style.borderColor = "#d1d5db";

  }

  // =========================
  // SUBMIT
  // =========================

  if(form){

    form.addEventListener("submit", (e) => {

      e.preventDefault();

      let isValid = true;

      // NOMBRE

      if(nameInput.value.trim() === ""){

        showError(
          nameInput,
          "Ingresa tu nombre"
        );

        isValid = false;

      } else {

        clearError(nameInput);

      }

      // EMAIL

      if(emailInput.value.trim() === ""){

        showError(
          emailInput,
          "Ingresa tu email"
        );

        isValid = false;

      } else if(
        !validateEmail(emailInput.value)
      ){

        showError(
          emailInput,
          "Correo inválido"
        );

        isValid = false;

      } else {

        clearError(emailInput);

      }

      // CONSULTA

      if(serviceInput.value === ""){

        showError(
          serviceInput,
          "Selecciona una consulta"
        );

        isValid = false;

      } else {

        clearError(serviceInput);

      }

      // MENSAJE

      if(messageInput.value.trim().length < 10){

        showError(
          messageInput,
          "Mínimo 10 caracteres"
        );

        isValid = false;

      } else {

        clearError(messageInput);

      }

      // SUCCESS

      if(isValid){

        const data = {

          nombre:nameInput.value,

          email:emailInput.value,

          consulta:serviceInput.value,

          mensaje:messageInput.value,

          fecha:new Date().toLocaleString()

        };

        let consultas =
        JSON.parse(
          localStorage.getItem("consultasCardio")
        ) || [];

        consultas.push(data);

        localStorage.setItem(
          "consultasCardio",
          JSON.stringify(consultas)
        );

        formMessage.innerHTML = `

          <div class="success-message">

            ✅ Consulta enviada correctamente

          </div>

        `;

        form.reset();

        setTimeout(() => {

          formMessage.innerHTML = "";

        }, 4000);

      }

    });

  }

  // =========================
  // LIMPIAR ERRORES
  // =========================

  [
    nameInput,
    emailInput,
    serviceInput,
    messageInput

  ].forEach(input => {

    input.addEventListener("input", () => {

      clearError(input);

    });

  });

});