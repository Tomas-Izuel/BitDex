const usuario = sessionStorage.getItem("Usuario")
const profile = document.getElementById('profile')
const noProfile = document.getElementById('noProfile')
const logout = document.getElementById('logout')

if(usuario != null){
    profile.style.display = "none";
    noProfile.style.display = "flex";
}

logout.addEventListener("click", ()=>{
    sessionStorage.clear();
    location.reload()
})