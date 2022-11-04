//Array simulando la tabla de usuarios de la base de datos.
const db_user = []

const precioBTC = 19000 //Este valor deberia ser variable consumiendo una API, pero para esta primera instancia se declara constante

let usuarioActual;

//Clase usuario que alojara objetos que simulan ser filas en la tabla de usuarios en backend en una aplicacion real
class Usuario{
    constructor(user,password){
        this.user = user;
        this.password = password;
        this.fondos = 0;
        this.bitcoins = 0;
    }

    comprarBTC(cantidad){
        if(cantidad * precioBTC < this.fondos){
            this.bitcoins += cantidad;
            this.fondos -= cantidad * precioBTC;
            return this.bitcoins;
        }
    }

    consultarSaldo(){
        return this.fondos;
    }

    venderBTC(cantidad){
        if(this.bitcoins >= cantidad){
            this.fondos += cantidad * precioBTC;
            this.bitcoins -= cantidad;
            return this.bitcoins;
        }
    }

    cambiarUsuario(user){
        this.user = user;
        return this.user;
    }
    
    cambiarContraseña(password){
        this.password = password;
        return this.password;
    }

    depositarFondos(fondos){
        this.fondos += fondos;
        return this.fondos;
    }
}

const user1 = new Usuario("admin","1234");
db_user.push(user1)
db_user[0].depositarFondos(9999999999)
const user2 = new Usuario("guest","1111");
db_user.push(user2)

function login(usuario, contraseña){
    db_user.forEach((Usuario) => { //validacion de usuario: Por cada usuario de la base de datos compruebo si las credenciales son iguales a las ingresadas
        if(Usuario.user == usuario && Usuario.password == contraseña){
            usuarioActual = Usuario; //Si las credenciales coinciden, seteo el usuario al usuario ingresado
            return usuarioActual;
        }
    })
}

function register(usuario, contraseña) {
    usuario = new Usuario(usuario.toString(), contraseña.toString());
    db_user.push(usuario);
    return true;
}

const menuOut = () =>{ //Menu de logueo e registro
    let menuSelector = prompt("Seleccione opcion: \n 1 - Registrarse \n 2 - Loguearse \n 0 - Salir")
        switch (menuSelector){
            case "1":
                register(prompt("Ingrese usuario"), prompt("Ingrese contraseña"));
                break;
            case "2":
                login(prompt("Ingrese usuario"), prompt("Ingrese contraseña"));
                break;
            case "0":
                break;
        }
}

menuOut();