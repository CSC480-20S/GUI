//Checks to see if an admin marked a study for review. If it is, it changes the icon, and vice versa.
function changeCheck(x) {
  x.classList.toggle("fa-times-circle-o");
  x.classList.toggle("orange_close");
}
