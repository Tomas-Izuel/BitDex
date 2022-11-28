const CritpDatabase = []; //Base de datos de las criptos
const UICriptos = []; //arreglo con las criptos que se van a mostrar

const criptoGalleryCards = document.querySelector(".criptoGalleryCards");

//Funcion para cargar criptomonedas a la base de datos, despues sera reemplazada por la solicitud de una API con dichos datos
const loadCriptos = () => {
  const Bitcoin = new Cripto(
    "https://bitso.com/_next/static/media/icon-btc.8476d5a9.png",
    "Bitcoin",
    "BTC",
    16897,
    308024.08,
    -5.42,
    1000
  );
  CritpDatabase.push(Bitcoin);
  const Ether = new Cripto(
    "https://bitso.com/_next/static/media/icon-eth.04884e4c.png",
    "Ether",
    "ETH",
    1207.5,
    122373.866,
    -0.07,
    800
  );
  CritpDatabase.push(Ether);
  const Tir = new Cripto(
    "https://bitso.com/_next/static/media/icon-axs.b44f29a7.png",
    "Tir",
    "TIR",
    13756,
    128024.08,
    +3.32,
    700
  )
  CritpDatabase.push(Tir);
  const Dai = new Cripto(
    "https://bitso.com/_next/static/media/icon-dai.1cea5496.png",
    "Dai",
    "Dai",
    10013,
    136646.987,
    +0.78,
    600
  );
  CritpDatabase.push(Dai);
  const Bat = new Cripto(
    "https://bitso.com/_next/static/media/icon-bat.e458bf1e.png",
    "Bat",
    "Bat",
    0.2286,
    20196.48,
    +2.78,
    35
  );
  CritpDatabase.push(Bat);
  const Cardano = new Cripto(
    "https://bitso.com/_next/static/media/icon-ada.38cc4408.png",
    "Cardano",
    "ADA",
    0.3283,
    398976.732,
    +2.12,
    30
  );
  CritpDatabase.push(Cardano);
  const Chiliz = new Cripto(
    "https://bitso.com/_next/static/media/icon-chz.8111664c.png",
    "Chiliz",
    "CHZ",
    0.1893,
    1236587.369,
    -0.18,
    350
  );
  CritpDatabase.push(Chiliz);
  const AaveToken = new Cripto(
    "https://bitso.com/_next/static/media/icon-aave.ee1779c6.png",
    "Aave Token",
    "AAVE",
    53.040,
    108286.264,
    -6.65,
    600
  )
  CritpDatabase.push(AaveToken)
  const Algorand = new Cripto(
    "https://bitso.com/_next/static/media/icon-algo.fec1519b.png",
    "Algorand",
    "ALGO",
    0.2334,
    200034.730,
    -6.31,
    200
  )
  CritpDatabase.push(Algorand)
  const ApeCoin = new Cripto(
    "https://mobileassets.bitso.com/assets/icon/ape.svg",
    "ApeCoin",
    "APE",
    0.2390,
    435252.362,
    -3.36,
    220
  )
  CritpDatabase.push(ApeCoin)
  const DogeCoin = new Cripto(
    "https://bitso.com/_next/static/media/icon-doge.7b2fba51.png",
    "DogeCoin",
    "DOGE",
    0.998,
    310296.668,
    +0.71,
    610
  )
  CritpDatabase.push(DogeCoin)
};

loadCriptos();

const buildCriptoCard = (cripto) => {
  //Construyo la card de la cripto que luego se va a mostrar
  let lastWeekClass; //Defino esta variable para luego asignar la clase correspondiende al p
  if (cripto.lastWeek >= 0) {
    lastWeekClass = "positive";
  }
  if (cripto.lastWeek < 0) {
    lastWeekClass = "negative";
  }
  //Creo el elemmento y lo retorno armado
  const criptoCard = document.createElement("a");
  criptoCard.className = "cripto";
  criptoCard.innerHTML = `<div class="nameCripto">
          <img src=${cripto.logo} alt="" id="">
          <h3 id="criptoName">${cripto.name} <span id="criptoShort">${cripto.short}</span></h3>
          </div>
          <div class="valueCripto">
          <p id="priceCripto">$${cripto.price} (USD)</p>
          </div>
          <div class="marketCapCripto">
          <p id="mCC">$${cripto.marketCap} (USD)</p>
          </div>
          <div class="lastWeekCripto">
          <p class="${lastWeekClass}" id="movimiento">${cripto.lastWeek}%</p>
          </div>`;
  return criptoCard;
};

