const express = require("express");
const bodyParser = require("body-parser");
const { swaggerDocs } = require("./swagger");
const config = require("../config");
const user = require("./components/user/network");

const app = express();

app.use(bodyParser.json());

app.use("/api/user/", user);

app.listen(config.api.port, () => {
  console.log("Server start on port: " + config.api.port + "");
  swaggerDocs(app, config.api.port);
});
