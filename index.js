const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const mongodb = require("./config/mogodb");
const restaurantRoutes = require("./Routes/Restaurants");
server.listen("8055", () => {
  console.log("Server is listening to port 8055");
});

server.use(bodyParser.json());

mongodb.connect();

server.use("/", restaurantRoutes);

server.get("/", (req, res) => {
  res.send("Hello from server");
});
