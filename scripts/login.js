import { animationButtonCondition } from './animations.js'

const formLogin = document.getElementById("formLogin");
const submitLogin = document.getElementById("submitLogin");

formLogin.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = document.getElementById("usernameL").value;
  const password = document.getElementById("passwordL").value;
  validacionLogin(user, password);
});

const validacionLogin = (user, password) => {
  const db_user = JSON.parse(localStorage.getItem("database"));

  let bandera = false;
  db_user.forEach((Usuario) => {
    if (Usuario.user == user && Usuario.password == password) {
      animationButtonCondition(
        submitLogin,
        'Inicio de sesion exitoso<ion-icon name="checkmark-done-outline"></ion-icon>', "successButton", 3500, "../index.html"
      );
      sessionStorage.setItem("Usuario", JSON.stringify(Usuario));
      bandera = true;
    }
  });
  if (bandera == false) {
    animationButtonCondition(submitLogin, 'Credenciales ingresadas incorrectas <ion-icon name="close-circle-outline"></ion-icon>', "failButton", 5000, "../pages/login.html");
  }
};