import { city, form, searchbtn } from "./variables.js";
console.log(city);

form.addEventListener("submit", Search);
searchbtn.addEventListener("click", Search);

function Search(e) {
  e.preventDefault();
  console.log("submitted");
  console.log(city.value);
  city.value = "";
}
