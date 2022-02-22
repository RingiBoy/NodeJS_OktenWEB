const { Router } = require("express");
const users = require("../db/users");

const loginRouter = Router();

loginRouter.get("/", (req, res) => {
  //отдаем нашу страницу логини респонс    /логин

  res.render("login");
});

loginRouter.post("/", (req, res) => {
  const { body } = req;
  const userExist = users.some((user) => user.email === body.email);
  if (userExist) {
    res.render("error");
    return;
  }
  users.push({ ...body, id: new Date().getTime() });
  console.log(users);
  res.redirect("users");
});

module.exports = loginRouter;
