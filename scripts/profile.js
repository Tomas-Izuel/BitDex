import { animationButtonCondition } from "./animations.js";

const profileP = JSON.parse(sessionStorage.getItem("Usuario"));
if (profileP == null) {
  //Validacion para que solo se pueda acceder a esta pagina cuando se esta logueado a un perfil
  location.href = "../index.html";
}

const usernameP = document.getElementById("usernameP");
const passwordP = document.getElementById("passwordP");
const emailP = document.getElementById("emailP");
const numeroP = document.getElementById("numeroP");

const submitProfile = document.getElementById("submitProfile");

const db_user = JSON.parse(localStorage.getItem("database"));

usernameP.value = profileP.user;
emailP.value = profileP.email;
numeroP.value = profileP.phone;

const editProfile = () => {
  db_user.forEach((Usuario) => {
    if (Usuario.oid == profileP.oid) {
      sessionStorage.clear()
      Usuario.user = usernameP.value;
      Usuario.email = emailP.value;
      Usuario.phone = numeroP.value;
      if (passwordP.value != "") {
        Usuario.password = passwordP.value;
      }
      animationButtonCondition(
        submitProfile,
        'Perfil modificado <ion-icon name="checkmark-done-outline"></ion-icon>',
        "successButton",
        5000,
        "../pages/profile.html"
      );
      localStorage.setItem("database", JSON.stringify(db_user));
      sessionStorage.setItem("Usuario", JSON.stringify(Usuario));
    }
  });
};

submitProfile.onclick = function (e) {
  e.preventDefault();
  editProfile();
};
