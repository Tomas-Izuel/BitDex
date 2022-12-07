import { animationButtonCondition } from "./animations.js";

if (isLogged() === false) {
  //Validacion para que solo se pueda acceder a esta pagina cuando se esta logueado a un P
  location.href = "../index.html";
}

let whereIsLogged;

let profileP;
if (JSON.parse(localStorage.getItem("Usuario")) == null) {
  profileP = JSON.parse(sessionStorage.getItem("Usuario"));
  whereIsLogged = "sessionStorage";
} else {
  profileP = JSON.parse(localStorage.getItem("Usuario"));
  whereIsLogged = "localStorage";
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
      sessionStorage.clear();
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
      if (whereIsLogged == "sessionStorage") {
        sessionStorage.setItem("Usuario", JSON.stringify(Usuario));
      }
      if (whereIsLogged == "localStorage") {
        localStorage.setItem("Usuario", JSON.stringify(Usuario));
      }
    }
  });
};

submitProfile.onclick = function (e) {
  e.preventDefault();
  editProfile();
};

//Tarjetas de credito

const newCard = document.getElementById("newCard");
const cardGalleryTarjetas = document.querySelector(".cardGalleryTarjetas");

const mostrarCards = () => {
  cardGalleryTarjetas.innerHTML = "";
  db_user.forEach((perfil) => {
    if (perfil.oid === profileP.oid) {
      try {
        perfil.creditCards.forEach((tarjeta) => {
          const cardTarjeta = document.createElement("div");
          cardTarjeta.classList.add("cardTarjeta");
          cardTarjeta.id = tarjeta.numeroTarjeta;
          cardTarjeta.innerHTML = `<h3>${tarjeta.tipoTarjeta}</h3>
          <p>**** **** **** **${tarjeta.numeroTarjeta.substring(14, 16)}</p>
          <p>Venc: ${tarjeta.vencimiento}</p>
          <button class="deleteCard" id="${
            tarjeta.numeroTarjeta
          }Button"><ion-icon name="close-circle-outline"></ion-icon></button>`;
          cardGalleryTarjetas.append(cardTarjeta);
        });
      } catch {
        const noCard = document.createElement("div");
        noCard.innerHTML = "<h3>Parece que no tienes ninguna tarjeta</h3>";
      }
    }
  });
};

const agregarTarjetaUsuario = (tajerta) => {
  const db_user = JSON.parse(localStorage.getItem("database"));
  db_user.forEach((usuario) => {
    if (usuario.oid == profileP.oid) {
      //agrego la tarjeta al usuario
      try {
        usuario.creditCards.push(tajerta);
        localStorage.setItem("database", JSON.stringify(db_user));
        if (whereIsLogged == "sessionStorage") {
          sessionStorage.clear();
          sessionStorage.setItem("Usuario", JSON.stringify(usuario));
        }
        if (whereIsLogged == "localStorage") {
          localStorage.removeItem("Usuario");
          localStorage.setItem("Usuario", JSON.stringify(usuario))
        }
        mostrarCards();
      } catch {
        usuario.creditCards = [];
        agregarTarjetaUsuario(tajerta);
      }
    }
  });
};

newCard.onclick = function (e) {
  e.preventDefault();
  const tarjeta = Swal.fire({
    //Card pidiendo datos de tarjeta
    buttonsStyling: "false",
    title: "Agrega una nueva tarjeta de credito",
    background: "rgba(0, 0, 0, 0.75)",
    color: "white",
    html: `<form class="formRegister newCard">
    <div class="input">
      <span>Ingrese titular de la tarjeta</span>
    <input type="text" id="nameCard">
    </div>
    <div class="input">
      <span>Ingrese tipo de tarjeta</span>
    <select name="typeCard" id="typeCard">
      <option value="VISA">VISA</option>
      <option value="MASTERCARD">MASTERCARD</option>
    </select>
    </div>
    <div class="input">
      <span>Ingrese numero de tarjeta</span>
      <input type="number" maxlength="16" id="numberCard">
    </div>
    <div class="input">
      <span>Ingrese codigo de seguridad</span>
      <input type="number" maxlength="3" id="securityCard">
    </div>
    <div class="input">
      <span>Ingrese fecha de vencimiento</span>
      <input type="date" id="dateCard">
    </div>
  </form>`,
    confirmButtonText: "Agregar tarjeta",
    padding: "1rem 3rem",
    customClass: {
      confirmButton: "lightButton",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      const nameCard = document.getElementById("nameCard").value;
      const typeCard = document.getElementById("typeCard").value;
      const numberCard = document.getElementById("numberCard").value;
      const securityCard = document.getElementById("securityCard").value;
      const dateCard = document.getElementById("dateCard").value;

      if (
        nameCard != "" &&
        numberCard.length == 16 &&
        securityCard.length == 3 &&
        dateCard != ""
      ) {
        //validacion de consistencia de datos de la tarjeta
        const tajerta = new CreditCardUser(
          numberCard,
          securityCard,
          nameCard,
          typeCard,
          dateCard
        );
        agregarTarjetaUsuario(tajerta);
        Swal.fire({
          title: "Tarjeta registrada con exito",
          icon: "success",
          background: "rgba(0, 0, 0, 0.75)",
          color: "white",
        }).then((result) => {
          location.reload();
        });
      } else {
        Swal.fire({
          title: "Los datos ingresados no son correctos",
          icon: "error",
          background: "rgba(0, 0, 0, 0.75)",
          color: "white",
        });
      }
    }
  });
};

mostrarCards();

//Eliminar tarjetas
const borrarCard = document.querySelectorAll(".deleteCard");

borrarCard.forEach((element) => {
  element.addEventListener("click", deleteCard);
});

function deleteCard(e) {
  let cc;
  const id = event.target.closest("div").id;
  db_user.forEach((Usuario) => {
    if (Usuario.oid == profileP.oid) {
      Usuario.creditCards.forEach((creditCard) => {
        if (creditCard.numeroTarjeta == id) {
          cc = creditCard;
        }
      });

      Swal.fire({
        title: "Estas seguro de eliminar esta tarjeta?",
        text: "No se podra revertir esta decision",
        icon: "warning",
        background: "rgba(0, 0, 0, 0.75)",
        color: "white",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, estoy seguro",
      }).then((result) => {
        if (result.isConfirmed) {
          Usuario.creditCards.splice(Usuario.creditCards.indexOf(cc), 1);
          localStorage.setItem("database", JSON.stringify(db_user));
          Swal.fire({
            title: "Se ha eliminado el tarjeta",
            icon: "success",
            background: "rgba(0, 0, 0, 0.75)",
            color: "white",
          });
          location.reload();
        }
      });
    }
  });
}
