const usuarioLocal = localStorage.getItem("Usuario");
const usuarioSession = sessionStorage.getItem("Usuario");
const profile = document.getElementById("profile");
const noProfile = document.getElementById("noProfile");
const logout = document.getElementById("logout");

let logged = false;
let whereLogged;

if (usuarioSession != null || usuarioLocal != null) {
  if (usuarioSession != null) {
    whereLogged = "sessionStorage";
  } else if (usuarioLocal != null) {
    whereLogged = "localStorage";
  }
  profile.style.display = "none";
  noProfile.style.display = "flex";
  logged = true;
}

logout.addEventListener("click", () => {
  sessionStorage.clear();
  localStorage.removeItem("Usuario");
  logged = false;
  whereIsLogged = null
  location.reload();
});

const isLogged = () => {
  return logged;
};

function whereIsLogged() {
    return whereLogged;
};
