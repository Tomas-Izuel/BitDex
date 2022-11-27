class Usuario {
  constructor(user, password, email, phone) {
    this.user = user;
    this.password = password;
    this.email = email;
    this.phone = phone;
    this.criptoWallet = []
    this.oid = Math.round(Math.random() * 100000000000); // Utilizo el patron OID para identificar unequivocamente a los usuarios, no valido que no se repita porque la probababilidad de que esto pase es muy baja
  }
}

const admin = new Usuario("admin", "admin","admin@example.com","11111111")
const db_user = []
db_user.push(admin)
localStorage.setItem("database", JSON.stringify(db_user));
if (JSON.parse(localStorage.getItem("database")) != null) {
    const div = document.createElement("div")
    div.innerHTML = "Despliegue exitoso"
    const body = document.getElementById("bodyDespliegue");
    body.appendChild(div);
}