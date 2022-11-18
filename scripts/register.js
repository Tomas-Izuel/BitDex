import { animationButtonCondition } from './animations.js'

class Usuario {
  constructor(user, password, email, phone) {
    this.user = user;
    this.password = password;
    this.email = email;
    this.phone = phone;
    this.fondos = 0;
    this.bitcoins = 0;
  }

  comprarBTC(cantidad) {
    if (cantidad * precioBTC < this.fondos) {
      this.bitcoins += cantidad;
      this.fondos -= cantidad * precioBTC;
      return this.bitcoins;
    }
  }

  consultarSaldo() {
    return this.fondos;
  }

  venderBTC(cantidad) {
    if (this.bitcoins >= cantidad) {
      this.fondos += cantidad * precioBTC;
      this.bitcoins -= cantidad;
      return this.bitcoins;
    }
  }

  cambiarUsuario(user) {
    this.user = user;
    return this.user;
  }

  cambiarContraseña(password) {
    this.password = password;
    return this.password;
  }

  depositarFondos(fondos) {
    this.fondos += fondos;
    return this.fondos;
  }
}

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

  db_user.forEach((Usuario) => {
    if (Usuario.user == usuario.user || Usuario.email == usuario.email) {
      animationButtonCondition(submitRegister, 'Este usuario o email ya estan registrados <ion-icon name="close-circle-outline"></ion-icon>', "failButton", 5000, "../pages/register.html");
      bandera = true;
    }
  });
  if(bandera == false){
    registrarUsuario(usuario, db_user)
  }
};

const registrarUsuario = (usuario, db_user) => {
  db_user.push(usuario);
  localStorage.setItem("database", JSON.stringify(db_user));
  animationButtonCondition(submitRegister, 'Usuario registrado con exito<ion-icon name="checkmark-done-outline"></ion-icon>', "successButton", 4000, "../pages/login.html");
};