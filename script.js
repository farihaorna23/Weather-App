//
let city = document.getElementById("city");
let form = document.getElementById("submitForm");
console.log(city);

form.addEventListener("submit", Submitted);

function Submitted(e) {
  e.preventDefault();
  console.log("submitted");
  console.log(city.value);
}
