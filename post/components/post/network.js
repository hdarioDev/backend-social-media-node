const express = require("express");

const response = require("../../../network/response");
const controller = require("./index");
const router = express.Router();

//Routes
router.get("/", list);

//Functions
function list(req, res, next) {
  controller
    .list()
    .then((list) => {
      response.success(req, res, list, 200);
    })
    .catch(next);
}

module.exports = router;
