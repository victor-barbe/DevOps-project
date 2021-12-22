const express = require("express");
const userController = require("../controllers/user");

const userRouter = express.Router();

userRouter
  /**
   * @swagger
   * components:
   *   schemas:
   *     user:
   *       type: object
   *       required:
   *         - firstname
   *         - lastname
   *         - username
   *       properties:
   *         username:
   *           type: string
   *           description: The unique username of the user
   *         firstname:
   *           type: string
   *           description: The user firstname
   *         lastname:
   *           type: string
   *           description: The user lastname
   *       example:
   *         username: sergkudinov
   *         firstname: Sergei
   *         lastname: Kudinov
   */

  /**
   * @swagger
   * tags:
   *   name: user
   *   description: The user managing API
   */

  /**
   * @swagger
   * /user:
   *   post:
   *     summary: Create a new user
   *     tags: [user]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/user'
   *     responses:
   *       200:
   *         description: The user was successfully created
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/user'
   *       400:
   *         description: Error
   */

  .post("/", (req, resp) => {
    userController.create(req.body, (err, res) => {
      let respObj;
      if (err) {
        respObj = {
          status: "error",
          msg: err.message,
        };
        return resp.status(400).json(respObj);
      }
      respObj = {
        status: "success",
        msg: res,
      };
      resp.status(201).json(respObj);
    });
  })

  /**
   * @swagger
   * /user/{username}:
   *   get:
   *     summary: Get the user by username
   *     tags: [user]
   *     parameters:
   *       - in: path
   *         name: username
   *         schema:
   *           type: string
   *         required: true
   *         description: The user username
   *     responses:
   *       200:
   *         description: The user description by username
   *         contens:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/user'
   *       400:
   *         description: error
   */

  .get("/:username", (req, resp, next) => {
    // Express URL params - https://expressjs.com/en/guide/routing.html
    const username = req.params.username;
    userController.get(username, (err, res) => {
      let respObj;
      if (err) {
        respObj = {
          status: "error",
          msg: err.message,
        };
        return resp.status(400).json(respObj);
      }
      respObj = {
        status: "success",
        msg: res,
      };
      resp.status(200).json(respObj);
    });
  })

  /**
   * @swagger
   * /user/{username}:
   *  put:
   *    summary: Update the user by the username
   *    tags: [user]
   *    parameters:
   *      - in: path
   *        name: username
   *        schema:
   *          type: string
   *        required: true
   *        description: The user username
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/user'
   *    responses:
   *      200:
   *        description: The user was updated
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/user'
   *      404:
   *        description: The user was not found
   *      500:
   *        description: Some error happened
   */

  .put("/:username", (req, resp, next) => {
    // Express URL params - https://expressjs.com/en/guide/routing.html
    const user = req.body;
    userController.update(req.params.username, user, (err, res) => {
      let respObj;
      if (err) {
        respObj = {
          status: "error",
          msg: err.message,
        };
        return resp.status(400).json(respObj);
      }
      respObj = {
        status: "success",
        msg: res,
      };
      resp.status(200).json(respObj);
    });
  })

  /**
   * @swagger
   * /user/{username}:
   *   delete:
   *     summary: Remove the user by username
   *     tags: [user]
   *     parameters:
   *       - in: path
   *         name: username
   *         schema:
   *           type: string
   *         required: true
   *         description: The user username
   *
   *     responses:
   *       200:
   *         description: The user was deleted
   *       404:
   *         description: The user was not found
   */

  .delete("/:username", (req, resp, next) => {
    // Express URL params - https://expressjs.com/en/guide/routing.html
    const username = req.params.username;
    userController.delete(username, (err, res) => {
      let respObj;
      if (err) {
        respObj = {
          status: "error",
          msg: err.message,
        };
        return resp.status(400).json(respObj);
      }
      respObj = {
        status: "success",
        msg: res,
      };
      resp.status(200).json(respObj);
    });
  });

module.exports = userRouter;
