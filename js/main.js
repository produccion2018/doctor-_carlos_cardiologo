document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // MENU MOBILE
  // =========================

  const menuBtn =
  document.getElementById("menuBtn");

  const navMenu =
  document.getElementById("navMenu");

  menuBtn.addEventListener("click", () => {

    navMenu.classList.toggle("active");

  });

  // =========================
  // CONTADORES
  // =========================

  const counters =
  document.querySelectorAll(".counter");

  counters.forEach(counter => {

    const target =
    +counter.dataset.target;

    let count = 0;

    const updateCounter = () => {

      const increment =
      target / 100;

      if(count < target){

        count += increment;

        counter.innerText =
        Math.floor(count);

        setTimeout(updateCounter, 20);

      } else {

        counter.innerText = target;

      }

    };

    updateCounter();

  });

  // =========================
  // SERVICIOS
  // =========================

  const serviceButtons =
  document.querySelectorAll(".service-btn");

  serviceButtons.forEach(button => {

    button.addEventListener("click", () => {

      const card =
      button.parentElement;

      card.classList.toggle("active");

      if(card.classList.contains("active")){

        button.innerText =
        "Ocultar";

      } else {

        button.innerText =
        "Ver más";
      }

    });

  });

  // =========================
  // MODAL
  // =========================

  const modal =
  document.getElementById("modal");

  const openButtons =
  document.querySelectorAll(".open-modal");

  const closeModal =
  document.getElementById("closeModal");

  openButtons.forEach(button => {

    button.addEventListener("click", () => {

      modal.classList.add("active");

    });

  });

  closeModal.addEventListener("click", () => {

    modal.classList.remove("active");

  });

  window.addEventListener("click", (e) => {

    if(e.target === modal){

      modal.classList.remove("active");

    }

  });

  // =========================
  // SCROLL CONTACTO
  // =========================

  const contactBtn =
  document.querySelector(".scroll-contact");

  contactBtn.addEventListener("click", () => {

    document
    .getElementById("contacto")
    .scrollIntoView({
      behavior:"smooth"
    });

  });

  // =========================
  // FORMULARIO
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

  function showError(input, message){

    const error =
    input.parentElement.querySelector(".error");

    error.innerText = message;

    input.style.borderColor =
    "crimson";
  }

  function clearError(input){

    const error =
    input.parentElement.querySelector(".error");

    error.innerText = "";

    input.style.borderColor =
    "#ddd";
  }

  function validateEmail(email){

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    .test(email);
  }

  form.addEventListener("submit", (e) => {

    e.preventDefault();

    let valid = true;

    // NOMBRE

    if(nameInput.value.trim() === ""){

      showError(
        nameInput,
        "Ingresa tu nombre"
      );

      valid = false;

    } else {

      clearError(nameInput);

    }

    // EMAIL

    if(emailInput.value.trim() === ""){

      showError(
        emailInput,
        "Ingresa tu email"
      );

      valid = false;

    } else if(
      !validateEmail(emailInput.value)
    ){

      showError(
        emailInput,
        "Correo inválido"
      );

      valid = false;

    } else {

      clearError(emailInput);

    }

    // SERVICIO

    if(serviceInput.value === ""){

      showError(
        serviceInput,
        "Selecciona una consulta"
      );

      valid = false;

    } else {

      clearError(serviceInput);

    }

    // MENSAJE

    if(messageInput.value.trim().length < 10){

      showError(
        messageInput,
        "Mínimo 10 caracteres"
      );

      valid = false;

    } else {

      clearError(messageInput);

    }

    // SUCCESS

    if(valid){

      const data = {

        nombre:nameInput.value,

        email:emailInput.value,

        consulta:serviceInput.value,

        mensaje:messageInput.value,

        fecha:new Date()
        .toLocaleString()

      };

      let consultas =
      JSON.parse(
        localStorage.getItem("consultas")
      ) || [];

      consultas.push(data);

      localStorage.setItem(
        "consultas",
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

});