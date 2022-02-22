const users = require("../db/users");

class loginController {
  loginRender(req, res) {
    //отдаем нашу страницу логини респонс    /логин

    res.render("login");
  }

  postUserObject(req, res) {
    const { body } = req;
    const userExist = users.some((user) => user.email === body.email);
    if (userExist) {
      res.render("error");
      return;
    }
    users.push({ ...body, id: new Date().getTime() });
    console.log(users);
    res.redirect("users");
  }
}

module.exports = new loginController();
