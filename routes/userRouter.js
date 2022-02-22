const { Router } = require("express");
const users = require("../db/users");

const userRouter = Router();

userRouter.get("/", (req, res) => {
  const { query } = req;
  if (Object.keys(query).length) {
    let newUsers = [...users];
    if (query.city) {
      console.log(query.city);
      newUsers = users.filter((user) => user.city === query.city);
    }
    if (query.login) {
      console.log(query.login);
      newUsers = users.filter((user) => user.login === query.login);
    }
    res.render("users", { users: newUsers });
    return;
  }

  res.render("users", { users });
});

userRouter.get(":idUser", (req, res) => {
  const { params } = req;
  console.log(params);

  const user = users.find((user) => user.id === +params.idUser);
  console.log(user);

  res.render("user", { user }); //перейдя на страницу /1 мы получим нашего юдзера под 1 индексоми выведем на страницу.
});

module.exports = userRouter;
