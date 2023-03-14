const express = require("express");
const response = require("../network/response");
const Store = require("../store/mysql");

const router = express.Router();

//Routes
router.get("/:tabla", list);
router.get("/:tabla/:id", get);
router.put("/:tabla", upsert);
router.post("/:tabla", insert);

//Functions
async function list(req, res, next) {
  const data = await Store.list(req.params.tabla);
  response.success(req, res, data, 200);
}

async function get(req, res, next) {
  const data = await Store.get(req.params.tabla, req.params.id);
  response.success(req, res, data, 200);
}

async function upsert(req, res, next) {
  const data = await Store.upsert(req.params.tabla, req.body);
  response.success(req, res, data, 200);
}

async function insert(req, res, next) {
  const data = await Store.insert(req.params.tabla, req.body);
  response.success(req, res, data, 200);
}

module.exports = router;
