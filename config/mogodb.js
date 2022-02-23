const mongodb = require("mongodb");
const mongodbClient = mongodb.MongoClient;
const url =
  "mongodb+srv://akash:test123@cluster0.jaiyu.mongodb.net/zomato?retryWrites=true&w=majority";
var connectedClient;
exports.connect = () => {
  mongodbClient
    .connect(url)
    .then((client) => {
      console.log("Database is connected");
      connectedClient = client;
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCollection = (nameOfCollection) => {
  return connectedClient.db("zomato").collection(nameOfCollection);
};
