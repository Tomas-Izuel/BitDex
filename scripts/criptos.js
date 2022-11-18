class Cripto{
    constructor(logo, name, short, price, marketCap, lastWeek, popularidad){
        this.logo = logo
        this.name = name
        this.short = short
        this.price = price
        this.marketCap = marketCap
        this.lastWeek = lastWeek
        this.popularidad = popularidad;
    }
}

const Bitcoin = new Cripto("https://bitso.com/_next/static/media/icon-btc.8476d5a9.png", "Bitcoin", "BTC", 16897, 308024.08, -5.42, 1000)

const criptoGallery = document.querySelector('.criptoGallery')

const criptoCard = document.createElement("a")
criptoCard.className = "cripto"
criptoCard.innerHTML = `<div class="nameCripto">
<img src=${Bitcoin.logo} alt="" id="">
<h3 id="criptoName">${Bitcoin.name} <span id="criptoShort">${Bitcoin.short}</span></h3>
</div>
<div class="valueCripto">
<p id="priceCripto">$${Bitcoin.price} (USD)</p>
</div>
<div class="marketCapCripto">
<p id="mCC">$${Bitcoin.marketCap} (USD)</p>
</div>
<div class="lastWeekCripto">
<p class="negative" id="movimiento">${Bitcoin.lastWeek}%</p>
</div>`

criptoGallery.appendChild(criptoCard)