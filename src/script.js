import { city, form, searchbtn } from "./variables.js";
console.log(city);

form.addEventListener("submit", Search);
searchbtn.addEventListener("click", Search);

function Search(e) {
  e.preventDefault();
  let cityName = city.value;
}
