import { animationButtonCondition } from "./animations.js";

const criptoName = document.getElementById("criptoName");
const chartCripto = document.getElementById("chartCripto");
const currentPrice = document.getElementById("currentPrice");
const inputBuy = document.getElementById("inputBuy");
const priceBuy = document.getElementById("priceBuy");
const buyButtonCripto = document.getElementById("buyButtonCripto");

const criptoSelected = JSON.parse(sessionStorage.getItem("currentCripto"));

const db_user = JSON.parse(localStorage.getItem("database"));

let UICripto = {};

criptoName.innerHTML = criptoSelected;

Loader.open();

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "932d48a42emshb61aad2523ff54ap1c5e76jsne792ade724b7",
    "X-RapidAPI-Host": "coinlore-cryptocurrency.p.rapidapi.com",
  },
};

fetch(
  "https://coinlore-cryptocurrency.p.rapidapi.com/api/tickers/?start=0&limit=100",
  options
)
  .then((response) => response.json())
  .then((response) => {
    response.data.forEach((element) => {
      if (element.name == criptoSelected) {
        UICripto.name = element.name;
        UICripto.market_cap_usd = element.market_cap_usd;
        UICripto.symbol = element.symbol;
        UICripto.price = element.price_usd;
        UICripto.percent_change_1h = element.percent_change_1h;
        UICripto.percent_change_24h = element.percent_change_24h;
        UICripto.percent_change_7d = element.percent_change_7d;

        currentPrice.innerHTML = element.price_usd;

        new Chart(chartCripto, {
          type: "line",
          fill: true,
          data: {
            labels: ["Ult. semana", "Ult. 24h", "Ult. hora"],
            datasets: [
              {
                label: "",
                data: [
                  UICripto.percent_change_7d,
                  UICripto.percent_change_24h,
                  UICripto.percent_change_1h,
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
        Loader.close();
      }
    });
  })
  .catch((err) => console.error(err));

inputBuy.oninput = function () {
  let precioUSD = inputBuy.value * UICripto.price;
  priceBuy.innerHTML = precioUSD;
};

//Buy acction

const comprarCripto = () => {
  let profile;
  let whereIsLogged;
  if (JSON.parse(localStorage.getItem("Usuario")) == null) {
    profile = JSON.parse(sessionStorage.getItem("Usuario"));
    whereIsLogged = "sessionStorage";
  } else {
    profile = JSON.parse(localStorage.getItem("Usuario"));
    whereIsLogged = "localStorage";
  }

  db_user.forEach((user) => {
    if (user.oid == profile.oid) {
      if (user.creditCards.length != 0) {
        const criptoCompra = new CritoUser(criptoSelected, inputBuy.value);
        try {
          let flag = false;
          user.criptoWallet.forEach((cripto) => {
            if (cripto.cripto == criptoCompra.cripto) {
              const value = parseInt(cripto.cantidad) + parseInt(criptoCompra.cantidad);
              cripto.cantidad = value;
              flag = true;
            }
          });
          if(flag == false) {
            user.criptoWallet.push(criptoCompra);
          }
        } catch {
          user.criptoWallet = [];
          user.criptoWallet.push(criptoCompra);
        }
        localStorage.setItem("database", JSON.stringify(db_user));
        if (whereIsLogged == "sessionStorage") {
          sessionStorage.setItem("Usuario", JSON.stringify(user));
        }
        if (whereIsLogged == "localStorage") {
          localStorage.setItem("Usuario", JSON.stringify(user));
        }
        animationButtonCondition(
          buyButtonCripto,
          'Compra realizada<ion-icon name="checkmark-done-outline"></ion-icon>',
          "successButton",
          4000,
          "../pages/criptoDetails.html"
        );
      } else {
        animationButtonCondition(
          buyButtonCripto,
          'No posee una tarjeta asociada <ion-icon name="close-circle-outline"></ion-icon>',
          "failButton",
          5000,
          "../pages/criptoDetails.html"
        );
      }
    }
  });
};

buyButtonCripto.addEventListener("click", (e) => {
  e.preventDefault();
  isLogged() ? comprarCripto() : (location.href = "../pages/login.html");
});
