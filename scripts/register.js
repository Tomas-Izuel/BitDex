import { animationButtonCondition } from "./animations.js";


const formRegister = document.getElementById("formRegister");
const submitRegister = document.getElementById("submitRegister");

formRegister.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

  const usuario = new Usuario(user, password, email, phone);

  validacionRegister(usuario);
});

const validacionRegister = (usuario) => {
  let bandera = false;
  const db_user = JSON.parse(localStorage.getItem("database"));

  try { //Cuando la aplicacion se ejecuta por primera vez no puede hacer esta comparacion, se debe ejecutar el contenido de la carpeta despliegue
    db_user.forEach((Usuario) => {
      if (Usuario.user == usuario.user || Usuario.email == usuario.email) {
        animationButtonCondition(
          submitRegister,
          'Este usuario o email ya estan registrados <ion-icon name="close-circle-outline"></ion-icon>',
          "failButton",
          5000,
          "../pages/register.html"
        );
        bandera = true;
      }
    });
  } catch {
    alert(
      "Si esta usando la aplicacion por primera vez, por favor ejecute despliegue.html, ubicado en la carpeta despliegue"
    );
  }
  if (bandera == false) {
    registrarUsuario(usuario, db_user);
  }
};

const registrarUsuario = (usuario, db_user) => {
  db_user.push(usuario);
  localStorage.setItem("database", JSON.stringify(db_user));
  animationButtonCondition(
    submitRegister,
    'Usuario registrado con exito<ion-icon name="checkmark-done-outline"></ion-icon>',
    "successButton",
    4000,
    "../pages/login.html"
  );
};
