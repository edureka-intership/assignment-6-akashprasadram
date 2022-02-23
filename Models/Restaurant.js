class Restaurant {
  constructor(
    _id,
    name,
    city_name,
    city,
    area,
    locality,
    thumb,
    cost,
    address,
    type,
    Cuisine
  ) {
    this._id = _id;
    this.name = name;
    this.city_name = city_name;
    this.city = city;
    this.area = area;
    this.locality = locality;
    this.thumb = thumb;
    this.cost = cost;
    this.address = address;
    this.type = type;
    this.Cuisine = Cuisine;
  }
}

module.exports = Restaurant;
