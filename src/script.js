import { city, form, searchbtn, apiKey, weatherBox } from "./variables.js";

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
    let response = await fetch(
      `${weatherUrl}q=${cityName}&appid=${apiKey}&units=metric`
    );
    let data = await response.json();
    let weather = data.weather[0].main;
    let temperature = data.main.temp;
    let description = data.weather[0].description;
    updateWeather(cityName, weather, temperature, description);
  } catch (err) {
    console.error(err);
  }
}

function updateWeather(city, weather, temperature, description) {
  let ul = document.createElement("ul");
  ul.className = "list-group";
  let li1 = document.createElement("li");
  li1.textContent = `City: ${city}`;
  li1.className = "list-group-item";
  let li2 = document.createElement("li");
  li2.textContent = `Weather: ${weather}`;
  li2.className = "list-group-item";
  let li3 = document.createElement("li");
  li3.textContent = `Description: ${description}`;
  li3.className = "list-group-item";
  let li4 = document.createElement("li");
  li4.textContent = `Temperature: ${temperature}℉`;
  li4.className = "list-group-item";
  ul.append(li1, li2, li3, li4);
  let saveBtn = document.createElement("button");
  saveBtn.type = "button";
  saveBtn.className = "btn btn-primary btn-sm";
  saveBtn.textContent = "Save Place";
  saveBtn.style.margin = "1rem";
  saveBtn.addEventListener("click", () => {
    addPlace(city);
  });
  let fahrenheitBtn = document.createElement("button");
  fahrenheitBtn.type = "button";
  fahrenheitBtn.className = "btn btn-primary btn-sm";
  fahrenheitBtn.textContent = "℉";
  fahrenheitBtn.style.margin = "1rem";
  fahrenheitBtn.addEventListener("click", temp => {
    let farenheit = temp * 1.8 + 32;
    return (li4.textContent = `Temperature: ${farenheit}℉`);
  });
  let celciusBtn = document.createElement("button");
  celciusBtn.type = "button";
  celciusBtn.className = "btn btn-primary btn-sm";
  celciusBtn.textContent = "℃";
  celciusBtn.style.margin = "1rem";
  celciusBtn.addEventListener("click", () => {
    li4.textContent = `Temperature: ${temperature}℃`;
  });
  weatherBox.appendChild(ul);
  weatherBox.appendChild(saveBtn);
  weatherBox.appendChild(fahrenheitBtn);
  weatherBox.appendChild(celciusBtn);
}
