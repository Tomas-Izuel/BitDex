const criptoName = document.getElementById("criptoName");
const chartCripto = document.getElementById("chartCripto");
const currentPrice = document.getElementById("currentPrice");
const inputBuy = document.getElementById("inputBuy");
const priceBuy = document.getElementById("priceBuy");

const criptoSelected = JSON.parse(sessionStorage.getItem("currentCripto"));

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
        console.log(UICripto);

        currentPrice.innerHTML = element.price_usd

        new Chart(chartCripto, {
            type: "line",
            fill: true,
            data: {
              labels: ["Ult. semana", "Ult. 24h", "Ult. hora"],
              datasets: [
                {
                  label: "",
                  data: [UICripto.percent_change_7d, UICripto.percent_change_24h, UICripto.percent_change_1h],
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
          Loader.close()
      }
    });
  })
  .catch((err) => console.error(err));


inputBuy.oninput = function(){
    let precioUSD = inputBuy.value * UICripto.price
    priceBuy.innerHTML = precioUSD
}