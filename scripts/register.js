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

const registrarUsuario = (usuario, db_user) => {
  db_user.push(usuario);
  //localStorage.setItem("database", JSON.stringify(db_user));
  fetch("../database/users.json", {
    method: "POST",
    body: JSON.stringify(db_user),
  })
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error))
    .then((response) => {
      /*animationButtonCondition(
        submitRegister,
        'Usuario registrado con exito<ion-icon name="checkmark-done-outline"></ion-icon>',
        "successButton",
        4000,
        "../pages/login.html"
      );*/
    });
};

const validacionRegister = (usuario) => {
  fetch("../database/users.json") //pido a la base de datos los usuarios
    .then((response) => response.json())
    .then((json) => {
      let bandera = false;
      const db_user = json;
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
      if (bandera == false) {
        registrarUsuario(usuario, db_user);
      }
    });
};
