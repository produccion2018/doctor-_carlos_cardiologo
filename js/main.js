// =========================
// CONTADORES
// =========================

const counters =
document.querySelectorAll(".counter");

counters.forEach(counter => {

  const target =
  +counter.getAttribute("data-target");

  let count = 0;

  const increment =
  target / 100;

  const updateCounter = () => {

    count += increment;

    if(count < target){

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
// FORMULARIO
// =========================

const form =
document.getElementById("contactForm");

const formMessage =
document.getElementById("formMessage");

form.addEventListener("submit", (e) => {

  e.preventDefault();

  const name =
  document.getElementById("name");

  const email =
  document.getElementById("email");

  const service =
  document.getElementById("service");

  const message =
  document.getElementById("message");

  const errors =
  document.querySelectorAll(".error");

  errors.forEach(error => {

    error.innerText = "";

  });

  let valid = true;

  // NOMBRE

  if(name.value.trim() === ""){

    errors[0].innerText =
    "Ingresa tu nombre";

    valid = false;
  }

  // EMAIL

  if(email.value.trim() === ""){

    errors[1].innerText =
    "Ingresa tu correo";

    valid = false;

  } else if(
    !email.value.includes("@")
  ){

    errors[1].innerText =
    "Correo inválido";

    valid = false;
  }

  // SERVICIO

  if(service.value === ""){

    errors[2].innerText =
    "Selecciona una consulta";

    valid = false;
  }

  // MENSAJE

  if(message.value.trim().length < 10){

    errors[3].innerText =
    "Mínimo 10 caracteres";

    valid = false;
  }

  // EXITO

  if(valid){

    const data = {

      nombre:name.value,

      email:email.value,

      consulta:service.value,

      mensaje:message.value

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

// =========================
// MODAL
// =========================

const modal =
document.getElementById("customModal");

const closeModal =
document.getElementById("closeModal");

const heroBtn =
document.getElementById("heroBtn");

const openFormBtn =
document.getElementById("openFormBtn");

const doctorBtn =
document.querySelector(".doctor-btn");

// ABRIR MODAL

[
  heroBtn,
  openFormBtn,
  doctorBtn

].forEach(btn => {

  btn.addEventListener("click", () => {

    modal.classList.add("active");

  });

});

// CERRAR

closeModal.addEventListener("click", () => {

  modal.classList.remove("active");

});

// CERRAR AFUERA

window.addEventListener("click", (e) => {

  if(e.target === modal){

    modal.classList.remove("active");

  }

});

// =========================
// BOTON SERVICIOS
// =========================

const servicesBtn =
document.getElementById("servicesBtn");

servicesBtn.addEventListener("click", () => {

  document
  .getElementById("servicios")
  .scrollIntoView({

    behavior:"smooth"

  });

});

// =========================
// BOTONES SERVICIOS
// =========================

const serviceButtons =
document.querySelectorAll(".service-btn");

serviceButtons.forEach(button => {

  button.addEventListener("click", () => {

    alert(
      "Servicio disponible próximamente."
    );

  });

});