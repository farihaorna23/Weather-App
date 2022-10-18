export class City {
  constructor(id, city, weather, temperature, description, timeStamp) {
    this.id = id;
    this.city = city;
    (this.weather = weather),
      (this.temperature = temperature),
      (this.description = description),
      (this.timeStamp = timeStamp);
  }
}
