class Usuario {
  constructor(user, password, email, phone) {
    this.user = user;
    this.password = password;
    this.email = email;
    this.phone = phone;
    this.criptoWallet = [];
    this.creditCards = [];
    this.oid = Math.round(Math.random() * 100000000000); // Utilizo el patron OID para identificar unequivocamente a los usuarios, no valido que no se repita porque la probababilidad de que esto pase es muy baja
  }
}

class Cripto {
  //clase de las critos
  constructor(logo, name, short, price, marketCap, lastWeek, popularidad, oid) {
    this.logo = logo;
    this.name = name;
    this.short = short;
    this.price = price;
    this.marketCap = marketCap;
    this.lastWeek = lastWeek;
    this.popularidad = popularidad; //La popularidad es un numero del 1 al 1000 con el que permite realizar el tag de mas populares
    this.oid = Math.round(Math.random() * 1000000);
  }
}

class CritoUser {
  constructor(cripto, cantidad) {
    this.cantidad = cantidad;
    this.cripto = cripto;
  }
}

class CreditCardUser {
  constructor(numeroTarjeta, codigoSeguridad, titular, tipoTarjeta, vencimiento) {
    this.numeroTarjeta = numeroTarjeta;
    this.codigoSeguridad = codigoSeguridad;
    this.titular = titular;
    this.vencimiento = vencimiento;
    this.tipoTarjeta = tipoTarjeta;
  }
}
