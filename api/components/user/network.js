const express = require("express");
const secure = require("../../secure");
const response = require("../../../network/response");
const controller = require("./index");
const router = express.Router();

//Routes
/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Retrieve a list of users.
 *     description: Retrieve a list of users.
 *     tags:
 *      - User
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               properties:
 *                 data:
 *                   type: object
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 */

router.get("/", list);
/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Retrieve a single JSONPlaceholder user.
 *     description: Retrieve a single JSONPlaceholder user.
 *     tags:
 *      - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 */

router.get("/:id", get);

/**
 * @swagger
 * /api/user:
 *  post:
 *    summary: Create a user.
 *    description: Create a user.
 *    tags:
 *      - User
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              username:
 *                type: string
 *              password:
 *                type: string
 *
 *    responses:
 *      201:
 *        description: The user was successfully created.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                name:
 *                  type: string
 *                username:
 *                  type: string
 *
 *
 */
router.post("/", upsert);

router.put("/", secure("update"), upsert);

//Internal functions
function list(req, res) {
  controller
    .list()
    .then((list) => {
      response.success(req, res, list, 200);
    })
    .catch((err) => {
      response.error(req, res, err.message, 500);
    });
}

function get(req, res) {
  controller
    .get(req.params.id)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch((err) => {
      response.error(req, res, err.message, 500);
    });
}

function upsert(req, res) {
  controller
    .upsert(req.body)
    .then((user) => {
      response.success(req, res, user, 201);
    })
    .catch((err) => {
      response.error(req, res, err.message, 500);
    });
}

module.exports = router;
