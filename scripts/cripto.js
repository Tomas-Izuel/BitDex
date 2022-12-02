const CritpDatabase = []; //Base de datos de las criptos
const UICriptos = []; //arreglo con las criptos que se van a mostrar

const criptoGalleryCards = document.querySelector(".criptoGalleryCards");

//Funcion para cargar criptomonedas a la base de datos
const loadCriptos = () => {
  return new Promise((resolve, reject) => {
    
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '932d48a42emshb61aad2523ff54ap1c5e76jsne792ade724b7',
        'X-RapidAPI-Host': 'coinlore-cryptocurrency.p.rapidapi.com'
      }
    };
    
    fetch('https://coinlore-cryptocurrency.p.rapidapi.com/api/tickers/?start=0&limit=100', options)
      .then(response => response.json())
      .then(response => {
        for (let i = 0; i < response.data.length; i++) {
          const cripto = new Cripto(
            response.data[i].name,
            response.data[i].symbol,
            response.data[i].price_usd,
            response.data[i].market_cap_usd,
            response.data[i].percent_change_7d,
            response.data[i].rank
          )
          CritpDatabase.push(cripto);
        }
        resolve()
      })
      .catch(err => console.error(err));
    
  })
};

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
    for (let index = 0; index < 100; index++) { //Con este for podemos definir cuantos criptos queremos que nos muestre por busqueda
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
        if (element.popularidad < 25) {
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

let criptoPromise = loadCriptos();
Loader.open();

criptoPromise.then(() => { //Muesto las criptos una vez se resuelva el fetch llamando a la api que los provee
  Loader.close()
  all.click();
})
