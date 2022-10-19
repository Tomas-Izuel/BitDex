//Objetos que simulan ser filas en la tabla de usuarios en backend en una aplicacion real
const user1 = {
    user: "admin",
    password: "1234",
    fondos: 99999999,
    bitcoins: 500
}

const user2 = {
    user: "guest",
    password: "1111",
    fondos: 1000,
    bitcoins: 0
}

//Array simulando la tabla de usuarios de la base de datos.
const db_user = [user1, user2]

const precioBTC = 19000 //Este valor deberia ser variable consumiendo una API, pero para esta primera instancia se declara constante

//Metodo para registrar el usuario
const register = (usuario,contraseña, fondos) => {
    const userx = { //creo un objeto con las credenciales pasadas por parametro
        user: usuario,
        password: contraseña,
        fondos: fondos,
        bitcoins: 0
    }
    db_user.push(userx); //añado el objeto a la base de datos ficticia
    alert("registrado con exito")
    menuOut(); //vuelvo a llamar al menu para que siga interactuando con la pagina
}

//Metodo para loguearse en el sistema
const login = (usuario, contraseña) => {
    let i = 0;  //Variable auxiliar para recorrer el array que representa la base de datos
    let flag = false; //Variable auxiliar para saber si se pudo loguear correctamente, asi evitar el mensaje de que el usuario no existe
    while(i<=(db_user.length - 1)){ //Con este while se recorrera todo el arreglo de la BD, para verificar uno por uno las credenciales
        if(db_user[i].user == usuario){ //Validamos que el usuario pasado por parametro sea igual a alguno de la BD
            if(db_user[i].password == contraseña){ //Validamos que la contraseña pasado por parametro sea igual a alguno de la BD
                menuIn(i); //Le paso el usuario que hace el llamado para poder verificar los fondos mas adelante
                flag = true; //Al loguearse correctamente seteamos la bandera en verdadero entonces cuando salga del while no le dira que el usuario no existia
            } else{
                alert("Contraseña incorrecta")
                location.reload(); //Recargo la pagina para que tenga que volver a loguearse
            }
        }
        i++;
    }
    if(flag == false){
        alert("este usuario no existe") //Si no se encontro usuario saltara este mensaje
        location.reload();
    }
}

const compra = (cantidad, indiceUser) => {
    if(db_user[indiceUser].fondos - cantidad*precioBTC >= 0){ //Verifico si dispone de los fondos para realizar la compra
        db_user[indiceUser].fondos = db_user[indiceUser].fondos - cantidad*precioBTC; //Resto la cantidad de la compra
        db_user[indiceUser].bitcoins = db_user[indiceUser].bitcoins + cantidad;
        alert("Compra exitosa");
        alert("cantidad de BTC en tu cuenta: " + db_user[indiceUser].bitcoins)
        menuIn(indiceUser); //vuelvo a llamar al menu para que siga interactuando con la pagina
    } else{
        alert("Fondos insuficientes")
        menuIn(indiceUser); //vuelvo a llamar al menu para que siga interactuando con la pagina
    }
}

const precio = (indiceUser) =>{
    alert(precioBTC);
    menuIn(indiceUser);
}

const fondo = (indiceUser) => {
    alert("Tu saldo es de: " + db_user[indiceUser].fondos);
    menuIn(indiceUser);
}

const menuIn = (indiceUser) =>{ //Menu una vez logueado en el sistema
    let menuSelector = prompt("Seleccione opcion: \n 1 - comprar BTC \n 2 - ver valor de BTC \n 3 - ver tus fondos actuales \n 0 - Salir")
    switch (menuSelector){
        case "1":
            compra(parseInt(prompt("Ingrese cantidad de BTC")), indiceUser)
            break;
        case "2":
            precio(indiceUser);
            break;
        case "3":
            fondo(indiceUser);
            break;
        case "0":
            break;
    }
}

const menuOut = () =>{ //Menu de logueo e registro
    let menuSelector = prompt("Seleccione opcion: \n 1 - Registrarse \n 2 - Loguearse \n 0 - Salir")
        switch (menuSelector){
            case "1":
                register(prompt("Ingrese usuario"), prompt("Ingrese contraseña"), parseInt(prompt("Ingrese fondos")));
                break;
            case "2":
                login(prompt("Ingrese usuario"), prompt("Ingrese contraseña"));
                break;
            case "0":
                break;
        }
}

menuOut();