// 1. /login, поля які треба відрендерити в файлі hbs: firstName, lastName, email(унікальне поле), password, login, city
// просто зробити темплейт з цим усім і вводити свої дані які будуть пушитися в масив і редірект робити на сторінку з усіма юзерами /users і перевірка чи такий імейл не існує, якщо існує то редірект на еррор пейдж

const express = require("express");

const hbs = require("express-handlebars");
const path = require("path");
const engine = hbs.engine;
const app = express();

const users = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static")));
app.set("view engine", "hbs");
app.engine(".hbs", engine({ defaultLayout: false }));
app.set("views", path.join(__dirname, "static"));

app.get("/login", (req, res) => {
  //отдаем нашу страницу логини респонс    /логин

  res.render("login");
});

app.post("/login", ({ body }, res) => {
  const userExist = users.some((user) => user.email === body.email);
  if (userExist) {
    res.render("error");
    return;
  }
  users.push({ ...body, id: new Date().getTime() });
  console.log(users);
  res.redirect("users");
});

// 2. /users просто сторінка з усіма юзерами, але можна по квері параметрам їх фільтрувати по name і city

app.get("/users", ({ query }, res) => {
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

// 3. /user/:id сторінка з інфою про одного юзера

app.get("/users/:idUser", ({params}, res) => {
    console.log(params);
    
    const user=users.find(user=>user.id=== +params.idUser)
    console.log(user);
    
    res.render('user', {user}); //перейдя на страницу /1 мы получим нашего юдзера под 1 индексоми выведем на страницу.
    
  });

// 4. зробити якщо не відпрацюють ендпоінти то на сторінку notFound редірект


app.use((req, res) => {
  res.render("notFaund");
});

app.listen(5200, () => {
  console.log("server started :5200port");
});
