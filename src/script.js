import { city, form, searchbtn, apiKey } from "./variables.js";
console.log(city);

form.addEventListener("submit", Search);
searchbtn.addEventListener("click", Search);

let weatherUrl = "https://api.openweathermap.org/data/2.5/weather?";

function Search(e) {
  e.preventDefault();
  let cityName = city.value;
  fetchApi(cityName);
  city.value = "";
}

async function fetchApi(city) {
  let cityName = city;
  try {
    let response = await fetch(`${weatherUrl}q=${cityName}&appid=${apiKey}`);
    let data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
