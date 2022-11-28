
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