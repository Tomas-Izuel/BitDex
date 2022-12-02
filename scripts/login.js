import { animationButtonCondition } from "./animations.js";

const formLogin = document.getElementById("formLogin");
const submitLogin = document.getElementById("submitLogin");

formLogin.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = document.getElementById("usernameL").value;
  const password = document.getElementById("passwordL").value;
  const stayLogedValue = document.getElementById("stayLogedValue").checked;
  validacionLogin(user, password, stayLogedValue);
});

const validacionLogin = (user, password, stayLogedValue) => {
  fetch("../database/users.json") //pido a la base de datos los usuarios
    .then((response) => response.json())
    .then((json) => {
      const db_user = json;
      let bandera = false;
      db_user.forEach((Usuario) => {
        if (Usuario.user == user && Usuario.password == password) {
          animationButtonCondition(
            submitLogin,
            'Inicio de sesion exitoso<ion-icon name="checkmark-done-outline"></ion-icon>',
            "successButton",
            3500,
            "../index.html"
          );
          if (stayLogedValue == true) {
            localStorage.setItem("Usuario", JSON.stringify(Usuario));
          } else{
            sessionStorage.setItem("Usuario", JSON.stringify(Usuario));
          }
          bandera = true;
        }
      });
      if (bandera == false) {
        animationButtonCondition(
          submitLogin,
          'Credenciales ingresadas incorrectas <ion-icon name="close-circle-outline"></ion-icon>',
          "failButton",
          5000,
          "../pages/login.html"
        );
      }
    });
};
