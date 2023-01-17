const startButton = document.getElementById('startButton')

startButton.onclick = function (e) {
    e.preventDefault();
    if (isLogged() === false) {
        location.href = "./pages/register.html";
      }else{
        location.href = "./pages/criptomonedas.html";
      }
};