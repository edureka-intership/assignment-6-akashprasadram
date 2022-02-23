const repo = require("../Repository/Restaurant");
const url = require("url");

exports.filterRestaurant = (req, res) => {
  let { mealtype, cuisine, location, lcost, hcost, page, sort } = req.body;

  page = page ? page : 1;
  sort = sort ? sort : 1; //1 is for assending and -1 is for decending

  let Payload = {};
  const itemsPerPage = 2;

  let startIndex = itemsPerPage * page - itemsPerPage;
  let endIndex = itemsPerPage * page;

  if (mealtype && location && lcost && hcost && cuisine) {
    Payload["type.mealtype"] = mealtype;
    Payload["locality"] = location;
    Payload["cost"] = { $lte: hcost, $gte: lcost };
    Payload["Cuisine.cuisine"] = { $in: cuisine };
  } else if (mealtype && location && lcost && hcost) {
    Payload["type.mealtype"] = mealtype;
    Payload["locality"] = location;
    Payload["cost"] = { $lte: hcost, $gte: lcost };
  } else if (mealtype && cuisine && lcost && hcost) {
    Payload["type.mealtype"] = mealtype;
    Payload["Cuisine.cuisine"] = { $in: cuisine };
    Payload["cost"] = { $lte: hcost, $gte: lcost };
  } else if (mealtype && location && cuisine) {
    Payload["type.mealtype"] = mealtype;
    Payload["locality"] = location;
    Payload["Cuisine.cuisine"] = { $in: cuisine };
  } else if (mealtype && lcost && hcost) {
    //split function to extract lcost and hcost delimitor = 500 -1000
    Payload["type.mealtype"] = mealtype;
    Payload["cost"] = { $lte: hcost, $gte: lcost };
  } else if (mealtype && location) {
    Payload["type.mealtype"] = mealtype;
    Payload["locality"] = location;
  } else if (mealtype && cuisine) {
    Payload["type.mealtype"] = mealtype;
    Payload["Cuisine.cuisine"] = { $in: cuisine };
  } else if (mealtype) {
    Payload["type.mealtype"] = mealtype;
  }

  repo.filterRestaurantDetails(Payload, sort, (response) => {
    const filterResponse = response.slice(startIndex, endIndex);
    //const filterResponse = response;
    console.log(filterResponse);
    res.status(200).json({
      message: "Restaurant fetched successfully",
      restaurants: filterResponse,
    });
  });
};

exports.filterRestaurantByLocationAndName = (req, res) => {
  console.log(req.url);
  const params = url.parse(req.url, true).query;
  console.log(params);
  console.log(params.location + " " + params.name);
  if (!params.name) {
    repo.getByLocation(params.location, (restaurants) => {
      console.log(restaurants);
      res.send(restaurants);
    });
  } else {
    repo.filterRestaurantByLocationAndName(
      params.location,
      params.name,
      (restaurants) => {
        console.log(restaurants);
        res.send(restaurants);
      }
    );
  }
};
