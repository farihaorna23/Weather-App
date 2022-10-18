import { City } from "./city.js";
export class SelectedAreas {
  constructor() {
    (this.id = 0), (this.savedAreaList = []);
  }

  addCity(city) {
    let newCity = new City(this.id++, city);
    this.savedAreaList.push(newCity);
  }
}
