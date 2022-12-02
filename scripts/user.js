const usuarioLocal = localStorage.getItem("Usuario");
const usuarioSession = sessionStorage.getItem("Usuario")
const profile = document.getElementById('profile')
const noProfile = document.getElementById('noProfile')
const logout = document.getElementById('logout')

let logged = false;

if(usuarioSession != null || usuarioLocal != null){
    profile.style.display = "none";
    noProfile.style.display = "flex";
    logged = true;
}

logout.addEventListener("click", ()=>{
    sessionStorage.clear();
    localStorage.clear();
    logged = false;
    location.reload()
})

const isLogged = () => {
    return logged;
}