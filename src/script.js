import {
  city,
  form,
  searchbtn,
  apiKey,
  weatherBox,
  savedCity,
  background,
  weatherCol,
  cityCol
} from "./variables.js";
import { SelectedAreas } from "./selectedAreas.js";

let savedAreas = new SelectedAreas();

form.addEventListener("submit", Search);
searchbtn.addEventListener("click", Search);

weatherCol.hidden = true;
cityCol.hidden = true;

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
    let timeStamp = new Date();
    updateWeather(cityName, weather, temperature, description, timeStamp);
  } catch (err) {
    console.error(err);
  }
}

function switchBackground(weather) {
  switch (weather) {
    case "Clear":
      background.style.backgroundImage = "url('img/Clear.jpg')";
      background.style.backgroundPosition = "center";
      background.style.backgroundSize = "cover";
      break;
    case "Rain":
      background.style.backgroundImage = "url('img/Rain.jpg')";
      background.style.backgroundPosition = "center";
      background.style.backgroundSize = "cover";
      break;
    case "Clouds":
      background.style.backgroundImage = "url('img/Cloudy.jpg')";
      background.style.backgroundPosition = "center";
      background.style.backgroundSize = "cover";
      break;
    case "Fog":
      background.style.backgroundImage = "url('img/Fog.jpg')";
      background.style.backgroundPosition = "center";
      background.style.backgroundSize = "cover";
      break;
    case "Mist":
      background.style.backgroundImage = "url('img/Mist.jpg')";
      background.style.backgroundPosition = "center";
      background.style.backgroundSize = "cover";
      break;
    case "Haze":
      background.style.backgroundImage = "url('img/Haze.jpg')";
      background.style.backgroundPosition = "center";
      background.style.backgroundSize = "cover";
      break;
    default:
      background.style.backgroundImage = "url('img/cloud.svg')";
      break;
  }
}

function updateWeather(city, weather, temperature, description, timeStamp) {
  switchBackground(weather);
  weatherCol.hidden = false;
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
  li4.textContent = `Temperature: ${temperature}℃`;
  li4.className = "list-group-item";
  let li5 = document.createElement("li");
  li5.textContent = `Time Stamp: ${timeStamp}℃`;
  li5.className = "list-group-item";
  ul.append(li1, li2, li3, li4, li5);
  let saveBtn = document.createElement("button");
  saveBtn.type = "button";
  saveBtn.className = "btn btn-primary btn-sm";
  saveBtn.textContent = "Save Place";
  saveBtn.style.margin = "1rem";
  saveBtn.addEventListener("click", () => {
    cityCol.hidden = false;
    savedAreas.addCity(city, weather, temperature, description, timeStamp);
    updateSavedCity();
    saveBtn.disabled = true;
  });
  let fahrenheitBtn = document.createElement("button");
  fahrenheitBtn.type = "button";
  fahrenheitBtn.className = "btn btn-primary btn-sm";
  fahrenheitBtn.textContent = "℉";
  fahrenheitBtn.style.margin = "1rem";
  fahrenheitBtn.addEventListener("click", () => {
    let farenheit = temperature.toFixed(1) * 1.8 + 32;
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
  weatherBox.append(ul, saveBtn, fahrenheitBtn, celciusBtn);
}

function updateSavedCity() {
  savedCity.innerHTML = "";
  for (let i = 0; i < savedAreas.savedAreaList.length; i++) {
    let ul = document.createElement("ul");
    ul.className = "list-group";
    let li1 = document.createElement("li");
    li1.className = "list-group-item";
    li1.textContent = `City: ${savedAreas.savedAreaList[i].city}`;
    let removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "btn btn-primary btn-sm";
    removeBtn.textContent = "Remove";
    removeBtn.style.margin = "1rem";
    removeBtn.addEventListener("click", () => {
      savedAreas.removeCity(savedAreas.savedAreaList[i].id);
      console.log(savedAreas.savedAreaList);
      updateSavedCity();
    });
    let checkWeatherBtn = document.createElement("button");
    checkWeatherBtn.type = "button";
    checkWeatherBtn.className = "btn btn-primary btn-sm";
    checkWeatherBtn.textContent = "Check Weather";
    checkWeatherBtn.style.margin = "1rem";
    checkWeatherBtn.addEventListener("click", () => {
      updateWeather(
        savedAreas.savedAreaList[i].city,
        savedAreas.savedAreaList[i].weather,
        savedAreas.savedAreaList[i].temperature,
        savedAreas.savedAreaList[i].description,
        savedAreas.savedAreaList[i].timeStamp
      );
    });
    ul.append(li1);
    savedCity.append(ul, removeBtn, checkWeatherBtn);
  }
}
