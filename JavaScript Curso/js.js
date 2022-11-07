//Array simulando la tabla de usuarios de la base de datos.
const db_user = [];

const precioBTC = 19000; //Este valor deberia ser variable consumiendo una API, pero para esta primera instancia se declara constante

let usuarioActual;

//Clase usuario que alojara objetos que simulan ser filas en la tabla de usuarios en backend en una aplicacion real
class Usuario {
  constructor(user, password) {
    this.user = user;
    this.password = password;
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

const user1 = new Usuario("admin", "1234");
db_user.push(user1);
db_user[0].depositarFondos(9999999999);
const user2 = new Usuario("guest", "1111");
db_user.push(user2);

function login(usuario, contraseña) {
  db_user.forEach((Usuario) => {
    //validacion de usuario: Por cada usuario de la base de datos compruebo si las credenciales son iguales a las ingresadas
    if (Usuario.user == usuario && Usuario.password == contraseña) {
      usuarioActual = Usuario; //Si las credenciales coinciden, seteo el usuario al usuario ingresado
      alert(`registro exitoso al usuario ${usuarioActual.user}`);
      return usuarioActual;
    }
  });
  if(usuarioActual == undefined){
    alert("no se encontraron coincidencias para las credenciales ingresadas");
    return false;
  }
}

function register(usuario, contraseña) {
  usuario = new Usuario(usuario.toString(), contraseña.toString());
  db_user.push(usuario);
  alert(`Usuario ${usuario.user} registrado con exito`);
  return true;
}

const menuIn = () => {
  let menuSelector;
  do {
    menuSelector = prompt(
      "Seleccione opcion: \n 1 - Consultar saldo \n 2 - Depositar fondos \n 3 - Comprar BTC \n 4 - Vender BTC  \n 5 - Cambiar username \n 6 - Cambiar contraseña \n 0 - Cerrar sesion"
    );
    switch (menuSelector) {
      case "1":
        alert(`Tu saldo es ${usuarioActual.consultarSaldo()}`)
        break;
      case "2":
        usuarioActual.depositarFondos(parseFloat(prompt("Ingrese los fondos a depositar")));
        break;
      case "3":
        usuarioActual.comprarBTC(parseInt(prompt("Ingrese la cantidad de BTC a comprar")))
        alert(`Tu cuenta tiene ${usuarioActual.bitcoins}`)
        break;
      case "4":
        usuarioActual.venderBTC(parseInt(prompt("Ingrese la cantidad de BTC que quiere vender")))
        alert(`Tu cuenta tiene ${usuarioActual.bitcoins}`)
        break;
      case "5":
        usuarioActual.cambiarUsuario(prompt("Ingrese su nuevo usuario"));
        alert(`Ahora tu usuario es ${usuarioActual.user}`);
        break;
      case "6":
        usuarioActual.cambiarContraseña(prompt("Ingrese su nueva contraseña"))
        alert(`Ahora tu contraseña es ${usuarioActual.password}`)
      case "0":
        usuarioActual = undefined;
        break;
      default:
        alert("Ingrese una opcion valida");
    }
  } while (menuSelector != 0);
};

const menuOut = () => {
  //Menu de logueo e registro
  let menuSelector;
  do {
    menuSelector = prompt(
      "Seleccione opcion: \n 1 - Registrarse \n 2 - Loguearse \n 0 - Salir"
    );
    switch (menuSelector) {
      case "1":
        register(prompt("Ingrese usuario"), prompt("Ingrese contraseña"));
        break;
      case "2":
        if(login(prompt("Ingrese usuario"), prompt("Ingrese contraseña")) != false){
            menuIn();
        }
        break;
      case "0":
        break;
      default:
        alert("Ingrese una opcion valida");
    }
  } while (menuSelector != 0);
};

menuOut();
