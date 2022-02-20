// 1. /login, поля які треба відрендерити в файлі hbs: firstName, lastName, email(унікальне поле), password, age, city
// просто зробити темплейт з цим усім і вводити свої дані які будуть пушитися в масив і редірект робити на сторінку з усіма юзерами /users і перевірка чи такий імейл не існує, якщо існує то редірект на еррор пейдж

// 2. /users просто сторінка з усіма юзерами, але можна по квері параметрам їх фільтрувати по age і city

// 3. /user/:id сторінка з інфою про одного юзера

// 4. зробити якщо не відпрацюють ендпоінти то на сторінку notFound редірект

const express = require("express");

const hbs = require("express-handlebars");
const path = require("path");
const engine = hbs.engine;
const app = express();

const users = [
  {
    firstName: "Dmitriy",
    lastName: "Grebin",
    login: "Ringi",
    password: "qwerty",
    city: "kiev",
    email: "Ringi@gmail.com",
  },
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static")));
app.set("view engine", "hbs");
app.engine(".hbs", engine({ defaultLayout: false }));
app.set("views", path.join(__dirname, "static"));

app.get("/login", (req, res) => {
  //отдаем нашу страницу логини респонс    /логин
  const u = users.forEach((users) => {
    
  });

  res.render("login");
});

app.get("/users", (req, res) => {
  res.render("users", { users });
});



app.get("/users/:idUser", (req, res) => {
  console.log(req.params);
  const { idUser } = req.params;
  res.json(users[idUser]); //перейдя на страницу /1 мы получим нашего юдзера под 1 индексоми выведем на страницу.
  console.log(req.query);
});

app.post("/login", (req, res) => {
  //////получаем наши данные, но они не смогут прочитаться нодой, для этого нужно ее научить читать джейсон объекты командами :
  // ////    app.use(express.json());
  // ////app.use(express.urlencoded({extended:true}))
  //console.log(req.body);
  users.push(req.body);
  res.redirect("/users");
});

app.use((req, res) => {
  res.render("notFaund");
});

app.listen(5200, () => {
  console.log("server started :5200port");
});