const showCriptos = (UICriptos) => {
  criptoGalleryCards.innerHTML = "" //Borramos las cards que esten en el DOM
  try { //La funcion del try catch es, que si no quedan mas criptos por mostrar no tire un error
    for (let index = 0; index < 10; index++) { //Con este for podemos definir cuantos criptos queremos que nos muestre por busqueda
      let criptoCard  = buildCriptoCard(UICriptos[index]); //Llamamos a la funcion para armar nuestra card con el elemento
      criptoGalleryCards.appendChild(criptoCard);
    }
  } catch {
    console.log("No quedan mas criptos que agregar")
  }
};

const loadUICriptos = (button) => {
  UICriptos.length = 0; //Vacio el array con elementos de otros tags llamados anteriormente
  switch (button.id) {
    case "all":
      CritpDatabase.forEach((element) => {
        UICriptos.push(element);
      });
      break;
    case "top":
      CritpDatabase.forEach((element) => {
        if (element.popularidad >= 600) {
          UICriptos.push(element);
        }
      });
      break;
    case "up":
      CritpDatabase.forEach((element) => {
        if (element.lastWeek >= 0) {
          UICriptos.push(element);
        }
      });
      break;
    case "down":
      CritpDatabase.forEach((element) => {
        if (element.lastWeek < 0) {
          UICriptos.push(element);
        }
      });
      break;
  }
  showCriptos(UICriptos);
};

//Deteccion de eventos de los tags
const buttonTagEvent = (button) => {
  if (button.classList.length == 2) {
    //Si la longitud del arreglo es 2, significa que tiene la clase active, por lo tanto ya esta seleccionado, por lo que se busca deseleccionar ese tag
    button.classList = "darkButton";
    criptoGalleryCards.innerHTML = ""
  } else {
    //button.classList = "darkButton active"
    const activeTags = document.querySelectorAll(".active"); //Desabilitamos cualquier otro tag que este activo
    activeTags.forEach((element) => {
      element.classList = "darkButton";
    });
    button.classList = "darkButton active"; //Activamos el tag seleccionado
    loadUICriptos(button);
  }
};

//Deteccion de eventos de barra de busqueda
const searchCripto = (input) => {
  let flag = false;
  UICriptos.length = 0; //reset de array
  CritpDatabase.forEach((element) => {
    const criptoName = element.name.substr(0,input.value.length) //obtenemos los primeros digitos del nombre de la cripto para compararlo con el input
    if (criptoName.toLowerCase() == input.value.toLowerCase()) { //comparacion del input
      UICriptos.push(element)
      flag = true;
      showCriptos(UICriptos);
      try{ //Try catch por si no tenia ningun tag activo, evitamos el error
        const active = document.querySelector('.active') //Quitamos el tag que este activo
        active.classList = 'darkButton'
      }catch{

      }
    }
  })
  if (flag == false) {
    criptoGalleryCards.innerHTML = '<h2>No se encontraron coincidencias</h2>'
  }
}

const searchBar = document.getElementById('searchBar')
searchBar.oninput = function() {
  searchCripto(searchBar)
}

const all = document.getElementById("all");
all.onclick = function () {
  buttonTagEvent(all);
  searchBar.value = ''; //eliminamos el valor del input para limpieza de pantalla
};
const topp = document.getElementById("top");
topp.onclick = function () {
  buttonTagEvent(topp);
  searchBar.value = '';
};
const up = document.getElementById("up");
up.onclick = function () {
  buttonTagEvent(up);
  searchBar.value = '';
};
const down = document.getElementById("down");
down.onclick = function () {
  buttonTagEvent(down);
  searchBar.value = '';
};

all.click();
