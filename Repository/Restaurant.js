const mongodb = require("../config/mogodb");
exports.filterRestaurantDetails = (filter, sort, callback) => {
  const collection = mongodb.getCollection("Restaurant");
  collection
    .find(filter)
    .sort({ cost: sort })
    .toArray()
    .then((restaurants) => {
      callback(restaurants);
    })
    .catch((err) => {
      res.status(400).json({
        error: err,
      });
    });
};

exports.filterRestaurantByLocationAndName = (city, name, callback) => {
  const collection = mongodb.getCollection("Restaurant");
  var regexKey = ".*" + name + ".*";
  collection
    .find({
      $and: [
        { city_name: city },
        { name: { $regex: regexKey, $options: "i" } },
      ],
    })
    .toArray()
    .then(
      (restaurants) => {
        callback(restaurants);
      },
      (err) => {
        console.log(err);
      }
    );
};

exports.getByLocation = (location, callback) => {
  //Step 2: Get the collection.
  const collection = mongodb.getCollection("Restaurant");
  //Step 3: Get data from collection.
  collection
    .find({ city_name: location })
    .toArray()
    .then(
      (restaurants) => {
        callback(restaurants);
      },
      (err) => {
        console.log(err);
      }
    );
};
