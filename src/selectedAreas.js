import { City } from "./city.js";
export class SelectedAreas {
  constructor() {
    (this.id = 0), (this.savedAreaList = []);
  }

  addCity(city, weather, temperature, description, timeStamp) {
    let newCity = new City(
      this.id++,
      city,
      weather,
      temperature,
      description,
      timeStamp
    );
    console.log(newCity);
    this.savedAreaList.push(newCity);
    console.log(this.savedAreaList);
  }
}
