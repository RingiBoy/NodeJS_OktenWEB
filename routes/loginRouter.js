const { Router } = require("express");
const users = require("../db/users");
const loginController = require("../controllers/loginController");

const loginRouter = Router();

loginRouter.get("/", loginController.loginRender);

loginRouter.post("/", loginController.postUserObject);

module.exports = loginRouter;
