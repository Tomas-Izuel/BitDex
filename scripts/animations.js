export function animationButtonCondition(
  submit,
  text,
  claseButton,
  lastTime,
  ruta
) {
  submit.innerHTML = "";
  submit.style.width = "4rem";
  setTimeout(() => {
    submit.classList.remove("lightButton");
    submit.classList.add(claseButton);
    setTimeout(() => {
      submit.style.width = "100%";
      setTimeout(() => {
        submit.innerHTML = text;
      }, 600);
    }, 1000);
  }, 500);
  setTimeout(() => {
    location.href = ruta;
  }, lastTime);
}
